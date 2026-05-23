import { Suspense } from 'react'
import { Hero } from '@/components/home/Hero'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton'

function FeaturedSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-baseline justify-between mb-6">
        <div className="h-7 w-40 bg-surface-secondary rounded-full animate-pulse" />
        <div className="h-4 w-16 bg-surface-secondary rounded-full animate-pulse" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <div className="border-t border-border-subtle" />
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </>
  )
}
