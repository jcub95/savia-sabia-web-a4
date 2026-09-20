'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

/**
 * Reemplaza al layout raíz cuando React falla al renderizar, así que tiene que
 * traer su propio <html> y <body> y no puede depender de los providers.
 * Por eso el texto va solo en español, como el resto de rutas sin traducción.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAF7EE',
          color: '#1C4A2A',
          fontFamily: 'Georgia, serif',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <p
            style={{
              margin: 0,
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#849C52',
            }}
          >
            Savia Sabia
          </p>
          <h1 style={{ margin: '12px 0 0', fontSize: '26px', fontWeight: 'normal' }}>
            Algo se rompió de nuestro lado
          </h1>
          <p style={{ margin: '16px 0 28px', fontSize: '15px', lineHeight: 1.65, color: '#5A6B52' }}>
            Ya nos llegó el aviso y lo estamos revisando. Puedes intentar de nuevo, o
            escribirnos por WhatsApp al 3814-9773 si necesitas algo ahora.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: '#1C4A2A',
              color: '#FAF7EE',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 28px',
              fontSize: '15px',
              fontFamily: 'inherit',
              cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            Intentar de nuevo
          </button>
          {error.digest && (
            <p style={{ margin: '24px 0 0', fontSize: '12px', color: '#849C52' }}>
              Referencia: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  )
}
