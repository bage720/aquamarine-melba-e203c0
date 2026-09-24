import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X, Phone, Instagram, Facebook } from 'lucide-react'
import { masjid } from '@/data/masjid'

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/kegiatan', label: 'Kegiatan' },
  { to: '/laporan', label: 'Laporan Keuangan' },
  { to: '/donasi', label: 'Donasi' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="hidden bg-green-950 px-4 py-1.5 text-xs text-gold-300 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3 w-3" aria-hidden="true" />
            {masjid.telepon} &middot; {masjid.email}
          </span>
          <span className="flex items-center gap-3">
            <a
              href={`https://instagram.com/${masjid.instagram.replace('@', '')}`}
              className="flex items-center gap-1 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="h-3 w-3" aria-hidden="true" /> {masjid.instagram}
            </a>
            <a
              href={`https://facebook.com/${encodeURIComponent(masjid.facebook)}`}
              className="flex items-center gap-1 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="h-3 w-3" aria-hidden="true" /> Facebook
            </a>
          </span>
        </div>
      </div>

      <div className="bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/.netlify/images?url=/img/logo-masjid.png&w=88&fm=webp"
              alt={`Logo ${masjid.nama}`}
              className="h-11 w-11"
            />
            <span className="font-display leading-tight">
              <span className="block text-base font-semibold text-green-900 sm:text-lg">
                {masjid.namaSingkat}
              </span>
              <span className="block text-[11px] tracking-wide text-ink-soft sm:text-xs">
                Sungai Mas
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-green-800"
                activeProps={{ className: 'text-green-800 font-semibold' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/donasi"
              className="rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-green-950 shadow-sm transition-transform hover:scale-[1.03] hover:bg-gold-400"
            >
              Donasi Sekarang
            </Link>
          </nav>

          <button
            type="button"
            className="rounded-lg p-2 text-green-900 lg:hidden"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gold-300/40 bg-cream lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="border-b border-black/5 py-3 text-sm font-medium text-ink-soft last:border-0"
                activeProps={{ className: 'text-green-800 font-semibold' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/donasi"
              onClick={() => setOpen(false)}
              className="my-3 rounded-full bg-gold-500 px-5 py-2.5 text-center text-sm font-semibold text-green-950"
            >
              Donasi Sekarang
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
