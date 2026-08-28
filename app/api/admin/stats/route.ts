import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  // Auth check
  const serverClient = await createServerSupabaseClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()

  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [
    { count: pendientes },
    { count: ordenesHoy },
    { data: ordenesMes },
    { count: sinStock },
  ] = await Promise.all([
    admin.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pendiente'),
    admin.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', startOfDay),
    admin.from('orders').select('total_q').neq('status', 'cancelado').gte('created_at', startOfMonth),
    admin.from('products').select('*', { count: 'exact', head: true }).eq('stock', 0),
  ])

  const ingresosMes = (ordenesMes ?? []).reduce(
    (sum: number, o: { total_q: number }) => sum + (o.total_q ?? 0),
    0
  )

  return NextResponse.json({
    pendientes: pendientes ?? 0,
    ordenesHoy: ordenesHoy ?? 0,
    ingresosMes,
    sinStock: sinStock ?? 0,
  })
}
