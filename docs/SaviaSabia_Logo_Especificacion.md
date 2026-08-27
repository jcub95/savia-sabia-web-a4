# Logo Oficial: Savia Sabia — Especificación Técnica

Este documento describe el logo definitivo aprobado (versión final, agosto 2026) para que cualquier IA o diseñador pueda referenciarlo, reproducirlo o derivar piezas sin ambigüedad. Complementa la filosofía "Botánica de Precisión" (`filosofia_diseno_logo.md`); aquí se especifica el resultado concreto.

> **Revisión agosto 2026:** las variantes monotónica y monotónica invertida se simplificaron eliminando el keyline (halo de separación) que originalmente iba bajo la S salvia y el segmento de tejido. Las dos S ahora se funden en un cuerpo sólido continuo en esas dos variantes. Detalles en la sección 4.

---

## 1. Composición general

Lockup vertical sobre lienzo 1000×1200 (proporción 5:6):

1. **Monograma SS** con flora integrada (zona superior, dominante).
2. **Nombre**: `SAVIA SABIA` — IBM Plex Serif Bold, 86pt, tracking 7, mayúsculas.
3. **Regla fina** de 310px de ancho, 1.5pt.
4. **Lema**: *"Menos químicos. Más plantas."* — Crimson Pro Italic, 40pt.

El monograma se centra ópticamente por bounding box real (no por geometría nominal).

---

## 2. Geometría del monograma

Dos letras "S" construidas cada una con dos arcos de círculo (radio 115, trazo 46, extremos redondeados):

* **S oscura** — centro (440, 360), color verde botánico `#1C4A2A`. Posición superior-izquierda.
* **S salvia** — centro (560, 590), color verde salvia `#849C52`. Posición inferior-derecha.

**Entrelazado (tejido):** las S se cruzan dos veces en la banda media. La salvia pasa POR ENCIMA de la oscura en el cruce superior; la oscura pasa por encima de la salvia en el cruce inferior (segmento de re-dibujo: arco 34°–84° del círculo inferior oscuro). Este tejido alternado es obligatorio — no es superposición simple.

---

## 3. Flora (posiciones definitivas)

Regla madre: *"las letras son la tierra, no el macetero"* — toda planta arraiga EN un trazo del monograma; tallos angostos al nacer que se ensanchan al subir; la flor corona el extremo.

| Planta | Raíz (en el trazo) | Posición de la flor | Tamaño base |
|---|---|---|---|
| **Rosa** | Trazo medio de la S oscura (440, ~346) | Anidada en la curva interior superior de la S oscura, centro ≈ (438, 257) | s = 44 |
| **Caléndula** | Trazo medio de la S salvia, desplazada +42px a la derecha | Anidada en la curva interior superior de la S salvia, desplazada a la derecha para NO tocar la S oscura; cabeza ≈ (637, 490) | s = 44 |
| **Lavanda** | Arco inferior-izquierdo de la S oscura ≈ (386, 567) | Abanico de 5 espigas ascendiendo arriba-izquierda | s = 56 |
| **Gordolobo** | Interior del gancho inferior de la S salvia ≈ (560, ~800) | Dos espigas verticales dentro del gancho | s = 48 |

### Anatomía obligatoria por especie

* **Rosa (de perfil, firma de especie):** copa de pétalos con borde ondulado; tres pétalos traseros puntiagudos asomando y curvándose hacia afuera; dos líneas internas diagonales (pétalo envolvente); **espiral cerrada pequeña (rizo, 1.35 vueltas) asomando arriba al centro** — ningún otro elemento del logo comparte espiral; sépalos en estrella (4) bajo la copa; tallo con **dos espinas alternadas** y dos hojas en el tercio medio.
* **Caléndula:** 14 pétalos elípticos radiales + centro circular oscuro; tallo corto con dos hojas.
* **Lavanda:** 5 espigas en abanico (ángulos −32°, −16°, 0°, 16°, 32°), cada una: cono relleno con florecillas escalonadas (lóbulos redondeados) que se afinan hacia la punta. **Sin hojas basales** — solo los tallos convergiendo a la raíz.
* **Gordolobo:** 2 espigas (principal alta + secundaria), núcleo cónico verde, **muchas flores amarillas de 5 pétalos** (11 + 6, escalonadas y alternadas con flores centrales intercaladas), brotes verdes en las puntas, 5 hojas basales anchas afelpadas.

