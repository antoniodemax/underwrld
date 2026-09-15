import { Link } from 'react-router-dom'
import { useInquiries } from '../../hooks/useInquiries'
import { timeAgo } from '../../lib/inquiryStats'
import { IconMail } from '../icons'
import { IconCalendar } from './adminIcons'

export function NotificationsPanel() {
  const inquiries = useInquiries()
  const recent = inquiries.slice(0, 5)

  return (
    <div className="flex h-full flex-col border border-line bg-surface p-6 sm:p-7">
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">Notifications</h3>
        <p className="mt-1 text-sm text-ink-dim">Recent activity</p>
      </div>

      {recent.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <p className="text-sm text-ink-dim">No notifications yet</p>
          <p className="mt-1 max-w-xs text-xs text-muted">
            New inquiries and session requests from the site will show up here.
          </p>
        </div>
      ) : (
        <ul className="mt-6 flex-1 space-y-1">
          {recent.map((item) => (
            <li key={item.id} className="flex gap-3 border-b border-line-soft py-4 last:border-b-0">
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center ${
                  item.kind === 'session' ? 'bg-accent-soft text-accent-bright' : 'bg-surface-2 text-ink-dim'
                }`}
              >
                {item.kind === 'session' ? <IconCalendar className="h-4 w-4" /> : <IconMail className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">
                    {item.kind === 'session' ? 'New session request' : 'New inquiry'}
                  </p>
                  {item.status === 'New' && (
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-bright" aria-label="Unread" />
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-ink-dim">
                  {item.name || 'Someone'} {item.service ? `— ${item.service}` : ''}
                </p>
                <p className="eyebrow mt-2 text-muted">{timeAgo(item.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/admin/notifications"
        className="mt-4 block border border-ink/30 px-6 py-3 text-center font-mono text-[13px] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-accent-bright hover:text-accent-bright"
      >
        View All Notifications
      </Link>
    </div>
  )
}
