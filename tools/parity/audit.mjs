#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// Harness de PARIDADE Figma ↔ código (@nuxt/ui) — Camada 1 do validador do DS.
// Cruza tools/parity/figma-sets.json (variant properties no Figma) com
// tools/parity/code-props.json (enums reais do @nuxt/ui) e aponta os furos.
//
// Uso:   node tools/parity/audit.mjs            (relatório no stdout)
//        node tools/parity/audit.mjs --md       (markdown p/ REPORT.md)
//
// Regenerar as entradas: ver tools/parity/README.md
// Saída de processo: exit 1 se houver achado HIGH (útil em CI).
// ─────────────────────────────────────────────────────────────
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const figma = JSON.parse(readFileSync(join(here, 'figma-sets.json'), 'utf8'))
const code = JSON.parse(readFileSync(join(here, 'code-props.json'), 'utf8'))
const asMd = process.argv.includes('--md')

const AXES = ['variant', 'size', 'color']
// Escala de tamanho OFICIAL do DS (decisão 2026-06-21): só sm/md/lg.
// xs/xl existem no @nuxt/ui mas são fora-de-escopo → 🔵 por design, não pendência.
const DS_SIZES = ['sm', 'md', 'lg']
const diff = (a = [], b = []) => a.filter((x) => !b.includes(x))

const findings = [] // { sev, comp, axis, msg }
const add = (sev, comp, axis, msg) => findings.push({ sev, comp, axis, msg })

for (const set of figma.sets) {
  const name = set.name
  if (code.skip && code.skip[name]) { add('INFO', name, '-', `pulado: ${code.skip[name]}`); continue }
  const c = code.components[name]
  if (!c) { add('MED', name, '-', 'Component Set no Figma sem mapeamento de código — revisar'); continue }

  for (const axis of AXES) {
    const codeOpts = c[axis]
    const figmaOpts = set.variants[axis]

    // código tem o eixo, Figma não modela como variant property
    if (codeOpts && !figmaOpts) {
      if (axis === 'color') add('LOW', name, 'color', `código expõe color (${codeOpts.length} opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design?`)
      else if (axis === 'size') add('LOW', name, 'size', `single-size por design — escala oficial é sm/md/lg, não aplicada a este componente`)
      else add('MED', name, axis, `código tem '${axis}' [${codeOpts.join(', ')}] mas não há propriedade '${axis}' no Figma`)
      continue
    }
    if (!codeOpts || !figmaOpts) continue

    // SIZE: comparar contra a escala oficial (sm/md/lg), não contra o enum cru do @nuxt/ui.
    if (axis === 'size') {
      const missingOfficial = diff(DS_SIZES, figmaOpts)         // falta um tamanho oficial → corrigir
      const outOfScope = diff(codeOpts, DS_SIZES).filter((x) => !figmaOpts.includes(x)) // xs/xl → por design
      const invalid = diff(figmaOpts, codeOpts)                 // size no Figma que não existe no código
      if (missingOfficial.length) add('MED', name, 'size', `falta tamanho oficial: ${missingOfficial.map((x) => `'${x}'`).join(', ')}  (figma=[${figmaOpts.join(', ')}])`)
      if (outOfScope.length) add('LOW', name, 'size', `${outOfScope.map((x) => `'${x}'`).join(', ')} fora da escala oficial (3 sizes) — por design`)
      if (invalid.length) add('HIGH', name, 'size', `no Figma mas NÃO existe no código: ${invalid.map((x) => `'${x}'`).join(', ')}`)
      continue
    }

    let missingInFigma = diff(codeOpts, figmaOpts) // existe no código, falta no Figma
    const extraInFigma = diff(figmaOpts, codeOpts)   // existe no Figma, não existe no código

    // 'variant=none' (sem chrome: sem fundo/borda/anel) raramente é desenhado no Figma.
    // Decisão do DS (2026-06-21): tratar como por-design (LOW), não como quebra de paridade.
    if (axis === 'variant' && missingInFigma.includes('none')) {
      add('LOW', name, 'variant', `'none' (campo sem chrome) não modelado no Figma — por design`)
      missingInFigma = missingInFigma.filter((x) => x !== 'none')
    }

    if (missingInFigma.length) {
      const sev = axis === 'variant' ? 'HIGH' : 'MED'
      add(sev, name, axis, `falta no Figma: ${missingInFigma.map((x) => `'${x}'`).join(', ')}  (código=[${codeOpts.join(', ')}] · figma=[${figmaOpts.join(', ')}])`)
    }
    if (extraInFigma.length) {
      add('HIGH', name, axis, `no Figma mas NÃO existe no código: ${extraInFigma.map((x) => `'${x}'`).join(', ')} — opção inválida ao arrastar`)
    }
  }
}

// ── Render ──
const order = { HIGH: 0, MED: 1, LOW: 2, INFO: 3 }
findings.sort((a, b) => order[a.sev] - order[b.sev] || a.comp.localeCompare(b.comp))
const counts = findings.reduce((m, f) => ((m[f.sev] = (m[f.sev] || 0) + 1), m), {})
const icon = { HIGH: '🔴', MED: '🟡', LOW: '🔵', INFO: '⚪' }

if (asMd) {
  const lines = []
  lines.push('# Relatório de Paridade — Figma ↔ @nuxt/ui')
  lines.push('')
  lines.push(`Gerado a partir de \`figma-sets.json\` (${figma.generatedAt}) × \`code-props.json\` (${code.generatedAt}).`)
  lines.push('')
  lines.push(`**Resumo:** 🔴 ${counts.HIGH || 0} · 🟡 ${counts.MED || 0} · 🔵 ${counts.LOW || 0} · ⚪ ${counts.INFO || 0}`)
  lines.push('')
  lines.push('| Sev | Componente | Eixo | Achado |')
  lines.push('|-----|-----------|------|--------|')
  for (const f of findings) lines.push(`| ${icon[f.sev]} ${f.sev} | ${f.comp} | ${f.axis} | ${f.msg.replace(/\|/g, '\\|')} |`)
  lines.push('')
  lines.push('Legenda: 🔴 quebra de paridade (corrigir) · 🟡 cobertura incompleta · 🔵 por design / informativo · ⚪ ignorado.')
  process.stdout.write(lines.join('\n') + '\n')
} else {
  console.log('\n  PARIDADE Figma ↔ @nuxt/ui\n  ' + '─'.repeat(50))
  console.log(`  Resumo: 🔴 ${counts.HIGH || 0}  🟡 ${counts.MED || 0}  🔵 ${counts.LOW || 0}  ⚪ ${counts.INFO || 0}\n`)
  for (const f of findings) console.log(`  ${icon[f.sev]} ${f.sev.padEnd(4)} ${f.comp.padEnd(12)} ${f.axis.padEnd(8)} ${f.msg}`)
  console.log('')
}

process.exit((counts.HIGH || 0) > 0 ? 1 : 0)
