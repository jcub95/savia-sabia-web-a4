'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────

interface OrderItem {
  id: string
  quantity: number
  unit_price_q: number
  products: { sku: string; name: string; format: string; size: string } | null
}

interface Order {
  id: string
  order_number: string
  created_at: string
  status: string
  delivery_type: string
  payment_method: string
  shipping_q: number | null
  total_q: number
  notes: string | null
  contact_name: string | null
  contact_phone: string | null
  contact_email: string | null
  ship_department: string | null
  ship_municipio: string | null
  ship_address_line: string | null
  order_items: OrderItem[]
}

interface Stats {
  pendientes: number
  ordenesHoy: number
  ingresosMes: number
  sinStock: number
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  pagado: 'Pagado',
  preparacion: 'En preparación',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
}

const STATUS_COLORS: Record<string, string> = {
  pendiente: '#B07B2E',
  pagado: '#3B6FD4',
  preparacion: '#9E7FCB',
  enviado: '#3BAEC6',
  entregado: '#5FAE55',
  cancelado: '#8A8A8A',
}

const TABS = [
  { value: '', label: 'Todas' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'pagado', label: 'Pagado' },
  { value: 'preparacion', label: 'Preparación' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'entregado', label: 'Entregado' },
]

const PAGE_SIZE = 25

// ─── Helpers ─────────────────────────────────────────────────────────────────

function relativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)
  if (mins < 60) return `hace ${mins} min`
  if (hours < 24) return `hace ${hours}h`
  if (days === 1) return 'ayer'
  if (days < 7) return `hace ${days} días`
  return new Date(iso).toLocaleDateString('es-GT', { day: '2-digit', month: 'short' })
}

