import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { useInquiries } from '../../hooks/useInquiries'
import { timeAgo } from '../../lib/inquiryStats'
import { nextStatus, setInquiryStatus, type InquiryStatus } from '../../lib/inquiryStore'

const TONE: Record<InquiryStatus, 'accent' | 'success' | 'neutral'> = {
  New: 'accent',
  Contacted: 'neutral',
  Booked: 'success',
}

export function AdminSessions() {
  const inquiries = useInquiries()
  const sessions = inquiries.filter((i) => i.kind === 'session')

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Sessions" subtitle="Session requests submitted through the contact form." />

      {sessions.length === 0 ? (
        <div className="mt-8 flex h-48 flex-col items-center justify-center border border-dashed border-line text-center">
          <p className="text-sm text-ink-dim">No session requests yet</p>
          <p className="mt-1 max-w-xs text-xs text-muted">
            When someone requests a session on the site, it'll show up here.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto border border-line bg-surface">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="eyebrow text-muted">
                <th className="px-6 py-4 font-normal sm:px-7">Client</th>
                <th className="px-6 py-4 font-normal sm:px-7">Service</th>
                <th className="px-6 py-4 font-normal sm:px-7">Preferred date</th>
                <th className="px-6 py-4 font-normal sm:px-7">Submitted</th>
                <th className="px-6 py-4 font-normal sm:px-7">Status</th>
                <th className="px-6 py-4 font-normal sm:px-7" />
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="border-t border-line-soft align-top">
                  <td className="px-6 py-4 sm:px-7">
                    <p className="font-medium text-ink">{session.name || 'Unnamed'}</p>
                    <p className="mt-0.5 text-xs text-muted">{session.email}</p>
                  </td>
                  <td className="px-6 py-4 text-ink-dim sm:px-7">{session.service || '—'}</td>
                  <td className="px-6 py-4 text-ink-dim sm:px-7">{session.preferredDate || 'No date given'}</td>
                  <td className="px-6 py-4 text-ink-dim sm:px-7">{timeAgo(session.createdAt)}</td>
                  <td className="px-6 py-4 sm:px-7">
                    <StatusBadge tone={TONE[session.status]}>{session.status}</StatusBadge>
                  </td>
                  <td className="px-6 py-4 sm:px-7">
                    {session.status !== 'Booked' && (
                      <button
                        type="button"
                        onClick={() => setInquiryStatus(session.id, nextStatus(session.status))}
                        className="eyebrow whitespace-nowrap text-accent-bright hover:underline"
                      >
                        Mark {nextStatus(session.status)}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
