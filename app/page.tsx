'use client'

import { Suspense, useState, useCallback, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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
  const router = useRouter()
  const searchParams = useSearchParams()

  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null)
  const [blendRecommendations, setBlendRecommendations] = useState<Blend[]>([])
  const [smokerProfileType, setSmokerProfileType] = useState<SmokerProfileType>('sensory')

  // URL is the single source of truth for current view.
  // Derived synchronously from searchParams — no useEffect bridge needed.
  const currentView = useMemo<AppView>(() => {
    const v = searchParams.get('view')
    if (v && Object.values(VIEW_PARAM).includes(v as string)) return v as AppView
    return 'welcome'
  }, [searchParams])

  // If the user lands on /?view=results without quiz data (direct link, reload),
  // redirect silently to home.
  useEffect(() => {
    if (currentView === 'results' && !quizAnswers) {
      router.replace('/')
    }
  }, [currentView, quizAnswers, router])

  // All navigation goes through router.push so URL and view state never diverge.
  const navigate = useCallback(
    (view: AppView) => {
      const param = VIEW_PARAM[view]
      router.push(param ? `/?view=${param}` : '/')
    },
    [router],
  )

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
