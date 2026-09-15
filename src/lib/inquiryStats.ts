import type { Inquiry, InquiryKind, InquiryStatus } from './inquiryStore'

export function countByStatus(items: Inquiry[], status: InquiryStatus): number {
  return items.filter((i) => i.status === status).length
}

export function countByKind(items: Inquiry[], kind: InquiryKind): number {
  return items.filter((i) => i.kind === kind).length
}

export function serviceBreakdown(items: Inquiry[]) {
  const counts = new Map<string, number>()
  for (const item of items) {
    if (!item.service) continue
    counts.set(item.service, (counts.get(item.service) ?? 0) + 1)
  }
  const total = [...counts.values()].reduce((sum, n) => sum + n, 0)
  return [...counts.entries()]
    .map(([service, count]) => ({ service, count, share: total ? Math.round((count / total) * 100) : 0 }))
    .sort((a, b) => b.count - a.count)
}

export function dailyCounts(items: Inquiry[], days: number) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const buckets: { label: string; date: Date; count: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    buckets.push({ label: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d, count: 0 })
  }
  for (const item of items) {
    const created = new Date(item.createdAt)
    created.setHours(0, 0, 0, 0)
    const bucket = buckets.find((b) => b.date.getTime() === created.getTime())
    if (bucket) bucket.count += 1
  }
  return buckets
}

export function withinDays(items: Inquiry[], days: number): Inquiry[] {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  return items.filter((i) => new Date(i.createdAt).getTime() >= cutoff)
}

export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
