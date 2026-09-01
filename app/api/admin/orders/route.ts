import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const PAGE_SIZE = 25

export async function GET(req: NextRequest) {
  // Auth check
  const serverClient = await createServerSupabaseClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') || ''
  const search = searchParams.get('search') || ''
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))

  const admin = createAdminClient()

  // Join order_items → products via product_id FK (order_items_product_id_fkey)
  let query = admin
    .from('orders')
    .select(
      `id, order_number, created_at, status, delivery_type, payment_method,
       shipping_q, total_q, notes,
       contact_name, contact_phone, contact_email,
       ship_department, ship_municipio, ship_address_line,
       stock_deducted, stock_deducted_at,
       order_items (
         id, quantity, unit_price_q,
         products ( sku, name, format, size )
       )`,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

  if (status) query = query.eq('status', status)
  if (search) {
    query = query.or(
      `order_number.ilike.%${search}%,contact_name.ilike.%${search}%,contact_phone.ilike.%${search}%`
    )
  }

  const { data: orders, error, count } = await query

  if (error) {
    console.error('Admin orders fetch error:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    })
    return NextResponse.json(
      {
        error: error.message,
        ...(process.env.NODE_ENV !== 'production' && { debug: error }),
      },
      { status: 500 }
    )
  }

  return NextResponse.json({
    orders: orders ?? [],
    total: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
  })
}
