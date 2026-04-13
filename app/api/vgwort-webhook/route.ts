import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function registerVgWortPixel(): Promise<string> {
  const response = await fetch(
    'https://tom.vgwort.de/api/cms/metis/rest/pixel/v1.0/order',
    {
      method: 'POST',
      headers: {
        'api_key': process.env.VG_WORT_API_KEY!,
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
  const domain: string = data?.domain
  if (!pixel?.publicIdentificationId || !domain) {
    throw new Error(`Unexpected VG Wort response: ${JSON.stringify(data)}`)
  }
  return `https://${domain}/na/${pixel.publicIdentificationId}`
}

export async function POST(request: NextRequest) {
  // Verify webhook secret to prevent unauthorised calls
  const secret = request.headers.get('x-webhook-secret')
  if (secret !== process.env.VGWORT_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: { _id?: string; _type?: string; vgWortPixelUrl?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { _id, _type, vgWortPixelUrl } = body

  if (_type !== 'article' || !_id) {
    return NextResponse.json({ skipped: true })
  }

  // Skip if pixel already assigned
  if (vgWortPixelUrl) {
    return NextResponse.json({ skipped: true, reason: 'pixel already set' })
  }

  try {
    const pixelUrl = await registerVgWortPixel()
    await writeClient.patch(_id).set({ vgWortPixelUrl: pixelUrl }).commit()
    return NextResponse.json({ success: true, pixelUrl })
  } catch (err) {
    console.error('[vgwort-webhook]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
