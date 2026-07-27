import type { Metadata } from 'next'
import { LegalPlaceholderContent } from '@/components/pages/legal-placeholder-content'

export const metadata: Metadata = {
  title: 'Términos | Savia Sabia',
  description: 'Términos y condiciones de uso de Savia Sabia.',
}

export default function TerminosPage() {
  return <LegalPlaceholderContent titleEs="Términos" titleEn="Terms" />
}
