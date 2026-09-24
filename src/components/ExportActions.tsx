import { Printer, FileDown, FileSpreadsheet } from 'lucide-react'
import type { LaporanBulanan } from '@/data/laporan'
import { formatRupiah, saldoAkhir, totalPemasukan, totalPengeluaran } from '@/data/laporan'
import { masjid } from '@/data/masjid'

interface ExportActionsProps {
  laporan: LaporanBulanan
}

export function ExportActions({ laporan }: ExportActionsProps) {
  async function handleDownloadPdf() {
    const { default: jsPDF } = await import('jspdf')
    const autoTable = (await import('jspdf-autotable')).default
    const doc = new jsPDF()

    doc.setFontSize(14)
    doc.text(masjid.nama, 14, 16)
    doc.setFontSize(11)
    doc.text(`Laporan Keuangan - ${laporan.label}`, 14, 23)

    doc.setFontSize(9)
    doc.text(
      [
        `Saldo awal: ${formatRupiah(laporan.saldoAwal)}`,
        `Total pemasukan: ${formatRupiah(totalPemasukan(laporan))}`,
        `Total pengeluaran: ${formatRupiah(totalPengeluaran(laporan))}`,
        `Saldo akhir: ${formatRupiah(saldoAkhir(laporan))}`,
      ],
      14,
      31,
    )

    autoTable(doc, {
      startY: 55,
      head: [['Tanggal', 'Keterangan', 'Kategori', 'Jenis', 'Jumlah', 'Petugas']],
      body: laporan.transaksi.map((t) => [
        t.tanggal,
        t.keterangan,
        t.kategori,
        t.jenis === 'masuk' ? 'Masuk' : 'Keluar',
        formatRupiah(t.jumlah),
        t.petugas,
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [11, 61, 40] },
    })

    doc.save(`laporan-${laporan.slug}.pdf`)
  }

  async function handleDownloadExcel() {
    const XLSX = await import('xlsx')
    const rows = laporan.transaksi.map((t) => ({
      Tanggal: t.tanggal,
      Keterangan: t.keterangan,
      Kategori: t.kategori,
      Jenis: t.jenis === 'masuk' ? 'Masuk' : 'Keluar',
      Jumlah: t.jumlah,
      Petugas: t.petugas,
      'Tanggal Input': t.tanggalInput,
      'Ada Bukti': t.adaBukti ? 'Ya' : 'Tidak',
    }))
    const sheet = XLSX.utils.json_to_sheet(rows)
    const summarySheet = XLSX.utils.aoa_to_sheet([
      ['Laporan Keuangan', laporan.label],
      ['Saldo Awal', laporan.saldoAwal],
      ['Total Pemasukan', totalPemasukan(laporan)],
      ['Total Pengeluaran', totalPengeluaran(laporan)],
      ['Saldo Akhir', saldoAkhir(laporan)],
    ])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Ringkasan')
    XLSX.utils.book_append_sheet(workbook, sheet, 'Transaksi')
    XLSX.writeFile(workbook, `laporan-${laporan.slug}.xlsx`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center gap-2 rounded-full border border-green-800/25 bg-white px-4 py-2 text-xs font-semibold text-green-800 hover:bg-green-50"
      >
        <Printer className="h-4 w-4" aria-hidden="true" /> Cetak Laporan
      </button>
      <button
        type="button"
        onClick={handleDownloadPdf}
        className="flex items-center gap-2 rounded-full border border-green-800/25 bg-white px-4 py-2 text-xs font-semibold text-green-800 hover:bg-green-50"
      >
        <FileDown className="h-4 w-4" aria-hidden="true" /> Download PDF
      </button>
      <button
        type="button"
        onClick={handleDownloadExcel}
        className="flex items-center gap-2 rounded-full border border-green-800/25 bg-white px-4 py-2 text-xs font-semibold text-green-800 hover:bg-green-50"
      >
        <FileSpreadsheet className="h-4 w-4" aria-hidden="true" /> Download Excel
      </button>
    </div>
  )
}
