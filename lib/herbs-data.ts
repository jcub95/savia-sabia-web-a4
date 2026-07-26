export interface LocalizedString {
  en: string
  es: string
}

// Wraps a string as a LocalizedString with the same value in both languages.
// Used as a placeholder for fields pending official Spanish translation.
const p = (en: string): LocalizedString => ({ en, es: en })

export interface Herb {
  id: string
  name: LocalizedString
  category: 'calming' | 'energizing' | 'respiratory' | 'aromatic' | 'balancing'
  benefits: LocalizedString[]
  effects: LocalizedString
  description: LocalizedString
  flavorProfile: LocalizedString
  role: LocalizedString
  icon: string
  image: string
  color: string
}

export const herbs: Herb[] = [
  {
    id: 'thyme',
    name: { en: 'Thyme', es: 'Tomillo' },
    category: 'respiratory',
    benefits: [p('Respiratory support'), p('Antimicrobial properties'), p('Digestive aid')],
    effects: p('A warming, cleansing sensation with subtle earthiness. Promotes clear breathing and mental clarity.'),
    description: p('Thyme has been used for centuries in traditional medicine for its powerful respiratory benefits. Its natural compounds help open airways and provide a grounding, herbal experience.'),
    flavorProfile: {
      en: 'Earthy and spiced, with a defined scratch in the throat.',
      es: 'Terroso y especiado, con un picor definido en la garganta.',
    },
    role: {
      en: 'Delivers the characterful scratch tobacco smokers miss.',
      es: 'Aporta el raspado con carácter que extraña el fumador de tabaco.',
    },
    icon: '🌿',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thyme%20-%20Tomillo-SBKN2oaDs918pxnWm7UYODRybbXDqm.jpg',
    color: 'from-green-600 to-green-800',
  },
  {
    id: 'mullein',
    name: { en: 'Mullein', es: 'Gordolobo' },
    category: 'respiratory',
    benefits: [
      { en: 'Lung cleansing',  es: 'Expectorante natural' },
      { en: 'Smooth smoke',    es: 'Ayuda a expulsar mucosidad y residuos pulmonares' },
      { en: 'Throat soothing', es: 'Limpieza pulmonar profunda' },
    ],
    effects: {
      en: 'Exceptionally smooth smoke that feels gentle on the throat and lungs. Creates a soft, velvety sensation.',
      es: 'Humo suave, neutro y demulcente; no raspa la garganta.',
    },
    description: {
      en: 'Known as the "lungs herb," Mullein produces one of the smoothest smokes possible. It has been traditionally used to support healthy lung function and clear congestion.',
      es: '"Héroe de la Renovación." Sustituye el tabaco y limpia el daño acumulado en los pulmones.',
    },
    flavorProfile: {
      en: 'Practically neutral. Smooth, silky smoke that does not scratch.',
      es: 'Prácticamente neutro. Humo suave y sedoso que no raspa.',
    },
    role: {
      en: 'Structural base of the blend. Adds body without competing.',
      es: 'Base estructural de la mezcla. Aporta cuerpo sin competir.',
    },
    icon: '🍃',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mullein%20-%20Gordolobo-gXs643nZf2BLTHSqqR1w6VwwWv1iaD.jpeg',
    color: 'from-lime-500 to-green-600',
  },
  {
    id: 'lemon-balm',
    name: { en: 'Lemon Balm', es: 'Melisa' },
    category: 'calming',
    benefits: [p('Stress relief'), p('Mood enhancement'), p('Mental relaxation')],
    effects: p('A gentle, uplifting calm that eases tension without sedation. Promotes positive mood and mental ease.'),
    description: p('Lemon Balm brings a bright, citrusy note to any blend while providing natural calming properties. It helps quiet racing thoughts and promotes a sense of peaceful alertness.'),
    flavorProfile: {
      en: 'Fresh herbal-citrus, with hints of lemon and fresh-cut grass.',
      es: 'Herbal-cítrico fresco, con recuerdo a limón y hierba recién cortada.',
    },
    role: {
      en: 'Lightens the blend\'s core and adds daytime freshness.',
      es: 'Aligera el corazón de la mezcla y aporta frescura diurna.',
    },
    icon: '🍋',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lemon%20Balm%20-%20Melissa-vaubbTkfFYyMF1jPqddR6a9urRHuQ5.jpg',
    color: 'from-yellow-400 to-lime-500',
  },
  {
    id: 'chamomile',
    name: { en: 'Chamomile', es: 'Manzanilla' },
    category: 'calming',
    benefits: [p('Deep relaxation'), p('Sleep support'), p('Anxiety reduction')],
    effects: p("A warm, gentle wave of relaxation that settles the mind and body. Perfect for unwinding after a long day."),
    description: p("Chamomile is the quintessential relaxation herb. Its gentle, apple-like sweetness creates a soothing experience that helps release the day's tensions."),
    flavorProfile: {
      en: 'Sweet and floral, with apple and warm hay notes.',
      es: 'Dulce y floral, con nota de manzana y heno tibio.',
    },
    role: {
      en: 'Softens and adds familiar warmth. Rounds out harsh profiles.',
      es: 'Suaviza y da calidez familiar. Redondea perfiles ásperos.',
    },
    icon: '🌼',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chamomille%20-%20Manzanilla-4E0GwB2yJu52I6vtrW2qXv0TBPfmpr.jpg',
    color: 'from-amber-300 to-yellow-500',
  },
  {
    id: 'pericorn',
    name: { en: 'Pericón', es: 'Pericón' },
    category: 'energizing',
    benefits: [p('Mental stimulation'), p('Focus enhancement'), p('Energy boost')],
    effects: p('A subtle, invigorating lift that sharpens focus and provides gentle energy without jitters.'),
    description: p("Pericorn offers a unique stimulating experience, providing natural energy and mental clarity. Ideal for those seeking an alternative to tobacco's stimulating effects."),
    flavorProfile: {
      en: 'Markedly sweet with anise notes. Warm, enveloping smoke.',
      es: 'Marcadamente dulce con notas de anís. Humo cálido y envolvente.',
    },
    role: {
      en: 'Guatemalan flavor signature. Sets the blend apart from any other.',
      es: 'Firma de sabor guatemalteca. Distingue la mezcla de cualquier otra.',
    },
    icon: '⚡',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pericone%20-%20Pericon-qTMApt4bmFCT6TTv82vwMgHsuX0L86.jpg',
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 'damiana',
    name: { en: 'Damiana', es: 'Damiana' },
    category: 'balancing',
    benefits: [p('Mood elevation'), p('Aphrodisiac properties'), p('Nervous system support')],
    effects: p('A warm, euphoric feeling that lifts the spirits and creates a sense of well-being and connection.'),
    description: p('Damiana has been treasured for centuries for its mood-enhancing and aphrodisiac qualities. It creates a gentle euphoria and sense of openness.'),
    flavorProfile: {
      en: 'Sweet and earthy, with a warm, almost toasted undertone.',
      es: 'Dulce y terroso, con un trasfondo cálido casi tostado.',
    },
    role: {
      en: 'Adds depth and sweet body. Anchors floral profiles.',
      es: 'Da profundidad y cuerpo dulce. Ancla los perfiles florales.',
    },
    icon: '💫',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Damiana%20-%20Damiana-h5repTpqkcgqcLLgIaqdVx6zS4hokh.jpg',
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 'lavender',
    name: { en: 'Lavender', es: 'Lavanda' },
    category: 'calming',
    benefits: [
      { en: 'Anxiety relief',     es: 'Reduce el cortisol' },
      { en: 'Sleep support',      es: 'Disminuye la ansiedad' },
      { en: 'Headache reduction', es: 'Promueve la calma' },
    ],
    effects: {
      en: 'Deeply calming aromatherapy experience that soothes nerves and promotes peaceful tranquility.',
      es: 'Relajación del sistema nervioso; suaviza el humo con notas florales.',
    },
    description: {
      en: 'The iconic purple flower known worldwide for its calming properties. Lavender creates a spa-like experience with every breath.',
      es: '"El Botón de Pausa." Sustituto ideal para el cigarrillo de estrés laboral.',
    },
    flavorProfile: {
      en: 'Soft floral with a sweet, slightly camphoraceous base.',
      es: 'Floral suave con fondo dulce y ligeramente alcanforado.',
    },
    role: {
      en: 'Softens the throat hit and perfumes the smoke.',
      es: 'Suaviza el golpe de garganta y perfuma el humo.',
    },
    icon: '💜',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lavender%20-%20Lavanda-bLJ3wZpbKMzqZazbZL9Obgm54BEDVF.jpg',
    color: 'from-purple-400 to-indigo-500',
  },
  {
    id: 'roses',
    name: { en: 'Roses', es: 'Rosas' },
    category: 'aromatic',
    benefits: [p('Heart opening'), p('Emotional balance'), p('Anti-inflammatory')],
    effects: p('A gentle, heart-centered experience that promotes emotional openness and self-compassion.'),
    description: p('Rose petals bring elegance and emotional depth to any blend. Known for opening the heart chakra and promoting feelings of love and acceptance.'),
    flavorProfile: {
      en: 'Elegant and perfumed floral, light, with a clean aftertaste.',
      es: 'Floral elegante y perfumado, ligero, con retrogusto limpio.',
    },
    role: {
      en: 'Elevates the aromatic profile and lightens the smoke. Aesthetic ingredient.',
      es: 'Eleva el perfil aromático y aligera el humo. Ingrediente estético.',
    },
    icon: '🌹',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Roses%20-%20Rosa-UhAdDTOA4nrQ1mLvqHBcj0nZpeYy0K.jpg',
    color: 'from-rose-400 to-pink-600',
  },
  {
    id: 'calendula',
    name: { en: 'Calendula', es: 'Caléndula' },
    category: 'balancing',
    benefits: [p('Skin health'), p('Lymphatic support'), p('Gentle healing')],
    effects: p('A warm, sunny energy that brings comfort and promotes internal balance and healing.'),
    description: p('Also known as marigold, Calendula brings solar energy and gentle healing properties. It adds a warm, comforting quality to blends.'),
    flavorProfile: {
      en: 'Soft and neutral, barely perceptible among the other notes.',
      es: 'Suave y neutro, apenas perceptible entre las demás notas.',
    },
    role: {
      en: 'Regulates the burn rate so it burns evenly.',
      es: 'Regula la velocidad de combustión para que queme parejo.',
    },
    icon: '🌻',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Calendula%20-%20Calendula-QfuvEv7zywnTeJdLNTXuxO5RqlAQ84.jpg',
    color: 'from-orange-300 to-amber-500',
  },
  {
    id: 'rosemary',
    name: { en: 'Rosemary', es: 'Romero' },
    category: 'energizing',
    benefits: [p('Memory enhancement'), p('Circulation boost'), p('Mental clarity')],
    effects: p('An awakening, clarifying sensation that sharpens the mind and improves focus and recall.'),
    description: p('The herb of remembrance, Rosemary has been used since ancient times to enhance memory and mental performance. Its invigorating aroma stimulates the senses.'),
    flavorProfile: {
      en: 'Resinous and sharp, woody, with a piney aromatic edge.',
      es: 'Resinoso y punzante, maderoso, con filo aromático de pino.',
    },
    role: {
      en: 'Invigorates the blend and adds crispness to the draw.',
      es: 'Vigoriza la mezcla y aporta nitidez a la calada.',
    },
    icon: '🌲',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rosemary%20-%20Romero-ySSL65ypbLiMTNlQ3vNWGVYyBn4Hif.jpg',
    color: 'from-teal-500 to-green-600',
  },
  {
    id: 'eucalyptus',
    name: { en: 'Eucalyptus', es: 'Eucalipto' },
    category: 'respiratory',
    benefits: [p('Airway clearing'), p('Decongestant'), p('Antimicrobial')],
    effects: p('A cooling, opening sensation that clears the sinuses and promotes deep, easy breathing.'),
    description: p('Eucalyptus provides powerful respiratory support with its cooling menthol-like properties. Excellent for clearing airways and promoting fresh breath.'),
    flavorProfile: {
      en: 'Balsamic and camphoraceous, penetrating, with a clean medicinal finish.',
      es: 'Balsámico y alcanforado, penetrante, con final medicinal limpio.',
    },
    role: {
      en: 'Expands the draw and creates an open-airway sensation.',
      es: 'Expande la calada y da sensación de vía aérea abierta.',
    },
    icon: '🌿',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Eucalyptus%20-%20Eucalipto-TMjokzHFidLneZIX9j2k4y3SX75SVt.jpg',
    color: 'from-cyan-400 to-teal-500',
  },
  {
    id: 'jasmine',
    name: { en: 'Jasmine', es: 'Jazmín' },
    category: 'aromatic',
    benefits: [p('Mood uplift'), p('Stress reduction'), p('Sensory pleasure')],
    effects: p('An intoxicating, luxurious experience that elevates mood and creates a sense of exotic indulgence.'),
    description: p('Jasmine flowers create an exquisitely aromatic experience. Known as the "queen of the night," it promotes feelings of optimism and romantic openness.'),
    flavorProfile: {
      en: 'Sweet and exotic floral, penetrating, with a refined finish.',
      es: 'Floral dulce y exótico, penetrante, con final refinado.',
    },
    role: {
      en: 'Perfumes the secondhand smoke. Neutralizes the smell of smoke.',
      es: 'Perfuma el humo secundario. Neutraliza el olor a fumado.',
    },
    icon: '✨',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jasmine%20-%20Jazmin-pHvalHZOc6KdIRPIHr6PdSTS0ILROp.jpg',
    color: 'from-white to-yellow-200',
  },
  {
    id: 'mint',
    name: { en: 'Mint', es: 'Menta' },
    category: 'respiratory',
    benefits: [p('Respiratory clearing'), p('Digestive support'), p('Mental refreshment')],
    effects: p("A crisp, invigorating coolness that awakens the senses and clears the mind. Provides immediate freshness and clarity."),
    description: p("Mint is nature's breath of fresh air. Its cooling menthol properties open airways, soothe digestion, and create an instantly refreshing smoking experience."),
    flavorProfile: {
      en: 'Fresh and crisp menthol. Clean cold on the exhale.',
      es: 'Mentolado fresco y crujiente. Frío limpio en la exhalación.',
    },
    role: {
      en: 'Provides the throat hit and opens the exhale.',
      es: 'Aporta el golpe de garganta y abre la exhalación.',
    },
    icon: '🌱',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mint%20-%20Menta-wojVr9zrO7p1veEFAm1dDVRtxWa6Mn.jpg',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'passionflower',
    name: { en: 'Passionflower', es: 'Pasiflora' },
    category: 'calming',
    benefits: [p('Deep relaxation'), p('Anxiety relief'), p('Sleep support')],
    effects: p('A profound, sedative calm that quiets racing thoughts and prepares the body for deep rest. Powerfully tranquilizing.'),
    description: p("Passionflower is one of nature's most potent calming herbs. Used traditionally for insomnia and anxiety, it provides deep relaxation without next-day grogginess."),
    flavorProfile: {
      en: 'Green and herbal, subtle, without marked sweetness or bitterness.',
      es: 'Verde y herbal, discreto, sin dulzor ni amargor marcado.',
    },
    role: {
      en: 'Adds sedation to the profile without altering the blend\'s flavor.',
      es: 'Aporta sedación al perfil sin alterar el sabor de la mezcla.',
    },
    icon: '🌸',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Passionflower%20-%20Pasiflora-vI0W64jAuXFcoCALX8RKNQapIINKLv.jpg',
    color: 'from-violet-400 to-purple-600',
  },
  {
    id: 'sage',
    name: { en: 'Sage', es: 'Salvia' },
    category: 'balancing',
    benefits: [p('Mental clarity'), p('Purification'), p('Hormonal balance')],
    effects: p('A grounding, clarifying sensation that cleanses the mind and promotes wisdom. Creates a sense of sacred ritual.'),
    description: p('Sage has been used for millennia in spiritual and healing practices. Its purifying smoke clears negative energy while promoting mental sharpness and inner balance.'),
    flavorProfile: {
      en: 'Robust and woody herbal, with a dry, clean character.',
      es: 'Herbal robusto y maderoso, con carácter seco y limpio.',
    },
    role: {
      en: 'Adds density and presence on the palate. Emulates tobacco\'s strength.',
      es: 'Da densidad y presencia en boca. Emula la fuerza del tabaco.',
    },
    icon: '🍃',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sage%20-%20Salvia-OEKi05ZlibVu6EUxbflVOxYYMm6WKu.jpg',
    color: 'from-slate-400 to-green-600',
  },
]

