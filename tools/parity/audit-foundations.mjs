#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// Harness de PARIDADE de FOUNDATIONS — tokens.css ↔ Figma (bidirecional).
// Diretriz do DS: tudo no CSS tem de estar no Figma e vice-versa.
//
// REGISTRO EXAUSTIVO: toda família de token é listada aqui com um status —
//   'check'     → diff CSS↔Figma
//   'code-only' → existe só no CSS por design (Figma não tem primitivo)
//   'manual'    → coberto, mas o diff automático não se aplica (nomes divergem)
// Assim nada fica fora silenciosamente conforme o DS cresce.
//
// Lê tokens.css AO VIVO + figma-styles.json (snapshot). Uso: [--md]. exit 1 se divergência real.
// ─────────────────────────────────────────────────────────────
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const css = readFileSync(join(here, '..', '..', 'tokens.css'), 'utf8')
const fig = JSON.parse(readFileSync(join(here, 'figma-styles.json'), 'utf8'))
const asMd = process.argv.includes('--md')

const uniq = (a) => [...new Set(a)]
const cssLeaves = (re) => uniq([...css.matchAll(re)].map((m) => m[1]))
const strip = (arr, p) => arr.filter((s) => s.startsWith(p)).map((s) => s.slice(p.length))

// ── REGISTRO DE FAMÍLIAS ──
const REGISTRY = [
  { key: 'shadow', label: 'Sombra (effect)', status: 'check',
    css: () => cssLeaves(/--shadow-(?!glow)([a-z0-9]+)\s*:/g), figma: () => strip(fig.effectStyles, 'nacional.bet/shadow/') },
  { key: 'glow', label: 'Glow (effect)', status: 'check',
    css: () => cssLeaves(/--shadow-glow-([a-z0-9]+)\s*:/g), figma: () => strip(fig.effectStyles, 'nacional.bet/glow/') },
  { key: 'blur', label: 'Blur (effect)', status: 'check',
    css: () => cssLeaves(/--blur-([a-z0-9]+)\s*:/g), figma: () => strip(fig.effectStyles, 'nacional.bet/blur/') },
  { key: 'radius', label: 'Radius', status: 'check',
    css: () => cssLeaves(/--radius-([a-z0-9]+)\s*:/g), figma: () => fig.radiusVars.map((v) => v.replace(/^radius-/, '')),
    ignore: { figmaOnly: ['default'] } },
  { key: 'spacing', label: 'Spacing', status: 'check',
    css: () => cssLeaves(/--spacing-([a-z0-9-]+)\s*:/g), figma: () => fig.spacingVars.map((v) => v.replace(/^space-/, '')),
    ignore: { cssOnly: ['0-5', '1-5', '2-5', '3-5'] } },
  { key: 'breakpoint', label: 'Breakpoint / Grid', status: 'check',
    css: () => cssLeaves(/--breakpoint-([a-z0-9]+)\s*:/g), figma: () => uniq(fig.gridStyles.map((g) => (g.match(/Grid\/([a-z0-9]+)/) || [])[1]).filter(Boolean)) },
  { key: 'gradient', label: 'Gradient', status: 'check',
    css: () => cssLeaves(/--gradient-([a-z0-9]+)\s*:/g), figma: () => strip(fig.paintStyles, 'gradient/') },
  { key: 'textSize', label: 'Tamanho de fonte', status: 'check',
    css: () => cssLeaves(/--text-([a-z0-9]+)\s*:/g), figma: () => fig.fontSizeVars.map((v) => v.replace(/^font-size-/, '')),
    ignore: { figmaOnly: ['7xl', '8xl', '9xl'] } }, // 7xl–9xl = default do Tailwind
  { key: 'leading', label: 'Entrelinha (leading)', status: 'check',
    css: () => cssLeaves(/--leading-([a-z0-9]+)\s*:/g), figma: () => strip(fig.leadingVars, 'font-leading-') },
  { key: 'weight', label: 'Peso de fonte', status: 'check',
    css: () => cssLeaves(/--font-weight-([a-z0-9]+)\s*:/g), figma: () => fig.textStyleWeights },
  { key: 'colorPalette', label: 'Paleta de cor', status: 'check',
    css: () => cssLeaves(/--color-([a-z]+)-\d/g), figma: () => strip(fig.colorPaletteVars, 'palette/'),
    ignore: { figmaOnly: ['blue', 'orange'] } }, // blue/orange = default Tailwind + brand white-label alt
  // ── Documentados (não diff) ──
  { key: 'semanticColor', label: 'Cor semântica (--ui-*)', status: 'manual', note: 'coberto por Paint Styles + Colors vars; nomes divergem (--ui-primary ↔ color/primary) → conferência visual' },
  { key: 'container', label: 'Container', status: 'manual', note: '--ui-container (1440) ↔ container-default / Grid 2xl' },
  { key: 'tracking', label: 'Letter-spacing', status: 'code-only', note: 'Figma só aplica por text-style, não como token compartilhado' },
  { key: 'motion', label: 'Motion (duration/ease)', status: 'code-only', note: 'Figma não tem primitivo de motion (variável/estilo)' },
]

