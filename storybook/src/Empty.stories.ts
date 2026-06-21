import type { Meta, StoryObj } from '@storybook/vue3'

// Composite/pattern do DS (página 📭 Empty no Figma — componente EmptyState).
// NÃO existe UEmpty no @nuxt/ui — é composição: ícone + título + descrição + ação (UButton).
const meta: Meta = {
  title: 'Patterns/Empty',
  parameters: {
    docs: {
      description: {
        component:
          'Estado vazio: ícone + título + descrição + ação opcional. Use quando uma lista não tem itens (sem apostas, sem favoritos, busca sem resultados). É um **pattern** (composição), não um componente do @nuxt/ui — no Figma vive como o componente `EmptyState` com Ícone/Ação por boolean.',
      },
    },
  },
}
export default meta
type Story = StoryObj

const empty = (icon: string, title: string, desc: string, action: string) => `
  <div class="flex flex-col items-center text-center gap-3 px-6 py-10" style="width:360px">
    <UIcon name="${icon}" class="size-12 text-dimmed" />
    <div class="text-highlighted text-lg font-semibold">${title}</div>
    <p class="text-muted text-sm">${desc}</p>
    ${action ? `<UButton color="primary" label="${action}" class="mt-1" />` : ''}
  </div>`

export const Default: Story = {
  render: () => ({ template: empty('i-lucide-ticket', 'Nenhuma aposta ainda', 'Suas apostas aparecerão aqui. Explore os jogos e faça a primeira.', 'Explorar jogos') }),
}

export const NoResults: Story = {
  render: () => ({ template: empty('i-lucide-search-x', 'Nenhum resultado', 'Não encontramos jogos para sua busca. Tente outros termos.', '') }),
}

export const NoFavorites: Story = {
  render: () => ({ template: empty('i-lucide-star', 'Sem favoritos', 'Toque na estrela de um jogo para salvá-lo aqui.', 'Ver jogos') }),
}
