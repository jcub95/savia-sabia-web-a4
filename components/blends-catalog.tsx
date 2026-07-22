'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Check, Clock, Leaf, Sparkles, ChevronDown, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { blends, herbs, type Blend } from '@/lib/herbs-data'
import { useCart, formatPrice, productVariants, type ProductVariant } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'

interface BlendsCatalogProps {
  onBack: () => void
  onViewCart: () => void
}

export function BlendsCatalog({ onBack, onViewCart }: BlendsCatalogProps) {
  const [expandedBlend, setExpandedBlend] = useState<string | null>(null)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>(
    // Default to 10g bag for all blends
    Object.fromEntries(blends.map(b => [b.id, productVariants[0]]))
  )
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const { addToCart, getTotalItems } = useCart()
  const { t } = useLanguage()
  
  const getHerbById = (id: string) => herbs.find(h => h.id === id)
  
  const handleAddToCart = (blend: Blend) => {
    const variant = selectedVariants[blend.id]
    addToCart(blend, variant)
    const itemKey = `${blend.id}-${variant.size}`
    setAddedItems(prev => new Set(prev).add(itemKey))
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev)
        next.delete(itemKey)
        return next
      })
    }, 1500)
  }
  
  const handleVariantChange = (blendId: string, variant: ProductVariant) => {
    setSelectedVariants(prev => ({ ...prev, [blendId]: variant }))
  }
  
  const getEffectIcon = (effect: string) => {
    switch (effect) {
      case 'calming': return '🧘'
      case 'energizing': return '⚡'
      case 'respiratory': return '🌬️'
      case 'focus': return '🎯'
      case 'sleep': return '🌙'
      case 'spiritual': return '✨'
      default: return '🌿'
    }
  }
  
  const cartItemCount = getTotalItems()
  
  // Group variants by type
  const bagVariants = productVariants.filter(v => v.type === 'bag')
  const cigaretteVariants = productVariants.filter(v => v.type === 'cigarettes')
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-1"
          >
            <ArrowLeft className="size-4" />
            {t('shop.back')}
          </Button>
          
          <h1 className="font-serif text-lg font-semibold text-foreground">
            {t('shop.title')}
          </h1>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onViewCart}
            className="gap-1.5 relative"
          >
            <ShoppingCart className="size-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 size-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </header>
      
      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="size-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Package className="size-7 text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            {t('shop.title')}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t('shop.subtitle')}
          </p>
        </motion.div>
        
        {/* Blends Grid */}
        <div className="space-y-4">
          {blends.map((blend, index) => {
            const isExpanded = expandedBlend === blend.id
            const selectedVariant = selectedVariants[blend.id]
            const itemKey = `${blend.id}-${selectedVariant.size}`
            const justAdded = addedItems.has(itemKey)
            
            return (
              <motion.div
                key={blend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-border hover:border-primary/30 transition-colors">
                  <div className={cn('h-1.5 bg-gradient-to-r', blend.color)} />
                  <CardContent className="p-0">
                    {/* Blend Header - Clickable */}
                    <button
                      onClick={() => setExpandedBlend(isExpanded ? null : blend.id)}
                      className="w-full p-4 text-left"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{getEffectIcon(blend.primaryEffect)}</span>
                            <Badge variant="secondary" className="text-xs capitalize">
                              {blend.primaryEffect}
                            </Badge>
                            <Badge variant="outline" className="text-xs capitalize">
                              {blend.intensity}
                            </Badge>
                          </div>
                          <h3 className="font-serif text-lg font-bold text-foreground">
                            {blend.displayName}
                          </h3>
                        </div>
                        <ChevronDown className={cn(
                          "size-5 text-muted-foreground transition-transform shrink-0 mt-1",
                          isExpanded && "rotate-180"
                        )} />
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {blend.description}
                      </p>
                      
                      {/* Herbs Preview */}
                      <div className="flex flex-wrap gap-1.5">
                        {blend.herbs.map((herbId) => {
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
                    </button>
                    
                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-0 border-t border-border">
                            <div className="pt-4 space-y-4">
                              {/* Benefits */}
                              <div>
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                                  <Sparkles className="size-3" />
                                  {t('shop.benefits')}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {blend.benefits.map((benefit, i) => (
                                    <span 
                                      key={i}
                                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                                    >
                                      {benefit}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Best For */}
                              <div>
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                                  <Leaf className="size-3" />
                                  {t('shop.best_for')}
                                </div>
                                <ul className="space-y-1">
                                  {blend.bestFor.map((item, i) => (
                                    <li key={i} className="text-sm text-foreground flex items-center gap-2">
                                      <span className="text-primary">•</span> {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              {/* Time of Day */}
                              <div>
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                                  <Clock className="size-3" />
                                  Recommended Time
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {blend.timeOfDay.map((time) => (
                                    <span 
                                      key={time}
                                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md capitalize"
                                    >
                                      {time}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Herb Details */}
                              <div>
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                  Herb Composition
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {blend.herbs.map((herbId) => {
                                    const herb = getHerbById(herbId)
                                    return herb ? (
                                      <div 
                                        key={herbId}
                                        className="p-2 bg-card border border-border rounded-lg"
                                      >
                                        <div className="flex items-center gap-1.5 mb-1">
                                          <span>{herb.icon}</span>
                                          <span className="text-sm font-medium text-foreground">{herb.name}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                          {herb.benefits.slice(0, 2).join(', ')}
                                        </p>
                                      </div>
                                    ) : null
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Size Selection & Add to Cart */}
                    <div className="px-4 py-4 bg-muted/30 border-t border-border space-y-3">
                      {/* Size Options */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t('shop.loose_herbs')}
                        </div>
                        <div className="flex gap-2">
                          {bagVariants.map((variant) => (
                            <button
                              key={variant.size}
                              onClick={() => handleVariantChange(blend.id, variant)}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all",
                                selectedVariant.size === variant.size
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border bg-background text-foreground hover:border-primary/50"
                              )}
                            >
                              <div>{variant.label}</div>
                              <div className="text-xs opacity-70">{formatPrice(variant.price)}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t('shop.cigarettes')}
                        </div>
                        <div className="flex gap-2">
                          {cigaretteVariants.map((variant) => (
                            <button
                              key={variant.size}
                              onClick={() => handleVariantChange(blend.id, variant)}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all",
                                selectedVariant.size === variant.size
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border bg-background text-foreground hover:border-primary/50"
                              )}
                            >
                              <div>{variant.label}</div>
                              <div className="text-xs opacity-70">{formatPrice(variant.price)}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <span className="text-lg font-bold text-foreground">
                            {formatPrice(selectedVariant.price)}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">
                            / {selectedVariant.label}
                          </span>
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddToCart(blend)
                          }}
                          disabled={justAdded}
                          className={cn(
                            "gap-1.5 transition-all",
                            justAdded && "bg-green-600 hover:bg-green-600"
                          )}
                        >
                          {justAdded ? (
                            <>
                              <Check className="size-4" />
                              {t('shop.added')}
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="size-4" />
                              {t('shop.add_to_cart')}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </main>
      
      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-4 right-4 max-w-lg mx-auto z-30"
        >
          <Button
            onClick={onViewCart}
            size="lg"
            className="w-full h-14 text-base font-medium shadow-lg"
          >
            <ShoppingCart className="size-5 mr-2" />
            {t('shop.view_cart')} ({cartItemCount})
          </Button>
        </motion.div>
      )}
    </div>
  )
}
