'use client'

import Link from 'next/link'
import { Instagram, Mail, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { legalContent } from '@/lib/support-content'

export function SiteFooter() {
  const { language, t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Columna 1 — Marca */}
        <div className="col-span-2 md:col-span-1 space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/SaviaSabia_logo_monotonico_invertido_transparente.svg"
              alt="Savia Sabia"
              width={24}
              height={40}
              className="h-8 w-auto"
            />
            <span className="font-serif font-bold text-primary-foreground">Savia Sabia</span>
          </Link>
          <p className="font-serif italic text-sm text-primary-foreground/80">{t('welcome.tagline')}</p>
          <p className="text-xs text-primary-foreground/60">Guatemala</p>
        </div>

        {/* Columna 2 — Tienda */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground">
            {t('footer.tienda.title')}
          </h3>
          <nav className="flex flex-col gap-2 text-sm text-primary-foreground/80">
            <Link href="/?view=blends" className="hover:text-primary-foreground transition-colors">
              {t('footer.tienda.mezclas')}
            </Link>
            <Link href="/?view=survey" className="hover:text-primary-foreground transition-colors">
              {t('footer.tienda.encuentra')}
            </Link>
            <Link href="/?view=herbarium" className="hover:text-primary-foreground transition-colors">
              {t('footer.tienda.herbario')}
            </Link>
          </nav>
        </div>

        {/* Columna 3 — Información */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground">
            {t('footer.info.title')}
          </h3>
          <nav className="flex flex-col gap-2 text-sm text-primary-foreground/80">
            <Link href="/nosotros" className="hover:text-primary-foreground transition-colors">
              {t('footer.info.nosotros')}
            </Link>
            <Link href="/envios-y-pagos" className="hover:text-primary-foreground transition-colors">
              {t('footer.info.envios')}
            </Link>
            <Link href="/preguntas-frecuentes" className="hover:text-primary-foreground transition-colors">
              {t('footer.info.faq')}
            </Link>
            <Link href="/contacto" className="hover:text-primary-foreground transition-colors">
              {t('footer.info.contacto')}
            </Link>
          </nav>
        </div>

        {/* Columna 4 — Contacto */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground">
            {t('footer.contacto.title')}
          </h3>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/80">
            <a
              href="https://wa.me/50238149773"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="size-3.5 shrink-0" />
              3814-9773
            </a>
            <a
              href="mailto:savia.sabia.herbs@gmail.com"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors break-all"
            >
              <Mail className="size-3.5 shrink-0" />
              savia.sabia.herbs@gmail.com
            </a>
            <a
              href="https://instagram.com/savia.sabia.herbs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Instagram className="size-3.5 shrink-0" />
              @savia.sabia.herbs
            </a>
            <p className="text-xs pt-1 text-primary-foreground/60">{t('footer.contacto.hours')}</p>
          </div>
        </div>
      </div>

      {/* Franja inferior — aviso legal permanente */}
      <div className="border-t border-primary-foreground/20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 space-y-4">
          <p className="text-[11px] leading-relaxed text-primary-foreground/60 max-w-3xl">
            {legalContent.permanentNotice[language]}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-primary-foreground/60">
            <span>© {year} Savia Sabia. {t('footer.rights')}</span>
            <Link href="/terminos" className="hover:text-primary-foreground transition-colors">
              {t('footer.terms')}
            </Link>
            <Link href="/privacidad" className="hover:text-primary-foreground transition-colors">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
