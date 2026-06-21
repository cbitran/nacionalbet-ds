import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

// Espelho do que será o Component Set "InputNumber" do DS (a confirmar no Figma).
// Casca de campo igual ao Input (variant/size/color) + steppers +/− (UButton internos).
// `orientation`: horizontal (botões nas laterais) | vertical (chevrons empilhados à direita).
// Uso no produto: valores de aposta / depósito (min/max/step controlam a faixa).
const meta: Meta = {
  title: 'Components/InputNumber',
  parameters: {
    docs: {
      description: {
        component:
          'Campo numérico com steppers (`UInputNumber` do @nuxt/ui). Use para valores controlados — valor de aposta, depósito, quantidades — onde `min`/`max`/`step` definem a faixa válida. Compartilha a casca do Input (mesmos `variant`, `size`, `color` e estado de erro) e acrescenta botões de incremento/decremento.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'error', 'neutral'],
      description: 'Cor do anel/realce. `error` para estado inválido.',
    },
    variant: {
      control: 'select',
      options: ['outline', 'soft', 'subtle', 'ghost'],
      description: 'Estilo visual da borda/fundo.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho (padding e tipografia).',
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Posição dos steppers: laterais (horizontal) ou empilhados (vertical).',
    },
    min: { control: 'number', description: 'Valor mínimo permitido.' },
    max: { control: 'number', description: 'Valor máximo permitido.' },
    step: { control: 'number', description: 'Incremento de cada passo.' },
    placeholder: { control: 'text', description: 'Texto exibido quando vazio.' },
    highlight: { control: 'boolean', description: 'Força o realce do anel (como foco).' },
    disabled: { control: 'boolean', description: 'Desabilita o campo e os steppers.' },
  },
  args: { variant: 'outline', size: 'md', orientation: 'horizontal', min: 0, max: 100, step: 1 },
  render: (args) => ({
    components: {},
    setup: () => ({ args, val: ref(typeof args.modelValue === 'number' ? args.modelValue : 1) }),
    template: '<UInputNumber v-bind="args" v-model="val" />',
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['sm', 'md', 'lg'], val: ref(5) }),
    template: `<div class="flex flex-col gap-3" style="width:220px">
      <UInputNumber v-for="s in list" :key="s" v-bind="args" :size="s" v-model="val" />
    </div>`,
  }),
}

export const Orientation: Story = {
  render: (args) => ({
    setup: () => ({ args, a: ref(3), b: ref(3) }),
    template: `<div class="flex items-start gap-6">
      <UInputNumber v-bind="args" orientation="horizontal" v-model="a" />
      <UInputNumber v-bind="args" orientation="vertical" v-model="b" />
    </div>`,
  }),
}

export const States: Story = {
  render: () => ({
    setup: () => ({ a: ref(10), b: ref(10), c: ref(10) }),
    template: `<div class="flex flex-col gap-3" style="width:220px">
      <UInputNumber v-model="a" />
      <UInputNumber v-model="b" color="error" highlight />
      <UInputNumber v-model="c" disabled />
    </div>`,
  }),
}

// Faixa típica de aposta: mínimo 1, passo 5.
export const BetAmount: Story = {
  args: { min: 1, max: 1000, step: 5 },
  render: (args) => ({
    setup: () => ({ args, val: ref(10) }),
    template: '<div style="width:220px"><UInputNumber v-bind="args" v-model="val" /></div>',
  }),
}
