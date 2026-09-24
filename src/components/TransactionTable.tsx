import { useMemo, useState } from 'react'
import { Camera, FileX } from 'lucide-react'
import type { Transaksi } from '@/data/laporan'
import { formatRupiah } from '@/data/laporan'

interface TransactionTableProps {
  transaksi: Array<Transaksi>
}

export function TransactionTable({ transaksi }: TransactionTableProps) {
  const kategoriList = useMemo(
    () => ['Semua', ...Array.from(new Set(transaksi.map((t) => t.kategori)))],
    [transaksi],
  )
  const [filter, setFilter] = useState<string>('Semua')

  const filtered =
    filter === 'Semua' ? transaksi : transaksi.filter((t) => t.kategori === filter)

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {kategoriList.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => setFilter(kategori)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filter === kategori
                ? 'bg-green-800 text-white'
                : 'bg-white text-ink-soft ring-1 ring-black/10 hover:bg-cream-deep'
            }`}
          >
            {kategori}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-black/5">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="bg-green-950/[0.04] text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3 font-medium">Tanggal</th>
              <th className="px-4 py-3 font-medium">Keterangan</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium text-right">Jumlah</th>
              <th className="px-4 py-3 font-medium">Petugas Input</th>
              <th className="px-4 py-3 font-medium">Bukti</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.map((t) => (
              <tr key={t.id} className="bg-white">
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-ink-soft">
                  {new Date(t.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                </td>
                <td className="px-4 py-3 text-ink">{t.keterangan}</td>
                <td className="px-4 py-3 text-ink-soft">{t.kategori}</td>
                <td
                  className={`whitespace-nowrap px-4 py-3 text-right font-semibold tabular-nums ${
                    t.jenis === 'masuk' ? 'text-green-700' : 'text-gold-600'
                  }`}
                >
                  {t.jenis === 'masuk' ? '+' : '−'} {formatRupiah(t.jumlah)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-soft">
                  {t.petugas}
                  <div className="text-[11px] text-ink-soft/70">{t.tanggalInput}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {t.adaBukti ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-700">
                      <Camera className="h-3.5 w-3.5" aria-hidden="true" /> Ada foto
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-ink-soft/60">
                      <FileX className="h-3.5 w-3.5" aria-hidden="true" /> Belum ada
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-ink-soft">
                  Tidak ada transaksi pada kategori ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
