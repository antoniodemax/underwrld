import { useInquiries } from '../../hooks/useInquiries'
import { dailyCounts } from '../../lib/inquiryStats'
import { buildAreaPath, buildSmoothPath, scalePoints } from '../../lib/chartPath'

const WIDTH = 720
const HEIGHT = 220
const PAD_LEFT = 28
const PAD_BOTTOM = 24
const PAD_TOP = 12
const PAD_RIGHT = 8
const CHART_W = WIDTH - PAD_LEFT - PAD_RIGHT
const CHART_H = HEIGHT - PAD_TOP - PAD_BOTTOM
const DAYS = 14

export function PerformanceChart() {
  const inquiries = useInquiries()
  const buckets = dailyCounts(inquiries, DAYS)
  const total = inquiries.length

  return (
    <div className="border border-line bg-surface p-6 sm:p-7">
      <h3 className="font-display text-lg font-semibold text-ink">Inquiries Over Time</h3>
      <p className="mt-1 text-sm text-ink-dim">New inquiries and session requests, last {DAYS} days</p>

      {total === 0 ? (
        <div className="mt-6 flex h-48 flex-col items-center justify-center border border-dashed border-line text-center">
          <p className="text-sm text-ink-dim">No activity yet</p>
          <p className="mt-1 max-w-xs text-xs text-muted">
            This chart fills in as visitors submit inquiries or request sessions on the site.
          </p>
        </div>
      ) : (
        (() => {
          const values = buckets.map((b) => b.count)
          const max = Math.max(...values, 1)
          const points = scalePoints(values, CHART_W, CHART_H, max, 0)
          const step = Math.ceil(DAYS / 7)

          return (
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              className="mt-6 w-full"
              role="img"
              aria-label={`Chart of daily inquiries over the last ${DAYS} days`}
            >
              <defs>
                <linearGradient id="chart-inquiries-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g transform={`translate(${PAD_LEFT},${PAD_TOP})`}>
                {[0, 0.5, 1].map((f) => {
                  const y = CHART_H - f * CHART_H
                  return (
                    <g key={f}>
                      <line x1={0} x2={CHART_W} y1={y} y2={y} stroke="var(--color-line-soft)" strokeWidth="1" />
                      <text x={-8} y={y + 3} textAnchor="end" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="10">
                        {Math.round(max * f)}
                      </text>
                    </g>
                  )
                })}

                <path d={buildAreaPath(points, CHART_H)} fill="url(#chart-inquiries-fill)" />
                <path
                  d={buildSmoothPath(points)}
                  fill="none"
                  stroke="var(--color-accent-bright)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {buckets.map((b, i) => {
                  if (i % step !== 0 && i !== buckets.length - 1) return null
                  const x = (i / (buckets.length - 1)) * CHART_W
                  return (
                    <text
                      key={b.label + i}
                      x={x}
                      y={CHART_H + 18}
                      textAnchor="middle"
                      fill="var(--color-muted)"
                      fontFamily="var(--font-mono)"
                      fontSize="10"
                    >
                      {b.label}
                    </text>
                  )
                })}
              </g>
            </svg>
          )
        })()
      )}
    </div>
  )
}
