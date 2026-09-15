import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { IconFile } from '../../components/admin/adminIcons'

export function AdminDocuments() {
  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Documents" subtitle="Contracts, invoices and session files, all in one place." />

      <div className="mt-8 flex h-64 flex-col items-center justify-center border border-dashed border-line text-center">
        <span className="flex h-12 w-12 items-center justify-center bg-surface-2 text-ink-dim">
          <IconFile className="h-5 w-5" />
        </span>
        <p className="mt-4 text-sm text-ink-dim">No documents yet</p>
        <p className="mt-1 max-w-xs text-xs text-muted">
          Contracts, invoices and session files you upload for clients will appear here.
        </p>
      </div>
    </div>
  )
}
