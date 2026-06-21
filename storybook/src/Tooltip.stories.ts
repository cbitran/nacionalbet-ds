import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do componente "Tooltip" do DS (página 💬 Tooltip).
// No Figma: bolha + seta + atalho (booleans). No código abre no hover do trigger.
const meta: Meta = {
  title: 'Components/Tooltip',
  parameters: {
    docs: {
      description: {
        component:
          'Dica em hover (`UTooltip` do @nuxt/ui): bolha com texto sobre um elemento. Use para explicar ícones, mostrar info de odds, atalhos. `text` é o conteúdo, `kbds` mostra atalho de teclado, `arrow` liga a setinha. Abre ao passar o mouse no slot.',
      },
    },
  },
  argTypes: {
    text: { control: 'text', description: 'Texto da dica.' },
    arrow: { control: 'boolean', description: 'Mostra a seta.' },
  },
  args: { text: 'Odds em tempo real', arrow: true },
  render: (args) => ({
    setup: () => ({ args }),
    template: `<div class="p-10"><UTooltip v-bind="args"><UButton icon="i-lucide-info" color="neutral" variant="subtle" label="Passe o mouse" /></UTooltip></div>`,
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const WithShortcut: Story = {
  render: () => ({
    template: `<div class="p-10"><UTooltip text="Buscar jogos" :kbds="['meta','K']"><UButton icon="i-lucide-search" color="neutral" variant="subtle" /></UTooltip></div>`,
  }),
}

// Aberta (pra ver na doc sem hover)
export const Open: Story = {
  render: () => ({
    template: `<div class="p-16 flex justify-center"><UTooltip text="Odds em tempo real" :open="true" :arrow="true"><UButton icon="i-lucide-trending-up" color="primary" label="Odds" /></UTooltip></div>`,
  }),
}
