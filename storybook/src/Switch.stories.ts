import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

// Espelho do Component Set "Switch" do DS (página 🎚️ Switch).
// Variant properties do Figma: state (off/on) × size (sm/md/lg) + Label (texto).
// `state` não é prop do @nuxt/ui: on/off = v-model (modelValue); disabled → disabled.
// Escala de tamanho oficial do DS: sm/md/lg (xs/xl fora de escopo).
const meta: Meta = {
  title: 'Components/Switch',
  parameters: {
    docs: {
      description: {
        component:
          'Alterna entre dois estados (`USwitch` do @nuxt/ui). Use para preferências on/off — notificações, lembrar login, modo escuro, aceitar promoções. O estado é `v-model`; `label`/`description` rotulam ao lado; `loading` mostra spinner; `checked-icon`/`unchecked-icon` colocam ícones no thumb. Tamanhos do DS: sm/md/lg.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'neutral'],
      description: 'Cor quando ligado.',
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Tamanho (escala oficial do DS).' },
    label: { control: 'text', description: 'Rótulo ao lado do switch.' },
    description: { control: 'text', description: 'Texto auxiliar abaixo do rótulo.' },
    loading: { control: 'boolean', description: 'Mostra spinner (ação em andamento).' },
    disabled: { control: 'boolean', description: 'Desabilita o switch.' },
  },
  args: { color: 'primary', size: 'md', label: 'Receber notificações' },
  render: (args) => ({
    setup: () => ({ args, val: ref(true) }),
    template: '<USwitch v-bind="args" v-model="val" />',
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['sm', 'md', 'lg'], val: ref(true) }),
    template: `<div class="flex flex-col gap-4">
      <USwitch v-for="s in list" :key="s" v-bind="args" :size="s" :label="s" v-model="val" />
    </div>`,
  }),
}

export const States: Story = {
  render: () => ({
    setup: () => ({ on: ref(true), off: ref(false), dis: ref(true) }),
    template: `<div class="flex flex-col gap-4">
      <USwitch v-model="off" label="Desligado" />
      <USwitch v-model="on" label="Ligado" />
      <USwitch v-model="dis" label="Desabilitado" disabled />
    </div>`,
  }),
}

export const Colors: Story = {
  render: () => ({
    setup: () => ({ list: ['primary', 'success', 'warning', 'error', 'neutral'], val: ref(true) }),
    template: `<div class="flex flex-col gap-4">
      <USwitch v-for="c in list" :key="c" :color="c" :label="c" v-model="val" />
    </div>`,
  }),
}

// Com descrição (preferências de conta)
export const WithDescription: Story = {
  args: {
    label: 'E-mails promocionais',
    description: 'Receba ofertas e bônus exclusivos por e-mail.',
  },
}
