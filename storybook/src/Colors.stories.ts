import type { Meta, StoryObj } from '@storybook/vue3'

// Tokens semânticos vindos do tokens.css (via main.css). Prova de que o tema da marca chega no código.
const meta: Meta = { title: 'Foundations/Colors' }
export default meta
type Story = StoryObj

export const Semantic: Story = {
  render: () => ({
    setup: () => ({
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      bgs: ['bg-default', 'bg-muted', 'bg-elevated', 'bg-accented'],
    }),
    template: `<div class="flex flex-col gap-6">
      <div>
        <div class="text-sm text-muted mb-2">color/*</div>
        <div class="flex gap-3">
          <div v-for="c in colors" :key="c" class="flex flex-col items-center gap-1">
            <div class="size-14 rounded-md" :class="'bg-' + c"></div>
            <span class="text-xs text-muted">{{ c }}</span>
          </div>
        </div>
      </div>
      <div>
        <div class="text-sm text-muted mb-2">backgrounds</div>
        <div class="flex gap-3">
          <div v-for="b in bgs" :key="b" class="flex flex-col items-center gap-1">
            <div class="size-14 rounded-md ring ring-default" :class="b"></div>
            <span class="text-xs text-muted">{{ b }}</span>
          </div>
        </div>
      </div>
    </div>`,
  }),
}
