/**
 * Backfill script: Register VG Wort pixels for all articles that don't have one yet.
 * Run once with: node scripts/backfill-vgwort.js
 */

require('dotenv').config({ path: '.env.local' })

const { createClient } = require('next-sanity')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function registerVgWortPixel() {
  const response = await fetch(
    'https://tom.vgwort.de/api/cms/metis/rest/pixel/v1.0/order',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.VG_WORT_USERNAME}:${process.env.VG_WORT_PASSWORD}`).toString('base64'),
        'api_key': process.env.VG_WORT_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count: 1 }),
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`VG Wort API error ${response.status}: ${text}`)
  }

  const data = await response.json()
  const pixel = data?.pixels?.[0]
  const domain = data?.domain
  if (!pixel?.publicIdentificationId || !domain) {
    throw new Error(`Unexpected VG Wort response: ${JSON.stringify(data)}`)
  }
  return `https://${domain}/na/${pixel.publicIdentificationId}`
}

async function backfillPixels() {
  console.log('🔍 Fetching articles without VG Wort pixels...')

  const articles = await client.fetch(
    `*[_type == "article"] { _id, title, vgWortPixelUrl }`
  )

  const needsPixel = articles.filter((a) => !a.vgWortPixelUrl)

  if (needsPixel.length === 0) {
    console.log('✓ All articles already have pixels.')
    return
  }

  console.log(`\n📝 Found ${needsPixel.length} article(s) needing pixels:\n`)
  needsPixel.forEach((a) => console.log(`  • ${a.title}`))

  console.log(`\n⏳ Registering pixels with VG Wort...\n`)

  for (const article of needsPixel) {
    try {
      const pixelUrl = await registerVgWortPixel()
      await client.patch(article._id).set({ vgWortPixelUrl: pixelUrl }).commit()
      console.log(`✓ ${article.title}`)
    } catch (err) {
      console.error(
        `✗ ${article.title}: ${err.message || 'Unknown error'}`
      )
    }
  }

  console.log('\n✅ Backfill complete!')
}

backfillPixels().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
