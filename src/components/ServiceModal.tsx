import { useEffect, useRef } from 'react'
import { IconArrowRight, IconCheck, IconClose } from './icons'

export type Service = {
  title: string
  body: string
  includes: string[]
}

type Props = {
  service: Service | null
  onClose: () => void
}

export function ServiceModal({ service, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!service) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [service, onClose])

  if (!service) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-canvas/80 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto border border-line bg-surface p-7 sm:p-9"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-muted transition-colors hover:text-ink"
        >
          <IconClose className="h-5 w-5" />
        </button>

        <p className="eyebrow text-accent-bright">Service</p>
        <h3
          id="service-modal-title"
          className="mt-3 max-w-sm font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl"
        >
          {service.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ink-dim">{service.body}</p>

        <p className="eyebrow mt-8 text-muted">What&apos;s included</p>
        <ul className="mt-4 space-y-3">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ink">
              <IconCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
              {item}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={onClose}
          className="mt-9 inline-flex w-full items-center justify-center gap-2.5 bg-accent px-6 py-3.5 font-mono text-[13px] font-semibold tracking-[0.06em] text-accent-ink uppercase transition-[background-color,box-shadow] hover:bg-accent-bright hover:shadow-[0_0_28px_rgba(214,24,26,0.45)]"
        >
          Work with us
          <IconArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
