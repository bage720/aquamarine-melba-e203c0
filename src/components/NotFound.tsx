import { Link } from '@tanstack/react-router'
import { Compass, Home } from 'lucide-react'

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-7xl font-semibold text-green-800/20">404</span>
      <Compass className="mt-2 h-10 w-10 text-gold-500" aria-hidden="true" />
      <h1 className="mt-4 font-display text-2xl font-semibold text-green-900">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 max-w-md text-sm text-ink-soft">
        Tautan yang Anda tuju mungkin sudah berubah atau tidak tersedia. Silakan kembali ke
        beranda atau periksa halaman laporan keuangan terbaru.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full bg-green-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          <Home className="h-4 w-4" aria-hidden="true" /> Kembali ke Beranda
        </Link>
        <Link
          to="/laporan"
          className="flex items-center gap-2 rounded-full border border-green-800/30 px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-green-50"
        >
          Lihat Laporan Keuangan
        </Link>
      </div>
    </div>
  )
}
