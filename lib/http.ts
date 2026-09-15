import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SESSION_COOKIE, isAuthorizedSub, parseCookies, verifySessionToken, type Session } from './session.js'

export const CSRF_HEADER = 'x-requested-with'
export const CSRF_HEADER_VALUE = 'underwrld-admin'

export function json(res: VercelResponse, status: number, body: Record<string, unknown>): void {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.status(status).send(JSON.stringify(body))
}

export function isSecure(req: VercelRequest): boolean {
  return firstHeader(req, 'x-forwarded-proto') === 'https'
}

function firstHeader(req: VercelRequest, name: string): string | undefined {
  const value = req.headers[name]
  return Array.isArray(value) ? value[0] : value
}

export function requestHost(req: VercelRequest): string | undefined {
  return firstHeader(req, 'x-forwarded-host') ?? firstHeader(req, 'host')
}

// State-changing requests must be same-origin (Origin header) and carry the custom header,
// which browsers never attach cross-site without a CORS preflight we do not answer.
export function passesCsrfChecks(req: VercelRequest): boolean {
  if (req.method !== 'POST') return false
  const contentType = firstHeader(req, 'content-type') ?? ''
  if (!contentType.toLowerCase().startsWith('application/json')) return false
  if (firstHeader(req, CSRF_HEADER) !== CSRF_HEADER_VALUE) return false

  const origin = firstHeader(req, 'origin')
  const host = requestHost(req)
  if (!origin || !host) return false
  let originHost: string
  try {
    originHost = new URL(origin).host
  } catch {
    return false
  }
  return originHost === host
}

export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    console.error(`missing_env:${name}`)
    throw new Error('server_misconfigured')
  }
  return value
}

export async function readSession(req: VercelRequest): Promise<Session | null> {
  const secret = process.env.SESSION_SECRET
  if (!secret) return null
  const token = parseCookies(firstHeader(req, 'cookie'))[SESSION_COOKIE]
  const session = await verifySessionToken(secret, token)
  if (!session) return null
  if (!isAuthorizedSub(session.sub, process.env)) return null
  return session
}
