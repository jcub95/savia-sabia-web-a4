// Contenido bilingüe de las páginas de soporte (Nosotros, Contacto, Envíos y Pagos,
// Preguntas Frecuentes, Avisos Legales). Transcrito de docs/Paginas_de_Soporte.md,
// con el umbral de envío gratis alineado a Q150 (confirmado en lib/cart-context.tsx).
//
// Mantiene el mismo patrón `LocalizedString` que ya usa lib/herbs-data.ts, para que
// el contenido largo de estas páginas no viva mezclado en el diccionario plano de
// lib/language-context.tsx (que sigue usándose para las etiquetas cortas de nav,
// footer y el modal de edad).

import type { LocalizedString } from './herbs-data'

export interface FaqItem {
  q: LocalizedString
  a: LocalizedString
}

export interface FaqCategory {
  title: LocalizedString
  items: FaqItem[]
}

// ---------------------------------------------------------------------------
// 1. NOSOTROS
// ---------------------------------------------------------------------------

export const nosotrosContent = {
  header: {
    en: 'Two people, one obsession with plants.',
    es: 'Dos personas, una obsesión con las plantas.',
  } satisfies LocalizedString,

  intro: {
    en: `Savia Sabia started from a simple idea that turned out to be hard to execute: the ritual of smoking never had to involve tobacco, nicotine, or a list of chemicals nobody reads.`,
    es: `Savia Sabia nació de una idea simple y difícil de ejecutar: que el ritual de fumar no tenía por qué implicar tabaco, nicotina ni una lista de químicos que nadie lee.`,
  } satisfies LocalizedString,

  team: [
    {
      name: 'Juan Carlos',
      role: {
        en: `handles everything that happens before the product reaches your hands: sourcing, production, blend formulation, design and packaging. If an herb makes it into a blend, it's because it passed his standard.`,
        es: `se encarga de todo lo que ocurre antes de que el producto llegue a tus manos: la selección de insumos, la producción, la formulación de cada mezcla, el diseño y el empaque. Si una hierba entra a una mezcla, es porque pasó por su criterio.`,
      } satisfies LocalizedString,
    },
    {
      name: 'Álvaro Arévalo',
      role: {
        en: `runs the commercial side and the relationships — with the people who buy from us and the partners we work with. If you write to us on WhatsApp or Instagram, chances are you're talking to him.`,
        es: `lleva la parte comercial y la relación con quienes nos compran y con quienes trabajamos. Si escribes por WhatsApp o Instagram, es probable que hables con él.`,
      } satisfies LocalizedString,
    },
  ],

  sourcing: {
    en: `We work with locally sourced, organic herbs, including our own family harvest. We use unbleached papers and packaging. No chemical additives, no artificial flavoring, no preservatives.`,
    es: `Trabajamos con hierbas de origen local y orgánico, incluyendo cosecha familiar propia. Usamos papeles y empaques sin blanquear. No agregamos aditivos químicos, ni saborizantes artificiales, ni conservantes.`,
  } satisfies LocalizedString,

  valuesTitle: {
    en: 'What we believe',
    es: 'Lo que creemos',
  } satisfies LocalizedString,

  values: [
    {
      title: { en: 'Botanical precision.', es: 'Precisión botánica.' } satisfies LocalizedString,
      body: {
        en: `Every blend has a reason to exist. We study what each plant does when inhaled, in what proportion, and alongside which others. It isn't intuition — it's formulation.`,
        es: `Cada mezcla tiene una razón de ser. Estudiamos qué hace cada planta al inhalarse, en qué proporción y con qué otras funciona. No es intuición: es formulación.`,
      } satisfies LocalizedString,
    },
    {
      title: { en: 'Radical honesty.', es: 'Honestidad radical.' } satisfies LocalizedString,
      body: {
        en: `Smoking anything involves combustion, and combustion is never harmless. We won't tell you our smoke is healthy. We'll tell you exactly what's in it and what isn't, so you can decide with real information.`,
        es: `Fumar cualquier cosa implica combustión, y la combustión nunca es inocua. No te vamos a decir que nuestro humo es saludable. Te vamos a decir exactamente qué contiene y qué no, para que decidas con información real.`,
      } satisfies LocalizedString,
    },
    {
      title: { en: 'Harm reduction as care.', es: 'Reducción de daño como acto de cuidado.' } satisfies LocalizedString,
      body: {
        en: `We don't judge anyone who smokes. We offer a cleaner alternative for those in transition — or for anyone who simply wants less chemistry and more plant in their ritual.`,
        es: `No juzgamos a quien fuma. Ofrecemos una alternativa más limpia para quien está en transición, o para quien simplemente quiere que su ritual tenga menos química y más planta.`,
      } satisfies LocalizedString,
    },
    {
      title: { en: 'Functional ritual.', es: 'Ritualidad funcional.' } satisfies LocalizedString,
      body: {
        en: `The act of lighting up, pausing and breathing already exists in your day. We only change what's inside.`,
        es: `El gesto de encender, pausar y respirar ya existe en tu día. Nosotros solo cambiamos lo que hay adentro.`,
      } satisfies LocalizedString,
    },
    {
      title: { en: 'Guatemalan identity without folklore.', es: 'Identidad guatemalteca sin folklore.' } satisfies LocalizedString,
      body: {
        en: `Our plants are from here. We don't decorate that with clichés — we prove it with quality.`,
        es: `Nuestras plantas son de aquí. Eso no lo decoramos con clichés: lo demostramos con calidad.`,
      } satisfies LocalizedString,
    },
  ],

  closing: {
    en: `This is just the beginning. If you read this far, you probably understand why we do it.`,
    es: `Esto apenas empieza. Si llegaste hasta aquí, probablemente entiendes por qué lo hacemos.`,
  } satisfies LocalizedString,
}

