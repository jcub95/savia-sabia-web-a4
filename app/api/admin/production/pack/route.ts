import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// La función de Postgres hace toda la validación y la aritmética.
// Aquí solo se transporta el resultado.
interface PackResult {
  ok: boolean
  error?: string
  necesita_oz?: number
  disponible_oz?: number
  sku?: string
  unidades?: number
}

export async function POST(req: NextRequest) {
  const serverClient = await createServerSupabaseClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: { sku?: string; unidades?: number }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { sku, unidades } = body

  if (!sku || typeof sku !== 'string') {
    return NextResponse.json({ error: 'SKU inválido' }, { status: 400 })
  }
  if (typeof unidades !== 'number' || !Number.isInteger(unidades) || unidades <= 0) {
    return NextResponse.json(
      { error: 'Las unidades deben ser un entero mayor a cero' },
      { status: 400 }
    )
  }

  const admin = createAdminClient()

  const { data, error } = await admin.rpc('empacar_producto', {
    p_sku: sku,
    p_unidades: unidades,
  })

  if (error) {
    console.error('empacar_producto RPC error:', {
      code: error.code, message: error.message, details: error.details, hint: error.hint,
    })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const result = data as unknown as PackResult

  // Granel insuficiente: la función lo reporta como ok:false, no como error SQL.
  if (!result?.ok) {
    return NextResponse.json(result, { status: 409 })
  }

  return NextResponse.json(result)
}
