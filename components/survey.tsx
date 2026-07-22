'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { surveyQuestions, type SurveyQuestion, type UserProfile } from '@/lib/herbs-data'

interface SurveyProps {
  onComplete: (profile: UserProfile) => void
}

export function Survey({ onComplete }: SurveyProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [direction, setDirection] = useState(0)
  
  const currentQuestion = surveyQuestions[currentStep]
  const progress = ((currentStep + 1) / surveyQuestions.length) * 100
  
  const handleSingleSelect = useCallback((value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }, [currentQuestion.id])
  
  const handleMultiSelect = useCallback((value: string) => {
    setAnswers(prev => {
      const current = (prev[currentQuestion.id] as string[]) || []
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return {
        ...prev,
        [currentQuestion.id]: updated,
      }
    })
  }, [currentQuestion.id])
  
  const canProceed = useCallback(() => {
    const answer = answers[currentQuestion.id]
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0
    }
    return !!answer
  }, [answers, currentQuestion])
  
  const handleNext = useCallback(() => {
    if (currentStep < surveyQuestions.length - 1) {
      setDirection(1)
      setCurrentStep(prev => prev + 1)
    } else {
      // Complete survey
      const profile: UserProfile = {
        smokingFrequency: answers.smoking_frequency as string || '',
        smokingDuration: answers.smoking_duration as string || '',
        transitionGoal: answers.transition_goal as string || '',
        respiratoryHealth: answers.respiratory_health as string || '',
        stressLevel: answers.stress_level as string || '',
        preferredTime: answers.preferred_time as string || '',
        desiredEffect: answers.desired_effect as string || '',
        flavorPreferences: (answers.flavor_preference as string[]) || [],
      }
      onComplete(profile)
    }
  }, [currentStep, answers, onComplete])
  
  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])
  
  const isSelected = useCallback((value: string) => {
    const answer = answers[currentQuestion.id]
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.includes(value)
    }
    return answer === value
  }, [answers, currentQuestion])
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Leaf className="size-5 text-primary" />
              <span className="font-serif text-lg font-semibold text-foreground">Savia Sabia</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {surveyQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </header>
      
      {/* Question Content */}
      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1 flex flex-col"
          >
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                {currentQuestion.category}
              </span>
            </motion.div>
            
            {/* Question */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-2 text-balance"
            >
              {currentQuestion.question}
            </motion.h2>
            
            {currentQuestion.description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground mb-8"
              >
                {currentQuestion.description}
              </motion.p>
            )}
            
            {/* Options */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="space-y-3 flex-1"
            >
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => {
                    if (currentQuestion.type === 'multiple') {
                      handleMultiSelect(option.value)
                    } else {
                      handleSingleSelect(option.value)
                    }
                  }}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                    'hover:border-primary/50 hover:bg-primary/5',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
                    isSelected(option.value)
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{option.label}</div>
                      {option.description && (
                        <div className="text-sm text-muted-foreground mt-0.5">
                          {option.description}
                        </div>
                      )}
                    </div>
                    <div
                      className={cn(
                        'size-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ml-4',
                        isSelected(option.value)
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/30'
                      )}
                    >
                      {isSelected(option.value) && (
                        <Check className="size-4 text-primary-foreground" />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer Navigation */}
      <footer className="sticky bottom-0 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex-1 h-12"
          >
            <ChevronLeft className="size-4 mr-1" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 h-12"
          >
            {currentStep === surveyQuestions.length - 1 ? (
              <>
                See Results
                <Leaf className="size-4 ml-1" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="size-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  )
}
