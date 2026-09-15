import { buildSmoothPath, scalePoints } from '../../lib/chartPath'

type Props = {
  data: number[]
  positive: boolean
  className?: string
}

const WIDTH = 120
const HEIGHT = 36
const PAD = 3

export function Sparkline({ data, positive, className }: Props) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const points = scalePoints(data, WIDTH, HEIGHT - PAD * 2, max, min).map((p) => ({
    x: p.x,
    y: p.y + PAD,
  }))
  const path = buildSmoothPath(points)
  const color = positive ? 'var(--color-success-bright)' : 'var(--color-ink-dim)'

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className={className} aria-hidden>
      <path d={path} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
