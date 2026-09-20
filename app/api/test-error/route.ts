/**
 * ⚠️ RUTA TEMPORAL — BORRAR la carpeta app/api/test-error/ completa
 *    después de confirmar que Sentry recibe el evento.
 *
 * Lanza a propósito para verificar que el hook `onRequestError` de
 * instrumentation.ts captura los fallos de route handlers (el mismo camino
 * que seguirían /api/orders y /api/admin/*).
 *
 * Sin guard de entorno a propósito: la verificación tiene que poder hacerse
 * contra el deploy de producción, que es donde viven las variables de Sentry.
 */
export async function GET() {
  throw new Error('Sentry test error: verificación de captura en API route (ruta temporal)')
}
