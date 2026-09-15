import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { useInquiries } from '../../hooks/useInquiries'
import { timeAgo } from '../../lib/inquiryStats'
import { IconMail } from '../../components/icons'
import { IconCalendar } from '../../components/admin/adminIcons'

export function AdminNotifications() {
  const inquiries = useInquiries()

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title="Notifications" subtitle="Everything that's come in from the site, most recent first." />

      {inquiries.length === 0 ? (
        <div className="mt-8 flex h-48 flex-col items-center justify-center border border-dashed border-line text-center">
          <p className="text-sm text-ink-dim">No notifications yet</p>
          <p className="mt-1 max-w-xs text-xs text-muted">
            New inquiries and session requests from the site will show up here.
          </p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-line-soft border border-line bg-surface">
          {inquiries.map((item) => (
            <li key={item.id} className="flex gap-4 p-6">
              <span
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center ${
                  item.kind === 'session' ? 'bg-accent-soft text-accent-bright' : 'bg-surface-2 text-ink-dim'
                }`}
              >
                {item.kind === 'session' ? <IconCalendar className="h-4 w-4" /> : <IconMail className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-ink">
                    {item.kind === 'session' ? 'New session request' : 'New inquiry'}
                  </p>
                  {item.status === 'New' && (
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-bright" aria-label="Unread" />
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-dim">
                  {item.name || 'Someone'} {item.service ? `— ${item.service}` : ''}
                  {item.message ? `: "${item.message}"` : ''}
                </p>
                <p className="eyebrow mt-2 text-muted">{timeAgo(item.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
