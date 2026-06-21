import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Card" do DS (página 🃏 Card).
// Variant property do Figma: variant (outline/soft/subtle/solid). Sem size (single-size).
// Anatomia: slots header / default (body) / footer, com divisórias entre seções (exceto solid).
const meta: Meta = {
  title: 'Components/Card',
  parameters: {
    docs: {
      description: {
        component:
          'Container de conteúdo (`UCard` do @nuxt/ui) com header, body e footer. Base de cards de jogo/evento, blocos de conta e painéis. `variant`: **outline** (borda + divisórias, padrão), **soft** (superfície elevada), **subtle** (elevado + borda), **solid** (invertido/claro). Use os slots `#header`, default (corpo) e `#footer`; `title`/`description` são atalhos para o header.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['outline', 'soft', 'subtle', 'solid'],
      description: 'Estilo da superfície.',
    },
    title: { control: 'text', description: 'Título (atalho do header).' },
    description: { control: 'text', description: 'Descrição (atalho do header).' },
  },
  args: { variant: 'outline', title: 'Flamengo x Palmeiras', description: 'Brasileirão · Série A · Hoje 21:30' },
  render: (args) => ({
    setup: () => ({ args }),
    template: `<div style="width:340px">
      <UCard v-bind="args">
        <p class="text-muted text-sm">Mercado: Resultado final (1X2). Odds atualizadas em tempo real.</p>
        <template #footer><span class="text-highlighted text-sm font-medium">Ver mercados</span></template>
      </UCard>
    </div>`,
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Variants: Story = {
  render: () => ({
    setup: () => ({ list: ['outline', 'soft', 'subtle', 'solid'] }),
    template: `<div class="flex flex-wrap gap-4">
      <div v-for="v in list" :key="v" style="width:280px">
        <UCard :variant="v" :title="v" description="Brasileirão · Hoje 21:30">
          <p class="text-muted text-sm">Resultado final (1X2).</p>
          <template #footer><span class="text-sm font-medium">Ver mercados</span></template>
        </UCard>
      </div>
    </div>`,
  }),
}

// Card de jogo (uso real na plataforma)
export const GameCard: Story = {
  render: () => ({
    template: `<div style="width:340px">
      <UCard variant="subtle">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-muted text-xs uppercase tracking-wide">Brasileirão · 21:30</span>
            <UBadge color="error" variant="soft" size="sm">AO VIVO</UBadge>
          </div>
        </template>
        <div class="flex items-center justify-between">
          <span class="text-highlighted font-semibold">Flamengo</span>
          <span class="text-muted text-sm">x</span>
          <span class="text-highlighted font-semibold">Palmeiras</span>
        </div>
        <template #footer>
          <div class="flex gap-2">
            <UButton block color="neutral" variant="soft" size="sm" label="1.85" />
            <UButton block color="neutral" variant="soft" size="sm" label="3.20" />
            <UButton block color="neutral" variant="soft" size="sm" label="4.10" />
          </div>
        </template>
      </UCard>
    </div>`,
  }),
}

// Atalho title/description (sem slots)
export const TitleDescription: Story = {
  args: { variant: 'soft', title: 'Saldo disponível', description: 'R$ 1.250,00' },
  render: (args) => ({ setup: () => ({ args }), template: '<div style="width:300px"><UCard v-bind="args" /></div>' }),
}
