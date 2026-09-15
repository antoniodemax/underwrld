// Shared by Vercel Edge Middleware and Node serverless functions — Web Crypto only, no Node-specific APIs.

export const SESSION_COOKIE = 'uw_admin_session'
const SESSION_TTL_SECONDS = 8 * 60 * 60
const MAX_TOKEN_LENGTH = 2048

export type Session = { sub: string; iat: number; exp: number }

const encoder = new TextEncoder()
const decoder = new TextDecoder()

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]*$/.test(value)) throw new Error('bad base64url')
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4)
  const binary = atob(padded)
  const out = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i)
  return out
}

async function hmacSha256(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(data)))
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

export function constantTimeEqualString(a: string, b: string): boolean {
  return constantTimeEqual(encoder.encode(a), encoder.encode(b))
}

export async function createSessionToken(secret: string, sub: string, now = Date.now()): Promise<string> {
  const iat = Math.floor(now / 1000)
  const payload: Session = { sub, iat, exp: iat + SESSION_TTL_SECONDS }
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)))
  const signature = toBase64Url(await hmacSha256(secret, body))
  return `${body}.${signature}`
}

export async function verifySessionToken(secret: string, token: string | undefined, now = Date.now()): Promise<Session | null> {
  if (!token || token.length > MAX_TOKEN_LENGTH) return null
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [body, signature] = parts

  let given: Uint8Array
  try {
    given = fromBase64Url(signature)
  } catch {
    return null
  }
  const expected = await hmacSha256(secret, body)
  if (!constantTimeEqual(expected, given)) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(decoder.decode(fromBase64Url(body)))
  } catch {
    return null
  }
  if (!parsed || typeof parsed !== 'object') return null
  const p = parsed as Record<string, unknown>
  if (typeof p.sub !== 'string' || p.sub.length === 0 || typeof p.iat !== 'number' || typeof p.exp !== 'number') return null

  const nowSeconds = Math.floor(now / 1000)
  if (p.exp <= nowSeconds) return null
  if (p.iat > nowSeconds + 60) return null
  if (p.exp - p.iat > SESSION_TTL_SECONDS) return null

  return { sub: p.sub, iat: p.iat, exp: p.exp }
}

export function parseCookies(header: string | null | undefined): Record<string, string> {
  const out: Record<string, string> = {}
  if (!header) return out
  for (const part of header.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    const name = part.slice(0, eq).trim()
    const value = part.slice(eq + 1).trim()
    if (name) out[name] = value
  }
  return out
}

export function sessionCookieHeader(token: string, secure: boolean): string {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}${secure ? '; Secure' : ''}`
}

export function clearSessionCookieHeader(secure: boolean): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure ? '; Secure' : ''}`
}

// Authorization is by verified Google `sub`. ADMIN_GOOGLE_EMAIL is a bootstrap-only fallback
// used to discover the sub on first login; once ADMIN_GOOGLE_SUB is set it is the only rule.
export function isAuthorizedSub(sub: string, env: { ADMIN_GOOGLE_SUB?: string }): boolean {
  const allowed = env.ADMIN_GOOGLE_SUB?.trim()
  if (!allowed) return true // bootstrap mode: email rule was already enforced at login
  return constantTimeEqualString(sub, allowed)
}
