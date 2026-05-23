import type { ProductSource } from '@/types/product'

type BadgeVariant = ProductSource | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  mercadolibre: 'bg-[#fff8e8] text-[#b07800] border border-[#fde68a]',
  aliexpress: 'bg-[#fff0f0] text-[#c43030] border border-[#fecaca]',
  default: 'bg-surface-input text-content-secondary border border-border-subtle',
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${VARIANT_STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
