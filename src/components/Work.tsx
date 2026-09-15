import { IconArrowRight, IconSpotify } from './icons'
import { revealHidden, useReveal } from '../hooks/useReveal'
import { RELEASES, SPOTIFY_ARTIST_URL } from '../data/catalogue'

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
            href={SPOTIFY_ARTIST_URL}
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
            <article key={release.spotifyTrackUrl} className="group flex flex-col bg-canvas">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
                {release.image ? (
                  <img
                    src={release.image}
                    alt={`${release.artist} — ${release.title}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center" aria-hidden>
                    <IconSpotify className="h-8 w-8 text-muted" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-base font-semibold uppercase tracking-[0.06em] text-ink">
                    {release.artist}
                  </h3>
                  <span className="eyebrow text-muted">{release.year}</span>
                </div>
                <p className="mt-1 text-sm text-ink-dim">{release.title}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {release.type}
                  </span>
                </div>

                <a
                  href={release.spotifyTrackUrl}
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
