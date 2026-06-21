import type { Meta, StoryObj } from '@storybook/vue3'

// Checkbox · Radio · Switch — controles de seleção (acento = primary)
const meta: Meta = {
  title: 'Components/Toggles',
  parameters: {
    docs: { description: { component: 'Controles de seleção do @nuxt/ui — `UCheckbox`, `URadioGroup` e `USwitch` (acento = primary). Cada story abaixo mostra um tipo. Sem tabela de props única por agrupar 3 componentes.' } },
  },
}
export default meta
type Story = StoryObj

export const Checkbox: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-3">
      <UCheckbox label="Unchecked" :default-value="false" />
      <UCheckbox label="Checked" :default-value="true" />
      <UCheckbox label="Indeterminate" :default-value="'indeterminate'" />
      <UCheckbox label="Disabled" disabled />
    </div>`,
  }),
}

export const Radio: Story = {
  render: () => ({
    setup: () => ({ items: ['Single', 'Each way', 'System'] }),
    template: `<URadioGroup :items="items" :default-value="'Single'" />`,
  }),
}

export const Switch: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-3">
      <USwitch label="Email notifications" :default-value="true" />
      <USwitch label="Promotions" :default-value="false" />
      <USwitch label="Disabled" disabled />
    </div>`,
  }),
}
