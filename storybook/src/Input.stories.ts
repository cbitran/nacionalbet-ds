import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta = {
  title: 'Components/Input',
  argTypes: {
    color: { control: 'select', options: ['primary', 'error', 'neutral'] },
    variant: { control: 'select', options: ['outline', 'soft', 'subtle', 'ghost', 'none'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    placeholder: { control: 'text' },
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { placeholder: 'Placeholder', variant: 'outline', size: 'md' },
  render: (args) => ({ setup: () => ({ args }), template: '<UInput v-bind="args" />' }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['outline', 'soft', 'subtle', 'ghost'] }),
    template: `<div class="flex flex-col gap-3"><UInput v-for="v in list" :key="v" v-bind="args" :variant="v" :placeholder="v" /></div>`,
  }),
}

export const States: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-3" style="width:240px">
      <UInput placeholder="default" />
      <UInput placeholder="error" color="error" highlight />
      <UInput placeholder="disabled" disabled />
    </div>`,
  }),
}

export const WithIcon: Story = { args: { icon: 'i-lucide-mail', placeholder: 'you@email.com' } }
