import crypto from 'crypto'
import type { Product } from '@/types/product'
import type { SortOption } from './mercadolibre'

const AE_BASE_URL = 'https://api-sg.aliexpress.com/sync'

function generateSign(params: Record<string, string>, secret: string): string {
  const sortedKeys = Object.keys(params).sort()
  let str = secret
  for (const key of sortedKeys) {
    str += key + params[key]
  }
  str += secret
  return crypto.createHash('md5').update(str).digest('hex').toUpperCase()
}

const SORT_MAP: Record<SortOption, string> = {
  relevance: 'LAST_VOLUME_DESC',
  price_asc: 'SALE_PRICE_ASC',
  price_desc: 'SALE_PRICE_DESC',
}

interface AEProduct {
  product_id: number
  product_title: string
  sale_price: string
  product_main_image_url: string
  product_detail_url: string
  promotion_link?: string
}

function normalizeAEProduct(item: AEProduct): Product {
  const price = parseFloat(item.sale_price.replace(/[^0-9.]/g, ''))
  return {
    id: `ae-${item.product_id}`,
    title: item.product_title,
    price,
    currency: 'USD',
    thumbnail: item.product_main_image_url,
    permalink: item.promotion_link ?? item.product_detail_url,
    source: 'aliexpress',
  }
}

export async function searchAliExpress(
  query: string,
  options: { limit?: number; sort?: SortOption; page?: number } = {}
): Promise<Product[]> {
  const appKey = process.env.AE_APP_KEY
  const appSecret = process.env.AE_APP_SECRET

  if (!appKey || !appSecret) {
    return searchAliExpressMock(query, options)
  }

  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const params: Record<string, string> = {
    method: 'aliexpress.affiliate.product.query',
    app_key: appKey,
    timestamp,
    sign_method: 'md5',
    format: 'json',
    v: '2.0',
    keywords: query,
    page_size: String(options.limit ?? 20),
    page_no: String(options.page ?? 1),
    sort: SORT_MAP[options.sort ?? 'relevance'],
    fields: 'product_id,product_title,sale_price,product_main_image_url,product_detail_url,promotion_link',
    target_currency: 'USD',
    target_language: 'ES',
  }

  params.sign = generateSign(params, appSecret)

  const url = new URL(AE_BASE_URL)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 300 } })
    const data = await res.json()
    const result = data?.aliexpress_affiliate_product_query_response?.resp_result?.result
    const products: AEProduct[] = result?.products?.product ?? []
    if (products.length === 0) return searchAliExpressMock(query, options)
    return products.map(normalizeAEProduct)
  } catch {
    return searchAliExpressMock(query, options)
  }
}

