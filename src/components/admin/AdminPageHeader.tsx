type Props = {
  title: string
  subtitle: string
}

export function AdminPageHeader({ title, subtitle }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-ink-dim sm:text-base">{subtitle}</p>
    </div>
  )
}
