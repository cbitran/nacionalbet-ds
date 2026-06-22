import type { Meta, StoryObj } from '@storybook/vue3'
import { onMounted, ref } from 'vue'

// Foundations/Spacing Semântico — camada gap/* e padding/* (tokens.css §4.1).
// Aliases dos primitivos --spacing-* (mesmos valores), com nomes por PROPÓSITO:
//   gap/*     → espaço ENTRE itens (flex/grid gap, gap de auto-layout)
//   padding/* → espaço INTERNO de um container/componente
// Diferenciação para o time aplicar com intenção (gap ≠ padding na hora de montar a tela),
// mantendo o ritmo: por baixo, tudo aponta para a mesma escala space-*.

const GAP = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
const PADDING = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl']

const meta: Meta = {
  title: 'Foundations/Spacing Semântico',
  parameters: {
    docs: {
      description: {
        component:
          'Camada semântica de espaçamento. Use **`gap/*`** para o espaço **entre** itens e **`padding/*`** para o espaço **interno**. Ambos são aliases da escala `space-*`/`--spacing-*` — mesmos valores, nomes distintos para aplicar com intenção.',
      },
    },
  },
}
export default meta
type Story = StoryObj

// ── Guia: quando usar cada um ──
export const QuandoUsar: Story = {
  name: 'Quando usar (gap × padding)',
  render: () => ({
    template: `<div class="flex flex-col gap-4 w-full max-w-3xl">
      <div class="grid grid-cols-2 gap-4">
        <div class="rounded-lg border border-default p-4 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <code class="text-sm font-semibold text-primary">gap/*</code>
            <span class="text-xs text-muted">espaço ENTRE itens</span>
          </div>
          <div class="flex" style="gap: var(--gap-md)">
            <div class="h-10 flex-1 rounded-md bg-primary/30 border border-primary"></div>
            <div class="h-10 flex-1 rounded-md bg-primary/30 border border-primary"></div>
            <div class="h-10 flex-1 rounded-md bg-primary/30 border border-primary"></div>
          </div>
          <p class="text-xs text-muted">flex/grid gap · gap de auto-layout · espaço entre cards, botões, linhas de lista.</p>
        </div>
        <div class="rounded-lg border border-default p-4 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <code class="text-sm font-semibold text-warning">padding/*</code>
            <span class="text-xs text-muted">espaço INTERNO</span>
          </div>
          <div class="rounded-md border border-dashed border-warning bg-warning/10" style="padding: var(--padding-md)">
            <div class="h-10 rounded-md bg-warning/30 border border-warning"></div>
          </div>
          <p class="text-xs text-muted">padding de container/componente · respiro interno de cards, inputs, badges.</p>
        </div>
      </div>
      <div class="rounded-lg border border-default p-4 text-xs text-muted leading-relaxed">
        <strong class="text-default">Por baixo é a mesma escala.</strong> <code>gap/md</code> e <code>padding/md</code> valem 16px (= <code>space-4</code>).
        Os nomes diferentes existem para você e o time aplicarem com intenção e enxergarem o propósito — não para os valores divergirem.
      </div>
    </div>`,
  }),
}

// ── Escala gap ──
export const Gap: Story = {
  render: () => ({
    setup() {
      const items = ref<{ key: string; value: string }[]>([])
      onMounted(() => {
        const cs = getComputedStyle(document.documentElement)
        items.value = GAP.map((k) => ({ key: k, value: cs.getPropertyValue(`--gap-${k}`).trim() }))
      })
      return { items }
    },
    template: `<div class="flex flex-col gap-2 w-full max-w-2xl">
      <div class="text-sm text-muted mb-2">--gap-* · espaço entre itens (alias de --spacing-*)</div>
      <div v-for="it in items" :key="it.key" class="flex items-center gap-3">
        <code class="text-xs text-muted w-24 shrink-0">gap/{{ it.key }}</code>
        <div class="flex items-center" :style="{ gap: 'var(--gap-' + it.key + ')' }">
          <div class="h-6 w-6 rounded-sm bg-primary"></div>
          <div class="h-6 w-6 rounded-sm bg-primary"></div>
        </div>
        <span class="text-xs text-muted">{{ it.value }}</span>
      </div>
    </div>`,
  }),
}

// ── Escala padding ──
export const Padding: Story = {
  render: () => ({
    setup() {
      const items = ref<{ key: string; value: string }[]>([])
      onMounted(() => {
        const cs = getComputedStyle(document.documentElement)
        items.value = PADDING.map((k) => ({ key: k, value: cs.getPropertyValue(`--padding-${k}`).trim() }))
      })
      return { items }
    },
    template: `<div class="flex flex-col gap-2 w-full max-w-2xl">
      <div class="text-sm text-muted mb-2">--padding-* · espaço interno (alias de --spacing-*)</div>
      <div v-for="it in items" :key="it.key" class="flex items-center gap-3">
        <code class="text-xs text-muted w-24 shrink-0">padding/{{ it.key }}</code>
        <div class="inline-block rounded-sm bg-warning/20 border border-dashed border-warning" :style="{ padding: 'var(--padding-' + it.key + ')' }">
          <div class="h-6 w-16 rounded-sm bg-warning"></div>
        </div>
        <span class="text-xs text-muted">{{ it.value }}</span>
      </div>
    </div>`,
  }),
}
