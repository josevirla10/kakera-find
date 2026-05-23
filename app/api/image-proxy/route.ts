import { NextRequest } from 'next/server'

const ALLOWED_HOSTNAMES = [
  'ae01.alicdn.com',
  'ae02.alicdn.com',
  'ae03.alicdn.com',
  'ae04.alicdn.com',
  'ae05.alicdn.com',
  'img.alicdn.com',
  'http2.mlstatic.com',
  'placehold.co',
]

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) return new Response('Missing url', { status: 400 })

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return new Response('Invalid url', { status: 400 })
  }

  if (!ALLOWED_HOSTNAMES.includes(parsed.hostname)) {
    return new Response('Domain not allowed', { status: 403 })
  }

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
}
