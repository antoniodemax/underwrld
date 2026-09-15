export type Settings = {
  studioName: string
  adminName: string
  contactEmail: string
  phone: string
  toggles: Record<string, boolean>
}

export const DEFAULT_SETTINGS: Settings = {
  studioName: '',
  adminName: '',
  contactEmail: '',
  phone: '',
  toggles: { email: true, sms: true, weekly: false },
}

const STORAGE_KEY = 'underwrld_admin_settings'
export const SETTINGS_EVENT = 'underwrld:settings'

export function getSettings(): Settings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(next: Settings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event(SETTINGS_EVENT))
  } catch {
    // storage unavailable — nothing to persist
  }
}

export function initials(name: string, fallback: string): string {
  const trimmed = name.trim()
  if (!trimmed) return fallback
  const parts = trimmed.split(/\s+/)
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}
