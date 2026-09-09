'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { herbs, type BlendId, type LocalizedString } from '@/lib/herbs-data'
import { cn } from '@/lib/utils'

interface BlendSpectrumProps {
  onShopBlends: () => void
}

type Family = 'mente' | 'respiracion'

interface SpectrumBlend {
  id: BlendId
  /** Nombre de mezcla: nunca se traduce. */
  name: string
  /** Color puro de marca. Solo para rellenos sólidos, nunca texto sobre crema. */
  hex: string
  /** Tono oscuro: texto sobre fondo claro. */
  ink: string
  /** Tono claro: texto sobre el verde oscuro del tema nocturno. */
  inkDark: string
  family: Family
  slogan: LocalizedString
  herbIds: string[]
  flavor: LocalizedString
  aroma: LocalizedString
  effect: LocalizedString
  moment: LocalizedString
}

// Orden del espectro: de la más activante a la más sedante. No alterar.
const spectrum: SpectrumBlend[] = [
  {
    id: 'enfoque',
    name: 'Enfoque',
    hex: '#3B6FD4',
    ink: '#2A4FA0',
    inkDark: '#9DB8F0',
    family: 'mente',
    slogan: { es: 'Concentración Natural', en: 'Natural Focus' },
    herbIds: ['rosemary', 'damiana', 'mullein', 'mint'],
    flavor: {
      es: 'Fresco y vigorizante, con el carácter del romero.',
      en: "Fresh and invigorating, with rosemary's character.",
    },
    aroma: {
      es: 'Herbal mentolado, limpio. No se impregna.',
      en: "Clean, minty herbal. Doesn't cling to you.",
    },
    effect: {
      es: 'Claridad mental sin acelerar el pulso.',
      en: 'Mental clarity without racing your pulse.',
    },
    moment: {
      es: 'La mañana, el trabajo, el café.',
      en: 'Morning, work, coffee.',
    },
  },
  {
    id: 'claridad-pulmonar',
    name: 'Claridad Pulmonar',
    hex: '#3BAEC6',
    ink: '#23808F',
    inkDark: '#8AD6E6',
    family: 'respiracion',
    slogan: { es: 'Purificación Intensiva', en: 'Deep Purification' },
    herbIds: ['mullein', 'eucalyptus', 'thyme', 'sage', 'mint'],
    flavor: {
      es: 'Intenso y mentolado, con golpe en garganta.',
      en: 'Intense and minty, with a real throat hit.',
    },
    aroma: {
      es: 'Eucalipto penetrante, aire de montaña.',
      en: 'Piercing eucalyptus, mountain air.',
    },
    effect: {
      es: 'Sensación de expansión y respiro profundo.',
      en: 'A feeling of expansion and deep breath.',
    },
    moment: {
      es: 'La transición desde el tabaco.',
      en: 'The transition away from tobacco.',
    },
  },
  {
    id: 'proteccion',
    name: 'Protección',
    hex: '#5FAE55',
    ink: '#3E7A38',
    inkDark: '#A5D89E',
    family: 'respiracion',
    slogan: { es: 'Defensa Respiratoria', en: 'Respiratory Defense' },
    herbIds: ['mullein', 'sage', 'rosemary', 'jasmine', 'eucalyptus'],
    flavor: {
      es: 'Robusto y denso, de bosque.',
      en: 'Robust and dense, forest-like.',
    },
    aroma: {
      es: 'Resinoso y herbal, con jazmín al fondo.',
      en: 'Resinous and herbal, jasmine underneath.',
    },
    effect: {
      es: 'Un escudo para el día en la calle.',
      en: 'A shield for the day outside.',
    },
    moment: {
      es: 'Exteriores, contaminación, cambios de clima.',
      en: 'Outdoors, pollution, weather shifts.',
    },
  },
  {
    id: 'nutre-el-alma',
    name: 'Nutre el Alma',
    hex: '#DE7E38',
    ink: '#A85417',
    inkDark: '#F0B382',
    family: 'mente',
    slogan: { es: 'Elevación Emocional', en: 'Emotional Lift' },
    herbIds: ['damiana', 'calendula', 'roses', 'lavender', 'passionflower'],
    flavor: {
      es: 'Floral, ligero y elegante.',
      en: 'Floral, light and elegant.',
    },
    aroma: {
      es: 'Rosa y lavanda. Perfuma en vez de apestar.',
      en: 'Rose and lavender. It perfumes instead of reeking.',
    },
    effect: {
      es: 'Ánimo elevado, relajación lúcida.',
      en: 'Lifted mood, lucid relaxation.',
    },
    moment: {
      es: 'La tarde, la sobremesa, lo social.',
      en: 'Afternoon, lingering conversations, social time.',
    },
  },
  {
    id: 'suavidad',
    name: 'Suavidad',
    hex: '#D87FA4',
    ink: '#A34A6E',
    inkDark: '#EFB2C9',
    family: 'mente',
    slogan: { es: 'Calma Diaria', en: 'Daily Calm' },
    herbIds: ['pericorn', 'lemon-balm', 'chamomile', 'mint'],
    flavor: {
      es: 'Dulce y terso, con notas de anís.',
      en: 'Sweet and smooth, with anise notes.',
    },
    aroma: {
      es: 'Herbal dulce, discreto.',
      en: 'Sweet herbal, discreet.',
    },
    effect: {
      es: 'Calma diurna sin somnolencia.',
      en: 'Daytime calm without drowsiness.',
    },
    moment: {
      es: 'Cualquier hora. Ideal para tu primera vez.',
      en: 'Any hour. The ideal first blend.',
    },
  },
  {
    id: 'sueno-profundo',
    name: 'Sueño Profundo',
    hex: '#9E7FCB',
    ink: '#6E4F9E',
    inkDark: '#C9B2E8',
    family: 'mente',
    slogan: { es: 'Apaga la Mente', en: 'Quiet the Mind' },
    herbIds: ['pericorn', 'passionflower', 'lemon-balm', 'lavender'],
    flavor: {
      es: 'Dulce y anisado, muy suave.',
      en: 'Sweet, anise-like, very gentle.',
    },
    aroma: {
      es: 'Lavanda cálida, de almohada.',
      en: 'Warm lavender, pillow-soft.',
    },
    effect: {
      es: 'Sedación ligera. Apaga el ruido mental.',
      en: 'Light sedation. Quiets the mental noise.',
    },
    moment: {
      es: 'La noche. El último gesto del día.',
      en: "Night. The day's last gesture.",
    },
  },
]

