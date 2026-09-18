import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  const serverClient = await createServerSupabaseClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()

  // Receta anidada vía blend_recipes → herb_inventory, para poder previsualizar
  // el consumo sin una segunda llamada.
  const { data, error } = await admin
    .from('blend_bulk')
    .select(`
      id, name_es, ounces, updated_at,
      blend_recipes (
        grams_per_oz,
        herb_inventory ( id, name_es, grams )
      )
    `)
    .order('name_es')

  if (error) {
    console.error('Blend bulk fetch error:', {
      code: error.code, message: error.message, details: error.details, hint: error.hint,
    })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ blends: data ?? [] })
}
