# AGENTS.md

Website for **Masjid Syuhada Sungai Mas** (Indonesian mosque community
platform). This document describes the current architecture and the
non-obvious decisions behind it, so a future session can pick up where this
one left off. See `PLAN.md` for the roadmap of everything deliberately not
built yet (database, admin panel, auth).

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 (file-based routing) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (`@theme` tokens in `src/styles.css`, no JS config) |
| Icons | lucide-react |
| Exports | `qrcode`, `jspdf` + `jspdf-autotable`, `xlsx` (all client-side, no backend) |
| Language | TypeScript, strict mode |
| Deployment | Netlify |

All content and copy is in **Bahasa Indonesia** — this was an explicit
requirement, not a default. Keep new UI text in Indonesian.

## Directory structure

```
├── public/img/            # logo-masjid.png, hero-masjid.png, pattern-tile.png — AI-generated, see scripts/gen-images.mjs
├── scripts/gen-images.mjs # one-off script to (re)generate the brand images via Netlify AI Gateway (Gemini image model)
├── src/
│   ├── data/
│   │   ├── masjid.ts      # mosque profile + prayer-time placeholders — all placeholder fields are labeled inline
│   │   ├── kegiatan.ts    # activities/announcements fixture data + Kegiatan type
│   │   ├── laporan.ts     # financial report fixture data + Laporan type + money-formatting helpers
│   │   └── donasi.ts      # bank accounts, QRIS placeholder info, donation instructions, donation history fixture
│   ├── components/        # presentational, reusable across routes (see below)
│   └── routes/             # file-based routes; __root.tsx is the HTML shell
├── PLAN.md                 # roadmap for database/auth/admin (not built here)
└── AGENTS.md                # this file
```

### Routes

- `/` (`index.tsx`) — Beranda: hero, prayer times, tentang/kegiatan/laporan previews, donation CTA.
- `/tentang` — profile, sejarah, visi/misi, pengurus, fasilitas.
- `/kegiatan` — activities/announcements list with category filter.
- `/laporan` — financial reports index: current stats + monthly report cards.
- `/laporan/$slug` — one month's report (e.g. `/laporan/september-2026`); 404s via `notFound()` if the slug isn't in `src/data/laporan.ts`.
- `/donasi` — bank accounts, QRIS, donation instructions, WhatsApp confirmation, donation history.
- 404s render `src/components/NotFound.tsx` via `notFoundComponent` on the root route.

### Components worth knowing about

- `ShareBar` — WhatsApp/Facebook/copy-link buttons; resolves the current origin client-side, falls back to the production domain during SSR.
- `QRCodeBlock` — generates a real QR code client-side with the `qrcode` package (no external QR API/image needed).
- `ExportActions` — Cetak (native `window.print()`), Download PDF (`jspdf` + `jspdf-autotable`), Download Excel (`xlsx`), all dynamically imported so they don't bloat the initial bundle.
- `IncomeExpenseChart` — a hand-built HTML/CSS bar chart (no charting library), validated against the `dataviz` skill's accessibility checks.

## Non-obvious decisions

- **`adaBukti` is a boolean, not a fake photo.** The mosque wants each
  transaction to show whether a receipt/invoice photo exists. Rather than
  generating fake nota/kuitansi images (which could be mistaken for real
  financial records), `Transaksi.adaBukti` in `laporan.ts` just flags
  presence/absence, rendered as an honest "Ada foto" / "Belum ada" badge in
  `TransactionTable`. Real photo upload is Milestone 3 in `PLAN.md`.
- **The QRIS code is real but the payload is a placeholder.** `QRCodeBlock`
  generates a genuinely scannable QR (via `qrcode`), but it encodes placeholder
  text, not a real QRIS payload. `donasi.tsx` shows `qrisInfo.catatan` next to
  it, explicitly telling the mosque to swap in an official bank/PJSP-issued
  static QRIS image before going live — don't remove that disclaimer.
- **The income/expense chart palette (`#1a7a4f` / `#c9962f`) was validated with
  the `dataviz` skill's `validate_palette.js`**, not picked by eye. The gold
  slot has a contrast WARN against the cream surface in light mode; that WARN
  is satisfied by always rendering `TransactionTable` (a full data table)
  alongside the chart — don't remove the table without re-checking the WARN.
- **All money values use `formatRupiah` from `src/data/laporan.ts`** (Indonesian `Rp` grouping) — don't reformat manually.
- **Every placeholder value is labeled inline** in `masjid.ts` / `donasi.ts`
  (address, phone, bank accounts, prayer times, QRIS). When real content
  arrives, search for `contoh`/`placeholder` in those two files.
- **Google Maps embed uses a plain `https://www.google.com/maps?q=...&output=embed` iframe** — no API key needed, intentionally, to avoid adding a paid dependency for this milestone.
