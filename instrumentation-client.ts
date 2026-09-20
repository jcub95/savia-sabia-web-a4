import * as Sentry from '@sentry/nextjs'
import { DENY_URLS, IGNORE_ERRORS } from '@/lib/sentry-ignore'

// Sin DSN el SDK queda inerte, igual que sendOrderEmails sin RESEND_API_KEY:
// en local no se manda nada y nada se rompe.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  environment: process.env.NODE_ENV,

  // Monitoreo de errores es el objetivo; el tracing va bajo para no quemar cuota.
  tracesSampleRate: 0.1,

  ignoreErrors: IGNORE_ERRORS,
  denyUrls: DENY_URLS,

  // No queremos el cuerpo de los formularios de checkout en los reportes.
  sendDefaultPii: false,
})

// Hook de Next.js 15.3+ para que las navegaciones del App Router queden medidas.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