function fq(amount: number | null | undefined): string {
  return `Q${(amount ?? 0).toFixed(2)}`
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? '#8A8A8A'
  return (
    <span
      className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${color}22`, color }}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

function StatCard({
  label,
  value,
  isAmount,
}: {
  label: string
  value: number
  isAmount?: boolean
}) {
  return (
    <div className="border border-border rounded-lg p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-semibold text-foreground">
        {isAmount ? `Q${value.toFixed(2)}` : value}
      </p>
    </div>
  )
}

// ─── Row ─────────────────────────────────────────────────────────────────────

function OrderRow({
  order,
  expanded,
  onToggle,
  onStatusChange,
  statusChanging,
}: {
  order: Order
  expanded: boolean
  onToggle: () => void
  onStatusChange: (id: string, status: string, items: OrderItem[]) => void
  statusChanging: boolean
}) {
  const [copied, setCopied] = useState(false)

  function copyPhone() {
    if (!order.contact_phone) return
    navigator.clipboard.writeText(order.contact_phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const waUrl = order.contact_phone
    ? `https://wa.me/502${order.contact_phone}`
    : null

  const subtotalQ = order.order_items.reduce(
    (s, i) => s + i.unit_price_q * i.quantity,
    0
  )

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Collapsed row */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/50 transition-colors"
      >
        <span className="font-mono text-sm font-semibold text-foreground min-w-[80px]">
          {order.order_number}
        </span>
        <span className="flex-1 text-sm text-foreground truncate">
          {order.contact_name ?? '—'}
        </span>
        <span className="text-sm font-medium text-foreground shrink-0">
          {fq(order.total_q)}
        </span>
        <StatusBadge status={order.status} />
        <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
          {relativeDate(order.created_at)}
        </span>
        <svg
          className={`size-4 text-muted-foreground shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-border px-4 py-4 space-y-4 bg-secondary/20">
          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Teléfono</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground font-mono">
                  {order.contact_phone ?? '—'}
                </span>
                {order.contact_phone && (
                  <button
                    type="button"
                    onClick={copyPhone}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? '✓' : 'Copiar'}
                  </button>
                )}
                {waUrl && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-0.5 rounded bg-[#25D366]/15 text-[#128C7E] hover:bg-[#25D366]/25 transition-colors"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Correo</p>
              <p className="text-sm text-foreground">{order.contact_email ?? '—'}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Entrega</p>
              {order.delivery_type === 'envio' ? (
                <p className="text-sm text-foreground">
                  {[order.ship_address_line, order.ship_municipio, order.ship_department]
                    .filter(Boolean)
                    .join(', ') || 'Sin dirección'}
                </p>
              ) : (
                <p className="text-sm text-foreground">Recoge en San Lucas Sacatepéquez</p>
              )}
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Pago</p>
              <p className="text-sm text-foreground">
                {order.payment_method === 'transferencia'
                  ? 'Transferencia o depósito'
                  : 'Efectivo contra entrega'}
              </p>
            </div>
          </div>

          {/* Products table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs text-muted-foreground font-normal pb-1.5">
                    Producto
                  </th>
                  <th className="text-right text-xs text-muted-foreground font-normal pb-1.5">
                    Cant.
                  </th>
                  <th className="text-right text-xs text-muted-foreground font-normal pb-1.5">
                    P. unit.
                  </th>
                  <th className="text-right text-xs text-muted-foreground font-normal pb-1.5">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.order_items.map(item => (
                  <tr key={item.id} className="border-b border-border/50">
                    <td className="py-1.5 text-foreground">
                      {item.products
                        ? `${item.products.name} · ${item.products.format} ${item.products.size}`
                        : `(producto #${item.id.slice(0, 6)})`}
                    </td>
                    <td className="py-1.5 text-right text-muted-foreground">{item.quantity}</td>
                    <td className="py-1.5 text-right text-muted-foreground">
                      {fq(item.unit_price_q)}
                    </td>
                    <td className="py-1.5 text-right text-foreground font-medium">
                      {fq(item.unit_price_q * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="text-sm space-y-1 max-w-xs ml-auto">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{fq(subtotalQ)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Envío</span>
              <span>{order.shipping_q === 0 ? 'Gratis' : fq(order.shipping_q)}</span>
            </div>
            <div className="flex justify-between font-semibold text-foreground pt-1 border-t border-border">
              <span>Total</span>
              <span>{fq(order.total_q)}</span>
            </div>
          </div>

          {/* Client notes */}
          {order.notes && (
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Notas del cliente</p>
              <p className="text-sm text-foreground">{order.notes}</p>
            </div>
          )}

          {/* Status selector */}
          <div className="flex items-center gap-3 pt-1">
            <label className="text-xs text-muted-foreground shrink-0">Estado:</label>
            <select
              value={order.status}
              disabled={statusChanging}
              onChange={e => onStatusChange(order.id, e.target.value, order.order_items)}
              className="text-sm border border-border rounded-md px-2 py-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
            >
              {Object.entries(STATUS_LABELS).map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
            {statusChanging && (
              <span className="text-xs text-muted-foreground">Guardando…</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<Stats>({
    pendientes: 0,
    ordenesHoy: 0,
    ingresosMes: 0,
    sinStock: 0,
  })
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [changingId, setChangingId] = useState<string | null>(null)
  const [stockAlert, setStockAlert] = useState<{
    items: OrderItem[]
    orderNumber: string
  } | null>(null)

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchStats = useCallback(async () => {
    const res = await fetch('/api/admin/stats')
    if (res.ok) setStats(await res.json())
  }, [])

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setFetchError(null)
    const params = new URLSearchParams({ page: String(page) })
    if (activeTab) params.set('status', activeTab)
    if (search) params.set('search', search)

    try {
      const res = await fetch(`/api/admin/orders?${params}`)
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders ?? [])
        setTotal(data.total ?? 0)
      } else {
        const data = await res.json().catch(() => ({}))
        setFetchError(data.error ?? `Error ${res.status}`)
      }
    } catch (err) {
      setFetchError('Error de red al cargar órdenes.')
    }
    setLoading(false)
  }, [activeTab, search, page])

  useEffect(() => { fetchStats() }, [fetchStats])
  useEffect(() => { fetchOrders() }, [fetchOrders])

  // Debounce search
  function handleSearchInput(val: string) {
    setSearchInput(val)
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      setSearch(val)
      setPage(1)
    }, 350)
  }

  function handleTabChange(tab: string) {
    setActiveTab(tab)
    setPage(1)
    setExpandedId(null)
  }

  async function handleStatusChange(id: string, newStatus: string, items: OrderItem[]) {
    setChangingId(id)
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) {
      const order = orders.find(o => o.id === id)
      if (newStatus === 'pagado' && order) {
        setStockAlert({ items, orderNumber: order.order_number })
      }
      await Promise.all([fetchOrders(), fetchStats()])
    }
    setChangingId(null)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="space-y-6">
      {/* Stock reminder alert */}
      {stockAlert && (
        <div className="border border-[#B07B2E]/30 bg-[#B07B2E]/10 rounded-lg px-4 py-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#B07B2E]">
              Orden {stockAlert.orderNumber} marcada como Pagado
            </p>
            <p className="text-xs text-[#B07B2E]/80 mt-0.5">
              Recuerda descontar el stock:{' '}
              {stockAlert.items
                .map(i => `${i.products?.sku ?? '—'} × ${i.quantity}`)
                .join(', ')}
            </p>
            <Link
              href="/admin/inventario"
              className="text-xs underline text-[#B07B2E]/80 hover:text-[#B07B2E] mt-1 inline-block"
            >
              Ir a inventario →
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setStockAlert(null)}
            className="text-[#B07B2E]/60 hover:text-[#B07B2E] text-lg leading-none shrink-0"
          >
            ×
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Pendientes" value={stats.pendientes} />
        <StatCard label="Órdenes hoy" value={stats.ordenesHoy} />
        <StatCard label="Ingresos del mes" value={stats.ingresosMes} isAmount />
        <StatCard label="SKUs agotados" value={stats.sinStock} />
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {TABS.map(tab => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleTabChange(tab.value)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                activeTab === tab.value
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={searchInput}
          onChange={e => handleSearchInput(e.target.value)}
          placeholder="Buscar por # orden, nombre o teléfono…"
          className="w-full sm:w-80 px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="py-16 text-center text-sm text-muted-foreground">Cargando…</div>
      ) : fetchError ? (
        <div className="py-8 text-center">
          <p className="text-sm text-destructive mb-2">Error al cargar órdenes</p>
          <p className="text-xs text-muted-foreground font-mono mb-4">{fetchError}</p>
          <button
            onClick={fetchOrders}
            className="text-sm px-3 py-1.5 border border-border rounded-md hover:bg-secondary transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          Sin órdenes que coincidan.
        </div>
      ) : (
        <div className="space-y-2">
          {orders.map(order => (
            <OrderRow
              key={order.id}
              order={order}
              expanded={expandedId === order.id}
              onToggle={() => setExpandedId(prev => (prev === order.id ? null : order.id))}
              onStatusChange={handleStatusChange}
              statusChanging={changingId === order.id}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {total} órdenes · página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 border border-border rounded-md text-sm disabled:opacity-40 hover:bg-secondary transition-colors"
            >
              ← Anterior
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 border border-border rounded-md text-sm disabled:opacity-40 hover:bg-secondary transition-colors"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
