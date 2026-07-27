import type { Metadata } from 'next'
import { LegalPlaceholderContent } from '@/components/pages/legal-placeholder-content'

export const metadata: Metadata = {
  title: 'Privacidad | Savia Sabia',
  description: 'Política de privacidad de Savia Sabia.',
}

export default function PrivacidadPage() {
  return <LegalPlaceholderContent titleEs="Privacidad" titleEn="Privacy" />
}