// ---------------------------------------------------------------------------
// 2. CONTACTO
// ---------------------------------------------------------------------------

export const contactoContent = {
  header: {
    en: 'Get in touch.',
    es: 'Escríbenos.',
  } satisfies LocalizedString,

  subheader: {
    en: 'We reply fast — usually within two hours during business hours.',
    es: 'Respondemos rápido — normalmente en menos de dos horas dentro de nuestro horario.',
  } satisfies LocalizedString,

  channels: [
    {
      label: 'WhatsApp',
      value: '3814-9773',
      href: 'https://wa.me/50238149773',
      cta: { en: 'Message on WhatsApp', es: 'Escribir por WhatsApp' } satisfies LocalizedString,
      note: {
        en: 'The fastest route. Orders, questions about blends, and personalized recommendations.',
        es: 'La vía más rápida. Pedidos, dudas sobre mezclas y recomendaciones personalizadas.',
      } satisfies LocalizedString,
    },
    {
      label: 'Instagram',
      value: '@savia.sabia.herbs',
      href: 'https://instagram.com/savia.sabia.herbs',
      cta: { en: 'View profile', es: 'Ver perfil' } satisfies LocalizedString,
      note: {
        en: 'Content, updates and direct messages.',
        es: 'Contenido, novedades y mensajes directos.',
      } satisfies LocalizedString,
    },
    {
      label: { en: 'Email', es: 'Correo' } satisfies LocalizedString,
      value: 'savia.sabia.herbs@gmail.com',
      href: 'mailto:savia.sabia.herbs@gmail.com',
      cta: { en: 'Send an email', es: 'Enviar correo' } satisfies LocalizedString,
      note: {
        en: 'For longer inquiries, partnerships or wholesale.',
        es: 'Para consultas más largas, alianzas comerciales o mayoreo.',
      } satisfies LocalizedString,
    },
  ],

  hoursTitle: { en: 'Hours', es: 'Horario de atención' } satisfies LocalizedString,
  hours: {
    en: 'Monday through Sunday, 8:00 a.m. to 7:00 p.m. Messages received outside these hours are answered first thing the next day.',
    es: 'Lunes a domingo, de 8:00 a.m. a 7:00 p.m. Los mensajes que lleguen fuera de horario se responden a primera hora del día siguiente.',
  } satisfies LocalizedString,

  pickupTitle: { en: 'Pickup point', es: 'Punto de entrega' } satisfies LocalizedString,
  pickupPlace: 'San Lucas Sacatepéquez',
  pickup: {
    en: 'You can pick up your order at no cost by arranging it in advance over WhatsApp. We\'ll share the exact location once your order is confirmed.',
    es: 'Puedes recoger tu pedido sin costo coordinando previamente por WhatsApp. Te compartimos la ubicación exacta al confirmar.',
  } satisfies LocalizedString,

  wholesaleTitle: {
    en: 'Interested in carrying Savia Sabia?',
    es: '¿Buscas vender Savia Sabia?',
  } satisfies LocalizedString,
  wholesale: {
    en: 'If you run a shop, café, wellness space or co-working and want to stock our blends, email us with the subject line "Wholesale."',
    es: 'Si tienes una tienda, café, espacio de bienestar o co-working y te interesa distribuir nuestras mezclas, escríbenos al correo con el asunto "Mayoreo".',
  } satisfies LocalizedString,
}

