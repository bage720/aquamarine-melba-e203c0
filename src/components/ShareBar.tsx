import { useState } from 'react'
import { Share2, MessageCircle, Facebook, Link2, Check } from 'lucide-react'

interface ShareBarProps {
  path: string
  title: string
  label?: string
  className?: string
}

function resolveUrl(path: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`
  }
  return `https://masjidsyuhada.id${path}`
}

export function ShareBar({ path, title, label, className = '' }: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  function handleWhatsApp() {
    const url = resolveUrl(path)
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank', 'noopener,noreferrer')
  }

  function handleFacebook() {
    const url = resolveUrl(path)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  async function handleCopy() {
    const url = resolveUrl(path)
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Salin tautan ini:', url)
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {label && (
        <span className="flex items-center gap-1.5 text-sm font-medium text-ink-soft">
          <Share2 className="h-4 w-4" aria-hidden="true" />
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={handleWhatsApp}
        className="flex items-center gap-1.5 rounded-full border border-green-700/20 bg-white px-3 py-1.5 text-xs font-semibold text-green-800 transition-colors hover:bg-green-50"
      >
        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> WhatsApp
      </button>
      <button
        type="button"
        onClick={handleFacebook}
        className="flex items-center gap-1.5 rounded-full border border-green-700/20 bg-white px-3 py-1.5 text-xs font-semibold text-green-800 transition-colors hover:bg-green-50"
      >
        <Facebook className="h-3.5 w-3.5" aria-hidden="true" /> Facebook
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1.5 rounded-full border border-green-700/20 bg-white px-3 py-1.5 text-xs font-semibold text-green-800 transition-colors hover:bg-green-50"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" aria-hidden="true" /> Tersalin
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5" aria-hidden="true" /> Salin Link
          </>
        )}
      </button>
    </div>
  )
}
