import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const VALID_STATUSES = [
  'pendiente',
  'pagado',
  'preparacion',
  'enviado',
  'entregado',
  'cancelado',
] as const

type OrderStatus = (typeof VALID_STATUSES)[number]

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Auth check
  const serverClient = await createServerSupabaseClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  let body: { status?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { status } = body

  if (!status || !(VALID_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json(
      { error: `Estado inválido. Valores permitidos: ${VALID_STATUSES.join(', ')}` },
      { status: 400 }
    )
  }

  const admin = createAdminClient()

  const { data, error } = await admin
    .from('orders')
    .update({ status: status as OrderStatus, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(`
      id, order_number, status, stock_deducted, stock_deducted_at,
      order_items (
        id, quantity, unit_price_q,
        products ( sku, name )
      )
    `)
    .single()

  if (error) {
    console.error('Order status update error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
