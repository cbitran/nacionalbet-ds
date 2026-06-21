import type { Meta, StoryObj } from '@storybook/vue3'
import { onMounted, ref } from 'vue'

// Foundations/Radius — escala --radius-* do tokens.css (base --ui-radius = 6px).
// Valores lidos em runtime do :root.
const KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']

const meta: Meta = { title: 'Foundations/Radius' }
export default meta
type Story = StoryObj

export const Scale: Story = {
  render: () => ({
    setup() {
      const items = ref<{ key: string; value: string }[]>([])
      onMounted(() => {
        const cs = getComputedStyle(document.documentElement)
        items.value = KEYS.map((k) => ({ key: k, value: cs.getPropertyValue(`--radius-${k}`).trim() }))
      })
      return { items }
    },
    template: `<div class="flex flex-wrap gap-6">
      <div v-for="it in items" :key="it.key" class="flex flex-col items-center gap-2">
        <div class="size-20 bg-primary/20 ring-2 ring-primary" :style="{ borderRadius: 'var(--radius-' + it.key + ')' }"></div>
        <code class="text-xs">radius-{{ it.key }}</code>
        <span class="text-xs text-muted">{{ it.value }}</span>
      </div>
    </div>`,
  }),
}
