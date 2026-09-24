# Roadmap — Masjid Syuhada Sungai Mas

This milestone shipped the public-facing website with realistic placeholder
data. It intentionally does **not** include a database, authentication, or an
admin panel. This document scopes that work for the next milestones.

## Milestone 2 — Data layer

- Add Netlify DB (Postgres via Drizzle ORM). Tables:
  - `laporan_bulanan` (bulan, tahun, slug, saldo_awal, catatan)
  - `transaksi` (laporan_id, tanggal, jenis, kategori, keterangan, jumlah, petugas, dibuat_pada)
  - `bukti_transaksi` (transaksi_id, tipe: nota|kuitansi, file_key)
  - `kegiatan` (judul, kategori, tanggal, jam, lokasi, narasumber, berulang, ringkasan)
  - `donasi` (tanggal, nama, jumlah, metode, status, konfirmasi_wa)
  - `admin_users` (email, password_hash, nama, role)
  - `admin_activity_log` (admin_id, aksi, entitas, entitas_id, waktu)
- Replace the static fixtures in `src/data/laporan.ts`, `src/data/kegiatan.ts`,
  and `src/data/donasi.ts` with server functions / loaders reading from the
  database. Keep the same shapes (`Laporan`, `Kegiatan`, `RiwayatDonasi`, the
  `formatRupiah`/`totalPemasukan`/etc. helpers) so the existing components
  don't need to change.

## Milestone 3 — Admin authentication & security

- Login page at `/admin/login` (email + password), session cookie, `bcrypt`/`argon2` hashing.
- "Ganti password" screen for logged-in admins.
- Auto-logout after a period of inactivity (idle timer + session expiry check on the server).
- `admin_activity_log` write on every create/update/delete.
- Confirmation modal before deleting any transaction or announcement (soft-delete recommended over hard delete).
- Route guard so `/admin/**` is unreachable by non-admins (redirect to `/admin/login`), and never linked from resident-facing navigation.
- File upload validation for bukti nota/kuitansi: restrict MIME type (image/png, image/jpeg, application/pdf), size cap (e.g. 5MB), and store via Netlify Blobs rather than the filesystem.

## Milestone 4 — Admin panel (CRUD)

- `/admin/laporan` — add/edit monthly reports and transactions, upload bukti nota/kuitansi.
- `/admin/kegiatan` — add/edit/delete announcements and activities.
- `/admin/donasi` — mark donation confirmations as verified, edit riwayat.
- `/admin` dashboard — quick stats + recent activity log.

## Milestone 5 — Operational reliability

- Scheduled database backup (Netlify scheduled function → export to Blobs/external storage).
- Real prayer-time integration (e.g. Aladhan API or Kemenag data) to replace the placeholder `jadwalSholat` in `src/data/masjid.ts`, refreshed daily.
- Real QRIS: replace the generated placeholder QR in `src/data/donasi.ts` (`qrisInfo`) with the mosque's official bank/PJSP-issued static QRIS image — this is called out in the UI already and must not be skipped before going live.
- Yearly report view (`/laporan/tahunan/:tahun`) aggregating the monthly data, plus category-based annual analytics.

## Content the mosque still needs to provide

Everything below is currently a clearly-labeled placeholder in `src/data/masjid.ts` and `src/data/donasi.ts`:

- Real address, phone number, email, and Google Maps pin.
- Real bank account numbers and account holder name.
- Official QRIS image/NMID.
- Real logo (a generated placeholder logo is in `public/img/logo-masjid.png`).
- Real pengurus DKM (management structure) names and roles.

## Out of scope for this milestone (by design)

No backend, no database, no login, no file storage was built in this pass — see
`AGENTS.md` for why, and for the current architecture that milestones 2-5 build on top of.
