'use client'

import { useState, useEffect } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Product {
  sku: string
  name: string
  format: string
  size: string
  stock: number
  price_q: number
  is_active: boolean
}

// ─── Blend grouping ───────────────────────────────────────────────────────────

const SKU_PREFIX_LABEL: Record<string, string> = {
  SUAVIDAD: 'Suavidad',
  NUTRE: 'Nutre el Alma',
  PROTECCION: 'Protección',
  ENFOQUE: 'Enfoque',
  SUENO: 'Sueño Profundo',
  CLARIDAD: 'Claridad Pulmonar',
}

function getBlendGroup(sku: string): string {
  const prefix = sku.split('-')[0]
  return SKU_PREFIX_LABEL[prefix] ?? prefix
}

function stockPriority(stock: number): number {
  if (stock < 0) return 0
  if (stock === 0) return 1
  if (stock <= 2) return 2
  return 3
}

function groupProducts(products: Product[]): Array<{ blend: string; items: Product[] }> {
  const map = new Map<string, Product[]>()
  const order = Object.values(SKU_PREFIX_LABEL)

  for (const p of products) {
    const blend = getBlendGroup(p.sku)
    if (!map.has(blend)) map.set(blend, [])
    map.get(blend)!.push(p)
  }

  return order
    .filter(b => map.has(b))
    .map(blend => ({
      blend,
      items: [...map.get(blend)!].sort((a, b) => stockPriority(a.stock) - stockPriority(b.stock)),
    }))
}

function formatLabel(p: Product): string {
  const fmt = p.format === 'suelta' ? 'Suelta' : 'Cigarrillos'
  return `${fmt} · ${p.size}`
}

// ─── Stock input row ──────────────────────────────────────────────────────────

