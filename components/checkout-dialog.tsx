'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check as CheckIcon, Loader2, ArrowLeft, MessageCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useCart, formatPrice } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'
import { buildSku } from '@/lib/stock'
import type { BlendId } from '@/lib/herbs-data'
import {
  DEPARTAMENTOS,
  FREE_SHIPPING_THRESHOLD_Q,
  SHIPPING_COST_Q,
  PICKUP_LOCATION,
  WHATSAPP_NUMBER,
  calcTotals,
  buildWhatsAppMessage,
  type CheckoutFormData,
  type OrderTotals,
} from '@/lib/checkout-config'
import { validateCheckout } from '@/lib/validation'

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DEFAULT_FORM: CheckoutFormData = {
  name: '',
  phone: '',
  email: '',
  deliveryType: 'envio',
  paymentMethod: 'transferencia',
  department: '',
  municipio: '',
  addressLine: '',
  deliveryNotes: '',
  notes: '',
  ageConfirmed: false,
}

interface SuccessData {
  orderNumber: string
  totals: OrderTotals
  waUrl: string
}

function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 4) return digits
  return `${digits.slice(0, 4)}-${digits.slice(4)}`
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const { language } = useLanguage()

  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState<CheckoutFormData>(DEFAULT_FORM)
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormData, boolean>>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<SuccessData | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Cart-derived values (cents → quetzales)
  const subtotalQ = getTotalPrice() / 100
  const totals = calcTotals(subtotalQ, form.deliveryType)
  const isDeliveryFree = form.deliveryType === 'recogida' || subtotalQ >= FREE_SHIPPING_THRESHOLD_Q
  const showFreeNudge =
    form.deliveryType === 'envio' && subtotalQ >= 150 && subtotalQ < FREE_SHIPPING_THRESHOLD_Q

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setStep(1)
        setForm(DEFAULT_FORM)
        setTouched({})
        setErrors({})
        setSuccess(null)
        setApiError(null)
        setIsSubmitting(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleField = useCallback(
    <K extends keyof CheckoutFormData>(field: K, value: CheckoutFormData[K]) => {
      setForm(prev => ({ ...prev, [field]: value }))
    },
    []
  )

  const handleBlur = useCallback(
    (field: keyof CheckoutFormData) => {
      setTouched(prev => ({ ...prev, [field]: true }))
      setErrors(validateCheckout(form, language))
    },
    [form, language]
  )

  const showError = (field: string): string | undefined =>
    touched[field as keyof CheckoutFormData] ? errors[field] : undefined

  // Validate step 1 fields and advance
  const handleNext = () => {
    const step1Fields = ['name', 'phone', 'email'] as const
    const newTouched = { ...touched }
    step1Fields.forEach(k => { newTouched[k] = true })
    setTouched(newTouched)

    const allErrors = validateCheckout(form, language)
    setErrors(allErrors)

    const hasStep1Errors = step1Fields.some(k => allErrors[k])
    if (!hasStep1Errors) setStep(2)
  }

  const handleSubmit = async () => {
    const allTouched = Object.fromEntries(
      Object.keys(DEFAULT_FORM).map(k => [k, true])
    ) as Record<keyof CheckoutFormData, boolean>
    setTouched(allTouched)

    const allErrors = validateCheckout(form, language)
    setErrors(allErrors)
    if (Object.keys(allErrors).length > 0) return

    setIsSubmitting(true)
    setApiError(null)

    try {
      const apiItems = items.map(item => ({
        sku: buildSku(item.blend.id as BlendId, item.variant.size),
        quantity: item.quantity,
        name_es: item.blend.displayName.es,
        name_en: item.blend.displayName.en,
      }))

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, items: apiItems, language }),
      })

      const data = await res.json()

      if (res.ok) {
        const { orderNumber, totals: serverTotals } = data as {
          orderNumber: string
          totals: OrderTotals
        }

        const displayItems = items.map(item => ({
          name: item.blend.displayName[language],
          variantLabel: item.variant.label[language],
          quantity: item.quantity,
          lineTotal: formatPrice(item.variant.price * item.quantity),
        }))

        const msg = buildWhatsAppMessage(orderNumber, form, displayItems, serverTotals, language)
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
        window.open(waUrl, '_blank')

        clearCart()
        setSuccess({ orderNumber, totals: serverTotals, waUrl })
      } else if (res.status === 409) {
        setApiError(
          language === 'es'
            ? `"${data.productName}" ya no tiene stock. Ajusta tu carrito e intenta de nuevo.`
            : `"${data.productName}" is out of stock. Adjust your cart and try again.`
        )
      } else if (res.status === 400 && data.errors) {
        setErrors(data.errors)
        // Go back to step 1 if server found basic field errors
        const step1Keys = ['name', 'phone', 'email']
        if (step1Keys.some(k => data.errors[k])) setStep(1)
      } else {
        setApiError(
          language === 'es'
            ? 'Ocurrió un error al procesar tu pedido. Intenta de nuevo.'
            : 'An error occurred while processing your order. Please try again.'
        )
      }
    } catch {
      setApiError(
        language === 'es'
          ? 'Error de conexión. Verifica tu internet e intenta de nuevo.'
          : 'Connection error. Check your internet and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyOrderNumber = () => {
    if (!success) return
    navigator.clipboard.writeText(success.orderNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const es = language === 'es'

  return (
    <Dialog
      open={open}
      onOpenChange={next => {
        if (!isSubmitting) onOpenChange(next)
      }}
    >
      <DialogContent
        className="flex flex-col max-h-[92dvh] p-0 gap-0 sm:max-w-lg"
        onInteractOutside={e => { if (isSubmitting) e.preventDefault() }}
        onEscapeKeyDown={e => { if (isSubmitting) e.preventDefault() }}
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
          <DialogTitle className="font-serif text-lg text-foreground">
            {success
              ? (es ? '¡Pedido generado!' : 'Order placed!')
              : (es ? 'Confirmar pedido' : 'Confirm order')}
          </DialogTitle>

          {!success && (
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {es ? `Paso ${step} de 2` : `Step ${step} of 2`}
              </span>
            </div>
          )}
        </DialogHeader>

        {/* ── Scrollable body ─────────────────────────────────────────── */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <AnimatePresence mode="wait">
            {success ? (
              /* ─ SUCCESS SCREEN ─ */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-4"
              >
                <div className="size-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">
                  <CheckIcon className="size-8 text-green-600" />
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {es ? 'Número de orden' : 'Order number'}
                </p>
                <p className="font-serif text-5xl font-bold text-foreground tracking-wide mb-2">
                  {success.orderNumber}
                </p>
                <button
                  onClick={copyOrderNumber}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                  {copied
                    ? <><CheckIcon className="size-3.5" />{es ? 'Copiado' : 'Copied'}</>
                    : <><Copy className="size-3.5" />{es ? 'Copiar número' : 'Copy number'}</>
                  }
                </button>

                <div className="bg-secondary rounded-xl p-4 mb-6 text-left space-y-1.5">
                  <p className="text-sm text-foreground">
                    {es
                      ? '✓ WhatsApp se abrió para confirmar tu pedido.'
                      : '✓ WhatsApp opened to confirm your order.'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {es
                      ? `Enviamos un resumen a ${form.email}`
                      : `We sent a summary to ${form.email}`}
                  </p>
                </div>

                <Button asChild size="lg" className="w-full h-14 text-base font-medium">
                  <a href={success.waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-5 mr-2" />
                    {es ? 'Confirmar por WhatsApp' : 'Confirm on WhatsApp'}
                  </a>
                </Button>
              </motion.div>
            ) : step === 1 ? (
              /* ─ PASO 1: DATOS DEL CLIENTE ─ */
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="font-serif text-base font-semibold text-foreground">
                  {es ? 'Tus datos' : 'Your details'}
                </h2>

                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="co-name">{es ? 'Nombre completo' : 'Full name'}</Label>
                  <Input
                    id="co-name"
                    value={form.name}
                    onChange={e => handleField('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder={es ? 'Tu nombre' : 'Your name'}
                    className={cn(showError('name') && 'border-destructive')}
                    autoComplete="name"
                  />
                  {showError('name') && (
                    <p className="text-xs text-destructive">{showError('name')}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label htmlFor="co-phone">
                    {es ? 'Teléfono (WhatsApp)' : 'Phone (WhatsApp)'}
                  </Label>
                  <Input
                    id="co-phone"
                    type="tel"
                    inputMode="numeric"
                    value={formatPhoneDisplay(form.phone)}
                    onChange={e => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 8)
                      handleField('phone', digits)
                    }}
                    onBlur={() => handleBlur('phone')}
                    placeholder="0000-0000"
                    className={cn(showError('phone') && 'border-destructive')}
                    autoComplete="tel"
                  />
                  {showError('phone') && (
                    <p className="text-xs text-destructive">{showError('phone')}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="co-email">
                    {es ? 'Correo electrónico' : 'Email address'}
                  </Label>
                  <Input
                    id="co-email"
                    type="email"
                    value={form.email}
                    onChange={e => handleField('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder={es ? 'tu@correo.com' : 'you@email.com'}
                    className={cn(showError('email') && 'border-destructive')}
                    autoComplete="email"
                  />
                  {showError('email') && (
                    <p className="text-xs text-destructive">{showError('email')}</p>
                  )}
                </div>
              </motion.div>
            ) : (
              /* ─ PASO 2: ENTREGA Y PAGO ─ */
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
              >
                {/* Delivery type */}
                <div className="space-y-2">
                  <Label>{es ? 'Forma de entrega' : 'Delivery method'}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      {
                        value: 'envio' as const,
                        title: es ? 'Envío Q40' : 'Shipping Q40',
                        sub: es ? 'Gratis desde Q200' : 'Free over Q200',
                      },
                      {
                        value: 'recogida' as const,
                        title: es ? `Recoger en ${PICKUP_LOCATION}` : 'Pick up',
                        sub: 'Q0',
                      },
                    ]).map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleField('deliveryType', opt.value)}
                        className={cn(
                          'p-3.5 rounded-xl border-2 text-left transition-all',
                          form.deliveryType === opt.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/40'
                        )}
                      >
                        <p className="font-medium text-foreground text-sm leading-tight">
                          {opt.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{opt.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address fields (only for envio) */}
                <AnimatePresence>
                  {form.deliveryType === 'envio' && (
                    <motion.div
                      key="address-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden space-y-3"
                    >
                      {/* Department */}
                      <div className="space-y-1.5">
                        <Label>{es ? 'Departamento' : 'Department'}</Label>
                        <Select
                          value={form.department}
                          onValueChange={v => {
                            handleField('department', v)
                            setTouched(prev => ({ ...prev, department: true }))
                            setErrors(validateCheckout({ ...form, department: v }, language))
                          }}
                        >
                          <SelectTrigger
                            className={cn(showError('department') && 'border-destructive')}
                          >
                            <SelectValue placeholder={es ? 'Selecciona' : 'Select'} />
                          </SelectTrigger>
                          <SelectContent>
                            {DEPARTAMENTOS.map(dep => (
                              <SelectItem key={dep} value={dep}>
                                {dep}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {showError('department') && (
                          <p className="text-xs text-destructive">{showError('department')}</p>
                        )}
                      </div>

                      {/* Municipio */}
                      <div className="space-y-1.5">
                        <Label htmlFor="co-municipio">
                          {es ? 'Municipio' : 'Municipality'}
                        </Label>
                        <Input
                          id="co-municipio"
                          value={form.municipio}
                          onChange={e => handleField('municipio', e.target.value)}
                          onBlur={() => handleBlur('municipio')}
                          placeholder={es ? 'Tu municipio' : 'Your municipality'}
                          className={cn(showError('municipio') && 'border-destructive')}
                        />
                        {showError('municipio') && (
                          <p className="text-xs text-destructive">{showError('municipio')}</p>
                        )}
                      </div>

                      {/* Address line */}
                      <div className="space-y-1.5">
                        <Label htmlFor="co-address">
                          {es ? 'Dirección exacta' : 'Exact address'}
                        </Label>
                        <Input
                          id="co-address"
                          value={form.addressLine}
                          onChange={e => handleField('addressLine', e.target.value)}
                          onBlur={() => handleBlur('addressLine')}
                          placeholder={es ? 'Calle, número, zona, colonia…' : 'Street, number, area…'}
                          className={cn(showError('addressLine') && 'border-destructive')}
                          autoComplete="street-address"
                        />
                        {showError('addressLine') && (
                          <p className="text-xs text-destructive">{showError('addressLine')}</p>
                        )}
                      </div>

                      {/* Delivery notes (optional) */}
                      <div className="space-y-1.5">
                        <Label htmlFor="co-delivery-notes">
                          {es ? 'Referencias (opcional)' : 'Landmarks (optional)'}
                        </Label>
                        <Input
                          id="co-delivery-notes"
                          value={form.deliveryNotes}
                          onChange={e => handleField('deliveryNotes', e.target.value)}
                          placeholder={
                            es ? 'Casa azul, frente al parque…' : 'Blue house, across the park…'
                          }
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Payment method */}
                <div className="space-y-2">
                  <Label>{es ? 'Método de pago' : 'Payment method'}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      {
                        value: 'transferencia' as const,
                        title: es ? 'Transferencia o depósito' : 'Bank transfer',
                        sub: es ? 'Bancaria' : 'or deposit',
                      },
                      {
                        value: 'contra_entrega' as const,
                        title: es ? 'Contra entrega' : 'Cash on delivery',
                        sub: es ? 'Efectivo' : 'Cash',
                      },
                    ]).map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleField('paymentMethod', opt.value)}
                        className={cn(
                          'p-3.5 rounded-xl border-2 text-left transition-all',
                          form.paymentMethod === opt.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/40'
                        )}
                      >
                        <p className="font-medium text-foreground text-sm leading-tight">
                          {opt.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{opt.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes (optional) */}
                <div className="space-y-1.5">
                  <Label htmlFor="co-notes">
                    {es ? 'Notas del pedido (opcional)' : 'Order notes (optional)'}
                  </Label>
                  <Input
                    id="co-notes"
                    value={form.notes}
                    onChange={e => handleField('notes', e.target.value)}
                    placeholder={
                      es ? 'Instrucciones especiales…' : 'Special instructions…'
                    }
                  />
                </div>

                {/* Age confirmation */}
                <div className="flex items-start gap-3 pt-1">
                  <Checkbox
                    id="co-age"
                    checked={form.ageConfirmed}
                    onCheckedChange={checked => {
                      handleField('ageConfirmed', checked === true)
                      setTouched(prev => ({ ...prev, ageConfirmed: true }))
                    }}
                    className={cn(showError('ageConfirmed') && 'border-destructive')}
                  />
                  <div>
                    <label
                      htmlFor="co-age"
                      className="text-sm text-foreground leading-snug cursor-pointer"
                    >
                      {es
                        ? 'Confirmo que soy mayor de 18 años.'
                        : 'I confirm I am 18 years of age or older.'}
                    </label>
                    {showError('ageConfirmed') && (
                      <p className="text-xs text-destructive mt-1">
                        {showError('ageConfirmed')}
                      </p>
                    )}
                  </div>
                </div>

                {/* API / server error */}
                {apiError && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
                    <p className="text-sm text-destructive">{apiError}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Sticky footer: summary + buttons ────────────────────────── */}
        {!success && (
          <div className="px-6 py-4 border-t border-border bg-background shrink-0 space-y-3">
            {/* Order summary */}
            <div className="space-y-1 text-sm">
              {items.map(item => (
                <div
                  key={`${item.blend.id}-${item.variant.size}`}
                  className="flex justify-between text-muted-foreground"
                >
                  <span className="truncate mr-2">
                    {item.quantity}×&nbsp;{item.blend.displayName[language]}
                    <span className="text-xs ml-1 opacity-70">
                      · {item.variant.label[language]}
                    </span>
                  </span>
                  <span className="shrink-0">
                    {formatPrice(item.variant.price * item.quantity)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between pt-1">
                <span className="text-muted-foreground">{es ? 'Subtotal' : 'Subtotal'}</span>
                <span className="text-foreground">{`Q${subtotalQ.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-muted-foreground shrink-0">{es ? 'Envío' : 'Shipping'}</span>
                  {showFreeNudge && (
                    <span className="text-xs text-muted-foreground/70 truncate">
                      {es
                        ? `(te faltan Q${(FREE_SHIPPING_THRESHOLD_Q - subtotalQ).toFixed(2)} para gratis)`
                        : `(Q${(FREE_SHIPPING_THRESHOLD_Q - subtotalQ).toFixed(2)} to free)`}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {isDeliveryFree && form.deliveryType === 'envio' ? (
                    <>
                      <span className="line-through text-muted-foreground text-xs">
                        {`Q${SHIPPING_COST_Q}.00`}
                      </span>
                      <span className="text-green-600 font-medium text-xs">
                        {es ? 'Gratis' : 'Free'}
                      </span>
                    </>
                  ) : (
                    <span className="text-foreground">
                      {form.deliveryType === 'recogida' ? 'Q0.00' : `Q${SHIPPING_COST_Q}.00`}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between font-semibold pt-1.5 border-t border-border">
                <span className="text-foreground">{es ? 'Total' : 'Total'}</span>
                <span className="text-foreground">{`Q${totals.totalQ.toFixed(2)}`}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              {step === 2 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  aria-label={es ? 'Volver al paso anterior' : 'Go back'}
                  className="shrink-0"
                >
                  <ArrowLeft className="size-4" />
                </Button>
              )}

              {step === 1 ? (
                <Button className="flex-1 h-11" onClick={handleNext}>
                  {es ? 'Siguiente' : 'Next'}
                </Button>
              ) : (
                <Button
                  className="flex-1 h-11"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 mr-2 animate-spin" />
                      {es ? 'Generando tu orden…' : 'Creating your order…'}
                    </>
                  ) : (
                    es ? 'Confirmar pedido' : 'Confirm order'
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
