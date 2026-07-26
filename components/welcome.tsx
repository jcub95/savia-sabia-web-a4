'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'

interface WelcomeProps {
  onStartSurvey: () => void
  onViewHerbarium: () => void
  onShopBlends: () => void
}

export function Welcome({ onStartSurvey, onViewHerbarium, onShopBlends }: WelcomeProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle botanical wash — no floating emojis, just soft depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sage/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-sage/[0.07] blur-3xl" />
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        {/* Brand mark — refined botanical line motif */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <img
              src="/SaviaSabia_logo_monotonico_invertido_transparente.svg"
              alt="Savia Sabia"
              width={120}
              height={197}
              className="w-28 h-auto md:w-32"
            />
          </motion.div>

          {/* Dominant brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif font-bold text-cream text-6xl md:text-8xl tracking-tight leading-[0.95] text-balance"
          >
            Savia Sabia
          </motion.h1>

          {/* Italic sage tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-5 font-serif italic text-2xl md:text-3xl text-accent text-balance"
          >
            {t('welcome.tagline')}
          </motion.p>
        </motion.div>

        {/* Secondary headline + description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-center max-w-md mb-10"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-cream mb-4 text-balance">
            {t('welcome.subtitle')}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-balance text-sm md:text-base">
            {t('welcome.description')}
          </p>
        </motion.div>

        {/* Minimal feature row — no emojis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex items-center justify-center gap-4 mb-12 text-xs uppercase tracking-[0.15em] text-sage"
        >
          <span>{t('welcome.herbs')}</span>
          <span className="size-1 rounded-full bg-sage/50" aria-hidden="true" />
          <span>{t('welcome.natural')}</span>
          <span className="size-1 rounded-full bg-sage/50" aria-hidden="true" />
          <span>{t('welcome.personalized')}</span>
        </motion.div>

        {/* CTAs — solid primary, two outline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-sm space-y-3"
        >
          <Button
            onClick={onStartSurvey}
            size="lg"
            className="w-full h-14 text-base font-medium group"
          >
            {t('welcome.start_survey')}
            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onShopBlends}
              variant="outline"
              size="lg"
              className="h-12 border-cream/25 text-cream bg-transparent hover:bg-cream/10 hover:text-cream"
            >
              <Package className="size-4 mr-2" />
              {t('welcome.shop_blends')}
            </Button>

            <Button
              onClick={onViewHerbarium}
              variant="outline"
              size="lg"
              className="h-12 border-cream/25 text-cream bg-transparent hover:bg-cream/10 hover:text-cream"
            >
              <BookOpen className="size-4 mr-2" />
              {t('welcome.explore_herbarium')}
            </Button>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-muted-foreground mt-12 text-center max-w-xs leading-relaxed"
        >
          100% libre de tabaco · Mezclas herbales cuidadosamente seleccionadas para una experiencia consciente
        </motion.p>
      </main>
    </div>
  )
}
