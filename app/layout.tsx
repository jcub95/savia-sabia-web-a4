import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Serif, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_NAME, SITE_URL } from '@/lib/site-config'
import { LanguageProvider } from '@/lib/language-context'
import { CartProvider } from '@/lib/cart-context'
import { StockProvider } from '@/lib/stock-context'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AgeGate } from '@/components/age-gate'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import './globals.css'

const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

/**
 * Descripción base tomada de `nosotrosContent.intro` en lib/support-content.ts,
 * recortada al largo que los buscadores muestran sin truncar (~155 caracteres).
 */
const SITE_DESCRIPTION =
  'El ritual de fumar no tenía por qué implicar tabaco, nicotina ni una lista de químicos que nadie lee. Mezclas herbales artesanales hechas en Guatemala.'

/**
 * El sitio es bilingüe, pero el idioma se cambia del lado del cliente y no hay
 * URLs por idioma (/en/nosotros no existe). Por eso los metadatos van en
 * español y no llevan etiquetas hreflang: serían inexactas.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Savia Sabia — Menos químicos. Más plantas.',
    template: '%s | Savia Sabia',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'mezclas herbales',
    'cigarrillos herbales',
    'sin tabaco',
    'sin nicotina',
    'alternativa natural para fumar',
    'Guatemala',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Savia Sabia — Menos químicos. Más plantas.',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: ['/og-image.png'],
    locale: 'es_GT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savia Sabia — Menos químicos. Más plantas.',
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

/**
 * Sin schema de Product todavía: las mezclas viven en `?view=blends` y no
 * tienen URL propia que marcar. Eso espera a la migración a rutas reales.
 */
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/SaviaSabia_logo_color_transparente.svg`,
  sameAs: ['https://www.instagram.com/savia.sabia.herbs/'],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7EE' },
    { media: '(prefers-color-scheme: dark)',  color: '#1C4A2A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${plexSerif.variable} ${inter.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <CartProvider>
              <StockProvider>
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
                <AgeGate />
                <WhatsAppFloat />
              </StockProvider>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

