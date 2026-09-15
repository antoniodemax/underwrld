import { MetricCard } from '../../components/admin/MetricCard'
import { NotificationsPanel } from '../../components/admin/NotificationsPanel'
import { PerformanceChart } from '../../components/admin/PerformanceChart'
import { StatCard } from '../../components/admin/StatCard'
import { ADMIN_USER, METRIC_CARDS, STAT_CARDS } from '../../data/adminMock'

export function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Dashboard Overview</h1>
      <p className="mt-2 text-sm text-ink-dim sm:text-base">
        Welcome back, {ADMIN_USER.name.split(' ')[0]} — here&apos;s what&apos;s happening at the studio today.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <PerformanceChart />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {METRIC_CARDS.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>
        <NotificationsPanel />
      </div>
    </div>
  )
}
