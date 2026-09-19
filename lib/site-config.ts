/**
 * Identidad del sitio en producción.
 *
 * Constantes fijas a propósito, no variables de entorno: los canonical y las
 * imágenes de Open Graph deben apuntar siempre a saviasabia.com, incluso
 * cuando el build corre en un preview de Vercel con otro dominio.
 */
export const SITE_URL = 'https://saviasabia.com'
export const SITE_NAME = 'Savia Sabia'

/**
 * Metadatos de una página de soporte.
 *
 * Next.js no fusiona `openGraph` entre segmentos: si una página lo declara,
 * reemplaza por completo el del layout raíz. Sin esto, cada subpágina heredaba
 * el `og:url` de la home y compartir /nosotros por WhatsApp atribuía el enlace
 * a la portada. El helper mantiene una sola copia de siteName, locale e imagen.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  /** Ruta absoluta del sitio, con barra inicial. Por ejemplo: '/nosotros'. */
  path: string
}) {
  const url = `${SITE_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: ['/og-image.png'],
      locale: 'es_GT',
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ['/og-image.png'],
    },
  }
}
