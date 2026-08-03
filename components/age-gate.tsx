'use client'

import { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { legalContent } from '@/lib/support-content'

const STORAGE_KEY = 'savia-sabia-age-verified'

export function AgeGate() {
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const [declined, setDeclined] = useState(false)
  const copy = legalContent.ageGate

  useEffect(() => {
    try {
      const verified = window.localStorage.getItem(STORAGE_KEY)
      if (verified !== 'true') {
        setOpen(true)
      }
    } catch {
      // localStorage no disponible (modo privado, etc.) — no bloqueamos la app por esto.
    }
  }, [])

  const handleConfirm = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // si no se puede persistir, igual dejamos pasar en esta sesión
    }
    setOpen(false)
  }

  const handleDecline = () => {
    setDeclined(true)
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-card border-border max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-card-foreground text-xl">
            {copy.question[language]}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            {copy.description[language]}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {declined ? (
          <p className="text-sm text-card-foreground leading-relaxed py-2">
            {copy.declinedMessage[language]}
          </p>
        ) : (
          <>
            <AlertDialogFooter className="flex-col sm:flex-col gap-2">
              <Button onClick={handleConfirm} className="w-full">
                {copy.confirm[language]}
              </Button>
              <Button onClick={handleDecline} variant="outline" className="w-full bg-transparent">
                {copy.decline[language]}
              </Button>
            </AlertDialogFooter>
            <p className="text-[11px] text-muted-foreground text-center pt-1">
              {copy.fineprint[language]}
            </p>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
