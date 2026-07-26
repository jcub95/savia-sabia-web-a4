'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Language = 'en' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Welcome
    'welcome.title': 'Savia Sabia',
    'welcome.tagline': 'Less chemistry. More botany.',
    'welcome.subtitle': 'Discover Your Perfect Herbal Blend',
    'welcome.description': 'Take our personalized survey to find the ideal herbal smoking experience tailored to your lifestyle and wellness goals.',
    'welcome.start_survey': 'Find My Blend',
    'welcome.shop_blends': 'Shop Our Blends',
    'welcome.explore_herbarium': 'Explore Herbarium',
    'welcome.herbs': '15 Herbs',
    'welcome.natural': '100% Natural',
    'welcome.personalized': 'Personalized',
    
    // Navigation
    'nav.home': 'Home',
    'nav.back': 'Back',

    // Survey
    'survey.title': 'Personalized Survey',
    'survey.subtitle': 'Answer a few questions to discover your ideal herbal blend',
    'survey.next': 'Continue',
    'survey.back': 'Back',
    'survey.submit': 'Get My Results',
    'survey.see_results': 'See Results',
    'survey.of': 'of',
    'survey.category.habits': 'habits',
    'survey.category.health': 'health',
    'survey.category.preferences': 'preferences',
    'survey.category.goals': 'goals',
    
    // Survey Questions
    'survey.q1.title': 'How often do you smoke?',
    'survey.q1.o1': 'Occasionally (few times a month)',
    'survey.q1.o2': 'Socially (weekends/events)',
    'survey.q1.o3': 'Regularly (few times a week)',
    'survey.q1.o4': 'Daily',
    'survey.q1.o5': 'Heavy (multiple times daily)',
    
    'survey.q2.title': 'How long have you been smoking?',
    'survey.q2.o1': 'Just starting',
    'survey.q2.o2': 'Less than a year',
    'survey.q2.o3': 'A few years',
    'survey.q2.o4': 'Many years',
    'survey.q2.o5': 'Over a decade',
    
    'survey.q3.title': 'What brings you to herbal cigarettes?',
    'survey.q3.o1': 'Quitting tobacco',
    'survey.q3.o2': 'Reducing smoking',
    'survey.q3.o3': 'Wellness exploration',
    'survey.q3.o4': 'Curious about alternatives',
    'survey.q3.o5': 'Looking for natural options',
    
    'survey.q4.title': 'How would you describe your respiratory health?',
    'survey.q4.o1': 'Excellent',
    'survey.q4.o2': 'Good',
    'survey.q4.o3': 'Average',
    'survey.q4.o4': 'Sensitive',
    'survey.q4.o5': 'Compromised',
    
    'survey.q5.title': 'What is your current stress level?',
    'survey.q5.o1': 'Low',
    'survey.q5.o2': 'Moderate',
    'survey.q5.o3': 'High',
    'survey.q5.o4': 'Very High',
    
    'survey.q6.title': 'When do you prefer to smoke?',
    'survey.q6.o1': 'Morning',
    'survey.q6.o2': 'Afternoon',
    'survey.q6.o3': 'Evening',
    'survey.q6.o4': 'Night',
    'survey.q6.o5': 'Varies',
    
    'survey.q7.title': 'What effect are you seeking?',
    'survey.q7.o1': 'Relaxation',
    'survey.q7.o2': 'Energy',
    'survey.q7.o3': 'Mental Clarity',
    'survey.q7.o4': 'Respiratory Support',
    'survey.q7.o5': 'Mood Enhancement',
    
    'survey.q8.title': 'Select your flavor preferences',
    'survey.q8.subtitle': 'Choose all that appeal to you',
    'survey.q8.o1': 'Floral',
    'survey.q8.o2': 'Earthy',
    'survey.q8.o3': 'Citrus',
    'survey.q8.o4': 'Sweet',
    'survey.q8.o5': 'Cooling',
    'survey.q8.o6': 'Warm',
    
    // Results
    'results.your_profile': 'Your Profile',
    'results.key_characteristics': 'Key Characteristics',
    'results.recommended_approach': 'Recommended Approach',
    'results.recommended_blends': 'Recommended Blends',
    'results.best_match': 'Best Match',
    'results.also_recommended': 'Also Recommended',
    'results.best_for': 'Best For',
    'results.benefits': 'Benefits',
    'results.intensity': 'Intensity',
    'results.best_time': 'Best time',
    'results.herbs_in_blend': 'Herbs in',
    'results.shop_blends': 'Shop Our Blends',
    'results.explore_herbarium': 'Explore Full Herbarium',
    'results.retake': 'Retake Survey',
    
    // Profiles
    'profile.transition': 'The Smoker in Transition',
    'profile.transition.desc': 'You are on a journey to break free from tobacco or significantly reduce your smoking habits. Herbal cigarettes can serve as a bridge, helping you maintain the ritual while eliminating harmful substances.',
    'profile.anxiolytic': 'The Anxiolytic Profile',
    'profile.anxiolytic.desc': 'You turn to smoking primarily for stress relief and relaxation. Your relationship with smoking is tied to managing anxiety, unwinding after difficult moments, or finding calm in chaos.',
    'profile.productive': 'The Productive/Student Profile',
    'profile.productive.desc': 'You view smoking as a tool for focus, mental clarity, and productivity enhancement. Whether studying, working, or creating, smoking helps you get into the zone and maintain concentration.',
    'profile.sensory': 'The Sensory/Lifestyle Profile',
    'profile.sensory.desc': 'For you, smoking is about the experience itself - the flavors, the ritual, the aesthetic pleasure. You appreciate fine herbs like fine wine, seeking aromatic complexity and sensory delight.',
    
    // Shop
    'shop.title': 'Our Blends',
    'shop.subtitle': 'Curated herbal blends for every moment',
    'shop.loose_herbs': 'Loose Herb Bags',
    'shop.cigarettes': 'Pre-Rolled Cigarettes',
    'shop.add_to_cart': 'Add to Cart',
    'shop.added': 'Added!',
    'shop.view_cart': 'View Cart',
    'shop.back': 'Back',
    'shop.best_for': 'Best For',
    'shop.benefits': 'Benefits',
    'shop.contains': 'Contains',
    
    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.empty_desc': 'Add some herbal blends to get started',
    'cart.continue_shopping': 'Continue Shopping',
    'cart.free_shipping_at': 'Free shipping at',
    'cart.free_shipping_unlocked': 'Free shipping unlocked!',
    'cart.add_more': 'Add more for free shipping',
    'cart.away': 'away from free shipping',
    'cart.order_summary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.free': 'FREE',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.secure': 'Secure checkout',
    'cart.back': 'Back to Shop',
    'cart.remove': 'Remove',
    
    // Checkout
    'checkout.processing': 'Processing your order...',
    'checkout.success': 'Order Confirmed!',
    'checkout.success_desc': 'Thank you for your purchase. Your herbal blends will be shipped soon.',
    'checkout.order_number': 'Order number',
    'checkout.back_home': 'Back to Home',
    
    // Herbarium
    'herbarium.title': 'The Herbarium',
    'herbarium.subtitle': 'Explore our collection of 15 carefully selected herbs',
    'herbarium.back': 'Back',
    'herbarium.search': 'Search herbs...',
    'herbarium.search_placeholder': 'Search herbs...',
    'herbarium.all': 'All',
    'herbarium.calming': 'Calming',
    'herbarium.energizing': 'Energizing',
    'herbarium.respiratory': 'Respiratory',
    'herbarium.aromatic': 'Aromatic',
    'herbarium.balancing': 'Balancing',
    
    // Herb Detail
    'herb.effects': 'Effects',
    'herb.benefits': 'Benefits',
    'herb.best_for': 'Best For',
    'herb.flavor': 'Flavor Profile',
    'herb.close': 'Close',
    'herb.about': 'About',
    'herb.effects_experience': 'Effects & Experience',
    'herb.key_benefits': 'Key Benefits',
    'herb.flavor_profile': 'Flavor Profile',
    'herb.role_in_blend': 'Role in the Blend',
    'herb.found_in': 'Found in',
    'herb.category_suffix': 'Category',

    // Shop (blends catalog)
    'shop.recommended_time': 'Recommended Time',
    'shop.herb_composition': 'Herb Composition',

    // Time of day
    'time.morning': 'morning',
    'time.afternoon': 'afternoon',
    'time.evening': 'evening',
    'time.night': 'night',
    'time.anytime': 'anytime',

    // Effects (blend primaryEffect)
    'effect.calming': 'calming',
    'effect.energizing': 'energizing',
    'effect.respiratory': 'respiratory',
    'effect.focus': 'focus',
    'effect.sleep': 'sleep',
    'effect.spiritual': 'spiritual',

    // Herbarium empty state
    'herbarium.no_herbs_found': 'No herbs found',
    'herbarium.no_herbs_desc': 'Try adjusting your search or filters',

    // Common
    'common.gentle': 'gentle',
    'common.moderate': 'moderate',
    'common.strong': 'strong',
  },
  es: {
    // Welcome
    'welcome.title': 'Savia Sabia',
    'welcome.tagline': 'Menos químicos. Más plantas.',
    'welcome.subtitle': 'Descubre Tu Mezcla Herbal Perfecta',
    'welcome.description': 'Realiza nuestra encuesta personalizada para encontrar la experiencia de fumar herbal ideal, adaptada a tu estilo de vida y objetivos de bienestar.',
    'welcome.start_survey': 'Encontrar Mi Mezcla',
    'welcome.shop_blends': 'Comprar Mezclas',
    'welcome.explore_herbarium': 'Explorar Herbario',
    'welcome.herbs': '15 Hierbas',
    'welcome.natural': '100% Natural',
    'welcome.personalized': 'Personalizado',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.back': 'Atrás',

    // Survey
    'survey.title': 'Encuesta Personalizada',
    'survey.subtitle': 'Responde algunas preguntas para descubrir tu mezcla herbal ideal',
    'survey.next': 'Continuar',
    'survey.back': 'Atrás',
    'survey.submit': 'Ver Mis Resultados',
    'survey.see_results': 'Ver Resultados',
    'survey.of': 'de',
    'survey.category.habits': 'hábitos',
    'survey.category.health': 'salud',
    'survey.category.preferences': 'preferencias',
    'survey.category.goals': 'objetivos',
    
    // Survey Questions
    'survey.q1.title': '¿Con qué frecuencia fumas?',
    'survey.q1.o1': 'Ocasionalmente (pocas veces al mes)',
    'survey.q1.o2': 'Socialmente (fines de semana/eventos)',
    'survey.q1.o3': 'Regularmente (varias veces a la semana)',
    'survey.q1.o4': 'Diariamente',
    'survey.q1.o5': 'Mucho (varias veces al día)',
    
    'survey.q2.title': '¿Cuánto tiempo llevas fumando?',
    'survey.q2.o1': 'Recién empezando',
    'survey.q2.o2': 'Menos de un año',
    'survey.q2.o3': 'Algunos años',
    'survey.q2.o4': 'Muchos años',
    'survey.q2.o5': 'Más de una década',
    
    'survey.q3.title': '¿Qué te trae a los cigarrillos herbales?',
    'survey.q3.o1': 'Dejar el tabaco',
    'survey.q3.o2': 'Reducir el consumo',
    'survey.q3.o3': 'Exploración de bienestar',
    'survey.q3.o4': 'Curiosidad por alternativas',
    'survey.q3.o5': 'Buscar opciones naturales',
    
    'survey.q4.title': '¿Cómo describirías tu salud respiratoria?',
    'survey.q4.o1': 'Excelente',
    'survey.q4.o2': 'Buena',
    'survey.q4.o3': 'Promedio',
    'survey.q4.o4': 'Sensible',
    'survey.q4.o5': 'Comprometida',
    
    'survey.q5.title': '¿Cuál es tu nivel actual de estrés?',
    'survey.q5.o1': 'Bajo',
    'survey.q5.o2': 'Moderado',
    'survey.q5.o3': 'Alto',
    'survey.q5.o4': 'Muy Alto',
    
    'survey.q6.title': '¿Cuándo prefieres fumar?',
    'survey.q6.o1': 'Mañana',
    'survey.q6.o2': 'Tarde',
    'survey.q6.o3': 'Atardecer',
    'survey.q6.o4': 'Noche',
    'survey.q6.o5': 'Varía',
    
    'survey.q7.title': '¿Qué efecto buscas?',
    'survey.q7.o1': 'Relajación',
    'survey.q7.o2': 'Energía',
    'survey.q7.o3': 'Claridad Mental',
    'survey.q7.o4': 'Apoyo Respiratorio',
    'survey.q7.o5': 'Mejora del Ánimo',
    
    'survey.q8.title': 'Selecciona tus preferencias de sabor',
    'survey.q8.subtitle': 'Elige todos los que te atraigan',
    'survey.q8.o1': 'Floral',
    'survey.q8.o2': 'Terroso',
    'survey.q8.o3': 'Cítrico',
    'survey.q8.o4': 'Dulce',
    'survey.q8.o5': 'Refrescante',
    'survey.q8.o6': 'Cálido',
    
    // Results
    'results.your_profile': 'Tu Perfil',
    'results.key_characteristics': 'Características Clave',
    'results.recommended_approach': 'Enfoque Recomendado',
    'results.recommended_blends': 'Mezclas Recomendadas',
    'results.best_match': 'Mejor Opción',
    'results.also_recommended': 'También Recomendado',
    'results.best_for': 'Ideal Para',
    'results.benefits': 'Beneficios',
    'results.intensity': 'Intensidad',
    'results.best_time': 'Mejor momento',
    'results.herbs_in_blend': 'Hierbas en',
    'results.shop_blends': 'Comprar Mezclas',
    'results.explore_herbarium': 'Explorar Herbario Completo',
    'results.retake': 'Repetir Encuesta',
    
    // Profiles
    'profile.transition': 'El Fumador en Transición',
    'profile.transition.desc': 'Estás en un viaje para liberarte del tabaco o reducir significativamente tus hábitos de fumar. Los cigarrillos herbales pueden servir como puente, ayudándote a mantener el ritual mientras eliminas sustancias dañinas.',
    'profile.anxiolytic': 'El Perfil Ansiolítico',
    'profile.anxiolytic.desc': 'Recurres al fumar principalmente para aliviar el estrés y relajarte. Tu relación con fumar está ligada a manejar la ansiedad, descansar después de momentos difíciles o encontrar calma en el caos.',
    'profile.productive': 'El Perfil Productivo/Estudiante',
    'profile.productive.desc': 'Ves el fumar como una herramienta para el enfoque, la claridad mental y mejorar la productividad. Ya sea estudiando, trabajando o creando, fumar te ayuda a entrar en la zona y mantener la concentración.',
    'profile.sensory': 'El Perfil Sensorial/Estilo de Vida',
    'profile.sensory.desc': 'Para ti, fumar es sobre la experiencia en sí - los sabores, el ritual, el placer estético. Aprecias las hierbas finas como el buen vino, buscando complejidad aromática y deleite sensorial.',
    
    // Shop
    'shop.title': 'Nuestras Mezclas',
    'shop.subtitle': 'Mezclas herbales curadas para cada momento',
    'shop.loose_herbs': 'Bolsas de Hierbas',
    'shop.cigarettes': 'Cigarrillos Pre-Enrollados',
    'shop.add_to_cart': 'Agregar al Carrito',
    'shop.added': '¡Agregado!',
    'shop.view_cart': 'Ver Carrito',
    'shop.back': 'Atrás',
    'shop.best_for': 'Ideal Para',
    'shop.benefits': 'Beneficios',
    'shop.contains': 'Contiene',
    
    // Cart
    'cart.title': 'Tu Carrito',
    'cart.empty': 'Tu carrito está vacío',
    'cart.empty_desc': 'Agrega algunas mezclas herbales para comenzar',
    'cart.continue_shopping': 'Continuar Comprando',
    'cart.free_shipping_at': 'Envío gratis a partir de',
    'cart.free_shipping_unlocked': '¡Envío gratis desbloqueado!',
    'cart.add_more': 'Agrega más para envío gratis',
    'cart.away': 'para envío gratis',
    'cart.order_summary': 'Resumen del Pedido',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Envío',
    'cart.free': 'GRATIS',
    'cart.total': 'Total',
    'cart.checkout': 'Proceder al Pago',
    'cart.secure': 'Pago seguro',
    'cart.back': 'Volver a la Tienda',
    'cart.remove': 'Eliminar',
    
    // Checkout
    'checkout.processing': 'Procesando tu pedido...',
    'checkout.success': '¡Pedido Confirmado!',
    'checkout.success_desc': 'Gracias por tu compra. Tus mezclas herbales serán enviadas pronto.',
    'checkout.order_number': 'Número de pedido',
    'checkout.back_home': 'Volver al Inicio',
    
    // Herbarium
    'herbarium.title': 'El Herbario',
    'herbarium.subtitle': 'Explora nuestra colección de 15 hierbas cuidadosamente seleccionadas',
    'herbarium.back': 'Atrás',
    'herbarium.search': 'Buscar hierbas...',
    'herbarium.search_placeholder': 'Buscar hierbas...',
    'herbarium.all': 'Todas',
    'herbarium.calming': 'Calmantes',
    'herbarium.energizing': 'Energizantes',
    'herbarium.respiratory': 'Respiratorias',
    'herbarium.aromatic': 'Aromáticas',
    'herbarium.balancing': 'Equilibrantes',
    
    // Herb Detail
    'herb.effects': 'Efectos',
    'herb.benefits': 'Beneficios',
    'herb.best_for': 'Ideal Para',
    'herb.flavor': 'Perfil de Sabor',
    'herb.close': 'Cerrar',
    'herb.about': 'Sobre',
    'herb.effects_experience': 'Efectos y Experiencia',
    'herb.key_benefits': 'Beneficios Clave',
    'herb.flavor_profile': 'Perfil de Sabor',
    'herb.role_in_blend': 'Función en la mezcla',
    'herb.found_in': 'Aparece en',
    'herb.category_suffix': 'Categoría',

    // Shop (blends catalog)
    'shop.recommended_time': 'Momento Recomendado',
    'shop.herb_composition': 'Composición de Hierbas',

    // Time of day
    'time.morning': 'mañana',
    'time.afternoon': 'tarde',
    'time.evening': 'noche temprana',
    'time.night': 'noche',
    'time.anytime': 'cualquier momento',

    // Effects (blend primaryEffect)
    'effect.calming': 'calmante',
    'effect.energizing': 'energizante',
    'effect.respiratory': 'respiratorio',
    'effect.focus': 'enfoque',
    'effect.sleep': 'sueño',
    'effect.spiritual': 'espiritual',

    // Herbarium empty state
    'herbarium.no_herbs_found': 'Sin resultados',
    'herbarium.no_herbs_desc': 'Intenta ajustar tu búsqueda o los filtros',

    // Common
    'common.gentle': 'suave',
    'common.moderate': 'moderado',
    'common.strong': 'fuerte',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')
  
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en')
  }, [])
  
  const t = useCallback((key: string): string => {
    return translations[language][key] || key
  }, [language])
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
