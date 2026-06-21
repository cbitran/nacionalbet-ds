import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Button" do Figma. Props = variant properties.
// Componentes do Nuxt UI são globais (UButton) — não precisa importar.
const meta: Meta = {
  title: 'Components/Button',
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
    variant: { control: 'select', options: ['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: {
      control: 'inline-radio',
      options: ['rectangular', 'pill', 'circular'],
      description:
        'Forma (espelha o Figma). No código: pill = `rounded-full`; circular = `square` + `rounded-full` (só ícone). rectangular é o padrão.',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
    label: { control: 'text' },
    icon: { control: 'text' },
  },
  args: { label: 'Button', color: 'primary', variant: 'solid', size: 'md', shape: 'rectangular', disabled: false },
  // shape → props do @nuxt/ui: pill arredonda total; circular vira square só-ícone.
  render: (args) => ({
    setup: () => ({ args }),
    template: `<UButton
      v-bind="args"
      :label="args.shape === 'circular' ? undefined : args.label"
      :icon="args.shape === 'circular' ? (args.icon || 'i-lucide-plus') : args.icon"
      :square="args.shape === 'circular'"
      :ui="args.shape === 'rectangular' ? undefined : { base: 'rounded-full' }" />`,
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'] }),
    template: `<div class="flex flex-wrap gap-2">
      <UButton v-for="v in list" :key="v" v-bind="args" :variant="v" :label="v" />
    </div>`,
  }),
}

export const Colors: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] }),
    template: `<div class="flex flex-wrap gap-2">
      <UButton v-for="c in list" :key="c" v-bind="args" :color="c" :label="c" />
    </div>`,
  }),
}

export const Sizes: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['xs', 'sm', 'md', 'lg', 'xl'] }),
    template: `<div class="flex flex-wrap items-center gap-2">
      <UButton v-for="s in list" :key="s" v-bind="args" :size="s" :label="s" />
    </div>`,
  }),
}

export const WithIcon: Story = { args: { icon: 'i-lucide-rocket', label: 'Place Bet' } }
export const FullWidth: Story = { args: { block: true, label: 'Sign in' }, parameters: { layout: 'padded' } }

// As 3 formas (espelha a propriedade shape do Figma).
export const Shapes: Story = {
  render: (args) => ({
    setup: () => ({ args }),
    template: `<div class="flex flex-wrap items-center gap-3">
      <UButton v-bind="args" label="Rectangular" />
      <UButton v-bind="args" label="Pill" :ui="{ base: 'rounded-full' }" />
      <UButton v-bind="args" :label="undefined" icon="i-lucide-plus" square :ui="{ base: 'rounded-full' }" />
    </div>`,
  }),
}

// Pílula com texto — qualquer variant/color.
export const Pill: Story = { args: { shape: 'pill', label: 'Filtros' } }

// Circular só-ícone — em vários tamanhos.
export const Circular: Story = {
  render: (args) => ({
    setup: () => ({ args, sizes: ['xs', 'sm', 'md', 'lg', 'xl'] }),
    template: `<div class="flex flex-wrap items-center gap-3">
      <UButton v-for="s in sizes" :key="s" v-bind="args" :label="undefined" :size="s" icon="i-lucide-plus" square :ui="{ base: 'rounded-full' }" />
    </div>`,
  }),
}
