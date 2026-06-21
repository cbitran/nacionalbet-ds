import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Textarea" do DS (DS Theme v5 - NuxtUI 4.0, node 94:367).
// Variant properties do Figma: variant (outline/soft/subtle/ghost) × state (default/focus/error/disabled) × size (sm/md/lg).
// `state` não é prop do @nuxt/ui: focus/default não viram prop; error → color="error" (+highlight); disabled → disabled.
// Comportamento do DS: altura fixa rows=3, SEM autoresize, overflow → scroll, alça resize-y.
const meta: Meta = {
  title: 'Components/Textarea',
  parameters: {
    docs: {
      description: {
        component:
          'Campo de texto multilinha (`UTextarea` do @nuxt/ui). Use para entradas longas — comentários, observações de KYC, descrições. No DS a altura é fixa em `rows=3` (sem autoresize), com rolagem no overflow e alça de redimensionamento vertical. Parente do Input: mesmos `variant`, `size`, `color` e estado de erro.',
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
    rows: { control: 'number', description: 'Altura em linhas. Padrão do DS: 3.' },
    placeholder: { control: 'text', description: 'Texto exibido quando vazio.' },
    autoresize: {
      control: 'boolean',
      description: 'Cresce com o conteúdo. No DS fica desligado (altura fixa).',
    },
    highlight: { control: 'boolean', description: 'Força o realce do anel (como foco).' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
  },
  // min-h espelha o floor do Figma (md=76) p/ a alça resize-y só crescer, nunca cortar o placeholder.
  args: { placeholder: 'Placeholder', variant: 'outline', size: 'md', rows: 3, autoresize: false, ui: { base: 'min-h-[76px]' } },
  render: (args) => ({ setup: () => ({ args }), template: '<UTextarea v-bind="args" />' }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['outline', 'soft', 'subtle', 'ghost'] }),
    template: `<div class="flex flex-col gap-3" style="width:320px">
      <UTextarea v-for="v in list" :key="v" v-bind="args" :variant="v" :placeholder="v" />
    </div>`,
  }),
}

export const Sizes: Story = {
  render: (args) => ({
    // floor por size, igual ao Figma (sm 64 / md 76 / lg 88)
    setup: () => ({ args, list: [
      { size: 'sm', ui: { base: 'min-h-[64px]' } },
      { size: 'md', ui: { base: 'min-h-[76px]' } },
      { size: 'lg', ui: { base: 'min-h-[88px]' } },
    ] }),
    template: `<div class="flex flex-col gap-3" style="width:320px">
      <UTextarea v-for="s in list" :key="s.size" v-bind="args" :size="s.size" :ui="s.ui" :placeholder="s.size" />
    </div>`,
  }),
}

export const States: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-3" style="width:320px">
      <UTextarea placeholder="default" />
      <UTextarea placeholder="error" color="error" highlight />
      <UTextarea placeholder="disabled" disabled />
    </div>`,
  }),
}

export const Autoresize: Story = {
  args: {
    autoresize: true,
    modelValue: 'Cresce conforme você digita.\nLinha 2\nLinha 3\nLinha 4',
    placeholder: 'Digite várias linhas…',
  },
}
