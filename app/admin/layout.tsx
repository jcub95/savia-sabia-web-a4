import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

async function signOut() {
  'use server'
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user = null
  try {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (err) {
    console.error('[Admin Layout] session check failed:', err)
  }

  // No user → only render children (middleware already handles the redirect,
  // but this covers the /admin/login case which bypasses the nav)
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <nav className="flex items-center gap-5">
            <span className="font-serif text-sm font-semibold text-foreground select-none">
              Admin
            </span>
            <Link
              href="/admin"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Órdenes
            </Link>
            <Link
              href="/admin/inventario"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Inventario
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden sm:block truncate max-w-[180px]">
              {user.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
