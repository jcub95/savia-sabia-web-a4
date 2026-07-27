import type { Metadata } from 'next'
import { FaqContent } from '@/components/pages/faq-content'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Savia Sabia',
  description:
    'Todo sobre nuestras mezclas herbales: si contienen tabaco o THC, cómo se fuman, cuánto rinden y cómo pedir.',
}

export default function PreguntasFrecuentesPage() {
  return <FaqContent />
}
