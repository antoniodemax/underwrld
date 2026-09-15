import { NOTIFICATIONS, type NotificationTone } from '../../data/adminMock'

const TONE_CLASSES: Record<NotificationTone, string> = {
  accent: 'bg-accent-soft text-accent-bright',
  success: 'bg-success-soft text-success',
  neutral: 'bg-surface-2 text-ink-dim',
}

export function NotificationsPanel() {
  return (
    <div className="flex h-full flex-col border border-line bg-surface p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Notifications</h3>
          <p className="mt-1 text-sm text-ink-dim">Recent activity</p>
        </div>
      </div>

      <ul className="mt-6 flex-1 space-y-1">
        {NOTIFICATIONS.map((item) => (
          <li key={item.title} className="flex gap-3 border-b border-line-soft py-4 last:border-b-0">
            <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center ${TONE_CLASSES[item.tone]}`}>
              <item.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                {item.unread && (
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-bright" aria-label="Unread" />
                )}
              </div>
              <p className="mt-1 text-sm text-ink-dim">{item.description}</p>
              <p className="eyebrow mt-2 text-muted">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 border border-ink/30 px-6 py-3 font-mono text-[13px] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-accent-bright hover:text-accent-bright"
      >
        View All Notifications
      </button>
    </div>
  )
}
