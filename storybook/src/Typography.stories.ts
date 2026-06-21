import type { Meta, StoryObj } from '@storybook/vue3'

// Foundations/Typography — escala tipográfica do DS (text styles do Figma, espelhados em
// tokens.css §5). Valores aplicados via style inline para documentar a escala PRETENDIDA do
// design de forma estável (classes text-* montadas em runtime não são detectadas pelo
// scanner do Tailwind).
// ⚠️ NOTA: no tokens.css a escala está no namespace `--font-size-*`, mas o Tailwind v4 usa
// `--text-*` — então hoje os COMPONENTES ainda renderizam com os tamanhos default do
// Tailwind, não com estes. Renomear o namespace no tokens.css alinha código ↔ Figma.
const SIZES = [
  { key: 'xs', size: 12, lh: 16 },
  { key: 'sm', size: 13, lh: 20 },
  { key: 'base', size: 15, lh: 24 },
  { key: 'md', size: 17, lh: 28 },
  { key: 'lg', size: 20, lh: 28 },
  { key: 'xl', size: 24, lh: 32 },
  { key: '2xl', size: 30, lh: 36 },
  { key: '3xl', size: 36, lh: 40 },
  { key: '4xl', size: 48, lh: 48 },
  { key: '5xl', size: 60, lh: 64 },
  { key: '6xl', size: 72, lh: 76 },
]
const WEIGHTS = [
  { key: 'regular', w: 400 },
  { key: 'medium', w: 500 },
  { key: 'semibold', w: 600 },
  { key: 'bold', w: 700 },
  { key: 'extrabold', w: 800 },
]
const TRACKING = [
  { key: 'tight', em: '-0.02em' },
  { key: 'normal', em: '0em' },
  { key: 'wide', em: '0.04em' },
  { key: 'wider', em: '0.08em' },
  { key: 'caps', em: '0.12em' },
]
const SAMPLE = 'Aposte no nacional.bet'

const meta: Meta = { title: 'Foundations/Typography' }
export default meta
type Story = StoryObj

export const Scale: Story = {
  render: () => ({
    setup: () => ({ sizes: SIZES, SAMPLE }),
    template: `<div class="flex flex-col gap-4 w-full max-w-5xl">
      <div class="text-sm text-muted">text styles do DS (Figma) · Montserrat · tokens.css §5</div>
      <div v-for="s in sizes" :key="s.key" class="flex items-baseline gap-4 border-b border-default pb-3 overflow-hidden">
        <code class="text-xs text-muted w-36 shrink-0">text-{{ s.key }} · {{ s.size }}/{{ s.lh }}</code>
        <span class="truncate" :style="{ fontSize: s.size + 'px', lineHeight: s.lh + 'px' }">{{ SAMPLE }}</span>
      </div>
    </div>`,
  }),
}

export const Weights: Story = {
  render: () => ({
    setup: () => ({ weights: WEIGHTS, SAMPLE }),
    template: `<div class="flex flex-col gap-3 w-full max-w-3xl">
      <div class="text-sm text-muted">Pesos · Montserrat</div>
      <div v-for="wt in weights" :key="wt.key" class="flex items-baseline gap-4 border-b border-default pb-3">
        <code class="text-xs text-muted w-24 shrink-0">{{ wt.key }}</code>
        <span class="text-2xl" :style="{ fontWeight: wt.w }">{{ SAMPLE }}</span>
        <span class="text-xs text-muted ml-auto shrink-0">{{ wt.w }}</span>
      </div>
    </div>`,
  }),
}

export const Tracking: Story = {
  render: () => ({
    setup: () => ({ tracking: TRACKING, SAMPLE }),
    template: `<div class="flex flex-col gap-3 w-full max-w-3xl">
      <div class="text-sm text-muted">--tracking-* do DS (letter-spacing)</div>
      <div v-for="t in tracking" :key="t.key" class="flex items-baseline gap-4 border-b border-default pb-3">
        <code class="text-xs text-muted w-28 shrink-0">tracking-{{ t.key }}</code>
        <span class="text-xl" :style="{ letterSpacing: t.em }">{{ SAMPLE }}</span>
        <span class="text-xs text-muted ml-auto shrink-0">{{ t.em }}</span>
      </div>
    </div>`,
  }),
}