export type BlendId =
  | 'suavidad' | 'nutre-el-alma' | 'proteccion'
  | 'enfoque'  | 'sueno-profundo' | 'claridad-pulmonar'

export interface QuizOption {
  id: string
  label: LocalizedString
  scores: Partial<Record<BlendId, number>>
}

export interface QuizQuestion {
  id: string
  question: LocalizedString
  options: QuizOption[]   // siempre 4, selección única
}

export type QuizAnswers = Record<string, string>  // questionId → optionId

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'p1',
    question: {
      es: '¿Cuál es tu relación actual con el tabaco?',
      en: 'What is your current relationship with tobacco?',
    },
    options: [
      {
        id: 'a',
        label: { es: 'Fumo a diario y quiero limpiar mis pulmones', en: 'I smoke daily and want to clear my lungs' },
        scores: { 'claridad-pulmonar': 3, 'proteccion': 2 },
      },
      {
        id: 'b',
        label: { es: 'Fumo ocasionalmente por estrés o ansiedad', en: 'I smoke occasionally due to stress or anxiety' },
        scores: { 'suavidad': 3, 'nutre-el-alma': 1 },
      },
      {
        id: 'c',
        label: { es: 'Ya casi no fumo, pero extraño el ritual', en: 'I barely smoke now, but I miss the ritual' },
        scores: { 'suavidad': 2, 'nutre-el-alma': 2, 'enfoque': 1 },
      },
      {
        id: 'd',
        label: { es: 'Fumo de noche para desconectarme del día', en: 'I smoke at night to disconnect from the day' },
        scores: { 'sueno-profundo': 3, 'suavidad': 1 },
      },
    ],
  },
  {
    id: 'p2',
    question: {
      es: '¿Qué buscas principalmente en tu ritual de humo?',
      en: 'What are you mainly looking for in your smoking ritual?',
    },
    options: [
      {
        id: 'a',
        label: { es: 'Sentir mis vías respiratorias despejadas', en: 'Feeling my airways clear and light' },
        scores: { 'claridad-pulmonar': 4, 'proteccion': 3 },
      },
      {
        id: 'b',
        label: { es: 'Bajar el ritmo y calmar la agitación mental', en: 'Slowing down and quieting mental noise' },
        scores: { 'suavidad': 4, 'sueno-profundo': 2 },
      },
      {
        id: 'c',
        label: { es: 'Concentrarme o tener claridad creativa', en: 'Focusing or finding creative clarity' },
        scores: { 'enfoque': 4 },
      },
      {
        id: 'd',
        label: { es: 'Elevar mi ánimo con algo sensorial', en: 'Lifting my mood with something sensory' },
        scores: { 'nutre-el-alma': 4 },
      },
    ],
  },
  {
    id: 'p3',
    question: {
      es: '¿En qué momento del día te hace más falta encender?',
      en: 'When during the day do you most feel like lighting up?',
    },
    options: [
      {
        id: 'a',
        label: { es: 'A primera hora o después de comer', en: 'First thing in the morning or after meals' },
        scores: { 'suavidad': 2, 'enfoque': 2 },
      },
      {
        id: 'b',
        label: { es: 'En media jornada laboral o en el tráfico', en: 'Mid-workday or stuck in traffic' },
        scores: { 'enfoque': 3, 'proteccion': 1 },
      },
      {
        id: 'c',
        label: { es: 'Justo antes de ir a dormir', en: 'Right before going to sleep' },
        scores: { 'sueno-profundo': 4 },
      },
      {
        id: 'd',
        label: { es: 'En mi tiempo libre o momentos especiales', en: 'In my free time or on special occasions' },
        scores: { 'nutre-el-alma': 3 },
      },
    ],
  },
  {
    id: 'p4',
    question: {
      es: '¿Cómo describirías tu estado respiratorio hoy?',
      en: 'How would you describe your breathing today?',
    },
    options: [
      {
        id: 'a',
        label: { es: 'Siento pesadez, congestión o flema', en: 'Heaviness, congestion or recurring phlegm' },
        scores: { 'claridad-pulmonar': 4 },
      },
      {
        id: 'b',
        label: { es: 'Garganta reseca o irritada', en: 'Dry or irritated throat' },
        scores: { 'proteccion': 3, 'suavidad': 2 },
      },
      {
        id: 'c',
        label: { es: 'Bien, quiero mantenerlo así', en: 'Fine — I want to keep it that way' },
        scores: { 'proteccion': 2, 'enfoque': 1 },
      },
      {
        id: 'd',
        label: { es: 'Cansado, pero con la mente acelerada', en: 'Tired, but my mind won\'t slow down' },
        scores: { 'sueno-profundo': 3, 'suavidad': 1 },
      },
    ],
  },
  {
    id: 'p5',
    question: {
      es: 'Si dejas el tabaco, ¿qué te preocupa más?',
      en: 'If you quit tobacco, what worries you most?',
    },
    options: [
      {
        id: 'a',
        label: { es: 'Extrañar el golpe de humo en la garganta', en: 'Missing the throat hit' },
        scores: { 'claridad-pulmonar': 3, 'proteccion': 2 },
      },
      {
        id: 'b',
        label: { es: 'Ponerme irritable o de mal humor', en: 'Becoming irritable or moody' },
        scores: { 'suavidad': 3, 'nutre-el-alma': 2 },
      },
      {
        id: 'c',
        label: { es: 'Perder el enfoque o la productividad', en: 'Losing focus or productivity' },
        scores: { 'enfoque': 4 },
      },
      {
        id: 'd',
        label: { es: 'Extrañar el sabor y el ritual social', en: 'Missing the flavor and social ritual' },
        scores: { 'nutre-el-alma': 3, 'suavidad': 1 },
      },
    ],
  },
  {
    id: 'p6',
    question: {
      es: '¿Qué perfil de sabor prefieres?',
      en: 'Which flavor profile do you prefer?',
    },
    options: [
      {
        id: 'a',
        label: { es: 'Terroso, fuerte y medicinal', en: 'Earthy, strong and medicinal' },
        scores: { 'claridad-pulmonar': 2, 'proteccion': 2 },
      },
      {
        id: 'b',
        label: { es: 'Neutro, suave y ligero', en: 'Neutral, soft and light' },
        scores: { 'suavidad': 2 },
      },
      {
        id: 'c',
        label: { es: 'Fresco, mentolado o herbal intenso', en: 'Fresh, minty or intensely herbal' },
        scores: { 'enfoque': 2, 'claridad-pulmonar': 1 },
      },
      {
        id: 'd',
        label: { es: 'Floral, dulce y aromático', en: 'Floral, sweet and aromatic' },
        scores: { 'nutre-el-alma': 2, 'sueno-profundo': 1 },
      },
    ],
  },
]

