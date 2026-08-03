import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Serif, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { CartProvider } from '@/lib/cart-context'
import { StockProvider } from '@/lib/stock-context'
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

export const metadata: Metadata = {
  title: 'Savia Sabia | Herbal Smoking Blends',
  description: 'Discover your perfect herbal blend with Savia Sabia. Take our personalized survey to find the ideal natural smoking alternative tailored to your lifestyle and wellness goals.',
  generator: 'v0.app',
  keywords: ['herbal cigarettes', 'natural smoking', 'herbal blends', 'wellness', 'smoke alternative'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#FAF7EE',
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
    <html lang="en" className={`${plexSerif.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

