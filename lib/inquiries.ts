// Server-only persistence for inquiries / session requests (Upstash Redis via REST).
// Records: one hash per inquiry at `inquiry:<uuid>`; ordering via sorted set `inquiries:index` (score = createdAt ms).

import { Redis } from '@upstash/redis'

export type InquiryKind = 'inquiry' | 'session'
export type InquiryStatus = 'New' | 'Contacted' | 'Booked'

export type Inquiry = {
  id: string
  kind: InquiryKind
  name: string
  email: string
  service: string
  preferredDate: string
  message: string
  status: InquiryStatus
  createdAt: string
}

export const INQUIRY_KINDS: readonly InquiryKind[] = ['inquiry', 'session']
export const INQUIRY_STATUSES: readonly InquiryStatus[] = ['New', 'Contacted', 'Booked']

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const INDEX_KEY = 'inquiries:index'
const MAX_LIST = 500

export function isValidInquiryId(id: unknown): id is string {
  return typeof id === 'string' && UUID_V4.test(id)
}

export function isInquiryStatus(value: unknown): value is InquiryStatus {
  return typeof value === 'string' && (INQUIRY_STATUSES as readonly string[]).includes(value)
}

function recordKey(id: string): string {
  if (!isValidInquiryId(id)) throw new Error('invalid_id')
  return `inquiry:${id}`
}

let client: Redis | null = null

// Supports both env naming schemes Vercel's Upstash integration has used.
export function getRedis(): Redis {
  if (client) return client
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    console.error('missing_env:UPSTASH_REDIS_REST_URL/KV_REST_API_URL')
    throw new Error('server_misconfigured')
  }
  client = new Redis({ url, token })
  return client
}

function fromHash(raw: Record<string, unknown> | null): Inquiry | null {
  if (!raw || typeof raw.id !== 'string') return null
  const status = isInquiryStatus(raw.status) ? raw.status : 'New'
  const kind = raw.kind === 'session' ? 'session' : 'inquiry'
  return {
    id: raw.id,
    kind,
    name: String(raw.name ?? ''),
    email: String(raw.email ?? ''),
    service: String(raw.service ?? ''),
    preferredDate: String(raw.preferredDate ?? ''),
    message: String(raw.message ?? ''),
    status,
    createdAt: String(raw.createdAt ?? ''),
  }
}

export async function listInquiries(): Promise<Inquiry[]> {
  const redis = getRedis()
  const ids = await redis.zrange<string[]>(INDEX_KEY, 0, MAX_LIST - 1, { rev: true })
  if (ids.length === 0) return []

  const pipeline = redis.pipeline()
  for (const id of ids) {
    if (isValidInquiryId(id)) pipeline.hgetall(recordKey(id))
  }
  const rows = (await pipeline.exec()) as Array<Record<string, unknown> | null>
  const inquiries: Inquiry[] = []
  for (const row of rows) {
    const parsed = fromHash(row)
    if (parsed) inquiries.push(parsed)
  }
  return inquiries
}

export async function createInquiry(input: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Promise<Inquiry> {
  const redis = getRedis()
  const now = new Date()
  const inquiry: Inquiry = {
    ...input,
    id: crypto.randomUUID(),
    status: 'New',
    createdAt: now.toISOString(),
  }
  const pipeline = redis.pipeline()
  pipeline.hset(recordKey(inquiry.id), inquiry)
  pipeline.zadd(INDEX_KEY, { score: now.getTime(), member: inquiry.id })
  await pipeline.exec()
  return inquiry
}

// Atomic: only writes if the record still exists, so a concurrent delete cannot be resurrected.
const UPDATE_STATUS_SCRIPT = `
if redis.call('EXISTS', KEYS[1]) == 1 then
  redis.call('HSET', KEYS[1], 'status', ARGV[1])
  return 1
end
return 0
`

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<Inquiry | null> {
  const redis = getRedis()
  const key = recordKey(id)
  const updated = await redis.eval<[string], number>(UPDATE_STATUS_SCRIPT, [key], [status])
  if (updated !== 1) return null
  return fromHash(await redis.hgetall<Record<string, unknown>>(key))
}

// Atomic: removes the record and its index entry together; returns whether a record actually existed.
const DELETE_SCRIPT = `
local removed = redis.call('DEL', KEYS[1])
redis.call('ZREM', KEYS[2], ARGV[1])
return removed
`

export async function deleteInquiry(id: string): Promise<boolean> {
  const redis = getRedis()
  const removed = await redis.eval<[string], number>(DELETE_SCRIPT, [recordKey(id), INDEX_KEY], [id])
  return removed === 1
}

// Fixed-window rate limit keyed by caller identity; returns true when the caller is over the limit.
export async function isRateLimited(bucket: string, limit: number, windowSeconds: number): Promise<boolean> {
  const redis = getRedis()
  const key = `ratelimit:${bucket}`
  const pipeline = redis.pipeline()
  pipeline.incr(key)
  pipeline.expire(key, windowSeconds, 'NX')
  const [count] = (await pipeline.exec()) as [number, unknown]
  return count > limit
}
