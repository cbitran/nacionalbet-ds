import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta = {
  title: 'Components/Slider',
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
  },
  args: { size: 'md' },
  render: (args) => ({ setup: () => ({ args }), template: '<USlider v-bind="args" :default-value="50" class="w-64" />' }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const WithLabel: Story = {
  render: () => ({
    template: `<div class="w-64 flex flex-col gap-2">
      <div class="flex justify-between text-sm"><span class="text-default">Default stake</span><span class="text-muted">$50</span></div>
      <USlider :default-value="50" />
    </div>`,
  }),
}

export const Disabled: Story = { args: { disabled: true } }
