import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  deleteInquiry,
  invalidateInquiries,
  nextStatus,
  updateInquiryStatus,
  type Inquiry,
  type InquiryStatus,
  type MutationResult,
} from '../../lib/inquiryStore'
import { ConfirmDialog } from './ConfirmDialog'
import { StatusBadge } from './StatusBadge'

const TONE: Record<InquiryStatus, 'accent' | 'success' | 'neutral'> = {
  New: 'accent',
  Contacted: 'neutral',
  Booked: 'success',
}

const ERRORS: Record<Exclude<MutationResult, 'ok' | 'unauthorized'>, string> = {
  not_found: 'This request no longer exists — it was already removed.',
  error: "Couldn't save that. Please try again.",
}

type Props = {
  inquiry: Inquiry
  noun: string
  onDeleted: () => void
  layout?: 'stack' | 'row'
}

export function InquiryActions({ inquiry, noun, onDeleted, layout = 'stack' }: Props) {
  const navigate = useNavigate()
  const [pending, setPending] = useState<'status' | 'delete' | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleOutcome(result: MutationResult) {
    if (result === 'unauthorized') {
      navigate('/admin/login', { replace: true })
      return
    }
    if (result === 'not_found') {
      setError(ERRORS.not_found)
      invalidateInquiries()
      return
    }
    if (result === 'error') setError(ERRORS.error)
  }

  async function markNext() {
    setPending('status')
    setError(null)
    const { result } = await updateInquiryStatus(inquiry.id, nextStatus(inquiry.status))
    setPending(null)
    if (result === 'ok') {
      invalidateInquiries()
      return
    }
    handleOutcome(result)
  }

  async function confirmDelete() {
    setPending('delete')
    setError(null)
    const result = await deleteInquiry(inquiry.id)
    setPending(null)
    setConfirming(false)
    if (result === 'ok') {
      invalidateInquiries()
      onDeleted()
      return
    }
    handleOutcome(result)
  }

  const busy = pending !== null
  const wrap = layout === 'row' ? 'flex flex-wrap items-center gap-4' : 'flex flex-col items-end gap-2'

  return (
    <>
      <div className={wrap}>
        <StatusBadge tone={TONE[inquiry.status]}>{inquiry.status}</StatusBadge>
        <div className="flex items-center gap-4">
          {inquiry.status !== 'Booked' && (
            <button
              type="button"
              onClick={markNext}
              disabled={busy}
              className="eyebrow whitespace-nowrap text-accent-bright enabled:hover:underline disabled:opacity-50"
            >
              {pending === 'status' ? 'Saving…' : `Mark ${nextStatus(inquiry.status)}`}
            </button>
          )}
          <button
            type="button"
            onClick={() => setConfirming(true)}
            disabled={busy}
            className="eyebrow whitespace-nowrap text-muted transition-colors enabled:hover:text-ink disabled:opacity-50"
          >
            Delete
          </button>
        </div>
        {error && (
          <p role="alert" className="max-w-xs text-xs text-ink-dim">
            {error}
          </p>
        )}
      </div>

      <ConfirmDialog
        open={confirming}
        title={`Delete this ${noun}?`}
        body={`This will permanently remove this ${noun} from ${inquiry.name || 'this person'} from the admin records. It can't be undone.`}
        confirmLabel="Delete"
        busy={pending === 'delete'}
        onCancel={() => setConfirming(false)}
        onConfirm={confirmDelete}
      />
    </>
  )
}
