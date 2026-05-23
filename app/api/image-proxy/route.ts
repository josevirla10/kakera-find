import { NextRequest } from 'next/server'

function isAllowed(hostname: string): boolean {
  return (
    hostname.endsWith('.alicdn.com') ||
    hostname.endsWith('.aliexpress.com') ||
    hostname.endsWith('.mlstatic.com') ||
    hostname === 'placehold.co'
  )
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) return new Response('Missing url', { status: 400 })

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return new Response('Invalid url', { status: 400 })
  }

  if (!isAllowed(parsed.hostname)) {
    return new Response('Domain not allowed', { status: 403 })
  }

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } })
    if (!res.ok) return new Response('Upstream error', { status: 502 })

    const blob = await res.blob()
    return new Response(blob, {
      headers: {
        'Content-Type': res.headers.get('content-type') ?? 'image/jpeg',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return new Response('Fetch error', { status: 502 })
  }
}
