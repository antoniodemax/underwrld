import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { IconDownload } from '../../components/admin/adminIcons'
import { useInquiries } from '../../hooks/useInquiries'
import { downloadCsv } from '../../lib/csv'
import type { Inquiry } from '../../lib/inquiryStore'

function toRows(items: Inquiry[]) {
  return items.map((i) => ({
    name: i.name,
    email: i.email,
    kind: i.kind,
    service: i.service,
    preferredDate: i.preferredDate,
    message: i.message,
    status: i.status,
    createdAt: i.createdAt,
  }))
}

export function AdminReports() {
  const inquiries = useInquiries()
  const sessions = inquiries.filter((i) => i.kind === 'session')
  const today = new Date().toISOString().slice(0, 10)

  const reports = [
    {
      title: 'All Submissions',
      description: 'Every inquiry and session request, with current status',
      count: inquiries.length,
      onDownload: () => downloadCsv(`underwrld-submissions-${today}.csv`, toRows(inquiries)),
    },
    {
      title: 'Session Requests',
      description: 'Only session-request submissions',
      count: sessions.length,
      onDownload: () => downloadCsv(`underwrld-session-requests-${today}.csv`, toRows(sessions)),
    },
  ]

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Reports" subtitle="Export what's come in through the site as a CSV." />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {reports.map((report) => (
          <div key={report.title} className="flex items-start justify-between gap-4 border border-line bg-surface p-6">
            <div>
              <p className="eyebrow text-accent-bright">{report.count} records</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{report.title}</h3>
              <p className="mt-1 text-sm text-ink-dim">{report.description}</p>
            </div>
            <button
              type="button"
              onClick={report.onDownload}
              disabled={report.count === 0}
              aria-label={`Download ${report.title}`}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-ink/30 text-ink-dim transition-colors enabled:hover:border-accent-bright enabled:hover:text-accent-bright disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconDownload className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
