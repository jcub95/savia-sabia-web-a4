import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site-config'
import { ContactoContent } from '@/components/pages/contacto-content'

export const metadata: Metadata = pageMetadata({
  title: 'Contacto',
  description:
    'Escríbenos por WhatsApp, Instagram o correo. Respondemos rápido — normalmente en menos de dos horas dentro de nuestro horario.',
  path: '/contacto',
})

export default function ContactoPage() {
  return <ContactoContent />
}
