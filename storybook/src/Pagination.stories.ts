import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

// Espelho do componente "Pagination" do DS (página 🔢 Pagination).
// No Figma: barra representativa (prev, números, ativa, ellipsis, next). color/variant/size via prop.
const meta: Meta = {
  title: 'Components/Pagination',
  parameters: {
    docs: {
      description: {
        component:
          'Paginação (`UPagination` do @nuxt/ui): navega listas longas (histórico de apostas/transações, resultados de busca). `total` + `items-per-page` definem as páginas; `page` é v-model; `color`/`variant` estilizam, `sibling-count` controla quantos números aparecem.',
      },
    },
  },
  argTypes: {
    color: { control: 'select', options: ['primary', 'neutral'], description: 'Cor da página ativa.' },
    variant: { control: 'select', options: ['solid', 'outline', 'soft', 'subtle', 'ghost'], description: 'Estilo dos botões.' },
  },
  args: { color: 'primary', variant: 'solid' },
  render: (args) => ({
    setup: () => ({ args, page: ref(1) }),
    template: '<UPagination v-bind="args" v-model:page="page" :total="100" :items-per-page="10" />',
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}

export const Soft: Story = { args: { variant: 'soft', color: 'neutral' } }
