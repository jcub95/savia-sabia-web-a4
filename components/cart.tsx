'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, CreditCard, Package, CheckCircle2, Leaf, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { herbs } from '@/lib/herbs-data'
import { useCart, formatPrice } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'

interface CartProps {
  onBack: () => void
  onContinueShopping: () => void
  onGoHome: () => void
}

export function Cart({ onBack, onContinueShopping, onGoHome }: CartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const { t, language } = useLanguage()
  
  const getHerbById = (id: string) => herbs.find(h => h.id === id)
  
  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      setOrderComplete(true)
      clearCart()
    }, 2000)
  }
  
  const subtotal = getTotalPrice()
  const shipping = subtotal > 0 ? 4500 : 0 // Q45 shipping
  const freeShippingThreshold = 20000 // Q200 for free shipping
  const isFreeShipping = subtotal >= freeShippingThreshold
  const finalShipping = isFreeShipping ? 0 : shipping
  const total = subtotal + finalShipping
  
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="size-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="size-10 text-green-500" />
          </motion.div>
          
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
            {t('checkout.success')}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t('checkout.success_desc')}
          </p>
          
          <Button onClick={onContinueShopping} size="lg" className="w-full">
            <Leaf className="size-5 mr-2" />
            {t('checkout.back_home')}
          </Button>
        </motion.div>
      </div>
    )
  }
  
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
            onClick={handleCheckout}
            disabled={isCheckingOut}
            size="lg"
            className="w-full h-14 text-base font-medium"
          >
            {isCheckingOut ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="size-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                />
                {t('checkout.processing')}
              </>
            ) : (
              <>
                <CreditCard className="size-5 mr-2" />
                {t('cart.checkout')}
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            {t('cart.secure')}
          </p>
        </div>
      </div>
    </div>
  )
}
