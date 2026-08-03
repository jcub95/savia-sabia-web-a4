'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useLanguage } from '@/lib/language-context'
import { faqCategories } from '@/lib/support-content'

export function FaqContent() {
  const { language } = useLanguage()

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <h1 className="font-serif font-bold text-foreground text-4xl md:text-5xl mb-3 text-balance">
          {language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-muted-foreground mb-12">
          {language === 'es'
            ? 'Todo lo que necesitas saber antes de tu primera mezcla.'
            : 'Everything you need to know before your first blend.'}
        </p>

        <div className="space-y-10">
          {faqCategories.map((category) => (
            <section key={category.title[language]}>
              <h2 className="font-serif font-semibold text-foreground text-xl mb-2">
                {category.title[language]}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, i) => (
                  <AccordionItem key={i} value={`${category.title[language]}-${i}`} className="border-border">
                    <AccordionTrigger className="text-left text-foreground hover:no-underline">
                      {item.q[language]}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.a[language]}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
