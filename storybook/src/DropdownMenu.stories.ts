import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do componente "DropdownMenu" do DS (página 📋 DropdownMenu).
// No Figma: painel aberto (itens com estados default/highlighted/disabled, separador, atalho, danger).
// No código abre no clique do trigger; `items` é array de grupos.
const meta: Meta = {
  title: 'Components/DropdownMenu',
  parameters: {
    docs: {
      description: {
        component:
          'Menu de ações (`UDropdownMenu` do @nuxt/ui): abre um painel a partir de um gatilho. Use para menu da conta, ações de um jogo/aposta, filtros. `items` é um array de grupos `{ label, icon, kbds, color, onSelect, children }`; grupos viram seções separadas.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    setup() {
      const items = [
        [
          { label: 'Minha conta', icon: 'i-lucide-user', kbds: ['meta', 'P'] },
          { label: 'Minhas apostas', icon: 'i-lucide-ticket' },
          { label: 'Depósito', icon: 'i-lucide-wallet' },
        ],
        [
          { label: 'Configurações', icon: 'i-lucide-settings' },
          { label: 'Sair', icon: 'i-lucide-log-out', color: 'error' },
        ],
      ]
      return { items }
    },
    template: `<div class="p-10"><UDropdownMenu :items="items"><UButton label="Conta" icon="i-lucide-user" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" /></UDropdownMenu></div>`,
  }),
}

export const WithSubmenu: Story = {
  render: () => ({
    setup() {
      const items = [[
        { label: 'Ver jogo', icon: 'i-lucide-eye' },
        { label: 'Adicionar à comparação', icon: 'i-lucide-plus' },
        { label: 'Compartilhar', icon: 'i-lucide-share-2', children: [
          [{ label: 'Copiar link', icon: 'i-lucide-link' }, { label: 'WhatsApp', icon: 'i-lucide-message-circle' }],
        ] },
      ]]
      return { items }
    },
    template: `<div class="p-10"><UDropdownMenu :items="items"><UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" /></UDropdownMenu></div>`,
  }),
}
