import { withSentryConfig } from '@sentry/nextjs/config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

/**
 * Subida de source maps.
 *
 * Mismo criterio que sendOrderEmails con RESEND_API_KEY: si faltan las
 * credenciales, no se rompe nada — el build termina igual, solo que sin
 * source maps y los stack traces llegan minificados. Nunca debe fallar un
 * deploy por no poder hablar con Sentry.
 */
const hasSentryCredentials = Boolean(
  process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT
)

if (!hasSentryCredentials && process.env.NODE_ENV === 'production') {
  console.warn(
    '[sentry] Sin SENTRY_AUTH_TOKEN/ORG/PROJECT: se omite la subida de source maps. ' +
      'El build continúa; los stack traces llegarán minificados.'
  )
}

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Sin credenciales no se intenta siquiera contactar a Sentry.
  sourcemaps: {
    disable: !hasSentryCredentials,
    // No dejar los .map servidos públicamente una vez subidos.
    deleteSourcemapsAfterUpload: true,
  },

  // Que un fallo de red hablando con Sentry no tumbe el build.
  errorHandler: (err) => {
    console.warn('[sentry] Fallo subiendo source maps, el build continúa:', err.message)
  },

  silent: !process.env.CI,
  widenClientFileUpload: true,

  // Proxy de los eventos por nuestro dominio para que no los corten
  // los bloqueadores de anuncios.
  tunnelRoute: '/monitoring',

  // Quita el logging de debug del SDK del bundle de producción.
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },

  telemetry: false,
})
