import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { IconClose } from '../icons'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopbar } from './AdminTopbar'

export function AdminLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-svh bg-canvas text-ink lg:flex">
      <aside className="hidden w-64 flex-shrink-0 border-r border-line-soft lg:block">
        <div className="fixed h-svh w-64">
          <AdminSidebar />
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} aria-hidden />
          <div className="relative flex h-full w-72 flex-col bg-surface">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center text-ink-dim hover:text-ink"
            >
              <IconClose className="h-5 w-5" />
            </button>
            <AdminSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <AdminTopbar onOpenSidebar={() => setOpen(true)} />
        <main className="px-5 py-8 sm:px-7 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
