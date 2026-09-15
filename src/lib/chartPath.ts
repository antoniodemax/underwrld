export type Point = { x: number; y: number }

export function buildSmoothPath(points: Point[]): string {
  if (points.length === 0) return ''
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`

  let d = `M ${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
  }
  return d
}

export function buildAreaPath(points: Point[], baselineY: number): string {
  if (points.length === 0) return ''
  const line = buildSmoothPath(points)
  const first = points[0]
  const last = points[points.length - 1]
  return `${line} L ${last.x},${baselineY} L ${first.x},${baselineY} Z`
}

export function scalePoints(values: number[], width: number, height: number, max: number, min = 0): Point[] {
  const span = Math.max(max - min, 1)
  return values.map((value, i) => ({
    x: values.length === 1 ? width / 2 : (i / (values.length - 1)) * width,
    y: height - ((value - min) / span) * height,
  }))
}
