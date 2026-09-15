import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { CLIENTS, INQUIRIES, type InquiryStatus, type Client } from '../../data/adminMock'

const INQUIRY_TONE: Record<InquiryStatus, 'accent' | 'success' | 'neutral'> = {
  New: 'accent',
  Contacted: 'neutral',
  Booked: 'success',
}

const CLIENT_TONE: Record<Client['status'], 'accent' | 'success' | 'neutral'> = {
  Active: 'success',
  Inactive: 'neutral',
}

export function AdminClients() {
  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Clients" subtitle="New inquiries from the site's contact form, and your full client roster." />

      <div className="mt-8 border border-line bg-surface p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">New Inquiries</h3>
          <StatusBadge tone="accent">{`${INQUIRIES.filter((i) => i.status === 'New').length} new`}</StatusBadge>
        </div>
        <p className="mt-1 text-sm text-ink-dim">Submissions from the "Let's build something" contact form</p>

        <ul className="mt-6 divide-y divide-line-soft">
          {INQUIRIES.map((inquiry) => (
            <li key={inquiry.name} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-ink">{inquiry.name}</p>
                  <span className="eyebrow text-muted">{inquiry.service}</span>
                </div>
                <p className="mt-1 text-sm text-ink-dim">{inquiry.message}</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                <StatusBadge tone={INQUIRY_TONE[inquiry.status]}>{inquiry.status}</StatusBadge>
                <span className="eyebrow text-muted">{inquiry.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 overflow-x-auto border border-line bg-surface">
        <div className="p-6 pb-0 sm:p-7 sm:pb-0">
          <h3 className="font-display text-lg font-semibold text-ink">Client Roster</h3>
          <p className="mt-1 text-sm text-ink-dim">Everyone who has booked a session with UNDERWRLD</p>
        </div>
        <table className="mt-6 w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="eyebrow text-muted">
              <th className="px-6 py-3 font-normal sm:px-7">Client</th>
              <th className="px-6 py-3 font-normal sm:px-7">Sessions</th>
              <th className="px-6 py-3 font-normal sm:px-7">Last session</th>
              <th className="px-6 py-3 font-normal sm:px-7">Status</th>
            </tr>
          </thead>
          <tbody>
            {CLIENTS.map((client) => (
              <tr key={client.name} className="border-t border-line-soft">
                <td className="px-6 py-4 sm:px-7">
                  <p className="font-medium text-ink">{client.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{client.email}</p>
                </td>
                <td className="px-6 py-4 text-ink-dim sm:px-7">{client.sessions}</td>
                <td className="px-6 py-4 text-ink-dim sm:px-7">{client.lastSession}</td>
                <td className="px-6 py-4 sm:px-7">
                  <StatusBadge tone={CLIENT_TONE[client.status]}>{client.status}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
