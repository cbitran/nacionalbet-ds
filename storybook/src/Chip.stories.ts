import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Chip" do DS (página 🔵 Chip).
// Variant property do Figma: color (7). Boolean Texto (contador) + text Número.
// Chip NÃO é tag (tag = Badge): é o indicador de canto (ponto/contador) sobreposto
// a outro elemento (avatar, botão, ícone). `position` posiciona no canto; `text` = contador.
const meta: Meta = {
  title: 'Components/Chip',
  parameters: {
    docs: {
      description: {
        component:
          'Indicador de canto (`UChip` do @nuxt/ui): um ponto de status ou contador sobreposto a outro elemento. **Não confundir com Badge** (a pílula com texto). Use para notificações (contador no sino), status online (ponto no avatar) ou nº de seleções no bet slip. Envolve o elemento no slot e mostra o indicador via `position` (top-right…); `text` exibe um número; sem `text` é um ponto.',
      },
    },
  },
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'], description: 'Cor do indicador.' },
    text: { control: 'text', description: 'Número/conteúdo (vazio = ponto).' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'], description: 'Tamanho do indicador.' },
    position: { control: 'inline-radio', options: ['top-right', 'bottom-right', 'top-left', 'bottom-left'], description: 'Canto.' },
    inset: { control: 'boolean', description: 'Mantém dentro p/ elementos arredondados.' },
  },
  args: { color: 'error', position: 'top-right' },
  render: (args) => ({
    setup: () => ({ args }),
    template: `<UChip v-bind="args"><UButton icon="i-lucide-bell" color="neutral" variant="subtle" /></UChip>`,
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

// Ponto (status) vs contador
export const DotVsCount: Story = {
  render: () => ({
    template: `<div class="flex items-center gap-8">
      <UChip color="success"><UButton icon="i-lucide-user" color="neutral" variant="subtle" /></UChip>
      <UChip color="error" text="3"><UButton icon="i-lucide-bell" color="neutral" variant="subtle" /></UChip>
      <UChip color="primary" text="9+"><UButton icon="i-lucide-shopping-cart" color="neutral" variant="subtle" /></UChip>
    </div>`,
  }),
}

export const Colors: Story = {
  render: () => ({
    setup: () => ({ list: ['primary', 'success', 'warning', 'error', 'neutral'] }),
    template: `<div class="flex items-center gap-8">
      <UChip v-for="c in list" :key="c" :color="c" text="5"><UButton icon="i-lucide-square" color="neutral" variant="subtle" /></UChip>
    </div>`,
  }),
}

// Uso real: contador de seleções no bet slip
export const BetSlipCount: Story = {
  render: () => ({
    template: `<UChip color="primary" text="2" size="2xl">
      <UButton color="primary" label="Bet Slip" icon="i-lucide-ticket" />
    </UChip>`,
  }),
}
