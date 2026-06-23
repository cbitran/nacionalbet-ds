import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import ui from '@nuxt/ui/vue-plugin'
import '../src/main.css'
// Manifesto AUTO-GERADO com TODOS os componentes do @nuxt/ui (scripts/gen-nuxt-ui-components.mjs,
// rodado pelo main.ts no boot). Registramos globalmente porque as stories usam <U*> em
// template string runtime — que não passa pelo auto-import build-time do @nuxt/ui. Assim
// qualquer componente novo já funciona numa story SEM editar este arquivo.
import { nuxtUiComponents } from './nuxt-ui-components.generated'
import theme from './theme'
import './docs.css'
// Espelho dos modes da coleção `Brand` (Figma). Default = Electric (já no tokens.css).
// O Lime é injetado como <style> quando selecionado no toolbar "Brand".
import limeBrand from '../../themes/lime.css?inline'

// vue-router de memória: o @nuxt/ui usa <ULink> (useRoute/useRouter) em vários
// componentes (Breadcrumb, Pagination, Tabs…). Sem um router, eles avisam
// "injection Symbol(route location) not found". Um router stub elimina isso.
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }],
})

setup((app) => {
  // Fora do Nuxt, o @nuxt/ui precisa de um head provider explícito: o plugin de cores
  // injeta <style> com as CSS vars das cores via useHead(). Sem isso, qualquer story que
  // renderiza um componente colorido (Button, etc.) quebra com "useHead() was called
  // without provide context". O Nuxt fornece isso automaticamente; aqui instalamos à mão.
  app.use(createHead())
  app.use(ui) // plugins (color-mode/head) + overlays/toasts
  app.use(router)
  for (const [name, c] of Object.entries(nuxtUiComponents)) app.component(name, c)
})

const preview: Preview = {
  // Autodocs global: gera uma página "Docs" por componente (descrição + tabela de
  // args/controls + todas as variações numa página). Facilita o handoff pro front.
  tags: ['autodocs'],
  // Seletor de marca (mode da coleção `Brand` no Figma). Troca a escala primary
  // em runtime — equivale a mudar o mode no Figma.
  globalTypes: {
    brand: {
      description: 'Marca (mode da coleção Brand)',
      defaultValue: 'electric',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'electric', title: 'Electric (default)' },
          { value: 'lime', title: 'Lime' },
        ],
        dynamicTitle: true,
      },
    },
  },
  // Envolve TODA story num <UApp>: provê os providers de tooltip/overlay/toast do
  // reka-ui. Sem ele, componentes como UTooltip dão erro "must be used within
  // TooltipProvider". <UApp> já está registrado globalmente pelo manifesto.
  // O side-effect aplica/remove o tema da marca selecionada no toolbar.
  decorators: [
    (story, context) => {
      if (typeof document !== 'undefined') {
        let el = document.getElementById('sb-brand-override') as HTMLStyleElement | null
        if (!el) {
          el = document.createElement('style')
          el.id = 'sb-brand-override'
          document.head.appendChild(el)
        }
        el.textContent = context.globals.brand === 'lime' ? limeBrand : ''
      }
      return { template: '<UApp><story /></UApp>' }
    },
  ],
  parameters: {
    layout: 'centered',
    // Capa primeiro, depois fundações, componentes e padrões. Dentro de cada grupo
    // a ordem segue alfabética (default).
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Components', 'Patterns', '*'] },
    },
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
