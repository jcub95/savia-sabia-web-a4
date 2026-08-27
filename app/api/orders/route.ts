import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validateCheckout } from '@/lib/validation'
import { calcTotals } from '@/lib/checkout-config'
import { sendOrderEmails } from '@/lib/email/send-order-email'
import type { CheckoutFormData } from '@/lib/checkout-config'

interface ApiItem {
  sku: string
  quantity: number
  name_es: string
  name_en: string
}

interface RequestBody {
  form: CheckoutFormData
  items: ApiItem[]
  language?: 'es' | 'en'
}

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function POST(req: NextRequest) {
  let body: RequestBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { form, items, language = 'es' } = body

  // 1. Validate form
  const formErrors = validateCheckout(form, language)
  if (Object.keys(formErrors).length > 0) {
    return NextResponse.json({ errors: formErrors }, { status: 400 })
  }

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'No items in order' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // 2. Check products and stock
  const skus = items.map(i => i.sku)
  const { data: products, error: productError } = await supabase
    .from('products')
    .select('sku, price_q, stock, is_active')
    .in('sku', skus)

  if (productError) {
    console.error('Product fetch error:', { code: productError.code, message: productError.message, details: productError.details, hint: productError.hint })
    return NextResponse.json({
      error: 'Error fetching products',
      ...(process.env.NODE_ENV !== 'production' && { debug: productError }),
    }, { status: 500 })
  }

  if (!products || products.length === 0) {
    return NextResponse.json({ error: 'No products found' }, { status: 400 })
  }

  const productMap = new Map(products.map(p => [p.sku, p]))

  for (const item of items) {
    const product = productMap.get(item.sku)
    if (!product || product.is_active === false) {
      return NextResponse.json(
        { error: `Product not found: ${item.sku}` },
        { status: 400 }
      )
    }
    if (item.quantity > (product.stock ?? 0)) {
      return NextResponse.json(
        { error: 'out_of_stock', productName: item.name_es },
        { status: 409 }
      )
    }
  }

  // 3. Calculate totals from DB prices
  let subtotalQ = 0
  for (const item of items) {
    const product = productMap.get(item.sku)!
    subtotalQ += (product.price_q ?? 0) * item.quantity
  }
  const totals = calcTotals(subtotalQ, form.deliveryType)

  // 4. Insert customer
  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .insert({
      name: form.name.trim(),
      phone: form.phone.replace(/[\s\-]/g, ''),
      email: form.email.trim().toLowerCase(),
    })
    .select('id')
    .single()

  if (customerError || !customer) {
    console.error('Customer insert error:', { code: customerError?.code, message: customerError?.message, details: customerError?.details, hint: customerError?.hint })
    return NextResponse.json({
      error: 'Error creating customer',
      ...(process.env.NODE_ENV !== 'production' && { debug: customerError }),
    }, { status: 500 })
  }

  // 5. Insert address if envio
  let addressId: string | null = null
  if (form.deliveryType === 'envio') {
    const { data: address, error: addressError } = await supabase
      .from('addresses')
      .insert({
        customer_id: customer.id,
        department: form.department,
        municipio: form.municipio.trim(),
        address_line: form.addressLine.trim(),
        delivery_notes: form.deliveryNotes?.trim() || null,
      })
      .select('id')
      .single()

    if (addressError || !address) {
      console.error('Address insert error:', { code: addressError?.code, message: addressError?.message, details: addressError?.details, hint: addressError?.hint })
      return NextResponse.json({
        error: 'Error creating address',
        ...(process.env.NODE_ENV !== 'production' && { debug: addressError }),
      }, { status: 500 })
    }
    addressId = address.id
  }

  // 6. Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: customer.id,
      address_id: addressId,
      delivery_type: form.deliveryType,
      payment_method: form.paymentMethod,
      shipping_q: totals.shippingQ,
      total_q: totals.totalQ,
      notes: form.notes?.trim() || null,
      status: 'pendiente',
    })
    .select('id, order_number')
    .single()

  if (orderError || !order) {
    console.error('Order insert error:', { code: orderError?.code, message: orderError?.message, details: orderError?.details, hint: orderError?.hint })
    return NextResponse.json({
      error: 'Error creating order',
      ...(process.env.NODE_ENV !== 'production' && { debug: orderError }),
    }, { status: 500 })
  }

  // 7. Insert order items
  const orderItemsData = items.map(item => ({
    order_id: order.id,
    sku: item.sku,
    quantity: item.quantity,
    unit_price_q: productMap.get(item.sku)!.price_q,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsData)

  if (itemsError) {
    console.error('Order items insert error:', { code: itemsError.code, message: itemsError.message, details: itemsError.details, hint: itemsError.hint })
    // Order exists — log and continue
  }

  // 8. Send email (non-blocking)
  try {
    await sendOrderEmails({
      orderNumber: order.order_number,
      form,
      items: items.map(item => ({
        ...item,
        priceQ: productMap.get(item.sku)!.price_q,
      })),
      totals,
    })
  } catch (emailError) {
    console.error('Email send error:', emailError)
  }

  // 9. Return success
  return NextResponse.json({ orderNumber: order.order_number, totals })
}
