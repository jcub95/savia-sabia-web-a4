export interface Herb {
  id: string
  name: string
  category: 'calming' | 'energizing' | 'respiratory' | 'aromatic' | 'balancing'
  benefits: string[]
  effects: string
  description: string
  flavorProfile: string
  bestFor: string[]
  icon: string
  image: string
  color: string
}

export const herbs: Herb[] = [
  {
    id: 'thyme',
    name: 'Thyme',
    category: 'respiratory',
    benefits: ['Respiratory support', 'Antimicrobial properties', 'Digestive aid'],
    effects: 'A warming, cleansing sensation with subtle earthiness. Promotes clear breathing and mental clarity.',
    description: 'Thyme has been used for centuries in traditional medicine for its powerful respiratory benefits. Its natural compounds help open airways and provide a grounding, herbal experience.',
    flavorProfile: 'Earthy, slightly minty with warm undertones',
    bestFor: ['Heavy smokers transitioning', 'Those with respiratory concerns', 'Morning rituals'],
    icon: '🌿',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thyme%20-%20Tomillo-SBKN2oaDs918pxnWm7UYODRybbXDqm.jpg',
    color: 'from-green-600 to-green-800',
  },
  {
    id: 'mullein',
    name: 'Mullein',
    category: 'respiratory',
    benefits: ['Lung cleansing', 'Smooth smoke', 'Throat soothing'],
    effects: 'Exceptionally smooth smoke that feels gentle on the throat and lungs. Creates a soft, velvety sensation.',
    description: 'Known as the "lungs herb," Mullein produces one of the smoothest smokes possible. It has been traditionally used to support healthy lung function and clear congestion.',
    flavorProfile: 'Very mild, neutral with slight sweetness',
    bestFor: ['Beginners', 'Sensitive throats', 'Base blend ingredient'],
    icon: '🍃',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mullein%20-%20Gordolobo-gXs643nZf2BLTHSqqR1w6VwwWv1iaD.jpeg',
    color: 'from-lime-500 to-green-600',
  },
  {
    id: 'lemon-balm',
    name: 'Lemon Balm',
    category: 'calming',
    benefits: ['Stress relief', 'Mood enhancement', 'Mental relaxation'],
    effects: 'A gentle, uplifting calm that eases tension without sedation. Promotes positive mood and mental ease.',
    description: 'Lemon Balm brings a bright, citrusy note to any blend while providing natural calming properties. It helps quiet racing thoughts and promotes a sense of peaceful alertness.',
    flavorProfile: 'Bright citrus, subtle sweetness, refreshing',
    bestFor: ['Stress relief', 'Afternoon breaks', 'Social smoking'],
    icon: '🍋',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lemon%20Balm%20-%20Melissa-vaubbTkfFYyMF1jPqddR6a9urRHuQ5.jpg',
    color: 'from-yellow-400 to-lime-500',
  },
  {
    id: 'chamomile',
    name: 'Chamomile',
    category: 'calming',
    benefits: ['Deep relaxation', 'Sleep support', 'Anxiety reduction'],
    effects: 'A warm, gentle wave of relaxation that settles the mind and body. Perfect for unwinding after a long day.',
    description: 'Chamomile is the quintessential relaxation herb. Its gentle, apple-like sweetness creates a soothing experience that helps release the day\'s tensions.',
    flavorProfile: 'Soft, apple-like sweetness with floral notes',
    bestFor: ['Evening use', 'Sleep preparation', 'High anxiety periods'],
    icon: '🌼',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chamomille%20-%20Manzanilla-4E0GwB2yJu52I6vtrW2qXv0TBPfmpr.jpg',
    color: 'from-amber-300 to-yellow-500',
  },
  {
    id: 'pericorn',
    name: 'Pericorn',
    category: 'energizing',
    benefits: ['Mental stimulation', 'Focus enhancement', 'Energy boost'],
    effects: 'A subtle, invigorating lift that sharpens focus and provides gentle energy without jitters.',
    description: 'Pericorn offers a unique stimulating experience, providing natural energy and mental clarity. Ideal for those seeking an alternative to tobacco\'s stimulating effects.',
    flavorProfile: 'Slightly spicy, warm, with a subtle kick',
    bestFor: ['Morning rituals', 'Work breaks', 'Creative sessions'],
    icon: '⚡',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pericone%20-%20Pericon-qTMApt4bmFCT6TTv82vwMgHsuX0L86.jpg',
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 'damiana',
    name: 'Damiana',
    category: 'balancing',
    benefits: ['Mood elevation', 'Aphrodisiac properties', 'Nervous system support'],
    effects: 'A warm, euphoric feeling that lifts the spirits and creates a sense of well-being and connection.',
    description: 'Damiana has been treasured for centuries for its mood-enhancing and aphrodisiac qualities. It creates a gentle euphoria and sense of openness.',
    flavorProfile: 'Warm, slightly sweet with fig-like notes',
    bestFor: ['Romantic occasions', 'Social gatherings', 'Mood enhancement'],
    icon: '💫',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Damiana%20-%20Damiana-h5repTpqkcgqcLLgIaqdVx6zS4hokh.jpg',
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    category: 'calming',
    benefits: ['Anxiety relief', 'Sleep support', 'Headache reduction'],
    effects: 'Deeply calming aromatherapy experience that soothes nerves and promotes peaceful tranquility.',
    description: 'The iconic purple flower known worldwide for its calming properties. Lavender creates a spa-like experience with every breath.',
    flavorProfile: 'Floral, slightly sweet, aromatic',
    bestFor: ['Stress relief', 'Bedtime routine', 'Tension headaches'],
    icon: '💜',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lavender%20-%20Lavanda-bLJ3wZpbKMzqZazbZL9Obgm54BEDVF.jpg',
    color: 'from-purple-400 to-indigo-500',
  },
  {
    id: 'roses',
    name: 'Roses',
    category: 'aromatic',
    benefits: ['Heart opening', 'Emotional balance', 'Anti-inflammatory'],
    effects: 'A gentle, heart-centered experience that promotes emotional openness and self-compassion.',
    description: 'Rose petals bring elegance and emotional depth to any blend. Known for opening the heart chakra and promoting feelings of love and acceptance.',
    flavorProfile: 'Delicate floral, sweet, romantic',
    bestFor: ['Emotional healing', 'Self-care rituals', 'Special occasions'],
    icon: '🌹',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Roses%20-%20Rosa-UhAdDTOA4nrQ1mLvqHBcj0nZpeYy0K.jpg',
    color: 'from-rose-400 to-pink-600',
  },
  {
    id: 'calendula',
    name: 'Calendula',
    category: 'balancing',
    benefits: ['Skin health', 'Lymphatic support', 'Gentle healing'],
    effects: 'A warm, sunny energy that brings comfort and promotes internal balance and healing.',
    description: 'Also known as marigold, Calendula brings solar energy and gentle healing properties. It adds a warm, comforting quality to blends.',
    flavorProfile: 'Warm, slightly peppery, earthy sweetness',
    bestFor: ['General wellness', 'Daily use', 'Immune support'],
    icon: '🌻',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Calendula%20-%20Calendula-QfuvEv7zywnTeJdLNTXuxO5RqlAQ84.jpg',
    color: 'from-orange-300 to-amber-500',
  },
  {
    id: 'rosemary',
    name: 'Rosemary',
    category: 'energizing',
    benefits: ['Memory enhancement', 'Circulation boost', 'Mental clarity'],
    effects: 'An awakening, clarifying sensation that sharpens the mind and improves focus and recall.',
    description: 'The herb of remembrance, Rosemary has been used since ancient times to enhance memory and mental performance. Its invigorating aroma stimulates the senses.',
    flavorProfile: 'Pine-like, herbal, slightly camphoraceous',
    bestFor: ['Study sessions', 'Morning clarity', 'Memory support'],
    icon: '🌲',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rosemary%20-%20Romero-ySSL65ypbLiMTNlQ3vNWGVYyBn4Hif.jpg',
    color: 'from-teal-500 to-green-600',
  },
  {
    id: 'eucalyptus',
    name: 'Eucalyptus',
    category: 'respiratory',
    benefits: ['Airway clearing', 'Decongestant', 'Antimicrobial'],
    effects: 'A cooling, opening sensation that clears the sinuses and promotes deep, easy breathing.',
    description: 'Eucalyptus provides powerful respiratory support with its cooling menthol-like properties. Excellent for clearing airways and promoting fresh breath.',
    flavorProfile: 'Cooling, mentholated, clean',
    bestFor: ['Congestion relief', 'Cold season', 'Respiratory reset'],
    icon: '🌿',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Eucalyptus%20-%20Eucalipto-TMjokzHFidLneZIX9j2k4y3SX75SVt.jpg',
    color: 'from-cyan-400 to-teal-500',
  },
  {
    id: 'jasmine',
    name: 'Jasmine',
    category: 'aromatic',
    benefits: ['Mood uplift', 'Stress reduction', 'Sensory pleasure'],
    effects: 'An intoxicating, luxurious experience that elevates mood and creates a sense of exotic indulgence.',
    description: 'Jasmine flowers create an exquisitely aromatic experience. Known as the "queen of the night," it promotes feelings of optimism and romantic openness.',
    flavorProfile: 'Intensely floral, sweet, exotic',
    bestFor: ['Evening relaxation', 'Romantic moments', 'Luxury experience'],
    icon: '✨',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jasmine%20-%20Jazmin-pHvalHZOc6KdIRPIHr6PdSTS0ILROp.jpg',
    color: 'from-white to-yellow-200',
  },
  {
    id: 'mint',
    name: 'Mint',
    category: 'respiratory',
    benefits: ['Respiratory clearing', 'Digestive support', 'Mental refreshment'],
    effects: 'A crisp, invigorating coolness that awakens the senses and clears the mind. Provides immediate freshness and clarity.',
    description: 'Mint is nature\'s breath of fresh air. Its cooling menthol properties open airways, soothe digestion, and create an instantly refreshing smoking experience.',
    flavorProfile: 'Cool, fresh, crisp with sweet undertones',
    bestFor: ['Morning rituals', 'After meals', 'Mental refresh breaks'],
    icon: '🌱',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mint%20-%20Menta-wojVr9zrO7p1veEFAm1dDVRtxWa6Mn.jpg',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'passionflower',
    name: 'Passionflower',
    category: 'calming',
    benefits: ['Deep relaxation', 'Anxiety relief', 'Sleep support'],
    effects: 'A profound, sedative calm that quiets racing thoughts and prepares the body for deep rest. Powerfully tranquilizing.',
    description: 'Passionflower is one of nature\'s most potent calming herbs. Used traditionally for insomnia and anxiety, it provides deep relaxation without next-day grogginess.',
    flavorProfile: 'Mild, slightly grassy with subtle earthy notes',
    bestFor: ['Severe anxiety', 'Insomnia', 'Evening wind-down'],
    icon: '🌸',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Passionflower%20-%20Pasiflora-vI0W64jAuXFcoCALX8RKNQapIINKLv.jpg',
    color: 'from-violet-400 to-purple-600',
  },
  {
    id: 'sage',
    name: 'Sage',
    category: 'balancing',
    benefits: ['Mental clarity', 'Purification', 'Hormonal balance'],
    effects: 'A grounding, clarifying sensation that cleanses the mind and promotes wisdom. Creates a sense of sacred ritual.',
    description: 'Sage has been used for millennia in spiritual and healing practices. Its purifying smoke clears negative energy while promoting mental sharpness and inner balance.',
    flavorProfile: 'Savory, earthy, slightly peppery with camphor notes',
    bestFor: ['Meditation', 'Mental clarity', 'Ritualistic smoking'],
    icon: '🍃',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sage%20-%20Salvia-OEKi05ZlibVu6EUxbflVOxYYMm6WKu.jpg',
    color: 'from-slate-400 to-green-600',
  },
]

