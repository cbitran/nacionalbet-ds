import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

// Espelho do Component Set "PinInput" do DS (página 🔢 PinInput).
// Variant properties do Figma: variant (outline/soft/subtle/ghost) × state (default/focus/error/disabled) × size (sm/md/lg).
// `state` não é prop do @nuxt/ui: focus/default não viram prop; error → color="error" (+highlight); disabled → disabled.
// length/mask/otp/separator são props de runtime (não viram variante no Figma).
const meta: Meta = {
  title: 'Components/PinInput',
  parameters: {
    docs: {
      description: {
        component:
          'Campo de PIN/OTP (`UPinInput` do @nuxt/ui): uma fileira de N caixas de um caractere. Use para verificação em 2 etapas (2FA), código de SMS/e-mail, PIN de saque. `length` define o nº de caixas, `mask` esconde (tipo senha), `otp` ativa o autofill de código no mobile, `separator` agrupa as caixas. Compartilha a casca do Input (mesmos `variant`, `size`, `color` e estado de erro).',
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
      description: 'Estilo visual das caixas.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho das caixas.',
    },
    length: { control: 'number', description: 'Número de caixas (dígitos do código).' },
    mask: { control: 'boolean', description: 'Esconde os dígitos (tipo senha).' },
    otp: { control: 'boolean', description: 'Autofill de código (OTP) no mobile.' },
    placeholder: { control: 'text', description: 'Caractere placeholder das caixas vazias.' },
    highlight: { control: 'boolean', description: 'Força o realce do anel (como foco).' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
  },
  args: { variant: 'outline', size: 'md', length: 4 },
  render: (args) => ({
    setup: () => ({ args, val: ref([]) }),
    template: '<UPinInput v-bind="args" v-model="val" />',
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['outline', 'soft', 'subtle', 'ghost'], val: ref(['2', '4', '7', '1']) }),
    template: `<div class="flex flex-col gap-3">
      <UPinInput v-for="v in list" :key="v" v-bind="args" :variant="v" :default-value="['2','4','7','1']" />
    </div>`,
  }),
}

export const Sizes: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['sm', 'md', 'lg'] }),
    template: `<div class="flex flex-col gap-3">
      <UPinInput v-for="s in list" :key="s" v-bind="args" :size="s" :default-value="['2','4','7','1']" />
    </div>`,
  }),
}

export const States: Story = {
  render: () => ({
    setup: () => ({ a: ref(['2','4','7','1']), b: ref(['2','4','7','1']), c: ref(['2','4','7','1']) }),
    template: `<div class="flex flex-col gap-3">
      <UPinInput v-model="a" />
      <UPinInput v-model="b" color="error" highlight />
      <UPinInput v-model="c" disabled />
    </div>`,
  }),
}

// PIN mascarado (saque / senha)
export const Masked: Story = { args: { mask: true, length: 4 }, render: (args) => ({
  setup: () => ({ args, val: ref(['2','4','7','1']) }),
  template: '<UPinInput v-bind="args" v-model="val" />',
}) }

// 6 dígitos com separador (código de SMS)
export const SixDigitsSeparator: Story = {
  render: () => ({
    setup: () => ({ val: ref([]) }),
    template: `<UPinInput v-model="val" :length="6" :separator="3" otp />`,
  }),
}
