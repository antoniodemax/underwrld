import { useEffect, useState } from 'react'
import { getInquiries, INQUIRIES_EVENT, type Inquiry } from '../lib/inquiryStore'

export function useInquiries(): Inquiry[] {
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => getInquiries())

  useEffect(() => {
    const refresh = () => setInquiries(getInquiries())
    window.addEventListener(INQUIRIES_EVENT, refresh)
    window.addEventListener('storage', refresh)
    refresh()
    return () => {
      window.removeEventListener(INQUIRIES_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  return inquiries
}