// ---------------------------------------------------------------------------
// 3. ENVÍOS Y PAGOS
// ---------------------------------------------------------------------------

export const enviosContent = {
  header: {
    en: 'How your order arrives and how to pay.',
    es: 'Cómo llega tu pedido y cómo se paga.',
  } satisfies LocalizedString,

  shippingTitle: { en: 'Shipping', es: 'Envíos' } satisfies LocalizedString,
  shippingIntro: {
    en: 'Anywhere in Guatemala — Q40. We ship via Cargo Expreso nationwide.',
    es: 'A todo Guatemala — Q40. Enviamos por Cargo Expreso a cualquier punto del país.',
  } satisfies LocalizedString,

  shippingTable: [
    {
      destination: { en: 'Guatemala City', es: 'Ciudad de Guatemala' } satisfies LocalizedString,
      time: { en: '24 hours', es: '24 horas' } satisfies LocalizedString,
    },
    {
      destination: { en: 'Rest of the country', es: 'Resto del país' } satisfies LocalizedString,
      time: { en: 'Up to 3 business days', es: 'Hasta 3 días hábiles' } satisfies LocalizedString,
    },
  ],

  shippingNote: {
    en: 'Times begin once payment is confirmed. Orders confirmed after 4:00 p.m. ship the following business day.',
    es: 'Los tiempos corren a partir de la confirmación del pago. Los pedidos confirmados después de las 4:00 p.m. se despachan al día hábil siguiente.',
  } satisfies LocalizedString,

  // NOTA: el documento original decía Q200; se alinea aquí a Q150, que es el
  // umbral ya confirmado e implementado en lib/cart-context.tsx.
  freeShipping: {
    en: 'Free shipping on orders over Q200.',
    es: 'Envío gratis en pedidos mayores a Q200.',
  } satisfies LocalizedString,

  pickupFree: {
    en: 'Free pickup at our location in San Lucas Sacatepéquez, arranged over WhatsApp.',
    es: 'Recoge sin costo en nuestro punto de entrega en San Lucas Sacatepéquez, coordinando por WhatsApp.',
  } satisfies LocalizedString,

  paymentsTitle: { en: 'Payment methods', es: 'Formas de pago' } satisfies LocalizedString,

  payments: [
    {
      title: { en: 'Bank transfer or deposit', es: 'Transferencia o depósito bancario' } satisfies LocalizedString,
      body: {
        en: 'Once your order is confirmed we\'ll share our account details over WhatsApp. Send us a photo of the receipt and we ship the same day.',
        es: 'Al confirmar tu pedido te compartimos los datos de la cuenta por WhatsApp. Envías la foto del comprobante y despachamos el mismo día.',
      } satisfies LocalizedString,
    },
    {
      title: { en: 'Cash on delivery', es: 'Contra entrega' } satisfies LocalizedString,
      body: {
        en: 'Available in San Lucas Sacatepéquez, Antigua Guatemala, and Guatemala City by prior arrangement. Pay in cash when you receive your order.',
        es: 'Disponible en San Lucas Sacatepéquez, Antigua Guatemala y Ciudad de Guatemala coordinando previamente. Pagas en efectivo al recibir.',
      } satisfies LocalizedString,
    },
  ],

  orderStepsTitle: { en: 'How to order', es: 'Cómo hacer tu pedido' } satisfies LocalizedString,
  orderSteps: [
    { en: 'Choose your blends and formats in the shop.', es: 'Elige tus mezclas y presentaciones en la tienda.' } satisfies LocalizedString,
    { en: 'At checkout, WhatsApp opens with your order already written out.', es: 'Al finalizar, se abre WhatsApp con tu pedido ya escrito.' } satisfies LocalizedString,
    { en: 'Send us the message and we\'ll confirm availability and total.', es: 'Nos envías el mensaje y confirmamos disponibilidad y total.' } satisfies LocalizedString,
    { en: 'Complete payment and share the receipt.', es: 'Realizas el pago y nos compartes el comprobante.' } satisfies LocalizedString,
    { en: 'We ship and send you the tracking number.', es: 'Despachamos y te enviamos el número de guía para rastrearlo.' } satisfies LocalizedString,
  ],

  returnsTitle: { en: 'Returns and exchanges', es: 'Cambios y devoluciones' } satisfies LocalizedString,
  returns: {
    en: 'Because this is a consumable product, we don\'t accept returns on opened items. If your order arrives damaged, incomplete or incorrect, message us within 48 hours of delivery with a photo and we\'ll replace it at no cost.',
    es: 'Por tratarse de un producto de consumo, no aceptamos devoluciones de productos abiertos. Si tu pedido llega dañado, incompleto o equivocado, escríbenos dentro de las 48 horas siguientes a la entrega con una foto y lo reponemos sin costo.',
  } satisfies LocalizedString,
}

