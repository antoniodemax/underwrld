import type { MetricCard as MetricCardData } from '../../data/adminMock'
import { Sparkline } from './Sparkline'

export function MetricCard({ label, value, delta, positive, data }: MetricCardData) {
  return (
    <div className="flex flex-col border border-line bg-surface p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-2xl font-semibold whitespace-nowrap text-ink">{value}</p>
        <span
          className={`eyebrow flex-shrink-0 px-2 py-1 whitespace-nowrap ${
            positive ? 'bg-success-soft text-success' : 'bg-surface-2 text-ink-dim'
          }`}
        >
          {delta}
        </span>
      </div>
      <p className="eyebrow mt-2 text-muted">{label}</p>
      <Sparkline data={data} positive={positive} className="mt-5 h-9 w-full" />
    </div>
  )
}
