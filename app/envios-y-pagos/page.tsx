import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site-config'
import { EnviosContent } from '@/components/pages/envios-content'

export const metadata: Metadata = pageMetadata({
  title: 'Envíos y Pagos',
  description:
    'A todo Guatemala por Cargo Expreso: Q40, gratis desde Q200. Contra entrega sin recargo o transferencia, y recogida en San Lucas Sacatepéquez.',
  path: '/envios-y-pagos',
})

export default function EnviosYPagosPage() {
  return <EnviosContent />
}
