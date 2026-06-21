import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "InputDate" do DS (página 📅 InputDate).
// Variant properties do Figma: variant (outline/soft/subtle/ghost) × state (default/focus/error/disabled) × size (sm/md/lg).
// `state` não é prop do @nuxt/ui: focus/default não viram prop; error → color="error" (+highlight); disabled → disabled.
// Campo "fechado" com ícone de calendário (trailing); o date picker abre no clique (runtime).
const meta: Meta = {
  title: 'Components/InputDate',
  parameters: {
    docs: {
      description: {
        component:
          'Campo de data (`UInputDate` do @nuxt/ui): campo fechado com segmentos DD/MM/YYYY e ícone de calendário; abre um date picker ao focar. Use para data de nascimento, KYC, filtros por data. Compartilha a casca do Input (mesmos `variant`, `size`, `color` e estado de erro). `range` permite selecionar um intervalo.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'error', 'neutral'],
      description: 'Cor do anel/realce. `error` para estado inválido.',
    },
    variant: {
      control: 'select',
      options: ['outline', 'soft', 'subtle', 'ghost'],
      description: 'Estilo visual do campo.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho (padding e tipografia).',
    },
    range: { control: 'boolean', description: 'Permite selecionar um intervalo de datas.' },
    highlight: { control: 'boolean', description: 'Força o realce do anel (como foco).' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
  },
  // trailing-icon de calendário p/ casar com o Figma ("campo fechado com calendário").
  // O ícone é position:absolute na direita → o campo precisa de largura (full-width) p/ não
  // sobrepor o segmento do ano. Em uso real o InputDate fica full-width no form.
  args: { variant: 'outline', size: 'md', trailingIcon: 'i-lucide-calendar' },
  render: (args) => ({
    setup: () => ({ args }),
    template: '<div style="width:240px"><UInputDate v-bind="args" class="w-full" /></div>',
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['outline', 'soft', 'subtle', 'ghost'] }),
    template: `<div class="flex flex-col gap-3" style="width:280px">
      <UInputDate v-for="v in list" :key="v" v-bind="args" :variant="v" class="w-full" />
    </div>`,
  }),
}

export const Sizes: Story = {
  render: (args) => ({
    setup: () => ({ args, list: ['sm', 'md', 'lg'] }),
    template: `<div class="flex flex-col gap-3" style="width:280px">
      <UInputDate v-for="s in list" :key="s" v-bind="args" :size="s" class="w-full" />
    </div>`,
  }),
}

export const States: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-3" style="width:280px">
      <UInputDate trailing-icon="i-lucide-calendar" class="w-full" />
      <UInputDate trailing-icon="i-lucide-calendar" color="error" highlight class="w-full" />
      <UInputDate trailing-icon="i-lucide-calendar" disabled class="w-full" />
    </div>`,
  }),
}
