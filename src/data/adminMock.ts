import type { ComponentType } from 'react'
import {
  IconBarChart,
  IconBell,
  IconCalendar,
  IconClipboard,
  IconDollar,
  IconFile,
  IconGauge,
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

export type StatCard = {
  label: string
  value: string
  delta: string
  positive: boolean
  icon: IconComponent
  primary?: boolean
}

export const STAT_CARDS: StatCard[] = [
  { label: 'Monthly Revenue', value: '$18,420', delta: '+12.4%', positive: true, icon: IconDollar, primary: true },
  { label: 'Active Clients', value: '34', delta: '+3 this month', positive: true, icon: IconUsers },
  { label: 'Sessions Booked', value: '126', delta: '-4.1%', positive: false, icon: IconCalendar },
  { label: 'Studio Utilization', value: '78%', delta: '+6.2%', positive: true, icon: IconGauge },
]

export type ChartPoint = { month: string; revenue: number; sessions: number; clients: number }

export const PERFORMANCE_DATA: ChartPoint[] = [
  { month: 'Jan', revenue: 8200, sessions: 62, clients: 14 },
  { month: 'Feb', revenue: 9100, sessions: 68, clients: 16 },
  { month: 'Mar', revenue: 8700, sessions: 71, clients: 18 },
  { month: 'Apr', revenue: 10400, sessions: 79, clients: 19 },
  { month: 'May', revenue: 11800, sessions: 84, clients: 21 },
  { month: 'Jun', revenue: 11200, sessions: 88, clients: 23 },
  { month: 'Jul', revenue: 13100, sessions: 95, clients: 24 },
  { month: 'Aug', revenue: 14600, sessions: 101, clients: 27 },
  { month: 'Sep', revenue: 13900, sessions: 108, clients: 29 },
  { month: 'Oct', revenue: 16200, sessions: 114, clients: 31 },
  { month: 'Nov', revenue: 17300, sessions: 119, clients: 33 },
  { month: 'Dec', revenue: 18420, sessions: 126, clients: 34 },
]

export type MetricCard = {
  label: string
  value: string
  delta: string
  positive: boolean
  data: number[]
}

export const METRIC_CARDS: MetricCard[] = [
  {
    label: 'Avg. Session Length',
    value: '3.4 hrs',
    delta: '+0.3 hrs',
    positive: true,
    data: [2.6, 2.8, 2.7, 3.0, 3.1, 2.9, 3.2, 3.1, 3.3, 3.2, 3.4, 3.4],
  },
  {
    label: 'Client Retention',
    value: '86%',
    delta: '+2.1%',
    positive: true,
    data: [78, 79, 81, 80, 82, 83, 82, 84, 85, 84, 85, 86],
  },
  {
    label: 'Tracks Delivered',
    value: '212',
    delta: '+18',
    positive: true,
    data: [120, 130, 138, 145, 152, 161, 168, 176, 185, 194, 202, 212],
  },
]

export type NotificationTone = 'accent' | 'success' | 'neutral'

export type Notification = {
  icon: IconComponent
  title: string
  description: string
  time: string
  unread: boolean
  tone: NotificationTone
}

export const NOTIFICATIONS: Notification[] = [
  {
    icon: IconCalendar,
    title: 'New session booked',
    description: 'Amara K. booked Studio B for vocal tracking',
    time: '12m ago',
    unread: true,
    tone: 'accent',
  },
  {
    icon: IconFile,
    title: 'Mix delivered',
    description: "Final mix sent to client for 'Nightbloom EP'",
    time: '1h ago',
    unread: true,
    tone: 'neutral',
  },
  {
    icon: IconDollar,
    title: 'Payment received',
    description: 'Invoice #0142 paid — $1,200',
    time: '3h ago',
    unread: false,
    tone: 'success',
  },
  {
    icon: IconUsers,
    title: 'New client onboarded',
    description: 'Desmond R. signed for a 3-session package',
    time: 'Yesterday',
    unread: false,
    tone: 'neutral',
  },
  {
    icon: IconCalendar,
    title: 'Session rescheduled',
    description: "Thursday's writing session moved to 4pm",
    time: 'Yesterday',
    unread: false,
    tone: 'neutral',
  },
]

// --- Analytics ---

export type ServiceBreakdown = { service: string; share: number; revenue: string }

export const SERVICE_BREAKDOWN: ServiceBreakdown[] = [
  { service: 'Custom Beat Making', share: 34, revenue: '$6,260' },
  { service: 'Post-Production Analysis', share: 21, revenue: '$3,868' },
  { service: 'Vocal Training', share: 19, revenue: '$3,500' },
  { service: 'Songwriting & Arrangement', share: 16, revenue: '$2,947' },
  { service: 'Production Consultations', share: 10, revenue: '$1,845' },
]

// --- Clients & Inquiries ---

export type InquiryStatus = 'New' | 'Contacted' | 'Booked'

export type Inquiry = {
  name: string
  message: string
  service: string
  date: string
  status: InquiryStatus
}

export const INQUIRIES: Inquiry[] = [
  {
    name: 'Naledi M.',
    message: "Looking for a producer for a 5-track EP, leaning afrobeat/soul.",
    service: 'Custom Beat Making',
    date: 'Today',
    status: 'New',
  },
  {
    name: 'Jomo T.',
    message: 'Need a second opinion on my mix before release — can you review?',
    service: 'Post-Production Analysis',
    date: 'Today',
    status: 'New',
  },
  {
    name: 'Sana R.',
    message: "First time recording, want to work on breath control and range.",
    service: 'Vocal Training',
    date: 'Yesterday',
    status: 'Contacted',
  },
  {
    name: 'Big Kellz',
    message: 'Have the hook and verses written, need help finishing the arrangement.',
    service: 'Songwriting & Arrangement',
    date: '2 days ago',
    status: 'Booked',
  },
]

export type Client = {
  name: string
  email: string
  sessions: number
  lastSession: string
  status: 'Active' | 'Inactive'
}

export const CLIENTS: Client[] = [
  { name: 'Amara K.', email: 'amara.k@mail.com', sessions: 9, lastSession: '2 days ago', status: 'Active' },
  { name: 'Kai Velvet', email: 'kai.velvet@mail.com', sessions: 14, lastSession: '1 week ago', status: 'Active' },
  { name: 'Omar Dune', email: 'omar.dune@mail.com', sessions: 6, lastSession: '3 weeks ago', status: 'Active' },
  { name: 'VEXX', email: 'vexx@mail.com', sessions: 11, lastSession: '5 days ago', status: 'Active' },
  { name: 'Desmond R.', email: 'desmond.r@mail.com', sessions: 1, lastSession: 'Yesterday', status: 'Active' },
  { name: 'Tariq A.', email: 'tariq.a@mail.com', sessions: 4, lastSession: '2 months ago', status: 'Inactive' },
]

// --- Sessions ---

export type SessionStatus = 'Confirmed' | 'Pending' | 'Completed'

export type StudioSession = {
  client: string
  service: string
  studio: string
  date: string
  time: string
  status: SessionStatus
}

export const SESSIONS: StudioSession[] = [
  { client: 'Amara K.', service: 'Vocal Training', studio: 'Studio B', date: 'Today', time: '2:00 PM', status: 'Confirmed' },
  { client: 'Kai Velvet', service: 'Custom Beat Making', studio: 'Studio A', date: 'Today', time: '4:30 PM', status: 'Confirmed' },
  { client: 'Naledi M.', service: 'Custom Beat Making', studio: 'Studio A', date: 'Tomorrow', time: '11:00 AM', status: 'Pending' },
  { client: 'Omar Dune', service: 'Post-Production Analysis', studio: 'Studio C', date: 'Thu, 18 Sep', time: '4:00 PM', status: 'Confirmed' },
  { client: 'VEXX', service: 'Production Consultation', studio: 'Studio B', date: 'Fri, 19 Sep', time: '1:00 PM', status: 'Pending' },
  { client: 'Desmond R.', service: 'Songwriting & Arrangement', studio: 'Studio A', date: 'Mon, 8 Sep', time: '3:00 PM', status: 'Completed' },
  { client: 'Tariq A.', service: 'Vocal Training', studio: 'Studio B', date: 'Fri, 5 Sep', time: '10:00 AM', status: 'Completed' },
]

// --- Reports ---

export type Report = {
  title: string
  description: string
  period: string
}

export const REPORTS: Report[] = [
  { title: 'Monthly Revenue Report', description: 'Full revenue breakdown by service and client', period: 'December 2026' },
  { title: 'Client Activity Report', description: 'Session frequency, retention and new signups', period: 'Q4 2026' },
  { title: 'Studio Utilization Report', description: 'Booked hours per studio room and time slot', period: 'December 2026' },
  { title: 'Session Summary Report', description: 'Every session logged this month, by status', period: 'December 2026' },
]

// --- Insights ---

export type Insight = { title: string; body: string }

export const INSIGHTS: Insight[] = [
  { title: 'Thursdays are your busiest day', body: '34% of weekly bookings land on Thursdays — worth a second engineer on shift.' },
  { title: 'Vocal Training is trending up', body: 'Bookings for Vocal Training are up 22% this quarter, the fastest-growing service.' },
  { title: 'Studio A runs near capacity', body: 'Studio A is booked at 91% utilization — Studio C has the most open availability.' },
  { title: 'Retention is climbing', body: 'Client retention has grown from 78% to 86% over the last 12 months.' },
]

// --- Documents ---

export type Document = {
  name: string
  type: 'Contract' | 'Invoice' | 'Session file'
  client: string
  size: string
  date: string
}

export const DOCUMENTS: Document[] = [
  { name: 'Kai Velvet — Production Agreement.pdf', type: 'Contract', client: 'Kai Velvet', size: '184 KB', date: '2 weeks ago' },
  { name: 'Invoice #0142.pdf', type: 'Invoice', client: 'Omar Dune', size: '96 KB', date: '3h ago' },
  { name: "Nightbloom EP — Final Mix.wav", type: 'Session file', client: 'Kai Velvet', size: '48.2 MB', date: '1h ago' },
  { name: 'Desmond R. — 3-Session Package.pdf', type: 'Contract', client: 'Desmond R.', size: '162 KB', date: 'Yesterday' },
  { name: 'Invoice #0141.pdf', type: 'Invoice', client: 'VEXX', size: '94 KB', date: '5 days ago' },
]
