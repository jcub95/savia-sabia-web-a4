'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, ChevronRight, ChevronDown, Sparkles, Heart, Wind, Sun, RotateCcw, BookOpen, Package, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { type Herb, type Blend, type UserProfile, type SmokerProfileType, smokerProfiles, herbs } from '@/lib/herbs-data'
import { HerbDetail } from './herb-detail'

interface ResultsProps {
  recommendations: Herb[]
  blendRecommendations: Blend[]
  profile: UserProfile
  smokerProfileType: SmokerProfileType
  onRetake: () => void
  onViewHerbarium: () => void
  onShopBlends: () => void
}

const categoryIcons = {
  calming: Heart,
  energizing: Sun,
  respiratory: Wind,
  aromatic: Sparkles,
  balancing: Leaf,
}

export function Results({ recommendations, blendRecommendations, profile, smokerProfileType, onRetake, onViewHerbarium, onShopBlends }: ResultsProps) {
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null)
  const [expandedBlend, setExpandedBlend] = useState<string | null>(null)
  const [primaryBlend, secondaryBlend] = blendRecommendations
  const smokerProfile = smokerProfiles[smokerProfileType]
  
  const getHerbById = (id: string) => herbs.find(h => h.id === id)
  
  if (selectedHerb) {
    return <HerbDetail herb={selectedHerb} onBack={() => setSelectedHerb(null)} />
  }
  
  const getProfileSummary = () => {
    const summaryParts = []
    
    if (profile.desiredEffect === 'relaxation') summaryParts.push('seeking calm')
    if (profile.desiredEffect === 'energy') summaryParts.push('seeking energy')
    if (profile.desiredEffect === 'clarity') summaryParts.push('seeking clarity')
    if (profile.desiredEffect === 'respiratory') summaryParts.push('prioritizing respiratory health')
    if (profile.desiredEffect === 'mood') summaryParts.push('seeking mood enhancement')
    
    if (profile.stressLevel === 'high' || profile.stressLevel === 'very_high') {
      summaryParts.push('managing stress')
    }
    
    if (profile.transitionGoal === 'quit_tobacco') {
      summaryParts.push('transitioning from tobacco')
    }
    
    return summaryParts.slice(0, 2).join(' and ')
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="size-5 text-primary" />
              <span className="font-serif text-lg font-semibold text-foreground">Savia Sabia</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onRetake}>
              <RotateCcw className="size-4 mr-1" />
              Retake
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-lg mx-auto px-4 py-8">
        {/* Smoker Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="h-1 bg-gradient-to-r from-primary to-accent" />
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="size-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0"
                >
                  <span className="text-3xl">{smokerProfile.icon}</span>
                </motion.div>
                <div>
                  <Badge className="mb-2 bg-primary/20 text-primary border-0">Your Profile</Badge>
                  <h2 className="font-serif text-xl font-bold text-foreground text-balance">
                    {smokerProfile.name}
                  </h2>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {smokerProfile.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="text-xs font-medium text-foreground uppercase tracking-wider">
                  Key Characteristics
                </div>
                <ul className="space-y-1.5">
                  {smokerProfile.characteristics.map((char, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                  Recommended Approach
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {smokerProfile.recommendedApproach}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Recommended Blends Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="size-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Recommended Blends
            </h2>
          </div>
          
          {/* Primary Blend */}
          <Card 
            className="overflow-hidden mb-3 border-primary/30 cursor-pointer hover:border-primary/50 transition-all"
            onClick={() => setExpandedBlend(expandedBlend === primaryBlend.id ? null : primaryBlend.id)}
          >
            <div className={cn('h-1.5 bg-gradient-to-r', primaryBlend.color)} />
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <Badge className="mb-2 bg-primary/20 text-primary border-0 text-xs">Best Match</Badge>
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {primaryBlend.displayName}
                  </h3>
                </div>
                <ChevronDown className={cn(
                  "size-5 text-muted-foreground transition-transform",
                  expandedBlend === primaryBlend.id && "rotate-180"
                )} />
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {primaryBlend.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-3">
                {primaryBlend.herbs.map((herbId) => {
                  const herb = getHerbById(herbId)
                  return herb ? (
                    <span 
                      key={herbId}
                      className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
                    >
                      {herb.icon} {herb.name}
                    </span>
                  ) : null
                })}
              </div>
              
              {expandedBlend === primaryBlend.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 border-t border-border"
                >
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground uppercase mb-1">Best For</div>
                      <ul className="space-y-0.5">
                        {primaryBlend.bestFor.slice(0, 3).map((item, i) => (
                          <li key={i} className="text-xs text-foreground flex items-center gap-1">
                            <span className="text-primary">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground uppercase mb-1">Benefits</div>
                      <ul className="space-y-0.5">
                        {primaryBlend.benefits.slice(0, 3).map((item, i) => (
                          <li key={i} className="text-xs text-foreground flex items-center gap-1">
                            <span className="text-primary">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="capitalize">Intensity: {primaryBlend.intensity}</span>
                    <span>•</span>
                    <span>Best time: {primaryBlend.timeOfDay.join(', ')}</span>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
          
          {/* Secondary Blend */}
          <Card 
            className="overflow-hidden cursor-pointer hover:border-primary/50 transition-all"
            onClick={() => setExpandedBlend(expandedBlend === secondaryBlend.id ? null : secondaryBlend.id)}
          >
            <div className={cn('h-1 bg-gradient-to-r', secondaryBlend.color)} />
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <Badge variant="secondary" className="mb-2 text-xs">Also Recommended</Badge>
                  <h3 className="font-serif text-base font-semibold text-foreground">
                    {secondaryBlend.displayName}
                  </h3>
                </div>
                <ChevronDown className={cn(
                  "size-5 text-muted-foreground transition-transform",
                  expandedBlend === secondaryBlend.id && "rotate-180"
                )} />
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {secondaryBlend.herbs.map((herbId) => {
                  const herb = getHerbById(herbId)
                  return herb ? (
                    <span 
                      key={herbId}
                      className="px-2 py-0.5 bg-secondary/50 text-secondary-foreground text-xs rounded-full"
                    >
                      {herb.icon} {herb.name}
                    </span>
                  ) : null
                })}
              </div>
              
              {expandedBlend === secondaryBlend.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 mt-3 border-t border-border"
                >
                  <p className="text-sm text-muted-foreground mb-3">
                    {secondaryBlend.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {secondaryBlend.benefits.map((benefit, i) => (
                      <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Herbs in Your Recommended Blend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="size-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Herbs in {primaryBlend.displayName}
            </h2>
          </div>
          
          <div className="space-y-3">
            {primaryBlend.herbs.map((herbId, index) => {
              const herb = getHerbById(herbId)
              if (!herb) return null
              const Icon = categoryIcons[herb.category]
              
              return (
                <motion.div
                  key={herb.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card 
                    className="cursor-pointer hover:border-primary/50 transition-all group"
                    onClick={() => setSelectedHerb(herb)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="size-14 rounded-xl overflow-hidden bg-cream-50 shrink-0 border border-border">
                          <img
                            src={herb.image}
                            alt={herb.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-serif font-semibold text-foreground flex items-center gap-2">
                              {herb.name}
                              <Icon className="size-4 text-muted-foreground" />
                            </div>
                            <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {herb.flavorProfile}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {herb.benefits.map((benefit, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
        
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Button
            onClick={onShopBlends}
            className="w-full h-14"
            size="lg"
          >
            <ShoppingCart className="size-5 mr-2" />
            Shop Our Blends
          </Button>
          
          <Button
            onClick={onViewHerbarium}
            variant="outline"
            className="w-full h-12"
            size="lg"
          >
            <BookOpen className="size-4 mr-2" />
            Explore Full Herbarium
          </Button>
        </motion.div>
      </main>
    </div>
  )
}
