import { createFileRoute, Link } from '@tanstack/react-router'
import { Wallet, TrendingUp, TrendingDown, ArrowRight, ShieldCheck } from 'lucide-react'
import {
  getSemuaLaporan,
  getLaporanTerbaru,
  saldoAkhir,
  totalPemasukan,
  totalPengeluaran,
  formatRupiah,
} from '@/data/laporan'
import { SectionHeading } from '@/components/SectionHeading'
import { StatCard } from '@/components/StatCard'

export const Route = createFileRoute('/laporan/')({
  component: LaporanIndexPage,
})

function LaporanIndexPage() {
  const semua = getSemuaLaporan()
  const terbaru = getLaporanTerbaru()

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <SectionHeading
        kicker="Transparansi Keuangan"
        title="Laporan Keuangan Masjid"
        description="Setiap infaq, donasi, dan pengeluaran dicatat per bulan dan dapat diakses terbuka oleh seluruh warga."
      />

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-green-800/5 px-4 py-3 text-xs text-green-900">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-700" aria-hidden="true" />
        Data disusun oleh bendahara DKM dan diverifikasi setiap akhir bulan. Setiap laporan memiliki
        tautan khusus yang bisa langsung dibagikan ke warga.
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Wallet}
          label="Saldo Kas Saat Ini"
          value={formatRupiah(saldoAkhir(terbaru))}
          tone="green"
          sublabel={`Per akhir data ${terbaru.label}`}
        />
        <StatCard
          icon={TrendingUp}
          label={`Pemasukan ${terbaru.label}`}
          value={formatRupiah(totalPemasukan(terbaru))}
          tone="ink"
        />
        <StatCard
          icon={TrendingDown}
          label={`Pengeluaran ${terbaru.label}`}
          value={formatRupiah(totalPengeluaran(terbaru))}
          tone="ink"
        />
      </div>

      <h3 className="mt-10 font-display text-lg font-semibold text-green-900">Laporan per Bulan</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {semua.map((laporan) => (
          <Link
            key={laporan.slug}
            to="/laporan/$slug"
            params={{ slug: laporan.slug }}
            className="group flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <div>
              <span className="font-display text-lg font-semibold text-green-900">
                {laporan.label}
              </span>
              <p className="mt-1 text-xs text-ink-soft">
                Saldo akhir: {formatRupiah(saldoAkhir(laporan))}
              </p>
              {laporan.catatan && (
                <p className="mt-1 text-xs text-ink-soft/70">{laporan.catatan}</p>
              )}
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-deep text-green-800 transition-colors group-hover:bg-green-800 group-hover:text-white">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-xs text-ink-soft">
        Contoh: laporan bulan {terbaru.bulan} dapat diakses langsung melalui{' '}
        <code className="rounded bg-cream-deep px-1.5 py-0.5">
          masjidsyuhada.id/laporan/{terbaru.slug}
        </code>
        , sehingga warga tidak perlu mencari-cari.
      </p>
    </div>
  )
}
