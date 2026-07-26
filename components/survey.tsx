'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { quizQuestions, type QuizAnswers } from '@/lib/herbs-data'
import { useLanguage } from '@/lib/language-context'

interface SurveyProps {
  onComplete: (answers: QuizAnswers) => void
  onGoHome: () => void
}

export function Survey({ onComplete, onGoHome }: SurveyProps) {
  const { language, t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [direction, setDirection] = useState(0)

  const currentQuestion = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  const handleSelect = useCallback((optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }))
  }, [currentQuestion.id])

  const canProceed = useCallback(() => {
    return !!answers[currentQuestion.id]
  }, [answers, currentQuestion.id])

  const handleNext = useCallback(() => {
    if (currentStep < quizQuestions.length - 1) {
      setDirection(1)
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete(answers)
    }
  }, [currentStep, answers, onComplete])

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  const isSelected = (optionId: string) => answers[currentQuestion.id] === optionId

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 100 : -100, opacity: 0 }),
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="sm" onClick={onGoHome} className="gap-1">
              <Home className="size-4" />
              {t('nav.home')}
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} {t('survey.of')} {quizQuestions.length}
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
            {/* Question */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8 text-balance"
            >
              {currentQuestion.question[language]}
            </motion.h2>

            {/* Options */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="space-y-3 flex-1"
            >
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  onClick={() => handleSelect(option.id)}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                    'hover:border-primary/50 hover:bg-primary/5',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
                    isSelected(option.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {option.label[language]}
                    </span>
                    <div
                      className={cn(
                        'size-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ml-4',
                        isSelected(option.id)
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/30'
                      )}
                    >
                      {isSelected(option.id) && (
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
            {t('nav.back')}
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 h-12"
          >
            {currentStep === quizQuestions.length - 1 ? (
              <>
                {t('survey.see_results')}
                <ChevronRight className="size-4 ml-1" />
              </>
            ) : (
              <>
                {t('survey.next')}
                <ChevronRight className="size-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  )
}
