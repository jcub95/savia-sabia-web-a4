'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type Blend, type LocalizedString } from './herbs-data'

export type ProductType = 'bag' | 'cigarettes'
export type BagSize = '0.5oz' | '2oz'
export type CigaretteSize = '12-pack' | '24-pack'
export type ProductSize = BagSize | CigaretteSize

export interface ProductVariant {
  type: ProductType
  size: ProductSize
  label: LocalizedString
  price: number // in cents
}

export const productVariants: ProductVariant[] = [
  { type: 'bag',        size: '0.5oz',   label: { en: '½ oz loose blend',   es: 'Mezcla suelta ½ oz'    }, price: 4500  },
  { type: 'bag',        size: '2oz',     label: { en: '2 oz loose blend',   es: 'Mezcla suelta 2 oz'    }, price: 12000 },
  { type: 'cigarettes', size: '12-pack', label: { en: '12 Cigarettes',      es: 'Pack 12 Cigarrillos'   }, price: 3000  },
  { type: 'cigarettes', size: '24-pack', label: { en: '24 Cigarettes',      es: 'Pack 24 Cigarrillos'   }, price: 5000  },
]

export interface CartItem {
  blend: Blend
  variant: ProductVariant
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (blend: Blend, variant: ProductVariant, quantity?: number) => void
  removeFromCart: (blendId: string, variantSize: ProductSize) => void
  updateQuantity: (blendId: string, variantSize: ProductSize, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  
  const addToCart = useCallback((blend: Blend, variant: ProductVariant, quantity: number = 1) => {
    setItems(prev => {
      const existingItem = prev.find(
        item => item.blend.id === blend.id && item.variant.size === variant.size
      )
      if (existingItem) {
        return prev.map(item =>
          item.blend.id === blend.id && item.variant.size === variant.size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { blend, variant, quantity }]
    })
  }, [])
  
  const removeFromCart = useCallback((blendId: string, variantSize: ProductSize) => {
    setItems(prev => prev.filter(
      item => !(item.blend.id === blendId && item.variant.size === variantSize)
    ))
  }, [])
  
  const updateQuantity = useCallback((blendId: string, variantSize: ProductSize, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(blendId, variantSize)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.blend.id === blendId && item.variant.size === variantSize
          ? { ...item, quantity }
          : item
      )
    )
  }, [removeFromCart])
  
  const clearCart = useCallback(() => {
    setItems([])
  }, [])
  
  const getTotalItems = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])
  
  const getTotalPrice = useCallback(() => {
    return items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0)
  }, [items])
  
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function formatPrice(centavos: number): string {
  return `Q${(centavos / 100).toFixed(2)}`
}

export function getVariantBySize(size: ProductSize): ProductVariant | undefined {
  return productVariants.find(v => v.size === size)
}
