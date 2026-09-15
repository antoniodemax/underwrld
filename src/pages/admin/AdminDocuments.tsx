import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { IconDollar, IconDownload, IconFile, IconWaveform } from '../../components/admin/adminIcons'
import { DOCUMENTS, type Document } from '../../data/adminMock'

const TYPE_ICON: Record<Document['type'], typeof IconFile> = {
  Contract: IconFile,
  Invoice: IconDollar,
  'Session file': IconWaveform,
}

export function AdminDocuments() {
  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Documents" subtitle="Contracts, invoices and session files, all in one place." />

      <div className="mt-8 overflow-x-auto border border-line bg-surface">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="eyebrow text-muted">
              <th className="px-6 py-4 font-normal sm:px-7">Document</th>
              <th className="px-6 py-4 font-normal sm:px-7">Client</th>
              <th className="px-6 py-4 font-normal sm:px-7">Size</th>
              <th className="px-6 py-4 font-normal sm:px-7">Date</th>
              <th className="px-6 py-4 font-normal sm:px-7" />
            </tr>
          </thead>
          <tbody>
            {DOCUMENTS.map((doc) => {
              const Icon = TYPE_ICON[doc.type]
              return (
                <tr key={doc.name} className="border-t border-line-soft">
                  <td className="px-6 py-4 sm:px-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-surface-2 text-ink-dim">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{doc.name}</p>
                        <p className="eyebrow text-muted">{doc.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ink-dim sm:px-7">{doc.client}</td>
                  <td className="px-6 py-4 text-ink-dim sm:px-7">{doc.size}</td>
                  <td className="px-6 py-4 text-ink-dim sm:px-7">{doc.date}</td>
                  <td className="px-6 py-4 sm:px-7">
                    <button
                      type="button"
                      aria-label={`Download ${doc.name}`}
                      className="text-ink-dim transition-colors hover:text-accent-bright"
                    >
                      <IconDownload className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
