import type { Meta, StoryObj } from '@storybook/vue3'

// Search = UInput com ícone de lupa (NuxtUI não tem componente Search separado).
const meta: Meta = {
  title: 'Components/Search',
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { size: 'md' },
  render: (args) => ({
    setup: () => ({ args }),
    template: '<UInput v-bind="args" icon="i-lucide-search" placeholder="Search..." class="w-72" />',
  }),
}
export default meta
type Story = StoryObj

export const Default: Story = {}

export const Sizes: Story = {
  render: () => ({
    setup: () => ({ list: ['sm', 'md', 'lg'] }),
    template: `<div class="flex flex-col gap-3">
      <UInput v-for="s in list" :key="s" :size="s" icon="i-lucide-search" placeholder="Search..." class="w-72" />
    </div>`,
  }),
}
