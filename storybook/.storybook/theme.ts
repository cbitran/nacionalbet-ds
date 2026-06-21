import { create } from '@storybook/theming'

// Tema navy do Storybook (chrome + docs), alinhado ao DS — acaba com o fundo branco
// das páginas Docs. Escala navy do tokens.css: 950 #071428 · 900 #0D1B2E · 800 #132036
// · 700 #1A2B47 · 600 #243758. Primary electric #1A6EFF.
export default create({
  base: 'dark',
  brandTitle: 'nacional.bet — Design System',

  // superfícies (do mais escuro p/ o conteúdo um tom acima → leve elevação)
  appBg: '#071428', // navy-950 — sidebar / fundo geral
  appContentBg: '#0D1B2E', // navy-900 — canvas e páginas Docs (era branco)
  appPreviewBg: '#0D1B2E',
  appBorderColor: '#1A2B47', // navy-700
  appBorderRadius: 8,

  // barras / toolbar
  barBg: '#132036', // navy-800
  barTextColor: '#8A96AC',
  barSelectedColor: '#1A6EFF',
  barHoverColor: '#1A6EFF',

  // marca / ações
  colorPrimary: '#1A6EFF',
  colorSecondary: '#1A6EFF',

  // texto
  textColor: '#E5E9F0',
  textMutedColor: '#8A96AC',
  textInverseColor: '#0D1B2E',

  // inputs
  inputBg: '#132036',
  inputBorder: '#1A2B47',
  inputTextColor: '#E5E9F0',
  inputBorderRadius: 6,

  fontCode: '"JetBrains Mono", "Fira Code", monospace',
})
