import type { Meta, StoryObj } from '@storybook/vue3'

// Composite/pattern do DS (página 🎠 SectionHeader no Figma).
// NÃO é um componente único do @nuxt/ui — é uma composição: USeparator (a linha,
// com `position`) + um cluster de UButton (setas ‹ › + "Ver todos") no slot.
// No Figma o cluster usa instance-swap (trocar seta/botão pelo painel); aqui é composição.
const meta: Meta = {
  title: 'Patterns/SectionHeader',
  parameters: {
    docs: {
      description: {
        component:
          'Cabeçalho de seção / carrossel: uma linha (`USeparator`) com um cluster `‹ Ver todos ›` (setas de navegação + ação) posicionável via `position` (start/center/end). Use no topo de carrosséis de jogos/mercados. É um **pattern** (composição de `USeparator` + `UButton`), não um componente único — no Figma vive como o composite `SectionHeader` com setas/botão trocáveis por instance-swap.',
      },
    },
  },
}
export default meta
type Story = StoryObj

const cluster = `<div class="flex items-center gap-1">
  <UButton icon="i-lucide-chevron-left" color="neutral" variant="ghost" size="sm" :square="true" />
  <UButton variant="link" color="primary" size="sm" label="Ver todos" />
  <UButton icon="i-lucide-chevron-right" color="neutral" variant="ghost" size="sm" :square="true" />
</div>`

export const Positions: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-8" style="width:480px">
      <USeparator position="start">${cluster}</USeparator>
      <USeparator position="center">${cluster}</USeparator>
      <USeparator position="end">${cluster}</USeparator>
    </div>`,
  }),
}

// Só "Ver todos" (sem setas) — quando o carrossel não precisa navegar
export const SeeAllOnly: Story = {
  render: () => ({
    template: `<div style="width:480px">
      <USeparator position="end">
        <UButton variant="link" color="primary" size="sm" label="Ver todos" trailing-icon="i-lucide-arrow-right" />
      </USeparator>
    </div>`,
  }),
}

// Uso real: topo de um carrossel de jogos
export const CarouselHeader: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-4" style="width:520px">
      <div class="flex items-center justify-between">
        <span class="text-highlighted font-semibold">Em destaque</span>
      </div>
      <USeparator position="end">${cluster}</USeparator>
      <div class="flex gap-3">
        <UCard variant="subtle" class="flex-1"><span class="text-muted text-sm">Jogo 1</span></UCard>
        <UCard variant="subtle" class="flex-1"><span class="text-muted text-sm">Jogo 2</span></UCard>
        <UCard variant="subtle" class="flex-1"><span class="text-muted text-sm">Jogo 3</span></UCard>
      </div>
    </div>`,
  }),
}