export interface SurveyQuestion {
  id: string
  question: string
  description?: string
  type: 'single' | 'multiple' | 'scale'
  options: {
    value: string
    label: string
    description?: string
  }[]
  category: 'habits' | 'health' | 'preferences' | 'goals'
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'smoking_frequency',
    question: 'How often do you currently smoke?',
    description: 'This helps us understand your experience level',
    type: 'single',
    category: 'habits',
    options: [
      { value: 'never', label: 'I don\'t smoke', description: 'Looking for a new experience' },
      { value: 'occasional', label: 'Occasionally', description: 'A few times a month' },
      { value: 'social', label: 'Socially', description: 'Mainly in social settings' },
      { value: 'regular', label: 'Regularly', description: 'Daily or almost daily' },
      { value: 'heavy', label: 'Heavily', description: 'Multiple times per day' },
    ],
  },
  {
    id: 'smoking_duration',
    question: 'How long have you been smoking?',
    description: 'Your smoking history helps personalize recommendations',
    type: 'single',
    category: 'habits',
    options: [
      { value: 'new', label: 'Just starting', description: 'New to smoking' },
      { value: 'months', label: 'Less than a year', description: 'Recent beginner' },
      { value: 'few_years', label: '1-5 years', description: 'Experienced smoker' },
      { value: 'many_years', label: '5-10 years', description: 'Long-term smoker' },
      { value: 'decades', label: '10+ years', description: 'Veteran smoker' },
    ],
  },
  {
    id: 'transition_goal',
    question: 'What brings you to herbal smoking?',
    description: 'Understanding your goals helps us recommend the perfect blend',
    type: 'single',
    category: 'goals',
    options: [
      { value: 'quit_tobacco', label: 'Quitting tobacco', description: 'Transitioning away from tobacco' },
      { value: 'reduce', label: 'Reducing intake', description: 'Cutting back on smoking' },
      { value: 'alternative', label: 'Natural alternative', description: 'Prefer natural products' },
      { value: 'wellness', label: 'Wellness benefits', description: 'Seeking herbal benefits' },
      { value: 'curious', label: 'Just curious', description: 'Exploring new options' },
    ],
  },
  {
    id: 'respiratory_health',
    question: 'How would you rate your respiratory health?',
    description: 'This helps us suggest gentler options if needed',
    type: 'single',
    category: 'health',
    options: [
      { value: 'excellent', label: 'Excellent', description: 'No issues whatsoever' },
      { value: 'good', label: 'Good', description: 'Minor occasional issues' },
      { value: 'moderate', label: 'Moderate', description: 'Some regular concerns' },
      { value: 'sensitive', label: 'Sensitive', description: 'Prone to irritation' },
      { value: 'compromised', label: 'Needs support', description: 'Looking for respiratory support' },
    ],
  },
  {
    id: 'stress_level',
    question: 'How would you describe your current stress level?',
    description: 'Many herbs offer calming properties',
    type: 'single',
    category: 'health',
    options: [
      { value: 'low', label: 'Low', description: 'Generally relaxed' },
      { value: 'moderate', label: 'Moderate', description: 'Normal daily stress' },
      { value: 'high', label: 'High', description: 'Frequently stressed' },
      { value: 'very_high', label: 'Very high', description: 'Seeking relief' },
    ],
  },
  {
    id: 'preferred_time',
    question: 'When do you typically enjoy smoking?',
    description: 'Different times call for different effects',
    type: 'single',
    category: 'preferences',
    options: [
      { value: 'morning', label: 'Morning', description: 'Start the day' },
      { value: 'afternoon', label: 'Afternoon', description: 'Midday break' },
      { value: 'evening', label: 'Evening', description: 'Wind down' },
      { value: 'night', label: 'Night', description: 'Before bed' },
      { value: 'anytime', label: 'Anytime', description: 'Throughout the day' },
    ],
  },
  {
    id: 'desired_effect',
    question: 'What effect are you most seeking?',
    description: 'Your primary goal for the experience',
    type: 'single',
    category: 'preferences',
    options: [
      { value: 'relaxation', label: 'Relaxation', description: 'Calm and peace' },
      { value: 'energy', label: 'Energy', description: 'Alertness and focus' },
      { value: 'clarity', label: 'Mental clarity', description: 'Clear thinking' },
      { value: 'respiratory', label: 'Respiratory support', description: 'Breathing ease' },
      { value: 'mood', label: 'Mood lift', description: 'Emotional well-being' },
    ],
  },
  {
    id: 'flavor_preference',
    question: 'What flavor profiles appeal to you?',
    description: 'Select all that sound enjoyable',
    type: 'multiple',
    category: 'preferences',
    options: [
      { value: 'floral', label: 'Floral', description: 'Roses, lavender, jasmine' },
      { value: 'earthy', label: 'Earthy', description: 'Herbal, grounding' },
      { value: 'citrus', label: 'Citrus', description: 'Bright, refreshing' },
      { value: 'sweet', label: 'Sweet', description: 'Gentle sweetness' },
      { value: 'cooling', label: 'Cooling', description: 'Mint-like, fresh' },
      { value: 'warm', label: 'Warm', description: 'Spicy, cozy' },
    ],
  },
]

