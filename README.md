# Masjid Syuhada Sungai Mas

Situs resmi Masjid Syuhada Sungai Mas — jadwal kegiatan, laporan keuangan
transparan, dan donasi daring untuk warga.

## Tech stack

TanStack Start (React 19 + TanStack Router) on Vite 7, styled with Tailwind
CSS 4, deployed on Netlify. See `AGENTS.md` for the full architecture
breakdown and the reasoning behind non-obvious decisions.

## Running locally

```bash
pnpm install
pnpm dev
```

```bash
pnpm build   # production build
```

## Status

This is the first milestone: the public-facing site (Beranda, Tentang,
Kegiatan, Laporan Keuangan per bulan, Donasi) with realistic placeholder
data. There is no database, login, or admin panel yet — see `PLAN.md` for
that roadmap, and for the list of real content (address, bank accounts,
QRIS, logo) the mosque still needs to supply.
