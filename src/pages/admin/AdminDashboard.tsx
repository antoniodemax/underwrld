import { NotificationsPanel } from '../../components/admin/NotificationsPanel'
import { PerformanceChart } from '../../components/admin/PerformanceChart'
import { StatCard } from '../../components/admin/StatCard'
import { IconCalendar, IconBell } from '../../components/admin/adminIcons'
import { IconCheck, IconMail } from '../../components/icons'
import { useAdminSettings } from '../../hooks/useAdminSettings'
import { useInquiries } from '../../hooks/useInquiries'
import { countByKind, countByStatus } from '../../lib/inquiryStats'
import { ADMIN_USER } from '../../data/adminNav'

export function AdminDashboard() {
  const inquiries = useInquiries()
  const settings = useAdminSettings()
  const adminName = settings.adminName || ADMIN_USER.name

  const stats = [
    { label: 'Total Inquiries', value: countByKind(inquiries, 'inquiry'), icon: IconMail, primary: true },
    { label: 'Session Requests', value: countByKind(inquiries, 'session'), icon: IconCalendar },
    { label: 'Awaiting Response', value: countByStatus(inquiries, 'New'), icon: IconBell },
    { label: 'Booked', value: countByStatus(inquiries, 'Booked'), icon: IconCheck },
  ]

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Dashboard Overview</h1>
      <p className="mt-2 text-sm text-ink-dim sm:text-base">
        Welcome back, {adminName.split(' ')[0]} — here&apos;s what&apos;s come in from the site.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <PerformanceChart />
        <NotificationsPanel />
      </div>
    </div>
  )
}
