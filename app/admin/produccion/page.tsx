'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { blendHex } from '@/lib/blend-colors'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Herb {
  id: string
  name_es: string
  grams: number
}

interface RecipeRow {
  grams_per_oz: number
  herb_inventory: { id: string; name_es: string; grams: number } | null
}

interface BlendBulk {
  id: string
  name_es: string
  ounces: number
  blend_recipes: RecipeRow[]
}

interface Product {
  sku: string
  name: string
  format: string
  size: string
  stock: number
  blend_id: string | null
  oz_per_unit: number | null
}

/** Faltante reportado por preparar_mezcla cuando no alcanza el inventario. */
interface Faltante {
  hierba: string
  necesita: number
  disponible: number
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** Bajo este peso una hierba no alcanza para un lote pequeño de las recetas que más la usan. */
const LOW_HERB_GRAMS = 30

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmtG = (n: number) => `${n.toFixed(1)} g`
const fmtOz = (n: number) => `${n.toFixed(2)} oz`

function formatLabel(p: Product): string {
  const fmt = p.format === 'suelta' ? 'Suelta' : 'Cigarrillos'
  return `${fmt} · ${p.size}`
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AdminProduccionPage() {
  const [herbs, setHerbs] = useState<Herb[]>([])
  const [blends, setBlends] = useState<BlendBulk[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Sección 1
  const [drafts, setDrafts] = useState<Record<string, number>>({})
  const [savingHerbs, setSavingHerbs] = useState(false)

  // Sección 2
  const [prepareBlend, setPrepareBlend] = useState<BlendBulk | null>(null)
  const [prepareOz, setPrepareOz] = useState('')
  const [preparing, setPreparing] = useState(false)
  const [prepareError, setPrepareError] = useState<string | null>(null)
  const [prepareFaltantes, setPrepareFaltantes] = useState<Faltante[] | null>(null)

  // Sección 3
  const [packSku, setPackSku] = useState('')
  const [packUnits, setPackUnits] = useState('')
  const [packing, setPacking] = useState(false)
  const [packError, setPackError] = useState<string | null>(null)

  const [flash, setFlash] = useState<string | null>(null)

  // ── Carga ──────────────────────────────────────────────────────────────────

  const loadHerbs = useCallback(async () => {
    const res = await fetch('/api/admin/production/herbs')
    if (!res.ok) throw new Error('No se pudieron cargar las hierbas')
    const data = await res.json()
    const rows: Herb[] = data.herbs ?? []
    setHerbs(rows)
    setDrafts(Object.fromEntries(rows.map(h => [h.id, h.grams])))
  }, [])

  const loadBlends = useCallback(async () => {
    const res = await fetch('/api/admin/production/blends')
    if (!res.ok) throw new Error('No se pudo cargar la mezcla a granel')
    const data = await res.json()
    setBlends(data.blends ?? [])
  }, [])

  const loadProducts = useCallback(async () => {
    const res = await fetch('/api/admin/stock')
    if (!res.ok) throw new Error('No se pudieron cargar los productos')
    const data = await res.json()
    setProducts(data.products ?? [])
  }, [])

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await Promise.all([loadHerbs(), loadBlends(), loadProducts()])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de red')
    }
    setLoading(false)
  }, [loadHerbs, loadBlends, loadProducts])

  useEffect(() => { loadAll() }, [loadAll])

  function flashMessage(msg: string) {
    setFlash(msg)
    setTimeout(() => setFlash(null), 6000)
  }

  // ── Sección 1: guardar hierbas ─────────────────────────────────────────────

  const dirtyHerbs = herbs.filter(h => drafts[h.id] !== h.grams)

  async function saveHerbs() {
    if (dirtyHerbs.length === 0) return
    setSavingHerbs(true)
    setError(null)

    const res = await fetch('/api/admin/production/herbs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dirtyHerbs.map(h => ({ id: h.id, grams: drafts[h.id] }))),
    })

