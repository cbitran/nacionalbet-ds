# Paridade de Foundations — tokens.css ↔ Figma

Gerado de `tokens.css` (vivo) × `figma-styles.json` (2026-06-21). 11 famílias checadas + 4 documentadas.

**Resumo:** 🟡 0 divergências · 🔵 4 by-design · ⚪ 4 documentadas

| Sev | Família | Tipo | Detalhe |
|-----|---------|------|---------|
| 🔵 | Paleta de cor | by-design | ignorado: 'blue', 'orange' |
| 🔵 | Radius | by-design | ignorado: 'default' |
| 🔵 | Spacing | by-design | ignorado: '0-5', '1-5', '2-5', '3-5' |
| 🔵 | Tamanho de fonte | by-design | ignorado: '7xl', '8xl', '9xl' |
| ⚪ | Container | manual | --ui-container (1440) ↔ container-default / Grid 2xl |
| ⚪ | Cor semântica (--ui-*) | manual | coberto por Paint Styles + Colors vars; nomes divergem (--ui-primary ↔ color/primary) → conferência visual |
| ⚪ | Letter-spacing | code-only | Figma só aplica por text-style, não como token compartilhado |
| ⚪ | Motion (duration/ease) | code-only | Figma não tem primitivo de motion (variável/estilo) |
