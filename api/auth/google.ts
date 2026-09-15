import type { VercelRequest, VercelResponse } from '@vercel/node'
import { OAuth2Client } from 'google-auth-library'
import { isSecure, json, passesCsrfChecks, requireEnv } from '../../lib/http.js'
import { constantTimeEqualString, createSessionToken, sessionCookieHeader } from '../../lib/session.js'

const MAX_CREDENTIAL_LENGTH = 4096
const googleClient = new OAuth2Client()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'method_not_allowed' })
  }
  if (!passesCsrfChecks(req)) return json(res, 403, { error: 'forbidden' })

  let clientId: string
  let sessionSecret: string
  try {
    clientId = requireEnv('VITE_GOOGLE_CLIENT_ID')
    sessionSecret = requireEnv('SESSION_SECRET')
  } catch {
    return json(res, 500, { error: 'server_error' })
  }

  const credential = typeof req.body === 'object' && req.body !== null ? (req.body as { credential?: unknown }).credential : undefined
  if (typeof credential !== 'string' || credential.length === 0 || credential.length > MAX_CREDENTIAL_LENGTH) {
    return json(res, 400, { error: 'bad_request' })
  }

  // Verifies signature against Google's live keys, issuer, audience (our client ID) and expiry.
  let payload
  try {
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: clientId })
    payload = ticket.getPayload()
  } catch {
    console.warn('admin_auth_token_rejected')
    return json(res, 401, { error: 'invalid_token' })
  }
  if (!payload?.sub || payload.email_verified !== true) {
    console.warn('admin_auth_token_unusable')
    return json(res, 401, { error: 'invalid_token' })
  }

  // Authorization: verified Google `sub` is the identity. Email is bootstrap-only.
  const allowedSub = process.env.ADMIN_GOOGLE_SUB?.trim()
  const bootstrapEmail = process.env.ADMIN_GOOGLE_EMAIL?.trim().toLowerCase()
  let authorized = false
  if (allowedSub) {
    authorized = constantTimeEqualString(payload.sub, allowedSub)
  } else if (bootstrapEmail && payload.email) {
    authorized = payload.email.toLowerCase() === bootstrapEmail
  }

  if (!authorized) {
    console.warn('admin_auth_denied', { sub: payload.sub })
    return json(res, 403, { error: 'access_denied' })
  }
  if (!allowedSub) {
    console.warn(`admin_auth_bootstrap: set ADMIN_GOOGLE_SUB=${payload.sub} in Vercel and remove ADMIN_GOOGLE_EMAIL`)
  }

  const token = await createSessionToken(sessionSecret, payload.sub)
  res.setHeader('Set-Cookie', sessionCookieHeader(token, isSecure(req)))
  return json(res, 200, { ok: true })
}
