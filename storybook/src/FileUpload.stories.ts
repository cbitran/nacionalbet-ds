import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "FileUpload" do DS (página 📤 FileUpload, variant=area).
// Figma: variant=area (dropzone) × state (default/dragging/error/disabled) × size (sm/md/lg).
// `state` não é prop do @nuxt/ui: dragging/default são runtime; error → color="error"; disabled → disabled.
// variant=button do @nuxt/ui = um botão simples (usar o componente Button) — o DS modela só o area.
const meta: Meta = {
  title: 'Components/FileUpload',
  parameters: {
    docs: {
      description: {
        component:
          'Upload de arquivos (`UFileUpload` do @nuxt/ui). `variant="area"` é a zona de arrastar-e-soltar (com ícone, label e descrição) — usada para documentos de KYC; `variant="button"` é um disparador simples. `accept` restringe os tipos (ex.: `image/png,application/pdf`), `multiple` permite vários arquivos, `layout` (list/grid) controla a lista de arquivos enviados.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['area', 'button'],
      description: 'area = dropzone (arrastar/soltar); button = disparador simples.',
    },
    color: {
      control: 'select',
      options: ['primary', 'error', 'neutral'],
      description: 'Cor do realce. `error` para estado inválido.',
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Tamanho.' },
    layout: {
      control: 'inline-radio',
      options: ['list', 'grid'],
      description: 'Como os arquivos enviados são exibidos (variant=area).',
    },
    label: { control: 'text', description: 'Título da zona de upload.' },
    description: { control: 'text', description: 'Texto auxiliar (tipos/limite).' },
    accept: { control: 'text', description: 'Tipos aceitos (MIME/extensão).' },
    multiple: { control: 'boolean', description: 'Permite múltiplos arquivos.' },
    disabled: { control: 'boolean', description: 'Desabilita o upload.' },
  },
  args: {
    variant: 'area',
    size: 'md',
    icon: 'i-lucide-upload',
    label: 'Arraste arquivos ou clique',
    description: 'PNG, JPG ou PDF · até 5MB',
  },
  render: (args) => ({ setup: () => ({ args }), template: '<div style="width:340px"><UFileUpload v-bind="args" /></div>' }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['sm', 'md', 'lg'] }),
    template: `<div class="flex flex-col gap-4" style="width:340px">
      <UFileUpload v-for="s in list" :key="s" v-bind="args" :size="s" />
    </div>`,
  }),
}

export const States: Story = {
  render: (args) => ({
    setup: () => ({ args }),
    template: `<div class="flex flex-col gap-4" style="width:340px">
      <UFileUpload v-bind="args" />
      <UFileUpload v-bind="args" color="error" highlight />
      <UFileUpload v-bind="args" disabled />
    </div>`,
  }),
}

// Disparador simples (variant=button)
export const Button: Story = { args: { variant: 'button', label: 'Enviar documento' } }

// KYC: PDF/JPG/PNG, múltiplos documentos
export const KYC: Story = {
  args: {
    multiple: true,
    accept: 'image/png,image/jpeg,application/pdf',
    label: 'Envie seus documentos',
    description: 'RG/CNH e comprovante · PNG, JPG ou PDF',
  },
}
