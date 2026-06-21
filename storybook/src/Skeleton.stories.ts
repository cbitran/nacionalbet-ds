import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do Component Set "Skeleton" do DS (página 💀 Skeleton).
// Variant property do Figma: shape (line/circle/block). No código é um <USkeleton class="..."> que você dimensiona.
const meta: Meta = {
  title: 'Components/Skeleton',
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder de carregamento animado (`USkeleton` do @nuxt/ui). Use enquanto listas/cards de jogos carregam. É um bloco que você dimensiona via classes (`h-*`, `w-*`, `rounded-*`); combine vários para montar o esqueleto de um card.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Shapes: Story = {
  render: () => ({
    template: `<div class="flex items-center gap-6">
      <USkeleton class="h-4 w-40" />
      <USkeleton class="h-10 w-10 rounded-full" />
      <USkeleton class="h-20 w-40 rounded-lg" />
    </div>`,
  }),
}

// Esqueleto de card de jogo (uso real)
export const GameCardSkeleton: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-3 p-4 rounded-lg" style="width:300px;background:var(--ui-bg-elevated)">
      <div class="flex items-center gap-3">
        <USkeleton class="h-10 w-10 rounded-full" />
        <div class="flex flex-col gap-2 flex-1">
          <USkeleton class="h-4 w-3/4" />
          <USkeleton class="h-3 w-1/2" />
        </div>
      </div>
      <USkeleton class="h-16 w-full rounded-md" />
      <div class="flex gap-2">
        <USkeleton class="h-9 flex-1 rounded-md" />
        <USkeleton class="h-9 flex-1 rounded-md" />
        <USkeleton class="h-9 flex-1 rounded-md" />
      </div>
    </div>`,
  }),
}

// Lista de jogos carregando
export const ListSkeleton: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-3" style="width:320px">
      <div v-for="i in 4" :key="i" class="flex items-center gap-3">
        <USkeleton class="h-9 w-9 rounded-full" />
        <USkeleton class="h-4 flex-1" />
        <USkeleton class="h-8 w-14 rounded-md" />
      </div>
    </div>`,
  }),
}
