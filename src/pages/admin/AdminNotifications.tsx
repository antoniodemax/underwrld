import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { NOTIFICATIONS, type NotificationTone } from '../../data/adminMock'

const TONE_CLASSES: Record<NotificationTone, string> = {
  accent: 'bg-accent-soft text-accent-bright',
  success: 'bg-success-soft text-success',
  neutral: 'bg-surface-2 text-ink-dim',
}

export function AdminNotifications() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title="Notifications" subtitle="Everything that's happened across the studio recently." />

      <ul className="mt-8 divide-y divide-line-soft border border-line bg-surface">
        {NOTIFICATIONS.map((item) => (
          <li key={item.title} className="flex gap-4 p-6">
            <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center ${TONE_CLASSES[item.tone]}`}>
              <item.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-ink">{item.title}</p>
                {item.unread && <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-bright" aria-label="Unread" />}
              </div>
              <p className="mt-1 text-sm text-ink-dim">{item.description}</p>
              <p className="eyebrow mt-2 text-muted">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
