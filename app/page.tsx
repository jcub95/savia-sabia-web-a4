'use client'

import { Suspense, useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Welcome } from '@/components/welcome'
import { Survey } from '@/components/survey'
import { Results } from '@/components/results'
import { Herbarium } from '@/components/herbarium'
import { BlendsCatalog } from '@/components/blends-catalog'
import { Cart } from '@/components/cart'
import { type QuizAnswers, type Blend, type SmokerProfileType, calculateBlendRecommendations, determineSmokerProfile } from '@/lib/herbs-data'

type AppView = 'welcome' | 'survey' | 'results' | 'herbarium' | 'blends' | 'cart'

// Vistas a las que se puede entrar directamente por link (?view=...), por
// ejemplo desde el header o el footer globales. 'results' se excluye porque
// depende de respuestas de la encuesta que no existen todavía en un enlace frío.
const LINKABLE_VIEWS: AppView[] = ['survey', 'herbarium', 'blends', 'cart']

function SaviaSabiaAppInner() {
  const searchParams = useSearchParams()
  const [currentView, setCurrentView] = useState<AppView>('welcome')
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null)
  const [blendRecommendations, setBlendRecommendations] = useState<Blend[]>([])
  const [smokerProfileType, setSmokerProfileType] = useState<SmokerProfileType>('sensory')

  // Puente temporal: el header/footer globales enlazan a `/?view=blends`, etc.
  // hasta que el quiz y la tienda se migren a rutas propias de Next.js.
  useEffect(() => {
    const requestedView = searchParams.get('view') as AppView | null
    if (requestedView && LINKABLE_VIEWS.includes(requestedView)) {
      setCurrentView(requestedView)
    }
  }, [searchParams])
  
  const handleGoHome = useCallback(() => {
    setCurrentView('welcome')
  }, [])

  const handleStartSurvey = useCallback(() => {
    setCurrentView('survey')
  }, [])
  
  const handleSurveyComplete = useCallback((answers: QuizAnswers) => {
    setQuizAnswers(answers)
    const blendRecs = calculateBlendRecommendations(answers)
    setBlendRecommendations(blendRecs)
    const primaryBlendId = blendRecs[0]?.id as Parameters<typeof determineSmokerProfile>[0]
    setSmokerProfileType(determineSmokerProfile(primaryBlendId))
    setCurrentView('results')
  }, [])
  
  const handleRetakeSurvey = useCallback(() => {
    setQuizAnswers(null)
    setBlendRecommendations([])
    setCurrentView('survey')
  }, [])
  
  const handleViewHerbarium = useCallback(() => {
    setCurrentView('herbarium')
  }, [])
  
  const handleBackFromHerbarium = useCallback(() => {
    if (quizAnswers && blendRecommendations.length > 0) {
      setCurrentView('results')
    } else {
      setCurrentView('welcome')
    }
  }, [quizAnswers, blendRecommendations])
  
  const handleShopBlends = useCallback(() => {
    setCurrentView('blends')
  }, [])
  
  const handleViewCart = useCallback(() => {
    setCurrentView('cart')
  }, [])
  
  const handleBackFromBlends = useCallback(() => {
    if (quizAnswers && blendRecommendations.length > 0) {
      setCurrentView('results')
    } else {
      setCurrentView('welcome')
    }
  }, [quizAnswers, blendRecommendations])
  
  const handleBackFromCart = useCallback(() => {
    setCurrentView('blends')
  }, [])
  
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
