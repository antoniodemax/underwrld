import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { PerformanceChart } from '../../components/admin/PerformanceChart'
import { useInquiries } from '../../hooks/useInquiries'
import { serviceBreakdown } from '../../lib/inquiryStats'

export function AdminAnalytics() {
  const inquiries = useInquiries()
  const breakdown = serviceBreakdown(inquiries)

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Analytics" subtitle="How demand breaks down across the studio's services." />

      <div className="mt-8">
        <PerformanceChart />
      </div>

      <div className="mt-6 border border-line bg-surface p-6 sm:p-7">
        <h3 className="font-display text-lg font-semibold text-ink">Requests by Service</h3>
        <p className="mt-1 text-sm text-ink-dim">Share of inquiries and session requests, by service</p>

        {breakdown.length === 0 ? (
          <div className="mt-6 flex h-32 flex-col items-center justify-center border border-dashed border-line text-center">
            <p className="text-sm text-ink-dim">No requests yet</p>
            <p className="mt-1 max-w-xs text-xs text-muted">
              This breaks down by service once inquiries start coming in.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {breakdown.map((item) => (
              <div key={item.service}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm text-ink">{item.service}</p>
                  <p className="eyebrow text-muted">
                    {item.count} <span className="text-ink-dim">— {item.share}%</span>
                  </p>
                </div>
                <div className="mt-2 h-1.5 w-full bg-line-soft">
                  <div className="h-full bg-accent" style={{ width: `${item.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
