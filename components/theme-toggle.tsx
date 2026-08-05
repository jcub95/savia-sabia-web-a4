'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Placeholder del mismo tamaño para evitar salto de layout
  if (!mounted) {
    return <div className="size-9" aria-hidden="true" />
  }

  const isDark = resolvedTheme === 'dark'

  const label = isDark
    ? (language === 'es' ? 'Cambiar a modo claro' : 'Switch to light mode')
    : (language === 'es' ? 'Cambiar a modo oscuro' : 'Switch to dark mode')

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className="size-9 p-0"
    >
      {isDark
        ? <Sun className="size-[18px]" />
        : <Moon className="size-[18px]" />}
    </Button>
  )
}
