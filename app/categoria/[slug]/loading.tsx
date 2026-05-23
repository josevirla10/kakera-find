import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton'

export default function CategoriaLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb skeleton */}
      <div className="h-3 w-32 bg-surface-secondary rounded-full mb-6 animate-pulse" />
      {/* Header skeleton */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border-subtle">
        <div className="w-12 h-12 bg-surface-secondary rounded-full animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="h-6 w-40 bg-surface-secondary rounded-full animate-pulse" />
          <div className="h-3 w-56 bg-surface-secondary rounded-full animate-pulse" />
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
