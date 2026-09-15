export type InquiryKind = 'inquiry' | 'session'
export type InquiryStatus = 'New' | 'Contacted' | 'Booked'

export type Inquiry = {
  id: string
  kind: InquiryKind
  name: string
  email: string
  service: string
  preferredDate: string
  message: string
  status: InquiryStatus
  createdAt: string
}

const STORAGE_KEY = 'underwrld_inquiries'
export const INQUIRIES_EVENT = 'underwrld:inquiries'

function notify() {
  window.dispatchEvent(new Event(INQUIRIES_EVENT))
}

export function getInquiries(): Inquiry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function save(inquiries: Inquiry[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries))
    notify()
  } catch {
    // storage unavailable (private mode, quota, etc.) — fail silently
  }
}

export function addInquiry(input: {
  kind: InquiryKind
  name: string
  email: string
  service: string
  preferredDate: string
  message: string
}): Inquiry {
  const inquiry: Inquiry = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status: 'New',
    createdAt: new Date().toISOString(),
  }
  const all = getInquiries()
  save([inquiry, ...all])
  return inquiry
}

export function setInquiryStatus(id: string, status: InquiryStatus) {
  const all = getInquiries().map((i) => (i.id === id ? { ...i, status } : i))
  save(all)
}

export function nextStatus(status: InquiryStatus): InquiryStatus {
  if (status === 'New') return 'Contacted'
  if (status === 'Contacted') return 'Booked'
  return 'Booked'
}