export type SmokerProfileType =
  | 'transition'      // El Fumador en Transición
  | 'anxiolytic'      // El Perfil Ansiolítico
  | 'productive'      // El Perfil Productivo / Creativo
  | 'sensory'         // El Perfil Sensorial / Lifestyle

export interface SmokerProfile {
  type: SmokerProfileType
  name: LocalizedString
  description: LocalizedString
  characteristics: LocalizedString[]
  recommendedApproach: LocalizedString
  icon: string
}

export const smokerProfiles: Record<SmokerProfileType, SmokerProfile> = {
  transition: {
    type: 'transition',
    name: {
      en: 'The Smoker in Transition',
      es: 'El Fumador en Transición',
    },
    description: {
      en: 'You are on a journey to leave tobacco behind, detoxify your lungs, and break the chemical dependency on nicotine. Your biggest concern is keeping the throat hit while getting rid of the heaviness and congestion.',
      es: 'Buscas dejar el tabaco industrial, desintoxicar los pulmones y romper la dependencia química de la nicotina. Tu mayor preocupación es conservar el golpe de garganta mientras te libras de la pesadez pulmonar.',
    },
    characteristics: [
      { en: 'Smokes regularly or heavily', es: 'Fuma diariamente o con alta frecuencia' },
      { en: 'Experiences chest heaviness or recurring congestion', es: 'Siente pesadez o congestión pulmonar recurrente' },
      { en: 'Seeks the throat hit without tobacco or nicotine', es: 'Busca el golpe de garganta sin tabaco ni nicotina' },
      { en: 'Motivated by health and detoxification', es: 'Motivado por la salud y la desintoxicación' },
    ],
    recommendedApproach: {
      en: 'Claridad Pulmonar is your primary blend for deep expectorant cleansing. Protección works as a preventive shield against urban pollution when you are outside.',
      es: 'Claridad Pulmonar es tu mezcla principal: se encarga del trabajo pesado de expectoración y limpieza inicial. Protección funciona como escudo preventivo contra la contaminación urbana en exteriores.',
    },
    icon: '🔄',
  },
  anxiolytic: {
    type: 'anxiolytic',
    name: {
      en: 'The Anxiolytic Profile',
      es: 'El Perfil Ansiolítico',
    },
    description: {
      en: 'You use the act of smoking to regulate everyday stress, anxiety, or city traffic. Your pain points are irritability, mood swings when trying to cut back, and a mind that won\'t quiet down before sleep.',
      es: 'Usas el acto de fumar para regular el estrés cotidiano, la ansiedad o el tráfico de la ciudad. Tu punto de dolor es la irritabilidad, los cambios de humor y el ruido mental que no te deja descansar.',
    },
    characteristics: [
      { en: 'Smokes primarily for stress or social anxiety', es: 'Fuma principalmente por estrés o ansiedad social' },
      { en: 'Experiences mood changes when trying to cut back', es: 'Experimenta cambios de humor al intentar cortar' },
      { en: 'Seeks calm without excessive sedation', es: 'Busca calma sin sedación excesiva' },
      { en: 'Struggles to silence mental noise before sleep', es: 'Le cuesta apagar el ruido mental antes de dormir' },
    ],
    recommendedApproach: {
      en: 'Suavidad is the direct answer to relax your nervous system lightly throughout the day. Sueño Profundo is the cross strategy: those who live stressed by day need to deactivate the rumination of thoughts at night.',
      es: 'Suavidad es la respuesta directa para relajar el sistema nervioso de forma ligera durante el día. Sueño Profundo es la estrategia cruzada: quien vive estresado de día necesita desactivar la rumiación de pensamientos de noche.',
    },
    icon: '🧘',
  },
  productive: {
    type: 'productive',
    name: {
      en: 'The Productive / Creative Profile',
      es: 'El Perfil Productivo / Creativo',
    },
    description: {
      en: 'You are a professional, artist, programmer, or student who uses the smoking break as a catalyst or "bio-hack" for focus and output. Your pain points are mental fatigue, creative blocks, and rejection of stimulants that accelerate the heart.',
      es: 'Eres profesional, artista, programador o estudiante que usa el break de fumar como catalizador o "bio-hack" para concentrarse y producir. Tu punto de dolor es la fatiga cerebral, los bloqueos creativos y el rechazo a estimulantes que alteran el pulso.',
    },
    characteristics: [
      { en: 'Professional, artist, programmer, or student', es: 'Profesional, artista, programador o estudiante' },
      { en: 'Uses smoking as a focus and productivity tool', es: 'Usa el cigarro como herramienta de enfoque y productividad' },
      { en: 'Rejects stimulants that accelerate heart rate', es: 'Rechaza los estimulantes que aceleran el corazón' },
      { en: 'Needs clarity and alertness, not sedation', es: 'Necesita claridad y alerta, no sedación' },
    ],
    recommendedApproach: {
      en: 'Enfoque activates concentration and oxygenates the brain without nicotine-induced tachycardia. Suavidad balances the day and relieves residual tension from overwork.',
      es: 'Enfoque activa la concentración y oxigena el cerebro sin la taquicardia de la nicotina. Suavidad equilibra la jornada y alivia la tensión muscular residual del exceso de trabajo.',
    },
    icon: '📚',
  },
  sensory: {
    type: 'sensory',
    name: {
      en: 'The Sensory / Lifestyle Profile',
      es: 'El Perfil Sensorial / Lifestyle',
    },
    description: {
      en: 'You are a recreational or occasional consumer seeking the aesthetics, refined aroma, and plant mystique as a self-care or social ritual. Your pain points are the social stigma of tobacco smell and the lack of local premium options.',
      es: 'Eres consumidor recreativo u ocasional que busca la estética, el aroma refinado y la mística de las plantas como ritual de autocuidado o conexión social. Tu punto de dolor es el estigma del olor a tabaco y la falta de opciones locales y premium.',
    },
    characteristics: [
      { en: 'Recreational or occasional consumer', es: 'Consumidor recreativo u ocasional' },
      { en: 'Values aroma and ritual over effect', es: 'Valora el aroma y el ritual sobre el efecto' },
      { en: 'Sensitive to the social stigma of tobacco smell', es: 'Sensible al estigma social del olor a tabaco' },
      { en: 'Seeks local and premium options', es: 'Busca opciones locales y premium' },
    ],
    recommendedApproach: {
      en: 'Nutre el Alma for its high premium floral content, elegance in the air, and positive mood impact. Enfoque for creative moments, conversations, and gatherings where lucid presence matters.',
      es: 'Nutre el Alma por su alta carga floral premium, elegancia en el ambiente e impacto anímico positivo. Enfoque para momentos creativos, charlas o reuniones donde se busca socializar con presencia lúcida.',
    },
    icon: '✨',
  },
}

