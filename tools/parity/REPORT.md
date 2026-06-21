# Relatório de Paridade — Figma ↔ @nuxt/ui

Gerado a partir de `figma-sets.json` (2026-06-21) × `code-props.json` (2026-06-21).

**Resumo:** 🔴 0 · 🟡 0 · 🔵 31 · ⚪ 4

| Sev | Componente | Eixo | Achado |
|-----|-----------|------|--------|
| 🔵 LOW | Badge | size | 'xs', 'xl' fora da escala oficial (3 sizes) — por design |
| 🔵 LOW | Checkbox | size | single-size por design — escala oficial é sm/md/lg, não aplicada a este componente |
| 🔵 LOW | Checkbox | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Chip | size | single-size por design — escala oficial é sm/md/lg, não aplicada a este componente |
| 🔵 LOW | FileUpload | size | 'xs', 'xl' fora da escala oficial (3 sizes) — por design |
| 🔵 LOW | FileUpload | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | FormField | size | single-size por design — escala oficial é sm/md/lg, não aplicada a este componente |
| 🔵 LOW | Input | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | Input | size | 'xs', 'xl' fora da escala oficial (3 sizes) — por design |
| 🔵 LOW | Input | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | InputDate | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | InputDate | size | 'xs', 'xl' fora da escala oficial (3 sizes) — por design |
| 🔵 LOW | InputDate | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | InputNumber | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | InputNumber | size | 'xs', 'xl' fora da escala oficial (3 sizes) — por design |
| 🔵 LOW | InputNumber | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | PinInput | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | PinInput | size | 'xs', 'xl' fora da escala oficial (3 sizes) — por design |
| 🔵 LOW | PinInput | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Select | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | Select | size | 'xs', 'xl' fora da escala oficial (3 sizes) — por design |
| 🔵 LOW | Select | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Separator | size | single-size por design — escala oficial é sm/md/lg, não aplicada a este componente |
| 🔵 LOW | Separator | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Slider | size | single-size por design — escala oficial é sm/md/lg, não aplicada a este componente |
| 🔵 LOW | Slider | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Switch | size | 'xs', 'xl' fora da escala oficial (3 sizes) — por design |
| 🔵 LOW | Switch | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Textarea | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | Textarea | size | 'xs', 'xl' fora da escala oficial (3 sizes) — por design |
| 🔵 LOW | Textarea | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| ⚪ INFO | MenuItem | - | pulado: Interno de Select/DropdownMenu — não é componente público |
| ⚪ INFO | Radio | - | pulado: No @nuxt/ui o componente é RadioGroup (variant card/list/table, size xs-xl, color, orientation) — revisar manualmente |
| ⚪ INFO | Search | - | pulado: Não é componente do @nuxt/ui (é Input type=search ou InputMenu) — revisar manualmente |
| ⚪ INFO | SectionHeader | - | pulado: Composite/pattern (USeparator + UButton) — sem componente único no @nuxt/ui; paridade não se aplica |

Legenda: 🔴 quebra de paridade (corrigir) · 🟡 cobertura incompleta · 🔵 por design / informativo · ⚪ ignorado.
