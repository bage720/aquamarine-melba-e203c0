import { GoogleGenAI } from '@google/genai'
import { writeFile } from 'node:fs/promises'

const ai = new GoogleGenAI({
  apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
  httpOptions: { baseUrl: process.env.NETLIFY_AI_GATEWAY_BASE_URL?.replace(/\/$/, '') },
})

const jobs = [
  {
    file: 'public/img/logo-masjid.png',
    prompt:
      'A minimalist flat-vector emblem logo for a mosque called "Masjid Syuhada". Circular badge composed of a simple geometric dome-and-minaret silhouette with an eight-point Islamic star (rub el hizb) motif above it, inside a thin circular border. Two-tone color only: deep dark green (#0b3d28) shapes on a transparent background, with delicate metallic gold (#c9962f) accent linework and gold border ring. Clean, symmetrical, corporate-institutional style, no text, no letters, no gradients, no photorealism, no shadows, vector icon aesthetic, crisp edges, centered composition.',
  },
  {
    file: 'public/img/hero-masjid.png',
    prompt:
      'Wide cinematic architectural illustration of an elegant Southeast Asian mosque exterior at golden hour, single large onion dome and one slender minaret, geometric lattice (mashrabiya) screens, warm dusk sky in deep teal-green fading to soft amber gold near the horizon, minimal palm silhouettes, calm reflecting pool in the foreground. Flat modern illustration style with clean geometric shapes and limited color palette of deep emerald green, cream white, and warm gold, no people, no text, no logos, high detail on architecture, wide 16:9 aspect ratio, serene and dignified mood.',
  },
  {
    file: 'public/img/pattern-tile.png',
    prompt:
      'A seamless repeating geometric Islamic star pattern tile, tessellating eight-pointed star and polygon motif, thin linework only, single color deep dark green line art on a fully transparent background, minimal, elegant, subtle, suitable as a tiny decorative texture, no gradients, no shading, flat vector line pattern.',
  },
]

for (const job of jobs) {
  console.log('Generating', job.file)
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image',
    contents: job.prompt,
  })
  const parts = response.candidates?.[0]?.content?.parts ?? []
  const imagePart = parts.find((p) => p.inlineData)
  if (!imagePart?.inlineData) {
    console.error('No image returned for', job.file, JSON.stringify(response).slice(0, 500))
    continue
  }
  await writeFile(job.file, Buffer.from(imagePart.inlineData.data, 'base64'))
  console.log('Saved', job.file)
}
