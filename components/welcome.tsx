'use client'

import { motion } from 'framer-motion'
import { Leaf, MapPin, Shield, ArrowRight, Sparkles, Hand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-context'
import { blends } from '@/lib/herbs-data'
import { cn } from '@/lib/utils'

interface WelcomeProps {
  onStartSurvey: () => void
  onViewHerbarium: () => void
  onShopBlends: () => void
}

export function Welcome({ onStartSurvey, onViewHerbarium: _onViewHerbarium, onShopBlends }: WelcomeProps) {
  const { language } = useLanguage()

  const copy = {
    es: {
      heroTitle: 'Menos químicos.',
      heroTitleAccent: 'Más plantas.',
      heroSubtitle: 'Mezclas herbales para fumar. Sin tabaco, sin nicotina, sin THC. Formuladas y empacadas en Guatemala.',
      ctaPrimary: 'Encuentra tu mezcla',
      ctaSecondary: 'Ver las seis mezclas',
      pillarsTitle: 'Por qué Savia Sabia',
      pillar1Title: 'Sin químicos',
      pillar1Body: '15 hierbas seleccionadas. Cero aditivos, saborizantes ni conservantes.',
      pillar2Title: 'Cultivadas en Guatemala',
      pillar2Body: 'Cosecha familiar y proveedores locales orgánicos. Nada importado.',
      pillar3Title: 'Alternativa consciente',
      pillar3Body: 'No prometemos salud. Sí menos toxicidad que el tabaco industrial.',
      blendsTitle: 'Las seis mezclas',
      blendsSubtitle: 'Cada una formulada para un momento y un efecto distinto.',
      blendsViewAll: 'Ver todas',
      quizBannerTitle: '¿No sabes por cuál empezar?',
      quizBannerBody: 'Responde 6 preguntas y te decimos tu mezcla ideal.',
      quizBannerCta: 'Hacer el test',
      handmadeTitle: 'Hecho a mano, uno por uno',
      handmadeBody: 'Cada mezcla se prepara a mano: seleccionar la hierba, secarla, molerla al punto exacto, pesarla y combinarla en su proporción. Los cigarrillos se forjan uno a uno. No hay máquina, no hay línea de producción, no hay lote industrial. Hay un par de manos y una fórmula que se respeta.',
      handmadeNote: 'Por eso no hay dos cigarrillos idénticos: puede haber pequeñas variaciones de grosor y firmeza. La cantidad de mezcla por unidad se mantiene constante — lo que cambia es la forma, no el contenido.',
      closingTitle: 'Honestidad radical',
      closingBody: 'Fumar cualquier material vegetal implica combustión y no es una actividad inocua. No decimos que nuestro humo sea saludable. Decimos que no lleva tabaco, ni nicotina, ni los cientos de químicos del cigarro industrial. La comparación honesta es esa.',
      closingLink: 'Conócenos',
    },
    en: {
      heroTitle: 'Less chemistry.',
      heroTitleAccent: 'More botany.',
      heroSubtitle: 'Herbal smoking blends. No tobacco, no nicotine, no THC. Formulated and packed in Guatemala.',
      ctaPrimary: 'Find your blend',
      ctaSecondary: 'Browse all six blends',
      pillarsTitle: 'Why Savia Sabia',
      pillar1Title: 'No chemicals',
      pillar1Body: '15 hand-picked herbs. Zero additives, flavorings or preservatives.',
      pillar2Title: 'Grown in Guatemala',
      pillar2Body: 'Family harvest and local organic suppliers. Nothing imported.',
      pillar3Title: 'Conscious alternative',
      pillar3Body: "We don't promise health. We promise less toxicity than industrial tobacco.",
      blendsTitle: 'The six blends',
      blendsSubtitle: 'Each formulated for a distinct moment and effect.',
      blendsViewAll: 'View all',
      quizBannerTitle: 'Not sure where to start?',
      quizBannerBody: "Answer 6 questions and we'll tell you your ideal blend.",
      quizBannerCta: 'Take the quiz',
      handmadeTitle: 'Made by hand, one at a time',
      handmadeBody: 'Every blend is prepared by hand: selecting the herb, drying it, grinding it to the right consistency, weighing it and combining it in proportion. Cigarettes are rolled one by one. No machine, no production line, no industrial batch. Just a pair of hands and a formula that gets respected.',
      handmadeNote: 'That is why no two cigarettes are identical: there may be slight variations in thickness and firmness. The amount of blend per unit stays constant — what changes is the shape, not the contents.',
      closingTitle: 'Radical honesty',
      closingBody: "Smoking any plant material involves combustion and is not harmless. We won't say our smoke is healthy. We say it contains no tobacco, no nicotine, and none of the hundreds of chemicals in industrial cigarettes. That is the honest comparison.",
      closingLink: 'About us',
    },
  }

  const t = copy[language]

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -left-20 size-96 rounded-full bg-accent/[0.07] blur-3xl" />
          <div className="absolute bottom-0 right-0 size-96 rounded-full bg-ring/[0.10] blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/SaviaSabia_logo_color_transparente.svg"
              alt="Savia Sabia"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-32 md:w-40 h-auto mx-auto mb-8 dark:hidden"
            />
            <motion.img
              src="/SaviaSabia_logo_invertido_transparente.svg"
              alt="Savia Sabia"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-32 md:w-40 h-auto mx-auto mb-8 hidden dark:block"
            />

            <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight tracking-tight mb-6">
              {t.heroTitle}
              <br />
              <span className="text-accent italic font-normal">{t.heroTitleAccent}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md sm:max-w-xl mx-auto">
              <Button
                onClick={onStartSurvey}
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-medium"
              >
                <Sparkles className="size-5 mr-2" />
                {t.ctaPrimary}
              </Button>
              <Button
                onClick={onShopBlends}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base"
              >
                {t.ctaSecondary}
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PILARES
      ═══════════════════════════════════════ */}
      <section className="border-t border-border bg-secondary">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground mb-3">
            {t.pillarsTitle}
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mb-12" />

          <div className="grid md:grid-cols-3 gap-8">
            {([
              { icon: Leaf,   title: t.pillar1Title, body: t.pillar1Body },
              { icon: MapPin, title: t.pillar2Title, body: t.pillar2Body },
              { icon: Shield, title: t.pillar3Title, body: t.pillar3Body },
            ] as const).map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <pillar.icon className="size-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SEIS MEZCLAS
      ═══════════════════════════════════════ */}
      <section className="border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
              {t.blendsTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t.blendsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blends.map((blend, i) => (
              <motion.button
                key={blend.id}
                onClick={onShopBlends}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-left group"
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className={cn('h-2 bg-gradient-to-r', blend.color)} />
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                      {blend.displayName[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                      {blend.description[language]}
                    </p>
                    <span className="text-sm text-accent group-hover:underline">
                      {language === 'es' ? 'Ver detalles →' : 'View details →'}
                    </span>
                  </CardContent>
                </Card>
              </motion.button>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button onClick={onShopBlends} variant="outline" size="lg">
              {t.blendsViewAll}
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HECHO A MANO
      ═══════════════════════════════════════ */}
      <section className="border-t border-border bg-secondary">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Hand className="size-7 text-primary" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              {t.handmadeTitle}
            </h2>

            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              {t.handmadeBody}
            </p>

            <p className="text-sm text-muted-foreground/75 leading-relaxed max-w-xl mx-auto border-t border-border pt-6">
              {t.handmadeNote}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BANNER DEL QUIZ
      ═══════════════════════════════════════ */}
      <section className="bg-anchor text-anchor-foreground">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-20 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-3">
            {t.quizBannerTitle}
          </h2>
          <p className="text-anchor-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            {t.quizBannerBody}
          </p>
          <Button
            onClick={onStartSurvey}
            size="lg"
            className="h-14 px-8 text-base font-medium bg-anchor-foreground text-anchor hover:bg-anchor-foreground/90"
          >
            <Sparkles className="size-5 mr-2" />
            {t.quizBannerCta}
          </Button>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CIERRE HONESTO
      ═══════════════════════════════════════ */}
      <section className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-20 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            {t.closingTitle}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            {t.closingBody}
          </p>
          <a
            href="/nosotros"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            {t.closingLink}
            <ArrowRight className="size-3" />
          </a>
        </div>
      </section>

    </div>
  )
}
