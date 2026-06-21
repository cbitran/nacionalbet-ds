import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Tabs" do DS (página 🗂️ Tabs).
// Variant property do Figma: variant (pill/link). color/size via prop.
const meta: Meta = {
  title: 'Components/Tabs',
  parameters: {
    docs: {
      description: {
        component:
          'Abas (`UTabs` do @nuxt/ui): alterna entre seções. Use para Esportes/Ao vivo/Cassino, abas da conta, mercados de um jogo. `variant` **pill** (fundo elevado na ativa) ou **link** (sublinhado); `items` define as abas `{ label, icon, content }`.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['pill', 'link'], description: 'Estilo das abas.' },
    color: { control: 'select', options: ['primary', 'neutral'], description: 'Cor do indicador.' },
  },
  args: { variant: 'pill', color: 'primary' },
  render: (args) => ({
    setup: () => ({ args, items: [{ label: 'Esportes', icon: 'i-lucide-trophy' }, { label: 'Ao vivo', icon: 'i-lucide-radio' }, { label: 'Cassino', icon: 'i-lucide-dices' }] }),
    template: '<div style="width:480px"><UTabs v-bind="args" :items="items" /></div>',
  }),
}
export default meta
type Story = StoryObj

export const Pill: Story = {}
export const Link: Story = { args: { variant: 'link' } }

export const WithContent: Story = {
  render: () => ({
    setup: () => ({ items: [
      { label: 'Detalhes', content: 'Informações do jogo, escalações e estatísticas.' },
      { label: 'Mercados', content: '1X2, Ambas marcam, Total de gols…' },
      { label: 'Ao vivo', content: 'Placar e eventos em tempo real.' },
    ] }),
    template: `<div style="width:480px"><UTabs :items="items">
      <template #content="{ item }"><p class="text-muted text-sm p-4">{{ item.content }}</p></template>
    </UTabs></div>`,
  }),
}
