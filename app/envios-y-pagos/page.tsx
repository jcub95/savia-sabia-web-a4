import type { Metadata } from 'next'
import { EnviosContent } from '@/components/pages/envios-content'

export const metadata: Metadata = {
  title: 'Envíos y Pagos | Savia Sabia',
  description: 'Cómo llega tu pedido, cuánto cuesta el envío y qué formas de pago aceptamos.',
}

export default function EnviosYPagosPage() {
  return <EnviosContent />
}
