import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do componente "Table" do DS (página 📑 Table).
// No Figma: cabeçalho + linhas (histórico). No código usa TanStack (`columns` + `data`).
const meta: Meta = {
  title: 'Components/Table',
  parameters: {
    docs: {
      description: {
        component:
          'Tabela de dados (`UTable` do @nuxt/ui, sobre TanStack Table). Use para histórico de apostas/transações, ranking. `data` são as linhas e `columns` define `{ accessorKey, header }`; suporta ordenação, seleção e células customizadas via slots.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const BetHistory: Story = {
  render: () => ({
    setup: () => ({
      columns: [
        { accessorKey: 'jogo', header: 'Jogo' },
        { accessorKey: 'mercado', header: 'Mercado' },
        { accessorKey: 'odd', header: 'Odd' },
        { accessorKey: 'status', header: 'Status' },
      ],
      data: [
        { jogo: 'Flamengo x Palmeiras', mercado: 'Resultado', odd: '1.85', status: 'Ganhou' },
        { jogo: 'Real x Barça', mercado: 'Ambas marcam', odd: '1.72', status: 'Aberta' },
        { jogo: 'Lakers x Celtics', mercado: 'Total pts', odd: '1.90', status: 'Perdeu' },
      ],
    }),
    template: '<div style="width:560px"><UTable :columns="columns" :data="data" /></div>',
  }),
}
