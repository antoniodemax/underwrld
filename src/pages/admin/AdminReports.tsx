import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { IconDownload } from '../../components/admin/adminIcons'
import { REPORTS } from '../../data/adminMock'

export function AdminReports() {
  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Reports" subtitle="Generated reports, ready to download." />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {REPORTS.map((report) => (
          <div key={report.title} className="flex items-start justify-between gap-4 border border-line bg-surface p-6">
            <div>
              <p className="eyebrow text-accent-bright">{report.period}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{report.title}</h3>
              <p className="mt-1 text-sm text-ink-dim">{report.description}</p>
            </div>
            <button
              type="button"
              aria-label={`Download ${report.title}`}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-ink/30 text-ink-dim transition-colors hover:border-accent-bright hover:text-accent-bright"
            >
              <IconDownload className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
