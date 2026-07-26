# Quiz "Encuentra tu Alquimia Herbal" — Especificación funcional

Reemplaza la lógica del quiz tanto del código anterior (8 preguntas con scoring
cruzado) como de la matriz A/B/C/D de `Buyer_Persona_y_Matriz_Quiz.md`.

**Cambio de fondo:** el quiz ya no calcula un *perfil* para luego deducir una
mezcla. Puntúa **las 6 mezclas directamente**; el perfil se deriva al final como
etiqueta narrativa. Esto elimina la pérdida de información del paso intermedio y
permite matices que la mayoría de letras no capturaba.

**Seis preguntas.** Menos preguntas suben la tasa de finalización, y estas seis
cubren las cinco dimensiones que realmente determinan la recomendación: relación
con el tabaco, beneficio buscado, momento de consumo, estado respiratorio,
temor principal y preferencia de sabor.

---

## 1. Modelo de datos

```ts
type BlendId =
  | 'suavidad' | 'nutre_el_alma' | 'proteccion'
  | 'enfoque'  | 'sueno_profundo' | 'claridad_pulmonar'

interface QuizOption {
  id: string
  label: LocalizedString
  scores: Partial<Record<BlendId, number>>
}

interface QuizQuestion {
  id: string
  question: LocalizedString
  options: QuizOption[]   // siempre 4, selección única
}
```

Cada respuesta suma puntos a una o varias mezclas. Al terminar se ordenan por
puntaje descendente.

---

## 2. Las seis preguntas

### P1 · ¿Cuál es tu relación actual con el tabaco?
*What is your current relationship with tobacco?*

| Opción | Texto ES | Texto EN | Puntos |
|---|---|---|---|
| A | Fumo a diario y quiero limpiar mis pulmones | I smoke daily and want to clear my lungs | Claridad Pulmonar +3, Protección +2 |
| B | Fumo ocasionalmente por estrés o ansiedad | I smoke occasionally due to stress or anxiety | Suavidad +3, Nutre el Alma +1 |
| C | Ya casi no fumo, pero extraño el ritual | I barely smoke now, but I miss the ritual | Suavidad +2, Nutre el Alma +2, Enfoque +1 |
| D | Fumo de noche para desconectarme del día | I smoke at night to disconnect from the day | Sueño Profundo +3, Suavidad +1 |

### P2 · ¿Qué buscas principalmente en tu ritual de humo?
*What are you mainly looking for in your smoking ritual?*

**Pregunta de mayor peso: es el driver principal de la recomendación.**

| Opción | Texto ES | Texto EN | Puntos |
|---|---|---|---|
| A | Sentir mis vías respiratorias despejadas | Feeling my airways clear and light | Claridad Pulmonar +4, Protección +3 |
| B | Bajar el ritmo y calmar la agitación mental | Slowing down and quieting mental noise | Suavidad +4, Sueño Profundo +2 |
| C | Concentrarme o tener claridad creativa | Focusing or finding creative clarity | Enfoque +4 |
| D | Elevar mi ánimo con algo sensorial | Lifting my mood with something sensory | Nutre el Alma +4 |

### P3 · ¿En qué momento del día te hace más falta encender?
*When during the day do you most feel like lighting up?*

| Opción | Texto ES | Texto EN | Puntos |
|---|---|---|---|
| A | A primera hora o después de comer | First thing in the morning or after meals | Suavidad +2, Enfoque +2 |
| B | En media jornada laboral o en el tráfico | Mid-workday or stuck in traffic | Enfoque +3, Protección +1 |
| C | Justo antes de ir a dormir | Right before going to sleep | Sueño Profundo +4 |
| D | En mi tiempo libre o momentos especiales | In my free time or on special occasions | Nutre el Alma +3 |

### P4 · ¿Cómo describirías tu estado respiratorio hoy?
*How would you describe your breathing today?*

| Opción | Texto ES | Texto EN | Puntos |
|---|---|---|---|
| A | Siento pesadez, congestión o flema | Heaviness, congestion or recurring phlegm | Claridad Pulmonar +4 |
| B | Garganta reseca o irritada | Dry or irritated throat | Protección +3, Suavidad +2 |
| C | Bien, quiero mantenerlo así | Fine — I want to keep it that way | Protección +2, Enfoque +1 |
| D | Cansado, pero con la mente acelerada | Tired, but my mind won't slow down | Sueño Profundo +3, Suavidad +1 |

