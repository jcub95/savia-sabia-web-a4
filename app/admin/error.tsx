'use client'

import { useEffect } from 'react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Admin Error]', error)
  }, [error])

  return (
    <div className="p-8 max-w-md">
      <p className="text-sm font-semibold text-destructive mb-2">Error al cargar el panel</p>
      <p className="text-xs text-muted-foreground font-mono mb-4 break-all">{error.message}</p>
      {error.digest && (
        <p className="text-xs text-muted-foreground mb-4">digest: {error.digest}</p>
      )}
      <button
        onClick={reset}
        className="text-sm px-3 py-1.5 border border-border rounded-md hover:bg-secondary transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
