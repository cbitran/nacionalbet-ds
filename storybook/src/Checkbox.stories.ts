import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

// Espelho do Component Set "Checkbox" do DS (página ☑️ Checkbox).
// Variant properties do Figma: variant (list/card) × state (unchecked/checked/indeterminate) + Label.
// `state` não é prop do @nuxt/ui: checked/unchecked = v-model (modelValue); indeterminate = v-model 'indeterminate'.
const meta: Meta = {
  title: 'Components/Checkbox',
  parameters: {
    docs: {
      description: {
        component:
          'Caixa de seleção (`UCheckbox` do @nuxt/ui). `variant="list"` é o checkbox inline padrão; `variant="card"` é um cartão com borda (a área toda é clicável; quando marcado ganha borda primária) — ótimo para escolher opções de aposta/planos. Estado por `v-model` (use `"indeterminate"` para o estado parcial). `indicator` controla o lado do check (start/end/hidden).',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['list', 'card'], description: 'list = inline; card = cartão com borda.' },
    color: { control: 'select', options: ['primary', 'success', 'warning', 'error', 'neutral'], description: 'Cor quando marcado.' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Tamanho (escala oficial do DS).' },
    indicator: { control: 'inline-radio', options: ['start', 'end', 'hidden'], description: 'Posição do indicador (check).' },
    label: { control: 'text', description: 'Rótulo.' },
    description: { control: 'text', description: 'Texto auxiliar.' },
    disabled: { control: 'boolean', description: 'Desabilita.' },
  },
  args: { variant: 'list', color: 'primary', size: 'md', label: 'Aceito os termos' },
  render: (args) => ({
    setup: () => ({ args, val: ref(true) }),
    template: '<div :style="args.variant===\'card\' ? \'width:280px\' : \'\'"><UCheckbox v-bind="args" v-model="val" /></div>',
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Variants: Story = {
  render: () => ({
    setup: () => ({ a: ref(true), b: ref(true) }),
    template: `<div class="flex flex-col gap-4" style="width:280px">
      <UCheckbox v-model="a" variant="list" label="Lista (inline)" description="Checkbox padrão ao lado do texto" />
      <UCheckbox v-model="b" variant="card" label="Cartão (card)" description="Área toda clicável, borda no marcado" />
    </div>`,
  }),
}

export const States: Story = {
  render: () => ({
    setup: () => ({ off: ref(false), on: ref(true), ind: ref('indeterminate'), dis: ref(true) }),
    template: `<div class="flex flex-col gap-4">
      <UCheckbox v-model="off" label="Desmarcado" />
      <UCheckbox v-model="on" label="Marcado" />
      <UCheckbox v-model="ind" label="Indeterminado" />
      <UCheckbox v-model="dis" label="Desabilitado" disabled />
    </div>`,
  }),
}

export const Sizes: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['sm', 'md', 'lg'], val: ref(true) }),
    template: `<div class="flex flex-col gap-4">
      <UCheckbox v-for="s in list" :key="s" v-bind="args" :size="s" :label="s" v-model="val" />
    </div>`,
  }),
}

// Seleção em cartões (ex.: escolher mercado/plano)
export const CardSelection: Story = {
  render: () => ({
    setup: () => ({ a: ref(true), b: ref(false), c: ref(false) }),
    template: `<div class="flex flex-col gap-3" style="width:300px">
      <UCheckbox v-model="a" variant="card" label="Resultado final" description="1X2 · odds em tempo real" />
      <UCheckbox v-model="b" variant="card" label="Ambas marcam" description="Sim / Não" />
      <UCheckbox v-model="c" variant="card" label="Total de gols" description="Over / Under 2.5" />
    </div>`,
  }),
}
