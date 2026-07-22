'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Search, ArrowLeft, Heart, Sun, Wind, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { herbs, type Herb } from '@/lib/herbs-data'
import { HerbDetail } from './herb-detail'

interface HerbariumProps {
  onBack: () => void
}

const categories = [
  { id: 'all', label: 'All', icon: Leaf },
  { id: 'calming', label: 'Calming', icon: Heart },
  { id: 'energizing', label: 'Energizing', icon: Sun },
  { id: 'respiratory', label: 'Respiratory', icon: Wind },
  { id: 'aromatic', label: 'Aromatic', icon: Sparkles },
  { id: 'balancing', label: 'Balancing', icon: Leaf },
]

export function Herbarium({ onBack }: HerbariumProps) {
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const filteredHerbs = useMemo(() => {
    return herbs.filter(herb => {
      const matchesSearch = herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || herb.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])
  
  if (selectedHerb) {
    return <HerbDetail herb={selectedHerb} onBack={() => setSelectedHerb(null)} />
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="size-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Leaf className="size-5 text-primary" />
              <span className="font-serif text-lg font-semibold text-foreground">Herbarium</span>
            </div>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search herbs..."
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
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>
      
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredHerbs.length} {filteredHerbs.length === 1 ? 'herb' : 'herbs'} found
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
                    alt={herb.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-serif font-semibold text-foreground mb-1">
                    {herb.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {herb.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {herb.flavorProfile}
                  </p>
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
              No herbs found
            </h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
