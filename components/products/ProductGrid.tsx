import type { Product } from '@/types/product'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
}

const COL_CLASSES = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  return (
    <div className={`grid ${COL_CLASSES[columns]} gap-4`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
