import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { PerformanceChart } from '../../components/admin/PerformanceChart'
import { SERVICE_BREAKDOWN } from '../../data/adminMock'

export function AdminAnalytics() {
  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        title="Analytics"
        subtitle="How revenue and demand break down across the studio's services."
      />

      <div className="mt-8">
        <PerformanceChart />
      </div>

      <div className="mt-6 border border-line bg-surface p-6 sm:p-7">
        <h3 className="font-display text-lg font-semibold text-ink">Revenue by Service</h3>
        <p className="mt-1 text-sm text-ink-dim">Share of this month's revenue, by service line</p>

        <div className="mt-6 space-y-5">
          {SERVICE_BREAKDOWN.map((item) => (
            <div key={item.service}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm text-ink">{item.service}</p>
                <p className="eyebrow text-muted">
                  {item.revenue} <span className="text-ink-dim">— {item.share}%</span>
                </p>
              </div>
              <div className="mt-2 h-1.5 w-full bg-line-soft">
                <div className="h-full bg-accent" style={{ width: `${item.share}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
