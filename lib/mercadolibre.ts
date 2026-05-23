import type { Product } from '@/types/product'

const ML_BASE = 'https://api.mercadolibre.com'
const ML_SITE = process.env.NEXT_PUBLIC_ML_SITE ?? 'MLA'

interface MLRawProduct {
  id: string
  title: string
  price: number
  currency_id: string
  thumbnail: string
  permalink: string
  available_quantity: number
}

interface MLSearchResponse {
  results: MLRawProduct[]
  paging: { total: number; limit: number; offset: number }
}

export type SortOption = 'relevance' | 'price_asc' | 'price_desc'

const SORT_MAP: Record<SortOption, string | null> = {
  relevance: null,
  price_asc: 'price_asc',
  price_desc: 'price_desc',
}

// Module-level token cache — persists across requests in the same process instance
interface TokenCache {
  value: string
  expiresAt: number
}
let tokenCache: TokenCache | null = null

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 5 min buffer)
  if (tokenCache && Date.now() < tokenCache.expiresAt - 300_000) {
    return tokenCache.value
  }

  const res = await fetch(`${ML_BASE}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.ML_APP_ID!,
      client_secret: process.env.ML_APP_SECRET!,
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`ML auth error: ${res.status}`)
  }

  const data = await res.json()
  tokenCache = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  }
  return tokenCache.value
}

function normalizeProduct(item: MLRawProduct): Product {
  return {
    id: `ml-${item.id}`,
    title: item.title,
    price: item.price,
    currency: item.currency_id === 'USD' ? 'USD' : 'ARS',
    // Higher-quality thumbnail: replace -I.jpg suffix with -O.jpg
    thumbnail: item.thumbnail.replace(/-I\.jpg$/, '-O.jpg'),
    permalink: item.permalink,
    source: 'mercadolibre',
    availableQuantity: item.available_quantity,
  }
}

export async function searchML(
  query: string,
  options: { limit?: number; offset?: number; sort?: SortOption } = {}
): Promise<Product[]> {
  const params = new URLSearchParams({
    q: query,
    limit: String(options.limit ?? 20),
    offset: String(options.offset ?? 0),
    condition: 'new',
  })

  const sortValue = SORT_MAP[options.sort ?? 'relevance']
  if (sortValue) params.set('sort', sortValue)

  const headers: Record<string, string> = {}

  // Prefer pre-configured user token; fall back to client_credentials
  if (process.env.ML_ACCESS_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.ML_ACCESS_TOKEN}`
  } else if (process.env.ML_APP_ID && process.env.ML_APP_SECRET) {
    const token = await getAccessToken()
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${ML_BASE}/sites/${ML_SITE}/search?${params}`, {
    headers,
    next: { revalidate: 300 }, // 5 min ISR cache
  })

  if (!res.ok) {
    throw new Error(`MercadoLibre API error: ${res.status}`)
  }

  const data: MLSearchResponse = await res.json()
  return data.results.map(normalizeProduct)
}
