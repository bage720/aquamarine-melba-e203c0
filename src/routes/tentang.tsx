import { createFileRoute } from '@tanstack/react-router'
import { Target, Users, Building2 } from 'lucide-react'
import { masjid } from '@/data/masjid'
import { SectionHeading } from '@/components/SectionHeading'

export const Route = createFileRoute('/tentang')({
  component: TentangPage,
})

function TentangPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <SectionHeading kicker="Profil Masjid" title={`Tentang ${masjid.nama}`} />

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h3 className="font-display text-lg font-semibold text-green-900">Sejarah Singkat</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">{masjid.sejarah}</p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl bg-green-950 p-6 text-cream">
          <Target className="h-6 w-6 text-gold-400" aria-hidden="true" />
          <h3 className="mt-3 font-display text-lg font-semibold">Visi</h3>
          <p className="mt-2 text-sm leading-relaxed text-cream/80">{masjid.visi}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <Building2 className="h-6 w-6 text-gold-600" aria-hidden="true" />
          <h3 className="mt-3 font-display text-lg font-semibold text-green-900">Misi</h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-soft">
            {masjid.misi.map((misi) => (
              <li key={misi} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                {misi}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-green-800" aria-hidden="true" />
          <h3 className="font-display text-lg font-semibold text-green-900">
            Struktur Pengurus DKM
          </h3>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {masjid.pengurus.map((orang) => (
            <div
              key={orang.jabatan}
              className="flex items-center justify-between rounded-xl bg-cream-deep px-4 py-3 text-sm"
            >
              <span className="font-medium text-green-900">{orang.nama}</span>
              <span className="text-xs text-ink-soft">{orang.jabatan}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h3 className="font-display text-lg font-semibold text-green-900">Fasilitas</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {masjid.fasilitas.map((fasilitas) => (
            <div key={fasilitas} className="rounded-xl bg-cream-deep px-4 py-3 text-sm text-ink-soft">
              {fasilitas}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
