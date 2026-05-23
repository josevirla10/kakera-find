export interface Category {
  slug: string
  name: string
  query: string
  icon: string
  description: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'figuras-anime',
    name: 'Figuras Anime',
    query: 'figura anime coleccionable nendoroid',
    icon: '🎎',
    description: 'Nendoroids, figmas y coleccionables',
  },
  {
    slug: 'merch-oficial',
    name: 'Merch Oficial',
    query: 'merch anime oficial',
    icon: '⭐',
    description: 'Productos oficiales de tus series favoritas',
  },
  {
    slug: 'perifericos-kawaii',
    name: 'Periféricos Kawaii',
    query: 'teclado mouse kawaii aesthetic anime',
    icon: '⌨️',
    description: 'Teclados, mouses y más para tu setup',
  },
  {
    slug: 'ropa-accesorios',
    name: 'Ropa y Accesorios',
    query: 'remera anime ropa otaku',
    icon: '👕',
    description: 'Remeras, busos y accesorios',
  },
  {
    slug: 'hogar-deco',
    name: 'Hogar y Deco',
    query: 'decoracion anime poster lampara',
    icon: '🏮',
    description: 'Posters, lámparas y decoración',
  },
  {
    slug: 'papeleria-kawaii',
    name: 'Papelería Kawaii',
    query: 'papeleria kawaii stickers cuaderno anime',
    icon: '📓',
    description: 'Stickers, cuadernos y más',
  },
  {
    slug: 'iluminacion-setup',
    name: 'Iluminación Setup',
    query: 'tira led rgb setup anime aesthetic',
    icon: '💡',
    description: 'LEDs y luces para tu setup',
  },
  {
    slug: 'cosplay',
    name: 'Cosplay',
    query: 'cosplay anime accesorios peluca',
    icon: '🎪',
    description: 'Todo para tu próximo cosplay',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
