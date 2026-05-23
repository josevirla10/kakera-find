export type ProductSource = 'mercadolibre' | 'aliexpress'
export type Currency = 'ARS' | 'USD'

export interface Product {
  id: string
  title: string
  price: number
  currency: Currency
  thumbnail: string
  permalink: string
  source: ProductSource
  availableQuantity?: number
}
