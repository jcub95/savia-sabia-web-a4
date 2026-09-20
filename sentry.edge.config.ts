import * as Sentry from '@sentry/nextjs'
import { IGNORE_ERRORS } from '@/lib/sentry-ignore'

// proxy.ts corre en el edge runtime: esto cubre los fallos de la capa de sesión.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  ignoreErrors: IGNORE_ERRORS,
  sendDefaultPii: false,
})
