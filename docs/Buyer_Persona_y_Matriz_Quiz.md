# 05. Buyer Personas y Matriz del Quiz: Savia Sabia

Este documento define los 4 perfiles principales de consumidor (*Buyer Personas*) de Savia Sabia y establece la lógica técnica del cuestionario (*Quiz*) de recomendación automatizada para el ecosistema digital.

---

## 👥 1. Definición de Buyer Personas

### Perfil 1: El Fumador en Transición
*   **Motivación:** Dejar el tabaco industrial por salud, desintoxicar los pulmones y romper la dependencia química de la nicotina[cite: 3].
*   **Punto de Dolor:** Teme perder el "golpe de garganta" (*throat hit*) y sufre de pesadez o congestión pulmonar recurrente[cite: 3].

### Perfil 2: El Perfil Ansiolítico / Regulador
*   **Motivación:** Utiliza el acto de fumar como un vehículo de escape para regular el estrés cotidiano, la ansiedad o el tráfico de la ciudad[cite: 3].
*   **Punto de Dolor:** Irritabilidad, cambios de humor al intentar dejar de fumar y dificultad para apagar el ruido mental antes de dormir[cite: 3].

### Perfil 3: El Perfil Productivo / Creativo
*   **Motivación:** Profesional, artista, programador o estudiante que utiliza el *break* de fumar como un catalizador o "bio-hack" para concentrarse y producir[cite: 3].
*   **Punto de Dolor:** Fatiga cerebral, bloqueos creativos y rechazo a los estimulantes que alteran el pulso cardíaco[cite: 3].

### Perfil 4: El Perfil Sensorial / Lifestyle
*   **Motivación:** Consumidor recreativo u ocasional que busca la estética, el aroma refinado y la mística de las plantas como un ritual de autocuidado o conexión social[cite: 3].
*   **Punto de Dolor:** El estigma social del mal olor a tabaco en la ropa y manos, y la falta de opciones locales y premium en el mercado[cite: 3].

---

## 📝 2. El Cuestionario: "Encuentra tu Alquimia Herbal"

El usuario debe elegir la opción que mejor describa su situación actual[cite: 3].

### 1. ¿Cuál es tu relación actual con el tabaco?
*   **A.** Fumo diariamente (más de 5-10 cigarros) y quiero limpiar mis pulmones.[cite: 3]
*   **B.** Fumo ocasionalmente por estrés o ansiedad social.[cite: 3]
*   **C.** Ya casi no fumo, pero extraño mucho el ritual de tener algo en la mano.[cite: 3]
*   **D.** Fumo principalmente de noche para "desconectarme" del día.[cite: 3]

### 2. ¿Qué beneficio buscas principalmente en tu ritual de humo?
*   **A.** Sentir mis vías respiratorias más despejadas y ligeras.[cite: 3]
*   **B.** Bajar el ritmo y calmar la agitación mental.[cite: 3]
*   **C.** Concentrarme, trabajar o tener un momento de claridad creativa.[cite: 3]
*   **D.** Elevar mi estado de ánimo y consentirme con algo sensorial.[cite: 3]

### 3. ¿En qué momento del día te hace más falta "encender" algo?
*   **A.** A primera hora o después de comer (por hábito).[cite: 3]
*   **B.** En medio de la jornada laboral o el tráfico.[cite: 3]
*   **C.** Justo antes de ir a dormir.[cite: 3]
*   **D.** En mi tiempo libre o momentos especiales.[cite: 3]

### 4. ¿Cómo describirías tu estado físico/respiratorio hoy?
*   **A.** Siento pesadez, congestión o flema recurrente.[cite: 3]
*   **B.** Siento la garganta reseca o irritada por el tabaco químico.[cite: 3]
*   **C.** Me siento bien, busco algo que mantenga mi salud actual.[cite: 3]
*   **D.** Me siento cansado/a pero mi mente no se detiene.[cite: 3]

### 5. Si dejas el tabaco convencional, ¿qué es lo que más te preocupa?
*   **A.** Extrañar el "golpe" de humo en la garganta y la limpieza física.[cite: 3]
*   **B.** Ponerme de mal humor o estar muy irritable.[cite: 3]
*   **C.** Perder el "enfoque" o la chispa de productividad.[cite: 3]
*   **D.** Extrañar el sabor y el ritual social de fumar.[cite: 3]

### 6. ¿Qué perfil de sabor prefieres?
*   **A.** Terroso, fuerte y medicinal (tipo bosque).[cite: 3]
*   **B.** Neutro, suave y ligero.[cite: 3]
*   **C.** Fresco, mentolado o herbal intenso.[cite: 3]
*   **D.** Floral, dulce y aromático.[cite: 3]

---

## ⚙️ 3. Lógica de Recomendación (Matriz de Resultados)

El algoritmo del backend evaluará la mayoría de respuestas por letra para asignar el perfil óptimo y la estrategia de venta cruzada (*Combo/Bundle*)[cite: 3].

### Perfil 1: Mayoría de respuestas A ➔ El Fumador en Transición
*   **Tipo de Usuario:** Consumidor de alto impacto enfocado en la salud y desintoxicar el cuerpo[cite: 3].
*   **Mezcla Óptima:** `Claridad Pulmonar` (Purificación Intensiva)[cite: 3]. Es la encargada de hacer el trabajo pesado de expectoración y limpieza inicial[cite: 3].
*   **Mezcla Complementaria:** `Protección` (Defensa Respiratoria)[cite: 3]. Para utilizarse en exteriores como escudo preventivo contra la contaminación urbana[cite: 3].

### Perfil 2: Mayoría de respuestas B ➔ El Perfil Ansiolítico
*   **Tipo de Usuario:** Busca regulación emocional, paz mental y bajar revoluciones[cite: 3].
*   **Mezcla Óptima:** `Suavidad` (Calma Diaria)[cite: 3]. La respuesta directa para relajar el sistema nervioso central de forma ligera[cite: 3].
*   **Mezcla Complementaria:** `Sueño Profundo` (Apaga la Mente)[cite: 3]. Estrategia cruzada: quien vive estresado de día, necesita desactivar la rumiación de pensamientos de noche[cite: 3].

### Perfil 3: Mayoría de respuestas C ➔ El Perfil Productivo / Estudiante
*   **Tipo de Usuario:** Consumidor funcional que usa el break de fumar como herramienta de enfoque[cite: 3].
*   **Mezcla Óptima:** `Enfoque` (Mente Despierta)[cite: 3]. Activa la concentración y oxigena el cerebro sin la taquicardia de la nicotina[cite: 3].
*   **Mezcla Complementaria:** `Suavidad` (Calma Diaria)[cite: 3]. Para equilibrar la jornada y aliviar la tensión muscular residual del exceso de trabajo[cite: 3].

### Perfil 4: Mayoría de respuestas D ➔ El Perfil Sensorial / Lifestyle
*   **Tipo de Usuario:** Consumidor recreativo/social que valora la experiencia aromática y el ritual[cite: 3].
*   **Mezcla Óptima:** `Nutre el Alma` (Elevación Emocional)[cite: 3]. Por su alta carga floral premium, elegancia en el ambiente e impacto anímico positivo[cite: 3].
*   **Mezcla Complementaria:** `Enfoque` (Mente Despierta)[cite: 3]. Excelente para momentos creativos, charlas o reuniones donde se busca socializar con presencia lúcida[cite: 3].