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
    query: 'kawaii keyboard mouse anime gaming',
    icon: '⌨️',
    description: 'Teclados, mouses y más para tu setup',
  },
  {
    slug: 'ropa-accesorios',
    name: 'Ropa y Accesorios',
    query: 'anime t-shirt hoodie otaku clothing',
    icon: '👕',
    description: 'Remeras, busos y accesorios',
  },
  {
    slug: 'hogar-deco',
    name: 'Hogar y Deco',
    query: 'anime poster wall lamp decoration',
    icon: '🏮',
    description: 'Posters, lámparas y decoración',
  },
  {
    slug: 'papeleria-kawaii',
    name: 'Papelería Kawaii',
    query: 'kawaii stickers notebook stationery anime',
    icon: '📓',
    description: 'Stickers, cuadernos y más',
  },
  {
    slug: 'iluminacion-setup',
    name: 'Iluminación Setup',
    query: 'RGB LED strip gaming room setup',
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
  {
    slug: 'pc-hardware',
    name: 'PC Hardware',
    query: 'processor GPU graphics card RAM SSD motherboard gaming PC',
    icon: '🖥️',
    description: 'Componentes y hardware para armar o mejorar tu PC',
  },
  {
    slug: 'streaming',
    name: 'Streaming',
    query: 'microphone webcam capture card streaming ring light USB condenser',
    icon: '🎙️',
    description: 'Equipamiento para streamers y creadores de contenido',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
