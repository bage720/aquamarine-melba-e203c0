import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

interface QRCodeBlockProps {
  value: string
  size?: number
  caption?: string
}

export function QRCodeBlock({ value, size = 168, caption }: QRCodeBlockProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: { dark: '#0b3d28', light: '#ffffff' },
    }).then((url) => {
      if (!cancelled) setDataUrl(url)
    })
    return () => {
      cancelled = true
    }
  }, [value, size])

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div
        className="flex items-center justify-center rounded-xl bg-white p-3 ring-1 ring-black/10"
        style={{ width: size + 24, height: size + 24 }}
      >
        {dataUrl ? (
          <img src={dataUrl} alt="Kode QR" width={size} height={size} />
        ) : (
          <div
            className="animate-pulse rounded-lg bg-cream-deep"
            style={{ width: size, height: size }}
          />
        )}
      </div>
      {caption && <p className="max-w-[220px] text-center text-xs text-ink-soft">{caption}</p>}
    </div>
  )
}