const copy = {
  es: {
    title: 'Seis mezclas, un espectro',
    subtitle: 'De la más activante a la más sedante. ¿Cuál va con tu momento?',
    mostActivating: 'Más activante',
    mostSedating: 'Más sedante',
    day: 'Día',
    night: 'Noche',
    herbs: 'Hierbas',
    flavor: 'Sabor',
    aroma: 'Aroma del humo secundario',
    effect: 'Efecto',
    moment: 'Momento',
    viewInCatalog: 'Ver en el catálogo',
    spectrumLabel: 'Espectro de mezclas, de más activante a más sedante',
    family: { mente: 'Mente y ánimo', respiracion: 'Respiración' },
  },
  en: {
    title: 'Six blends, one spectrum',
    subtitle: 'From most activating to most sedating. Which one fits your moment?',
    mostActivating: 'Most activating',
    mostSedating: 'Most sedating',
    day: 'Day',
    night: 'Night',
    herbs: 'Herbs',
    flavor: 'Flavor',
    aroma: 'Secondhand smoke aroma',
    effect: 'Effect',
    moment: 'Moment',
    viewInCatalog: 'View in the catalog',
    spectrumLabel: 'Blend spectrum, from most activating to most sedating',
    family: { mente: 'Mind & mood', respiracion: 'Respiratory' },
  },
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground mb-1">
        {label}
      </p>
      <p className="text-sm text-foreground leading-relaxed">{value}</p>
    </div>
  )
}

function BlendDetail({
  blend,
  onShopBlends,
}: {
  blend: SpectrumBlend
  onShopBlends: () => void
}) {
  const { language } = useLanguage()
  const t = copy[language]
  const herbName = (id: string) =>
    herbs.find(h => h.id === id)?.name[language] ?? id

  return (
    <div className="space-y-5">
      {/* Hierbas */}
      <div>
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground mb-2">
          {t.herbs}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {blend.herbIds.map(id => (
            <span
              key={id}
              className="px-2.5 py-1 rounded-full text-xs text-foreground border border-[var(--ink)]/30 dark:border-[var(--ink-dk)]/30 bg-[var(--ink)]/[0.06] dark:bg-[var(--ink-dk)]/[0.10]"
            >
              {herbName(id)}
            </span>
          ))}
        </div>
      </div>

      {/* Perfil */}
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
        <Field label={t.flavor} value={blend.flavor[language]} />
        <Field label={t.aroma} value={blend.aroma[language]} />
        <Field label={t.effect} value={blend.effect[language]} />
        <Field label={t.moment} value={blend.moment[language]} />
      </div>

      <Button variant="outline" onClick={onShopBlends} className="w-full sm:w-auto">
        {t.viewInCatalog}
        <ArrowRight className="size-4 ml-2" />
      </Button>
    </div>
  )
}

