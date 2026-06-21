# DS Backlog — NacionalBet (@nuxt/ui v4)

> Gerado pela skill `ds-gap-analysis` em 2026-06-20. Cruza os 121 componentes do @nuxt/ui v4
> com o que o DS já tem (stories em `storybook/src/` + Figma), priorizado para apostas/cassino mobile.
> Status Figma "a confirmar" onde o Desktop Bridge não foi consultado.

## Já no DS (✅)
**Componentes:** Accordion, Badge, Button, Checkbox, RadioGroup, Switch, Input, Select, SelectMenu, Slider, FormField, Form, Modal, Search.
**Foundations (Storybook):** Colors, Spacing, Radius, Typography, Shadows.

---

## P0 — Núcleo formulário (apostas/KYC/depósito) — em andamento
| Componente | Categoria | Props/variants principais | Nota |
|---|---|---|---|
| Textarea | form | size(xs–xl), state, rows, autoresize | parente do Input |
| InputNumber | form | size, min/max/step, steppers +/− | valores de aposta/depósito |
| PinInput | form | length(4–6), size, type | OTP / 2FA |
| InputDate | form | size, ícone calendário (campo fechado) | data nasc. / KYC |
| FileUpload | form | layout(área/botão), multiple, accept | documentos KYC |

## P1 — Alto valor (muito usados no produto)
| Componente | Categoria | Nota |
|---|---|---|
| Card | element | cards de jogo/evento, blocos |
| Chip | element | odds, contadores, status |
| Avatar (+Group) | element | perfil, times |
| Progress | element | limites, barras de tempo |
| Alert | element | avisos, mensagens de sistema |
| Separator | element | divisórias |
| Skeleton | element | loading de listas/cards |
| Toast | overlay | feedback de ações (aposta feita, erro) |
| Tooltip | overlay | dicas, info de odds |
| DropdownMenu | overlay | menus de ação |
| Drawer | overlay | menu mobile / bet slip lateral |
| Tabs | navigation | esportes/mercados, abas de conta |
| Pagination | navigation | listas longas (histórico) |
| Stepper | navigation | cadastro/KYC multi-etapa |
| Table | data | histórico de apostas/transações |
| Empty | data | estados vazios |

## P2 — Úteis (segunda leva)
| Componente | Categoria |
|---|---|
| CheckboxGroup, InputMenu, Listbox, InputTags, InputTime | form |
| Collapsible, FieldGroup, Kbd, Icon, Calendar | element |
| Popover, Slideover, ContextMenu | overlay |
| NavigationMenu, Breadcrumb, Link, CommandPalette | navigation |
| Carousel, ScrollArea, User, Timeline, Marquee, Tree | data |
| Container, Header, Footer, Sidebar | layout (estrutural) |

## P3 — Fora de escopo (não criar sem pedido explícito)
- **page** (23): auth-form, blog-*, changelog-*, page-*, pricing-* — marketing/docs.
- **content** (5), **chat** (8), **editor** (6), **dashboard** (10, admin), **color-mode** (5, produto é dark-only), **i18n** (1).
- **form/ColorPicker** — improvável em apostas.
- **layout**: app (já usado como wrapper no preview), error, main, theme.

---

## Foundations / Tokens — paridade Figma ↔ código
| Token | tokens.css | Storybook | Figma | Ação |
|---|---|---|---|---|
| Cores | ✅ | ✅ Colors | ✅ Variable Styles | ok |
| Spacing | ✅ | ✅ Spacing | ✅ | ok |
| Radius | ✅ | ✅ Radius | ✅ | ok |
| Tipografia | ✅ (namespace corrigido `--text-*`) | ✅ Typography | ✅ Text Styles | ok |
| Shadows/Glow | ✅ §7 | ✅ Shadows | ❓ Effect Styles **a confirmar** | tokenizar no Figma se ausente |
| Motion/Animações | ✅ §8 | ❌ sem story | ❌ | documentar no SB + avaliar no Figma |

---

## Pipeline (como este backlog é consumido)
1. **`ds-gap-analysis`** (esta análise) → este arquivo.
2. **`figma-component-builder`** (a construir) → cria cada item no Figma (assistido, validação visual).
3. **`figma-to-story`** (pronta) → gera a `.stories.ts`; o auto-registro faz renderizar.
