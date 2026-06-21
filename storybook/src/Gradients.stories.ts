import type { Meta, StoryObj } from '@storybook/vue3'

// Foundations/Gradients — camada de decoração do DS (NÃO é cor semântica do @nuxt/ui).
// Definido em tokens.css §6.5 como `--gradient-primary` + utilitário `.bg-gradient-primary`.
// No Figma vive como Paint Style "gradient/primary" (não é variável → não troca por modo de marca).
const meta: Meta = {
  title: 'Foundations/Gradients',
  parameters: {
    docs: {
      description: {
        component:
          'Gradientes do DS. O @nuxt/ui só conhece cores sólidas — gradiente é uma camada de estilo aplicada via classe `bg-gradient-primary` (ou `var(--gradient-primary)`), não uma prop `color`. Hoje: `gradient/primary` (electric-500 → purple-600), para hero/CTA de marca e destaques. No Figma é um Paint Style.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Primary: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-6" style="max-width:560px">
      <div>
        <div class="bg-gradient-primary" style="height:120px;border-radius:12px"></div>
        <div class="mt-2 text-sm text-muted">
          <code>gradient/primary</code> · electric-500 → purple-600 · #1A6EFF → #9333EA · 135°
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <UButton label="Apostar agora" size="lg" :ui="{ base: 'bg-gradient-primary border-0' }" />
        <div class="bg-gradient-primary" style="width:120px;height:72px;border-radius:12px"></div>
        <div class="text-sm text-muted">Uso: hero / CTA de marca, FAB, destaque</div>
      </div>
    </div>`,
  }),
}

// Como aplicar
export const Usage: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-3 text-sm" style="max-width:560px">
      <div class="text-muted">Classe utilitária (recomendado):</div>
      <pre class="bg-elevated p-3 rounded-md text-xs overflow-auto"><code>&lt;UButton :ui="{ base: 'bg-gradient-primary border-0' }" /&gt;</code></pre>
      <div class="text-muted">Ou via variável CSS:</div>
      <pre class="bg-elevated p-3 rounded-md text-xs overflow-auto"><code>style="background: var(--gradient-primary)"</code></pre>
    </div>`,
  }),
}
