import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'

/**
 * Solo rutas reales de Next.js.
 *
 * El catálogo de mezclas todavía vive en `?view=blends`, que es un parámetro
 * de la home y no una URL propia. No se incluye aquí hasta que exista la
 * migración a rutas reales — listarlo ahora enviaría a los buscadores a
 * duplicados de la home.
 *
 * /admin y /api quedan fuera a propósito: no son indexables.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const supportPages = [
    '/nosotros',
    '/contacto',
    '/envios-y-pagos',
    '/preguntas-frecuentes',
    '/privacidad',
    '/terminos',
  ]

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...supportPages.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
