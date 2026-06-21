import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

// Espelho do componente "Stepper" do DS (página 🪜 Stepper).
// No Figma: etapas concluída/ativa/futura + conectores. items/orientation/color/size via prop.
const meta: Meta = {
  title: 'Components/Stepper',
  parameters: {
    docs: {
      description: {
        component:
          'Indicador de etapas (`UStepper` do @nuxt/ui): mostra o progresso num fluxo multi-etapa (cadastro, KYC, depósito). `items` define as etapas `{ title, description, icon }`; `model-value` é a etapa atual; `orientation` horizontal/vertical.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'], description: 'Direção.' },
    color: { control: 'select', options: ['primary', 'neutral'], description: 'Cor.' },
  },
  args: { orientation: 'horizontal', color: 'primary' },
  render: (args) => ({
    setup: () => ({ args, current: ref(1), items: [
      { title: 'Cadastro', description: 'Dados básicos', icon: 'i-lucide-user' },
      { title: 'Documentos', description: 'KYC', icon: 'i-lucide-file-check' },
      { title: 'Depósito', description: 'Primeiro depósito', icon: 'i-lucide-wallet' },
    ] }),
    template: '<div style="width:520px"><UStepper v-bind="args" v-model="current" :items="items" /></div>',
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}
export const Vertical: Story = { args: { orientation: 'vertical' } }
