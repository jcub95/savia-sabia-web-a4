'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Search, ArrowLeft, Heart, Sun, Wind, Sparkles, X, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { herbs, blends, type Herb } from '@/lib/herbs-data'
import { useLanguage, type Language } from '@/lib/language-context'
import { HerbDetail } from './herb-detail'

type HerbCategory = 'calming' | 'energizing' | 'respiratory' | 'aromatic' | 'balancing'

const categoryLabels: Record<HerbCategory, { en: string; es: string }> = {
  calming:     { en: 'Calming',     es: 'Calmante'     },
  energizing:  { en: 'Energizing',  es: 'Energizante'  },
  respiratory: { en: 'Respiratory', es: 'Respiratoria' },
  aromatic:    { en: 'Aromatic',    es: 'Aromática'    },
  balancing:   { en: 'Balancing',   es: 'Equilibrante' },
}

function herbCountLabel(count: number, language: Language): string {
  if (language === 'es') {
    return count === 1 ? '1 hierba encontrada' : `${count} hierbas encontradas`
  }
  return count === 1 ? '1 herb found' : `${count} herbs found`
}

interface HerbariumProps {
  onBack: () => void
  onGoHome: () => void
}

const categories = [
  { id: 'all',        icon: Leaf     },
  { id: 'calming',    icon: Heart    },
  { id: 'energizing', icon: Sun      },
  { id: 'respiratory',icon: Wind     },
  { id: 'aromatic',   icon: Sparkles },
  { id: 'balancing',  icon: Leaf     },
]

export function Herbarium({ onBack, onGoHome }: HerbariumProps) {
  const { language, t } = useLanguage()
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredHerbs = useMemo(() => {
    return herbs.filter(herb => {
      const matchesSearch = herb.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.benefits.some(b => b[language].toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || herb.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, language])
  
  if (selectedHerb) {
    return <HerbDetail herb={selectedHerb} onBack={() => setSelectedHerb(null)} />
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={onGoHome} className="gap-1">
                <Home className="size-4" />
                {t('nav.home')}
              </Button>
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
                <ArrowLeft className="size-4" />
                {t('nav.back')}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="size-5 text-primary" />
              <span className="font-serif text-lg font-semibold text-foreground">{t('herbarium.title')}</span>
            </div>
            <div className="w-16" />
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('herbarium.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 bg-secondary border-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="size-3.5" />
                  {t(`herbarium.${category.id}`)}
                </button>
              )
            })}
          </div>
        </div>
      </header>
      
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {herbCountLabel(filteredHerbs.length, language)}
        </p>
        
        {/* Herbs Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredHerbs.map((herb, index) => (
            <motion.div
              key={herb.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="overflow-hidden cursor-pointer hover:border-primary/50 transition-all group h-full"
                onClick={() => setSelectedHerb(herb)}
              >
                <div className="h-32 bg-cream-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={herb.image}
                    alt={herb.name[language]}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-serif font-semibold text-foreground mb-1">
                    {herb.name[language]}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {categoryLabels[herb.category as HerbCategory]?.[language] ?? herb.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {herb.flavorProfile[language]}
                  </p>
                  {(() => {
                    const herbBlends = blends.filter(b => b.herbs.includes(herb.id))
                    if (herbBlends.length === 0) return null
                    return (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {herbBlends.map(blend => (
                          <span
                            key={blend.id}
                            className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-md"
                          >
                            {blend.name}
                          </span>
                        ))}
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {filteredHerbs.length === 0 && (
          <div className="text-center py-12">
            <div className="size-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Search className="size-6 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
              {t('herbarium.no_herbs_found')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('herbarium.no_herbs_desc')}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
