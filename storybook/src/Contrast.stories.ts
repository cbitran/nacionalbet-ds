import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, onMounted } from 'vue'

// Foundations/Contrast — auditoria WCAG VIVA.
// Lê os tokens CSS já resolvidos (getComputedStyle) e calcula a razão de
// contraste em runtime → é white-label aware: se a marca trocar os tokens
// (ex.: outra paleta no :root), os números recalculam sozinhos.
// Limiares WCAG 2.1: AA normal 4.5 · AA grande 3.0 · AAA normal 7.0.

const meta: Meta = {
  title: 'Foundations/Contrast',
  parameters: {
    docs: {
      description: {
        component:
          'Auditoria de contraste **WCAG** calculada ao vivo a partir dos tokens resolvidos (`getComputedStyle`). Como lê os valores efetivos, é **white-label aware**: se outra marca sobrescrever os tokens de cor, a matriz recalcula. Limiares: **AA** 4.5:1 (texto normal), **AA Large** 3:1 (≥18.66px ou ≥14px bold), **AAA** 7:1. Use para prever problemas antes do handoff.',
      },
    },
  },
}
export default meta
type Story = StoryObj

// ── Pares a auditar ───────────────────────────────────────────
const TEXTS = [
  { name: 'text', v: '--ui-text' },
  { name: 'text-highlighted', v: '--ui-text-highlighted' },
  { name: 'text-muted', v: '--ui-text-muted' },
  { name: 'text-toned', v: '--ui-text-toned' },
  { name: 'text-dimmed', v: '--ui-text-dimmed' },
  { name: 'primary', v: '--ui-primary' },
]
const SURFACES = [
  { name: 'bg', v: '--ui-bg' },
  { name: 'bg-muted', v: '--ui-bg-muted' },
  { name: 'bg-elevated', v: '--ui-bg-elevated' },
  { name: 'bg-accented', v: '--ui-bg-accented' },
]
// Pares semânticos (cor "sobre" superfície específica)
const PAIRS = [
  { label: 'white sobre primary', fg: '--ui-text', bg: '--ui-primary' },
  { label: 'primary sobre bg', fg: '--ui-primary', bg: '--ui-bg' },
  { label: 'white sobre success', fg: '--color-white', bg: '--ui-success' },
  { label: 'navy sobre warning', fg: '--color-navy-950', bg: '--ui-warning' },
  { label: 'white sobre error', fg: '--color-white', bg: '--ui-error' },
  { label: 'white sobre info', fg: '--color-white', bg: '--ui-info' },
]

