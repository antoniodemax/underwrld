import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cachedInquiries, INQUIRIES_EVENT, invalidateInquiries, loadInquiries, type Inquiry } from '../lib/inquiryStore'

type QueryState = { inquiries: Inquiry[]; loading: boolean; error: 'error' | null }

export function useInquiriesQuery(): QueryState & { refresh: () => void } {
  const navigate = useNavigate()
  const [state, setState] = useState<QueryState>(() => {
    const cached = cachedInquiries()
    return { inquiries: cached ?? [], loading: cached === null, error: null }
  })

  useEffect(() => {
    let cancelled = false
    const run = () => {
      loadInquiries()
        .then((inquiries) => {
          if (!cancelled) setState({ inquiries, loading: false, error: null })
        })
        .catch((err: Error) => {
          if (cancelled) return
          if (err.message === 'unauthorized') {
            navigate('/admin/login', { replace: true })
            return
          }
          setState((s) => ({ ...s, loading: false, error: 'error' }))
        })
    }
    run()
    window.addEventListener(INQUIRIES_EVENT, run)
    return () => {
      cancelled = true
      window.removeEventListener(INQUIRIES_EVENT, run)
    }
  }, [navigate])

  return { ...state, refresh: invalidateInquiries }
}

export function useInquiries(): Inquiry[] {
  return useInquiriesQuery().inquiries
}
