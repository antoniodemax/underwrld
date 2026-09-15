import { useState } from 'react'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { IconToggleOff, IconToggleOn } from '../../components/admin/adminIcons'
import { ADMIN_USER } from '../../data/adminMock'

const field =
  'w-full border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors focus:border-accent-bright focus:outline-none'
const label = 'eyebrow mb-2 block text-muted'

const PREFERENCES = [
  { key: 'email', label: 'Email notifications', description: 'New inquiries, bookings and payments' },
  { key: 'sms', label: 'SMS reminders', description: 'Session reminders sent to your phone' },
  { key: 'weekly', label: 'Weekly summary report', description: 'A Monday morning recap of the week ahead' },
] as const

export function AdminSettings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({ email: true, sms: true, weekly: false })

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title="Settings" subtitle="Studio profile and notification preferences." />

      <div className="mt-8 border border-line bg-surface p-6 sm:p-7">
        <h3 className="font-display text-lg font-semibold text-ink">Studio Profile</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="studio-name">
              Studio name
            </label>
            <input id="studio-name" className={field} defaultValue="UNDERWRLD" />
          </div>
          <div>
            <label className={label} htmlFor="admin-name">
              Admin name
            </label>
            <input id="admin-name" className={field} defaultValue={ADMIN_USER.name} />
          </div>
          <div>
            <label className={label} htmlFor="contact-email">
              Contact email
            </label>
            <input id="contact-email" type="email" className={field} defaultValue="hello@underwrld.xyz" />
          </div>
          <div>
            <label className={label} htmlFor="phone">
              Phone
            </label>
            <input id="phone" type="tel" className={field} placeholder="+254 7xx xxx xxx" />
          </div>
        </div>
      </div>

      <div className="mt-6 border border-line bg-surface p-6 sm:p-7">
        <h3 className="font-display text-lg font-semibold text-ink">Notification Preferences</h3>
        <div className="mt-6 divide-y divide-line-soft">
          {PREFERENCES.map((pref) => {
            const on = toggles[pref.key]
            return (
              <div key={pref.key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-ink">{pref.label}</p>
                  <p className="mt-1 text-sm text-ink-dim">{pref.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={pref.label}
                  onClick={() => setToggles((t) => ({ ...t, [pref.key]: !t[pref.key] }))}
                  className={`flex-shrink-0 transition-colors ${on ? 'text-accent-bright' : 'text-muted'}`}
                >
                  {on ? <IconToggleOn className="h-6 w-10" /> : <IconToggleOff className="h-6 w-10" />}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        className="mt-6 bg-accent px-6 py-3.5 font-mono text-[13px] font-semibold tracking-[0.06em] text-accent-ink uppercase transition-[background-color,box-shadow] hover:bg-accent-bright hover:shadow-[0_0_28px_rgba(214,24,26,0.45)]"
      >
        Save changes
      </button>
    </div>
  )
}
