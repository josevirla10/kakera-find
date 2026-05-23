import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { searchML, type SortOption } from '@/lib/mercadolibre'
import { searchAliExpress } from '@/lib/aliexpress'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton'
import { SearchFilters } from '@/components/search/SearchFilters'
import { FilterDrawer } from '@/components/search/FilterDrawer'
import type { Product } from '@/types/product'

interface PageProps {
  searchParams: Promise<{
    q?: string
    fuente?: string
    orden?: string
    precioMin?: string
    precioMax?: string
  }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Resultados para "${q}"` : 'Búsqueda',
    description: q
      ? `Encontrá los mejores productos anime para "${q}" en Kakera Find.`
      : 'Buscá productos anime en Kakera Find.',
  }
}

// Inner server component that does the fetching (enables Suspense streaming)
async function SearchResults({
  q,
  fuente,
  orden,
  precioMin,
  precioMax,
}: {
  q: string
  fuente: string
  orden: string
  precioMin: string
  precioMax: string
}) {
  let products: Product[] = []
  const sort = (['price_asc', 'price_desc'].includes(orden) ? orden : 'relevance') as SortOption

  if (fuente === 'aliexpress') {
    products = await searchAliExpress(q, { sort })
  } else if (fuente === 'mercadolibre') {
    products = await searchML(q, { sort }).catch(() => [])
  } else {
    const [mlResult, aeResult] = await Promise.allSettled([
      searchML(q, { sort }),
      searchAliExpress(q, { sort }),
    ])
    const ml = mlResult.status === 'fulfilled' ? mlResult.value : []
    const ae = aeResult.status === 'fulfilled' ? aeResult.value : []
    products = [...ml, ...ae]
  }

  // Price filtering (applied after fetch — currency-agnostic for MVP)
  const min = precioMin ? Number(precioMin) : null
  const max = precioMax ? Number(precioMax) : null
  if (min !== null || max !== null) {
    products = products.filter((p) => {
      if (min !== null && p.price < min) return false
      if (max !== null && p.price > max) return false
      return true
    })
  }

  // Sort merged results (ML is sorted by API; AliExpress mock by the service)
  if (fuente === 'all') {
    if (orden === 'price_asc') products.sort((a, b) => a.price - b.price)
    if (orden === 'price_desc') products.sort((a, b) => b.price - a.price)
  }

  if (products.length === 0) {
    return (
      // TODO: i18n
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <span className="text-5xl">🔍</span>
        <p className="text-lg font-semibold text-content-primary">
          No encontramos resultados para &ldquo;{q}&rdquo;
        </p>
        <p className="text-sm text-content-secondary">
          Intentá con otras palabras o explorá nuestras categorías.
        </p>
        <Link
          href="/"
          className="mt-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-[9px] transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    )
  }

  return <ProductGrid products={products} columns={4} />
}

const RESULTS_SKELETON = (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)

// TODO: i18n
export default async function BuscarPage({ searchParams }: PageProps) {
  const { q = '', fuente = 'all', orden = 'relevance', precioMin = '', precioMax = '' } =
    await searchParams

  if (!q.trim()) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-content-secondary">
          Ingresá algo en la barra de búsqueda para comenzar.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-content-primary truncate">
          Resultados para{' '}
          <span className="text-accent">&ldquo;{q}&rdquo;</span>
        </h1>
        {/* Mobile filter button */}
        <div className="md:hidden shrink-0">
          <Suspense>
            <FilterDrawer />
          </Suspense>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar filters */}
        <div className="hidden md:block">
          <Suspense>
            <SearchFilters />
          </Suspense>
        </div>

        {/* Results grid */}
        <div className="flex-1 min-w-0">
          <Suspense fallback={RESULTS_SKELETON}>
            <SearchResults
              q={q}
              fuente={fuente}
              orden={orden}
              precioMin={precioMin}
              precioMax={precioMax}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
