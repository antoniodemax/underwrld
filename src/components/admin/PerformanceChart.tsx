import { PERFORMANCE_DATA } from '../../data/adminMock'
import { buildAreaPath, buildSmoothPath, scalePoints } from '../../lib/chartPath'

const WIDTH = 720
const HEIGHT = 260
const PAD_LEFT = 44
const PAD_BOTTOM = 28
const PAD_TOP = 12
const PAD_RIGHT = 8
const CHART_W = WIDTH - PAD_LEFT - PAD_RIGHT
const CHART_H = HEIGHT - PAD_TOP - PAD_BOTTOM

const LEGEND = [
  { label: 'Revenue', color: 'var(--color-accent-bright)' },
  { label: 'Sessions booked', color: 'var(--color-success-bright)' },
  { label: 'New clients', color: 'var(--color-ink-dim)' },
]

export function PerformanceChart() {
  const revenue = PERFORMANCE_DATA.map((d) => d.revenue)
  const sessions = PERFORMANCE_DATA.map((d) => d.sessions)
  const clients = PERFORMANCE_DATA.map((d) => d.clients)

  const maxRevenue = Math.max(...revenue)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round((maxRevenue * f) / 1000) * 1000)

  const revenuePoints = scalePoints(revenue, CHART_W, CHART_H, maxRevenue, 0)
  const sessionPoints = scalePoints(sessions, CHART_W, CHART_H, Math.max(...sessions), Math.min(...sessions) * 0.8)
  const clientPoints = scalePoints(clients, CHART_W, CHART_H, Math.max(...clients), Math.min(...clients) * 0.8)

  return (
    <div className="border border-line bg-surface p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Performance Overview</h3>
          <p className="mt-1 text-sm text-ink-dim">Revenue, sessions and new clients — last 12 months</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {LEGEND.map((item) => (
            <span key={item.label} className="eyebrow flex items-center gap-2 text-ink-dim">
              <span className="h-2 w-2 rounded-full" style={{ background: item.color }} aria-hidden />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mt-6 w-full"
        role="img"
        aria-label="Chart of monthly revenue, sessions booked and new clients over the last 12 months, all trending upward"
      >
        <defs>
          <linearGradient id="chart-revenue-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g transform={`translate(${PAD_LEFT},${PAD_TOP})`}>
          {yTicks.map((tick) => {
            const y = CHART_H - (tick / (yTicks[yTicks.length - 1] || 1)) * CHART_H
            return (
              <g key={tick}>
                <line x1={0} x2={CHART_W} y1={y} y2={y} stroke="var(--color-line-soft)" strokeWidth="1" />
                <text x={-10} y={y + 3} textAnchor="end" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="10">
                  {tick >= 1000 ? `${Math.round(tick / 1000)}k` : tick}
                </text>
              </g>
            )
          })}

          <path d={buildAreaPath(revenuePoints, CHART_H)} fill="url(#chart-revenue-fill)" />
          <path
            d={buildSmoothPath(sessionPoints)}
            fill="none"
            stroke="var(--color-success-bright)"
            strokeWidth="1.75"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d={buildSmoothPath(clientPoints)}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
            opacity="0.55"
          />
          <path
            d={buildSmoothPath(revenuePoints)}
            fill="none"
            stroke="var(--color-accent-bright)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {PERFORMANCE_DATA.map((d, i) => {
            if (i % 2 !== 0 && i !== PERFORMANCE_DATA.length - 1) return null
            const x = (i / (PERFORMANCE_DATA.length - 1)) * CHART_W
            return (
              <text
                key={d.month}
                x={x}
                y={CHART_H + 20}
                textAnchor="middle"
                fill="var(--color-muted)"
                fontFamily="var(--font-mono)"
                fontSize="10"
              >
                {d.month}
              </text>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
