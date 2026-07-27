import type { Metadata } from 'next'
import { NosotrosContent } from '@/components/pages/nosotros-content'

export const metadata: Metadata = {
  title: 'Nosotros | Savia Sabia',
  description:
    'Conoce a Juan Carlos y Álvaro, el equipo detrás de Savia Sabia, y los valores que guían cada mezcla herbal.',
}

export default function NosotrosPage() {
  return <NosotrosContent />
}
