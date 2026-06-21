import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Progress" do DS (página 📊 Progress).
// Variant properties do Figma: color (7) × size (sm/md/lg). value/max/status são runtime.
const meta: Meta = {
  title: 'Components/Progress',
  parameters: {
    docs: {
      description: {
        component:
          'Barra de progresso (`UProgress` do @nuxt/ui). Use para limites de depósito/aposta, barra de tempo de jogo ao vivo, upload de KYC, etapas de cadastro. `value`/`max` definem o preenchimento; sem `value` fica indeterminada (animada). `color` e `size` (espessura).',
      },
    },
  },
  argTypes: {
    modelValue: { control: { type: 'range', min: 0, max: 100 }, description: 'Valor (0–100).' },
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'], description: 'Cor.' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Espessura.' },
  },
  args: { modelValue: 60, color: 'primary', size: 'md' },
  render: (args) => ({ setup: () => ({ args }), template: '<div style="width:280px"><UProgress v-bind="args" /></div>' }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => ({
    setup: () => ({ list: ['sm', 'md', 'lg'] }),
    template: `<div class="flex flex-col gap-5" style="width:280px"><UProgress v-for="s in list" :key="s" :size="s" :model-value="60" color="primary" /></div>`,
  }),
}

export const Colors: Story = {
  render: () => ({
    setup: () => ({ list: ['primary', 'success', 'warning', 'error'] }),
    template: `<div class="flex flex-col gap-5" style="width:280px"><UProgress v-for="c in list" :key="c" :color="c" :model-value="60" /></div>`,
  }),
}

export const Indeterminate: Story = {
  render: () => ({ template: `<div style="width:280px"><UProgress color="primary" /></div>` }),
}

// Uso real: limite de depósito
export const DepositLimit: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-2" style="width:280px">
      <div class="flex justify-between text-sm"><span class="text-muted">Limite diário</span><span class="text-highlighted font-medium">R$ 600 / 1.000</span></div>
      <UProgress :model-value="60" color="warning" />
    </div>`,
  }),
}
