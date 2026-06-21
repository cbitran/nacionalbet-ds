# Relatório de Paridade — Figma ↔ @nuxt/ui

Gerado a partir de `figma-sets.json` (2026-06-21) × `code-props.json` (2026-06-21).

**Resumo:** 🔴 0 · 🟡 13 · 🔵 16 · ⚪ 3

| Sev | Componente | Eixo | Achado |
|-----|-----------|------|--------|
| 🟡 MED | Badge | size | falta no Figma: 'xs', 'xl'  (código=[xs, sm, md, lg, xl] · figma=[sm, md, lg]) |
| 🟡 MED | Checkbox | variant | código tem 'variant' [card, list] mas não há propriedade 'variant' no Figma |
| 🟡 MED | Checkbox | size | código tem 'size' [xs, sm, md, lg, xl] mas não há propriedade 'size' no Figma |
| 🟡 MED | FileUpload | size | falta no Figma: 'xs', 'xl'  (código=[xs, sm, md, lg, xl] · figma=[sm, md, lg]) |
| 🟡 MED | FormField | size | código tem 'size' [xs, sm, md, lg, xl] mas não há propriedade 'size' no Figma |
| 🟡 MED | Input | size | falta no Figma: 'xs', 'xl'  (código=[xs, sm, md, lg, xl] · figma=[sm, md, lg]) |
| 🟡 MED | InputDate | size | falta no Figma: 'xs', 'xl'  (código=[xs, sm, md, lg, xl] · figma=[sm, md, lg]) |
| 🟡 MED | InputNumber | size | falta no Figma: 'xs', 'xl'  (código=[xs, sm, md, lg, xl] · figma=[sm, md, lg]) |
| 🟡 MED | PinInput | size | falta no Figma: 'xs', 'xl'  (código=[xs, sm, md, lg, xl] · figma=[sm, md, lg]) |
| 🟡 MED | Select | size | falta no Figma: 'xs', 'xl'  (código=[xs, sm, md, lg, xl] · figma=[sm, md, lg]) |
| 🟡 MED | Slider | size | código tem 'size' [xs, sm, md, lg, xl] mas não há propriedade 'size' no Figma |
| 🟡 MED | Switch | size | falta no Figma: 'xs', 'sm', 'xl'  (código=[xs, sm, md, lg, xl] · figma=[md, lg]) |
| 🟡 MED | Textarea | size | falta no Figma: 'xs', 'xl'  (código=[xs, sm, md, lg, xl] · figma=[sm, md, lg]) |
| 🔵 LOW | Checkbox | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | FileUpload | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Input | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | Input | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | InputDate | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | InputDate | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | InputNumber | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | InputNumber | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | PinInput | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | PinInput | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Select | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | Select | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Slider | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Switch | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| 🔵 LOW | Textarea | variant | 'none' (campo sem chrome) não modelado no Figma — por design |
| 🔵 LOW | Textarea | color | código expõe color (7 opções) mas o Figma não modela cor como propriedade (provável: cor via estado) — por design? |
| ⚪ INFO | MenuItem | - | pulado: Interno de Select/DropdownMenu — não é componente público |
| ⚪ INFO | Radio | - | pulado: No @nuxt/ui o componente é RadioGroup (variant card/list/table, size xs-xl, color, orientation) — revisar manualmente |
| ⚪ INFO | Search | - | pulado: Não é componente do @nuxt/ui (é Input type=search ou InputMenu) — revisar manualmente |

Legenda: 🔴 quebra de paridade (corrigir) · 🟡 cobertura incompleta · 🔵 por design / informativo · ⚪ ignorado.
