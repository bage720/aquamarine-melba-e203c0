export type KategoriKegiatan =
  | 'Kajian'
  | 'Pengajian Rutin'
  | 'Jumat Bersih'
  | 'Santunan Yatim'
  | 'Zakat & Kurban'
  | 'Rapat Warga'
  | 'Ramadan'

export interface Kegiatan {
  slug: string
  judul: string
  kategori: KategoriKegiatan
  tanggal: string
  jam: string
  lokasi: string
  narasumber?: string
  ringkasan: string
  berulang?: string
}

export const daftarKegiatan: Array<Kegiatan> = [
  {
    slug: 'kajian-tafsir-jumat-malam',
    judul: 'Kajian Tafsir Al-Qur\'an: Surat Al-Hujurat',
    kategori: 'Kajian',
    tanggal: '2026-09-25',
    jam: '19:30 – 21:00',
    lokasi: 'Aula lantai 2',
    narasumber: 'Ustadz Zainal Abidin',
    ringkasan:
      'Kajian tafsir tematik membahas adab bermasyarakat dalam Surat Al-Hujurat, terbuka untuk umum dan disediakan konsumsi ringan.',
    berulang: 'Setiap Jumat malam',
  },
  {
    slug: 'jumat-bersih-september',
    judul: 'Jumat Bersih & Gotong Royong Halaman Masjid',
    kategori: 'Jumat Bersih',
    tanggal: '2026-09-26',
    jam: '06:30 – 08:00',
    lokasi: 'Halaman dan area parkir masjid',
    ringkasan:
      'Kerja bakti rutin membersihkan area masjid sebelum shalat Jumat. Warga diimbau membawa alat kebersihan masing-masing, teh dan gorengan disediakan panitia.',
    berulang: 'Setiap Sabtu minggu ke-4',
  },
  {
    slug: 'pengajian-rutin-ibu-ibu',
    judul: 'Pengajian Rutin Ibu-Ibu Majelis Taklim',
    kategori: 'Pengajian Rutin',
    tanggal: '2026-09-28',
    jam: '09:00 – 11:00',
    lokasi: 'Ruang TPA',
    narasumber: 'Ustadzah Rohani Dewi',
    ringkasan:
      'Pembahasan fiqih wanita dan praktik bacaan shalat, dilanjutkan arisan sosial untuk dana santunan yatim.',
    berulang: 'Setiap Senin pagi',
  },
  {
    slug: 'santunan-yatim-oktober',
    judul: 'Santunan 32 Anak Yatim & Dhuafa',
    kategori: 'Santunan Yatim',
    tanggal: '2026-10-04',
    jam: '13:00 – 15:00',
    lokasi: 'Aula lantai 2',
    ringkasan:
      'Penyaluran santunan rutin bulanan dari dana infaq Jumat kepada 32 anak yatim dan dhuafa binaan masjid, meliputi bantuan tunai dan paket sembako.',
    berulang: 'Setiap awal bulan',
  },
  {
    slug: 'sosialisasi-zakat-kurban',
    judul: 'Sosialisasi Zakat Fitrah & Pendaftaran Kurban',
    kategori: 'Zakat & Kurban',
    tanggal: '2026-10-10',
    jam: '19:30 – 20:30',
    lokasi: 'Aula lantai 2',
    ringkasan:
      'Penjelasan tata cara dan nilai zakat fitrah tahun ini, serta pembukaan pendaftaran hewan kurban untuk musim haji mendatang beserta simulasi cicilan tabungan kurban.',
  },
  {
    slug: 'rapat-warga-triwulan',
    judul: 'Rapat Warga: Evaluasi Program Triwulan III',
    kategori: 'Rapat Warga',
    tanggal: '2026-10-12',
    jam: '20:00 – 21:30',
    lokasi: 'Aula lantai 2',
    ringkasan:
      'Pemaparan laporan keuangan triwulan, evaluasi program sosial, dan penjaringan usulan warga untuk agenda akhir tahun. Seluruh warga RT sekitar masjid diundang hadir.',
  },
  {
    slug: 'tadarus-ramadan',
    judul: 'Tadarus & Buka Puasa Bersama Ramadan',
    kategori: 'Ramadan',
    tanggal: '2027-03-02',
    jam: '17:30 – 20:00',
    lokasi: 'Ruang shalat utama & halaman masjid',
    ringkasan:
      'Rangkaian tadarus harian, buka puasa bersama warga dan musafir, serta kajian singkat menjelang shalat Isya dan Tarawih berjamaah.',
    berulang: 'Setiap hari selama Ramadan',
  },
  {
    slug: 'kajian-subuh-remaja',
    judul: 'Kajian Subuh Khusus Remaja Masjid',
    kategori: 'Kajian',
    tanggal: '2026-09-27',
    jam: '05:15 – 06:00',
    lokasi: 'Ruang shalat utama',
    narasumber: 'Ustadz Zainal Abidin',
    ringkasan:
      'Diskusi ringan seputar akhlak dan tantangan remaja masa kini, dikemas santai setelah shalat Subuh berjamaah, terbuka untuk pelajar dan mahasiswa.',
    berulang: 'Setiap Minggu pagi',
  },
]

export function kategoriUnik(): Array<KategoriKegiatan> {
  return Array.from(new Set(daftarKegiatan.map((k) => k.kategori)))
}
