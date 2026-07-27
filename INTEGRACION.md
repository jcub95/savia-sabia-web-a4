# Header, Footer y Páginas de Soporte — Guía de Integración

Este paquete contiene únicamente los archivos **nuevos o modificados** para
implementar un header y footer consistentes en todo el sitio, más 6 páginas
nuevas: Nosotros, Contacto, Envíos y Pagos, Preguntas Frecuentes, Términos y
Privacidad.

Ya fue verificado en un entorno limpio:
- `npx tsc --noEmit` → sin errores de tipos.
- `npm run build` (Next.js 16 / Turbopack) → build de producción exitoso,
  las 8 rutas se generan como contenido estático.

---

## 1. Cómo aplicarlo a tu repo local

Con el repo `savia-sabia-web-a4` ya clonado en tu máquina (el que usas con
Claude Code):

1. Copia el contenido de esta carpeta (`savia-sabia-header-footer-update/`)
   directamente sobre la raíz de tu repo, **sobrescribiendo** cuando pregunte.
   Estructura:

   ```
   app/layout.tsx                              (MODIFICADO)
   app/page.tsx                                 (MODIFICADO)
   lib/language-context.tsx                     (MODIFICADO)
   app/contacto/page.tsx                        (NUEVO)
   app/envios-y-pagos/page.tsx                  (NUEVO)
   app/nosotros/page.tsx                        (NUEVO)
   app/preguntas-frecuentes/page.tsx            (NUEVO)
   app/privacidad/page.tsx                      (NUEVO)
   app/terminos/page.tsx                        (NUEVO)
   components/age-gate.tsx                      (NUEVO)
   components/site-footer.tsx                   (NUEVO)
   components/site-header.tsx                   (NUEVO)
   components/pages/contacto-content.tsx         (NUEVO)
   components/pages/envios-content.tsx           (NUEVO)
   components/pages/faq-content.tsx              (NUEVO)
   components/pages/legal-placeholder-content.tsx (NUEVO)
   components/pages/nosotros-content.tsx         (NUEVO)
   lib/support-content.ts                        (NUEVO)
   ```

2. **Elimina un archivo que ya no se usa** (su función quedó absorbida por
   `components/site-header.tsx`):

   ```bash
   rm components/language-toggle.tsx
   ```

3. Instala y corre local:

   ```bash
   npm install
   npm run dev
   ```

4. Revisa en el navegador:
   - `/` — ahora con header y footer arriba/abajo del flujo de la encuesta.
   - `/nosotros`, `/contacto`, `/envios-y-pagos`, `/preguntas-frecuentes`,
     `/terminos`, `/privacidad` — páginas nuevas.
   - El modal de verificación de edad (18+) debe aparecer una vez; si ya lo
     aceptaste antes, bórralo con: DevTools → Application → Local Storage →
     borra la clave `savia-sabia-age-verified`.

5. Commit y push:

   ```bash
   git add -A
   git commit -m "feat: header y footer consistentes + páginas de soporte (Nosotros, Contacto, Envíos y Pagos, FAQ) + age-gate 18+"
   git push
   ```

   Vercel (conectado a este repo) hará el deploy automáticamente al recibir
   el push. Si usas v0.app para seguir iterando visualmente sobre este mismo
   proyecto, sincronízalo desde ahí también (v0 puede jalar del repo o vas a
   necesitar re-subir el estado — depende de cómo esté configurada esa
   conexión en tu cuenta).

---

## 2. Qué cambia arquitectónicamente

- **`app/layout.tsx`** ahora es dueño de `LanguageProvider`, `CartProvider`,
  `<SiteHeader />`, `<SiteFooter />` y `<AgeGate />`. Antes vivían solo dentro
  de `app/page.tsx`, por lo que no había chrome consistente en el resto del
  sitio (que, de hecho, no existía como "resto del sitio" — todo era una sola
  pantalla).
- **`app/page.tsx`** perdió el `<LanguageToggle />` flotante (ahora integrado
  al header) y ganó un puente temporal: lee `?view=` de la URL para poder
  saltar directo a Mezclas / Herbario / Carrito desde un link externo (por
  ejemplo, desde el nuevo header o footer). Esto es un parche intencional,
  **no** el refactor completo a rutas reales para el quiz/tienda que ya
  tenías anotado como pendiente en el prompt de continuidad — ese sigue
  siendo un trabajo aparte y más grande.
- **Nosotros, Contacto, Envíos y Pagos, FAQ** sí son rutas reales de Next.js
  (`app/<ruta>/page.tsx`), cada una con su propio `<title>` y meta
  description para SEO — algo que la SPA de una sola página no podía tener.

## 3. Decisiones y correcciones que tomé

- **Envío gratis: usé Q150, no Q200.** Tu doc `Paginas_de_Soporte.md` decía
  Q200, pero `lib/cart-context.tsx` ya tiene Q150 implementado como
  `freeShippingThreshold` — y tu prompt de continuidad confirma que Q150 es
  el valor correcto. Ajusté el copy de Envíos y Pagos y del FAQ para que
  coincida con lo que el carrito realmente hace.
- **Términos y Privacidad son placeholders honestos**, no textos legales
  reales — no existía ese copy en ningún documento del proyecto y no iba a
  inventar cláusulas legales para un producto que se fuma. Cada página trae
  una nota visible: *"El texto legal definitivo debe ser revisado por un
  abogado guatemalteco antes del lanzamiento."* Reemplázalas antes de
  procesar pagos o datos reales de clientes.
- **El modal de edad (`age-gate.tsx`)** usa `AlertDialog` (no `Dialog`)
  porque Radix no permite cerrarlo con click afuera ni con Escape — es el
  componente correcto para algo que no debe poder saltarse. Queda guardado
  en `localStorage` bajo la clave `savia-sabia-age-verified`.
- **Encontré un archivo duplicado en `public/`:**
  `savia-sabia-logo.svg - copia.svg` es un duplicado byte-por-byte de
  `SaviaSabia_logo_monotonico_invertido_transparente.svg` (mismo contenido,
  con "- copia" y un espacio en el nombre — probablemente quedó de una subida
  accidental). No lo toqué, pero puedes borrarlo con seguridad:
  `rm "public/savia-sabia-logo.svg - copia.svg"`.

## 4. Qué NO incluye este paquete (a propósito)

- `next-env.d.ts`, `package-lock.json`, `tsconfig.tsbuildinfo` — cambiaron
  como ruido de correr `npm install` / `npm run build` en el entorno donde
  verifiqué esto, no son cambios de código reales. Tu propio `npm install`
  los va a regenerar correctamente.
- El refactor completo a rutas reales para el quiz y la tienda (`/quiz`,
  `/mezclas/[slug]`, etc.) — sigue pendiente como un proyecto aparte.
- Contenido legal real de Términos/Privacidad — ver punto 3.
