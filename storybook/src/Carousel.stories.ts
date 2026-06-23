import type { Meta, StoryObj } from '@storybook/vue3'

// Espelho do componente Carousel do DS (UCarousel do @nuxt/ui, base Embla).
// Usado nos rails de jogos/eventos (Continue jogando, Em destaque, Provedores).
// API confirmada via nuxt-ui MCP: arrows, dots, loop, align, slidesToScroll, autoScroll, dragFree, items + slot { item, index }.
const games = [
  { n: 'Aviator', p: 'Spribe' }, { n: 'Gates of Olympus', p: 'Pragmatic' }, { n: 'Fortune Tiger', p: 'PG Soft' },
  { n: 'Fortune Dragon', p: 'PG Soft' }, { n: 'Sweet Bonanza', p: 'Pragmatic' }, { n: 'Big Bass', p: 'Pragmatic' },
  { n: 'Mahjong Ways', p: 'PG Soft' }, { n: 'Spaceman', p: 'Pragmatic' },
]

const meta: Meta = {
  title: 'Components/Carousel',
  parameters: {
    docs: {
      description: {
        component:
          'Carrossel horizontal (`UCarousel` do @nuxt/ui, base Embla) — rails de jogos/eventos do cassino. Props principais: **arrows** (setas prev/next), **dots** (indicadores), **loop**, **align** (start/center/end), **slidesToScroll**, **autoScroll**, **dragFree**. Cada slide vem do slot `#default="{ item }"`. Largura do slide via `:ui="{ item: \'basis-...\' }"`.',
      },
    },
  },
  argTypes: {
    arrows: { control: 'boolean', description: 'Setas prev/next.' },
    dots: { control: 'boolean', description: 'Indicadores de slide.' },
    loop: { control: 'boolean', description: 'Loop infinito.' },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'], description: 'Alinhamento do snap.' },
    dragFree: { control: 'boolean', description: 'Arraste livre (sem snap rígido).' },
  },
  args: { arrows: true, dots: false, loop: false, align: 'start', dragFree: false },
  render: (args) => ({
    setup: () => ({ args, games }),
    template: `
      <div style="width:560px; max-width:100%;">
        <UCarousel
          v-bind="args"
          :items="games"
          :ui="{ item: 'basis-1/3', container: 'gap-3' }"
          v-slot="{ item }"
        >
          <div style="border:1px solid var(--ui-border); border-radius:12px; overflow:hidden; background:var(--ui-bg-elevated); width:100%;">
            <div style="aspect-ratio:3/4; background:var(--ui-bg-muted); display:grid; place-items:center; color:var(--ui-text-dimmed);">
              <UIcon name="i-lucide-gamepad-2" class="size-8" />
            </div>
            <div style="padding:8px 10px;">
              <div style="font-size:13px; font-weight:600; color:var(--ui-text);">{{ item.n }}</div>
              <div style="font-size:11px; color:var(--ui-text-muted);">{{ item.p }}</div>
            </div>
          </div>
        </UCarousel>
      </div>
    `,
  }),
}
export default meta
type Story = StoryObj

export const Playground: Story = {}
export const ComDots: Story = { args: { arrows: false, dots: true } }
export const DragLivre: Story = { args: { arrows: false, dragFree: true, align: 'start' } }
