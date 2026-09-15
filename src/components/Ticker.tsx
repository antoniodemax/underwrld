const ITEMS = [
  'Custom beat making',
  'Post-production analysis',
  'Vocal training',
  'Songwriting & arrangement',
  'Production consultations',
  'Mixing & mastering',
]

export function Ticker() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <div className="overflow-hidden border-y border-line-soft bg-canvas py-3.5" aria-hidden>
      <div className="flex w-max animate-ticker">
        {loop.map((item, i) => (
          <span key={i} className="eyebrow flex items-center gap-8 pr-8 text-muted">
            {item}
            <span className="h-1.5 w-1.5 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
