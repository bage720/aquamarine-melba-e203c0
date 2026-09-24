import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  tone?: 'green' | 'gold' | 'ink'
  sublabel?: string
}

const toneStyles = {
  green: { bg: 'bg-green-800', ring: 'ring-green-700/30', icon: 'text-gold-300' },
  gold: { bg: 'bg-gold-500', ring: 'ring-gold-400/40', icon: 'text-green-950' },
  ink: { bg: 'bg-white', ring: 'ring-black/5', icon: 'text-green-800' },
} as const

export function StatCard({ icon: Icon, label, value, tone = 'ink', sublabel }: StatCardProps) {
  const styles = toneStyles[tone]
  const isFilled = tone !== 'ink'

  return (
    <div
      className={`rounded-2xl p-5 ring-1 ${styles.ring} ${
        isFilled ? styles.bg : 'bg-white'
      } shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium uppercase tracking-wide ${isFilled ? 'text-white/70' : 'text-ink-soft'}`}>
          {label}
        </span>
        <Icon className={`h-5 w-5 ${isFilled ? styles.icon : 'text-green-800'}`} aria-hidden="true" />
      </div>
      <div
        className={`mt-2 font-display text-2xl font-semibold tabular-nums sm:text-[1.65rem] ${
          isFilled ? 'text-white' : 'text-green-900'
        }`}
      >
        {value}
      </div>
      {sublabel && (
        <p className={`mt-1 text-xs ${isFilled ? 'text-white/60' : 'text-ink-soft'}`}>{sublabel}</p>
      )}
    </div>
  )
}
