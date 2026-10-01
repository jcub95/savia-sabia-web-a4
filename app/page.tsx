'use client'

import { Suspense, useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Welcome } from '@/components/welcome'
import { Survey } from '@/components/survey'
import { Results } from '@/components/results'
import { Herbarium } from '@/components/herbarium'
import { BlendsCatalog } from '@/components/blends-catalog'
import { Cart } from '@/components/cart'
import {
  type QuizAnswers,
  type Blend,
  type SmokerProfileType,
  calculateBlendRecommendations,
  determineSmokerProfile,
} from '@/lib/herbs-data'

type AppView = 'welcome' | 'survey' | 'results' | 'herbarium' | 'blends' | 'cart'

// Map view → ?view= param value. 'welcome' maps to no param (root /).
const VIEW_PARAM: Partial<Record<AppView, string>> = {
  survey: 'survey',
  results: 'results',
  herbarium: 'herbarium',
  blends: 'blends',
  cart: 'cart',
}

function SaviaSabiaAppInner() {
  const searchParams = useSearchParams()

  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null)
  const [blendRecommendations, setBlendRecommendations] = useState<Blend[]>([])
  const [smokerProfileType, setSmokerProfileType] = useState<SmokerProfileType>('sensory')

  // Vista pedida por el URL. Solo se usa para el arranque y para el boton de
  // atras del navegador; no es lo que decide que se pinta.
  const urlView = useMemo<AppView>(() => {
    const v = searchParams.get('view')
    if (v && Object.values(VIEW_PARAM).includes(v as string)) return v as AppView
    return 'welcome'
  }, [searchParams])

  // La vista vive en memoria, no en el URL.
  //
  // Antes se derivaba solo de useSearchParams(), asi que avanzar de pantalla
  // dependia de que router.push() completara una navegacion del App Router.
  // Las seis vistas son la misma ruta con otro search param, pero el router
  // igual pide el payload RSC al servidor. En los navegadores embebidos de
  // Instagram y Taplink esa peticion se demora o falla: si se cuelga, la
  // transicion queda suspendida y la pantalla se congela; si falla, el router
  // cae a una recarga completa que borra las respuestas del quiz. En los dos
  // casos el usuario toca "ver resultados" y no pasa nada visible.
  //
  // Ahora la vista es estado de React y el URL se actualiza con la History API
  // nativa, que Next sincroniza con useSearchParams sin pedir nada al servidor
  // ni recargar. El avance de pantalla ya no toca la red.
  const [view, setView] = useState<AppView>(urlView)

  // Ultima vista que pedimos nosotros. Sirve para distinguir un cambio de URL
  // propio (el push de navigate) de uno externo (atras/adelante del navegador).
  const intendedViewRef = useRef<AppView>(urlView)

  useEffect(() => {
    if (urlView === intendedViewRef.current) return
    // El URL cambio por fuera de navigate(): atras/adelante. Lo seguimos.
    intendedViewRef.current = urlView
    setView(urlView)
  }, [urlView])

  const navigate = useCallback(
    (next: AppView) => {
      intendedViewRef.current = next
      // Primero el estado: esto es sincrono y no toca la red.
      setView(next)
      const param = VIEW_PARAM[next]
      try {
        window.history.pushState(null, '', param ? `/?view=${param}` : '/')
      } catch (err) {
        // El URL se queda desalineado, pero la vista ya cambio. Que compartir
        // el enlace no sirva es mucho menos grave que un quiz que no avanza.
        console.warn('[nav] no se pudo actualizar el URL:', err)
      }
    },
    [],
  )

  // Entrar directo a /?view=results sin datos del quiz (enlace compartido,
  // recarga) no puede dejar la pantalla en blanco: se resuelve a welcome al
  // pintar, sin esperar a ninguna navegacion.
  const currentView: AppView = view === 'results' && !quizAnswers ? 'welcome' : view

  // Y de paso se corrige el URL, pero eso ya no afecta lo que se ve.
  useEffect(() => {
    if (view !== 'results' || quizAnswers) return
    intendedViewRef.current = 'welcome'
    setView('welcome')
    try {
      window.history.replaceState(null, '', '/')
    } catch (err) {
      console.warn('[nav] no se pudo limpiar el URL:', err)
    }
  }, [view, quizAnswers])

  const handleGoHome = useCallback(() => navigate('welcome'), [navigate])
  const handleStartSurvey = useCallback(() => navigate('survey'), [navigate])

  const handleSurveyComplete = useCallback(
    (answers: QuizAnswers) => {
      const blendRecs = calculateBlendRecommendations(answers)
      const primaryBlendId = blendRecs[0]?.id as Parameters<typeof determineSmokerProfile>[0]
      setQuizAnswers(answers)
      setBlendRecommendations(blendRecs)
      setSmokerProfileType(determineSmokerProfile(primaryBlendId))
      navigate('results')
    },
    [navigate],
  )

  const handleRetakeSurvey = useCallback(() => {
    setQuizAnswers(null)
    setBlendRecommendations([])
    navigate('survey')
  }, [navigate])

  const handleViewHerbarium = useCallback(() => navigate('herbarium'), [navigate])

  const handleBackFromHerbarium = useCallback(() => {
    navigate(quizAnswers && blendRecommendations.length > 0 ? 'results' : 'welcome')
  }, [quizAnswers, blendRecommendations, navigate])

  const handleShopBlends = useCallback(() => navigate('blends'), [navigate])
  const handleViewCart = useCallback(() => navigate('cart'), [navigate])

  const handleBackFromBlends = useCallback(() => {
    navigate(quizAnswers && blendRecommendations.length > 0 ? 'results' : 'welcome')
  }, [quizAnswers, blendRecommendations, navigate])

  const handleBackFromCart = useCallback(() => navigate('blends'), [navigate])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentView === 'welcome' && (
          <Welcome
            onStartSurvey={handleStartSurvey}
            onViewHerbarium={handleViewHerbarium}
            onShopBlends={handleShopBlends}
          />
        )}

        {currentView === 'survey' && (
          <Survey onComplete={handleSurveyComplete} onGoHome={handleGoHome} />
        )}

        {currentView === 'results' && quizAnswers && (
          <Results
            blendRecommendations={blendRecommendations}
            smokerProfileType={smokerProfileType}
            onRetake={handleRetakeSurvey}
            onViewHerbarium={handleViewHerbarium}
            onShopBlends={handleShopBlends}
            onGoHome={handleGoHome}
          />
        )}

        {currentView === 'herbarium' && (
          <Herbarium onBack={handleBackFromHerbarium} onGoHome={handleGoHome} />
        )}

        {currentView === 'blends' && (
          <BlendsCatalog
            onBack={handleBackFromBlends}
            onViewCart={handleViewCart}
            onGoHome={handleGoHome}
          />
        )}

        {currentView === 'cart' && (
          <Cart
            onBack={handleBackFromCart}
            onContinueShopping={handleShopBlends}
            onGoHome={handleGoHome}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default function SaviaSabiaApp() {
  return (
    <Suspense fallback={null}>
      <SaviaSabiaAppInner />
    </Suspense>
  )
}
