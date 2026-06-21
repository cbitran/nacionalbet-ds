import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do componente "Drawer" do DS (página 🧰 Drawer).
// No Figma: bottom-sheet (handle + header + conteúdo). No código desliza de um lado via `direction`.
const meta: Meta = {
  title: 'Components/Drawer',
  parameters: {
    docs: {
      description: {
        component:
          'Painel deslizante (`UDrawer` do @nuxt/ui). Use para bet slip, filtros e menu no mobile. `direction` (bottom/top/left/right); no mobile o bottom-sheet com `handle` é o padrão. Abre a partir de um gatilho.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const BottomSheet: Story = {
  render: () => ({
    template: `<div class="p-10">
      <UDrawer title="Cupom de aposta" description="2 seleções">
        <UButton label="Abrir cupom" icon="i-lucide-ticket" color="primary" />
        <template #body>
          <div class="flex flex-col gap-3 pb-2" style="min-width:300px">
            <div class="flex justify-between"><span class="text-muted text-sm">Flamengo (1.85)</span><span class="text-highlighted text-sm">R$ 50</span></div>
            <div class="flex justify-between"><span class="text-muted text-sm">Over 2.5 (1.90)</span><span class="text-highlighted text-sm">R$ 30</span></div>
            <UButton block color="primary" label="Apostar R$ 80" class="mt-2" />
          </div>
        </template>
      </UDrawer>
    </div>`,
  }),
}

export const RightSide: Story = {
  render: () => ({
    template: `<div class="p-10">
      <UDrawer direction="right" title="Filtros">
        <UButton label="Filtros" icon="i-lucide-sliders-horizontal" color="neutral" variant="subtle" />
        <template #body><div style="min-width:260px" class="text-muted text-sm">Conteúdo dos filtros…</div></template>
      </UDrawer>
    </div>`,
  }),
}
