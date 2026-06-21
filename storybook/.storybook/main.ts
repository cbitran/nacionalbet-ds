import type { StorybookConfig } from '@storybook/vue3-vite'
import { generate } from '../scripts/gen-nuxt-ui-components.mjs'

// Regenera .storybook/nuxt-ui-components.generated.ts a partir do @nuxt/ui instalado,
// no boot do Storybook (dev e build). Mantém o manifesto sempre em dia — qualquer
// componente novo do @nuxt/ui é registrado sem edição manual.
generate({ silent: true })

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|js)'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/vue3-vite', options: {} },
  // Harmoniza as cores dos ícones da sidebar com o tema navy/electric (os defaults
  // do Storybook são amarelo p/ Docs e ciano p/ Story — destoam do DS). Mantém a
  // distinção: Docs = electric, Story = neutro claro.
  managerHead: (head) => `${head}
    <style>
      [data-nodetype="document"] svg { color: #1a6eff !important; }   /* Docs → electric */
      [data-nodetype="story"] svg { color: #8a96ac !important; }      /* Story → neutro */
    </style>`,
  // @nuxt/ui/vite só tem condição ESM → carrega via dynamic import (evita o require CJS do Storybook)
  viteFinal: async (cfg, { configType }) => {
    const { default: vue } = await import('@vitejs/plugin-vue')
    const { default: ui } = await import('@nuxt/ui/vite')
    // GitHub Pages serve em subpath (cbitran.github.io/nacionalbet-ds/). Só no build
    // de produção — no dev o base continua '/'. Se mudar o nome do repo, ajustar aqui.
    if (configType === 'PRODUCTION') cfg.base = '/nacionalbet-ds/'
    cfg.plugins = cfg.plugins ?? []
    // O preset @storybook/vue3-vite NÃO registra o @vitejs/plugin-vue (só docgen +
    // template-compilation). Sem ele nenhum .vue é compilado e os <U*> do @nuxt/ui
    // (auto-importados em build-time) nunca resolvem. vue() ANTES de ui() para o
    // unplugin-vue-components do @nuxt/ui conseguir auto-importar os componentes.
    cfg.plugins.push(vue(), ui())
    return cfg
  },
}
export default config
