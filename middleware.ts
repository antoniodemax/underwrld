import { next } from '@vercel/functions'
import { SESSION_COOKIE, isAuthorizedSub, parseCookies, verifySessionToken } from './lib/session.js'

export const config = {
  runtime: 'nodejs',
  // Static assets and Vite dev-only module paths (/src, /node_modules, /@vite, /@react-refresh) never carry admin routes.
  matcher: ['/((?!assets/|images/|favicon.svg|src/|node_modules/|@).*)'],
}

const LOGIN_PATH = '/admin/login'

// Content-Security-Policy per Google Identity Services requirements
// (https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy).
// 'unsafe-inline' for styles only: React inline style attributes and Google Fonts. No inline scripts anywhere.
const CSP = [
  "default-src 'self'",
  "script-src 'self' https://accounts.google.com/gsi/client",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com/gsi/style",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://accounts.google.com/gsi/",
  "frame-src https://accounts.google.com/gsi/",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

function securityHeaders(url: URL): Record<string, string> {
  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  }
  // Vite's dev server injects an inline React Refresh preamble that a strict CSP would block.
  // Local dev is identified by the loopback host, which a production deployment can never be served as.
  const isLocalDev = url.hostname === 'localhost' || url.hostname === '127.0.0.1' || process.env.VERCEL_ENV === 'development'
  if (!isLocalDev) headers['Content-Security-Policy'] = CSP
  return headers
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const headers = securityHeaders(url)

  const isAdminRoute = url.pathname === '/admin' || url.pathname.startsWith('/admin/')
  if (!isAdminRoute || url.pathname === LOGIN_PATH) return next({ headers })

  const secret = process.env.SESSION_SECRET
  const token = parseCookies(request.headers.get('cookie'))[SESSION_COOKIE]
  const session = secret ? await verifySessionToken(secret, token) : null

  if (!session || !isAuthorizedSub(session.sub, process.env)) {
    // Fixed destination — never derived from the request, so no open-redirect surface.
    return new Response(null, {
      status: 302,
      headers: { ...headers, Location: new URL(LOGIN_PATH, url.origin).toString(), 'Cache-Control': 'no-store' },
    })
  }
  return next({ headers: { ...headers, 'Cache-Control': 'no-store' } })
}