### P5 · Si dejas el tabaco, ¿qué te preocupa más?
*If you quit tobacco, what worries you most?*

| Opción | Texto ES | Texto EN | Puntos |
|---|---|---|---|
| A | Extrañar el golpe de humo en la garganta | Missing the throat hit | Claridad Pulmonar +3, Protección +2 |
| B | Ponerme irritable o de mal humor | Becoming irritable or moody | Suavidad +3, Nutre el Alma +2 |
| C | Perder el enfoque o la productividad | Losing focus or productivity | Enfoque +4 |
| D | Extrañar el sabor y el ritual social | Missing the flavor and social ritual | Nutre el Alma +3, Suavidad +1 |

### P6 · ¿Qué perfil de sabor prefieres?
*Which flavor profile do you prefer?*

**Menor peso: personaliza y desempata, no define el perfil.**

| Opción | Texto ES | Texto EN | Puntos |
|---|---|---|---|
| A | Terroso, fuerte y medicinal | Earthy, strong and medicinal | Claridad Pulmonar +2, Protección +2 |
| B | Neutro, suave y ligero | Neutral, soft and light | Suavidad +2 |
| C | Fresco, mentolado o herbal intenso | Fresh, minty or intensely herbal | Enfoque +2, Claridad Pulmonar +1 |
| D | Floral, dulce y aromático | Floral, sweet and aromatic | Nutre el Alma +2, Sueño Profundo +1 |

---

## 3. Cálculo del resultado

**Mezcla principal:** la de mayor puntaje acumulado.

**Desempate:** si dos o más empatan, gana la que recibió más puntos en **P2**
(el driver principal). Si persiste el empate, gana la de menor índice en este
orden: Claridad Pulmonar, Enfoque, Suavidad, Sueño Profundo, Nutre el Alma,
Protección.

**Mezcla complementaria:** no es la segunda con más puntaje — se toma de este
mapa fijo, diseñado para que la pareja cubra momentos distintos del día y
funcione como combo comercial.

| Principal | Complementaria | Lógica |
|---|---|---|
| Claridad Pulmonar | Protección | Limpieza intensiva, luego escudo preventivo |
| Protección | Enfoque | Defensa urbana + productividad diurna |
| Suavidad | Sueño Profundo | Calma de día + desconexión de noche |
| Enfoque | Suavidad | Activación de día + descompresión al cerrar |
| Sueño Profundo | Suavidad | Ritual nocturno + versión ligera diurna |
| Nutre el Alma | Enfoque | Sensorial + presencia lúcida para socializar |

**Etiqueta de perfil** (solo narrativa, se deriva de la mezcla principal):

| Mezcla principal | Perfil mostrado |
|---|---|
| Claridad Pulmonar · Protección | El Fumador en Transición |
| Suavidad · Sueño Profundo | El Perfil Ansiolítico |
| Enfoque | El Perfil Productivo |
| Nutre el Alma | El Perfil Sensorial |

La descripción de cada perfil (motivación y punto de dolor) sale de
`Buyer_Persona_y_Matriz_Quiz.md`, sección "Definición de Buyer Personas".

---

## 4. Reglas de presentación del resultado

- Mostrar **una** mezcla principal con su eslogan de etiqueta, su alquimia
  botánica y su momento de consumo.
- Mostrar la complementaria como sugerencia secundaria, con una línea que
  explique **por qué** se recomienda junto a la principal.
- Cerrar con CTA directo al DM o a la ficha de producto — el quiz existe para
  vender, no solo para informar.
- Nunca afirmar que la mezcla trata, cura o elimina una condición. El marco es
  "diseñada para acompañar", "formulada para".

---

## 5. Preguntas eliminadas y por qué

| Pregunta anterior | Origen | Motivo de eliminación |
|---|---|---|
| ¿Cuánto tiempo llevas fumando? | Código | No cambia la recomendación. Es dato demográfico, no diagnóstico. |
| ¿Cuál es tu nivel de estrés? | Código | Redundante: P2 y P5 ya capturan la motivación emocional de forma directa. |
| ¿Qué te trae a los herbales? | Código | Se solapa con P1 y P2. |
| ¿Qué efecto buscas? | Código | Duplica P2. |

Multi-selección eliminada en P6: complica el scoring sin mejorar la precisión, y
alarga el tiempo de respuesta.
