import type { VercelRequest, VercelResponse } from '@vercel/node'
import { json, readSession } from '../../../lib/http.js'
import { listInquiries } from '../../../lib/inquiries.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return json(res, 405, { error: 'method_not_allowed' })
  }
  const session = await readSession(req)
  if (!session) return json(res, 401, { error: 'unauthorized' })

  try {
    return json(res, 200, { inquiries: await listInquiries() })
  } catch (error) {
    console.error('inquiry_list_failed', error instanceof Error ? error.message : 'unknown')
    return json(res, 500, { error: 'server_error' })
  }
}
