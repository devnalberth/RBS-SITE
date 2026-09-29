# Site RBS Consultoria Inteligente

Site estático em HTML, CSS e JavaScript puro, sem dependências, pronto para subir em qualquer hospedagem. Em Apache/Hostinger, basta enviar o conteúdo desta pasta para `public_html`. As páginas são arquivos `.html` na raiz, servidos sem a extensão (`/credenciamento`, `/contempladas`, `/contato`).

## Estrutura

```
index.html                  Home (15 seções)
credenciamento.html         Página /credenciamento (abas por administradora + formulário)
contempladas.html           Página /contempladas (catálogo de cartas da InvestMaster)
contato.html                Página /contato (fale com a equipe de parcerias)
404.html                    Página de erro
assets/css/style.css        Estilos (tokens do design system no topo)
assets/js/main.js           Interações. Edite só o bloco CONFIG
assets/css/contempladas.css Estilos do catálogo de cartas contempladas
assets/js/catalog.js        Catálogo de cartas (filtros, seleção, proposta, exportação)
assets/img/                 Logos, favicon e imagem de compartilhamento
api/cartas.php              Integração com a InvestMaster. A chave fica em api/config.php, que não vai para o git: crie no servidor a partir de api/config.example.php
api/credenciamento.php      Registro opcional dos leads (CSV + e-mail)
.htaccess                   HTTPS, URLs sem .html, cache e redirecionamentos 301
robots.txt, sitemap.xml     SEO
```

## Antes de publicar

1. **Links:** no topo de `assets/js/main.js`, preencha `CONFIG`:
   - `whatsapp`: número oficial só com dígitos (hoje `5511989864178`)
   - `romaCapitalUrl`: link da Roma Capital
   - `pcaValidationUrl`: hoje aponta para a consulta pública de certificados da ABAC. Troque pelo link do badge do Rodrigo na Brasil Open Badge assim que ele ativar.
   - `formEndpoint`: `'api/credenciamento.php'` para registrar os leads (veja abaixo). Vazio = o formulário só abre o WhatsApp.
2. **Fotos:** a home usa as fotos do site antigo, em `assets/images/webp/`. Para trocar, substitua o `src` da imagem em `index.html`. Se um arquivo não existir, o site mostra um bloco azul com a legenda da foto que falta.
   - Hero: `home/hero-desktop.webp` e `home/hero-mobile.webp` (no celular)
   - Para quem é a parceria: `ctaimage.webp`
   - Treinamentos: `home/modalidade-empresarial.webp` (Onboarding), `home/modalidade-imoveis.webp` (Produtos e regras), `home/modalidade-veiculos.webp` (Venda consultiva), `home/modalide-investimentos.webp` (Performance)
   - Fundador: `rodrigo/04.webp`
   - CTA final: `rodrigo/03.webp`
   Fotos novas: exporte em WebP ou JPG com qualidade de 75% a 80%, abaixo de 300 KB cada.
3. **Logomarcas das administradoras:** os cards usam `assets/icons/bradesco.svg`, `embracon.svg` e `volkswagen.svg`, as mesmas do site antigo.
4. **Itens marcados com `TODO` ou `[colchetes]` no HTML** (busque por `TODO` e `[`):
   - Faixa de indicadores: número de parceiros e estados atendidos
   - Nomes, cargos e fotos do time
   - Vigência das certificações CEA, CPA-20 e ABAC PCA-10
   - FAQ "Em quais regiões a RBS atua?"
   - Razão social e CNPJ no rodapé
   - Links oficiais do LinkedIn e Instagram
5. **Depoimentos:** a seção está pronta, mas oculta (`hidden` em `<section id="depoimentos">`). Com pelo menos 3 depoimentos reais e autorizados, preencha os cards e remova o `hidden`.
6. **Política de Privacidade e Termos de Uso:** `politica-de-privacidade.html` já existe, com texto baseado no que o site coleta. Peça ao jurídico da RBS para revisar e preencha `[Razão social]`, o CNPJ e `[Nome do encarregado]`. Os Termos de Uso (`/termos-de-uso`) ainda precisam ser criados.
7. **Redirecionamentos:** liste as URLs antigas do WordPress (Search Console) e adicione os `Redirect 301` no `.htaccess`.

## Formulário

O fluxo é o mesmo no popup (todos os botões "Quero me credenciar") e no fim da página /credenciamento:

1. Valida os campos (nome, WhatsApp com DDD, e-mail, cidade, perfil, CNPJ, experiência, consentimento).
2. Se `formEndpoint` estiver preenchido, envia os dados para ele.
3. Mostra a mensagem de sucesso e abre o WhatsApp com os dados do lead já escritos.

`api/credenciamento.php` grava cada lead em `api/dados/leads.csv` (pasta bloqueada ao público) e envia um e-mail para `credenciamento@rbsconsultoriainteligente.com.br`. Crie a caixa `site@rbsconsultoriainteligente.com.br` (ou troque a constante `REMETENTE`) para o e-mail não cair em spam.

Os UTMs da URL (`utm_source`, `utm_medium`, `utm_campaign`), a página e a administradora de origem vão junto no envio.

## Medição

O site envia eventos para o `dataLayer`, prontos para o GTM ou o Meta Pixel:

- `credenciamento_enviado`: formulário concluído (evento principal)
- `clique_whatsapp` e `clique_email`: cliques nesses botões

Cole o snippet do GTM logo após `<head>` em todas as páginas `.html` da raiz.

## Editar o conteúdo

Edite o texto direto nos arquivos `.html` da raiz. As classes `rbs-` seguem o design system: `rbs-dark` para seção azul, `section--alt` para o fundo cinza azulado.
