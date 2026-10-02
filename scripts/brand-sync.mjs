#!/usr/bin/env node
/**
 * Sincroniza los archivos de logo que el sitio publica desde el archivo maestro
 * de marca, que vive FUERA de este repositorio (../2-marca/logo/).
 *
 * Por qué existe este script
 * -------------------------
 * Vercel construye solo desde este repositorio, así que los SVG que el sitio
 * sirve tienen que estar commiteados en public/brand/. Eso obliga a tener una
 * copia. Lo que este script elimina no es la copia, es la ambigüedad: el
 * maestro es 2-marca/logo/ y public/brand/ es un derivado declarado que se
 * regenera con un comando, no arrastrando archivos a mano.
 *
 *   pnpm brand:sync    copia el maestro sobre el derivado
 *   pnpm brand:check   reporta desincronización sin escribir nada (salida 1)
 *
 * NO se engancha a prebuild a propósito: en el build de Vercel la carpeta
 * maestra no existe y un paso obligatorio rompería el deploy.
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const masterDir = resolve(repoRoot, '..', '2-marca', 'logo')
const derivedDir = join(repoRoot, 'public', 'brand')

/** maestro (nombre original del entregable de diseño) -> derivado que sirve el sitio */
const MAP = {
  'SaviaSabia_logo_color_cortado_transparente.svg': 'logo-color.svg',
  'SaviaSabia_logo_invertido_cortado_transparente.svg': 'logo-invertido.svg',
  'SaviaSabia_logo_monotonico_invertido_cortado_transparente.svg': 'logo-monotonico-invertido.svg',
}

const check = process.argv.includes('--check')

if (!existsSync(masterDir)) {
  console.warn(`brand:sync  archivo maestro no encontrado en ${masterDir}`)
  console.warn('            se omite: normal en CI, donde solo se clona este repo.')
  process.exit(0)
}

mkdirSync(derivedDir, { recursive: true })

let drift = 0
for (const [master, derived] of Object.entries(MAP)) {
  const from = join(masterDir, master)
  const to = join(derivedDir, derived)

  if (!existsSync(from)) {
    console.error(`  FALTA    ${master} no está en el archivo maestro`)
    drift++
    continue
  }

  const source = readFileSync(from)
  const same = existsSync(to) && readFileSync(to).equals(source)

  if (same) {
    console.log(`  ok       ${derived}`)
  } else if (check) {
    console.error(`  DESINCR  ${derived} difiere de ${master}`)
    drift++
  } else {
    writeFileSync(to, source)
    console.log(`  escrito  ${derived}  <-  ${master}`)
  }
}

if (drift > 0) {
  console.error(
    check
      ? `\n${drift} archivo(s) desincronizado(s). Ejecuta: pnpm brand:sync`
      : `\n${drift} archivo(s) del maestro no se pudieron resolver.`,
  )
  process.exit(1)
}

console.log(check ? '\npublic/brand/ está al día con el maestro.' : '\nSincronización completa.')
