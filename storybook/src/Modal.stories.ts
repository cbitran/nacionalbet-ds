import type { Meta, StoryObj } from '@storybook/vue3'

// UModal: slot default = trigger; slots #body / #footer para conteúdo.
const meta: Meta = {
  title: 'Components/Modal',
  parameters: {
    docs: { description: { component: 'Diálogo modal sobreposto. Slot default = gatilho (trigger); slots `#body`/`#footer` para o conteúdo. Espelha o `UModal` do @nuxt/ui v4.' } },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    fullscreen: { control: 'boolean' },
    overlay: { control: 'boolean', description: 'Exibe o fundo escurecido' },
    dismissible: { control: 'boolean', description: 'Fecha ao clicar fora / Esc' },
  },
  args: {
    title: 'Modal title',
    description: 'This is the modal body. Use it for descriptions, forms or any content.',
    fullscreen: false,
    overlay: true,
    dismissible: true,
  },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => ({
    setup: () => ({ args }),
    template: `<UModal v-bind="args">
      <UButton label="Open modal" color="primary" />
      <template #footer="{ close }">
        <div class="flex justify-end gap-2 w-full">
          <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
          <UButton label="Confirm" color="primary" @click="close" />
        </div>
      </template>
    </UModal>`,
  }),
}
