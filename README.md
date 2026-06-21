# nacional.bet — Design System

Design System dark theme ("navy + electric blue") para **nacional.bet**, construído sobre
**NuxtUI v4** + **Tailwind CSS v4**, documentado em Storybook.

📖 **Storybook ao vivo:** https://cbitran.github.io/nacionalbet-ds/

## Stack

- **NuxtUI v4** (125+ componentes Vue acessíveis) + **Tailwind CSS v4**
- **Storybook 8** (Vite) — auto-registro de todos os componentes do `@nuxt/ui`
- Tipografia **Montserrat** (JetBrains Mono só para odds)
- Spacing em grade de 4 (4 / 8 / 12 / 16…)

## Rodar localmente

```bash
cd storybook
npm install
npm run storybook      # dev em http://localhost:6006
npm run build-storybook # build estático em storybook/storybook-static
```

## Arquitetura de tokens (3 camadas)

```
--color-electric-500: #1A6EFF            ← PRIMITIVE (valor bruto, nunca usar direto)
        ↓
--ui-primary: var(--color-electric-500)  ← SEMANTIC (propósito funcional)
        ↓
--btn-solid-primary-bg: var(--ui-primary) ← COMPONENT (componente específico)
```

Regra de ouro: o código nunca usa primitives diretamente — sempre semantic ou component tokens.

## Fonte da verdade

[`tokens.css`](tokens.css) alimenta simultaneamente o **Figma** (Color Styles + Variables) e o
**Storybook** (mesmo CSS importado). Quando um token muda, os dois lados acompanham.
[`spacing-grid-4.css`](spacing-grid-4.css) força a grade de 4 sobre os utilitários do Tailwind.

## Cores principais

| Token | Valor | Uso |
|---|---|---|
| `--ui-primary` | `#1A6EFF` | CTAs, botões, links ativos |
| `--ui-bg` | `#0D1B2E` | Fundo raiz |
| `--ui-bg-elevated` | `#1A2B47` | Cards, rows |
| `--ui-success` | `#22C55E` | Confirmações |
| `--ui-error` | `#EF4444` | Erros, badge LIVE |

## Componentes

Foundations (Colors, Spacing, Radius, Typography, Shadows) + componentes de formulário e UI.
Veja o backlog priorizado em [`DS-BACKLOG.md`](DS-BACKLOG.md).

## Deploy

O Storybook é publicado automaticamente no GitHub Pages a cada push na `main`
([workflow](.github/workflows/deploy.yml)).

---
nacional.bet Design System · 2026
