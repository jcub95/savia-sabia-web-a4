import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  const serverClient = await createServerSupabaseClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()

  // Lo más escaso primero.
  const { data, error } = await admin
    .from('herb_inventory')
    .select('id, name_es, grams, updated_at')
    .order('grams', { ascending: true })

  if (error) {
    console.error('Herb inventory fetch error:', {
      code: error.code, message: error.message, details: error.details, hint: error.hint,
    })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ herbs: data ?? [] })
}

// Edición libre del Nivel 1: no pasa por ninguna función de producción.
export async function PATCH(req: NextRequest) {
  const serverClient = await createServerSupabaseClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let updates: Array<{ id: string; grams: number }>
  try {
    updates = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!Array.isArray(updates) || updates.length === 0) {
    return NextResponse.json({ error: 'Se requiere un array de actualizaciones' }, { status: 400 })
  }

  for (const u of updates) {
    if (!u.id || typeof u.id !== 'string') {
      return NextResponse.json({ error: `Hierba inválida: ${u.id}` }, { status: 400 })
    }
    if (typeof u.grams !== 'number' || !Number.isFinite(u.grams) || u.grams < 0) {
      return NextResponse.json(
        { error: `Gramos inválidos para ${u.id}: debe ser un número no negativo` },
        { status: 400 }
      )
    }
  }

  const admin = createAdminClient()

  const results = await Promise.all(
    updates.map(({ id, grams }) =>
      admin
        .from('herb_inventory')
        .update({ grams, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('id, grams')
        .single()
    )
  )

  const failed = results.filter(r => r.error)
  if (failed.length > 0) {
    console.error('Herb update errors:', failed.map(r => r.error))
    return NextResponse.json({ error: 'Error actualizando algunas hierbas' }, { status: 500 })
  }

  return NextResponse.json({ updated: results.map(r => r.data) })
}
