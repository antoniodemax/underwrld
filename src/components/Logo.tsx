export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img src="/images/logo-mark.png" alt="" aria-hidden className="h-9 w-auto sm:h-10" />
      <span className="font-display text-[15px] font-semibold tracking-[0.08em] text-ink">
        UNDERWRLD
      </span>
    </span>
  )
}
