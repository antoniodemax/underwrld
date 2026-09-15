import { useState } from 'react'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { InquiryActions } from '../../components/admin/InquiryActions'
import { useInquiriesQuery } from '../../hooks/useInquiries'
import { timeAgo } from '../../lib/inquiryStats'

export function AdminSessions() {
  const { inquiries, loading, error, refresh } = useInquiriesQuery()
  const [notice, setNotice] = useState<string | null>(null)
  const sessions = inquiries.filter((i) => i.kind === 'session')

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Sessions" subtitle="Session requests submitted through the contact form." />

      {notice && (
        <p role="status" className="mt-6 border border-line-soft bg-surface px-4 py-3 text-sm text-ink-dim">
          {notice}
        </p>
      )}

      {error ? (
        <div className="mt-8 flex h-48 flex-col items-center justify-center border border-dashed border-line text-center">
          <p className="text-sm text-ink-dim">Couldn't load session requests.</p>
          <button type="button" onClick={refresh} className="eyebrow mt-3 text-accent-bright hover:underline">
            Try again
          </button>
        </div>
      ) : loading ? (
        <p className="eyebrow mt-8 text-muted">Loading…</p>
      ) : sessions.length === 0 ? (
        <div className="mt-8 flex h-48 flex-col items-center justify-center border border-dashed border-line text-center">
          <p className="text-sm text-ink-dim">No session requests yet</p>
          <p className="mt-1 max-w-xs text-xs text-muted">
            When someone requests a session on the site, it'll show up here.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto border border-line bg-surface">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="eyebrow text-muted">
                <th className="px-6 py-4 font-normal sm:px-7">Client</th>
                <th className="px-6 py-4 font-normal sm:px-7">Service</th>
                <th className="px-6 py-4 font-normal sm:px-7">Preferred date</th>
                <th className="px-6 py-4 font-normal sm:px-7">Submitted</th>
                <th className="px-6 py-4 font-normal sm:px-7">Status</th>
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
                    <InquiryActions
                      inquiry={session}
                      noun="session request"
                      layout="row"
                      onDeleted={() => setNotice('Session request deleted.')}
                    />
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
