import { supabase } from './supabase'
import type { BlendId } from './herbs-data'
import type { ProductSize } from './cart-context'

const BLEND_ID_TO_SKU_PREFIX: Record<BlendId, string> = {
  'suavidad':          'SUAVIDAD',
  'nutre-el-alma':     'NUTRE',
  'proteccion':        'PROTECCION',
  'enfoque':           'ENFOQUE',
  'sueno-profundo':    'SUENO',
  'claridad-pulmonar': 'CLARIDAD',
}

const SIZE_TO_SKU_SUFFIX: Record<ProductSize, string> = {
  '0.5oz':   'SUELTA-0.5OZ',
  '2oz':     'SUELTA-2OZ',
  '12-pack': 'CIG-12',
  '24-pack': 'CIG-24',
}

export function buildSku(blendId: BlendId, size: ProductSize): string {
  return `${BLEND_ID_TO_SKU_PREFIX[blendId]}-${SIZE_TO_SKU_SUFFIX[size]}`
}

export type StockMap = Record<string, number>

export async function fetchAllStock(): Promise<StockMap> {
  const { data, error } = await supabase
    .from('products')
    .select('sku, stock')

  if (error) {
    console.error('Error fetching stock:', error)
    return {}
  }

  const map: StockMap = {}
  for (const row of data) {
    map[row.sku] = row.stock
  }
  return map
}
