'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Leaf, Sparkles, Flame, Heart, Wind, Sun, Check, FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { type Herb, blends } from '@/lib/herbs-data'
import { useLanguage } from '@/lib/language-context'

interface HerbDetailProps {
  herb: Herb
  onBack: () => void
}

const categoryIcons = {
  calming: Heart,
  energizing: Sun,
  respiratory: Wind,
  aromatic: Sparkles,
  balancing: Leaf,
}

type HerbCategory = 'calming' | 'energizing' | 'respiratory' | 'aromatic' | 'balancing'

const categoryLabels: Record<HerbCategory, { en: string; es: string }> = {
  calming:     { en: 'Calming',     es: 'Calmante'     },
  energizing:  { en: 'Energizing',  es: 'Energizante'  },
  respiratory: { en: 'Respiratory', es: 'Respiratoria' },
  aromatic:    { en: 'Aromatic',    es: 'Aromática'    },
  balancing:   { en: 'Balancing',   es: 'Equilibrante' },
}

const categoryDescriptions: Record<HerbCategory, { en: string; es: string }> = {
  calming:     { en: 'Promotes relaxation and stress relief',   es: 'Promueve la relajación y el alivio del estrés'  },
  energizing:  { en: 'Enhances focus and mental clarity',       es: 'Mejora el enfoque y la claridad mental'         },
  respiratory: { en: 'Supports healthy breathing',              es: 'Favorece la respiración saludable'              },
  aromatic:    { en: 'Elevates the sensory experience',         es: 'Eleva la experiencia sensorial'                 },
  balancing:   { en: 'Harmonizes mind and body',                es: 'Armoniza mente y cuerpo'                       },
}

export function HerbDetail({ herb, onBack }: HerbDetailProps) {
  const { language, t } = useLanguage()
  const CategoryIcon = categoryIcons[herb.category]
  const cat = herb.category as HerbCategory

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className={cn(
        'relative overflow-hidden bg-gradient-to-br pt-4 pb-20',
        herb.color
      )}>
        {/* Scrim — garantiza contraste en los 15 gradientes y ambos temas */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/25"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-lg mx-auto px-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-[#FAF7EE] hover:bg-white/20"
          >
            <ArrowLeft className="size-4 mr-1" />
            {t('nav.back')}
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="size-32 mx-auto mb-4 rounded-2xl overflow-hidden bg-white/90 shadow-lg"
            >
              <img
                src={herb.image}
                alt={herb.name[language]}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <h1 className="font-serif text-4xl font-bold text-[#FAF7EE] mb-2">
              {herb.name[language]}
            </h1>
            <p className="font-serif italic text-base text-[#FAF7EE]/75 -mt-1 mb-4">
              {herb.scientificName}
            </p>
            <Badge className="bg-white/20 text-[#FAF7EE] border-0">
              <CategoryIcon className="size-3 mr-1" />
              {categoryLabels[cat][language]}
            </Badge>
          </motion.div>
        </div>
      </div>
      
      {/* Content */}
      <main className="max-w-lg mx-auto px-4 -mt-12 pb-8 relative z-10">
        {/* Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Leaf className="size-5 text-primary" />
                {t('herb.about')} {herb.name[language]}
              </h2>
              <p className="text-foreground leading-relaxed">
                {herb.description[language]}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                {t('herb.effects_experience')}
              </h2>
              <p className="text-foreground leading-relaxed">
                {herb.effects[language]}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
            {t('herb.key_benefits')}
          </h2>
          <div className="space-y-2">
            {herb.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.en}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
              >
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="size-4 text-primary" />
                </div>
                <span className="text-foreground">{benefit[language]}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Flavor Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <h2 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Flame className="size-5 text-accent" />
            {t('herb.flavor_profile')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-foreground italic">
                {'"'}{herb.flavorProfile[language]}{'"'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Role in Blend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <h2 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <FlaskConical className="size-5 text-primary" />
            {t('herb.role_in_blend')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-foreground">
                {herb.role[language]}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Aparece en */}
        {(() => {
          const herbBlends = blends.filter(b => b.herbs.includes(herb.id))
          if (herbBlends.length === 0) return null
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="mb-6"
            >
              <h2 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Leaf className="size-5 text-primary" />
                {t('herb.found_in')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {herbBlends.map(blend => (
                  <Badge
                    key={blend.id}
                    variant="secondary"
                    className="text-sm py-1.5 px-3"
                  >
                    {blend.displayName[language]}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )
        })()}

        {/* Category Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="bg-secondary/50 border-0">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className={cn(
                  'size-10 rounded-full bg-gradient-to-br flex items-center justify-center ring-1 ring-black/10 dark:ring-white/15',
                  herb.color
                )}>
                  <CategoryIcon className="size-5 text-[#FAF7EE]" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-foreground">
                    {categoryLabels[cat][language]} {t('herb.category_suffix')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {categoryDescriptions[cat][language]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
