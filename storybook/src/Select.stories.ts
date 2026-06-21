import type { Meta, StoryObj } from '@storybook/vue3'

const items = ['All sports', 'Football', 'Basketball', 'Tennis']

const meta: Meta = {
  title: 'Components/Select',
  argTypes: {
    variant: { control: 'select', options: ['outline', 'soft', 'subtle', 'ghost', 'none'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { placeholder: 'Select option', variant: 'outline', size: 'md' },
  render: (args) => ({ setup: () => ({ args, items }), template: '<USelect v-bind="args" :items="items" class="w-60" />' }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

// USelectMenu — versão com busca embutida (dropdown filtrável)
export const SelectMenu: Story = {
  render: () => ({ setup: () => ({ items }), template: '<USelectMenu :items="items" placeholder="Search & select" class="w-60" />' }),
}
