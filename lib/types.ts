export type ProductFormat = 'suelta' | 'cigarrillo'

export type OrderStatus =
  | 'pendiente'
  | 'pagado'
  | 'preparacion'
  | 'enviado'
  | 'entregado'
  | 'cancelado'

export type DeliveryType = 'envio' | 'recogida' | 'contra_entrega'

export interface Product {
  id: string
  sku: string
  name: string
  format: ProductFormat
  size: string
  price_q: number
  stock: number
  is_active: boolean
  created_at: string
}

export interface Customer {
  id: string
  name: string
  phone?: string
  email?: string
  notes?: string
  created_at: string
}

export interface Address {
  id: string
  customer_id: string
  label?: string
  department?: string
  municipio?: string
  address_line?: string
  delivery_notes?: string
  is_default: boolean
  created_at: string
}

export interface Order {
  id: string
  customer_id: string
  address_id?: string
  status: OrderStatus
  delivery_type: DeliveryType
  shipping_q: number
  total_q: number
  payment_ref?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price_q: number
  subtotal_q: number
}
