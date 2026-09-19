import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site-config'
import { LegalPlaceholderContent } from '@/components/pages/legal-placeholder-content'

export const metadata: Metadata = pageMetadata({
  title: 'Privacidad',
  description:
    'Cómo tratamos los datos personales de quienes nos compran o nos escriben.',
  path: '/privacidad',
})

export default function PrivacidadPage() {
  return <LegalPlaceholderContent titleEs="Privacidad" titleEn="Privacy" />
}
