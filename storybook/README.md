# Storybook — nacional.bet Design System

Espelho de código da biblioteca Figma. Stack: **Vue 3 + @nuxt/ui v4 + Tailwind v4 + Storybook (Vite)**.

## Rodar

```bash
cd storybook
npm install
npm run storybook   # http://localhost:6006
```

## Como o tema funciona (a ponte)

`src/main.css` importa `../../tokens.css` — a **mesma fonte da verdade** do Figma. Como o `tokens.css` define as variáveis semânticas que o Nuxt UI consome (`--ui-primary`, `--ui-bg`, etc.), a marca/tema aparece automaticamente. Mudou o token → muda Figma e Storybook juntos.

## White-label

Para previewar outra marca, troque os valores de `--ui-primary*` (e a escala primary) — o equivalente a mudar o **mode da coleção `Brand`** no Figma. Estrutura recomendada: um arquivo de tema por marca (`themes/electric.css`, `themes/orange.css`) importado no lugar do default.

## Stories

- `src/Button.stories.ts` — Playground + Variants + Colors + WithIcon.
- Próximas: Badge, Input, Select, Checkbox/Radio/Switch, Slider, Modal, Form. Cada story mapeia 1:1 nas variant properties do Component Set Figma.

## Status (2026-06-20)

✅ **Funciona**: `npm install` + `npm run build-storybook` (build verde). O **tema carrega** (fundo navy `bg/default` confirmado no browser via tokens.css). 12 arquivos de stories escritos.

🔴 **Blocker conhecido — componentes não renderizam ainda**: o @nuxt/ui auto-importa componentes em **tempo de compilação** (só em arquivos `.vue`). As stories CSF usam `template:` em **runtime**, então `<UButton>` cai como elemento inerte (`<ubutton>` no DOM). Tentativas:
- `app.use(ui)` no preview → não registra componentes globalmente.
- `import UButton from '@nuxt/ui/components/Button.vue'` no preview → o bundler de preview do Storybook (esbuild) não aplica o plugin Vue → erro de parse no `.vue`.

### Solução recomendada (próxima sessão)
1. **Trocar o framework para `@storybook/nuxt`** (Storybook rodando sobre Nuxt) — lida com o auto-import do @nuxt/ui nativamente. É o caminho mais limpo.  
   OU
2. **Escrever as stories como componentes `.vue` (SFC)** — aí o plugin Vite do @nuxt/ui auto-importa em tempo de compilação. Converter os `template:` string atuais em `.vue`.
3. Usar o **MCP do NuxtUI** (`nuxt-ui-remote`, já configurado) p/ confirmar props/slots exatos e o nome real das variáveis de tema (nosso tokens.css usa `--ui-primary` etc.).

### Deps necessárias (já no package.json)
`vue-router@4` (o `useRoute` do @nuxt/ui), `react`+`react-dom@18` (UI do manager do Storybook), `@storybook/addon-essentials`, `typescript`.
