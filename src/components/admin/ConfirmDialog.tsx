import { useEffect, useRef } from 'react'

type Props = {
  open: boolean
  title: string
  body: string
  confirmLabel: string
  busy?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDialog({ open, title, body, confirmLabel, busy = false, onCancel, onConfirm }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !busy) onCancel()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    cancelRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, busy, onCancel])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-canvas/80 backdrop-blur-sm" onClick={busy ? undefined : onCancel} aria-hidden />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-body"
        className="relative w-full max-w-md border border-line bg-surface p-7 sm:p-8"
      >
        <p className="eyebrow text-accent-bright">Confirm</p>
        <h3 id="confirm-dialog-title" className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
          {title}
        </h3>
        <p id="confirm-dialog-body" className="mt-3 text-sm leading-relaxed text-ink-dim">
          {body}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="border border-ink/30 px-6 py-3 font-mono text-[13px] font-semibold tracking-[0.06em] text-ink uppercase transition-colors enabled:hover:border-accent-bright enabled:hover:text-accent-bright disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="bg-accent px-6 py-3 font-mono text-[13px] font-semibold tracking-[0.06em] text-accent-ink uppercase transition-[background-color,box-shadow] enabled:hover:bg-accent-bright enabled:hover:shadow-[0_0_28px_rgba(214,24,26,0.45)] disabled:opacity-60"
          >
            {busy ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
