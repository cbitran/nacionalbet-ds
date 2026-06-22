import type { Meta, StoryObj } from '@storybook/vue3'

// Página de capa do Storybook — primeira coisa que o time vê. Hero com a marca
// nacional.bet, números do DS e atalhos pras seções. Layout fullscreen (ocupa o canvas).
const meta: Meta = {
  title: 'Introduction',
  // Sem autodocs aqui: a capa não precisa da página "Docs" gerada — ela é a própria home.
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
    docs: { disable: true },
  },
}
export default meta
type Story = StoryObj

export const Welcome: Story = {
  name: 'nacional.bet DS',
  render: () => ({
    template: `
    <div style="min-height:100vh;background:
        radial-gradient(1200px 500px at 80% -10%, rgba(26,110,255,.18), transparent 60%),
        radial-gradient(900px 500px at -10% 110%, rgba(124,77,255,.16), transparent 55%),
        #0D1B2E;color:#E5E9F0;font-family:Montserrat,sans-serif;padding:64px 56px;box-sizing:border-box;">

      <div style="max-width:980px;margin:0 auto;">
        <!-- hero -->
        <span style="display:inline-block;font-size:12px;letter-spacing:.14em;text-transform:uppercase;
            color:#8A96AC;border:1px solid #1A2B47;border-radius:999px;padding:6px 14px;">Design System</span>

        <h1 style="font-size:64px;line-height:1.05;font-weight:800;margin:24px 0 0;letter-spacing:-.02em;">
          nacional<span style="color:#1A6EFF;">.bet</span>
        </h1>
        <p style="font-size:20px;color:#B7C0D0;max-width:620px;margin:18px 0 0;line-height:1.5;">
          A base visual de apostas — componentes, tokens e padrões em
          <strong style="color:#fff;">Figma + código</strong>, com paridade garantida por harness.
        </p>

        <!-- stats -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:48px 0 0;">
          ${stat('35', 'Componentes', 'forms, overlays, navegação, dados')}
          ${stat('10+', 'Foundations', 'cor, espaço, tipo, grids, efeitos')}
          ${stat('100%', 'Paridade', 'Figma ↔ CSS · 🔴0 🟡0', '#1A6EFF')}
        </div>

        <!-- nav -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:20px 0 0;">
          ${card('🎨', 'Foundations', 'Cores, espaçamento, tipografia, contraste e efeitos.', 'foundations-colors--docs')}
          ${card('🧩', 'Components', '35 componentes prontos, do Button à Table.', 'components-button--docs')}
          ${card('📐', 'Spacing semântico', 'Quando usar gap vs padding.', 'foundations-spacing-semântico--quando-usar')}
        </div>

        <!-- footer -->
        <div style="display:flex;align-items:center;gap:16px;margin:48px 0 0;padding-top:24px;
            border-top:1px solid #1A2B47;color:#8A96AC;font-size:13px;flex-wrap:wrap;">
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:#22C55E;margin-right:7px;"></span>@nuxt/ui v4 · Tailwind v4 · Vue 3</span>
          <span style="color:#3a4a66;">•</span>
          <span>Fonte Montserrat · navy + electric blue</span>
        </div>
      </div>
    </div>`,
  }),
}

function stat(num: string, label: string, sub: string, accent = '#E5E9F0') {
  return `<div style="background:#132036;border:1px solid #1A2B47;border-radius:14px;padding:22px 20px;">
    <div style="font-size:38px;font-weight:800;line-height:1;color:${accent};">${num}</div>
    <div style="font-size:14px;font-weight:600;margin:10px 0 4px;">${label}</div>
    <div style="font-size:12px;color:#8A96AC;line-height:1.4;">${sub}</div>
  </div>`
}

function card(icon: string, title: string, desc: string, storyId: string) {
  return `<a href="?path=/${storyId.includes('--docs') ? 'docs' : 'story'}/${storyId}" target="_top"
      style="display:block;text-decoration:none;background:#132036;border:1px solid #1A2B47;border-radius:14px;
        padding:20px;transition:border-color .15s,transform .15s;"
      onmouseover="this.style.borderColor='#1A6EFF';this.style.transform='translateY(-2px)'"
      onmouseout="this.style.borderColor='#1A2B47';this.style.transform='none'">
    <div style="font-size:24px;">${icon}</div>
    <div style="font-size:15px;font-weight:700;color:#E5E9F0;margin:12px 0 6px;">${title} <span style="color:#1A6EFF;">→</span></div>
    <div style="font-size:13px;color:#8A96AC;line-height:1.45;">${desc}</div>
  </a>`
}
