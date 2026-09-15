import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { IconLightbulb } from '../../components/admin/adminIcons'
import { INSIGHTS } from '../../data/adminMock'

export function AdminInsights() {
  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Insights" subtitle="Patterns worth knowing about, pulled from studio activity." />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {INSIGHTS.map((insight) => (
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
    </div>
  )
}
