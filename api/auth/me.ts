import type { VercelRequest, VercelResponse } from '@vercel/node'
import { json, readSession } from '../../lib/http.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return json(res, 405, { error: 'method_not_allowed' })
  }
  const session = await readSession(req)
  if (!session) return json(res, 401, { authenticated: false })
  return json(res, 200, { authenticated: true, expiresAt: session.exp })
}