// --- Mock fallback ---

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'ae-001',
    title: 'Figura coleccionable Nezuko Kamado Demon Slayer 20cm PVC premium',
    price: 12.99,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/f4f3ff/8b7cf8?text=Nezuko',
    permalink: 'https://www.aliexpress.com/item/1005010081024787.html',
    source: 'aliexpress',
    availableQuantity: 35,
  },
  {
    id: 'ae-002',
    title: 'Figura Rem Re:Zero 18cm articulada anime coleccionable',
    price: 9.85,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/e0f2fe/7dd3fc?text=Rem',
    permalink: 'https://www.aliexpress.com/w/wholesale-rem-rezero-figure.html',
    source: 'aliexpress',
    availableQuantity: 22,
  },
  {
    id: 'ae-003',
    title: 'Keycaps kawaii anime mecánico Cherry MX estilo japonés',
    price: 18.50,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/fdf4ff/c084fc?text=Keycaps',
    permalink: 'https://www.aliexpress.com/item/1005002559208185.html',
    source: 'aliexpress',
    availableQuantity: 15,
  },
  {
    id: 'ae-004',
    title: 'Mouse inalámbrico kawaii pastel aesthetic pink anime setup',
    price: 19.80,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/fff0f6/fb7185?text=Mouse',
    permalink: 'https://www.aliexpress.com/w/wholesale-kawaii-wireless-mouse-pink.html',
    source: 'aliexpress',
    availableQuantity: 40,
  },
  {
    id: 'ae-005',
    title: 'Alfombra escritorio XL anime aesthetic 80x30cm suede',
    price: 7.20,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/f0fdf4/4ade80?text=Mousepad',
    permalink: 'https://www.aliexpress.com/w/wholesale-anime-desk-mat-xl.html',
    source: 'aliexpress',
    availableQuantity: 60,
  },
  {
    id: 'ae-006',
    title: 'Figura Genshin Impact Hu Tao 23cm articulada coleccionable',
    price: 15.99,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/fff7ed/fb923c?text=Hu+Tao',
    permalink: 'https://www.aliexpress.com/w/wholesale-genshin-impact-hu-tao-figure.html',
    source: 'aliexpress',
    availableQuantity: 18,
  },
  {
    id: 'ae-007',
    title: 'Pack stickers kawaii anime holo holographic 50 piezas',
    price: 2.80,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/f4f3ff/8b7cf8?text=Stickers',
    permalink: 'https://www.aliexpress.com/w/wholesale-kawaii-anime-stickers-holographic.html',
    source: 'aliexpress',
    availableQuantity: 120,
  },
  {
    id: 'ae-008',
    title: 'Tira LED RGB 5m setup anime aesthetic programable USB',
    price: 8.90,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/f0f9ff/38bdf8?text=LED+RGB',
    permalink: 'https://www.aliexpress.com/w/wholesale-rgb-led-strip-5m-usb.html',
    source: 'aliexpress',
    availableQuantity: 80,
  },
  {
    id: 'ae-009',
    title: 'Peluca cosplay Hatsune Miku celeste aqua 90cm + redecilla',
    price: 6.30,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/e0f2fe/0ea5e9?text=Peluca',
    permalink: 'https://www.aliexpress.com/w/wholesale-hatsune-miku-cosplay-wig.html',
    source: 'aliexpress',
    availableQuantity: 45,
  },
  {
    id: 'ae-010',
    title: 'Cuaderno A5 kawaii anime ilustrado tapa dura 160 páginas',
    price: 3.20,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/fef9ee/facc15?text=Cuaderno',
    permalink: 'https://www.aliexpress.com/w/wholesale-kawaii-anime-notebook-a5.html',
    source: 'aliexpress',
    availableQuantity: 90,
  },
  {
    id: 'ae-011',
    title: 'Lámpara de noche anime luna estrellas ilusión 3D RGB',
    price: 11.20,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/f8fafc/94a3b8?text=Lampara+3D',
    permalink: 'https://www.aliexpress.com/w/wholesale-3d-illusion-night-lamp-rgb.html',
    source: 'aliexpress',
    availableQuantity: 30,
  },
  {
    id: 'ae-012',
    title: 'Poster metálico Evangelion Unit-01 30x40cm decoración',
    price: 5.50,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/f4f3ff/8b7cf8?text=Poster+Eva',
    permalink: 'https://www.aliexpress.com/w/wholesale-evangelion-metal-poster.html',
    source: 'aliexpress',
    availableQuantity: 50,
  },
  {
    id: 'ae-013',
    title: 'Cooling pad laptop RGB 6 ventiladores gaming notebook stand',
    price: 14.90,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/e8f5e9/66bb6a?text=Cooling+Pad',
    permalink: 'https://www.aliexpress.com/w/wholesale-laptop-cooling-pad-rgb.html',
    source: 'aliexpress',
    availableQuantity: 55,
  },
  {
    id: 'ae-014',
    title: 'SSD externo USB 3.2 500GB portable high speed storage',
    price: 22.50,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/e3f2fd/42a5f5?text=SSD+Externo',
    permalink: 'https://www.aliexpress.com/w/wholesale-portable-ssd-500gb-usb.html',
    source: 'aliexpress',
    availableQuantity: 40,
  },
  {
    id: 'ae-015',
    title: 'Thermal paste CPU GPU high performance 5g conductividad',
    price: 3.80,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/fce4ec/ef5350?text=Pasta+Termica',
    permalink: 'https://www.aliexpress.com/w/wholesale-thermal-paste-cpu-gpu.html',
    source: 'aliexpress',
    availableQuantity: 200,
  },
  {
    id: 'ae-016',
    title: 'Micrófono condensador USB cardioide para streaming podcast',
    price: 18.99,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/ede7f6/7e57c2?text=Microfono+USB',
    permalink: 'https://www.aliexpress.com/w/wholesale-usb-condenser-microphone-streaming.html',
    source: 'aliexpress',
    availableQuantity: 65,
  },
  {
    id: 'ae-017',
    title: 'Ring light 26cm con trípode flexible clip celular streaming',
    price: 9.50,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/fff9c4/ffca28?text=Ring+Light',
    permalink: 'https://www.aliexpress.com/w/wholesale-ring-light-26cm-tripod-phone.html',
    source: 'aliexpress',
    availableQuantity: 90,
  },
  {
    id: 'ae-018',
    title: 'Webcam HD 1080p autofocus con micrófono incorporado USB',
    price: 16.20,
    currency: 'USD',
    thumbnail: 'https://placehold.co/400x400/e0f7fa/26c6da?text=Webcam+1080p',
    permalink: 'https://www.aliexpress.com/w/wholesale-webcam-1080p-autofocus-usb.html',
    source: 'aliexpress',
    availableQuantity: 48,
  },
]

