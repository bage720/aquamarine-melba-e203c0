export type JenisTransaksi = 'masuk' | 'keluar'

export type KategoriTransaksi =
  | 'Infaq Jumat'
  | 'Kotak Amal'
  | 'Donasi Online'
  | 'Wakaf'
  | 'Listrik & Air'
  | 'Kebersihan & Perlengkapan'
  | 'Honor Marbot & Imam'
  | 'Renovasi & Perbaikan'
  | 'Sosial & Santunan'
  | 'Kegiatan & Konsumsi'

export interface Transaksi {
  id: string
  tanggal: string
  jenis: JenisTransaksi
  kategori: KategoriTransaksi
  keterangan: string
  jumlah: number
  petugas: string
  tanggalInput: string
  adaBukti: boolean
}

export interface RingkasanMinggu {
  minggu: string
  pemasukan: number
  pengeluaran: number
}

export interface LaporanBulanan {
  slug: string
  label: string
  bulan: string
  tahun: number
  saldoAwal: number
  transaksi: Array<Transaksi>
  ringkasanMinggu: Array<RingkasanMinggu>
  catatan?: string
}

const dataLaporan: Array<LaporanBulanan> = [
  {
    slug: 'juli-2026',
    label: 'Juli 2026',
    bulan: 'Juli',
    tahun: 2026,
    saldoAwal: 18_240_500,
    catatan: 'Bulan dengan pengeluaran renovasi tempat wudhu wanita.',
    ringkasanMinggu: [
      { minggu: 'Minggu 1', pemasukan: 3_120_000, pengeluaran: 1_450_000 },
      { minggu: 'Minggu 2', pemasukan: 2_780_000, pengeluaran: 4_960_000 },
      { minggu: 'Minggu 3', pemasukan: 3_460_000, pengeluaran: 1_180_000 },
      { minggu: 'Minggu 4', pemasukan: 4_015_000, pengeluaran: 2_340_000 },
    ],
    transaksi: [
      { id: 'jul-01', tanggal: '2026-07-03', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq shalat Jumat pekan 1', jumlah: 2_340_000, petugas: 'Siti Maimunah', tanggalInput: '2026-07-03 21:10', adaBukti: true },
      { id: 'jul-02', tanggal: '2026-07-04', jenis: 'masuk', kategori: 'Kotak Amal', keterangan: 'Kotak amal harian pekan 1', jumlah: 780_000, petugas: 'Fikri Ramadhan', tanggalInput: '2026-07-05 08:20', adaBukti: false },
      { id: 'jul-03', tanggal: '2026-07-06', jenis: 'keluar', kategori: 'Listrik & Air', keterangan: 'Tagihan listrik PLN bulan Juni', jumlah: 1_450_000, petugas: 'Siti Maimunah', tanggalInput: '2026-07-06 14:05', adaBukti: true },
      { id: 'jul-04', tanggal: '2026-07-10', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq shalat Jumat pekan 2', jumlah: 2_115_000, petugas: 'Siti Maimunah', tanggalInput: '2026-07-10 21:00', adaBukti: true },
      { id: 'jul-05', tanggal: '2026-07-11', jenis: 'keluar', kategori: 'Renovasi & Perbaikan', keterangan: 'Termin 1 renovasi tempat wudhu wanita', jumlah: 4_200_000, petugas: 'H. Abdul Rasyid', tanggalInput: '2026-07-11 16:40', adaBukti: true },
      { id: 'jul-06', tanggal: '2026-07-12', jenis: 'masuk', kategori: 'Donasi Online', keterangan: 'Donasi transfer via QRIS - 6 donatur', jumlah: 665_000, petugas: 'Fikri Ramadhan', tanggalInput: '2026-07-13 09:15', adaBukti: false },
      { id: 'jul-07', tanggal: '2026-07-13', jenis: 'keluar', kategori: 'Kebersihan & Perlengkapan', keterangan: 'Sabun, pewangi lantai, dan lap wudhu', jumlah: 760_000, petugas: 'Andika Pratama', tanggalInput: '2026-07-13 17:30', adaBukti: true },
      { id: 'jul-08', tanggal: '2026-07-17', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq shalat Jumat pekan 3', jumlah: 2_540_000, petugas: 'Siti Maimunah', tanggalInput: '2026-07-17 21:05', adaBukti: true },
      { id: 'jul-09', tanggal: '2026-07-20', jenis: 'keluar', kategori: 'Honor Marbot & Imam', keterangan: 'Honor bulanan marbot dan imam rawatib', jumlah: 1_180_000, petugas: 'H. Abdul Rasyid', tanggalInput: '2026-07-20 19:00', adaBukti: true },
      { id: 'jul-10', tanggal: '2026-07-24', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq shalat Jumat pekan 4', jumlah: 2_890_000, petugas: 'Siti Maimunah', tanggalInput: '2026-07-24 21:12', adaBukti: true },
      { id: 'jul-11', tanggal: '2026-07-26', jenis: 'keluar', kategori: 'Sosial & Santunan', keterangan: 'Santunan bulanan 28 anak yatim', jumlah: 2_340_000, petugas: 'H. Abdul Rasyid', tanggalInput: '2026-07-26 15:20', adaBukti: true },
      { id: 'jul-12', tanggal: '2026-07-28', jenis: 'masuk', kategori: 'Wakaf', keterangan: 'Wakaf tunai pembangunan pagar utara', jumlah: 1_125_000, petugas: 'Fikri Ramadhan', tanggalInput: '2026-07-28 10:40', adaBukti: true },
    ],
  },
  {
    slug: 'agustus-2026',
    label: 'Agustus 2026',
    bulan: 'Agustus',
    tahun: 2026,
    saldoAwal: 19_845_500,
    catatan: 'Peningkatan infaq karena momentum Kemerdekaan RI dan kajian akbar.',
    ringkasanMinggu: [
      { minggu: 'Minggu 1', pemasukan: 3_640_000, pengeluaran: 1_920_000 },
      { minggu: 'Minggu 2', pemasukan: 4_980_000, pengeluaran: 2_150_000 },
      { minggu: 'Minggu 3', pemasukan: 3_205_000, pengeluaran: 1_360_000 },
      { minggu: 'Minggu 4', pemasukan: 3_115_000, pengeluaran: 3_640_000 },
    ],
    transaksi: [
      { id: 'agu-01', tanggal: '2026-08-01', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq shalat Jumat pekan 1', jumlah: 2_460_000, petugas: 'Siti Maimunah', tanggalInput: '2026-08-01 21:00', adaBukti: true },
      { id: 'agu-02', tanggal: '2026-08-02', jenis: 'keluar', kategori: 'Listrik & Air', keterangan: 'Tagihan listrik & PDAM bulan Juli', jumlah: 1_620_000, petugas: 'Siti Maimunah', tanggalInput: '2026-08-02 13:45', adaBukti: true },
      { id: 'agu-03', tanggal: '2026-08-05', jenis: 'masuk', kategori: 'Kotak Amal', keterangan: 'Kotak amal harian pekan 1-2', jumlah: 855_000, petugas: 'Fikri Ramadhan', tanggalInput: '2026-08-06 08:10', adaBukti: false },
      { id: 'agu-04', tanggal: '2026-08-08', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq Jumat pekan 2 (bertepatan HUT RI)', jumlah: 3_780_000, petugas: 'Siti Maimunah', tanggalInput: '2026-08-08 21:15', adaBukti: true },
      { id: 'agu-05', tanggal: '2026-08-09', jenis: 'keluar', kategori: 'Kegiatan & Konsumsi', keterangan: 'Konsumsi lomba HUT RI & tasyakuran warga', jumlah: 1_450_000, petugas: 'Andika Pratama', tanggalInput: '2026-08-09 20:00', adaBukti: true },
      { id: 'agu-06', tanggal: '2026-08-11', jenis: 'masuk', kategori: 'Donasi Online', keterangan: 'Donasi QRIS - 11 donatur', jumlah: 1_340_000, petugas: 'Fikri Ramadhan', tanggalInput: '2026-08-12 09:30', adaBukti: false },
      { id: 'agu-07', tanggal: '2026-08-14', jenis: 'keluar', kategori: 'Renovasi & Perbaikan', keterangan: 'Termin 2 renovasi tempat wudhu wanita', jumlah: 2_150_000, petugas: 'H. Abdul Rasyid', tanggalInput: '2026-08-14 16:00', adaBukti: true },
      { id: 'agu-08', tanggal: '2026-08-15', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq Jumat pekan 3', jumlah: 2_615_000, petugas: 'Siti Maimunah', tanggalInput: '2026-08-15 21:05', adaBukti: true },
      { id: 'agu-09', tanggal: '2026-08-20', jenis: 'keluar', kategori: 'Honor Marbot & Imam', keterangan: 'Honor bulanan marbot dan imam rawatib', jumlah: 1_180_000, petugas: 'H. Abdul Rasyid', tanggalInput: '2026-08-20 19:10', adaBukti: true },
      { id: 'agu-10', tanggal: '2026-08-22', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq Jumat pekan 4', jumlah: 2_490_000, petugas: 'Siti Maimunah', tanggalInput: '2026-08-22 21:00', adaBukti: true },
      { id: 'agu-11', tanggal: '2026-08-23', jenis: 'keluar', kategori: 'Sosial & Santunan', keterangan: 'Santunan bulanan 30 anak yatim', jumlah: 2_410_000, petugas: 'H. Abdul Rasyid', tanggalInput: '2026-08-23 15:00', adaBukti: true },
      { id: 'agu-12', tanggal: '2026-08-27', jenis: 'keluar', kategori: 'Kebersihan & Perlengkapan', keterangan: 'Karpet sajadah baru 4 gulung', jumlah: 1_360_000, petugas: 'Andika Pratama', tanggalInput: '2026-08-27 17:20', adaBukti: true },
      { id: 'agu-13', tanggal: '2026-08-29', jenis: 'masuk', kategori: 'Wakaf', keterangan: 'Wakaf Al-Qur\'an dan rak mushaf', jumlah: 615_000, petugas: 'Fikri Ramadhan', tanggalInput: '2026-08-29 11:00', adaBukti: true },
    ],
  },
  {
    slug: 'september-2026',
    label: 'September 2026',
    bulan: 'September',
    tahun: 2026,
    saldoAwal: 21_490_500,
    catatan: 'Laporan berjalan — data tercatat hingga 24 September 2026.',
    ringkasanMinggu: [
      { minggu: 'Minggu 1', pemasukan: 3_340_000, pengeluaran: 1_610_000 },
      { minggu: 'Minggu 2', pemasukan: 2_960_000, pengeluaran: 2_890_000 },
      { minggu: 'Minggu 3', pemasukan: 3_575_000, pengeluaran: 1_240_000 },
      { minggu: 'Minggu 4 (berjalan)', pemasukan: 1_180_000, pengeluaran: 640_000 },
    ],
    transaksi: [
      { id: 'sep-01', tanggal: '2026-09-04', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq shalat Jumat pekan 1', jumlah: 2_490_000, petugas: 'Siti Maimunah', tanggalInput: '2026-09-04 21:05', adaBukti: true },
      { id: 'sep-02', tanggal: '2026-09-05', jenis: 'masuk', kategori: 'Kotak Amal', keterangan: 'Kotak amal harian pekan 1', jumlah: 850_000, petugas: 'Fikri Ramadhan', tanggalInput: '2026-09-06 08:00', adaBukti: false },
      { id: 'sep-03', tanggal: '2026-09-06', jenis: 'keluar', kategori: 'Listrik & Air', keterangan: 'Tagihan listrik & PDAM bulan Agustus', jumlah: 1_610_000, petugas: 'Siti Maimunah', tanggalInput: '2026-09-06 14:10', adaBukti: true },
      { id: 'sep-04', tanggal: '2026-09-11', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq shalat Jumat pekan 2', jumlah: 2_305_000, petugas: 'Siti Maimunah', tanggalInput: '2026-09-11 21:00', adaBukti: true },
      { id: 'sep-05', tanggal: '2026-09-12', jenis: 'keluar', kategori: 'Honor Marbot & Imam', keterangan: 'Honor bulanan marbot dan imam rawatib', jumlah: 1_180_000, petugas: 'H. Abdul Rasyid', tanggalInput: '2026-09-12 19:00', adaBukti: true },
      { id: 'sep-06', tanggal: '2026-09-13', jenis: 'masuk', kategori: 'Donasi Online', keterangan: 'Donasi QRIS - 8 donatur', jumlah: 655_000, petugas: 'Fikri Ramadhan', tanggalInput: '2026-09-14 09:00', adaBukti: false },
      { id: 'sep-07', tanggal: '2026-09-14', jenis: 'keluar', kategori: 'Kegiatan & Konsumsi', keterangan: 'Konsumsi kajian tafsir dua pekan', jumlah: 610_000, petugas: 'Andika Pratama', tanggalInput: '2026-09-14 21:30', adaBukti: true },
      { id: 'sep-08', tanggal: '2026-09-18', jenis: 'masuk', kategori: 'Infaq Jumat', keterangan: 'Infaq shalat Jumat pekan 3', jumlah: 2_720_000, petugas: 'Siti Maimunah', tanggalInput: '2026-09-18 21:10', adaBukti: true },
      { id: 'sep-09', tanggal: '2026-09-19', jenis: 'keluar', kategori: 'Sosial & Santunan', keterangan: 'Santunan bulanan 31 anak yatim', jumlah: 1_240_000, petugas: 'H. Abdul Rasyid', tanggalInput: '2026-09-19 15:10', adaBukti: true },
      { id: 'sep-10', tanggal: '2026-09-20', jenis: 'masuk', kategori: 'Wakaf', keterangan: 'Wakaf kipas angin ruang shalat', jumlah: 855_000, petugas: 'Fikri Ramadhan', tanggalInput: '2026-09-20 10:15', adaBukti: true },
      { id: 'sep-11', tanggal: '2026-09-23', jenis: 'keluar', kategori: 'Kebersihan & Perlengkapan', keterangan: 'Perlengkapan kebersihan & pengharum ruangan', jumlah: 640_000, petugas: 'Andika Pratama', tanggalInput: '2026-09-23 17:00', adaBukti: false },
      { id: 'sep-12', tanggal: '2026-09-24', jenis: 'masuk', kategori: 'Kotak Amal', keterangan: 'Kotak amal harian pekan 3-4', jumlah: 325_000, petugas: 'Fikri Ramadhan', tanggalInput: '2026-09-24 08:30', adaBukti: false },
    ],
  },
]

export function formatRupiah(nilai: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(nilai)
}

export function totalPemasukan(laporan: LaporanBulanan): number {
  return laporan.transaksi.filter((t) => t.jenis === 'masuk').reduce((sum, t) => sum + t.jumlah, 0)
}

export function totalPengeluaran(laporan: LaporanBulanan): number {
  return laporan.transaksi.filter((t) => t.jenis === 'keluar').reduce((sum, t) => sum + t.jumlah, 0)
}

export function saldoAkhir(laporan: LaporanBulanan): number {
  return laporan.saldoAwal + totalPemasukan(laporan) - totalPengeluaran(laporan)
}

export function getSemuaLaporan(): Array<LaporanBulanan> {
  return [...dataLaporan].sort((a, b) => b.slug.localeCompare(a.slug) || b.tahun - a.tahun)
}

export function getLaporanTerbaru(): LaporanBulanan {
  const semua = dataLaporan
  return semua[semua.length - 1]
}

export function getLaporanBySlug(slug: string): LaporanBulanan | undefined {
  return dataLaporan.find((l) => l.slug === slug)
}

export function kategoriTransaksiUnik(laporan: LaporanBulanan): Array<KategoriTransaksi> {
  return Array.from(new Set(laporan.transaksi.map((t) => t.kategori)))
}
