import { useEffect, useState } from 'react'
import { IconArrowRight } from './icons'

const BAR_COUNT = 72
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const wave = Math.sin(i * 0.55) * 0.5 + Math.sin(i * 1.7) * 0.3 + Math.sin(i * 0.13) * 0.2
  return {
    height: Math.round(20 + Math.abs(wave) * 62),
    duration: 0.9 + Math.abs(Math.sin(i * 0.37)) * 0.8,
    delay: Math.abs(Math.sin(i * 0.71)) * 0.6,
  }
})

export function Hero() {
  const [playhead, setPlayhead] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.42 : 0.18,
  )

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setPlayhead((p) => (p + 0.006) % 1)
    }, 100)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-16">
      <img
        src="/images/hero-studio.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.92)_0%,rgba(10,10,10,0.78)_45%,rgba(10,10,10,0.55)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-canvas to-transparent"
        aria-hidden
      />
      <div
        className="animate-drift pointer-events-none absolute -top-16 -left-24 h-[420px] w-[420px] rounded-full bg-accent/25 blur-[110px]"
        aria-hidden
      />
      <div
        className="animate-drift-alt pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-accent-deep/20 blur-[130px]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <h1 className="max-w-3xl animate-fade-up text-[44px] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-b from-white to-ink/75 bg-clip-text text-transparent">
            Your sound.
          </span>
          <br />
          <span className="text-accent-bright">Taken</span>{' '}
          <span className="bg-gradient-to-b from-white to-ink/75 bg-clip-text text-transparent">
            further.
          </span>
        </h1>

        <p className="mt-7 max-w-md animate-fade-up text-base leading-relaxed text-ink-dim [animation-delay:180ms] sm:text-lg">
          UNDERWRLD helps artists turn ideas into finished records through custom
          production, songwriting, vocal development and professional
          post-production.
        </p>

        <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:270ms]">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 bg-accent px-6 py-3.5 font-mono text-[13px] font-semibold tracking-[0.06em] text-accent-ink uppercase transition-[background-color,box-shadow] hover:bg-accent-bright hover:shadow-[0_0_28px_rgba(214,24,26,0.45)]"
          >
            Work with us
            <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center border border-ink/30 px-6 py-3.5 font-mono text-[13px] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-accent-bright hover:text-accent-bright"
          >
            Explore services
          </a>
        </div>

        <div
          className="mt-16 flex h-16 max-w-xl animate-fade-up items-end gap-[3px] [animation-delay:360ms]"
          aria-hidden
        >
          {BARS.map((bar, i) => {
            const played = i / BAR_COUNT < playhead
            return (
              <span
                key={i}
                className={`animate-bar flex-1 rounded-[1px] ${played ? '' : 'bg-ink/25'}`}
                style={{
                  height: `${bar.height}%`,
                  animationDuration: `${bar.duration}s`,
                  animationDelay: `${bar.delay}s`,
                  background: played
                    ? 'linear-gradient(to top, var(--color-success-bright), var(--color-accent-bright))'
                    : undefined,
                }}
              />
            )
          })}
        </div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent-bright sm:flex"
      >
        <span className="eyebrow">Scroll</span>
        <IconArrowRight className="h-3.5 w-3.5 rotate-90" />
      </a>
    </section>
  )
}
