import { Logo } from './Logo'
import { IconInstagram, IconMail, IconSpotify } from './icons'
import { revealHidden, useReveal } from '../hooks/useReveal'

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]

const SOCIALS = [
  { icon: IconSpotify, href: 'https://open.spotify.com', label: 'Spotify' },
  { icon: IconInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: IconMail, href: 'mailto:hello@underwrld.xyz', label: 'Email' },
]

export function Footer() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between ${revealHidden}`}
        >
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Custom production, songwriting, vocal development and post-production
              for artists who want their sound taken further.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="eyebrow text-ink-dim transition-colors hover:text-accent-bright"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow inline-flex items-center gap-2.5 text-ink-dim transition-colors hover:text-accent-bright"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line-soft py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-muted">
            &copy; {new Date().getFullYear()} UNDERWRLD. All rights reserved.
          </p>
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span>Terms of Use</span>
            <span aria-hidden>&middot;</span>
            <span>Privacy Policy</span>
          </p>
          <p className="eyebrow text-muted">Nairobi &mdash; worldwide</p>
        </div>
      </div>
    </footer>
  )
}