---

## 4. Paleta por variante

| Rol | Color | Invertido | Monotónico | Monotónico invertido |
|---|---|---|---|---|
| Fondo | `#FAF7EE` crema | `#1C4A2A` | `#FAF7EE` | `#1C4A2A` |
| S oscura | `#1C4A2A` | `#FAF7EE` crema | `#1C4A2A` | `#FAF7EE` crema |
| S salvia | `#849C52` | `#96AC66` | `#1C4A2A` | `#FAF7EE` crema |
| Tallos / hojas | `#567646` / `#4A6C3E` | aclarados | `#1C4A2A` | `#FAF7EE` crema |
| Rosa | relleno `#DFB0BA`, línea `#AC7080` | aclarados | relleno oscuro, detalle crema | relleno crema, detalle verde |
| Caléndula | pétalos `#E29E3E`, centro `#A06020` | aclarados | oscuro, detalle crema | crema, detalle verde |
| Lavanda | `#8C7ABE` / `#6A5894` | aclarados | oscuro | crema |
| Gordolobo | flores `#DBBD58`, hojas `#B2BE98` | aclarados | oscuro | crema |
| Texto / lema | `#1C4A2A` / `#5A6B52` | crema / `#C4D0AC` | `#1C4A2A` | crema |

En las variantes **monotónica** y **monotónica invertida**, las dos S y el segmento de tejido comparten el mismo color y se funden en un cuerpo sólido continuo — sin keyline, sin halo separador, sin línea de contorno. El entrelazado se lee por el gesto de la forma (los ganchos superior e inferior de cada S siguen siendo reconocibles) y por la presencia de la flora que emerge en puntos específicos, no por contraste tonal entre trazos.

La cuarta variante — **monotónica invertida**, todo el logo en crema `#FAF7EE` sobre fondo verde `#1C4A2A` — es la indicada para colocar el logo sobre fondos verdes oscuros sólidos, por ejemplo el hero de la landing page o cualquier superficie donde el logo a color no tenga suficiente contraste.

---

## 5. Tipografía

* **Nombre:** IBM Plex Serif **Bold** (fallback: Georgia, serif).
* **Lema:** Crimson Pro **Italic** (fallback: Georgia italic).
* En los SVG las fuentes van referenciadas por nombre; si la plataforma no las tiene, reaplicarlas manualmente o solicitar versión con texto convertido a contornos.

## 6. Archivos oficiales

| Archivo | Formato | Uso |
|---|---|---|
| `SaviaSabia_logo_color.svg / .png` | Vector editable / PNG 2000px | Versión principal (crema) |
| `SaviaSabia_logo_invertido.svg / .png` | " | Fondos oscuros, stories, cierres |
| `SaviaSabia_logo_monotonico.svg / .png` | " | Sellos, kraft, bordado, una tinta |
| `SaviaSabia_logo_monotonico_invertido.svg / .png` | " | Logo crema sobre fondo verde sólido; hero de la web, superficies verdes oscuras |

Estructura interna de los SVG: grupos etiquetados `monograma` (`S-oscura`, `S-salvia`), `rosa`, `calendula`, `lavanda`, `gordolobo`, `texto` — cada flor es seleccionable y redimensionable de forma independiente.

## 7. Reglas de uso rápidas

* No recolorear la flora fuera de la paleta de herbario (mate, desaturada).
* No mover las flores fuera de su punto de raíz: deben seguir naciendo del trazo.
* No sustituir la rosa de perfil por rosas frontales o genéricas — el rizo en espiral es su firma exclusiva.
* La caléndula nunca debe tocar la S oscura.
* Espacio libre mínimo alrededor del lockup: el ancho del trazo (46px en escala 1000×1200).
* Generador fuente: `logo_svg.py` (parametrizado; cualquier ajuste debe hacerse ahí para mantener las cuatro variantes sincronizadas: `color`, `invertido`, `mono`, `mono_inv`).
