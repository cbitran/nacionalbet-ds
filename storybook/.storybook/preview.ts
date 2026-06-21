import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createMemoryHistory, createRouter } from 'vue-router'
import ui from '@nuxt/ui/vue-plugin'
import '../src/main.css'
// Manifesto AUTO-GERADO com TODOS os componentes do @nuxt/ui (scripts/gen-nuxt-ui-components.mjs,
// rodado pelo main.ts no boot). Registramos globalmente porque as stories usam <U*> em
// template string runtime — que não passa pelo auto-import build-time do @nuxt/ui. Assim
// qualquer componente novo já funciona numa story SEM editar este arquivo.
import { nuxtUiComponents } from './nuxt-ui-components.generated'
import theme from './theme'
import './docs.css'

// vue-router de memória: o @nuxt/ui usa <ULink> (useRoute/useRouter) em vários
// componentes (Breadcrumb, Pagination, Tabs…). Sem um router, eles avisam
// "injection Symbol(route location) not found". Um router stub elimina isso.
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }],
})

setup((app) => {
  app.use(ui) // plugins (color-mode/head) + overlays/toasts
  app.use(router)
  for (const [name, c] of Object.entries(nuxtUiComponents)) app.component(name, c)
})

const preview: Preview = {
  // Autodocs global: gera uma página "Docs" por componente (descrição + tabela de
  // args/controls + todas as variações numa página). Facilita o handoff pro front.
  tags: ['autodocs'],
  // Envolve TODA story num <UApp>: provê os providers de tooltip/overlay/toast do
  // reka-ui. Sem ele, componentes como UTooltip dão erro "must be used within
  // TooltipProvider". <UApp> já está registrado globalmente pelo manifesto.
  decorators: [() => ({ template: '<UApp><story /></UApp>' })],
  parameters: {
    layout: 'centered',
    docs: { theme }, // páginas Docs em navy (não mais fundo branco)
    backgrounds: {
      default: 'navy',
      values: [
        { name: 'navy', value: '#0D1B2E' },
        { name: 'surface', value: '#132036' },
      ],
    },
    controls: { expanded: true },
  },
}

export default preview
