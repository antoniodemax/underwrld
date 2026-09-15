import { useNavigate } from 'react-router-dom'
import { ADMIN_USER } from '../../data/adminMock'
import { useAdminSettings } from '../../hooks/useAdminSettings'
import { useInquiries } from '../../hooks/useInquiries'
import { signOut } from '../../lib/adminAuth'
import { countByStatus } from '../../lib/inquiryStats'
import { initials as computeInitials } from '../../lib/settingsStore'
import { IconBell, IconSearch } from './adminIcons'
import { IconMenu } from '../icons'

type Props = {
  onOpenSidebar: () => void
}

export function AdminTopbar({ onOpenSidebar }: Props) {
  const navigate = useNavigate()
  const unread = countByStatus(useInquiries(), 'New')
  const settings = useAdminSettings()
  const adminName = settings.adminName || ADMIN_USER.name

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-line-soft bg-canvas/90 px-5 backdrop-blur-md sm:px-7">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Open menu"
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center text-ink-dim hover:text-ink lg:hidden"
      >
        <IconMenu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-sm flex-1 sm:block">
        <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          placeholder="Search analytics, clients, sessions..."
          className="w-full border border-line bg-surface py-2 pr-3 pl-9 text-sm text-ink placeholder:text-muted transition-colors focus:border-accent-bright focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-5">
        <button
          type="button"
          onClick={() => navigate('/admin/notifications')}
          aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
          className="relative flex h-9 w-9 items-center justify-center text-ink-dim hover:text-ink"
        >
          <IconBell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-bright" aria-hidden />
          )}
        </button>

        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center bg-surface-2 font-display text-xs font-semibold text-ink">
            {computeInitials(adminName, ADMIN_USER.initials)}
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold text-ink">{adminName}</span>
            <span className="eyebrow text-muted">{ADMIN_USER.role}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={async () => {
            await signOut()
            navigate('/admin/login', { replace: true })
          }}
          className="eyebrow text-muted transition-colors hover:text-accent-bright"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
