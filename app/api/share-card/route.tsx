import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const title = sp.get('title') ?? ''
  const price = sp.get('price') ?? ''
  const source = sp.get('source') ?? 'aliexpress'
  const thumbnail = sp.get('thumbnail') ?? ''

  const sourceLabel = source === 'aliexpress' ? 'AliExpress' : 'MercadoLibre'
  const badgeBg = source === 'aliexpress' ? '#ff6600' : '#ffe600'
  const badgeColor = source === 'aliexpress' ? '#ffffff' : '#333333'

  // Fetch product image server-side to avoid CORS in the renderer
  let imageDataUrl = ''
  if (thumbnail) {
    try {
      const res = await fetch(thumbnail)
      if (res.ok) {
        const buf = await res.arrayBuffer()
        const b64 = Buffer.from(buf).toString('base64')
        const ct = res.headers.get('content-type') ?? 'image/jpeg'
        imageDataUrl = `data:${ct};base64,${b64}`
      }
    } catch { /* render without image */ }
  }

  const truncatedTitle = title.length > 90 ? title.slice(0, 90) + '…' : title

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '600px',
          height: '820px',
          background: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Product image */}
        <div
          style={{
            width: '600px',
            height: '600px',
            background: '#f4f3ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {imageDataUrl ? (
            <img
              src={imageDataUrl}
              width={600}
              height={600}
              style={{ objectFit: 'cover', width: '600px', height: '600px' }}
            />
          ) : (
            <span style={{ fontSize: '80px' }}>🛒</span>
          )}

          {/* Source badge */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: badgeBg,
              color: badgeColor,
              fontSize: '13px',
              fontWeight: 'bold',
              padding: '4px 12px',
              borderRadius: '6px',
              display: 'flex',
            }}
          >
            {sourceLabel}
          </div>
        </div>

        {/* Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 24px 12px',
            gap: '10px',
            flex: 1,
          }}
        >
          <p
            style={{
              fontSize: '19px',
              fontWeight: 'bold',
              color: '#1a1a2e',
              margin: 0,
              lineHeight: '1.35',
            }}
          >
            {truncatedTitle}
          </p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b7cf8', margin: 0 }}>
            {price}
          </p>
        </div>

        {/* Branding strip */}
        <div
          style={{
            background: '#f4f3ff',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ color: '#8b7cf8', fontSize: '15px', fontWeight: 'bold' }}>
            ✨ Encontrado en
          </span>
          <span style={{ color: '#1a1a2e', fontSize: '15px', fontWeight: 'bold' }}>
            find.kakeralabs.com
          </span>
        </div>
      </div>
    ),
    { width: 600, height: 820 }
  )
}
