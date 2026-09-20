/**
 * Ruido no accionable.
 *
 * Todo lo de aquí viene del navegador del visitante, no de nuestro código:
 * extensiones que inyectan scripts, bucles benignos de ResizeObserver y
 * fallos de red por pestañas cerradas a media carga. Si no podemos arreglarlo
 * desde el repo, no merece un evento en Sentry.
 */
export const IGNORE_ERRORS = [
  // Benigno por definición: lo dispara el navegador cuando el callback de
  // ResizeObserver no alcanza a entregar todas las notificaciones en un frame.
  'ResizeObserver loop limit exceeded',
  'ResizeObserver loop completed with undelivered notifications',

  // Extensiones y userscripts inyectados en la página
  'top.GLOBALS',
  'originalCreateNotification',
  'canvas.contentDocument',
  'MyApp_RemoveAllHighlights',
  'window.webkit.messageHandlers',
  'Can\'t find variable: ZiteReader',
  'ComboSearch is not defined',
  'conduitPage',
  'atomicFindClose',

  // Navegación cancelada, pestaña cerrada o red caída a media petición
  'Failed to fetch',
  'NetworkError when attempting to fetch resource',
  'Load failed',
  'AbortError',
  'The operation was aborted',
  'cancelled',

  // Bots y navegadores embebidos (Instagram, Facebook) que evalúan scripts raros
  'Non-Error promise rejection captured',
  'instantSearchSDKJSBridgeClearHighlight',
]

/** Orígenes cuyos stack traces nunca son nuestros. */
export const DENY_URLS = [
  /extensions\//i,
  /^chrome:\/\//i,
  /^chrome-extension:\/\//i,
  /^moz-extension:\/\//i,
  /^safari-extension:\/\//i,
  /^safari-web-extension:\/\//i,
  /webappstoolbarba\.texthelp\.com\//i,
  /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
  // Analítica de terceros
  /googletagmanager\.com/i,
  /connect\.facebook\.net/i,
]
