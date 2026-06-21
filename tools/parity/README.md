# Harness de Paridade Figma ↔ código (Camada 1)

Valida que cada Component Set no Figma expõe as mesmas opções (`variant`/`size`/`color`)
que o componente real do `@nuxt/ui` — pega furos como "FileUpload no Figma só tem
`variant=area` mas o código tem `area` e `button`".

## Rodar

```bash
node tools/parity/audit.mjs        # relatório colorido no terminal (exit 1 se houver 🔴 HIGH)
node tools/parity/audit.mjs --md   # markdown → use `> tools/parity/REPORT.md`
```

## Entradas (regenerar quando o DS mudar)

São dois snapshots JSON. O comparador é puro; só as entradas precisam ser atualizadas.

### 1. `figma-sets.json` — variant properties do Figma
Com o plugin figma-console conectado ao arquivo do DS, rodar via `figma_execute`:

```js
await figma.loadAllPagesAsync();
const out = [];
const walk = (n) => {
  if (n.type === 'COMPONENT_SET') {
    const v = {};
    for (const [k, d] of Object.entries(n.componentPropertyDefinitions || {}))
      if (d.type === 'VARIANT') v[k.split('#')[0]] = d.variantOptions;
    out.push({ name: n.name, variants: v });
  }
  if ('children' in n) n.children.forEach(walk);
};
figma.root.children.forEach(p => p.children.forEach(walk));
return out;
```

### 2. `code-props.json` — enums do @nuxt/ui
Via nuxt-ui MCP `get-component-metadata` por componente; extrair os enums com jq:

```bash
jq -c '{
  variant: [.metadata.props[]?|select(.name=="variant")|.schema.schema[]?|select(.!="undefined")|gsub("\"";"")],
  size:    [.metadata.props[]?|select(.name=="size")   |.schema.schema[]?|select(.!="undefined")|gsub("\"";"")],
  color:   [.metadata.props[]?|select(.name=="color")  |.schema.schema[]?|select(.!="undefined")|gsub("\"";"")]
}' <arquivo-metadata.json>
```

## Severidades

- 🔴 **HIGH** — quebra de paridade: opção que existe num lado e falta no outro
  (ex.: `variant=button` ausente no Figma; ou opção no Figma que não existe no código → inválida ao arrastar).
- 🟡 **MED** — cobertura incompleta de `size` (Figma modela sm/md/lg, código vai de xs a xl).
- 🔵 **LOW** — `color` não modelado como propriedade no Figma (cor via estado) — normalmente por design.
- ⚪ **INFO** — componente pulado (sem mapeamento direto no @nuxt/ui).

## Camada Foundations — tokens.css ↔ Figma (bidirecional)

> **Diretriz do DS:** tudo no CSS deve estar no Figma e vice-versa. Esta camada pega exatamente
> o tipo de gap que sumiu sombra/blur (existiam no `tokens.css` mas sem Effect Style no Figma).

```bash
node tools/parity/audit-foundations.mjs        # exit 1 se houver divergência real
node tools/parity/audit-foundations.mjs --md > tools/parity/REPORT-foundations.md
```

Compara, por família (shadow/glow/blur/radius/spacing/gradient/tamanho/peso), os tokens do
`tokens.css` (lido AO VIVO) com `figma-styles.json` (snapshot do Figma). By-design no `IGNORE`
do script: half-steps de spacing (compat Tailwind), `radius-default` (alias de md), `text 7xl–9xl`
(default do Tailwind).

### Regenerar `figma-styles.json`
Com o plugin no arquivo do DS, via `figma_execute`:

```js
await figma.loadAllPagesAsync();
const effects=(await figma.getLocalEffectStylesAsync()).map(s=>s.name);
const paints=(await figma.getLocalPaintStylesAsync()).map(s=>s.name);
const cols=await figma.variables.getLocalVariableCollectionsAsync();
const vars=await figma.variables.getLocalVariablesAsync();
const spacing=cols.find(c=>c.name==='Spacing');
const sv=vars.filter(v=>v.variableCollectionId===spacing.id).map(v=>v.name);
return { effects, paints,
  spacingVars: sv.filter(n=>n.startsWith('space-')),
  radiusVars: sv.filter(n=>n.startsWith('radius-')),
  fontSizeVars: sv.filter(n=>n.startsWith('font-size-')) };
```

## Próximas camadas (não implementadas)

- **Camada 2**: `@storybook/test-runner` (Playwright) com `play()` por story + axe (render/interação/a11y em CI).
- **Camada 3**: contraste WCAG como asserção de build (reaproveita a Foundation `Contrast`).
