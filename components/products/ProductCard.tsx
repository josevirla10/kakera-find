'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/types/product'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { ProductModal } from './ProductModal'

const SOURCE_LABEL: Record<Product['source'], string> = {
  mercadolibre: 'MercadoLibre',
  aliexpress: 'AliExpress',
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex flex-col bg-surface-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-border-subtle hover:border-border-hover transition-all duration-200 text-left w-full"
      >
        {/* Image */}
        <div className="relative aspect-square bg-surface-secondary overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
          <div className="absolute top-2 right-2">
            <Badge variant={product.source}>{SOURCE_LABEL[product.source]}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 gap-2">
          <p className="text-sm text-content-primary font-medium line-clamp-2 leading-snug flex-1">
            {product.title}
          </p>
          <p className="text-base font-bold text-accent">
            {formatPrice(product.price, product.currency)}
          </p>
          <div className="mt-1 w-full py-2 px-3 bg-accent group-hover:bg-accent-hover text-white text-sm font-medium rounded-[9px] text-center transition-colors duration-150">
            Ver producto →
          </div>
        </div>
      </button>

      {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  )
}
