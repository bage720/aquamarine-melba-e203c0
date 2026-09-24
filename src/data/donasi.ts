export interface RekeningBank {
  bank: string
  nomor: string
  atasNama: string
}

export interface RiwayatDonasi {
  tanggal: string
  nama: string
  jumlah: number
  metode: string
  status: 'Terverifikasi' | 'Menunggu verifikasi'
}

export const rekeningDonasi: Array<RekeningBank> = [
  { bank: 'Bank Syariah Indonesia (BSI)', nomor: '7123456789', atasNama: 'DKM Masjid Syuhada Sungai Mas' },
  { bank: 'Bank Mandiri', nomor: '1330099887766', atasNama: 'DKM Masjid Syuhada Sungai Mas' },
]

export const qrisInfo = {
  merchantId: 'ID10238845102 (contoh — ganti dengan NMID QRIS resmi masjid)',
  namaMerchant: 'DKM MASJID SYUHADA SUNGAI MAS',
  catatan:
    'QR ini dibuat otomatis sebagai placeholder tampilan. Sebelum situs digunakan, ganti dengan gambar QRIS statis resmi dari bank/PJSP yang terdaftar di Bank Indonesia.',
}

export const petunjukDonasi = [
  'Pilih metode: transfer ke rekening bank di atas, atau pindai kode QRIS.',
  'Cantumkan berita transfer "Infaq" atau "Donasi" agar mudah dicatat bendahara.',
  'Simpan bukti transfer (screenshot atau struk ATM).',
  'Kirim konfirmasi donasi melalui tombol WhatsApp di bawah agar segera tercatat dalam laporan bulanan.',
  'Donasi akan muncul di laporan keuangan bulan berjalan maksimal 3 hari kerja setelah konfirmasi.',
]

export const riwayatDonasi: Array<RiwayatDonasi> = [
  { tanggal: '2026-09-22', nama: 'Hamba Allah', jumlah: 500_000, metode: 'QRIS', status: 'Terverifikasi' },
  { tanggal: '2026-09-20', nama: 'Bpk. Herlambang', jumlah: 250_000, metode: 'Transfer BSI', status: 'Terverifikasi' },
  { tanggal: '2026-09-18', nama: 'Ibu Ratna & keluarga', jumlah: 1_000_000, metode: 'Transfer Mandiri', status: 'Terverifikasi' },
  { tanggal: '2026-09-15', nama: 'Hamba Allah', jumlah: 150_000, metode: 'QRIS', status: 'Terverifikasi' },
  { tanggal: '2026-09-12', nama: 'Keluarga Bpk. Sutrisno', jumlah: 300_000, metode: 'Transfer BSI', status: 'Menunggu verifikasi' },
  { tanggal: '2026-09-08', nama: 'Hamba Allah', jumlah: 75_000, metode: 'QRIS', status: 'Terverifikasi' },
]
