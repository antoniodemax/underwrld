type Tone = 'accent' | 'success' | 'neutral'

const TONE_CLASSES: Record<Tone, string> = {
  accent: 'bg-accent-soft text-accent-bright',
  success: 'bg-success-soft text-success',
  neutral: 'bg-surface-2 text-ink-dim',
}

export function StatusBadge({ tone, children }: { tone: Tone; children: string }) {
  return <span className={`eyebrow inline-block px-2 py-1 whitespace-nowrap ${TONE_CLASSES[tone]}`}>{children}</span>
}