const findings = []
for (const fam of REGISTRY) {
  if (fam.status !== 'check') { findings.push({ sev: 'DOC', fam: fam.label, dir: fam.status, msg: fam.note }); continue }
  const ign = fam.ignore || { cssOnly: [], figmaOnly: [] }
  const c = fam.css(), f = fam.figma()
  const cNotF = c.filter((x) => !f.includes(x) && !(ign.cssOnly || []).includes(x))
  const fNotC = f.filter((x) => !c.includes(x) && !(ign.figmaOnly || []).includes(x))
  const ignored = [...(ign.cssOnly || []), ...(ign.figmaOnly || [])].filter((x) => c.includes(x) || f.includes(x))
  if (cNotF.length) findings.push({ sev: 'MED', fam: fam.label, dir: 'CSS→Figma', msg: `no CSS mas falta no Figma: ${cNotF.map((x) => `'${x}'`).join(', ')}` })
  if (fNotC.length) findings.push({ sev: 'MED', fam: fam.label, dir: 'Figma→CSS', msg: `no Figma mas falta no CSS: ${fNotC.map((x) => `'${x}'`).join(', ')}` })
  if (ignored.length) findings.push({ sev: 'LOW', fam: fam.label, dir: 'by-design', msg: `ignorado: ${ignored.map((x) => `'${x}'`).join(', ')}` })
}

const order = { MED: 0, LOW: 1, DOC: 2 }
findings.sort((a, b) => order[a.sev] - order[b.sev] || a.fam.localeCompare(b.fam))
const counts = findings.reduce((m, f) => ((m[f.sev] = (m[f.sev] || 0) + 1), m), {})
const icon = { MED: '🟡', LOW: '🔵', DOC: '⚪' }
const checked = REGISTRY.filter((f) => f.status === 'check').length

if (asMd) {
  const out = ['# Paridade de Foundations — tokens.css ↔ Figma', '', `Gerado de \`tokens.css\` (vivo) × \`figma-styles.json\` (${fig.generatedAt}). ${checked} famílias checadas + ${REGISTRY.length - checked} documentadas.`, '', `**Resumo:** 🟡 ${counts.MED || 0} divergências · 🔵 ${counts.LOW || 0} by-design · ⚪ ${counts.DOC || 0} documentadas`, '', '| Sev | Família | Tipo | Detalhe |', '|-----|---------|------|---------|']
  for (const f of findings) out.push(`| ${icon[f.sev]} | ${f.fam} | ${f.dir} | ${(f.msg || '').replace(/\|/g, '\\|')} |`)
  process.stdout.write(out.join('\n') + '\n')
} else {
  console.log('\n  PARIDADE DE FOUNDATIONS — tokens.css ↔ Figma\n  ' + '─'.repeat(54))
  console.log(`  ${checked} famílias checadas · 🟡 ${counts.MED || 0} divergências · 🔵 ${counts.LOW || 0} by-design · ⚪ ${counts.DOC || 0} doc\n`)
  for (const f of findings) console.log(`  ${icon[f.sev]} ${f.fam.padEnd(24)} ${f.dir.padEnd(11)} ${f.msg || ''}`)
  if (!counts.MED) console.log('\n  ✅ Sem divergências reais.')
  console.log('')
}
process.exit((counts.MED || 0) > 0 ? 1 : 0)
