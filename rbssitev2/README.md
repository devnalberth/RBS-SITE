# Site RBS Consultoria Inteligente

Site estático em HTML, CSS e JavaScript puro, sem dependências, pronto para subir em qualquer hospedagem. Em Apache/Hostinger, basta enviar o conteúdo desta pasta para `public_html`.

## Estrutura

```
index.html                  Home (15 seções)
credenciamento/index.html   Página /credenciamento (abas por administradora + formulário)
assets/css/style.css        Estilos (tokens do design system no topo)
assets/js/main.js           Interações. Edite só o bloco CONFIG
assets/img/                 Logos, favicon e imagem de compartilhamento
api/credenciamento.php      Registro opcional dos leads (CSV + e-mail)
.htaccess                   HTTPS, cache e espaço para redirecionamentos 301
robots.txt, sitemap.xml     SEO
```

## Antes de publicar

1. **WhatsApp e links:** no topo de `assets/js/main.js`, preencha `CONFIG`:
   - `whatsapp`: número oficial só com dígitos (ex.: `5582999999999`)
   - `romaCapitalUrl`: link da Roma Capital
   - `pcaValidationUrl`: hoje aponta para a consulta pública de certificados da ABAC. Troque pelo link do badge do Rodrigo na Brasil Open Badge assim que ele ativar.
   - `formEndpoint`: `'api/credenciamento.php'` para registrar os leads (veja abaixo). Vazio = o formulário só abre o WhatsApp.
2. **Fotos:** envie estes arquivos para `assets/img/`. Enquanto não existirem, o site mostra um bloco azul com a legenda da foto que falta.
   - `hero-escritorio.jpg` (1920×1080, escritório corporativo, sem pessoa em destaque, respiro à esquerda)
   - `parceiros-treinamento.jpg` (1000×1250, treinamento ou encontro com parceiros)
   - `treinamento-onboarding.jpg`, `treinamento-produtos.jpg`, `treinamento-venda.jpg`, `treinamento-performance.jpg` (800×1000 cada)
   - `rodrigo-batista.jpg` (900×1125, retrato do Rodrigo)
   - `cta-escritorio.jpg` (1000×800)
   Exporte em JPG com qualidade de 75% a 80%, abaixo de 300 KB cada.
3. **Logomarcas das administradoras:** com a autorização em mãos, troque o texto "Logomarca autorizada · …" em `index.html` por `<img src="assets/img/logos/bradesco.svg" alt="Bradesco Consórcios">` (o mesmo para Embracon e Volkswagen).
4. **Itens marcados com `TODO` ou `[colchetes]` no HTML** (busque por `TODO` e `[`):
   - Faixa de indicadores: número de parceiros e estados atendidos
   - Nomes, cargos e fotos do time
   - Vigência das certificações CEA, CPA-20 e ABAC PCA-10
   - FAQ "Em quais regiões a RBS atua?"
   - Razão social e CNPJ no rodapé
   - URL da página de cartas contempladas (`CONTEMPLADAS_URL`, hoje `/cartas-contempladas/`)
   - Links oficiais do LinkedIn e Instagram
5. **Depoimentos:** a seção está pronta, mas oculta (`hidden` em `<section id="depoimentos">`). Com pelo menos 3 depoimentos reais e autorizados, preencha os cards e remova o `hidden`.
6. **Política de Privacidade e Termos de Uso:** os links apontam para `/politica-de-privacidade/` e `/termos-de-uso/`. Crie essas páginas com o texto do jurídico da RBS.
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

Cole o snippet do GTM logo após `<head>` nos dois `index.html`.

## Editar o conteúdo

Edite o texto direto nos arquivos `index.html` e `credenciamento/index.html`. As classes `rbs-` seguem o design system: `rbs-dark` para seção azul, `section--alt` para o fundo cinza azulado.
