'use client'

import { motion } from 'framer-motion'
import { Truck, CreditCard, PackageCheck } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { enviosContent } from '@/lib/support-content'

export function EnviosContent() {
  const { language } = useLanguage()
  const c = enviosContent

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <h1 className="font-serif font-bold text-cream text-4xl md:text-5xl mb-12 text-balance">
          {c.header[language]}
        </h1>

        {/* Envíos */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-4">
            <Truck className="size-5 text-accent" />
            <h2 className="font-serif font-semibold text-cream text-2xl">{c.shippingTitle[language]}</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">{c.shippingIntro[language]}</p>

          <div className="rounded-lg border border-border overflow-hidden mb-4">
            <table className="w-full text-sm">
              <tbody>
                {c.shippingTable.map((row, i) => (
                  <tr key={i} className={i > 0 ? 'border-t border-border' : ''}>
                    <td className="py-3 px-4 text-cream font-medium">{row.destination[language]}</td>
                    <td className="py-3 px-4 text-muted-foreground text-right">{row.time[language]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-2">{c.shippingNote[language]}</p>
          <p className="text-sm text-accent font-medium mb-2">{c.freeShipping[language]}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{c.pickupFree[language]}</p>
        </section>

        {/* Pagos */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-4">
            <CreditCard className="size-5 text-accent" />
            <h2 className="font-serif font-semibold text-cream text-2xl">{c.paymentsTitle[language]}</h2>
          </div>
          <div className="space-y-5">
            {c.payments.map((p) => (
              <div key={p.title[language]}>
                <h3 className="text-cream font-semibold mb-1">{p.title[language]}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body[language]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cómo pedir */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-4">
            <PackageCheck className="size-5 text-accent" />
            <h2 className="font-serif font-semibold text-cream text-2xl">{c.orderStepsTitle[language]}</h2>
          </div>
          <ol className="space-y-3">
            {c.orderSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="shrink-0 size-5 rounded-full bg-secondary text-cream text-xs flex items-center justify-center font-medium">
                  {i + 1}
                </span>
                {step[language]}
              </li>
            ))}
          </ol>
        </section>

        {/* Cambios y devoluciones */}
        <section className="border-t border-border pt-8">
          <h2 className="font-serif font-semibold text-cream text-2xl mb-3">{c.returnsTitle[language]}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{c.returns[language]}</p>
        </section>
      </motion.div>
    </main>
  )
}
