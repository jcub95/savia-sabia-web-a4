import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: 'Mezclas herbales artesanales sin tabaco ni nicotina, hechas en Guatemala.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#1C4A2A',
    background_color: '#FAF7EE',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  }
}
