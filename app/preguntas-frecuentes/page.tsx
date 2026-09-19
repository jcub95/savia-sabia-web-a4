import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site-config'
import { FaqContent } from '@/components/pages/faq-content'

export const metadata: Metadata = pageMetadata({
  title: 'Preguntas Frecuentes',
  description:
    'Si contienen tabaco, nicotina o THC, cómo se fuman, cuánto rinde cada formato y cómo hacer un pedido. Las dudas que más nos llegan, respondidas.',
  path: '/preguntas-frecuentes',
})

export default function PreguntasFrecuentesPage() {
  return <FaqContent />
}
