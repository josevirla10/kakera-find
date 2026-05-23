import Link from 'next/link'
import { searchML } from '@/lib/mercadolibre'
import { searchAliExpress } from '@/lib/aliexpress'
import { ProductGrid } from '@/components/products/ProductGrid'
import type { Product } from '@/types/product'

const FEATURED_QUERIES = [
  'figura anime coleccionable',
  'kawaii aesthetic anime',
  'merch anime manga',
]

// TODO: i18n
export async function FeaturedProducts() {
  let products: Product[] = []

  // Try ML first; if it fails or returns nothing, fall back to AliExpress mock
  try {
    const results = await Promise.all(
      FEATURED_QUERIES.map((q) => searchML(q, { limit: 6 }))
    )

    const seen = new Set<string>()
    for (const batch of results) {
      for (const p of batch) {
        if (!seen.has(p.id)) {
          seen.add(p.id)
          products.push(p)
        }
      }
    }
    products = products.slice(0, 16)
  } catch {
    // ML unavailable — fall through to AliExpress below
  }

  if (products.length === 0) {
    const [a, b, c] = await Promise.all(
      FEATURED_QUERIES.map((q) => searchAliExpress(q, { limit: 6 }))
    )
    const seen = new Set<string>()
    for (const batch of [a, b, c]) {
      for (const p of batch) {
        if (!seen.has(p.id)) {
          seen.add(p.id)
          products.push(p)
        }
      }
    }
    products = products.slice(0, 16)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-2xl font-bold text-content-primary">Explorá ahora</h2>
        <Link
          href="/buscar?q=anime"
          className="text-sm text-accent hover:text-accent-hover transition-colors"
        >
          Ver más →
        </Link>
      </div>
      <ProductGrid products={products} columns={4} />
    </section>
  )
}
