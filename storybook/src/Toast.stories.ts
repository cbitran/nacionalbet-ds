import type { Meta, StoryObj } from '@storybook/vue3'
import { useToast } from '@nuxt/ui/composables'

// Espelho do Component Set "Toast" do DS (página 🍞 Toast).
// Variant properties do Figma: variant (solid/outline/soft/subtle) × color (7) + sombra de elevação.
// No código é disparado via useToast().add({...}) — o container vem do <UApp>.
const meta: Meta = {
  title: 'Components/Toast',
  parameters: {
    docs: {
      description: {
        component:
          'Notificação flutuante (`UToast` via `useToast()` do @nuxt/ui). Disparada por código após uma ação (aposta feita, depósito recebido, erro). Card elevado com ícone, título, descrição e close. `color` indica o estado; `variant` o estilo. O container (`<UApp>`) renderiza os toasts empilhados.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Triggers: Story = {
  render: () => ({
    setup() {
      const toast = useToast()
      const ok = () => toast.add({ title: 'Aposta confirmada', description: 'R$ 50,00 em Flamengo x Palmeiras.', color: 'success', icon: 'i-lucide-circle-check' })
      const err = () => toast.add({ title: 'Falha no pagamento', description: 'Tente outro método.', color: 'error', icon: 'i-lucide-circle-x' })
      const info = () => toast.add({ title: 'Cashout disponível', description: 'Garanta seu lucro agora.', color: 'info', icon: 'i-lucide-info' })
      return { ok, err, info }
    },
    template: `<div class="flex gap-3 p-6">
      <UButton color="success" label="Sucesso" @click="ok" />
      <UButton color="error" label="Erro" @click="err" />
      <UButton color="info" label="Info" @click="info" />
    </div>`,
  }),
}
