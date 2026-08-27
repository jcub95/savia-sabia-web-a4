import type { CheckoutFormData } from './checkout-config'

export function validatePhone(raw: string): boolean {
  const digits = raw.replace(/[\s\-]/g, '')
  return /^[345]\d{7}$/.test(digits)
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

type Lang = 'es' | 'en'

const FIELD_ERRORS: Record<string, Record<Lang, string>> = {
  name: {
    es: 'El nombre debe tener al menos 3 caracteres.',
    en: 'Name must be at least 3 characters.',
  },
  phone: {
    es: 'Ingresa un teléfono guatemalteco válido (8 dígitos, comienza con 3, 4 o 5).',
    en: 'Enter a valid Guatemalan phone number (8 digits, starting with 3, 4 or 5).',
  },
  email: {
    es: 'Ingresa un correo electrónico válido.',
    en: 'Enter a valid email address.',
  },
  ageConfirmed: {
    es: 'Debes confirmar que eres mayor de 18 años.',
    en: 'You must confirm you are 18 or older.',
  },
  department: {
    es: 'Selecciona tu departamento.',
    en: 'Select your department.',
  },
  municipio: {
    es: 'Ingresa tu municipio.',
    en: 'Enter your municipality.',
  },
  addressLine: {
    es: 'Ingresa tu dirección exacta.',
    en: 'Enter your exact address.',
  },
}

export function validateCheckout(
  data: CheckoutFormData,
  lang: Lang = 'es'
): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!data.name || data.name.trim().length < 3) {
    errors.name = FIELD_ERRORS.name[lang]
  }
  if (!validatePhone(data.phone)) {
    errors.phone = FIELD_ERRORS.phone[lang]
  }
  if (!validateEmail(data.email)) {
    errors.email = FIELD_ERRORS.email[lang]
  }
  if (!data.ageConfirmed) {
    errors.ageConfirmed = FIELD_ERRORS.ageConfirmed[lang]
  }
  if (data.deliveryType === 'envio') {
    if (!data.department) errors.department = FIELD_ERRORS.department[lang]
    if (!data.municipio?.trim()) errors.municipio = FIELD_ERRORS.municipio[lang]
    if (!data.addressLine?.trim()) errors.addressLine = FIELD_ERRORS.addressLine[lang]
  }

  return errors
}
