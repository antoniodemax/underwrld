import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Logo'
import { fetchSession, signInWithGoogleCredential, type SignInResult } from '../../lib/adminAuth'

const GSI_SRC = 'https://accounts.google.com/gsi/client'
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined

type GoogleId = {
  initialize: (config: {
    client_id: string
    callback: (response: { credential?: string }) => void
    ux_mode: 'popup'
    auto_select: boolean
    itp_support: boolean
  }) => void
  renderButton: (parent: HTMLElement, options: Record<string, string | number>) => void
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleId } }
  }
}

const MESSAGES: Record<Exclude<SignInResult, 'ok'>, string> = {
  denied: "Access denied — this Google account isn't authorized for the UNDERWRLD admin.",
  invalid: "Sign-in couldn't be verified. Please try again.",
  error: 'Something went wrong on our side. Please try again in a moment.',
}

function loadGsi(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('gsi_load_failed')), { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = GSI_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('gsi_load_failed'))
    document.head.appendChild(script)
  })
}

export function AdminLogin() {
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'submitting' | 'unavailable'>('loading')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchSession().then((authenticated) => {
      if (!cancelled && authenticated) navigate('/admin', { replace: true })
    })

    if (!CLIENT_ID) {
      queueMicrotask(() => {
        if (!cancelled) setStatus('unavailable')
      })
      return () => {
        cancelled = true
      }
    }

    loadGsi()
      .then(() => {
        if (cancelled || !window.google || !buttonRef.current) return
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          ux_mode: 'popup',
          auto_select: false,
          itp_support: true,
          callback: async ({ credential }) => {
            if (!credential) return
            setStatus('submitting')
            setMessage(null)
            const result = await signInWithGoogleCredential(credential)
            if (result === 'ok') {
              navigate('/admin', { replace: true })
              return
            }
            setMessage(MESSAGES[result])
            setStatus('ready')
          },
        })
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'filled_black',
          size: 'large',
          shape: 'rectangular',
          text: 'signin_with',
          width: 280,
        })
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('unavailable')
      })

    return () => {
      cancelled = true
    }
  }, [navigate])

  return (
    <div className="flex min-h-svh items-center justify-center bg-canvas px-5 py-16 text-ink">
      <div className="w-full max-w-sm border border-line bg-surface p-8 sm:p-10">
        <Logo />
        <p className="eyebrow mt-8 text-accent-bright">Admin access</p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight text-ink">Sign in to continue</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">
          Restricted to authorized UNDERWRLD accounts. Your Google sign-in is verified on our server before any access is granted.
        </p>

        <div className="mt-8 min-h-[44px]">
          <div ref={buttonRef} className={status === 'submitting' ? 'pointer-events-none opacity-50' : ''} />
          {status === 'loading' && <p className="eyebrow text-muted">Loading sign-in…</p>}
          {status === 'unavailable' && (
            <p className="text-sm text-ink-dim">Sign-in is unavailable right now. Please try again later.</p>
          )}
        </div>

        {message && (
          <p role="alert" className="mt-5 border border-line-soft bg-canvas px-4 py-3 text-sm text-ink-dim">
            {message}
          </p>
        )}

        <a href="/" className="eyebrow mt-8 inline-block text-muted transition-colors hover:text-accent-bright">
          ← Back to site
        </a>
      </div>
    </div>
  )
}
