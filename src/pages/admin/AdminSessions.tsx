import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { SESSIONS, type SessionStatus } from '../../data/adminMock'

const TONE: Record<SessionStatus, 'accent' | 'success' | 'neutral'> = {
  Confirmed: 'success',
  Pending: 'accent',
  Completed: 'neutral',
}

export function AdminSessions() {
  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Sessions" subtitle="Every booking across all three studios, upcoming and past." />

      <div className="mt-8 overflow-x-auto border border-line bg-surface">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="eyebrow text-muted">
              <th className="px-6 py-4 font-normal sm:px-7">Client</th>
              <th className="px-6 py-4 font-normal sm:px-7">Service</th>
              <th className="px-6 py-4 font-normal sm:px-7">Studio</th>
              <th className="px-6 py-4 font-normal sm:px-7">Date &amp; time</th>
              <th className="px-6 py-4 font-normal sm:px-7">Status</th>
            </tr>
          </thead>
          <tbody>
            {SESSIONS.map((session, i) => (
              <tr key={`${session.client}-${i}`} className="border-t border-line-soft">
                <td className="px-6 py-4 font-medium text-ink sm:px-7">{session.client}</td>
                <td className="px-6 py-4 text-ink-dim sm:px-7">{session.service}</td>
                <td className="px-6 py-4 text-ink-dim sm:px-7">{session.studio}</td>
                <td className="px-6 py-4 text-ink-dim sm:px-7">
                  {session.date} · {session.time}
                </td>
                <td className="px-6 py-4 sm:px-7">
                  <StatusBadge tone={TONE[session.status]}>{session.status}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
