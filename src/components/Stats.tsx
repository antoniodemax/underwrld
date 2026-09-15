import { revealHidden, useReveal } from '../hooks/useReveal'

const STATS = [
  { value: '120+', label: 'Records produced' },
  { value: '40+', label: 'Artists developed' },
  { value: '7 yrs', label: 'On the board' },
]

export function Stats() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="border-y border-line-soft">
      <div
        ref={ref}
        className={`mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line-soft px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 ${revealHidden}`}
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="py-9 sm:px-8 sm:first:pl-0 sm:last:pr-0">
            <p className="font-display text-4xl font-semibold text-ink sm:text-5xl">
              {stat.value}
            </p>
            <p className="eyebrow mt-3 text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
