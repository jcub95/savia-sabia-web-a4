'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchAllStock, buildSku, type StockMap } from './stock'
import type { BlendId } from './herbs-data'
import type { ProductSize } from './cart-context'

interface StockContextType {
  stock: StockMap
  isLoading: boolean
  getStock: (blendId: BlendId, size: ProductSize) => number
  refresh: () => Promise<void>
}

const StockContext = createContext<StockContextType | undefined>(undefined)

export function StockProvider({ children }: { children: ReactNode }) {
  const [stock, setStock] = useState<StockMap>({})
  const [isLoading, setIsLoading] = useState(true)

  const load = async () => {
    setIsLoading(true)
    const map = await fetchAllStock()
    setStock(map)
    setIsLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const getStock = (blendId: BlendId, size: ProductSize): number => {
    const sku = buildSku(blendId, size)
    return stock[sku] ?? 0
  }

  return (
    <StockContext.Provider value={{ stock, isLoading, getStock, refresh: load }}>
      {children}
    </StockContext.Provider>
  )
}

export function useStock() {
  const ctx = useContext(StockContext)
  if (!ctx) throw new Error('useStock must be used within StockProvider')
  return ctx
}
