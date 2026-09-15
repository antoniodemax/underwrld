import type { VercelRequest, VercelResponse } from '@vercel/node'
import { clientIp, json, jsonBody, passesMutationChecks } from '../lib/http.js'
import { createInquiry, INQUIRY_KINDS, isRateLimited, type InquiryKind } from '../lib/inquiries.js'

const LIMITS = { name: 120, email: 254, service: 120, message: 2000 }
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
const SUBMISSIONS_PER_HOUR = 10

function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length <= max ? trimmed : null
}

// Public submission endpoint for the site's contact form.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'method_not_allowed' })
  }
  if (!passesMutationChecks(req, ['POST'])) return json(res, 403, { error: 'forbidden' })

  const body = jsonBody(req)
  if (!body) return json(res, 400, { error: 'bad_request' })

  const kind = body.kind
  const name = text(body.name, LIMITS.name)
  const email = text(body.email, LIMITS.email)
  const service = text(body.service, LIMITS.service)
  const preferredDate = text(body.preferredDate, 10)
  const message = text(body.message, LIMITS.message)

  if (
    !(INQUIRY_KINDS as readonly unknown[]).includes(kind) ||
    !name ||
    !email ||
    !EMAIL.test(email) ||
    service === null ||
    preferredDate === null ||
    (preferredDate !== '' && !DATE.test(preferredDate)) ||
    !message
  ) {
    return json(res, 400, { error: 'bad_request' })
  }

  try {
    if (await isRateLimited(`inquiries:${clientIp(req)}`, SUBMISSIONS_PER_HOUR, 60 * 60)) {
      return json(res, 429, { error: 'rate_limited' })
    }
    await createInquiry({ kind: kind as InquiryKind, name, email, service, preferredDate, message })
    return json(res, 201, { ok: true })
  } catch (error) {
    console.error('inquiry_create_failed', error instanceof Error ? error.message : 'unknown')
    return json(res, 500, { error: 'server_error' })
  }
}
