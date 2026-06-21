import type { Meta, StoryObj } from '@storybook/vue3'

// Foundations/Typography Responsive — escala fluida (tokens.css §5.5).
// font-size E line-height mudam no breakpoint `lg` (1024px).
// As classes .t-* ligam tamanho+entrelinha; peso/cor ficam separados.
// No Figma: coleção "Type Scale" (modos Mobile/Desktop) com vars FLOAT
// font/<role>-size e font/<role>-lh (Text Styles não suportam modos).
const meta: Meta = {
  title: 'Foundations/Typography Responsive',
  parameters: {
    docs: {
      description: {
        component:
          'Escala tipográfica **responsiva**: `font-size` E `line-height` mudam no breakpoint `lg` (1024px). Mobile-first — o valor base vale abaixo de 1024px, `lg:` vale a partir de 1024px. Use as classes de papel `.t-display`, `.t-h1`…`.t-caption` (só tamanho + entrelinha; peso/cor são separados). **Redimensione a janela** cruzando 1024px para ver a troca. Espelha a coleção "Type Scale" (modos Mobile/Desktop) no Figma.',
      },
    },
  },
}
export default meta
type Story = StoryObj

const ROLES = [
  { cls: 't-display', name: 'display', m: '36 / 40', d: '72 / 76', sample: 'Aposte com inteligência' },
  { cls: 't-h1',      name: 'h1',      m: '28 / 34', d: '48 / 52', sample: 'Campeonato Brasileiro' },
  { cls: 't-h2',      name: 'h2',      m: '24 / 30', d: '36 / 40', sample: 'Jogos de hoje' },
  { cls: 't-h3',      name: 'h3',      m: '20 / 28', d: '28 / 36', sample: 'Mercados em destaque' },
  { cls: 't-title',   name: 'title',   m: '18 / 26', d: '20 / 28', sample: 'Flamengo x Palmeiras' },
  { cls: 't-body',    name: 'body',    m: '18 / 28', d: '16 / 24', sample: 'No mobile o corpo cresce para leitura confortável; no desktop ele recua para densidade.' },
  { cls: 't-small',   name: 'small',   m: '14 / 20', d: '13 / 20', sample: 'Termos e condições aplicáveis a esta promoção.' },
  { cls: 't-caption', name: 'caption', m: '12 / 16', d: '12 / 16', sample: 'Atualizado há 2 minutos' },
]

export const Scale: Story = {
  render: () => ({
    setup: () => ({ roles: ROLES }),
    template: `<div class="flex flex-col gap-8" style="max-width:760px">
      <div class="rounded-md p-3 text-sm" style="background:var(--ui-bg-muted);color:var(--ui-text-muted)">
        ↔︎ Redimensione a janela cruzando <strong>1024px</strong> para ver tamanho e entrelinha mudarem.
        Valores em <code>px</code> como <code>tamanho / entrelinha</code>.
      </div>

      <div v-for="r in roles" :key="r.cls" class="flex flex-col gap-2"
           style="border-bottom:1px solid var(--ui-border);padding-bottom:20px">
        <div class="flex flex-wrap items-baseline gap-3 text-xs" style="color:var(--ui-text-dimmed)">
          <code style="color:var(--ui-text)">.{{ r.cls }}</code>
          <span>mobile <strong style="color:var(--ui-text-muted)">{{ r.m }}</strong></span>
          <span>desktop <strong style="color:var(--ui-text-muted)">{{ r.d }}</strong></span>
        </div>
        <div :class="r.cls" style="color:var(--ui-text)">{{ r.sample }}</div>
      </div>
    </div>`,
  }),
}

// Comparação lado a lado: parágrafo longo em body para sentir a entrelinha
export const BodyReadability: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-3" style="max-width:680px">
      <div class="text-sm" style="color:var(--ui-text-dimmed)">
        <code>.t-body</code> — mobile 18/28 → desktop 16/24. Redimensione para sentir a entrelinha.
      </div>
      <p class="t-body" style="color:var(--ui-text)">
        A nacional.bet oferece os melhores mercados de futebol, basquete e e-sports com odds
        atualizadas em tempo real. Crie sua aposta, acompanhe o placar ao vivo e saque com
        segurança. No mobile, o corpo do texto cresce e a entrelinha abre para leitura confortável
        com o aparelho na mão; no desktop, o texto compacta para caber mais informação na tela.
      </p>
    </div>`,
  }),
}

// Como usar no código
export const Usage: Story = {
  render: () => ({
    template: `<div class="flex flex-col gap-3 text-sm" style="max-width:620px">
      <div style="color:var(--ui-text-muted)">Aplique a classe de papel + peso/cor separados:</div>
      <pre class="rounded-md p-3 text-xs overflow-auto" style="background:var(--ui-bg-elevated)"><code>&lt;h1 class="t-h1 font-bold"&gt;Campeonato Brasileiro&lt;/h1&gt;
&lt;p class="t-body text-muted"&gt;Descrição do mercado…&lt;/p&gt;
&lt;span class="t-caption text-dimmed"&gt;Atualizado agora&lt;/span&gt;</code></pre>
      <div style="color:var(--ui-text-muted)">As classes só definem tamanho + entrelinha (responsivos). Peso (<code>font-bold</code>) e cor (<code>text-muted</code>) ficam livres.</div>
    </div>`,
  }),
}
