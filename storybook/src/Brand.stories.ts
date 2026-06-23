import type { Meta, StoryObj } from '@storybook/vue3'

// Documenta os MODES da coleção `Brand` do Figma (DS-Theme-v5).
// Cada mode redefine a escala `primary/50…950`. Trocar de marca em runtime:
// toolbar "Brand" (ícone de pincel) no topo do Storybook.
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const MODES = [
  {
    name: 'Electric',
    note: 'Marca base (default no tokens.css). primary/500 = #1A6EFF.',
    scale: ['#E0ECFF', '#B3CFFF', '#80B4FF', '#4D96FF', '#2A7FFF', '#1A6EFF', '#1350B0', '#103A80', '#0D2B5E', '#0A1E42', '#071228'],
  },
  {
    name: 'Orange',
    note: 'Mode white-label (Tailwind orange). primary/500 = #F97316.',
    scale: ['#FFF7ED', '#FFEDD5', '#FED7AA', '#FDBA74', '#FB923C', '#F97316', '#EA580C', '#C2410C', '#9A3412', '#7C2D12', '#431407'],
  },
  {
    name: 'Lime',
    note: 'Mode white-label (Tailwind lime). primary/500 = #84CC16. Texto do botão sólido é escuro (lime claro → contraste AA).',
    scale: ['#F7FEE7', '#ECFCCB', '#D9F99D', '#BEF264', '#A3E635', '#84CC16', '#65A30D', '#4D7C0F', '#3F6212', '#365314', '#1A2E05'],
  },
]

