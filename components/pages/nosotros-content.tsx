'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { nosotrosContent } from '@/lib/support-content'

export function NosotrosContent() {
  const { language } = useLanguage()

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <h1 className="font-serif font-bold text-foreground text-4xl md:text-5xl text-balance mb-8 leading-tight">
          {nosotrosContent.header[language]}
        </h1>

        <p className="text-muted-foreground leading-relaxed mb-8">
          {nosotrosContent.intro[language]}
        </p>

        <p className="text-foreground font-serif italic text-lg mb-4">
          {language === 'es' ? 'Somos dos.' : 'There are two of us.'}
        </p>

        <div className="space-y-6 mb-10">
          {nosotrosContent.team.map((person) => (
            <div key={person.name} className="border-l-2 border-accent/40 pl-5">
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">{person.name}</span>{' '}
                {person.role[language]}
              </p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground leading-relaxed mb-14">
          {nosotrosContent.sourcing[language]}
        </p>

        <h2 className="font-serif font-semibold text-foreground text-2xl md:text-3xl mb-8">
          {nosotrosContent.valuesTitle[language]}
        </h2>

        <div className="space-y-7 mb-14">
          {nosotrosContent.values.map((value) => (
            <div key={value.title[language]}>
              <h3 className="text-foreground font-semibold mb-1.5">{value.title[language]}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {value.body[language]}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-muted-foreground leading-relaxed mb-4">
            {nosotrosContent.closing[language]}
          </p>
          <p className="font-serif italic text-accent text-lg">
            {language === 'es' ? 'Menos químicos. Más plantas.' : 'Less chemistry. More botany.'}
          </p>
        </div>
      </motion.div>
    </main>
  )
}