export function BlendSpectrum({ onShopBlends }: BlendSpectrumProps) {
  const { language } = useLanguage()
  const t = copy[language]
  const [selected, setSelected] = useState(0)
  // El acordeón móvil puede cerrarse sin perder la selección de la barra.
  const [mobileOpen, setMobileOpen] = useState(true)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const active = spectrum[selected]

  function select(i: number) {
    setSelected(i)
    setMobileOpen(true)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const last = spectrum.length - 1
    let next: number | null = null

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = selected === last ? 0 : selected + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = selected === 0 ? last : selected - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last

    if (next !== null) {
      e.preventDefault()
      select(next)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <section className="border-t border-border bg-background">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        {/* Encabezado */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
            {t.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Barra del espectro */}
        <div className="mb-8 md:mb-10">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{t.mostActivating}</span>
            <span>{t.mostSedating}</span>
          </div>

          <div
            role="tablist"
            aria-label={t.spectrumLabel}
            onKeyDown={handleKeyDown}
            className="flex items-end gap-1 md:gap-1.5 h-16 md:h-20"
          >
            {spectrum.map((blend, i) => {
              const isActive = i === selected
              return (
                <motion.button
                  key={blend.id}
                  ref={el => { tabRefs.current[i] = el }}
                  role="tab"
                  id={`spectrum-tab-${blend.id}`}
                  aria-selected={isActive}
                  aria-controls={`spectrum-panel-${blend.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  animate={{ height: isActive ? '100%' : '58%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  style={{ backgroundColor: blend.hex }}
                  className={cn(
                    'flex-1 rounded-md cursor-pointer transition-opacity',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                    isActive ? 'opacity-100' : 'opacity-55 hover:opacity-80'
                  )}
                >
                  <span className="sr-only">{blend.name}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Nombres bajo cada segmento — solo desktop */}
          <div className="hidden md:flex gap-1.5 mt-2" aria-hidden="true">
            {spectrum.map((blend, i) => (
              <span
                key={blend.id}
                style={
                  {
                    '--ink': blend.ink,
                    '--ink-dk': blend.inkDark,
                  } as React.CSSProperties
                }
                className={cn(
                  'flex-1 text-center text-[0.6875rem] leading-tight transition-colors',
                  i === selected
                    ? 'font-semibold text-[var(--ink)] dark:text-[var(--ink-dk)]'
                    : 'text-muted-foreground'
                )}
              >
                {blend.name}
              </span>
            ))}
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-2 md:mt-3">
            <span>{t.day}</span>
            <span>{t.night}</span>
          </div>
        </div>

        {/* Panel único — desktop */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`spectrum-panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`spectrum-tab-${active.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              style={
                {
                  '--ink': active.ink,
                  '--ink-dk': active.inkDark,
                  borderLeftColor: active.hex,
                } as React.CSSProperties
              }
              className="bg-card border border-border border-l-4 rounded-xl p-6 md:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--ink)] dark:text-[var(--ink-dk)]">
                    {active.name}
                  </h3>
                  <p className="font-serif italic text-base text-[var(--ink)]/85 dark:text-[var(--ink-dk)]/85 mt-0.5">
                    {active.slogan[language]}
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full text-[var(--ink)] dark:text-[var(--ink-dk)] bg-[var(--ink)]/[0.10] dark:bg-[var(--ink-dk)]/[0.14]">
                  {t.family[active.family]}
                </span>
              </div>

              <BlendDetail blend={active} onShopBlends={onShopBlends} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Acordeón — móvil */}
        <div className="md:hidden space-y-2">
          {spectrum.map((blend, i) => {
            const isOpen = i === selected && mobileOpen
            return (
              <div
                key={blend.id}
                style={
                  {
                    '--ink': blend.ink,
                    '--ink-dk': blend.inkDark,
                  } as React.CSSProperties
                }
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`spectrum-acc-${blend.id}`}
                  onClick={() => (isOpen ? setMobileOpen(false) : select(i))}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span
                    className="size-3 rounded-full shrink-0"
                    style={{ backgroundColor: blend.hex }}
                  />
                  <span className="flex-1 min-w-0">
                    <span className="block font-serif font-semibold text-[var(--ink)] dark:text-[var(--ink-dk)]">
                      {blend.name}
                    </span>
                    <span className="block font-serif italic text-sm text-muted-foreground">
                      {blend.slogan[language]}
                    </span>
                  </span>
                  <span className="text-[0.625rem] uppercase tracking-wider text-muted-foreground shrink-0">
                    {t.family[blend.family]}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`spectrum-acc-${blend.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-border">
                        <div className="pt-4">
                          <BlendDetail blend={blend} onShopBlends={onShopBlends} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