export interface UserProfile {
  smokingFrequency: string
  smokingDuration: string
  transitionGoal: string
  respiratoryHealth: string
  stressLevel: string
  preferredTime: string
  desiredEffect: string
  flavorPreferences: string[]
  smokerProfile?: SmokerProfileType
}

export interface Blend {
  id: string
  name: string
  displayName: LocalizedString
  description: LocalizedString
  herbs: string[] // herb IDs
  primaryEffect: 'calming' | 'energizing' | 'respiratory' | 'focus' | 'sleep' | 'spiritual'
  benefits: LocalizedString[]
  bestFor: LocalizedString[]
  timeOfDay: ('morning' | 'afternoon' | 'evening' | 'night')[]
  intensity: 'gentle' | 'moderate' | 'strong'
  color: string
}

export const blends: Blend[] = [
  {
    id: 'suavidad',
    name: 'Suavidad',
    displayName: { en: 'Blend Suavidad', es: 'Mezcla Suavidad' },
    description: p('A gentle, soothing blend designed to ease tension and bring softness to your day. Perfect for those seeking mild relaxation with refreshing clarity.'),
    herbs: ['pericorn', 'lemon-balm', 'chamomile', 'mint'],
    primaryEffect: 'calming',
    benefits: [p('Gentle relaxation'), p('Mental clarity'), p('Digestive comfort'), p('Stress relief')],
    bestFor: [p('Beginners'), p('Daytime relaxation'), p('After meals'), p('Light stress relief')],
    timeOfDay: ['morning', 'afternoon'],
    intensity: 'gentle',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'nutre-el-alma',
    name: 'Nutre El Alma',
    displayName: { en: 'Blend Nutre El Alma', es: 'Mezcla Nutre El Alma' },
    description: p('Nourish your soul with this deeply nurturing blend. A heart-opening combination that promotes emotional balance, self-love, and inner peace.'),
    herbs: ['damiana', 'calendula', 'roses', 'lavender', 'passionflower'],
    primaryEffect: 'calming',
    benefits: [p('Emotional balance'), p('Heart opening'), p('Deep relaxation'), p('Self-compassion')],
    bestFor: [p('Emotional healing'), p('Self-care rituals'), p('Anxiety relief'), p('Evening wind-down')],
    timeOfDay: ['evening', 'night'],
    intensity: 'moderate',
    color: 'from-rose-400 to-purple-500',
  },
  {
    id: 'proteccion',
    name: 'Proteccion',
    displayName: { en: 'Blend Proteccion', es: 'Mezcla Protección' },
    description: p('A protective, purifying blend that supports respiratory health while cleansing mind and spirit. Ideal for those transitioning from tobacco or seeking lung support.'),
    herbs: ['mullein', 'sage', 'rosemary', 'jasmine', 'eucalyptus'],
    primaryEffect: 'respiratory',
    benefits: [p('Respiratory support'), p('Mental purification'), p('Airway clearing'), p('Spiritual cleansing')],
    bestFor: [p('Tobacco transition'), p('Respiratory concerns'), p('Meditation'), p('Morning rituals')],
    timeOfDay: ['morning', 'afternoon'],
    intensity: 'moderate',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 'enfoque',
    name: 'Enfoque',
    displayName: { en: 'Blend Enfoque', es: 'Mezcla Enfoque' },
    description: {
      en: 'Sharpen your mind and enhance concentration with this focusing blend. Designed for productivity, study sessions, and creative work.',
      es: 'Produce una calada fría y revitalizante que despeja la fatiga mental y oxigena el cerebro, agudizando la concentración y la claridad para trabajar o crear.',
    },
    herbs: ['mullein', 'rosemary', 'damiana', 'mint'],
    primaryEffect: 'focus',
    benefits: [
      { en: 'Mental clarity',    es: 'Estimulante cognitivo' },
      { en: 'Focus enhancement', es: 'Mejora la concentración' },
      { en: 'Memory support',    es: 'Agudiza los sentidos' },
      { en: 'Gentle energy',     es: 'Combate la fatiga mental y el bloqueo creativo' },
    ],
    bestFor: [
      { en: 'Study sessions',       es: 'Profesionales y creativos' },
      { en: 'Work breaks',          es: 'Programadores y estudiantes' },
      { en: 'Creative projects',    es: 'Jornadas de trabajo intenso' },
      { en: 'Morning productivity', es: 'Break del café matutino' },
    ],
    timeOfDay: ['morning', 'afternoon'],
    intensity: 'moderate',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'sueno-profundo',
    name: 'Sueno Profundo',
    displayName: { en: 'Blend Sueño Profundo', es: 'Mezcla Sueño Profundo' },
    description: p('Drift into deep, restorative sleep with this powerful nighttime blend. A tranquil combination that quiets the mind and prepares the body for rest.'),
    herbs: ['pericorn', 'passionflower', 'lemon-balm', 'lavender'],
    primaryEffect: 'sleep',
    benefits: [p('Deep sleep'), p('Anxiety relief'), p('Racing thought relief'), p('Nighttime calm')],
    bestFor: [p('Insomnia'), p('Bedtime routine'), p('High anxiety'), p('Restless nights')],
    timeOfDay: ['night'],
    intensity: 'strong',
    color: 'from-indigo-500 to-purple-700',
  },
  {
    id: 'claridad-pulmonar',
    name: 'Claridad Pulmonar',
    displayName: { en: 'Blend Claridad Pulmonar', es: 'Mezcla Claridad Pulmonar' },
    description: p('The ultimate respiratory support blend. Clears airways, supports lung health, and provides a smooth, clean smoking experience for those prioritizing breath.'),
    herbs: ['mullein', 'eucalyptus', 'thyme', 'sage', 'mint'],
    primaryEffect: 'respiratory',
    benefits: [p('Lung cleansing'), p('Airway opening'), p('Respiratory recovery'), p('Smooth smoke')],
    bestFor: [p('Heavy smoker transition'), p('Respiratory support'), p('Congestion relief'), p('Lung health')],
    timeOfDay: ['morning', 'afternoon', 'evening'],
    intensity: 'strong',
    color: 'from-cyan-400 to-emerald-500',
  },
]

