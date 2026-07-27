'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useLanguage } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

// Rutas reales (páginas de soporte) + puentes de query-param hacia la SPA en
// `/` (Mezclas, Herbario y Carrito viven hoy como vistas internas de app/page.tsx,
// no como rutas propias — ver el bridge en ese archivo). Cuando la app migre a
// rutas reales para el quiz/tienda, estos tres enlaces pasan a ser rutas directas.
const navLinks = [
  { href: '/?view=blends', key: 'nav.mezclas' as const, match: 'blends' },
  { href: '/?view=herbarium', key: 'nav.herbario' as const, match: 'herbarium' },
  { href: '/nosotros', key: 'nav.nosotros' as const, match: 'nosotros' },
  { href: '/contacto', key: 'nav.contacto' as const, match: 'contacto' },
]

export function SiteHeader() {
  const { language, toggleLanguage, t } = useLanguage()
  const { getTotalItems } = useCart()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const totalItems = getTotalItems()

  const isActive = (match: string) => pathname?.includes(match)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo + wordmark → siempre vuelve al inicio */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
          <img
            src="/SaviaSabia_logo_monotonico_invertido_transparente.svg"
            alt="Savia Sabia"
            width={28}
            height={46}
            className="h-9 w-auto"
          />
          <span className="font-serif font-bold text-lg text-cream tracking-tight hidden sm:inline">
            Savia Sabia
          </span>
        </Link>

        {/* Nav central — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                'px-3.5 py-2 text-sm font-medium rounded-full transition-colors',
                isActive(link.match)
                  ? 'bg-secondary text-cream'
                  : 'text-muted-foreground hover:text-cream hover:bg-secondary/60'
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Derecha: idioma + carrito + menú móvil */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className={cn(
              'flex items-center gap-1 px-3 py-1.5',
              'bg-secondary/80 border border-border rounded-full',
              'text-sm font-medium text-foreground',
              'hover:bg-secondary transition-colors'
            )}
          >
            <span className={cn('transition-opacity', language === 'en' ? 'opacity-100' : 'opacity-50')}>EN</span>
            <span className="text-muted-foreground">/</span>
            <span className={cn('transition-opacity', language === 'es' ? 'opacity-100' : 'opacity-50')}>ES</span>
          </button>

          <Button asChild variant="ghost" size="icon" className="relative text-cream hover:bg-secondary/60" aria-label={t('shop.view_cart')}>
            <Link href="/?view=cart">
              <ShoppingBag className="size-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Menú móvil */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-cream hover:bg-secondary/60" aria-label={t('nav.menu')}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border w-72">
              <SheetHeader>
                <SheetTitle className="font-serif text-cream text-left">Savia Sabia</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-6">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.key}>
                    <Link
                      href={link.href}
                      className={cn(
                        'px-3 py-3 text-base font-medium rounded-lg transition-colors',
                        isActive(link.match)
                          ? 'bg-secondary text-cream'
                          : 'text-muted-foreground hover:text-cream hover:bg-secondary/60'
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
