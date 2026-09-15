import { IconArrowRight, IconSpotify } from './icons'
import { revealHidden, useReveal } from '../hooks/useReveal'

const RELEASES = [
  {
    artist: 'Kai Velvet',
    project: 'Nightwalk',
    year: '2026',
    tags: ['Production', 'Songwriting', 'Mixing'],
    image: '/images/work-1.jpg',
  },
  {
    artist: 'Omar Dune',
    project: 'Concrete Bloom',
    year: '2025',
    tags: ['Production', 'Post-production'],
    image: '/images/work-2.jpg',
  },
  {
    artist: 'VEXX',
    project: 'State Player',
    year: '2025',
    tags: ['Production', 'Vocal development'],
    image: '/images/work-3.jpg',
  },
]

export function Work() {
  const header = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>(150)

  return (
    <section id="work" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div
          ref={header}
          className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${revealHidden}`}
        >
          <div>
            <p className="eyebrow text-accent-bright">Selected work</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-[40px]">
              Out in the world
            </h2>
          </div>
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noreferrer"
            className="eyebrow inline-flex items-center gap-2 text-ink-dim transition-colors hover:text-accent-bright"
          >
            Full catalogue <IconArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div
          ref={grid}
          className={`mt-12 grid gap-px border border-line bg-line sm:grid-cols-3 ${revealHidden}`}
        >
          {RELEASES.map((release) => (
            <article key={release.artist} className="group flex flex-col bg-canvas">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
                <img
                  src={release.image}
                  alt={`${release.artist} — ${release.project}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-base font-semibold uppercase tracking-[0.06em] text-ink">
                    {release.artist}
                  </h3>
                  <span className="eyebrow text-muted">{release.year}</span>
                </div>
                <p className="mt-1 text-sm text-ink-dim">{release.project}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {release.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow mt-6 inline-flex items-center gap-2 text-ink transition-colors hover:text-accent-bright"
                >
                  <IconSpotify className="h-4 w-4 text-success" />
                  Listen on Spotify
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
