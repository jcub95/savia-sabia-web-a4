export const DEPARTAMENTOS = [
  "Alta Verapaz","Baja Verapaz","Chimaltenango","Chiquimula","El Progreso",
  "Escuintla","Guatemala","Huehuetenango","Izabal","Jalapa","Jutiapa","Petén",
  "Quetzaltenango","Quiché","Retalhuleu","Sacatepéquez","San Marcos",
  "Santa Rosa","Sololá","Suchitepéquez","Totonicapán","Zacapa",
] as const

export type Departamento = typeof DEPARTAMENTOS[number]

export const SHIPPING_COST_Q = 40
export const FREE_SHIPPING_THRESHOLD_Q = 200
export const WHATSAPP_NUMBER = "50238149773"
export const PICKUP_LOCATION = "San Lucas Sacatepéquez"

export interface CheckoutFormData {
  name: string
  phone: string
  email: string
  deliveryType: 'envio' | 'recogida'
  paymentMethod: 'transferencia' | 'contra_entrega'
  department: string
  municipio: string
  addressLine: string
  deliveryNotes: string
  notes: string
  ageConfirmed: boolean
}

export interface OrderTotals {
  subtotalQ: number
  shippingQ: number
  totalQ: number
}

export function calcTotals(subtotalQ: number, deliveryType: 'envio' | 'recogida'): OrderTotals {
  const shippingQ =
    deliveryType === 'recogida' || subtotalQ >= FREE_SHIPPING_THRESHOLD_Q
      ? 0
      : SHIPPING_COST_Q
  return { subtotalQ, shippingQ, totalQ: subtotalQ + shippingQ }
}

export interface WhatsAppDisplayItem {
  name: string
  variantLabel: string
  quantity: number
  lineTotal: string
}

export function buildWhatsAppMessage(
  orderNumber: string,
  form: CheckoutFormData,
  displayItems: WhatsAppDisplayItem[],
  totals: OrderTotals,
  language: 'es' | 'en'
): string {
  const lines = displayItems.map(
    item => `${item.quantity}× ${item.name} · ${item.variantLabel} — ${item.lineTotal}`
  )

  const deliveryLabel =
    form.deliveryType === 'recogida'
      ? (language === 'es' ? `Recoger en ${PICKUP_LOCATION}` : `Pick up at ${PICKUP_LOCATION}`)
      : (language === 'es' ? 'Envío a domicilio' : 'Home delivery')

  const addressInfo =
    form.deliveryType === 'envio' && form.addressLine
      ? `${form.addressLine}, ${form.municipio}, ${form.department}`
      : null

  const paymentLabel =
    form.paymentMethod === 'transferencia'
      ? (language === 'es' ? 'Transferencia o depósito' : 'Bank transfer or deposit')
      : (language === 'es' ? 'Efectivo contra entrega' : 'Cash on delivery')

  const shippingLabel =
    totals.shippingQ === 0
      ? (language === 'es' ? 'GRATIS' : 'FREE')
      : `Q${totals.shippingQ.toFixed(2)}`

  if (language === 'es') {
    return [
      `*Pedido ${orderNumber} — Savia Sabia*`,
      '',
      `Cliente: ${form.name}`,
      `Teléfono: ${form.phone}`,
      `Correo: ${form.email}`,
      '',
      `Entrega: ${deliveryLabel}`,
      ...(addressInfo ? [addressInfo] : []),
      `Pago: ${paymentLabel}`,
      '',
      '── Pedido ──',
      ...lines,
      '',
      `Subtotal: Q${totals.subtotalQ.toFixed(2)}`,
      `Envío: ${shippingLabel}`,
      `*Total: Q${totals.totalQ.toFixed(2)}*`,
    ].join('\n')
  }

  return [
    `*Order ${orderNumber} — Savia Sabia*`,
    '',
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    '',
    `Delivery: ${deliveryLabel}`,
    ...(addressInfo ? [addressInfo] : []),
    `Payment: ${paymentLabel}`,
    '',
    '── Order ──',
    ...lines,
    '',
    `Subtotal: Q${totals.subtotalQ.toFixed(2)}`,
    `Shipping: ${shippingLabel}`,
    `*Total: Q${totals.totalQ.toFixed(2)}*`,
  ].join('\n')
}
