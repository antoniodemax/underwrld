import { useState } from 'react'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { InquiryActions } from '../../components/admin/InquiryActions'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { useInquiriesQuery } from '../../hooks/useInquiries'
import { timeAgo } from '../../lib/inquiryStats'

export function AdminClients() {
  const { inquiries, loading, error, refresh } = useInquiriesQuery()
  const [notice, setNotice] = useState<string | null>(null)
  const generalInquiries = inquiries.filter((i) => i.kind === 'inquiry')
  const newCount = generalInquiries.filter((i) => i.status === 'New').length

  const clients = [...new Map(inquiries.filter((i) => i.status === 'Booked').map((i) => [i.email, i])).values()]

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Clients" subtitle="Inquiries from the site's contact form, and everyone you've booked." />

      <div className="mt-8 border border-line bg-surface p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Inquiries</h3>
          {newCount > 0 && <StatusBadge tone="accent">{`${newCount} new`}</StatusBadge>}
        </div>
        <p className="mt-1 text-sm text-ink-dim">Submissions from the "Let's build something" contact form</p>

        {notice && (
          <p role="status" className="mt-4 border border-line-soft bg-canvas px-4 py-3 text-sm text-ink-dim">
            {notice}
          </p>
        )}

        {error ? (
          <div className="mt-6 flex h-32 flex-col items-center justify-center border border-dashed border-line text-center">
            <p className="text-sm text-ink-dim">Couldn't load inquiries.</p>
            <button type="button" onClick={refresh} className="eyebrow mt-3 text-accent-bright hover:underline">
              Try again
            </button>
          </div>
        ) : loading ? (
          <p className="eyebrow mt-6 text-muted">Loading…</p>
        ) : generalInquiries.length === 0 ? (
          <div className="mt-6 flex h-32 flex-col items-center justify-center border border-dashed border-line text-center">
            <p className="text-sm text-ink-dim">No inquiries yet</p>
            <p className="mt-1 max-w-xs text-xs text-muted">
              When someone submits the contact form on the site, it'll show up here.
            </p>
          </div>
        ) : (
          <ul className="mt-6 divide-y divide-line-soft">
            {generalInquiries.map((inquiry) => (
              <li key={inquiry.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-semibold text-ink">{inquiry.name || 'Unnamed'}</p>
                    {inquiry.service && <span className="eyebrow text-muted">{inquiry.service}</span>}
                  </div>
                  <p className="mt-1 text-sm text-ink-dim">{inquiry.message || 'No message provided.'}</p>
                  <p className="mt-1 text-xs text-muted">{inquiry.email}</p>
                  <p className="eyebrow mt-2 text-muted">{timeAgo(inquiry.createdAt)}</p>
                </div>
                <div className="flex-shrink-0">
                  <InquiryActions inquiry={inquiry} noun="inquiry" onDeleted={() => setNotice('Inquiry deleted.')} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 border border-line bg-surface p-6 sm:p-7">
        <h3 className="font-display text-lg font-semibold text-ink">Client Roster</h3>
        <p className="mt-1 text-sm text-ink-dim">Anyone marked "Booked" from an inquiry or session request</p>

        {clients.length === 0 ? (
          <div className="mt-6 flex h-32 flex-col items-center justify-center border border-dashed border-line text-center">
            <p className="text-sm text-ink-dim">No clients yet</p>
            <p className="mt-1 max-w-xs text-xs text-muted">
              Mark an inquiry or session request as "Booked" to add someone here.
            </p>
          </div>
        ) : (
          <ul className="mt-6 divide-y divide-line-soft">
            {clients.map((client) => (
              <li key={client.email} className="flex items-center justify-between gap-3 py-4">
                <div>
                  <p className="text-sm font-medium text-ink">{client.name || 'Unnamed'}</p>
                  <p className="mt-0.5 text-xs text-muted">{client.email}</p>
                </div>
                <span className="eyebrow text-muted">{client.service}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
