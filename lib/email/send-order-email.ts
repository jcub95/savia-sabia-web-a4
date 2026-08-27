import { Resend } from 'resend'
import type { CheckoutFormData, OrderTotals } from '../checkout-config'
import { PICKUP_LOCATION } from '../checkout-config'

export interface OrderEmailData {
  orderNumber: string
  form: CheckoutFormData
  items: Array<{
    sku: string
    quantity: number
    name_es: string
    name_en: string
    priceQ: number
  }>
  totals: OrderTotals
}

function fq(amount: number): string {
  return `Q${amount.toFixed(2)}`
}

function buildCustomerHtml(data: OrderEmailData): string {
  const { orderNumber, form, items, totals } = data
  const isEnvio = form.deliveryType === 'envio'

  const itemRows = items
    .map(
      item => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e8e4d9;color:#1C4A2A;font-size:14px;">${item.name_es}</td>
        <td style="padding:8px 0;border-bottom:1px solid #e8e4d9;color:#1C4A2A;text-align:center;font-size:14px;">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #e8e4d9;color:#1C4A2A;text-align:right;font-size:14px;">${fq(item.priceQ * item.quantity)}</td>
      </tr>`
    )
    .join('')

  const deliveryLabel = isEnvio ? 'Envío a domicilio' : `Recoger en ${PICKUP_LOCATION}`
  const paymentLabel =
    form.paymentMethod === 'transferencia'
      ? 'Transferencia o depósito bancario'
      : 'Efectivo contra entrega'

  const nextSteps =
    form.paymentMethod === 'transferencia'
      ? 'Te compartiremos los datos bancarios por WhatsApp. Envíanos la foto del comprobante de pago para despachar tu pedido el mismo día.'
      : 'Pagarás en efectivo al recibir tu pedido. Te contactaremos para coordinar la entrega.'

  const addressBlock =
    isEnvio && form.addressLine
      ? `<p style="margin:4px 0 0;color:#5A6B52;font-size:13px;">${form.addressLine}, ${form.municipio}, ${form.department}</p>`
      : ''

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ece0;font-family:Georgia,serif;">
  <div style="max-width:580px;margin:0 auto;background:#FAF7EE;">

    <div style="background:#1C4A2A;padding:32px 40px;text-align:center;">
      <p style="margin:0;color:#849C52;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Savia Sabia</p>
      <h1 style="margin:10px 0 0;color:#FAF7EE;font-size:26px;font-weight:normal;letter-spacing:0.02em;">Pedido confirmado</h1>
    </div>

    <div style="padding:40px;">
      <p style="color:#5A6B52;font-size:14px;margin:0 0 20px;">Hola ${form.name.trim()},</p>
      <p style="color:#1C4A2A;font-size:15px;margin:0 0 28px;line-height:1.65;">
        Recibimos tu pedido. Guarda tu número de orden:
      </p>

      <div style="background:#1C4A2A;border-radius:8px;padding:22px;text-align:center;margin:0 0 32px;">
        <p style="margin:0;color:#849C52;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:10px;">Número de orden</p>
        <p style="margin:0;color:#FAF7EE;font-size:38px;font-weight:bold;letter-spacing:0.05em;">${orderNumber}</p>
      </div>

      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
        <thead>
          <tr>
            <th style="text-align:left;color:#849C52;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;padding:0 0 10px;border-bottom:2px solid #1C4A2A;">Producto</th>
            <th style="text-align:center;color:#849C52;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;padding:0 0 10px;border-bottom:2px solid #1C4A2A;">Cant.</th>
            <th style="text-align:right;color:#849C52;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;padding:0 0 10px;border-bottom:2px solid #1C4A2A;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <table style="width:100%;border-collapse:collapse;margin:0 0 32px;">
        <tr>
          <td style="color:#5A6B52;font-size:14px;padding:4px 0;">Subtotal</td>
          <td style="color:#1C4A2A;font-size:14px;text-align:right;padding:4px 0;">${fq(totals.subtotalQ)}</td>
        </tr>
        <tr>
          <td style="color:#5A6B52;font-size:14px;padding:4px 0;">Envío</td>
          <td style="color:#1C4A2A;font-size:14px;text-align:right;padding:4px 0;">${totals.shippingQ === 0 ? 'Gratis' : fq(totals.shippingQ)}</td>
        </tr>
        <tr>
          <td style="color:#1C4A2A;font-size:16px;font-weight:bold;padding:14px 0 0;border-top:1px solid #d8d4c9;">Total</td>
          <td style="color:#1C4A2A;font-size:16px;font-weight:bold;text-align:right;padding:14px 0 0;border-top:1px solid #d8d4c9;">${fq(totals.totalQ)}</td>
        </tr>
      </table>

      <div style="background:#f0ece0;border-radius:8px;padding:20px;margin:0 0 32px;">
        <p style="margin:0 0 6px;color:#849C52;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">Entrega</p>
        <p style="margin:0;color:#1C4A2A;font-size:14px;">${deliveryLabel}</p>
        ${addressBlock}
        <p style="margin:16px 0 6px;color:#849C52;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">Pago</p>
        <p style="margin:0;color:#1C4A2A;font-size:14px;">${paymentLabel}</p>
      </div>

      <div style="background:#e6f0e6;border-radius:8px;padding:20px;margin:0 0 32px;">
        <p style="margin:0 0 8px;color:#1C4A2A;font-size:14px;font-weight:bold;">Próximos pasos</p>
        <p style="margin:0;color:#1C4A2A;font-size:14px;line-height:1.65;">${nextSteps}</p>
      </div>

      <p style="color:#5A6B52;font-size:13px;line-height:1.65;margin:0;">
        ¿Preguntas? Escríbenos por WhatsApp al <strong style="color:#1C4A2A;">3814-9773</strong>
        o a <strong style="color:#1C4A2A;">@savia.sabia.herbs</strong> en Instagram.
      </p>
    </div>

    <div style="background:#1C4A2A;padding:24px 40px;text-align:center;">
      <p style="margin:0;color:#849C52;font-size:12px;font-style:italic;letter-spacing:0.06em;">Menos químicos. Más plantas.</p>
    </div>

  </div>
</body>
</html>`
}

function buildInternalHtml(data: OrderEmailData): string {
  const { orderNumber, form, items, totals } = data
  const isEnvio = form.deliveryType === 'envio'

  const itemList = items
    .map(item => `<li>${item.quantity}× ${item.name_es} (${item.sku}) — ${fq(item.priceQ * item.quantity)}</li>`)
    .join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Georgia,serif;color:#1C4A2A;background:#FAF7EE;padding:24px;max-width:600px;">
  <h2 style="margin:0 0 16px;">Nuevo pedido: ${orderNumber}</h2>
  <h3 style="color:#849C52;">Cliente</h3>
  <p style="margin:0;">
    <strong>Nombre:</strong> ${form.name}<br>
    <strong>Teléfono:</strong> ${form.phone}<br>
    <strong>Correo:</strong> ${form.email}
  </p>
  <h3 style="color:#849C52;">Pedido</h3>
  <ul style="margin:0;padding-left:20px;">${itemList}</ul>
  <p>
    <strong>Subtotal:</strong> ${fq(totals.subtotalQ)}<br>
    <strong>Envío:</strong> ${fq(totals.shippingQ)}<br>
    <strong>Total:</strong> ${fq(totals.totalQ)}
  </p>
  <h3 style="color:#849C52;">Entrega y pago</h3>
  <p>
    <strong>Tipo de entrega:</strong> ${form.deliveryType}<br>
    ${isEnvio ? `<strong>Dirección:</strong> ${form.addressLine}, ${form.municipio}, ${form.department}<br>` : ''}
    ${form.deliveryNotes ? `<strong>Referencias:</strong> ${form.deliveryNotes}<br>` : ''}
    <strong>Método de pago:</strong> ${form.paymentMethod}
  </p>
  ${form.notes ? `<p><strong>Notas del cliente:</strong> ${form.notes}</p>` : ''}
</body>
</html>`
}

export async function sendOrderEmails(data: OrderEmailData): Promise<void> {
  if (!process.env.RESEND_API_KEY) return

  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  await resend.emails.send({
    from,
    to: data.form.email,
    subject: `Tu pedido ${data.orderNumber} — Savia Sabia`,
    html: buildCustomerHtml(data),
  })

  if (process.env.ORDER_NOTIFY_EMAIL) {
    await resend.emails.send({
      from,
      to: process.env.ORDER_NOTIFY_EMAIL,
      subject: `[Nuevo pedido] ${data.orderNumber} — ${data.form.name}`,
      html: buildInternalHtml(data),
    })
  }
}
