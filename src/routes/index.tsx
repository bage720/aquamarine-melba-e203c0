import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Clock,
  MapPin,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CalendarDays,
  HandCoins,
} from 'lucide-react'
import { masjid, jadwalSholat } from '@/data/masjid'
import { daftarKegiatan } from '@/data/kegiatan'
import { getLaporanTerbaru, saldoAkhir, totalPemasukan, totalPengeluaran, formatRupiah } from '@/data/laporan'
import { SectionHeading } from '@/components/SectionHeading'
import { StatCard } from '@/components/StatCard'

export const Route = createFileRoute('/')({
  component: Beranda,
})

function Beranda() {
  const laporanTerbaru = getLaporanTerbaru()
  const kegiatanMendatang = daftarKegiatan.slice(0, 3)

  return (
    <div>
      <section className="relative overflow-hidden bg-green-950">
        <img
          src="/.netlify/images?url=/img/hero-masjid.png&w=1600&fm=webp"
          alt="Ilustrasi bangunan Masjid Syuhada Sungai Mas saat senja"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/80 to-green-950/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <span className="inline-block rounded-full border border-gold-400/40 px-4 py-1 text-xs font-medium tracking-wide text-gold-300">
            Selamat datang
          </span>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            {masjid.nama}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {masjid.tagline}. Ikuti kegiatan, pantau laporan keuangan secara transparan, dan salurkan
            donasi Anda dengan mudah.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/donasi"
              className="flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-green-950 shadow-lg transition-transform hover:scale-[1.02] hover:bg-gold-400"
            >
              <HandCoins className="h-4 w-4" aria-hidden="true" /> Donasi Sekarang
            </Link>
            <Link
              to="/laporan"
              className="flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream hover:bg-white/10"
            >
              Lihat Laporan Keuangan <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
              <span className="text-sm text-cream/85">{masjid.alamat}</span>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
              <span className="text-sm text-cream/85">{masjid.jamOperasional}</span>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
              <span className="text-sm text-cream/85">{jadwalSholat.tanggal}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-900">
        <div className="mx-auto grid max-w-6xl grid-cols-5 divide-x divide-white/10 px-4">
          {jadwalSholat.waktu.map((waktu) => (
            <div key={waktu.nama} className="px-1 py-4 text-center">
              <div className="text-[11px] uppercase tracking-wide text-gold-300 sm:text-xs">
                {waktu.nama}
              </div>
              <div className="mt-1 font-display text-lg font-semibold text-cream tabular-nums sm:text-xl">
                {waktu.jam}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              kicker="Tentang Kami"
              title="Rumah ibadah yang tumbuh dari swadaya warga"
              description={masjid.sejarah}
            />
            <Link
              to="/tentang"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green-800 hover:text-green-700"
            >
              Baca profil lengkap <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {masjid.fasilitas.slice(0, 4).map((fasilitas) => (
              <div key={fasilitas} className="rounded-xl bg-cream-deep p-4 text-sm text-ink-soft">
                {fasilitas}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-deep/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              kicker="Agenda"
              title="Kegiatan & Pengumuman Terdekat"
              description="Jadwal kajian, pengajian rutin, hingga agenda sosial masjid."
            />
            <Link
              to="/kegiatan"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-800 hover:text-green-700"
            >
              Lihat semua kegiatan <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {kegiatanMendatang.map((kegiatan) => (
              <div key={kegiatan.slug} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <span className="inline-block rounded-full bg-green-800/10 px-3 py-1 text-[11px] font-semibold text-green-800">
                  {kegiatan.kategori}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-green-900">
                  {kegiatan.judul}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{kegiatan.ringkasan}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-gold-600">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {new Date(kegiatan.tanggal).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}{' '}
                  &middot; {kegiatan.jam}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker="Transparansi"
            title="Ringkasan Laporan Keuangan"
            description={`Data terkini bulan ${laporanTerbaru.label}. Setiap rupiah infaq warga dapat dipantau secara terbuka.`}
          />
          <Link
            to="/laporan"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-800 hover:text-green-700"
          >
            Lihat laporan lengkap <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={Wallet}
            label="Saldo Kas Saat Ini"
            value={formatRupiah(saldoAkhir(laporanTerbaru))}
            tone="green"
            sublabel={`Per akhir data ${laporanTerbaru.label}`}
          />
          <StatCard
            icon={TrendingUp}
            label="Pemasukan Bulan Ini"
            value={formatRupiah(totalPemasukan(laporanTerbaru))}
            tone="ink"
          />
          <StatCard
            icon={TrendingDown}
            label="Pengeluaran Bulan Ini"
            value={formatRupiah(totalPengeluaran(laporanTerbaru))}
            tone="ink"
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-green-900 py-16">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url(/.netlify/images?url=/img/pattern-tile.png&w=700&fm=webp)',
            backgroundSize: '340px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 text-center">
          <HandCoins className="h-10 w-10 text-gold-400" aria-hidden="true" />
          <h2 className="max-w-xl font-display text-2xl font-semibold text-cream sm:text-3xl">
            Setiap infaq, sekecil apa pun, menjaga masjid ini tetap hidup untuk warga Sungai Mas
          </h2>
          <Link
            to="/donasi"
            className="mt-2 rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-green-950 shadow-lg hover:bg-gold-400"
          >
            Salurkan Donasi
          </Link>
        </div>
      </section>
    </div>
  )
}
