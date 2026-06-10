export interface Category {
  slug: string
  name: string
  queryAE: string
  queryML: string
  icon: string
  description: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'figuras-anime',
    name: 'Figuras Anime',
    queryAE: 'anime figure nendoroid collectible PVC',
    queryML: 'figura anime coleccionable nendoroid',
    icon: '🎎',
    description: 'Nendoroids, figmas y coleccionables',
  },
  {
    slug: 'merch-oficial',
    name: 'Merch Oficial',
    queryAE: 'anime official merchandise',
    queryML: 'merch anime oficial',
    icon: '⭐',
    description: 'Productos oficiales de tus series favoritas',
  },
  {
    slug: 'perifericos-kawaii',
    name: 'Periféricos Kawaii',
    queryAE: 'kawaii keyboard mouse anime gaming',
    queryML: 'teclado mouse kawaii aesthetic anime',
    icon: '⌨️',
    description: 'Teclados, mouses y más para tu setup',
  },
  {
    slug: 'ropa-accesorios',
    name: 'Ropa y Accesorios',
    queryAE: 'anime t-shirt hoodie otaku clothing',
    queryML: 'remera anime ropa otaku',
    icon: '👕',
    description: 'Remeras, busos y accesorios',
  },
  {
    slug: 'hogar-deco',
    name: 'Hogar y Deco',
    queryAE: 'anime poster wall lamp decoration',
    queryML: 'decoracion anime poster lampara',
    icon: '🏮',
    description: 'Posters, lámparas y decoración',
  },
  {
    slug: 'papeleria-kawaii',
    name: 'Papelería Kawaii',
    queryAE: 'kawaii stickers notebook stationery anime',
    queryML: 'papeleria kawaii stickers cuaderno anime',
    icon: '📓',
    description: 'Stickers, cuadernos y más',
  },
  {
    slug: 'iluminacion-setup',
    name: 'Iluminación Setup',
    queryAE: 'RGB LED strip gaming room setup',
    queryML: 'tira led rgb setup anime aesthetic',
    icon: '💡',
    description: 'LEDs y luces para tu setup',
  },
  {
    slug: 'cosplay',
    name: 'Cosplay',
    queryAE: 'cosplay anime wig accessories costume',
    queryML: 'cosplay anime accesorios peluca',
    icon: '🎪',
    description: 'Todo para tu próximo cosplay',
  },
  {
    slug: 'pc-hardware',
    name: 'PC Hardware',
    queryAE: 'processor GPU graphics card RAM SSD gaming PC',
    queryML: 'procesador placa de video ram ssd gabinete pc',
    icon: '🖥️',
    description: 'Componentes y hardware para armar o mejorar tu PC',
  },
  {
    slug: 'streaming',
    name: 'Streaming',
    queryAE: 'microphone webcam capture card ring light USB streamer',
    queryML: 'microfono webcam capturadora stream ring light',
    icon: '🎙️',
    description: 'Equipamiento para streamers y creadores de contenido',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