const PRODUCT_KEYWORDS: Record<string, string[]> = {
  'ae-001': ['nezuko', 'demon slayer', 'kimetsu', 'figura', 'figure', 'pvc', 'coleccionable'],
  'ae-002': ['rem', 'rezero', 're:zero', 'figura', 'figure', 'coleccionable'],
  'ae-003': ['teclado', 'keyboard', 'keycap', 'mecanico', 'kawaii', 'anime', 'cherry'],
  'ae-004': ['mouse', 'raton', 'kawaii', 'pastel', 'pink', 'rosa', 'setup', 'inalambrico'],
  'ae-005': ['mousepad', 'alfombra', 'desk mat', 'escritorio', 'setup', 'anime', 'xl'],
  'ae-006': ['genshin', 'hu tao', 'figura', 'figure', 'coleccionable', 'genshin impact'],
  'ae-007': ['sticker', 'stickers', 'kawaii', 'anime', 'holo', 'holographic', 'pegatina'],
  'ae-008': ['led', 'rgb', 'tira', 'luces', 'setup', 'anime', 'aesthetic', 'usb'],
  'ae-009': ['peluca', 'wig', 'cosplay', 'miku', 'hatsune', 'vocaloid', 'celeste'],
  'ae-010': ['cuaderno', 'notebook', 'libreta', 'kawaii', 'anime', 'a5', 'papeleria'],
  'ae-011': ['lampara', 'lamp', '3d', 'rgb', 'noche', 'luna', 'anime', 'ilusion'],
  'ae-012': ['poster', 'evangelion', 'eva', 'metalico', 'decoracion', 'neon genesis'],
  'ae-013': ['cooling', 'pad', 'laptop', 'notebook', 'ventilador', 'cooler', 'rgb', 'gaming', 'pc'],
  'ae-014': ['ssd', 'storage', 'usb', 'portable', 'disco', 'almacenamiento', 'externo', 'pc'],
  'ae-015': ['thermal', 'paste', 'pasta', 'termica', 'cpu', 'gpu', 'processor', 'graphics', 'ram', 'motherboard'],
  'ae-016': ['microfono', 'microphone', 'condenser', 'usb', 'streaming', 'podcast', 'stream', 'capture'],
  'ae-017': ['ring', 'light', 'tripode', 'streaming', 'stream', 'youtuber', 'content', 'creator', 'webcam'],
  'ae-018': ['webcam', 'camara', 'camera', '1080p', 'usb', 'streaming', 'stream', 'capture', 'card'],
}

function searchAliExpressMock(
  query: string,
  options: { limit?: number; sort?: SortOption } = {}
): Product[] {
  const keywords = query.toLowerCase().split(' ').filter(Boolean)
  const filtered = MOCK_PRODUCTS.filter((p) => {
    const extra = PRODUCT_KEYWORDS[p.id] ?? []
    const haystack = p.title.toLowerCase() + ' ' + extra.join(' ')
    return keywords.some((kw) => haystack.includes(kw))
  })
  let results = filtered.length > 0 ? filtered : MOCK_PRODUCTS.slice(0, 6)
  if (options.sort === 'price_asc') results = [...results].sort((a, b) => a.price - b.price)
  if (options.sort === 'price_desc') results = [...results].sort((a, b) => b.price - a.price)
  return results.slice(0, options.limit ?? results.length)
}
