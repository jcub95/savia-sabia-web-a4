'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Leaf, Sparkles, Clock, Flame, Heart, Wind, Sun, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { type Herb } from '@/lib/herbs-data'

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

const categoryDescriptions = {
  calming: 'Promotes relaxation and stress relief',
  energizing: 'Enhances focus and mental clarity',
  respiratory: 'Supports healthy breathing',
  aromatic: 'Elevates the sensory experience',
  balancing: 'Harmonizes mind and body',
}

export function HerbDetail({ herb, onBack }: HerbDetailProps) {
  const CategoryIcon = categoryIcons[herb.category]
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className={cn(
        'relative bg-gradient-to-br pt-4 pb-20',
        herb.color
      )}>
        <div className="max-w-lg mx-auto px-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="size-4 mr-1" />
            Back
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
                alt={herb.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <h1 className="font-serif text-4xl font-bold text-primary-foreground mb-2">
              {herb.name}
            </h1>
            <Badge className="bg-white/20 text-primary-foreground border-0 capitalize">
              <CategoryIcon className="size-3 mr-1" />
              {herb.category}
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
                About {herb.name}
              </h2>
              <p className="text-foreground leading-relaxed">
                {herb.description}
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
                Effects & Experience
              </h2>
              <p className="text-foreground leading-relaxed">
                {herb.effects}
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
            Key Benefits
          </h2>
          <div className="space-y-2">
            {herb.benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
              >
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="size-4 text-primary" />
                </div>
                <span className="text-foreground">{benefit}</span>
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
            Flavor Profile
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-foreground italic">
                {'"'}{herb.flavorProfile}{'"'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Best For */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <h2 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="size-5 text-muted-foreground" />
            Best For
          </h2>
          <div className="flex flex-wrap gap-2">
            {herb.bestFor.map((item) => (
              <Badge key={item} variant="secondary" className="text-sm py-1.5 px-3">
                {item}
              </Badge>
            ))}
          </div>
        </motion.div>
        
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
                  'size-10 rounded-full bg-gradient-to-br flex items-center justify-center',
                  herb.color
                )}>
                  <CategoryIcon className="size-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-foreground capitalize">
                    {herb.category} Category
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {categoryDescriptions[herb.category]}
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
