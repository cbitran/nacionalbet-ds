import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Alert" do DS (página 🔔 Alert).
// Variant properties do Figma: variant (solid/outline/soft/subtle) × color (7).
// Booleans Ícone/Fechar/Descrição + text Título/Descrição.
const meta: Meta = {
  title: 'Components/Alert',
  parameters: {
    docs: {
      description: {
        component:
          'Aviso para chamar a atenção (`UAlert` do @nuxt/ui): banner com ícone, título, descrição e ações/close opcionais. Use para mensagens de sistema (aposta confirmada, depósito recebido, erro, KYC pendente). `variant` solid/outline/soft/subtle × `color` (estado). `actions` insere botões; `close` mostra o X.',
      },
    },
  },
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'], description: 'Cor/estado.' },
    variant: { control: 'inline-radio', options: ['solid', 'outline', 'soft', 'subtle'], description: 'Estilo visual.' },
    title: { control: 'text', description: 'Título.' },
    description: { control: 'text', description: 'Descrição.' },
    icon: { control: 'text', description: 'Ícone (ex.: i-lucide-check-circle).' },
    close: { control: 'boolean', description: 'Mostra botão de fechar.' },
  },
  args: { color: 'success', variant: 'soft', title: 'Aposta confirmada', description: 'Sua aposta foi registrada com sucesso.', icon: 'i-lucide-circle-check' },
  render: (args) => ({ setup: () => ({ args }), template: '<div style="width:420px"><UAlert v-bind="args" /></div>' }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Variants: Story = {
  render: () => ({
    setup: () => ({ list: ['solid', 'outline', 'soft', 'subtle'] }),
    template: `<div class="flex flex-col gap-3" style="width:420px">
      <UAlert v-for="v in list" :key="v" :variant="v" color="primary" :title="v" description="Estilo da superfície do alerta." icon="i-lucide-info" />
    </div>`,
  }),
}

export const Colors: Story = {
  render: () => ({
    setup: () => ({ list: [['success','i-lucide-circle-check','Depósito recebido'],['error','i-lucide-circle-x','Falha no pagamento'],['warning','i-lucide-triangle-alert','Verificação pendente'],['info','i-lucide-info','Novo recurso disponível']] }),
    template: `<div class="flex flex-col gap-3" style="width:420px">
      <UAlert v-for="[c,i,t] in list" :key="c" :color="c" variant="soft" :icon="i" :title="t" description="Mensagem de exemplo do sistema." />
    </div>`,
  }),
}

// Com ações + close (uso real: KYC)
export const WithActions: Story = {
  render: () => ({
    template: `<div style="width:420px">
      <UAlert color="warning" variant="subtle" icon="i-lucide-shield-alert"
        title="Verificação pendente"
        description="Envie seus documentos para liberar saques."
        :actions="[{label:'Enviar documentos', color:'warning', size:'xs'},{label:'Depois', color:'neutral', variant:'ghost', size:'xs'}]"
        :close="true" />
    </div>`,
  }),
}
