import type { MetadataRoute } from 'next'
import { CATEGORIES } from '@/lib/categories'

const BASE = 'https://find.kakeralabs.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1, changeFrequency: 'daily' },
    { url: `${BASE}/buscar`, priority: 0.8, changeFrequency: 'daily' },
    { url: `${BASE}/nosotros`, priority: 0.4, changeFrequency: 'monthly' },
    { url: `${BASE}/privacidad`, priority: 0.3, changeFrequency: 'monthly' },
    { url: `${BASE}/terminos`, priority: 0.3, changeFrequency: 'monthly' },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE}/categoria/${cat.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly',
  }))

  return [...staticRoutes, ...categoryRoutes]
}
