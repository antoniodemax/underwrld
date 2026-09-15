import { type FormEvent, useState } from 'react'
import { IconArrowRight, IconCheck, IconInstagram, IconMail, IconWhatsapp } from './icons'
import { revealHidden, useReveal } from '../hooks/useReveal'
import { submitInquiry, type InquiryKind, type SubmitResult } from '../lib/inquiryStore'

const SESSION_TYPES = [
  'Custom beat making',
  'Post-production analysis',
  'Vocal training',
  'Songwriting & arrangement',
  'Production consultation',
]

const CONTACTS = [
  { icon: IconMail, label: 'hello@underwrld.xyz', href: 'mailto:hello@underwrld.xyz' },
  { icon: IconInstagram, label: '@underwrld', href: 'https://instagram.com' },
  { icon: IconWhatsapp, label: 'WhatsApp', href: 'https://wa.me/' },
]

const field =
  'w-full border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors focus:border-accent-bright focus:outline-none'
const label = 'eyebrow mb-2 block text-muted'

const SUBMIT_ERRORS: Record<Exclude<SubmitResult, 'ok'>, string> = {
  invalid: 'Please check your details and try again.',
  rate_limited: "You've sent a few requests already — please try again in an hour.",
  error: "Something went wrong sending that. Please try again, or email us directly.",
}

export function Contact() {
  const [submitted, setSubmitted] = useState<InquiryKind | false>(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const info = useReveal<HTMLDivElement>()
  const card = useReveal<HTMLDivElement>(150)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
    const kind: InquiryKind = submitter?.value === 'session' ? 'session' : 'inquiry'
    const data = new FormData(form)

    setSending(true)
    setSubmitError(null)
    const result = await submitInquiry({
      kind,
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      service: String(data.get('type') ?? ''),
      preferredDate: String(data.get('date') ?? ''),
      message: String(data.get('message') ?? ''),
    })
    setSending(false)

    if (result !== 'ok') {
      setSubmitError(SUBMIT_ERRORS[result])
      return
    }
    setSubmitted(kind)
    form.reset()
  }

  return (
    <section id="contact" className="scroll-mt-16 border-t border-line-soft">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div ref={info} className={revealHidden}>
          <p className="eyebrow text-accent-bright">Work with us</p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.05] text-ink sm:text-[40px]">
            Let&apos;s build
            <br />
            something.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-dim">
            Tell us about the record you&apos;re trying to make. We&apos;ll reply
            within 48 hours with availability and a quote.
          </p>

          <ul className="mt-10 border-t border-line-soft">
            {CONTACTS.map(({ icon: Icon, label: text, href }) => (
              <li key={text} className="border-b border-line-soft">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4 text-sm text-ink-dim transition-colors hover:text-ink"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-accent-bright" />
                    {text}
                  </span>
                  <IconArrowRight className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent-bright" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div ref={card} className={`border border-line bg-surface p-6 sm:p-9 ${revealHidden}`}>
          {submitted ? (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center bg-success-soft text-success">
                <IconCheck className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                {submitted === 'session' ? 'Session request sent' : 'Inquiry sent'}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-ink-dim">
                Thanks &mdash; we&apos;ll get back to you within 48 hours with next steps.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="eyebrow mt-8 text-accent-bright hover:underline"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={label}>
                    Name
                  </label>
                  <input id="name" name="name" type="text" required placeholder="Your name" className={field} />
                </div>
                <div>
                  <label htmlFor="email" className={label}>
                    Email
                  </label>
                  <input id="email" name="email" type="email" required placeholder="you@email.com" className={field} />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="type" className={label}>
                    Service
                  </label>
                  <select id="type" name="type" required defaultValue="" className={field}>
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SESSION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className={label}>
                    Preferred date
                  </label>
                  <input id="date" name="date" type="date" className={`${field} [color-scheme:dark]`} />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={label}>
                  About the project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Genre, references, timeline, budget..."
                  className={`${field} resize-none`}
                />
              </div>

              {submitError && (
                <p role="alert" className="border border-line-soft bg-canvas px-4 py-3 text-sm text-ink-dim">
                  {submitError}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  name="intent"
                  value="inquiry"
                  disabled={sending}
                  className="flex-1 bg-accent px-6 py-4 font-mono text-[13px] font-semibold tracking-[0.06em] text-accent-ink uppercase transition-[background-color,box-shadow] enabled:hover:bg-accent-bright enabled:hover:shadow-[0_0_28px_rgba(214,24,26,0.45)] disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Submit an inquiry'}
                </button>
                <button
                  type="submit"
                  name="intent"
                  value="session"
                  disabled={sending}
                  className="flex flex-1 items-center justify-center border border-ink/30 px-6 py-3.5 font-mono text-[13px] font-semibold tracking-[0.06em] text-ink uppercase transition-colors enabled:hover:border-accent-bright enabled:hover:text-accent-bright disabled:opacity-60"
                >
                  Request a session
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
