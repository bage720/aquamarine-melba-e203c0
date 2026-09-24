import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, MapPin, Mic2 } from 'lucide-react'
import { daftarKegiatan, kategoriUnik } from '@/data/kegiatan'
import { ShareBar } from '@/components/ShareBar'
import { SectionHeading } from '@/components/SectionHeading'

export const Route = createFileRoute('/kegiatan')({
  component: KegiatanPage,
})

function KegiatanPage() {
  const kategoriList = useMemo(() => ['Semua', ...kategoriUnik()], [])
  const [filter, setFilter] = useState<string>('Semua')

  const daftar = useMemo(() => {
    const list =
      filter === 'Semua' ? daftarKegiatan : daftarKegiatan.filter((k) => k.kategori === filter)
    return [...list].sort((a, b) => a.tanggal.localeCompare(b.tanggal))
  }, [filter])

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <SectionHeading
        kicker="Agenda Masjid"
        title="Kegiatan & Pengumuman"
        description="Kajian, pengajian rutin, agenda sosial, dan pengumuman resmi DKM Masjid Syuhada Sungai Mas."
      />

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {kategoriList.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => setFilter(kategori)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              filter === kategori
                ? 'bg-green-800 text-white'
                : 'bg-white text-ink-soft ring-1 ring-black/10 hover:bg-cream-deep'
            }`}
          >
            {kategori}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {daftar.map((kegiatan) => (
          <article
            key={kegiatan.slug}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-full bg-green-800/10 px-3 py-1 text-[11px] font-semibold text-green-800">
                  {kegiatan.kategori}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-green-900">
                  {kegiatan.judul}
                </h3>
              </div>
              <div className="rounded-xl bg-cream-deep px-3 py-2 text-center">
                <div className="font-display text-lg font-semibold leading-none text-green-900">
                  {new Date(kegiatan.tanggal).getDate()}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-ink-soft">
                  {new Date(kegiatan.tanggal).toLocaleDateString('id-ID', { month: 'short' })}
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{kegiatan.ringkasan}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                {kegiatan.jam}
                {kegiatan.berulang ? ` · ${kegiatan.berulang}` : ''}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                {kegiatan.lokasi}
              </span>
              {kegiatan.narasumber && (
                <span className="flex items-center gap-1.5">
                  <Mic2 className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                  {kegiatan.narasumber}
                </span>
              )}
            </div>

            <ShareBar
              path={`/kegiatan#${kegiatan.slug}`}
              title={kegiatan.judul}
              className="mt-4 border-t border-black/5 pt-4"
            />
          </article>
        ))}

        {daftar.length === 0 && (
          <p className="rounded-2xl bg-white p-8 text-center text-sm text-ink-soft ring-1 ring-black/5">
            Belum ada kegiatan pada kategori ini.
          </p>
        )}
      </div>
    </div>
  )
}
