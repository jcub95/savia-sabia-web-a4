# Savia Sabia — Contexto del proyecto

Sitio web de **Savia Sabia**, marca guatemalteca de mezclas herbales y cigarrillos
herbales sin tabaco ni nicotina. Next.js 16 (App Router) + React 19 + Tailwind 4 +
shadcn/ui + framer-motion.

---

## 1. Idioma

**El español es el idioma primario.** El mercado es Guatemala. El inglés es
secundario, para turismo consciente y visitantes extranjeros.

Toda cadena visible por el usuario debe pasar por el sistema de traducción.
Nunca dejes texto de interfaz ni datos de producto escritos directamente en un
solo idioma dentro de los componentes.

---

## 2. Fuentes de verdad (carpeta `docs/`)

Antes de escribir cualquier copy de producto, **lee el documento correspondiente**.
El texto en español ya existe y está aprobado; no lo reinventes ni lo traduzcas
desde el inglés.

| Documento | Contiene |
|---|---|
| `docs/Catalogo_e_Ingredientes.md` | Las 15 hierbas: efecto, beneficio, ángulo de marketing |
| `docs/Portafolio_de_Mezclas.md` | Las 6 mezclas: alquimia, perfil sensorial, efecto, target |
| `docs/Buyer_Persona_y_Matriz_Quiz.md` | 4 perfiles de comprador + lógica del quiz |
| `docs/Manifiesto_y_Filosofia.md` | Historia, propósito, misión, visión, valores |
| `docs/Manual_Visual_y_Diseno.md` | Paleta, tipografía, estilo de ilustración botánica |
| `docs/SaviaSabia_Logo_Especificacion.md` | Logo oficial: geometría, flora, 4 variantes |

**Si un dato del código contradice estos documentos, gana el documento** — salvo
que la etiqueta física del producto diga otra cosa (ver punto 4).

---

## 3. Las 6 mezclas (nombres y eslóganes exactos)

| Mezcla | Eslogan de etiqueta | Color de acento |
|---|---|---|
| Suavidad | Calma Diaria | `#D87FA4` rosa |
| Nutre el Alma | Elevación Emocional | `#DE7E38` terracota |
| Protección | Defensa Respiratoria | `#5FAE55` verde |
| Enfoque | Concentración Natural | `#3B6FD4` azul |
| Sueño Profundo | Apaga la Mente | `#9E7FCB` lavanda |
| Claridad Pulmonar | Purificación Intensiva | `#3BAEC6` celeste |

**Nombres sagrados:** nunca alteres, traduzcas ni abrevies los nombres de las
mezclas. En inglés también se llaman Suavidad, Nutre el Alma, etc. Los eslóganes
sí se traducen.

> Nota: `docs/Portafolio_de_Mezclas.md` registra el eslogan de Enfoque como
> "Mente Despierta", pero la etiqueta impresa dice **"Concentración Natural"**.
> Gana la etiqueta. Si encuentras otra discrepancia así, avísame antes de elegir.

---

## 4. Identidad visual

```
Verde botánico oscuro   #1C4A2A   fondo principal, texto sobre crema
Verde salvia            #849C52   acentos
Crema                   #FAF7EE   fondo alterno, texto sobre verde
Oliva                   #5A6B52   texto secundario
```

- **Titulares:** serif bold (IBM Plex Serif o equivalente). Nunca sans-serif para
  el nombre de marca.
- **Lema y notas:** serif itálica (Crimson Pro o equivalente).
- **Estética:** minimalismo botánico premium, tipo Aesop. **No** emojis decorativos
  flotando, **no** estética esotérica o new-age.
- **Logo:** `public/savia-sabia-logo.svg` (monograma SS con flora, fondo
  transparente). No lo redibujes ni generes SVG del logo: referencia el archivo.

**Lema oficial:** *"Menos químicos. Más plantas."*
No uses "Botánica de precisión" como lema público — ese es el nombre interno de
la filosofía de diseño.

---

## 5. Voz de marca

Profesional, científica, elegante, empática y minimalista. Educación botánica y
transparencia, nunca venta agresiva.

Los tres pilares argumentativos de toda comunicación:

1. **Reducción de daño** — comparamos nuestro humo contra el tabaco industrial,
   nunca contra el aire limpio.
2. **Cero adicción física** — reemplazamos el ritual y el golpe de garganta sin
   nicotina.
3. **Fitoterapia aplicada** — propiedades reales y documentadas de cada planta.

---

## 6. Reglas que no se rompen

- **Nunca afirmar que fumar es saludable.** Ni en copy, ni en alt text, ni en
  metadatos. El marco siempre es "alternativa consciente" y "reducción de daño".
  Esto es legal y reputacional.
- **Sin promesas médicas.** Nada de "cura", "trata", "elimina la ansiedad".
  Usa "acompaña", "ayuda a", "tradicionalmente usado para".
- **Sin nicotina, sin tabaco, sin THC.** Debe quedar visible y explícito.
- **Producto para mayores de 18 años.**
- Descripciones de ingredientes en fichas de producto: **máximo 12 palabras**,
  directas y al grano.

---

## 7. Estructura de datos y componentes

- `lib/herbs-data.ts` — las 15 hierbas, 6 mezclas, 4 perfiles y la lógica de
  recomendación del quiz.
- `lib/language-context.tsx` — proveedor de idioma y función `t()`.
- `lib/cart-context.tsx` — estado del carrito.
- `components/` — `welcome`, `survey`, `results`, `herbarium`, `blends-catalog`,
  `cart`, `herb-detail`, `language-toggle`.

La lógica del quiz debe corresponder a la matriz documentada en
`docs/Buyer_Persona_y_Matriz_Quiz.md` (mayoría de A/B/C/D → perfil → mezcla óptima
+ complementaria). Si el código diverge del documento, avísame.

---

## 8. Cómo trabajar en este repo

- **Diagnostica antes de implementar.** Para cambios que toquen más de dos
  archivos, explica primero el plan y espera confirmación.
- **Cambios acotados y verificables.** Una tarea a la vez; al terminar, confirma
  que `npm run dev` compila sin errores.
- **No reescribas archivos completos** si basta con editar unas líneas.
- **No inventes copy de producto.** Sale de `docs/`. Si falta algo, pregunta.
- Ejecuta `npm run lint` antes de dar por terminado un cambio grande.

---

## 9. Contacto y operación

- Instagram: `@savia.sabia.herbs`
- WhatsApp: `3814-9773`
- La venta real se cierra por conversación (DM/WhatsApp), no por checkout
  automatizado. El carrito debe terminar en un mensaje de WhatsApp pre-armado.
- Formatos: mezcla suelta (½ oz, 2 oz) y cigarrillos listos (packs de 12 y 24).
