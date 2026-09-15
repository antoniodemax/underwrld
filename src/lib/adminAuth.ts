const CSRF_HEADERS = { 'Content-Type': 'application/json', 'X-Requested-With': 'underwrld-admin' }

export type SignInResult = 'ok' | 'denied' | 'invalid' | 'error'

export async function fetchSession(): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'same-origin', cache: 'no-store' })
    return res.ok
  } catch {
    return false
  }
}

export async function signInWithGoogleCredential(credential: string): Promise<SignInResult> {
  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      credentials: 'same-origin',
      headers: CSRF_HEADERS,
      body: JSON.stringify({ credential }),
    })
    if (res.ok) return 'ok'
    if (res.status === 403) return 'denied'
    if (res.status === 401 || res.status === 400) return 'invalid'
    return 'error'
  } catch {
    return 'error'
  }
}

export async function signOut(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin', headers: CSRF_HEADERS, body: '{}' })
  } catch {
    // The cookie is HttpOnly; if the request fails the session simply expires on its own.
  }
}