// ── Resolução + cálculo WCAG ──────────────────────────────────
function resolve(varName: string): [number, number, number] {
  const el = document.createElement('span')
  el.style.color = `var(${varName})`
  el.style.display = 'none'
  document.body.appendChild(el)
  const c = getComputedStyle(el).color // "rgb(r, g, b)" ou "rgba(...)"
  el.remove()
  const m = c.match(/\d+(\.\d+)?/g) || ['0', '0', '0']
  return [Number(m[0]), Number(m[1]), Number(m[2])]
}
function lum([r, g, b]: number[]): number {
  const f = (c: number) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
function ratio(fg: string, bg: string): number {
  const L1 = lum(resolve(fg)), L2 = lum(resolve(bg))
  const hi = Math.max(L1, L2), lo = Math.min(L1, L2)
  return (hi + 0.05) / (lo + 0.05)
}
function rate(r: number) {
  return { aa: r >= 4.5, aaL: r >= 3, aaa: r >= 7 }
}

// ── Matriz texto × superfície ─────────────────────────────────
const MatrixCmp = {
  setup() {
    const rows = ref<any[]>([])
    onMounted(() => {
      rows.value = TEXTS.map(t => ({
        name: t.name,
        cells: SURFACES.map(s => {
          const r = ratio(t.v, s.v)
          return { surface: s.name, bgVar: s.v, fgVar: t.v, r: r.toFixed(2), ...rate(r) }
        }),
      }))
    })
    return { rows, surfaces: SURFACES }
  },
  template: `<div style="overflow:auto">
    <table style="border-collapse:separate;border-spacing:8px;min-width:680px">
      <thead><tr>
        <th style="text-align:left;color:var(--ui-text-dimmed);font-size:12px;font-weight:500"></th>
        <th v-for="s in surfaces" :key="s.name" style="text-align:left;color:var(--ui-text-muted);font-size:12px;font-weight:600">{{ s.name }}</th>
      </tr></thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td style="color:var(--ui-text);font-size:13px;font-weight:600;white-space:nowrap">{{ row.name }}</td>
          <td v-for="c in row.cells" :key="c.surface">
            <div :style="{ background:'var('+c.bgVar+')', color:'var('+c.fgVar+')', padding:'10px 12px', borderRadius:'8px', border:'1px solid var(--ui-border)', minWidth:'92px' }">
              <div style="font-size:15px;font-weight:600;line-height:1">Aa</div>
              <div style="font-size:16px;font-weight:700;margin-top:6px">{{ c.r }}</div>
              <div style="display:flex;gap:4px;margin-top:6px;font-size:9px;font-weight:700">
                <span :style="badge(c.aa)">AA</span>
                <span :style="badge(c.aaL)">AA-L</span>
                <span :style="badge(c.aaa)">AAA</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  methods: {
    badge(ok: boolean) {
      return {
        padding: '1px 5px', borderRadius: '4px',
        background: ok ? 'rgba(34,197,94,0.20)' : 'rgba(239,68,68,0.20)',
        color: ok ? '#4ADE80' : '#F87171',
      }
    },
  },
}

export const TextOnSurfaces: Story = {
  render: () => ({
    components: { MatrixCmp },
    template: `<div class="flex flex-col gap-4">
      <div class="text-sm" style="color:var(--ui-text-muted);max-width:620px">
        Cada célula = razão de contraste do texto sobre a superfície (calculada ao vivo dos tokens).
        <strong>AA</strong> 4.5 · <strong>AA-L</strong> 3.0 (texto grande) · <strong>AAA</strong> 7.0.
      </div>
      <MatrixCmp />
    </div>`,
  }),
}

// ── Pares semânticos ──────────────────────────────────────────
const PairsCmp = {
  setup() {
    const rows = ref<any[]>([])
    onMounted(() => {
      rows.value = PAIRS.map(p => {
        const r = ratio(p.fg, p.bg)
        return { ...p, r: r.toFixed(2), ...rate(r) }
      })
    })
    return { rows }
  },
  template: `<div class="flex flex-col gap-3" style="max-width:560px">
    <div v-for="p in rows" :key="p.label"
         :style="{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', background:'var('+p.bg+')', color:'var('+p.fg+')', padding:'12px 16px', borderRadius:'8px', border:'1px solid var(--ui-border)' }">
      <span style="font-size:14px;font-weight:600">{{ p.label }}</span>
      <span style="display:flex;align-items:center;gap:8px">
        <strong style="font-size:16px">{{ p.r }}</strong>
        <span :style="badge(p.aa)">AA</span>
        <span :style="badge(p.aaL)">AA-L</span>
        <span :style="badge(p.aaa)">AAA</span>
      </span>
    </div>
  </div>`,
  methods: {
    badge(ok: boolean) {
      return {
        padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700,
        background: ok ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)',
        color: ok ? '#4ADE80' : '#F87171',
      }
    },
  },
}

export const SemanticPairs: Story = {
  render: () => ({
    components: { PairsCmp },
    template: `<div class="flex flex-col gap-4">
      <div class="text-sm" style="color:var(--ui-text-muted)">Pares mais usados (texto sobre cor de marca/estado).</div>
      <PairsCmp />
    </div>`,
  }),
}
