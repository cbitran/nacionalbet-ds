import type { Meta, StoryObj } from '@storybook/vue3'
import { onMounted, ref } from 'vue'

// Foundations/Spacing — escala --spacing-* do tokens.css (espelho de Spacing/space-* no Figma).
// Os valores são lidos em runtime do :root, então refletem sempre a fonte da verdade.
// Grade em múltiplos de 4 (sem os passos .5). Os .5 do Tailwind são remapeados p/
// múltiplo de 4 em spacing-grid-4.css, então não entram na escala documentada.
const KEYS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  '14', '16', '20', '24', '28', '32',
]

const meta: Meta = { title: 'Foundations/Spacing' }
export default meta
type Story = StoryObj

export const Scale: Story = {
  render: () => ({
    setup() {
      const items = ref<{ key: string; value: string }[]>([])
      onMounted(() => {
        const cs = getComputedStyle(document.documentElement)
        items.value = KEYS.map((k) => ({ key: k, value: cs.getPropertyValue(`--spacing-${k}`).trim() }))
      })
      return { items }
    },
    template: `<div class="flex flex-col gap-2 w-full max-w-2xl">
      <div class="text-sm text-muted mb-2">--spacing-* · base 4px · usado em padding/gap dos componentes</div>
      <div v-for="it in items" :key="it.key" class="flex items-center gap-3">
        <code class="text-xs text-muted w-28 shrink-0">spacing-{{ it.key }}</code>
        <div class="h-4 rounded-sm bg-primary" :style="{ width: 'var(--spacing-' + it.key + ')' }"></div>
        <span class="text-xs text-muted">{{ it.value }}</span>
      </div>
    </div>`,
  }),
}
