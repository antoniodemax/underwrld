import { useEffect, useState } from 'react'
import { getSettings, SETTINGS_EVENT, type Settings } from '../lib/settingsStore'

export function useAdminSettings(): Settings {
  const [settings, setSettings] = useState<Settings>(() => getSettings())

  useEffect(() => {
    const refresh = () => setSettings(getSettings())
    window.addEventListener(SETTINGS_EVENT, refresh)
    window.addEventListener('storage', refresh)
    refresh()
    return () => {
      window.removeEventListener(SETTINGS_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  return settings
}