// Derives the narrative smoker profile from the winning blend.
// Docs: Quiz_Especificacion.md §3 "Etiqueta de perfil"
const blendToProfile: Record<BlendId, SmokerProfileType> = {
  'claridad-pulmonar': 'transition',
  'proteccion':        'transition',
  'suavidad':          'anxiolytic',
  'sueno-profundo':    'anxiolytic',
  'enfoque':           'productive',
  'nutre-el-alma':     'sensory',
}

export function determineSmokerProfile(primaryBlendId: BlendId): SmokerProfileType {
  return blendToProfile[primaryBlendId] ?? 'sensory'
}

export function calculateRecommendations(profile: UserProfile): Herb[] {
  const scores: Record<string, number> = {}

  // Initialize scores
  herbs.forEach(herb => {
    scores[herb.id] = 0
  })

  // Score based on respiratory health
  if (profile.respiratoryHealth === 'sensitive' || profile.respiratoryHealth === 'compromised') {
    scores['mullein'] += 5
    scores['thyme'] += 4
    scores['eucalyptus'] += 3
    scores['mint'] += 3
  }

  // Score based on stress level
  if (profile.stressLevel === 'high' || profile.stressLevel === 'very_high') {
    scores['chamomile'] += 5
    scores['lavender'] += 5
    scores['lemon-balm'] += 4
    scores['passionflower'] += 5
  }

  // Score based on desired effect
  switch (profile.desiredEffect) {
    case 'relaxation':
      scores['chamomile'] += 5
      scores['lavender'] += 5
      scores['lemon-balm'] += 3
      scores['passionflower'] += 5
      break
    case 'energy':
      scores['pericorn'] += 5
      scores['rosemary'] += 4
      scores['mint'] += 4
      break
    case 'clarity':
      scores['rosemary'] += 5
      scores['pericorn'] += 3
      scores['lemon-balm'] += 3
      scores['sage'] += 4
      scores['mint'] += 3
      break
    case 'respiratory':
      scores['eucalyptus'] += 5
      scores['mullein'] += 5
      scores['thyme'] += 4
      scores['mint'] += 4
      break
    case 'mood':
      scores['damiana'] += 5
      scores['roses'] += 4
      scores['jasmine'] += 4
      scores['sage'] += 3
      break
  }

  // Score based on preferred time
  switch (profile.preferredTime) {
    case 'morning':
      scores['rosemary'] += 3
      scores['pericorn'] += 3
      scores['eucalyptus'] += 2
      scores['mint'] += 3
      break
    case 'evening':
    case 'night':
      scores['chamomile'] += 3
      scores['lavender'] += 3
      scores['jasmine'] += 2
      scores['passionflower'] += 4
      break
    case 'afternoon':
      scores['lemon-balm'] += 2
      scores['damiana'] += 2
      scores['sage'] += 2
      break
  }

  // Score based on flavor preferences
  profile.flavorPreferences.forEach(pref => {
    switch (pref) {
      case 'floral':
        scores['roses'] += 3
        scores['lavender'] += 3
        scores['jasmine'] += 3
        scores['chamomile'] += 2
        scores['passionflower'] += 2
        break
      case 'earthy':
        scores['thyme'] += 3
        scores['mullein'] += 3
        scores['rosemary'] += 2
        scores['sage'] += 4
        scores['passionflower'] += 2
        break
      case 'citrus':
        scores['lemon-balm'] += 4
        break
      case 'sweet':
        scores['chamomile'] += 2
        scores['jasmine'] += 2
        scores['calendula'] += 2
        scores['mint'] += 2
        break
      case 'cooling':
        scores['eucalyptus'] += 4
        scores['pericorn'] += 2
        scores['mint'] += 5
        break
      case 'warm':
        scores['damiana'] += 3
        scores['calendula'] += 3
        scores['thyme'] += 2
        scores['sage'] += 3
        break
    }
  })

  // Score based on transition goal
  if (profile.transitionGoal === 'quit_tobacco' || profile.transitionGoal === 'reduce') {
    scores['mullein'] += 3 // Smooth transition
    scores['pericorn'] += 2 // Provides some stimulation
  }

  // Score based on smoking history
  if (profile.smokingDuration === 'new' || profile.smokingFrequency === 'never') {
    scores['mullein'] += 3 // Gentle for beginners
    scores['chamomile'] += 2
  }

  // Sort herbs by score and return top recommendations
  const sortedHerbs = herbs
    .map(herb => ({ herb, score: scores[herb.id] }))
    .sort((a, b) => b.score - a.score)
    .map(item => item.herb)

  return sortedHerbs.slice(0, 4)
}