export type SmokerProfileType = 
  | 'transition'      // The Smoker in Transition
  | 'anxiolytic'      // The Anxiolytic Profile
  | 'productive'      // The Productive/Student Profile
  | 'sensory'         // The Sensory/Lifestyle Profile

export interface SmokerProfile {
  type: SmokerProfileType
  name: string
  description: string
  characteristics: string[]
  recommendedApproach: string
  icon: string
}

export const smokerProfiles: Record<SmokerProfileType, SmokerProfile> = {
  transition: {
    type: 'transition',
    name: 'The Smoker in Transition',
    description: 'You are on a journey to break free from tobacco or significantly reduce your smoking habits. Herbal cigarettes can serve as a bridge, helping you maintain the ritual while eliminating harmful substances.',
    characteristics: [
      'Currently transitioning away from tobacco',
      'Seeking to reduce overall smoking frequency',
      'Looking for a healthier smoking alternative',
      'May have respiratory concerns from past smoking',
    ],
    recommendedApproach: 'Focus on Mullein-based blends for their smooth, lung-supporting properties. Gradually introduce respiratory herbs like Thyme and Eucalyptus to support your transition.',
    icon: '🔄',
  },
  anxiolytic: {
    type: 'anxiolytic',
    name: 'The Anxiolytic Profile',
    description: 'You turn to smoking primarily for stress relief and relaxation. Your relationship with smoking is tied to managing anxiety, unwinding after difficult moments, or finding calm in chaos.',
    characteristics: [
      'Smokes primarily for stress relief',
      'Experiences high or very high stress levels',
      'Seeks relaxation and calming effects',
      'Often smokes during evening or nighttime',
    ],
    recommendedApproach: 'Calming herbs like Chamomile, Lavender, and Lemon Balm will be your allies. Consider blends that promote relaxation without sedation for daytime use, and deeper calming blends for evening.',
    icon: '🧘',
  },
  productive: {
    type: 'productive',
    name: 'The Productive/Student Profile',
    description: 'You view smoking as a tool for focus, mental clarity, and productivity enhancement. Whether studying, working, or creating, smoking helps you get into the zone and maintain concentration.',
    characteristics: [
      'Smokes for mental clarity and focus',
      'Often smokes during morning or afternoon',
      'Seeks energy and cognitive enhancement',
      'Values alertness over relaxation',
    ],
    recommendedApproach: 'Energizing herbs like Rosemary and Pericorn will enhance your focus. Lemon Balm offers clarity without jitters. Avoid heavy calming herbs during work hours.',
    icon: '📚',
  },
  sensory: {
    type: 'sensory',
    name: 'The Sensory/Lifestyle Profile',
    description: 'For you, smoking is about the experience itself - the flavors, the ritual, the aesthetic pleasure. You appreciate fine herbs like fine wine, seeking aromatic complexity and sensory delight.',
    characteristics: [
      'Values the sensory experience of smoking',
      'Drawn to aromatic and floral flavors',
      'Smokes socially or as part of lifestyle rituals',
      'Prioritizes mood enhancement and pleasure',
    ],
    recommendedApproach: 'Explore aromatic herbs like Jasmine, Roses, and Damiana. Create complex blends that layer flavors and effects. Your experience should be an indulgence for the senses.',
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
  displayName: string
  description: string
  herbs: string[] // herb IDs
  primaryEffect: 'calming' | 'energizing' | 'respiratory' | 'focus' | 'sleep' | 'spiritual'
  benefits: string[]
  bestFor: string[]
  timeOfDay: ('morning' | 'afternoon' | 'evening' | 'night')[]
  intensity: 'gentle' | 'moderate' | 'strong'
  color: string
}

export const blends: Blend[] = [
  {
    id: 'suavidad',
    name: 'Suavidad',
    displayName: 'Blend Suavidad',
    description: 'A gentle, soothing blend designed to ease tension and bring softness to your day. Perfect for those seeking mild relaxation with refreshing clarity.',
    herbs: ['pericorn', 'lemon-balm', 'chamomile', 'mint'],
    primaryEffect: 'calming',
    benefits: ['Gentle relaxation', 'Mental clarity', 'Digestive comfort', 'Stress relief'],
    bestFor: ['Beginners', 'Daytime relaxation', 'After meals', 'Light stress relief'],
    timeOfDay: ['morning', 'afternoon'],
    intensity: 'gentle',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'nutre-el-alma',
    name: 'Nutre El Alma',
    displayName: 'Blend Nutre El Alma',
    description: 'Nourish your soul with this deeply nurturing blend. A heart-opening combination that promotes emotional balance, self-love, and inner peace.',
    herbs: ['damiana', 'calendula', 'roses', 'lavender', 'passionflower'],
    primaryEffect: 'calming',
    benefits: ['Emotional balance', 'Heart opening', 'Deep relaxation', 'Self-compassion'],
    bestFor: ['Emotional healing', 'Self-care rituals', 'Anxiety relief', 'Evening wind-down'],
    timeOfDay: ['evening', 'night'],
    intensity: 'moderate',
    color: 'from-rose-400 to-purple-500',
  },
  {
    id: 'proteccion',
    name: 'Proteccion',
    displayName: 'Blend Proteccion',
    description: 'A protective, purifying blend that supports respiratory health while cleansing mind and spirit. Ideal for those transitioning from tobacco or seeking lung support.',
    herbs: ['mullein', 'sage', 'rosemary', 'jasmine', 'eucalyptus'],
    primaryEffect: 'respiratory',
    benefits: ['Respiratory support', 'Mental purification', 'Airway clearing', 'Spiritual cleansing'],
    bestFor: ['Tobacco transition', 'Respiratory concerns', 'Meditation', 'Morning rituals'],
    timeOfDay: ['morning', 'afternoon'],
    intensity: 'moderate',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 'enfoque',
    name: 'Enfoque',
    displayName: 'Blend Enfoque',
    description: 'Sharpen your mind and enhance concentration with this focusing blend. Designed for productivity, study sessions, and creative work.',
    herbs: ['mullein', 'rosemary', 'damiana', 'mint'],
    primaryEffect: 'focus',
    benefits: ['Mental clarity', 'Focus enhancement', 'Memory support', 'Gentle energy'],
    bestFor: ['Study sessions', 'Work breaks', 'Creative projects', 'Morning productivity'],
    timeOfDay: ['morning', 'afternoon'],
    intensity: 'moderate',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'sueno-profundo',
    name: 'Sueno Profundo',
    displayName: 'Blend Sueno Profundo',
    description: 'Drift into deep, restorative sleep with this powerful nighttime blend. A tranquil combination that quiets the mind and prepares the body for rest.',
    herbs: ['pericorn', 'passionflower', 'lemon-balm', 'lavender'],
    primaryEffect: 'sleep',
    benefits: ['Deep sleep', 'Anxiety relief', 'Racing thought relief', 'Nighttime calm'],
    bestFor: ['Insomnia', 'Bedtime routine', 'High anxiety', 'Restless nights'],
    timeOfDay: ['night'],
    intensity: 'strong',
    color: 'from-indigo-500 to-purple-700',
  },
  {
    id: 'claridad-pulmonar',
    name: 'Claridad Pulmonar',
    displayName: 'Blend Claridad Pulmonar',
    description: 'The ultimate respiratory support blend. Clears airways, supports lung health, and provides a smooth, clean smoking experience for those prioritizing breath.',
    herbs: ['mullein', 'eucalyptus', 'thyme', 'sage', 'mint'],
    primaryEffect: 'respiratory',
    benefits: ['Lung cleansing', 'Airway opening', 'Respiratory recovery', 'Smooth smoke'],
    bestFor: ['Heavy smoker transition', 'Respiratory support', 'Congestion relief', 'Lung health'],
    timeOfDay: ['morning', 'afternoon', 'evening'],
    intensity: 'strong',
    color: 'from-cyan-400 to-emerald-500',
  },
]

export function determineSmokerProfile(profile: UserProfile): SmokerProfileType {
  const scores: Record<SmokerProfileType, number> = {
    transition: 0,
    anxiolytic: 0,
    productive: 0,
    sensory: 0,
  }
  
  // Transition Profile Scoring
  if (profile.transitionGoal === 'quit_tobacco') scores.transition += 5
  if (profile.transitionGoal === 'reduce') scores.transition += 4
  if (profile.smokingFrequency === 'regular' || profile.smokingFrequency === 'heavy') scores.transition += 2
  if (profile.smokingDuration === 'many_years' || profile.smokingDuration === 'decades') scores.transition += 2
  if (profile.respiratoryHealth === 'sensitive' || profile.respiratoryHealth === 'compromised') scores.transition += 2
  if (profile.desiredEffect === 'respiratory') scores.transition += 3
  
  // Anxiolytic Profile Scoring
  if (profile.stressLevel === 'very_high') scores.anxiolytic += 5
  if (profile.stressLevel === 'high') scores.anxiolytic += 4
  if (profile.desiredEffect === 'relaxation') scores.anxiolytic += 5
  if (profile.preferredTime === 'evening' || profile.preferredTime === 'night') scores.anxiolytic += 2
  if (profile.flavorPreferences.includes('floral')) scores.anxiolytic += 1
  if (profile.transitionGoal === 'wellness') scores.anxiolytic += 2
  
  // Productive/Student Profile Scoring
  if (profile.desiredEffect === 'energy') scores.productive += 5
  if (profile.desiredEffect === 'clarity') scores.productive += 5
  if (profile.preferredTime === 'morning') scores.productive += 3
  if (profile.preferredTime === 'afternoon') scores.productive += 2
  if (profile.stressLevel === 'low' || profile.stressLevel === 'moderate') scores.productive += 1
  if (profile.flavorPreferences.includes('citrus')) scores.productive += 1
  if (profile.flavorPreferences.includes('cooling')) scores.productive += 1
  
  // Sensory/Lifestyle Profile Scoring
  if (profile.desiredEffect === 'mood') scores.sensory += 4
  if (profile.smokingFrequency === 'social' || profile.smokingFrequency === 'occasional') scores.sensory += 3
  if (profile.transitionGoal === 'curious' || profile.transitionGoal === 'alternative') scores.sensory += 2
  if (profile.flavorPreferences.includes('floral')) scores.sensory += 2
  if (profile.flavorPreferences.includes('sweet')) scores.sensory += 2
  if (profile.flavorPreferences.includes('warm')) scores.sensory += 1
  if (profile.flavorPreferences.length >= 3) scores.sensory += 2 // Values variety
  
  // Find the profile with the highest score
  let maxScore = 0
  let determinedProfile: SmokerProfileType = 'sensory' // default
  
  for (const [profileType, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score
      determinedProfile = profileType as SmokerProfileType
    }
  }
  
  return determinedProfile
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

export function calculateBlendRecommendations(profile: UserProfile, smokerProfile: SmokerProfileType): Blend[] {
  const scores: Record<string, number> = {}
  
  // Initialize scores
  blends.forEach(blend => {
    scores[blend.id] = 0
  })
  
  // Score based on smoker profile
  switch (smokerProfile) {
    case 'transition':
      scores['proteccion'] += 6
      scores['claridad-pulmonar'] += 5
      scores['suavidad'] += 3
      break
    case 'anxiolytic':
      scores['nutre-el-alma'] += 6
      scores['sueno-profundo'] += 5
      scores['suavidad'] += 4
      break
    case 'productive':
      scores['enfoque'] += 6
      scores['suavidad'] += 4
      scores['proteccion'] += 2
      break
    case 'sensory':
      scores['nutre-el-alma'] += 5
      scores['suavidad'] += 4
      scores['enfoque'] += 3
      break
  }
  
  // Score based on desired effect
  switch (profile.desiredEffect) {
    case 'relaxation':
      scores['nutre-el-alma'] += 5
      scores['suavidad'] += 4
      scores['sueno-profundo'] += 3
      break
    case 'energy':
      scores['enfoque'] += 5
      scores['suavidad'] += 2
      break
    case 'clarity':
      scores['enfoque'] += 5
      scores['proteccion'] += 3
      break
    case 'respiratory':
      scores['claridad-pulmonar'] += 6
      scores['proteccion'] += 5
      break
    case 'mood':
      scores['nutre-el-alma'] += 5
      scores['suavidad'] += 3
      break
  }
  
  // Score based on preferred time
  switch (profile.preferredTime) {
    case 'morning':
      scores['enfoque'] += 3
      scores['proteccion'] += 3
      scores['claridad-pulmonar'] += 2
      break
    case 'afternoon':
      scores['suavidad'] += 3
      scores['enfoque'] += 2
      break
    case 'evening':
      scores['nutre-el-alma'] += 4
      scores['suavidad'] += 2
      break
    case 'night':
      scores['sueno-profundo'] += 6
      scores['nutre-el-alma'] += 3
      break
  }
  
  // Score based on stress level
  if (profile.stressLevel === 'high' || profile.stressLevel === 'very_high') {
    scores['nutre-el-alma'] += 4
    scores['sueno-profundo'] += 3
    scores['suavidad'] += 2
  }
  
  // Score based on respiratory health
  if (profile.respiratoryHealth === 'sensitive' || profile.respiratoryHealth === 'compromised') {
    scores['claridad-pulmonar'] += 5
    scores['proteccion'] += 4
    scores['suavidad'] += 2
  }
  
  // Score based on transition goal
  if (profile.transitionGoal === 'quit_tobacco' || profile.transitionGoal === 'reduce') {
    scores['proteccion'] += 4
    scores['claridad-pulmonar'] += 4
  }
  
  // Score based on flavor preferences
  if (profile.flavorPreferences.includes('floral')) {
    scores['nutre-el-alma'] += 3
  }
  if (profile.flavorPreferences.includes('cooling')) {
    scores['claridad-pulmonar'] += 3
    scores['suavidad'] += 2
  }
  if (profile.flavorPreferences.includes('earthy')) {
    scores['proteccion'] += 2
    scores['claridad-pulmonar'] += 2
  }
  
  // Sort blends by score
  const sortedBlends = blends
    .map(blend => ({ blend, score: scores[blend.id] }))
    .sort((a, b) => b.score - a.score)
    .map(item => item.blend)
  
  return sortedBlends
}
