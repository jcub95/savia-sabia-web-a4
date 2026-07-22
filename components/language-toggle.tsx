'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={toggleLanguage}
      className={cn(
        'fixed top-4 right-4 z-50',
        'flex items-center gap-1 px-3 py-1.5',
        'bg-secondary/80 backdrop-blur-sm border border-border rounded-full',
        'text-sm font-medium text-foreground',
        'hover:bg-secondary transition-colors',
        'shadow-lg'
      )}
    >
      <span className={cn(
        'transition-opacity',
        language === 'en' ? 'opacity-100' : 'opacity-50'
      )}>
        EN
      </span>
      <span className="text-muted-foreground">/</span>
      <span className={cn(
        'transition-opacity',
        language === 'es' ? 'opacity-100' : 'opacity-50'
      )}>
        ES
      </span>
    </motion.button>
  )
}
