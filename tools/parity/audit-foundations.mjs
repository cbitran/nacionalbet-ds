#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// Harness de PARIDADE de FOUNDATIONS — tokens.css ↔ Figma (bidirecional).
// Diretriz do DS: tudo que está no CSS tem de estar no Figma e vice-versa.
// Famílias: shadow, glow, blur, radius, spacing, gradient, text-size, weight.
//
// Lê tokens.css AO VIVO + figma-styles.json (snapshot do Figma).
// Uso: node tools/parity/audit-foundations.mjs [--md]
// exit 1 se houver divergência (fora as by-design).
// ─────────────────────────────────────────────────────────────
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const css = readFileSync(join(here, '..', '..', 'tokens.css'), 'utf8')
const fig = JSON.parse(readFileSync(join(here, 'figma-styles.json'), 'utf8'))
const asMd = process.argv.includes('--md')

const uniq = (a) => [...new Set(a)]
const matchAll = (re) => uniq([...css.matchAll(re)].map((m) => m[1]))
const leaves = (arr, prefix) => arr.filter((s) => s.startsWith(prefix)).map((s) => s.slice(prefix.length))

// ── Extrair CSS (por família) ──
const cssF = {
  shadow: matchAll(/--shadow-(?!glow)([a-z0-9]+)\s*:/g),
  glow: matchAll(/--shadow-glow-([a-z0-9]+)\s*:/g),
  blur: matchAll(/--blur-([a-z0-9]+)\s*:/g),
  radius: matchAll(/--radius-([a-z0-9]+)\s*:/g),
  spacing: matchAll(/--spacing-([a-z0-9-]+)\s*:/g),
  gradient: matchAll(/--gradient-([a-z0-9]+)\s*:/g),
  textSize: matchAll(/--text-([a-z0-9]+)\s*:/g),
  weight: matchAll(/--font-weight-([a-z0-9]+)\s*:/g),
}

// ── Extrair Figma (por família) ──
const figF = {
  shadow: leaves(fig.effectStyles, 'nacional.bet/shadow/'),
  glow: leaves(fig.effectStyles, 'nacional.bet/glow/'),
  blur: leaves(fig.effectStyles, 'nacional.bet/blur/'),
  radius: fig.radiusVars.map((v) => v.replace(/^radius-/, '')),
  spacing: fig.spacingVars.map((v) => v.replace(/^space-/, '')),
  gradient: leaves(fig.paintStyles, 'gradient/'),
  textSize: fig.fontSizeVars.map((v) => v.replace(/^font-size-/, '')),
  weight: fig.textStyleWeights,
}

// ── By-design (não é divergência): documentar a decisão ──
const IGNORE = {
  // half-steps existem só no CSS p/ compat Tailwind; removidos do Figma de propósito (grade-4)
  spacing: { cssOnly: ['0-5', '1-5', '2-5', '3-5'], figmaOnly: [] },
  // radius-default (6px) = alias do md no Figma; CSS usa md.
  radius: { cssOnly: [], figmaOnly: ['default'] },
  // 7xl–9xl vêm do default do Tailwind v4 (não redefinidos no tokens.css, mas existem no CSS compilado).
  textSize: { cssOnly: [], figmaOnly: ['7xl', '8xl', '9xl'] },
}

const FAMILIES = [
  { key: 'shadow', label: 'Sombra (effect)' },
  { key: 'glow', label: 'Glow (effect)' },
  { key: 'blur', label: 'Blur (effect)' },
  { key: 'radius', label: 'Radius' },
  { key: 'spacing', label: 'Spacing' },
  { key: 'gradient', label: 'Gradient' },
  { key: 'textSize', label: 'Tamanho de fonte' },
  { key: 'weight', label: 'Peso de fonte' },
]

const findings = []
for (const { key, label } of FAMILIES) {
  const ign = IGNORE[key] || { cssOnly: [], figmaOnly: [] }
  const inCssNotFigma = cssF[key].filter((x) => !figF[key].includes(x) && !ign.cssOnly.includes(x))
  const inFigmaNotCss = figF[key].filter((x) => !cssF[key].includes(x) && !ign.figmaOnly.includes(x))
  const ignored = [...ign.cssOnly, ...ign.figmaOnly].filter((x) => cssF[key].includes(x) || figF[key].includes(x))
  if (inCssNotFigma.length) findings.push({ sev: 'MED', fam: label, dir: 'CSS→Figma', msg: `no CSS mas falta no Figma: ${inCssNotFigma.map((x) => `'${x}'`).join(', ')}` })
  if (inFigmaNotCss.length) findings.push({ sev: 'MED', fam: label, dir: 'Figma→CSS', msg: `no Figma mas falta no CSS: ${inFigmaNotCss.map((x) => `'${x}'`).join(', ')}` })
  if (ignored.length) findings.push({ sev: 'LOW', fam: label, dir: 'by-design', msg: `ignorado (decisão DS): ${ignored.map((x) => `'${x}'`).join(', ')}` })
}

const order = { MED: 0, LOW: 1 }
findings.sort((a, b) => order[a.sev] - order[b.sev] || a.fam.localeCompare(b.fam))
const counts = findings.reduce((m, f) => ((m[f.sev] = (m[f.sev] || 0) + 1), m), {})
const icon = { MED: '🟡', LOW: '🔵' }

if (asMd) {
  const out = ['# Paridade de Foundations — tokens.css ↔ Figma', '', `Gerado de \`tokens.css\` (vivo) × \`figma-styles.json\` (${fig.generatedAt}).`, '', `**Resumo:** 🟡 ${counts.MED || 0} divergências · 🔵 ${counts.LOW || 0} by-design`, '', '| Sev | Família | Direção | Achado |', '|-----|---------|---------|--------|']
  for (const f of findings) out.push(`| ${icon[f.sev]} | ${f.fam} | ${f.dir} | ${f.msg.replace(/\|/g, '\\|')} |`)
  process.stdout.write(out.join('\n') + '\n')
} else {
  console.log('\n  PARIDADE DE FOUNDATIONS — tokens.css ↔ Figma\n  ' + '─'.repeat(52))
  console.log(`  🟡 ${counts.MED || 0} divergências   🔵 ${counts.LOW || 0} by-design\n`)
  for (const f of findings) console.log(`  ${icon[f.sev]} ${f.fam.padEnd(20)} ${f.dir.padEnd(11)} ${f.msg}`)
  if (!(counts.MED)) console.log('  ✅ Sem divergências reais.')
  console.log('')
}
process.exit((counts.MED || 0) > 0 ? 1 : 0)
