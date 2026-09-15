import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { IconLightbulb } from '../../components/admin/adminIcons'
import { useInquiries } from '../../hooks/useInquiries'
import { serviceBreakdown, withinDays } from '../../lib/inquiryStats'

export function AdminInsights() {
  const inquiries = useInquiries()

  const insights: { title: string; body: string }[] = []

  const breakdown = serviceBreakdown(inquiries)
  if (breakdown.length > 0) {
    const top = breakdown[0]
    insights.push({
      title: `${top.service} leads demand`,
      body: `It accounts for ${top.share}% of everything submitted so far (${top.count} request${top.count === 1 ? '' : 's'}).`,
    })
  }

  const thisWeek = withinDays(inquiries, 7).length
  const lastTwoWeeks = withinDays(inquiries, 14).length
  const lastWeek = lastTwoWeeks - thisWeek
  if (inquiries.length > 0) {
    insights.push({
      title: `${thisWeek} submission${thisWeek === 1 ? '' : 's'} this week`,
      body:
        lastWeek === 0
          ? "That's up from none the week before."
          : `${thisWeek >= lastWeek ? 'Up' : 'Down'} from ${lastWeek} the week before.`,
    })
  }

  const total = inquiries.length
  const resolved = inquiries.filter((i) => i.status !== 'New').length
  if (total > 0) {
    const rate = Math.round((resolved / total) * 100)
    insights.push({
      title: `${rate}% response rate`,
      body: `${resolved} of ${total} submissions have been contacted or booked.`,
    })
  }

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Insights" subtitle="Patterns worth knowing about, pulled from real activity." />

      {insights.length === 0 ? (
        <div className="mt-8 flex h-48 flex-col items-center justify-center border border-dashed border-line text-center">
          <p className="text-sm text-ink-dim">Not enough activity yet</p>
          <p className="mt-1 max-w-xs text-xs text-muted">
            Insights will appear once a few inquiries or session requests have come in.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {insights.map((insight) => (
            <div key={insight.title} className="flex gap-4 border border-line bg-surface p-6">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-accent-soft text-accent-bright">
                <IconLightbulb className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">{insight.title}</h3>
                <p className="mt-1.5 text-sm text-ink-dim">{insight.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
