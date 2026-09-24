import type { RingkasanMinggu } from '@/data/laporan'
import { formatRupiah } from '@/data/laporan'

interface IncomeExpenseChartProps {
  data: Array<RingkasanMinggu>
}

export function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
  const max = Math.max(1, ...data.flatMap((d) => [d.pemasukan, d.pengeluaran]))

  return (
    <div>
      <div className="flex items-center gap-5 text-xs font-medium text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#1a7a4f' }} />
          Pemasukan
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#c9962f' }} />
          Pengeluaran
        </span>
      </div>

      <div className="mt-5 flex h-56 items-end gap-3 border-b border-black/10 sm:gap-6">
        {data.map((minggu) => (
          <div key={minggu.minggu} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-48 w-full items-end justify-center gap-[3px]">
              <div
                title={`Pemasukan ${minggu.minggu}: ${formatRupiah(minggu.pemasukan)}`}
                style={{ height: `${(minggu.pemasukan / max) * 100}%`, backgroundColor: '#1a7a4f' }}
                className="w-3.5 min-h-1 rounded-t-[4px] transition-opacity hover:opacity-80 sm:w-6"
              />
              <div
                title={`Pengeluaran ${minggu.minggu}: ${formatRupiah(minggu.pengeluaran)}`}
                style={{ height: `${(minggu.pengeluaran / max) * 100}%`, backgroundColor: '#c9962f' }}
                className="w-3.5 min-h-1 rounded-t-[4px] transition-opacity hover:opacity-80 sm:w-6"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3 sm:gap-6">
        {data.map((minggu) => (
          <span key={minggu.minggu} className="flex-1 text-center text-[11px] text-ink-soft">
            {minggu.minggu.replace('Minggu ', 'M')}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-soft">
        Arahkan kursor ke setiap batang untuk melihat nominal, atau lihat rincian lengkap pada
        tabel transaksi di bawah.
      </p>
    </div>
  )
}
