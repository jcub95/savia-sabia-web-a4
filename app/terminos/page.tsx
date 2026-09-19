import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site-config'
import { LegalPlaceholderContent } from '@/components/pages/legal-placeholder-content'

export const metadata: Metadata = pageMetadata({
  title: 'Términos',
  description:
    'Condiciones de uso del sitio y de venta de productos herbales para mayores de 18 años.',
  path: '/terminos',
})

export default function TerminosPage() {
  return <LegalPlaceholderContent titleEs="Términos" titleEn="Terms" />
}
