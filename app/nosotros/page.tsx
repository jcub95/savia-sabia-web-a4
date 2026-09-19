import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site-config'
import { NosotrosContent } from '@/components/pages/nosotros-content'

export const metadata: Metadata = pageMetadata({
  title: 'Nosotros',
  description:
    'Dos personas, una obsesión con las plantas. Hierbas de origen local y orgánico, papeles sin blanquear y todo el proceso hecho a mano.',
  path: '/nosotros',
})

export default function NosotrosPage() {
  return <NosotrosContent />
}
