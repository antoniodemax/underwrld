import type { ComponentType } from 'react'

type Props = {
  label: string
  value: string | number
  icon: ComponentType<{ className?: string }>
  primary?: boolean
}

export function StatCard({ label, value, icon: Icon, primary }: Props) {
  return (
    <div className="border border-line bg-surface p-6">
      <span
        className={`flex h-10 w-10 items-center justify-center ${
          primary ? 'bg-accent-soft text-accent-bright' : 'bg-surface-2 text-ink-dim'
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-6 font-display text-3xl font-semibold text-ink">{value}</p>
      <p className="eyebrow mt-2 text-muted">{label}</p>
    </div>
  )
}
