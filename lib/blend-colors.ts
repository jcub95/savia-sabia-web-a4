import type { BlendId } from './herbs-data'

export interface BlendPalette {
  /** Color puro de marca. Solo para rellenos sólidos, nunca texto sobre crema. */
  hex: string
  /** Tono oscuro: texto sobre fondo claro. */
  ink: string
  /** Tono claro: texto sobre el verde oscuro del tema nocturno. */
  inkDark: string
}

export const BLEND_PALETTE: Record<BlendId, BlendPalette> = {
  'enfoque': { hex: '#3B6FD4', ink: '#2A4FA0', inkDark: '#9DB8F0' },
  'claridad-pulmonar': { hex: '#3BAEC6', ink: '#23808F', inkDark: '#8AD6E6' },
  'proteccion': { hex: '#5FAE55', ink: '#3E7A38', inkDark: '#A5D89E' },
  'nutre-el-alma': { hex: '#DE7E38', ink: '#A85417', inkDark: '#F0B382' },
  'suavidad': { hex: '#D87FA4', ink: '#A34A6E', inkDark: '#EFB2C9' },
  'sueno-profundo': { hex: '#9E7FCB', ink: '#6E4F9E', inkDark: '#C9B2E8' },
}

/** Tolerante a ids que no vengan del catálogo (filas nuevas en blend_bulk). */
export function blendHex(id: string | null | undefined): string {
  if (!id) return 'var(--border)'
  return BLEND_PALETTE[id as BlendId]?.hex ?? 'var(--border)'
}