function StockRow({
  product,
  draft,
  onChange,
}: {
  product: Product
  draft: number
  onChange: (sku: string, value: number) => void
}) {
  const isDirty = draft !== product.stock
  const isOut = draft === 0
  const isLow = draft > 0 && draft <= 2

  return (
    <tr
      className={`border-b border-border/50 ${
        isOut ? 'bg-destructive/5' : isLow ? 'bg-[#B07B2E]/5' : ''
      }`}
    >
      <td className="py-2.5 pr-3">
        <p className="text-sm text-foreground">{formatLabel(product)}</p>
        <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
      </td>
      <td className="py-2.5 pr-3">
        <p className="text-xs text-muted-foreground">Q{product.price_q.toFixed(2)}</p>
      </td>
      <td className="py-2.5">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Restar uno"
            disabled={draft <= 0}
            onClick={() => onChange(product.sku, Math.max(0, draft - 1))}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-border rounded-md text-sm text-foreground hover:bg-secondary disabled:opacity-30 transition-colors"
          >
            −
          </button>

          <input
            type="number"
            min={0}
            value={draft}
            onChange={e => {
              const val = parseInt(e.target.value, 10)
              if (!isNaN(val)) onChange(product.sku, val)
            }}
            className={`w-14 text-center text-sm border rounded-md px-1 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring ${
              isOut
                ? 'border-destructive text-destructive'
                : isLow
                ? 'border-[#B07B2E] text-[#B07B2E]'
                : 'border-border text-foreground'
            } ${isDirty ? 'font-semibold' : ''}`}
          />

          <button
            type="button"
            aria-label="Sumar uno"
            onClick={() => onChange(product.sku, draft + 1)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-border rounded-md text-sm text-foreground hover:bg-secondary transition-colors"
          >
            +
          </button>

          {isDirty && (
            <span className="text-xs text-muted-foreground ml-1">
              era {product.stock}
            </span>
          )}
        </div>
      </td>
    </tr>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminInventarioPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [drafts, setDrafts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadProducts() {
    setLoading(true)
    const res = await fetch('/api/admin/stock')
    if (res.ok) {
      const data = await res.json()
      const prods: Product[] = data.products ?? []
      setProducts(prods)
      setDrafts(Object.fromEntries(prods.map(p => [p.sku, p.stock])))
    }
    setLoading(false)
  }

  useEffect(() => { loadProducts() }, [])

  function handleChange(sku: string, value: number) {
    setDrafts(prev => ({ ...prev, [sku]: value }))
    setSaved(false)
  }

  function handleUndo() {
    setDrafts(Object.fromEntries(products.map(p => [p.sku, p.stock])))
    setSaved(false)
  }

  const dirtyEntries = products.filter(p => drafts[p.sku] !== p.stock)
  const hasDirty = dirtyEntries.length > 0

  async function handleSave() {
    if (!hasDirty) return
    setSaving(true)
    setError(null)

    const updates = dirtyEntries.map(p => ({ sku: p.sku, stock: drafts[p.sku] }))

    const res = await fetch('/api/admin/stock', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })

    if (res.ok) {
      setSaved(true)
      await loadProducts()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Error guardando cambios.')
    }
    setSaving(false)
  }

  const groups = groupProducts(products)

  return (
    <div className="space-y-5">
      {/* Context note */}
      <div className="border border-border rounded-lg px-4 py-3 bg-secondary/30">
        <p className="text-sm text-muted-foreground">
          El stock se descuenta automáticamente al confirmar pagos. Edita aquí únicamente
          para registrar producción nueva o corregir un conteo.
        </p>
      </div>

      {/* Sticky save bar */}
      <div className="sticky top-16 z-10 -mx-4 px-4 py-3 bg-background/95 backdrop-blur border-b border-border flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {hasDirty
            ? `${dirtyEntries.length} SKU${dirtyEntries.length > 1 ? 's' : ''} modificado${dirtyEntries.length > 1 ? 's' : ''}`
            : saved
            ? '✓ Guardado'
            : 'Sin cambios pendientes'}
        </p>
        <div className="flex items-center gap-2">
          {hasDirty && (
            <button
              type="button"
              onClick={handleUndo}
              disabled={saving}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              Deshacer
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasDirty || saving}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Guardando…' : `Guardar${hasDirty ? ` (${dirtyEntries.length})` : ''}`}
          </button>
        </div>
      </div>

      {error && (
        <div className="border border-destructive/30 bg-destructive/10 rounded-md px-4 py-2">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-sm text-muted-foreground">Cargando…</div>
      ) : (
        <div className="space-y-6">
          {groups.map(({ blend, items }) => (
            <div key={blend}>
              <h2 className="font-serif text-base font-semibold text-foreground mb-2">
                {blend}
              </h2>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left text-xs text-muted-foreground font-normal px-4 py-2">
                        Formato · Tamaño
                      </th>
                      <th className="text-left text-xs text-muted-foreground font-normal pr-3 py-2">
                        Precio
                      </th>
                      <th className="text-left text-xs text-muted-foreground font-normal pr-4 py-2">
                        Stock
                      </th>
                    </tr>
                  </thead>
                  <tbody className="px-4">
                    {items.map(p => {
                      const draftVal = drafts[p.sku] ?? p.stock
                      const isNegative = draftVal < 0
                      const isZero = draftVal === 0
                      const isLow = draftVal > 0 && draftVal <= 2

                      return (
                      <tr
                        key={p.sku}
                        className={`border-b border-border/50 last:border-0 ${
                          isNegative ? 'bg-destructive/8' : isZero ? 'bg-[#B07B2E]/5' : ''
                        }`}
                      >
                        <td className="py-2.5 px-4 pr-3">
                          <p className="text-sm text-foreground">{formatLabel(p)}</p>
                          <p className="text-xs text-muted-foreground font-mono">{p.sku}</p>
                        </td>
                        <td className="py-2.5 pr-3">
                          <p className="text-sm text-muted-foreground">Q{p.price_q.toFixed(2)}</p>
                        </td>
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              aria-label="Restar uno"
                              onClick={() =>
                                handleChange(p.sku, (drafts[p.sku] ?? p.stock) - 1)
                              }
                              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-border rounded-md text-sm text-foreground hover:bg-secondary transition-colors"
                            >
                              −
                            </button>

                            <input
                              type="number"
                              value={drafts[p.sku] ?? p.stock}
                              onChange={e => {
                                const val = parseInt(e.target.value, 10)
                                if (!isNaN(val)) handleChange(p.sku, val)
                              }}
                              className={`w-14 text-center text-sm border rounded-md px-1 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring ${
                                (drafts[p.sku] ?? p.stock) < 0
                                  ? 'border-destructive text-destructive font-bold'
                                  : (drafts[p.sku] ?? p.stock) === 0
                                  ? 'border-destructive text-destructive'
                                  : (drafts[p.sku] ?? p.stock) <= 2
                                  ? 'border-[#B07B2E] text-[#B07B2E]'
                                  : 'border-border text-foreground'
                              } ${drafts[p.sku] !== p.stock ? 'font-semibold' : ''}`}
                            />

                            <button
                              type="button"
                              aria-label="Sumar uno"
                              onClick={() => handleChange(p.sku, (drafts[p.sku] ?? p.stock) + 1)}
                              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-border rounded-md text-sm text-foreground hover:bg-secondary transition-colors"
                            >
                              +
                            </button>

                            {draftVal < 0 && (
                              <span className="text-xs text-destructive font-medium ml-1">
                                Descuadre
                              </span>
                            )}

                            {drafts[p.sku] !== p.stock && draftVal >= 0 && (
                              <span className="text-xs text-muted-foreground ml-1">
                                era {p.stock}
                              </span>
                            )}
                          </div>

                          {/* Stock state label */}
                          {isNegative && (
                            <p className="text-xs text-destructive font-medium mt-1">
                              Faltan {Math.abs(draftVal)} unidades
                            </p>
                          )}
                          {isZero && (
                            <p className="text-xs text-[#B07B2E] font-medium mt-1">Agotado</p>
                          )}
                          {isLow && (
                            <p className="text-xs text-[#B07B2E]/70 mt-1">Bajo</p>
                          )}
                        </td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
