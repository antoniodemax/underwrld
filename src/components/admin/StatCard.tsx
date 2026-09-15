import type { StatCard as StatCardData } from '../../data/adminMock'

export function StatCard({ label, value, delta, positive, icon: Icon, primary }: StatCardData) {
  return (
    <div className="border border-line bg-surface p-6">
      <div className="flex items-center justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center ${
            primary ? 'bg-accent-soft text-accent-bright' : 'bg-surface-2 text-ink-dim'
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`eyebrow px-2 py-1 ${
            positive ? 'bg-success-soft text-success' : 'bg-surface-2 text-ink-dim'
          }`}
        >
          {delta}
        </span>
      </div>
      <p className="mt-6 font-display text-3xl font-semibold text-ink">{value}</p>
      <p className="eyebrow mt-2 text-muted">{label}</p>
    </div>
  )
}
