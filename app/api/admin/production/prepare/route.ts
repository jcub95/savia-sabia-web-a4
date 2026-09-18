import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// La función de Postgres hace toda la validación y la aritmética.
// Aquí solo se transporta el resultado.
interface PrepareResult {
  ok: boolean
  error?: string
  faltantes?: Array<{ hierba: string; necesita: number; disponible: number }>
  blend?: string
  oz?: number
}

export async function POST(req: NextRequest) {
  const serverClient = await createServerSupabaseClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: { blend_id?: string; oz?: number }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { blend_id, oz } = body

  if (!blend_id || typeof blend_id !== 'string') {
    return NextResponse.json({ error: 'Mezcla inválida' }, { status: 400 })
  }
  if (typeof oz !== 'number' || !Number.isFinite(oz) || oz <= 0) {
    return NextResponse.json({ error: 'Las onzas deben ser un número mayor a cero' }, { status: 400 })
  }

  const admin = createAdminClient()

  const { data, error } = await admin.rpc('preparar_mezcla', {
    p_blend: blend_id,
    p_oz: oz,
  })

  if (error) {
    console.error('preparar_mezcla RPC error:', {
      code: error.code, message: error.message, details: error.details, hint: error.hint,
    })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const result = data as unknown as PrepareResult

  // Insuficiente inventario: la función lo reporta como ok:false, no como error SQL.
  if (!result?.ok) {
    return NextResponse.json(result, { status: 409 })
  }

  return NextResponse.json(result)
}
