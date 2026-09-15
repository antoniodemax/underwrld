import type { VercelRequest, VercelResponse } from '@vercel/node'
import { json, passesMutationChecks, readSession } from '../../../lib/http.js'
import { deleteInquiry, isInquiryStatus, isValidInquiryId, updateInquiryStatus } from '../../../lib/inquiries.js'

// Single-tenant authorization: the verified admin session (readSession) is the only principal allowed to
// mutate records, and it may act on any record. Identity comes from the session cookie, never the request.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH' && req.method !== 'DELETE') {
    res.setHeader('Allow', 'PATCH, DELETE')
    return json(res, 405, { error: 'method_not_allowed' })
  }

  const session = await readSession(req)
  if (!session) return json(res, 401, { error: 'unauthorized' })
  if (!passesMutationChecks(req, ['PATCH', 'DELETE'])) return json(res, 403, { error: 'forbidden' })

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
  if (!isValidInquiryId(id)) return json(res, 400, { error: 'bad_request' })

  try {
    if (req.method === 'DELETE') {
      const removed = await deleteInquiry(id)
      if (!removed) return json(res, 404, { error: 'not_found' })
      console.info('inquiry_deleted', { id })
      return json(res, 200, { ok: true })
    }

    const body = typeof req.body === 'object' && req.body !== null ? (req.body as { status?: unknown }) : null
    if (!body || !isInquiryStatus(body.status)) return json(res, 400, { error: 'bad_request' })

    const inquiry = await updateInquiryStatus(id, body.status)
    if (!inquiry) return json(res, 404, { error: 'not_found' })
    return json(res, 200, { ok: true, inquiry })
  } catch (error) {
    console.error('inquiry_mutation_failed', error instanceof Error ? error.message : 'unknown')
    return json(res, 500, { error: 'server_error' })
  }
}
