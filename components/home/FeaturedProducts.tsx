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
  const [mlResults, aeResults] = await Promise.allSettled([
    Promise.all(FEATURED_QUERIES.map((q) => searchML(q, { limit: 6 }))),
    Promise.all(FEATURED_QUERIES.map((q) => searchAliExpress(q, { limit: 6 }))),
  ])

  const seen = new Set<string>()
  const products: Product[] = []

  const batches =
    mlResults.status === 'fulfilled' && mlResults.value.flat().length > 0
      ? mlResults.value
      : aeResults.status === 'fulfilled'
        ? aeResults.value
        : []

  for (const batch of batches) {
    for (const p of batch) {
      if (!seen.has(p.id)) {
        seen.add(p.id)
        products.push(p)
      }
    }
  }

  const featured = products.slice(0, 16)

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
      <ProductGrid products={featured} columns={4} />
    </section>
  )
}
