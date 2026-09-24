import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ChevronLeft } from 'lucide-react'
import {
  getLaporanBySlug,
  getSemuaLaporan,
  saldoAkhir,
  totalPemasukan,
  totalPengeluaran,
  formatRupiah,
} from '@/data/laporan'
import { StatCard } from '@/components/StatCard'
import { IncomeExpenseChart } from '@/components/IncomeExpenseChart'
import { TransactionTable } from '@/components/TransactionTable'
import { ShareBar } from '@/components/ShareBar'
import { ExportActions } from '@/components/ExportActions'
import { QRCodeBlock } from '@/components/QRCodeBlock'

export const Route = createFileRoute('/laporan/$slug')({
  loader: ({ params }) => {
    const laporan = getLaporanBySlug(params.slug)
    if (!laporan) {
      throw notFound()
    }
    return laporan
  },
  component: LaporanDetailPage,
})

function LaporanDetailPage() {
  const laporan = Route.useLoaderData()
  const semua = getSemuaLaporan()

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <Link
        to="/laporan"
        className="flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-green-800"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Semua laporan
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-600">
            Laporan Keuangan
          </span>
          <h1 className="mt-1 font-display text-3xl font-semibold text-green-900">
            {laporan.label}
          </h1>
          {laporan.catatan && <p className="mt-1 text-sm text-ink-soft">{laporan.catatan}</p>}
        </div>
        <select
          defaultValue={laporan.slug}
          onChange={(e) => {
            window.location.href = `/laporan/${e.target.value}`
          }}
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-green-900"
          aria-label="Pilih laporan bulan lain"
        >
          {semua.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <StatCard
          icon={PiggyBank}
          label="Saldo Awal"
          value={formatRupiah(laporan.saldoAwal)}
          tone="ink"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Pemasukan"
          value={formatRupiah(totalPemasukan(laporan))}
          tone="ink"
        />
        <StatCard
          icon={TrendingDown}
          label="Total Pengeluaran"
          value={formatRupiah(totalPengeluaran(laporan))}
          tone="ink"
        />
        <StatCard
          icon={Wallet}
          label="Saldo Akhir"
          value={formatRupiah(saldoAkhir(laporan))}
          tone="green"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
          <h2 className="font-display text-lg font-semibold text-green-900">
            Grafik Pemasukan &amp; Pengeluaran Mingguan
          </h2>
          <div className="mt-5">
            <IncomeExpenseChart data={laporan.ringkasanMinggu} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-black/5 sm:p-6">
          <QRCodeBlock
            value={`https://masjidsyuhada.id/laporan/${laporan.slug}`}
            caption={`Pindai untuk membuka laporan ${laporan.label} langsung dari ponsel`}
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold text-green-900">
            Rincian Transaksi
          </h2>
          <ExportActions laporan={laporan} />
        </div>
        <div className="mt-5">
          <TransactionTable transaksi={laporan.transaksi} />
        </div>
      </div>

      <div className="no-print mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-cream-deep p-5">
        <p className="text-sm text-ink-soft">
          Bagikan laporan {laporan.label} ini agar lebih banyak warga tahu kondisi kas masjid.
        </p>
        <ShareBar
          path={`/laporan/${laporan.slug}`}
          title={`Laporan Keuangan ${laporan.label} - Masjid Syuhada Sungai Mas`}
        />
      </div>
    </div>
  )
}
