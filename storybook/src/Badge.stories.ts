import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta = {
  title: 'Components/Badge',
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
    variant: { control: 'select', options: ['solid', 'outline', 'soft', 'subtle'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
  },
  args: { label: 'Badge', color: 'primary', variant: 'solid', size: 'md' },
  render: (args) => ({ setup: () => ({ args }), template: '<UBadge v-bind="args" />' }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Colors: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] }),
    template: `<div class="flex flex-wrap gap-2"><UBadge v-for="c in list" :key="c" v-bind="args" :color="c" :label="c" /></div>`,
  }),
}

export const Variants: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['solid', 'outline', 'soft', 'subtle'] }),
    template: `<div class="flex flex-wrap gap-2"><UBadge v-for="v in list" :key="v" v-bind="args" :variant="v" :label="v" /></div>`,
  }),
}

export const Live: Story = { args: { color: 'error', variant: 'solid', label: 'LIVE' } }
