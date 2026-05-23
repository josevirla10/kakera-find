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

const PAGE_SIZE = 20

interface PageProps {
  searchParams: Promise<{
    q?: string
    fuente?: string
    orden?: string
    precioMin?: string
    precioMax?: string
    pagina?: string
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

async function SearchResults({
  q, fuente, orden, precioMin, precioMax, page,
}: {
  q: string; fuente: string; orden: string
  precioMin: string; precioMax: string; page: number
}) {
  let products: Product[] = []
  const sort = (['price_asc', 'price_desc'].includes(orden) ? orden : 'relevance') as SortOption
  const offset = (page - 1) * PAGE_SIZE
  const min = precioMin ? Number(precioMin) : null
  const max = precioMax ? Number(precioMax) : null

  // When a price filter is active, fetch price_asc from the API so we get the
  // cheapest items first — maximizes the chance of finding products in the range.
  // The user's chosen sort is applied locally after filtering.
  const apiSort: SortOption = (min !== null || max !== null) ? 'price_asc' : sort

  if (fuente === 'aliexpress') {
    products = await searchAliExpress(q, { sort: apiSort, limit: PAGE_SIZE, page })
  } else if (fuente === 'mercadolibre') {
    products = await searchML(q, { sort: apiSort, limit: PAGE_SIZE, offset }).catch(() => [])
  } else {
    const [mlResult, aeResult] = await Promise.allSettled([
      searchML(q, { sort: apiSort, limit: PAGE_SIZE, offset }),
      searchAliExpress(q, { sort: apiSort, limit: PAGE_SIZE, page }),
    ])
    const ml = mlResult.status === 'fulfilled' ? mlResult.value : []
    const ae = aeResult.status === 'fulfilled' ? aeResult.value : []
    products = [...ml, ...ae]
  }

  // Price filtering
  if (min !== null || max !== null) {
    products = products.filter((p) => {
      if (min !== null && p.price < min) return false
      if (max !== null && p.price > max) return false
      return true
    })
  }

  // Always sort locally so merged results and price-filtered results are ordered correctly
  if (orden === 'price_asc') products.sort((a, b) => a.price - b.price)
  if (orden === 'price_desc') products.sort((a, b) => b.price - a.price)

  if (products.length === 0) {
    return (
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

  const hasMore = products.length >= PAGE_SIZE

  // Build base params for pagination links (preserve all filters)
  function pageUrl(p: number) {
    const params = new URLSearchParams({ q, fuente, orden })
    if (precioMin) params.set('precioMin', precioMin)
    if (precioMax) params.set('precioMax', precioMax)
    if (p > 1) params.set('pagina', String(p))
    return `/buscar?${params.toString()}`
  }

  return (
    <>
      <ProductGrid products={products} columns={4} />
      {(page > 1 || hasMore) && (
        <div className="flex items-center justify-center gap-3 mt-10">
          {page > 1 && (
            <Link
              href={pageUrl(page - 1)}
              className="px-5 py-2.5 rounded-xl border border-border-subtle text-sm text-content-secondary hover:text-content-primary hover:border-accent transition-colors"
            >
              ← Anterior
            </Link>
          )}
          {hasMore && (
            <Link
              href={pageUrl(page + 1)}
              className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Ver más →
            </Link>
          )}
        </div>
      )}
    </>
  )
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
  const { q = '', fuente = 'all', orden = 'relevance', precioMin = '', precioMax = '', pagina = '1' } =
    await searchParams

  const page = Math.max(1, parseInt(pagina, 10))

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
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-content-primary truncate">
          Resultados para{' '}
          <span className="text-accent">&ldquo;{q}&rdquo;</span>
        </h1>
        <div className="md:hidden shrink-0">
          <Suspense>
            <FilterDrawer />
          </Suspense>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="hidden md:block">
          <Suspense>
            <SearchFilters />
          </Suspense>
        </div>

        <div className="flex-1 min-w-0">
          {/* Sort pills — visible on mobile where sidebar is hidden */}
          <div className="flex items-center gap-2 mb-4 md:hidden flex-wrap">
            {[
              { value: 'relevance', label: 'Relevancia' },
              { value: 'price_asc', label: 'Precio ↑' },
              { value: 'price_desc', label: 'Precio ↓' },
            ].map(({ value, label }) => {
              const next = new URLSearchParams({ q, fuente, orden: value })
              if (precioMin) next.set('precioMin', precioMin)
              if (precioMax) next.set('precioMax', precioMax)
              const active = orden === value
              return (
                <Link
                  key={value}
                  href={`/buscar?${next.toString()}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-accent text-white border-accent'
                      : 'bg-surface border-border-subtle text-content-secondary hover:border-accent hover:text-content-primary'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <Suspense fallback={RESULTS_SKELETON}>
            <SearchResults
              q={q}
              fuente={fuente}
              orden={orden}
              precioMin={precioMin}
              precioMax={precioMax}
              page={page}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
