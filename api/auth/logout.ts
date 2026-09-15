import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isSecure, json, passesCsrfChecks } from '../../lib/http.js'
import { clearSessionCookieHeader } from '../../lib/session.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'method_not_allowed' })
  }
  if (!passesCsrfChecks(req)) return json(res, 403, { error: 'forbidden' })
  res.setHeader('Set-Cookie', clearSessionCookieHeader(isSecure(req)))
  return json(res, 200, { ok: true })
}
