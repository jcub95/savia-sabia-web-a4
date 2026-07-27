import type { Metadata } from 'next'
import { ContactoContent } from '@/components/pages/contacto-content'

export const metadata: Metadata = {
  title: 'Contacto | Savia Sabia',
  description: 'Escríbenos por WhatsApp, Instagram o correo. Respondemos rápido, todos los días.',
}

export default function ContactoPage() {
  return <ContactoContent />
}
