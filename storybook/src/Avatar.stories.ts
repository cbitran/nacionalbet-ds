import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Avatar" do DS (página 👤 Avatar).
// Variant properties do Figma: color (7) × size (sm/md/lg). Boolean Imagem + text Iniciais.
// Conteúdo: iniciais (fallback), imagem (src) ou ícone. chip = status no canto (UChip).
const meta: Meta = {
  title: 'Components/Avatar',
  parameters: {
    docs: {
      description: {
        component:
          'Avatar (`UAvatar` do @nuxt/ui): imagem com fallback de iniciais ou ícone, em círculo. Use para perfil do usuário, times/escudos, lista de participantes. `text` = iniciais, `src` = imagem, `icon` = ícone; `color` tinge o fallback; `chip` adiciona um indicador de status no canto. Tamanhos do DS: sm/md/lg.',
      },
    },
  },
  argTypes: {
    text: { control: 'text', description: 'Iniciais (fallback).' },
    src: { control: 'text', description: 'URL da imagem.' },
    icon: { control: 'text', description: 'Ícone (ex.: i-lucide-user).' },
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'], description: 'Cor do fallback.' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Tamanho.' },
  },
  args: { text: 'CB', color: 'primary', size: 'md' },
  render: (args) => ({ setup: () => ({ args }), template: '<UAvatar v-bind="args" />' }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => ({
    setup: () => ({ list: ['sm', 'md', 'lg'] }),
    template: `<div class="flex items-center gap-4"><UAvatar v-for="s in list" :key="s" :size="s" text="CB" color="primary" /></div>`,
  }),
}

export const Colors: Story = {
  render: () => ({
    setup: () => ({ list: ['primary', 'success', 'warning', 'error', 'neutral'] }),
    template: `<div class="flex items-center gap-4"><UAvatar v-for="c in list" :key="c" :color="c" text="CB" /></div>`,
  }),
}

export const Content: Story = {
  render: () => ({
    template: `<div class="flex items-center gap-4">
      <UAvatar text="CB" color="primary" />
      <UAvatar icon="i-lucide-user" color="neutral" />
      <UAvatar src="https://i.pravatar.cc/80?img=12" alt="user" />
    </div>`,
  }),
}

// Status online (chip no canto)
export const WithStatus: Story = {
  render: () => ({
    template: `<div class="flex items-center gap-4">
      <UChip color="success" position="bottom-right" inset><UAvatar text="CB" color="primary" /></UChip>
      <UChip color="neutral" position="bottom-right" inset><UAvatar text="AL" color="success" /></UChip>
    </div>`,
  }),
}

// Grupo (UAvatarGroup)
export const Group: Story = {
  render: () => ({
    template: `<UAvatarGroup :max="3">
      <UAvatar text="CB" color="primary" />
      <UAvatar text="AL" color="success" />
      <UAvatar text="JP" color="warning" />
      <UAvatar text="MR" color="error" />
      <UAvatar text="TS" color="info" />
    </UAvatarGroup>`,
  }),
}
