import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton'

export default function BuscarLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-7 w-72 bg-surface-secondary rounded-full mb-6 animate-pulse" />
      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden md:flex flex-col gap-6 w-52 shrink-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="h-3 w-20 bg-surface-secondary rounded-full animate-pulse" />
              <div className="h-8 w-full bg-surface-secondary rounded-lg animate-pulse" />
              <div className="h-8 w-full bg-surface-secondary rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
        {/* Grid skeleton */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
