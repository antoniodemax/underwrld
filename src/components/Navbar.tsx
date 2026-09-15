import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { IconClose, IconMenu } from './icons'

const LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        )
        setActive(`#${topMost.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled || open ? 'border-line-soft bg-canvas/90 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="UNDERWRLD home">
          <Logo />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative py-1 font-mono text-[15px] tracking-[0.06em] uppercase transition-colors hover:text-ink ${
                link.href === active
                  ? 'text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-accent-bright'
                  : 'text-ink-dim'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden bg-accent px-4 py-2.5 font-mono text-[13px] font-semibold tracking-[0.06em] text-accent-ink uppercase transition-[background-color,box-shadow] hover:bg-accent-bright hover:shadow-[0_0_20px_rgba(214,24,26,0.4)] md:inline-block"
        >
          Work with us
        </a>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line-soft bg-canvas px-5 pb-6 md:hidden">
          <div className="flex flex-col pt-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-line-soft py-4 font-mono text-lg tracking-[0.04em] uppercase hover:text-ink ${
                  link.href === active ? 'text-ink' : 'text-ink-dim'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-5 bg-accent px-4 py-3.5 text-center font-mono text-[13px] font-semibold tracking-[0.06em] text-accent-ink uppercase"
            >
              Work with us
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
