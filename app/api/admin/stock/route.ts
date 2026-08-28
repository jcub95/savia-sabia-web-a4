import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  // Auth check
  const serverClient = await createServerSupabaseClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()

  const { data, error } = await admin
    .from('products')
    .select('sku, name, format, size, stock, price_q, is_active')
    .order('sku')

  if (error) {
    console.error('Stock fetch error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ products: data })
}

export async function PATCH(req: NextRequest) {
  // Auth check
  const serverClient = await createServerSupabaseClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let updates: Array<{ sku: string; stock: number }>
  try {
    updates = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!Array.isArray(updates) || updates.length === 0) {
    return NextResponse.json({ error: 'Se requiere un array de actualizaciones' }, { status: 400 })
  }

  // Validate each entry
  for (const u of updates) {
    if (!u.sku || typeof u.sku !== 'string') {
      return NextResponse.json({ error: `SKU inválido: ${u.sku}` }, { status: 400 })
    }
    if (typeof u.stock !== 'number' || !Number.isInteger(u.stock) || u.stock < 0) {
      return NextResponse.json(
        { error: `Stock inválido para ${u.sku}: debe ser entero no negativo` },
        { status: 400 }
      )
    }
  }

  const admin = createAdminClient()

  // Update each SKU individually (Supabase doesn't support bulk upsert with different values per row easily)
  const results = await Promise.all(
    updates.map(({ sku, stock }) =>
      admin
        .from('products')
        .update({ stock })
        .eq('sku', sku)
        .select('sku, stock')
        .single()
    )
  )

  const errors = results.filter(r => r.error)
  if (errors.length > 0) {
    console.error('Stock update errors:', errors.map(r => r.error))
    return NextResponse.json({ error: 'Error actualizando algunos SKUs' }, { status: 500 })
  }

  return NextResponse.json({ updated: results.map(r => r.data) })
}
