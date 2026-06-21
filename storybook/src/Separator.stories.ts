import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Separator" do DS (página ➖ Separator).
// Variant properties do Figma: orientation (horizontal/vertical) × content (none/label/icon).
// type (solid/dashed/dotted), size (espessura), color e position são props (overrides), não variantes.
const meta: Meta = {
  title: 'Components/Separator',
  parameters: {
    docs: {
      description: {
        component:
          'Divisória que separa conteúdo na horizontal ou vertical (`USeparator` do @nuxt/ui). Use entre blocos de uma tela, itens de lista, ou com `label`/`icon` no meio (ex.: o clássico "ou" entre login e cadastro). `orientation` horizontal/vertical, `type` solid/dashed/dotted, `size` controla a espessura, `position` alinha o conteúdo (start/center/end).',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Texto centralizado na linha.' },
    icon: { control: 'text', description: 'Ícone centralizado (ex.: i-lucide-star).' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'], description: 'Direção da divisória.' },
    type: { control: 'inline-radio', options: ['solid', 'dashed', 'dotted'], description: 'Estilo da linha.' },
    color: { control: 'select', options: ['neutral', 'primary', 'success', 'warning', 'error'], description: 'Cor da linha.' },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'Espessura.' },
    position: { control: 'inline-radio', options: ['start', 'center', 'end'], description: 'Posição do conteúdo.' },
  },
  args: { type: 'solid', color: 'neutral', orientation: 'horizontal' },
  render: (args) => ({
    setup: () => ({ args }),
    template: '<div style="width:340px"><USeparator v-bind="args" /></div>',
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

// Conteúdo: linha simples, com label, com ícone
export const Content: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-6" style="width:340px">
      <USeparator />
      <USeparator label="ou" />
      <USeparator icon="i-lucide-star" />
    </div>`,
  }),
}

export const Types: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-6" style="width:340px">
      <USeparator type="solid" label="solid" />
      <USeparator type="dashed" label="dashed" />
      <USeparator type="dotted" label="dotted" />
    </div>`,
  }),
}

export const Vertical: Story = {
  render: () => ({
    template: `<div class="flex items-center gap-4" style="height:64px">
      <span class="text-muted text-sm">Entrar</span>
      <USeparator orientation="vertical" />
      <span class="text-muted text-sm">Cadastrar</span>
      <USeparator orientation="vertical" icon="i-lucide-circle" />
      <span class="text-muted text-sm">Ajuda</span>
    </div>`,
  }),
}

// Uso real: "ou" no fluxo de login
export const LoginDivider: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-4" style="width:300px">
      <UButton block color="primary" label="Entrar com e-mail" />
      <USeparator label="ou" />
      <UButton block color="neutral" variant="subtle" label="Continuar com Google" />
    </div>`,
  }),
}