const meta: Meta = {
  title: 'Foundations/Brand',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Modes da coleção **Brand** do Figma. Cada mode é uma marca (white-label) que redefine a escala `primary/50…950` — o resto do DS (botões, links, estados ativos) segue automaticamente via `--ui-primary`. Para trocar a marca em runtime, use o seletor **Brand** no toolbar (ícone de pincel).',
      },
    },
  },
  render: () => ({
    setup: () => ({ MODES, STEPS }),
    template: `
      <div style="padding:28px 32px; font-family:'Montserrat',sans-serif; color:#EEF1F6;">
        <h1 style="font-size:22px; font-weight:600; margin:0 0 4px;">Brand — modes</h1>
        <p style="font-size:13px; color:#9AA4B2; margin:0 0 24px; max-width:640px;">
          Cada mode redefine a escala <code>primary/50…950</code>. Troque a marca no toolbar <b>Brand</b> (ícone de pincel) — todas as stories seguem.
        </p>
        <div v-for="m in MODES" :key="m.name" style="margin-bottom:28px;">
          <div style="display:flex; align-items:baseline; gap:10px; margin-bottom:10px;">
            <span style="font-size:15px; font-weight:600;">{{ m.name }}</span>
            <span style="font-size:12px; color:#9AA4B2;">{{ m.note }}</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(11,1fr); gap:6px; max-width:760px;">
            <div v-for="(c,i) in m.scale" :key="i" style="text-align:center;">
              <div :style="{ background:c, height:'52px', borderRadius:'8px', border:'1px solid rgba(255,255,255,.08)' }"></div>
              <div style="font-size:9.5px; color:#9AA4B2; margin-top:4px;">{{ STEPS[i] }}</div>
              <div style="font-size:8.5px; color:#5F6878; font-family:monospace;">{{ c }}</div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
export default meta
type Story = StoryObj
export const Modes: Story = {}

// Bancada de teste: a MESMA composição de componentes reais (color="primary"),
// pra trocar o mode no toolbar "Brand" e avaliar contraste/comportamento.
export const Aplicacao: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: { description: { story: 'Mesma estrutura, qualquer marca. Troque o mode no toolbar "Brand" e observe contraste (texto sobre primary, estados ativos), foco e comportamento dos componentes reais.' } },
  },
  render: () => ({
    template: `
      <div style="padding:28px 32px; font-family:'Montserrat',sans-serif; display:flex; flex-direction:column; gap:24px; max-width:920px;">

        <section>
          <h3 style="font-size:13px; color:var(--ui-text-muted); margin:0 0 10px; text-transform:uppercase; letter-spacing:.6px;">Botões — variantes (color primary)</h3>
          <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center;">
            <UButton color="primary" variant="solid">Solid</UButton>
            <UButton color="primary" variant="outline">Outline</UButton>
            <UButton color="primary" variant="soft">Soft</UButton>
            <UButton color="primary" variant="subtle">Subtle</UButton>
            <UButton color="primary" variant="ghost">Ghost</UButton>
            <UButton color="primary" variant="link">Link</UButton>
            <UButton color="primary" variant="solid" loading>Loading</UButton>
            <UButton color="primary" variant="solid" disabled>Disabled</UButton>
          </div>
        </section>

        <section>
          <h3 style="font-size:13px; color:var(--ui-text-muted); margin:0 0 10px; text-transform:uppercase; letter-spacing:.6px;">Tamanhos</h3>
          <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center;">
            <UButton color="primary" size="xs">xs</UButton>
            <UButton color="primary" size="sm">sm</UButton>
            <UButton color="primary" size="md">md</UButton>
            <UButton color="primary" size="lg">lg</UButton>
            <UButton color="primary" size="xl">xl</UButton>
            <UButton color="primary" icon="i-lucide-plus">Com ícone</UButton>
          </div>
        </section>

        <section>
          <h3 style="font-size:13px; color:var(--ui-text-muted); margin:0 0 10px; text-transform:uppercase; letter-spacing:.6px;">Badges &amp; Chips</h3>
          <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center;">
            <UBadge color="primary" variant="solid">Solid</UBadge>
            <UBadge color="primary" variant="outline">Outline</UBadge>
            <UBadge color="primary" variant="soft">Soft</UBadge>
            <UBadge color="primary" variant="subtle">Subtle</UBadge>
            <UChip color="primary" inset><UButton color="neutral" variant="subtle" icon="i-lucide-bell" /></UChip>
          </div>
        </section>

        <section>
          <h3 style="font-size:13px; color:var(--ui-text-muted); margin:0 0 10px; text-transform:uppercase; letter-spacing:.6px;">Form — foco &amp; seleção</h3>
          <div style="display:flex; flex-wrap:wrap; gap:14px; align-items:center;">
            <UInput placeholder="Foco mostra o ring primary" style="width:260px" />
            <UCheckbox color="primary" :default-value="true" label="Checkbox" />
            <USwitch color="primary" :default-value="true" />
            <USlider color="primary" :default-value="60" style="width:180px" />
          </div>
        </section>

        <section>
          <h3 style="font-size:13px; color:var(--ui-text-muted); margin:0 0 10px; text-transform:uppercase; letter-spacing:.6px;">Progresso &amp; Alerta</h3>
          <div style="display:flex; flex-direction:column; gap:12px; max-width:520px;">
            <UProgress color="primary" :model-value="62" />
            <UAlert color="primary" variant="soft" title="Promoção ativa" description="Texto sobre fundo soft da marca — checar legibilidade." icon="i-lucide-megaphone" />
          </div>
        </section>

        <section>
          <h3 style="font-size:13px; color:var(--ui-text-muted); margin:0 0 10px; text-transform:uppercase; letter-spacing:.6px;">Contraste — texto sobre primary / primary sobre fundo</h3>
          <div style="display:flex; flex-wrap:wrap; gap:12px;">
            <div style="background:var(--ui-primary); color:var(--btn-solid-primary-text, #fff); padding:16px 20px; border-radius:10px; font-weight:600; font-size:14px;">Texto no botão sólido (precisa passar AA)</div>
            <div style="background:var(--ui-bg-elevated, #132036); color:var(--ui-primary); padding:16px 20px; border-radius:10px; font-weight:600; font-size:14px; border:1px solid var(--ui-border-muted, rgba(255,255,255,.1));">primary como texto sobre superfície</div>
          </div>
        </section>

      </div>
    `,
  }),
}