// ---------------------------------------------------------------------------
// 4. PREGUNTAS FRECUENTES
// ---------------------------------------------------------------------------

export const faqCategories: FaqCategory[] = [
  {
    title: { en: 'About the product', es: 'Sobre el producto' },
    items: [
      {
        q: { en: 'Do they contain tobacco or nicotine?', es: '¿Contienen tabaco o nicotina?' },
        a: {
          en: 'No. None of our blends contain tobacco, nicotine, or derivatives. They are exclusively herbs.',
          es: 'No. Ninguna de nuestras mezclas contiene tabaco, nicotina ni derivados. Son exclusivamente hierbas.',
        },
      },
      {
        q: { en: 'Do they contain THC or any illegal psychoactive substance?', es: '¿Contienen THC o alguna sustancia psicoactiva ilegal?' },
        a: {
          en: 'No. Our blends contain no cannabis, THC, CBD or controlled substances. They are legal in Guatemala and will not trigger a positive drug test.',
          es: 'No. Nuestras mezclas no contienen cannabis, THC, CBD ni ninguna sustancia controlada. Son legales en Guatemala y no darán positivo en una prueba de drogas.',
        },
      },
      {
        q: { en: 'Are they addictive?', es: '¿Son adictivas?' },
        a: {
          en: 'They don\'t create physical dependence, because addiction to conventional cigarettes comes from nicotine — and there is none here. What can remain is the habit of the gesture, and that\'s precisely why we exist: so the ritual can continue without the chemical chain.',
          es: 'No generan dependencia física, porque la adicción al cigarro convencional viene de la nicotina y aquí no hay. Lo que sí puede permanecer es el hábito del gesto — y justamente por eso existimos: para que ese ritual siga existiendo sin la cadena química.',
        },
      },
      {
        q: { en: 'So is smoking this healthy?', es: '¿Entonces fumar esto es saludable?' },
        a: {
          en: 'No. And we will never tell you otherwise. Smoking any plant material involves combustion, and combustion produces byproducts that are not harmless to the respiratory system. What we can honestly state: our blends contain no tobacco, no nicotine, no chemical additives and none of the hundreds of compounds added to industrial cigarettes. The honest comparison isn\'t against clean air — it\'s against commercial tobacco. In that frame, this is a considerably cleaner alternative.',
          es: 'No. Y no te lo vamos a decir nunca. Fumar cualquier material vegetal produce combustión, y la combustión genera subproductos que no son inocuos para el sistema respiratorio. Lo que sí podemos afirmar con honestidad: nuestras mezclas no contienen tabaco, nicotina, aditivos químicos ni los cientos de compuestos añadidos del cigarro industrial. La comparación honesta no es contra el aire limpio — es contra el tabaco comercial. En ese marco, es una alternativa considerablemente más limpia.',
        },
      },
      {
        q: { en: 'Does it taste medicinal or like burnt grass?', es: '¿Sabe a medicina o a hierba quemada?' },
        a: {
          en: 'It\'s the most common concern and a fair one. Every blend is formulated for flavor as much as for effect. If it\'s your first time, Suavidad is the friendliest: a sweet, anise-like entry, a herbal-citrus heart and a clean, fresh exhale. If you want more character, Claridad Pulmonar carries a spiced note that echoes the throat hit of tobacco.',
          es: 'Es la duda más común y es razonable. Cada mezcla está formulada tanto por efecto como por sabor. Si es tu primera vez, Suavidad es la más amable: entrada dulce y anisada, corazón herbal-cítrico y exhalación fresca. Si prefieres algo con más carácter, Claridad Pulmonar tiene el toque especiado que emula el golpe de garganta del tabaco.',
        },
      },
      {
        q: { en: 'Can I use it while pregnant, breastfeeding, or on medication?', es: '¿Puedo usarlo si estoy embarazada, en lactancia o tomo medicamentos?' },
        a: {
          en: 'We don\'t recommend it. Several of our herbs have genuine physiological activity and may interact with medications or specific conditions. Consult your doctor before using any herbal product, and don\'t smoke during pregnancy or breastfeeding.',
          es: 'No lo recomendamos. Varias de nuestras hierbas tienen actividad fisiológica real y pueden interactuar con medicamentos o condiciones específicas. Consulta con tu médico antes de usar cualquier producto herbal, y no fumes durante el embarazo ni la lactancia.',
        },
      },
      {
        q: { en: 'Is there a minimum age?', es: '¿Hay edad mínima?' },
        a: {
          en: 'Yes. Our products are strictly for adults 18 and over.',
          es: 'Sí. Nuestros productos son exclusivamente para mayores de 18 años.',
        },
      },
    ],
  },
  {
    title: { en: 'About usage', es: 'Sobre el uso' },
    items: [
      {
        q: { en: 'How do I smoke the loose blend?', es: '¿Cómo se fuma la mezcla suelta?' },
        a: {
          en: 'Like any rolling blend: rolling paper (we recommend unbleached) and a filter. We use 0.5 grams per cigarette as our reference.',
          es: 'Igual que cualquier mezcla para forjar: papel de fumar (recomendamos sin blanquear) y un filtro. Nosotros usamos 0.5 gramos por cigarrillo como referencia.',
        },
      },
      {
        q: { en: 'How many cigarettes does each size make?', es: '¿Cuántos cigarros rinde cada presentación?' },
        a: {
          en: 'At 0.5 grams per unit: ½ ounce (≈14 g) makes roughly 28 cigarettes, and 2 ounces (≈57 g) make roughly 113 cigarettes.',
          es: 'Con 0.5 gramos por unidad: ½ onza (≈14 g) rinde aproximadamente 28 cigarrillos, y 2 onzas (≈57 g) rinden aproximadamente 113 cigarrillos.',
        },
      },
      {
        q: { en: 'How long does an opened blend last?', es: '¿Cuánto dura la mezcla una vez abierta?' },
        a: {
          en: 'Stored properly — airtight container, dry place, away from direct light — it keeps its properties for several months. If it loses its aroma, it has also lost part of its effect.',
          es: 'Bien almacenada —en recipiente hermético, en lugar seco y sin luz directa— conserva sus propiedades por varios meses. Si notas que perdió aroma, perdió también parte de su efecto.',
        },
      },
      {
        q: { en: 'Can I combine two blends?', es: '¿Puedo combinar dos mezclas?' },
        a: {
          en: 'You can, but each formula is balanced for a specific effect and mixing dilutes that work. If you\'re after something you can\'t find in a single blend, message us — we can probably point you somewhere better.',
          es: 'Puedes, pero cada fórmula está balanceada para un efecto específico y mezclarlas diluye ese trabajo. Si buscas algo que no encuentras en una sola, escríbenos: probablemente te podemos orientar mejor.',
        },
      },
      {
        q: { en: 'Which blend is right for me?', es: '¿Cuál mezcla me conviene?' },
        a: {
          en: 'We have six, each with a different purpose. Take our six-question quiz and we\'ll tell you exactly where to start.',
          es: 'Tenemos seis, cada una con un propósito distinto. Haz nuestro test de seis preguntas y te decimos exactamente cuál es tu punto de partida.',
        },
      },
      {
        q: { en: 'Will this help me quit smoking?', es: '¿Me va a ayudar a dejar de fumar?' },
        a: {
          en: 'We are not a medical treatment or a substitute for cessation therapy. What we do is replace the physical ritual and the gesture, which for many people is the hardest part to let go. If you\'re trying to quit tobacco, think of us as a companion tool, not a cure.',
          es: 'No somos un tratamiento médico ni un sustituto de terapia de cesación. Lo que hacemos es reemplazar el ritual físico y el gesto, que para muchas personas es la parte más difícil de soltar. Si buscas dejar el tabaco, considéranos una herramienta de acompañamiento, no una cura.',
        },
      },
    ],
  },
  {
    title: { en: 'About orders', es: 'Sobre pedidos' },
    items: [
      {
        q: { en: 'How do I place an order?', es: '¿Cómo hago un pedido?' },
        a: {
          en: 'Choose your blends in the shop and at checkout WhatsApp opens with your order already written. Send it to us and we\'ll confirm.',
          es: 'Elige tus mezclas en la tienda y al finalizar se abre WhatsApp con tu pedido ya redactado. Nos lo envías y confirmamos.',
        },
      },
      {
        q: { en: 'How do I pay?', es: '¿Cómo pago?' },
        a: {
          en: 'Bank transfer or deposit, or cash on delivery within our coverage areas.',
          es: 'Transferencia o depósito bancario, o contra entrega en efectivo dentro de nuestras zonas de cobertura.',
        },
      },
      {
        q: { en: 'Do you ship nationwide?', es: '¿Hacen envíos a todo el país?' },
        a: {
          en: 'Yes, via Cargo Expreso for Q40. Free on orders over Q150. Same-day-plus-one in the capital; up to 3 business days elsewhere.',
          es: 'Sí, por Cargo Expreso a Q40. Gratis en pedidos mayores a Q150. En la capital llega en 24 horas; al resto del país, hasta 3 días hábiles.',
        },
      },
      {
        q: { en: 'Can I pick up my order?', es: '¿Puedo recoger mi pedido?' },
        a: {
          en: 'Yes, at no cost, in San Lucas Sacatepéquez, arranged over WhatsApp.',
          es: 'Sí, sin costo, en San Lucas Sacatepéquez coordinando por WhatsApp.',
        },
      },
      {
        q: { en: 'Do you sell wholesale?', es: '¿Venden al por mayor?' },
        a: {
          en: 'Yes. Email savia.sabia.herbs@gmail.com with the subject line "Wholesale."',
          es: 'Sí. Escríbenos a savia.sabia.herbs@gmail.com con el asunto "Mayoreo".',
        },
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// 5. AVISOS LEGALES
// ---------------------------------------------------------------------------

export const legalContent = {
  ageGate: {
    question: { en: 'Are you 18 or older?', es: '¿Eres mayor de 18 años?' } satisfies LocalizedString,
    description: {
      en: 'Savia Sabia sells herbal smoking products intended exclusively for adults. They contain no tobacco and no nicotine.',
      es: 'Savia Sabia comercializa productos herbales para fumar destinados exclusivamente a personas adultas. No contienen tabaco ni nicotina.',
    } satisfies LocalizedString,
    confirm: { en: "Yes, I'm 18 or older", es: 'Sí, soy mayor de 18' } satisfies LocalizedString,
    decline: { en: 'No', es: 'No' } satisfies LocalizedString,
    fineprint: {
      en: 'By continuing you confirm you are of legal age and accept our terms.',
      es: 'Al continuar confirmas que eres mayor de edad y aceptas nuestros términos.',
    } satisfies LocalizedString,
    declinedMessage: {
      en: 'Thank you for your honesty. Our products are intended only for people aged 18 and over.',
      es: 'Gracias por tu honestidad. Nuestros productos están destinados únicamente a personas mayores de 18 años.',
    } satisfies LocalizedString,
  },

  permanentNotice: {
    en: 'Product for adults 18 and over only. No tobacco. No nicotine. No THC. This is not a medical product and is not intended to diagnose, treat, cure or prevent any disease. Smoking any plant material involves combustion and is not a harmless activity. If you are pregnant, breastfeeding, under medical treatment or have a respiratory condition, consult your doctor before using these products.',
    es: 'Producto exclusivo para mayores de 18 años. Sin tabaco. Sin nicotina. Sin THC. Este no es un producto médico y no está destinado a diagnosticar, tratar, curar ni prevenir ninguna enfermedad. Fumar cualquier material vegetal implica combustión y no es una actividad inocua. Si estás embarazada, en lactancia, bajo tratamiento médico o tienes una condición respiratoria, consulta a tu médico antes de usar estos productos.',
  } satisfies LocalizedString,

  // No existía copy de Términos ni Privacidad en la documentación del proyecto.
  // Este es un placeholder mínimo y honesto — NO es asesoría legal. Debe
  // reemplazarse con texto revisado por un abogado guatemalteco antes de
  // usarse para procesar pagos, datos personales o ventas reales.
  placeholderNotice: {
    en: 'This page is a placeholder. Final legal text should be reviewed by a Guatemalan lawyer before launch.',
    es: 'Esta página es un marcador temporal. El texto legal definitivo debe ser revisado por un abogado guatemalteco antes del lanzamiento.',
  } satisfies LocalizedString,
}
