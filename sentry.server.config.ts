import * as Sentry from '@sentry/nextjs'
import { IGNORE_ERRORS } from '@/lib/sentry-ignore'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  ignoreErrors: IGNORE_ERRORS,

  // Los handlers de /api/admin y /api/orders manejan teléfonos, direcciones y
  // correos de clientes. Nunca adjuntar datos personales por defecto.
  sendDefaultPii: false,
})
