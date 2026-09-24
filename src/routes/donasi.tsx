import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Copy,
  Check,
  MessageCircle,
  Landmark,
  QrCode,
  Info,
  HandCoins,
} from 'lucide-react'
import { masjid } from '@/data/masjid'
import { rekeningDonasi, qrisInfo, petunjukDonasi, riwayatDonasi } from '@/data/donasi'
import { formatRupiah } from '@/data/laporan'
import { SectionHeading } from '@/components/SectionHeading'
import { QRCodeBlock } from '@/components/QRCodeBlock'

export const Route = createFileRoute('/donasi')({
  component: DonasiPage,
})

function DonasiPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <SectionHeading
        kicker="Donasi & Infaq"
        title="Salurkan Donasi untuk Masjid"
        description="Setiap rupiah yang disalurkan akan tercatat dalam laporan keuangan bulanan dan dapat dipantau seluruh warga."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {rekeningDonasi.map((rekening) => (
            <RekeningCard key={rekening.nomor} {...rekening} />
          ))}

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-gold-600" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-green-900">
                Petunjuk Donasi
              </h3>
            </div>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
              {petunjukDonasi.map((langkah, i) => (
                <li key={langkah} className="flex gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-800/10 text-[11px] font-semibold text-green-800">
                    {i + 1}
                  </span>
                  {langkah}
                </li>
              ))}
            </ol>

            <a
              href={`https://wa.me/${masjid.waBendahara}?text=${encodeURIComponent(
                'Assalamu\'alaikum, saya sudah melakukan transfer donasi untuk Masjid Syuhada Sungai Mas. Berikut konfirmasinya: ',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-green-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Konfirmasi Donasi via WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
          <div className="flex items-center gap-2 text-green-900">
            <QrCode className="h-5 w-5 text-gold-600" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold">Donasi via QRIS</h3>
          </div>
          <QRCodeBlock value={`QRIS-${qrisInfo.merchantId}`} size={190} />
          <p className="font-medium text-green-900">{qrisInfo.namaMerchant}</p>
          <p className="rounded-xl bg-gold-500/10 p-3 text-xs leading-relaxed text-ink-soft">
            {qrisInfo.catatan}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-lg font-semibold text-green-900">Riwayat Donasi Terbaru</h3>
        <p className="mt-1 text-sm text-ink-soft">
          Nama dapat disamarkan atas permintaan donatur ("Hamba Allah").
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 text-xs uppercase tracking-wide text-ink-soft">
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 font-medium">Donatur</th>
                <th className="px-4 py-3 font-medium">Metode</th>
                <th className="px-4 py-3 text-right font-medium">Jumlah</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {riwayatDonasi.map((donasi, i) => (
                <tr key={i} className="border-b border-black/5 last:border-0">
                  <td className="px-4 py-3 text-ink-soft">
                    {new Date(donasi.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium text-green-900">{donasi.nama}</td>
                  <td className="px-4 py-3 text-ink-soft">{donasi.metode}</td>
                  <td className="px-4 py-3 text-right font-medium text-green-900">
                    {formatRupiah(donasi.jumlah)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        donasi.status === 'Terverifikasi'
                          ? 'bg-green-800/10 text-green-800'
                          : 'bg-gold-500/15 text-gold-700'
                      }`}
                    >
                      {donasi.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="relative mt-8 flex items-start gap-3 overflow-hidden rounded-2xl bg-green-950 p-5 text-cream sm:p-6">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url(/.netlify/images?url=/img/pattern-tile.png&w=700&fm=webp)',
            backgroundSize: '340px',
          }}
          aria-hidden="true"
        />
        <HandCoins className="relative mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
        <p className="relative text-sm leading-relaxed text-cream/85">
          Seluruh donasi yang masuk akan direkap oleh bendahara DKM {masjid.namaSingkat} dan
          dimasukkan ke laporan keuangan bulan berjalan. Warga dapat memantau penggunaannya melalui
          halaman Laporan Keuangan.
        </p>
      </div>
    </div>
  )
}

function RekeningCard({ bank, nomor, atasNama }: { bank: string; nomor: string; atasNama: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(nomor)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Salin nomor rekening ini:', nomor)
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-800/10 text-green-800">
          <Landmark className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{bank}</p>
          <p className="mt-0.5 font-display text-lg font-semibold tracking-wide text-green-900">
            {nomor}
          </p>
          <p className="text-xs text-ink-soft">a.n. {atasNama}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-green-700/20 px-3 py-1.5 text-xs font-semibold text-green-800 transition-colors hover:bg-green-50"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" aria-hidden="true" /> Tersalin
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" /> Salin
          </>
        )}
      </button>
    </div>
  )
}
