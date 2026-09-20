import * as Sentry from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

/**
 * Captura los errores lanzados dentro de route handlers y componentes de
 * servidor — incluye /api/orders y todo /api/admin.
 */
export const onRequestError = Sentry.captureRequestError
