import type { ComponentType } from 'react'
import {
  IconBarChart,
  IconBell,
  IconCalendar,
  IconClipboard,
  IconFile,
  IconGear,
  IconGrid,
  IconLightbulb,
  IconUsers,
} from '../components/admin/adminIcons'

type IconComponent = ComponentType<{ className?: string }>

export const NAV_LINKS: { to: string; label: string; icon: IconComponent }[] = [
  { to: '/admin', label: 'Dashboard', icon: IconGrid },
  { to: '/admin/analytics', label: 'Analytics', icon: IconBarChart },
  { to: '/admin/clients', label: 'Clients', icon: IconUsers },
  { to: '/admin/sessions', label: 'Sessions', icon: IconCalendar },
  { to: '/admin/reports', label: 'Reports', icon: IconClipboard },
  { to: '/admin/insights', label: 'Insights', icon: IconLightbulb },
  { to: '/admin/documents', label: 'Documents', icon: IconFile },
]

export const NAV_LINKS_BOTTOM: { to: string; label: string; icon: IconComponent }[] = [
  { to: '/admin/notifications', label: 'Notifications', icon: IconBell },
  { to: '/admin/settings', label: 'Settings', icon: IconGear },
]

export const ADMIN_USER = {
  name: 'Anthony Onyango',
  role: 'Studio Admin',
  initials: 'AO',
}