// Fixed complementary blend map. Docs: Quiz_Especificacion.md §3
const complementaryBlend: Record<BlendId, BlendId> = {
  'claridad-pulmonar': 'proteccion',
  'proteccion':        'enfoque',
  'suavidad':          'sueno-profundo',
  'enfoque':           'suavidad',
  'sueno-profundo':    'suavidad',
  'nutre-el-alma':     'enfoque',
}

// Tiebreak priority when total scores are equal. Docs: Quiz_Especificacion.md §3
const tiebreakOrder: BlendId[] = [
  'claridad-pulmonar', 'enfoque', 'suavidad', 'sueno-profundo', 'nutre-el-alma', 'proteccion',
]

export function calculateBlendRecommendations(answers: QuizAnswers): Blend[] {
  const blendIds = Object.keys(complementaryBlend) as BlendId[]
  const totals: Record<BlendId, number> = Object.fromEntries(blendIds.map(id => [id, 0])) as Record<BlendId, number>
  const p2Scores: Record<BlendId, number> = Object.fromEntries(blendIds.map(id => [id, 0])) as Record<BlendId, number>

  for (const question of quizQuestions) {
    const selectedId = answers[question.id]
    if (!selectedId) continue
    const option = question.options.find(o => o.id === selectedId)
    if (!option) continue
    for (const [blendId, pts] of Object.entries(option.scores) as [BlendId, number][]) {
      totals[blendId] += pts
      if (question.id === 'p2') p2Scores[blendId] += pts
    }
  }

  // Find winning blend: highest total, tiebreak by P2 score, then by priority order
  let winner = blendIds.reduce((best, id) => {
    if (totals[id] > totals[best]) return id
    if (totals[id] === totals[best]) {
      if (p2Scores[id] > p2Scores[best]) return id
      if (p2Scores[id] === p2Scores[best]) {
        return tiebreakOrder.indexOf(id) < tiebreakOrder.indexOf(best) ? id : best
      }
    }
    return best
  })

  const primary = blends.find(b => b.id === winner)!
  const complementaryId = complementaryBlend[winner]
  const secondary = blends.find(b => b.id === complementaryId)!

  return [primary, secondary]
}