    if (res.ok) {
      await loadHerbs()
      flashMessage('Inventario de hierbas actualizado.')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Error guardando hierbas.')
    }
    setSavingHerbs(false)
  }

  // ── Sección 2: preview + preparar ──────────────────────────────────────────

  const ozValue = parseFloat(prepareOz)
  const ozValid = Number.isFinite(ozValue) && ozValue > 0

  /** Preview local: solo para anticipar el faltante. La verdad la tiene el servidor. */
  const preparePreview = prepareBlend
    ? prepareBlend.blend_recipes.map(r => {
        const herbId = r.herb_inventory?.id
        // Usa el valor guardado, no el borrador: es contra eso que valida el servidor.
        const available = herbs.find(h => h.id === herbId)?.grams ?? r.herb_inventory?.grams ?? 0
        const needed = ozValid ? r.grams_per_oz * ozValue : 0
        return {
          id: herbId ?? '',
          name: r.herb_inventory?.name_es ?? '—',
          needed,
          available,
          short: ozValid && needed > available,
        }
      })
    : []

  const previewHasShortage = preparePreview.some(r => r.short)

  function openPrepare(blend: BlendBulk) {
    setPrepareBlend(blend)
    setPrepareOz('')
    setPrepareError(null)
    setPrepareFaltantes(null)
  }

  async function confirmPrepare() {
    if (!prepareBlend || !ozValid) return
    setPreparing(true)
    setPrepareError(null)
    setPrepareFaltantes(null)

    const res = await fetch('/api/admin/production/prepare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blend_id: prepareBlend.id, oz: ozValue }),
    })
    const data = await res.json().catch(() => ({}))

    if (res.ok) {
      setPrepareBlend(null)
      // Cambiaron los dos niveles.
      await Promise.all([loadHerbs(), loadBlends()])
      flashMessage(`Se prepararon ${fmtOz(ozValue)} de ${prepareBlend.name_es}.`)
    } else {
      // El veredicto del servidor manda sobre el preview.
      setPrepareError(data.error ?? 'No se pudo preparar la mezcla.')
      setPrepareFaltantes(Array.isArray(data.faltantes) ? data.faltantes : null)
    }
    setPreparing(false)
  }

  // ── Sección 3: preview + empacar ───────────────────────────────────────────

  const packProduct = products.find(p => p.sku === packSku) ?? null
  const packUnitsValue = parseInt(packUnits, 10)
  const packUnitsValid = Number.isInteger(packUnitsValue) && packUnitsValue > 0

  const packBlend = packProduct?.blend_id
    ? blends.find(b => b.id === packProduct.blend_id) ?? null
    : null
  const packNeededOz =
    packProduct?.oz_per_unit != null && packUnitsValid
      ? packProduct.oz_per_unit * packUnitsValue
      : null
  const packAvailableOz = packBlend?.ounces ?? null
  const packShort =
    packNeededOz != null && packAvailableOz != null && packNeededOz > packAvailableOz

  async function confirmPack() {
    if (!packProduct || !packUnitsValid) return
    setPacking(true)
    setPackError(null)

    const res = await fetch('/api/admin/production/pack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sku: packProduct.sku, unidades: packUnitsValue }),
    })
    const data = await res.json().catch(() => ({}))

    if (res.ok) {
      const units = packUnitsValue
      const sku = packProduct.sku
      setPackUnits('')
      await Promise.all([loadBlends(), loadProducts()])
      flashMessage(`Se agregaron ${units} unidades de ${sku} al inventario.`)
    } else {
      const detail =
        data.necesita_oz != null && data.disponible_oz != null
          ? ` Necesita ${fmtOz(data.necesita_oz)}, disponible ${fmtOz(data.disponible_oz)}.`
          : ''
      setPackError((data.error ?? 'No se pudo empacar.') + detail)
    }
    setPacking(false)
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const maxGrams = Math.max(...herbs.map(h => h.grams), 1)
  const packableProducts = products.filter(p => p.blend_id && p.oz_per_unit != null)

  const productsByBlend = blends
    .map(b => ({ blend: b, items: packableProducts.filter(p => p.blend_id === b.id) }))
    .filter(g => g.items.length > 0)

  if (loading) {
    return <div className="py-16 text-center text-sm text-muted-foreground">Cargando…</div>
  }

  return (
    <div className="space-y-10">
      {flash && (
        <div className="border border-[#5FAE55]/40 bg-[#5FAE55]/10 rounded-lg px-4 py-2.5">
          <p className="text-sm text-[#3A7A35] font-medium">{flash}</p>
        </div>
      )}

      {error && (
        <div className="border border-destructive/40 bg-destructive/10 rounded-lg px-4 py-2.5">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* ══ SECCIÓN 1: HIERBAS ══════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="font-serif text-lg font-semibold text-foreground">Hierbas</h2>
            <p className="text-xs text-muted-foreground">
              Nivel 1 · edición libre. Lo más escaso aparece primero.
            </p>
          </div>
          <button
            type="button"
            onClick={saveHerbs}
            disabled={dirtyHerbs.length === 0 || savingHerbs}
            className="min-h-[44px] px-4 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors shrink-0"
          >
            {savingHerbs
              ? 'Guardando…'
              : `Guardar cambios${dirtyHerbs.length > 0 ? ` (${dirtyHerbs.length})` : ''}`}
          </button>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left text-xs text-muted-foreground font-normal px-4 py-2">
                  Hierba
                </th>
                <th className="text-left text-xs text-muted-foreground font-normal py-2 w-32">
                  Gramos
                </th>
                <th className="text-left text-xs text-muted-foreground font-normal px-4 py-2 hidden sm:table-cell">
                  Relativo
                </th>
              </tr>
            </thead>
            <tbody>
              {herbs.map(h => {
                const draft = drafts[h.id] ?? h.grams
                const isLow = draft < LOW_HERB_GRAMS
                const isDirty = draft !== h.grams
                return (
                  <tr
                    key={h.id}
                    className={`border-b border-border/50 last:border-0 ${isLow ? 'bg-destructive/[0.06]' : ''}`}
                  >
                    <td className="px-4 py-2.5">
                      <p className="text-sm text-foreground">{h.name_es}</p>
                      {isLow && (
                        <p className="text-xs text-destructive font-medium">Escasa</p>
                      )}
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          step="1"
                          inputMode="decimal"
                          value={draft}
                          onChange={e => {
                            const v = parseFloat(e.target.value)
                            if (!isNaN(v) && v >= 0) {
                              setDrafts(prev => ({ ...prev, [h.id]: v }))
                            } else if (e.target.value === '') {
                              setDrafts(prev => ({ ...prev, [h.id]: 0 }))
                            }
                          }}
                          className={`w-20 min-h-[44px] text-center text-sm border rounded-md px-1 bg-background focus:outline-none focus:ring-2 focus:ring-ring ${
                            isLow ? 'border-destructive text-destructive' : 'border-border text-foreground'
                          } ${isDirty ? 'font-semibold' : ''}`}
                        />
                        {isDirty && (
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            era {h.grams}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 hidden sm:table-cell">
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={isLow ? 'h-full bg-destructive/60' : 'h-full bg-accent/60'}
                          style={{ width: `${Math.min((draft / maxGrams) * 100, 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══ SECCIÓN 2: MEZCLA A GRANEL ══════════════════════════════════════ */}
      <section>
        <h2 className="font-serif text-lg font-semibold text-foreground mb-1">
          Mezcla a granel
        </h2>
        <p className="text-xs text-muted-foreground mb-3">
          Nivel 2 · preparar consume hierbas y produce granel.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {blends.map(b => (
            <div
              key={b.id}
              style={{ borderLeftColor: blendHex(b.id) }}
              className="border border-border border-l-4 rounded-lg p-4 bg-card"
            >
              <p className="text-sm text-foreground font-medium">{b.name_es}</p>
              <p className="text-2xl font-semibold text-foreground mt-1 mb-3">
                {fmtOz(b.ounces)}
              </p>
              <button
                type="button"
                onClick={() => openPrepare(b)}
                className="w-full min-h-[44px] border border-border rounded-md text-sm text-foreground hover:bg-secondary transition-colors"
              >
                Preparar mezcla
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECCIÓN 3: EMPACAR ══════════════════════════════════════════════ */}
      <section>
        <h2 className="font-serif text-lg font-semibold text-foreground mb-1">Empacar</h2>
        <p className="text-xs text-muted-foreground mb-3">
          Nivel 3 · empacar consume granel y produce unidades vendibles.
        </p>

        <div className="border border-border rounded-lg p-4 bg-card space-y-4 max-w-xl">
          <div>
            <label htmlFor="pack-sku" className="block text-xs text-muted-foreground mb-1.5">
              Producto
            </label>
            <select
              id="pack-sku"
              value={packSku}
              onChange={e => { setPackSku(e.target.value); setPackError(null) }}
              className="w-full min-h-[44px] text-sm border border-border rounded-md px-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Selecciona un producto…</option>
              {productsByBlend.map(({ blend, items }) => (
                <optgroup key={blend.id} label={blend.name_es}>
                  {items.map(p => (
                    <option key={p.sku} value={p.sku}>
                      {formatLabel(p)} — stock {p.stock}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pack-units" className="block text-xs text-muted-foreground mb-1.5">
              Unidades a empacar
            </label>
            <input
              id="pack-units"
              type="number"
              min={1}
              step="1"
              inputMode="numeric"
              value={packUnits}
              onChange={e => { setPackUnits(e.target.value); setPackError(null) }}
              placeholder="0"
              className="w-full min-h-[44px] text-sm border border-border rounded-md px-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Preview local */}
          {packProduct && packBlend && packNeededOz != null && (
            <p className={`text-sm ${packShort ? 'text-destructive' : 'text-muted-foreground'}`}>
              Esto consumirá {fmtOz(packNeededOz)} de granel de {packBlend.name_es}.{' '}
              Disponible: {fmtOz(packAvailableOz ?? 0)}.
            </p>
          )}

          {packError && <p className="text-sm text-destructive">{packError}</p>}

          <button
            type="button"
            onClick={confirmPack}
            disabled={!packProduct || !packUnitsValid || packShort || packing}
            className="w-full sm:w-auto min-h-[44px] px-5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {packing ? 'Empacando…' : 'Empacar'}
          </button>
        </div>
      </section>

      {/* ══ MODAL: PREPARAR ═════════════════════════════════════════════════ */}
      <Dialog
        open={prepareBlend !== null}
        onOpenChange={open => { if (!open) setPrepareBlend(null) }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">
              Preparar {prepareBlend?.name_es}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Ingresa las onzas a preparar y revisa el consumo de hierbas antes de confirmar.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label htmlFor="prep-oz" className="block text-xs text-muted-foreground mb-1.5">
                Onzas a preparar
              </label>
              <input
                id="prep-oz"
                type="number"
                min={0}
                step="0.25"
                inputMode="decimal"
                value={prepareOz}
                onChange={e => { setPrepareOz(e.target.value); setPrepareError(null); setPrepareFaltantes(null) }}
                placeholder="0"
                autoFocus
                className="w-full min-h-[44px] text-sm border border-border rounded-md px-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Preview en vivo de la receta */}
            <div className="border border-border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left text-xs text-muted-foreground font-normal px-3 py-1.5">
                      Hierba
                    </th>
                    <th className="text-right text-xs text-muted-foreground font-normal px-3 py-1.5">
                      Necesita
                    </th>
                    <th className="text-right text-xs text-muted-foreground font-normal px-3 py-1.5">
                      Disponible
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {preparePreview.map(r => (
                    <tr
                      key={r.id}
                      className={`border-b border-border/50 last:border-0 ${r.short ? 'bg-destructive/[0.08]' : ''}`}
                    >
                      <td className="px-3 py-2 text-sm text-foreground">{r.name}</td>
                      <td
                        className={`px-3 py-2 text-sm text-right ${r.short ? 'text-destructive font-semibold' : 'text-foreground'}`}
                      >
                        {ozValid ? fmtG(r.needed) : '—'}
                      </td>
                      <td className="px-3 py-2 text-sm text-right text-muted-foreground">
                        {fmtG(r.available)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {ozValid && previewHasShortage && !prepareError && (
              <p className="text-sm text-destructive">
                No hay suficiente inventario para esa cantidad.
              </p>
            )}

            {/* El servidor manda: puede rechazar aunque el preview se viera bien. */}
            {prepareError && (
              <div className="border border-destructive/40 bg-destructive/10 rounded-md px-3 py-2">
                <p className="text-sm text-destructive font-medium">{prepareError}</p>
                {prepareFaltantes && prepareFaltantes.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {prepareFaltantes.map((f, i) => (
                      <li key={i} className="text-xs text-destructive/85">
                        {f.hierba}: necesita {fmtG(f.necesita)}, disponible {fmtG(f.disponible)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setPrepareBlend(null)}
                className="min-h-[44px] px-4 border border-border rounded-md text-sm text-foreground hover:bg-secondary transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmPrepare}
                disabled={!ozValid || previewHasShortage || preparing}
                className="min-h-[44px] px-5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {preparing ? 'Preparando…' : 'Confirmar'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
