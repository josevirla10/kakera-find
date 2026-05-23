// TODO: Connect to AliExpress Affiliate API using ALIEXPRESS_API_KEY
// Docs: https://portals.aliexpress.com/
// Replace MOCK_PRODUCTS with real API calls and remove this mock layer

import type { Product } from '@/types/product'
import type { SortOption } from './mercadolibre'

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'ae-001',
    title: 'Figura coleccionable Nezuko Kamado Demon Slayer 20cm PVC premium',
    price: 12990,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/f4f3ff/8b7cf8?text=Nezuko',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 35,
  },
  {
    id: 'ae-002',
    title: 'Figura Rem Re:Zero 18cm articulada anime coleccionable',
    price: 9850,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/e0f2fe/7dd3fc?text=Rem',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 22,
  },
  {
    id: 'ae-003',
    title: 'Teclado mecánico kawaii 65% RGB rose aesthetic anime',
    price: 38500,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/fdf4ff/c084fc?text=Teclado',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 15,
  },
  {
    id: 'ae-004',
    title: 'Mouse inalámbrico kawaii pastel aesthetic pink anime setup',
    price: 19800,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/fff0f6/fb7185?text=Mouse',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 40,
  },
  {
    id: 'ae-005',
    title: 'Alfombra escritorio XL anime aesthetic 80x30cm suede',
    price: 7200,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/f0fdf4/4ade80?text=Mousepad',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 60,
  },
  {
    id: 'ae-006',
    title: 'Figura Genshin Impact Hu Tao 23cm articulada coleccionable',
    price: 15990,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/fff7ed/fb923c?text=Hu+Tao',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 18,
  },
  {
    id: 'ae-007',
    title: 'Pack stickers kawaii anime holo holographic 50 piezas',
    price: 2800,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/f4f3ff/8b7cf8?text=Stickers',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 120,
  },
  {
    id: 'ae-008',
    title: 'Tira LED RGB 5m setup anime aesthetic programable USB',
    price: 8900,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/f0f9ff/38bdf8?text=LED+RGB',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 80,
  },
  {
    id: 'ae-009',
    title: 'Peluca cosplay Hatsune Miku celeste aqua 90cm + redecilla',
    price: 6300,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/e0f2fe/0ea5e9?text=Peluca',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 45,
  },
  {
    id: 'ae-010',
    title: 'Cuaderno A5 kawaii anime ilustrado tapa dura 160 páginas',
    price: 3200,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/fef9ee/facc15?text=Cuaderno',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 90,
  },
  {
    id: 'ae-011',
    title: 'Lámpara de noche anime luna estrellas ilusión 3D RGB',
    price: 11200,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/f8fafc/94a3b8?text=Lampara+3D',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 30,
  },
  {
    id: 'ae-012',
    title: 'Poster metálico Evangelion Unit-01 30x40cm decoración',
    price: 5500,
    currency: 'ARS',
    thumbnail: 'https://placehold.co/400x400/f4f3ff/8b7cf8?text=Poster+Eva',
    permalink: 'https://aliexpress.com',
    source: 'aliexpress',
    availableQuantity: 50,
  },
]

export async function searchAliExpress(
  query: string,
  options: { limit?: number; sort?: SortOption } = {}
): Promise<Product[]> {
  // TODO: Replace with real AliExpress Affiliate API call using ALIEXPRESS_API_KEY
  const keywords = query.toLowerCase().split(' ').filter(Boolean)
  const filtered = MOCK_PRODUCTS.filter((p) =>
    keywords.some((kw) => p.title.toLowerCase().includes(kw))
  )
  let results = filtered.length > 0 ? filtered : MOCK_PRODUCTS.slice(0, 6)

  if (options.sort === 'price_asc') {
    results = [...results].sort((a, b) => a.price - b.price)
  } else if (options.sort === 'price_desc') {
    results = [...results].sort((a, b) => b.price - a.price)
  }

  return results.slice(0, options.limit ?? results.length)
}
