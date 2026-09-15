import type { VercelRequest, VercelResponse } from '@vercel/node'
import { json, readSession } from '../../lib/http.js'

// Reference protected endpoint: every future /api/admin/* handler must gate on readSession() the same way.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return json(res, 405, { error: 'method_not_allowed' })
  }
  const session = await readSession(req)
  if (!session) return json(res, 401, { error: 'unauthorized' })
  return json(res, 200, { ok: true })
}
