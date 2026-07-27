'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { legalContent } from '@/lib/support-content'

interface LegalPlaceholderContentProps {
  titleEs: string
  titleEn: string
}

export function LegalPlaceholderContent({ titleEs, titleEn }: LegalPlaceholderContentProps) {
  const { language } = useLanguage()

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <h1 className="font-serif font-bold text-cream text-4xl mb-6">
          {language === 'es' ? titleEs : titleEn}
        </h1>
        <div className="rounded-lg border border-accent/30 bg-secondary/40 px-5 py-4 mb-8">
          <p className="text-sm text-cream/90 leading-relaxed">
            {legalContent.placeholderNotice[language]}
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {legalContent.permanentNotice[language]}
        </p>
      </motion.div>
    </main>
  )
}
