import type { Meta, StoryObj } from '@storybook/vue3'

const items = [
  { label: 'What is nacional.bet?', content: 'A sports betting platform. This is the accordion body content.' },
  { label: 'How do I place a bet?', content: 'Pick a market, set your stake and confirm in the bet slip.' },
  { label: 'Payment methods', content: 'Pix, credit card and more.' },
]

// Espelho do UAccordion do @nuxt/ui v4. argTypes = props reais (type/collapsible/disabled/…).
const meta: Meta = {
  title: 'Components/Accordion',
  parameters: {
    docs: { description: { component: 'Seções expansíveis (FAQ, detalhes de aposta). Espelha o `UAccordion` do @nuxt/ui v4. `items` = `{ label, content }[]`.' } },
  },
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'], description: 'Abrir um ou vários itens ao mesmo tempo' },
    collapsible: { control: 'boolean', description: 'Permite fechar o item aberto (modo single)' },
    disabled: { control: 'boolean' },
    trailingIcon: { control: 'text', description: 'Ícone indicador (padrão chevron-down)' },
    unmountOnHide: { control: 'boolean', description: 'Desmonta o conteúdo ao fechar' },
  },
  args: { type: 'single', collapsible: true, disabled: false },
  render: (args) => ({ setup: () => ({ args, items }), template: '<UAccordion v-bind="args" :items="items" class="w-96" />' }),
}
export default meta
type Story = StoryObj

export const Default: Story = {}

export const Multiple: Story = { args: { type: 'multiple' } }
