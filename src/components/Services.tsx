import { useState } from 'react'
import { IconArrowRight } from './icons'
import { revealHidden, useReveal } from '../hooks/useReveal'
import { ServiceModal, type Service } from './ServiceModal'

const SERVICES: Service[] = [
  {
    title: 'Custom Beat Making',
    body: 'Original instrumentals built around the artist — sound, genre, identity and creative direction.',
    includes: [
      'Genre-matched instrumental built from scratch',
      'Up to 3 rounds of revisions',
      'Full trackout stems plus a mixed reference',
      'Full commercial usage rights on delivery',
    ],
  },
  {
    title: 'Post-Production Analysis',
    body: 'Detailed analysis and feedback covering production, arrangement, vocals, mixing and overall song quality.',
    includes: [
      'Full session review across arrangement, mix and vocals',
      'Written feedback report with specific fixes',
      'Prioritised list of next steps',
      'Follow-up call to walk through the notes',
    ],
  },
  {
    title: 'Vocal Training',
    body: 'Develop vocal technique, delivery, confidence, control and performance for the record.',
    includes: [
      'One-on-one coaching sessions',
      'Breath control and pitch technique',
      'Delivery and performance coaching',
      'A practice plan tailored to your voice',
    ],
  },
  {
    title: 'Songwriting & Arrangement',
    body: 'Lyrics, melodies, harmonies, structure and arrangement that make the idea land.',
    includes: [
      'Lyric and melody development',
      'Song structure and arrangement',
      'Hook and chorus refinement',
      'Collaborative writing sessions',
    ],
  },
  {
    title: 'Production Consultations',
    body: 'One-on-one professional guidance for artists and creators looking to improve their music and process.',
    includes: [
      '1:1 strategy session',
      'Feedback on works-in-progress',
      'Workflow and gear guidance',
      'Input on career and release planning',
    ],
  },
]

export function Services() {
  const header = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>(150)
  const [active, setActive] = useState<Service | null>(null)

  return (
    <section id="services" className="relative scroll-mt-16">
      <div className="sticky top-16 z-0 h-[calc(100svh_-_4rem)] overflow-hidden" aria-hidden>
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[85vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-[90px] sm:h-[700px] sm:w-[700px] sm:blur-[150px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[70vh] w-[70vw] -translate-x-[30%] -translate-y-[68%] rounded-full bg-success/28 blur-[90px] sm:h-[560px] sm:w-[560px] sm:blur-[150px]" />
        <img
          src="/images/logo-mark.png"
          alt=""
          className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 h-[380px] w-auto -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-screen sm:h-[540px] lg:h-[660px]"
        />
      </div>

      <div className="relative z-10 mx-auto -mt-[calc(100svh_-_4rem)] max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div
          ref={header}
          className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${revealHidden}`}
        >
          <div>
            <p className="eyebrow text-accent-bright">What we do</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-[40px]">
              Five ways we
              <br />
              move a record
            </h2>
          </div>
          <a
            href="#services-grid"
            className="eyebrow inline-flex items-center gap-2 text-ink-dim transition-colors hover:text-accent-bright"
          >
            All services <IconArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div
          id="services-grid"
          ref={grid}
          className={`mt-12 scroll-mt-24 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 ${revealHidden}`}
        >
          {SERVICES.map((service) => (
            <article
              key={service.title}
              role="button"
              tabIndex={0}
              onClick={() => setActive(service)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setActive(service)
                }
              }}
              className="group flex min-h-64 cursor-pointer flex-col bg-canvas/35 p-7 backdrop-blur-sm outline-none transition-[background-color,box-shadow] hover:bg-surface/55 focus-visible:bg-surface/55 hover:shadow-[inset_0_0_0_1px_var(--color-accent)] focus-visible:shadow-[inset_0_0_0_1px_var(--color-accent)]"
            >
              <div className="flex items-start justify-end">
                <span className="text-muted transition-colors group-hover:text-accent-bright" aria-hidden>
                  +
                </span>
              </div>
              <h3 className="mt-8 font-display text-xl font-semibold leading-snug text-ink">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{service.body}</p>
              <span className="mt-auto inline-flex items-center gap-3 pt-8 font-mono text-[13px] tracking-[0.06em] text-ink uppercase transition-colors group-hover:text-accent-bright">
                View details
                <span className="h-px w-6 bg-accent transition-[width] group-hover:w-9" aria-hidden />
              </span>
            </article>
          ))}

          <aside className="flex min-h-64 flex-col justify-between bg-surface/35 p-7 backdrop-blur-sm">
            <h3 className="font-display text-xl font-semibold leading-snug text-ink">
              Not sure which
              <br />
              one you need?
            </h3>
            <a
              href="#contact"
              className="inline-flex items-center justify-center border border-ink/30 px-6 py-3.5 font-mono text-[13px] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-accent-bright hover:text-accent-bright"
            >
              Talk to us
            </a>
          </aside>
        </div>
      </div>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  )
}
