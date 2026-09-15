// Client for the server-side inquiry API. Records live in the server store, never in the browser;
// the admin session cookie (HttpOnly) is what authorizes the admin endpoints.
//
// The Inquiry types below intentionally mirror lib/inquiries.ts rather than importing them: the browser
// tsconfig has no Node types, so pulling in a server module would break `tsc -b`. Keep the two in sync.

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

export const INQUIRIES_EVENT = 'underwrld:inquiries'

const HEADERS = { 'Content-Type': 'application/json', 'X-Requested-With': 'underwrld-admin' }

export type SubmitResult = 'ok' | 'invalid' | 'rate_limited' | 'error'
export type MutationResult = 'ok' | 'not_found' | 'unauthorized' | 'error'

let cache: Inquiry[] | null = null
let inflight: Promise<Inquiry[]> | null = null

export function cachedInquiries(): Inquiry[] | null {
  return cache
}

export function loadInquiries(): Promise<Inquiry[]> {
  if (cache) return Promise.resolve(cache)
  if (inflight) return inflight
  inflight = fetch('/api/admin/inquiries', { credentials: 'same-origin', cache: 'no-store' })
    .then(async (res) => {
      if (res.status === 401) throw new Error('unauthorized')
      if (!res.ok) throw new Error('error')
      const data = (await res.json()) as { inquiries?: Inquiry[] }
      cache = Array.isArray(data.inquiries) ? data.inquiries : []
      return cache
    })
    .finally(() => {
      inflight = null
    })
  return inflight
}

export function invalidateInquiries() {
  cache = null
  window.dispatchEvent(new Event(INQUIRIES_EVENT))
}

export async function submitInquiry(input: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      credentials: 'same-origin',
      headers: HEADERS,
      body: JSON.stringify(input),
    })
    if (res.ok) return 'ok'
    if (res.status === 429) return 'rate_limited'
    if (res.status === 400) return 'invalid'
    return 'error'
  } catch {
    return 'error'
  }
}

function mutationResult(status: number): MutationResult {
  if (status === 404) return 'not_found'
  if (status === 401) return 'unauthorized'
  return 'error'
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
): Promise<{ result: MutationResult; inquiry?: Inquiry }> {
  try {
    const res = await fetch(`/api/admin/inquiries/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: HEADERS,
      body: JSON.stringify({ status }),
    })
    if (!res.ok) return { result: mutationResult(res.status) }
    const data = (await res.json()) as { inquiry?: Inquiry }
    return { result: 'ok', inquiry: data.inquiry }
  } catch {
    return { result: 'error' }
  }
}

export async function deleteInquiry(id: string): Promise<MutationResult> {
  try {
    const res = await fetch(`/api/admin/inquiries/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: HEADERS,
      body: '{}',
    })
    return res.ok ? 'ok' : mutationResult(res.status)
  } catch {
    return 'error'
  }
}

export function nextStatus(status: InquiryStatus): InquiryStatus {
  if (status === 'New') return 'Contacted'
  return 'Booked'
}
