interface SectionHeadingProps {
  kicker: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ kicker, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-600">
        {kicker}
      </span>
      <h2 className="mt-2 font-display text-2xl font-semibold text-green-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className={`mt-2 max-w-2xl text-sm text-ink-soft sm:text-base ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
