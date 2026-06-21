import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Button" do Figma. Props = variant properties.
// Componentes do Nuxt UI são globais (UButton) — não precisa importar.
const meta: Meta = {
  title: 'Components/Button',
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
    variant: { control: 'select', options: ['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
    label: { control: 'text' },
    icon: { control: 'text' },
  },
  args: { label: 'Button', color: 'primary', variant: 'solid', size: 'md', disabled: false },
  render: (args) => ({ setup: () => ({ args }), template: '<UButton v-bind="args" />' }),
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
