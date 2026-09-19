import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // El panel y los endpoints nunca deben indexarse.
      disallow: ['/admin', '/admin/', '/api', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
