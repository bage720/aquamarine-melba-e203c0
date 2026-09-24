import { Link } from '@tanstack/react-router'
import { MapPin, Mail, Phone, MessageCircle, Clock } from 'lucide-react'
import { masjid } from '@/data/masjid'

export function Footer() {
  return (
    <>
      <footer className="bg-green-950 text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/.netlify/images?url=/img/logo-masjid.png&w=64&fm=webp"
                alt={`Logo ${masjid.nama}`}
                className="h-10 w-10"
              />
              <span className="font-display text-lg font-semibold">{masjid.namaSingkat}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">{masjid.tagline}</p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold-400">
              Tautan
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-cream/80">
              <li><Link to="/tentang" className="hover:text-gold-300">Tentang Masjid</Link></li>
              <li><Link to="/kegiatan" className="hover:text-gold-300">Kegiatan & Pengumuman</Link></li>
              <li><Link to="/laporan" className="hover:text-gold-300">Laporan Keuangan</Link></li>
              <li><Link to="/donasi" className="hover:text-gold-300">Donasi</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold-400">
              Kontak
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-cream/80">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {masjid.alamat}
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {masjid.telepon}
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {masjid.email}
              </li>
              <li className="flex gap-2">
                <Clock className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {masjid.jamOperasional}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold-400">
              Lokasi
            </h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="Lokasi Masjid Syuhada Sungai Mas"
                src={`https://www.google.com/maps?q=${encodeURIComponent(masjid.mapsQuery)}&output=embed`}
                width="100%"
                height="150"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(masjid.mapsQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs font-medium text-gold-300 hover:text-gold-200"
            >
              Buka di Google Maps &rarr;
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-cream/50">
          &copy; {new Date().getFullYear()} {masjid.nama}. Dikelola oleh DKM untuk kemaslahatan warga Sungai Mas.
        </div>
      </footer>

      <a
        href={`https://wa.me/${masjid.waAdmin}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Hubungi sekretariat via WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </a>
    </>
  )
}
