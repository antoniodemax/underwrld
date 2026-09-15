import { NavLink } from 'react-router-dom'
import { NAV_LINKS, NAV_LINKS_BOTTOM } from '../../data/adminMock'
import { Logo } from '../Logo'

type Props = {
  onNavigate?: () => void
}

function NavGroup({ links, onNavigate }: { links: typeof NAV_LINKS; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-1">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/admin'}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 border-l-2 px-4 py-2.5 text-sm transition-colors ${
              isActive
                ? 'border-accent-bright bg-accent-soft text-ink'
                : 'border-transparent text-ink-dim hover:text-ink'
            }`
          }
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          {label}
        </NavLink>
      ))}
    </div>
  )
}

export function AdminSidebar({ onNavigate }: Props) {
  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex h-16 items-center border-b border-line-soft px-5">
        <a href="/" aria-label="UNDERWRLD home">
          <Logo />
        </a>
      </div>

      <nav className="flex flex-1 flex-col justify-between overflow-y-auto py-5">
        <NavGroup links={NAV_LINKS} onNavigate={onNavigate} />
        <div className="mt-6 border-t border-line-soft pt-5">
          <NavGroup links={NAV_LINKS_BOTTOM} onNavigate={onNavigate} />
        </div>
      </nav>
    </div>
  )
}
