'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Welcome } from '@/components/welcome'
import { Survey } from '@/components/survey'
import { Results } from '@/components/results'
import { Herbarium } from '@/components/herbarium'
import { BlendsCatalog } from '@/components/blends-catalog'
import { Cart } from '@/components/cart'
import { CartProvider } from '@/lib/cart-context'
import { LanguageProvider } from '@/lib/language-context'
import { LanguageToggle } from '@/components/language-toggle'
import { type UserProfile, type Herb, type Blend, type SmokerProfileType, calculateRecommendations, calculateBlendRecommendations, determineSmokerProfile } from '@/lib/herbs-data'

type AppView = 'welcome' | 'survey' | 'results' | 'herbarium' | 'blends' | 'cart'

export default function SaviaSabiaApp() {
  const [currentView, setCurrentView] = useState<AppView>('welcome')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [recommendations, setRecommendations] = useState<Herb[]>([])
  const [blendRecommendations, setBlendRecommendations] = useState<Blend[]>([])
  const [smokerProfileType, setSmokerProfileType] = useState<SmokerProfileType>('sensory')
  
  const handleStartSurvey = useCallback(() => {
    setCurrentView('survey')
  }, [])
  
  const handleSurveyComplete = useCallback((profile: UserProfile) => {
    setUserProfile(profile)
    const recs = calculateRecommendations(profile)
    setRecommendations(recs)
    const profileType = determineSmokerProfile(profile)
    setSmokerProfileType(profileType)
    const blendRecs = calculateBlendRecommendations(profile, profileType)
    setBlendRecommendations(blendRecs)
    setCurrentView('results')
  }, [])
  
  const handleRetakeSurvey = useCallback(() => {
    setUserProfile(null)
    setRecommendations([])
    setBlendRecommendations([])
    setCurrentView('survey')
  }, [])
  
  const handleViewHerbarium = useCallback(() => {
    setCurrentView('herbarium')
  }, [])
  
  const handleBackFromHerbarium = useCallback(() => {
    if (userProfile && recommendations.length > 0) {
      setCurrentView('results')
    } else {
      setCurrentView('welcome')
    }
  }, [userProfile, recommendations])
  
  const handleShopBlends = useCallback(() => {
    setCurrentView('blends')
  }, [])
  
  const handleViewCart = useCallback(() => {
    setCurrentView('cart')
  }, [])
  
  const handleBackFromBlends = useCallback(() => {
    if (userProfile && recommendations.length > 0) {
      setCurrentView('results')
    } else {
      setCurrentView('welcome')
    }
  }, [userProfile, recommendations])
  
  const handleBackFromCart = useCallback(() => {
    setCurrentView('blends')
  }, [])
  
  return (
    <LanguageProvider>
      <CartProvider>
        <LanguageToggle />
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
            <Survey onComplete={handleSurveyComplete} />
          )}
          
          {currentView === 'results' && userProfile && (
            <Results
              recommendations={recommendations}
              blendRecommendations={blendRecommendations}
              profile={userProfile}
              smokerProfileType={smokerProfileType}
              onRetake={handleRetakeSurvey}
              onViewHerbarium={handleViewHerbarium}
              onShopBlends={handleShopBlends}
            />
          )}
          
          {currentView === 'herbarium' && (
            <Herbarium onBack={handleBackFromHerbarium} />
          )}
          
          {currentView === 'blends' && (
            <BlendsCatalog
              onBack={handleBackFromBlends}
              onViewCart={handleViewCart}
            />
          )}
          
          {currentView === 'cart' && (
            <Cart
              onBack={handleBackFromCart}
              onContinueShopping={handleShopBlends}
            />
          )}
          </motion.div>
        </AnimatePresence>
      </CartProvider>
    </LanguageProvider>
  )
}
