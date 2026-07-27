# Arquivo morto

Componentes do template original guardados fora de `src/`, por pedido do cliente,
para o caso de querer voltar a usá-los.

Esta pasta **não entra no build**: não é rota (só `src/pages` vira rota), ninguém
a importa, e ela está fora dos globs de `content` do [tailwind.config.js](../tailwind.config.js)
— ou seja, as classes daqui não engordam o CSS gerado.

## Conteúdo

| Arquivo | O que é |
|---|---|
| `FooterTemplate.jsx` | Rodapé do template (newsletter, 3 colunas de links, bloco de contato, barra inferior). Substituído pelo rodapé da RBS em `src/components/layout/Footer.jsx`. |
| `BlogSection.jsx` | Section de blog que ficava acima do rodapé na home. Depende de `/images/webp/blog-*.webp`, que foram mantidos em `public/` por causa dela. |

## Como restaurar

**Rodapé** — sobrescreve o atual:

```bash
cp _archive/FooterTemplate.jsx src/components/layout/Footer.jsx
```

**Section de blog** — devolve para `src/` e importa na home:

```bash
cp _archive/BlogSection.jsx src/components/home/BlogSection.jsx
```

Depois, em `src/pages/index.jsx`:

```jsx
import BlogSection from "@/components/home/BlogSection";
// ...e o <BlogSection /> onde quiser na ordem das sections
```
