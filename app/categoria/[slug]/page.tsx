import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { searchML } from '@/lib/mercadolibre'
import { searchAliExpress } from '@/lib/aliexpress'
import { getCategoryBySlug, CATEGORIES } from '@/lib/categories'
import { ProductGrid } from '@/components/products/ProductGrid'
import type { Product } from '@/types/product'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategoryBySlug(slug)
  if (!cat) return {}
  return {
    title: cat.name,
    description: `${cat.description} — Encontrá los mejores ${cat.name.toLowerCase()} en Kakera Find.`,
  }
}

// TODO: i18n
export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  let products: Product[] = []

  const [mlResult, aeResult] = await Promise.allSettled([
    searchML(category.query, { limit: 16 }),
    searchAliExpress(category.query, { limit: 16 }),
  ])
  const ml = mlResult.status === 'fulfilled' ? mlResult.value : []
  const ae = aeResult.status === 'fulfilled' ? aeResult.value : []
  const seen = new Set<string>()
  for (const p of [...ml, ...ae]) {
    if (!seen.has(p.id)) {
      seen.add(p.id)
      products.push(p)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-content-tertiary mb-6">
        <Link href="/" className="hover:text-accent transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <span className="text-content-secondary">{category.name}</span>
      </nav>

      {/* Category header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border-subtle">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-content-primary">{category.name}</h1>
          <p className="text-sm text-content-secondary mt-0.5">{category.description}</p>
        </div>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <ProductGrid products={products} columns={4} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <span className="text-5xl">😿</span>
          <p className="text-content-secondary text-sm">
            No hay productos disponibles en este momento. Intentá de nuevo más tarde.
          </p>
        </div>
      )}
    </div>
  )
}
