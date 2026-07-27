'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Instagram, Mail, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { contactoContent } from '@/lib/support-content'

// Los 3 canales de contacto se listan siempre en este orden fijo
// (WhatsApp, Instagram, Correo) — el ícono se asigna por posición.
const CHANNEL_ICONS = [MessageCircle, Instagram, Mail] as const

export function ContactoContent() {
  const { language } = useLanguage()
  const c = contactoContent

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <h1 className="font-serif font-bold text-cream text-4xl md:text-5xl mb-3 text-balance">
          {c.header[language]}
        </h1>
        <p className="text-muted-foreground mb-12">{c.subheader[language]}</p>

        <div className="grid gap-4 mb-14">
          {c.channels.map((channel, index) => {
            const label = typeof channel.label === 'string' ? channel.label : channel.label[language]
            const Icon = CHANNEL_ICONS[index] ?? Mail
            return (
              <Card key={label} className="border-border bg-card">
                <CardContent className="p-5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Icon className="size-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-cream">{label}</p>
                      <p className="text-sm text-cream/80">{channel.value}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-sm">
                        {channel.note[language]}
                      </p>
                    </div>
                  </div>
                  <Button asChild size="sm" variant="outline" className="shrink-0 bg-transparent border-cream/25 text-cream hover:bg-cream/10 hover:text-cream">
                    <a href={channel.href} target="_blank" rel="noopener noreferrer">
                      {channel.cta[language]}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="space-y-8">
          <div className="flex gap-3">
            <Clock className="size-5 text-accent mt-0.5 shrink-0" />
            <div>
              <h3 className="text-cream font-semibold mb-1">{c.hoursTitle[language]}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.hours[language]}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <MapPin className="size-5 text-accent mt-0.5 shrink-0" />
            <div>
              <h3 className="text-cream font-semibold mb-1">{c.pickupTitle[language]}</h3>
              <p className="text-sm text-cream/90 mb-1">{c.pickupPlace}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.pickup[language]}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <h3 className="text-cream font-semibold mb-2">{c.wholesaleTitle[language]}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{c.wholesale[language]}</p>
        </div>
      </motion.div>
    </main>
  )
}
