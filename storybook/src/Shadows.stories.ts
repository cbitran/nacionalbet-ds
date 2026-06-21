import type { Meta, StoryObj } from '@storybook/vue3'
import { onMounted, ref } from 'vue'

// Foundations/Shadows — elevação (--shadow-sm/md/lg/xl) e glows de marca
// (--shadow-glow-*) do tokens.css §7. As classes shadow-* / shadow-glow-* são
// usadas como strings literais para o scanner do Tailwind v4 gerá-las
// (namespace --shadow-*, correto). Box-shadow lido em runtime de cada card.
const ELEVATION = ['shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl']
const GLOW = ['shadow-glow-primary', 'shadow-glow-success', 'shadow-glow-danger']

const meta: Meta = { title: 'Foundations/Shadows' }
export default meta
type Story = StoryObj

export const Elevation: Story = {
  render: () => ({
    setup() {
      const root = ref<HTMLElement>()
      const val = ref<Record<string, string>>({})
      onMounted(() => {
        const m: Record<string, string> = {}
        root.value?.querySelectorAll<HTMLElement>('[data-sh]').forEach((el) => {
          m[el.dataset.sh!] = getComputedStyle(el).boxShadow
        })
        val.value = m
      })
      return { items: ELEVATION, val, root }
    },
    template: `<div ref="root" class="flex flex-wrap gap-10 p-6">
      <div v-for="s in items" :key="s" class="flex flex-col items-center gap-3">
        <div class="size-24 rounded-xl bg-elevated ring ring-default" :class="s" :data-sh="s"></div>
        <code class="text-xs">{{ s }}</code>
      </div>
    </div>`,
  }),
}

export const Glow: Story = {
  render: () => ({
    setup: () => ({ items: GLOW }),
    template: `<div class="flex flex-wrap gap-10 p-6">
      <div v-for="s in items" :key="s" class="flex flex-col items-center gap-3">
        <div class="size-24 rounded-xl bg-elevated ring ring-default" :class="s"></div>
        <code class="text-xs">{{ s }}</code>
      </div>
    </div>`,
  }),
}
