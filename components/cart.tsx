'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Package, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { herbs } from '@/lib/herbs-data'
import { useCart, formatPrice } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'
import { CheckoutDialog } from './checkout-dialog'

interface CartProps {
  onBack: () => void
  onContinueShopping: () => void
  onGoHome: () => void
}

export function Cart({ onBack, onContinueShopping, onGoHome }: CartProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const { t, language } = useLanguage()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const getHerbById = (id: string) => herbs.find(h => h.id === id)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 0 ? 4000 : 0 // Q40 in cents
  const freeShippingThreshold = 20000 // Q200 in cents
  const isFreeShipping = subtotal >= freeShippingThreshold
  const finalShipping = isFreeShipping ? 0 : shipping
  const total = subtotal + finalShipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
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
            <h1 className="font-serif text-lg font-semibold text-foreground">{t('cart.title')}</h1>
            <div className="w-16" />
          </div>
        </header>
        
        <main className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="size-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="size-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
              {t('cart.empty')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('cart.empty_desc')}
            </p>
            <Button onClick={onContinueShopping} size="lg">
              <Package className="size-5 mr-2" />
              {t('cart.continue_shopping')}
            </Button>
          </motion.div>
        </main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
            <ArrowLeft className="size-4" />
            {t('cart.back')}
          </Button>
          <h1 className="font-serif text-lg font-semibold text-foreground">
            {t('cart.title')} ({items.length})
          </h1>
          <div className="w-16" />
        </div>
      </header>
      
      <main className="max-w-lg mx-auto px-4 py-6 pb-48">
        {/* Free Shipping Progress */}
        {!isFreeShipping && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-primary/10 rounded-xl border border-primary/20"
          >
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-foreground font-medium">{t('cart.add_more')}</span>
              <span className="text-primary font-semibold">
                {formatPrice(freeShippingThreshold - subtotal)} {t('cart.away')}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                className="h-full bg-primary rounded-full"
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}
        
        {isFreeShipping && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-center"
          >
            <span className="text-green-600 font-medium text-sm">
              {t('cart.free_shipping_unlocked')}
            </span>
          </motion.div>
        )}
        
        {/* Cart Items */}
        <div className="space-y-3 mb-6">
          <AnimatePresence>
            {items.map((item, index) => {
              const itemKey = `${item.blend.id}-${item.variant.size}`
              return (
                <motion.div
                  key={itemKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <div className={cn('h-1 bg-gradient-to-r', item.blend.color)} />
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Blend Info */}
                        <div className="flex-1">
                          <h3 className="font-serif font-semibold text-foreground mb-1">
                            {item.blend.displayName[language]}
                          </h3>
                          <Badge variant="secondary" className="text-xs mb-2">
                            {item.variant.label[language]}
                          </Badge>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.blend.herbs.slice(0, 3).map((herbId) => {
                              const herb = getHerbById(herbId)
                              return herb ? (
                                <span 
                                  key={herbId}
                                  className="text-xs text-muted-foreground"
                                >
                                  {herb.icon}
                                </span>
                              ) : null
                            })}
                            {item.blend.herbs.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{item.blend.herbs.length - 3}
                              </span>
                            )}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {formatPrice(item.variant.price)}
                          </span>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.blend.id, item.variant.size)}
                            className="size-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                          
                          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.blend.id, item.variant.size, item.quantity - 1)}
                              className="size-7 p-0"
                            >
                              <Minus className="size-3" />
                            </Button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.blend.id, item.variant.size, item.quantity + 1)}
                              className="size-7 p-0"
                            >
                              <Plus className="size-3" />
                            </Button>
                          </div>
                          
                          <span className="text-sm font-semibold text-foreground">
                            {formatPrice(item.variant.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        
        {/* Continue Shopping */}
        <Button
          variant="outline"
          onClick={onContinueShopping}
          className="w-full mb-6"
        >
          <Package className="size-4 mr-2" />
          {t('cart.continue_shopping')}
        </Button>
      </main>
      
      {/* Checkout Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-30">
        <div className="max-w-lg mx-auto px-4 py-4">
          {/* Order Summary */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('cart.subtotal')}</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('cart.shipping')}</span>
              <span className={cn("text-foreground", isFreeShipping && "text-green-600")}>
                {isFreeShipping ? t('cart.free') : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
              <span className="text-foreground">{t('cart.total')}</span>
              <span className="text-foreground">{formatPrice(total)}</span>
            </div>
          </div>
          
          {/* Checkout Button */}
          <Button
            onClick={() => setCheckoutOpen(true)}
            size="lg"
            className="w-full h-14 text-base font-medium"
          >
            <svg
              className="size-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {language === 'es' ? 'Proceder al checkout' : 'Proceed to checkout'}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            {t('cart.secure')}
          </p>
        </div>
      </div>

      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  )
}
