# Páginas de consórcio — RBS Consultoria Inteligente

As três páginas foram extraídas dos sites públicos em 14/10/2026. HTML, CSS, fontes, imagens e vídeos foram aproveitados; os runtimes das administradoras foram substituídos por interações locais. A página Embracon foi baixada novamente do site oficial e reorganizada em 15/10/2026 (veja abaixo).

| Página | Caminho |
| --- | --- |
| Seleção de administradoras | `/consorcios/` |
| Embracon | `/consorcios/embracon/` |
| Bradesco Consórcios | `/consorcios/bradesco/` |
| Volkswagen — Jetta | `/consorcios/volkswagen/` |

## Atendimento

Edite `consorcios/assets/config.js` para alterar a empresa, o WhatsApp, a página inicial (`homeUrl`) e a página de credenciamento de parceiros (`partnerUrl`). O número `5511989864178` foi obtido dos canais oficiais já presentes neste repositório. Os dados ficam no formulário até a abertura do WhatsApp e seguem na mensagem pronta. O visitante precisa enviá-la; não há banco de dados, API de registro de leads ou envio automático às administradoras.

Os botões de simulação, contato e chat abrem o formulário local. Os acessos institucionais a áreas de cliente, boletos, informações e documentos continuam como links para os domínios oficiais. A página Bradesco não coleta agência, conta, CPF ou senha de acesso. A captura de leads solicita nome, e-mail, celular, modalidade e CEP opcional, com autorização de contato.

## Embracon: organização dos arquivos

```
consorcios/embracon/
  index.html                  HTML indentado, sem estilos inline, com comentários por seção
  assets/css/embracon-fonts.css   @font-face originais (Inter, Hurme, Ivy Presto) apontando para ../fonts/
  assets/css/embracon.css         CSS original (Tailwind compilado), formatado com uma regra por linha — não editar
  assets/css/embracon-rbs.css     ajustes da RBS: estilos que o Next.js aplicava inline/por JS, matriz, órbita, YouTube, menus
  assets/js/embracon.js           interações: topo fixo, submenus, palavra animada, carrosséis, matriz, YouTube, animações de entrada
  assets/fonts/  assets/img/  assets/video/homeb.mp4
```

- Origem: HTML SSR de `https://www.embracon.com.br/consorcio`, CSS `_next/static/chunks/17-r~j5acso~v.css` e `0ta1a~t4n09zt.css`, mídias de `/img/...` e `/videos/homeb.mp4`. As seções renderizadas só no cliente (foto da matriz e órbita de avatares), os textos dos submenus e as animações foram reconstruídos a partir dos chunks JavaScript oficiais.
- As classes do `<html>` (`inter_…`, `hurme_…`, `ivypresto_…`) são as da página original e ativam as fontes; não remova.
- Os ícones de 24 px dos itens dos submenus do topo não foram copiados (no original vêm de chunks carregados sob demanda).
- Os CTAs "Simule seu consórcio", os itens do submenu "O Consórcio", "Simulador de Consórcio", "Falar com um Especialista" e os botões "Consórcio de …" do rodapé abrem o formulário da RBS (`data-open-lead`, com `data-category` quando houver modalidade). O menu do topo, os submenus e o menu móvel não levam ao site da Embracon: itens de conteúdo rolam até a seção correspondente (`#como-funciona`, `#contemplacao`, `#lance`, `#o-que-e-consorcio`), itens de simulação abrem o formulário e itens institucionais (área do cliente, boleto, governança etc.) vão para a página inicial da RBS (`data-company-home`, configurada em `homeUrl`). O logotipo mantém o visitante na página. O rodapé e os links dentro dos textos seguem a mesma regra: conteúdo rola até a seção, modalidades e "Vendedores autorizados" abrem o formulário, os links de LGPD vão para `consorcios/privacidade.html` e os demais vão para a página inicial da RBS. A página não tem nenhum link para outro site além do WhatsApp da RBS (o `build` da cópia falha se sobrar algum).
- Dados da RBS no rodapé (fonte: rodapé do site institucional e `config.js`): RBS CONSULTORIA INTELIGENTE LTDA, CNPJ 63.744.847/0001-09, aviso "A RBS Consultoria Inteligente não é administradora de consórcios.", WhatsApp (11) 98986-4178 e e-mail credenciamento@rbsconsultoriainteligente.com.br. Foram removidos o registro no Banco Central, a data de fundação, os horários, a nota da ouvidoria e o canal para deficiência auditiva da Embracon. Se o WhatsApp mudar, atualize também o rodapé de `consorcios/embracon/index.html`.
- Para atualizar a cópia, baixe novamente os arquivos da origem e refaça as substituições descritas acima; os textos de `index.html` foram conferidos parágrafo a parágrafo contra o SSR oficial.

## Bradesco: organização dos arquivos

```
consorcios/bradesco/
  index.html                    HTML indentado, sem estilos nem handlers inline (as ações usam atributos data-*)
  assets/css/bradesco.css       CSS original, na ordem da página oficial, com a origem de cada bloco — não editar
  assets/css/bradesco-rbs.css   ajustes da RBS: estilos que o original aplicava inline/por script e elementos trocados
  assets/js/bradesco.js         interações: carrosséis, abas, perguntas frequentes, planos, rodapé, banner e rolagem
  assets/js/vendor/             jQuery 3.6.0, Slick, AOS e Swiper 11 (as mesmas bibliotecas do site oficial)
  assets/fonts/  assets/img/
```

- Origem: HTML de `https://banco.bradesco/html/classic/produtos-servicos/consorcios/index.shtm`. O banner (Swiper) e o rodapé são montados por JavaScript no site oficial; foram copiados do DOM renderizado. O CSS foi reduzido aos arquivos com regras em uso (cobertura do Chrome em 1440 e 390 px); bibliotecas sem uso na página (Owl, Magnific Popup, mmenu, Font Awesome etc.), cookies, menu de acessibilidade e o widget da BIA ficaram de fora. As fontes ficam só em WOFF2/WOFF.
- Não reproduzido: o login do Internet Banking (agência/conta) na barra superior, o aviso do app no celular, o menu de acessibilidade (Rybena/WebLibras), o widget "BIA no WhatsApp", o banner de cookies e os formulários próprios do Bradesco (substituídos pelo formulário da RBS).
- Links: "Simule e contrate", "Simular" e "Eu quero" abrem o formulário da RBS com a modalidade (Automóveis, Imóveis, Pesados, Motos, Agronegócio); "O que é consórcio?", "Serviços", "Conheça nossas soluções" e "Simule e Contrate" (fixo) rolam até a seção; LGPD/privacidade vão para `consorcios/privacidade.html`; os demais (banners, Canal do Consorciado, apps, rodapé, sites Bradesco, links das perguntas frequentes) vão para a página inicial da RBS.
- Dados da RBS: "Central de Atendimento" e rodapé (WhatsApp, e-mail, razão social, CNPJ e aviso de que a RBS não é administradora); o QR code do app foi trocado por um QR do WhatsApp da RBS (`assets/img/qrcode-whatsapp-rbs.svg`). Se o número mudar, gere um novo QR.
- Correção em relação ao original: no site oficial, os cards "Aeronaves" e "Ônibus" mostram o texto um do outro; na cópia cada card mostra o próprio texto.

## Volkswagen: organização dos arquivos

```
consorcios/volkswagen/
  index.html                       HTML indentado por blocos, sem estilos nem scripts inline, com comentários por seção
  assets/css/volkswagen.css        CSS original (Tailwind compilado), uma regra por linha — não editar
  assets/css/volkswagen-rbs.css    ajustes da RBS: estilos que next/image, framer-motion e Radix aplicavam inline/por JS
  assets/js/volkswagen.js          interações: topo, parallax, vídeo, carro deslizante, imagens fixas, menu, rodapé, Libras, pop-up de saída
  assets/fonts/  assets/img/       fontes VW Head/VW Text, imagens e favicons (iguais byte a byte aos oficiais)
```

- Origem: HTML SSR de `https://www.cnvw.com.br/modelos/consorcio-jetta` e CSS `_next/static/chunks/17yy02jv9ojeh.css`, baixados novamente em 17/10/2026. O menu lateral, os submenus, o vídeo e o pop-up de saída são montados só no navegador; foram copiados do DOM renderizado e reconstruídos a partir dos chunks JavaScript oficiais (mesmos limites de rolagem, `threshold` e `rootMargin`). A cópia anterior tinha perdido textos (“Até 100 meses para quitar seu Consórcio Jetta.” e outros) e espaços entre palavras; o texto atual foi conferido contra o SSR oficial.
- O outro CSS que a página oficial carrega sob demanda (`0-mfy3-c5vxu..css`) é só do Swiper, que esta página não usa, e não foi copiado. O banner de cookies (Privacy Tools), o Google Tag Manager e o chat do assistente virtual também ficaram de fora.
- Links: nenhum vai para o site da Volkswagen. "Simule aqui" (topo, cartão, chamada final, botão flutuante, pop-up de saída), "Assistente virtual", a trilha "Consórcio de Carros" e todos os modelos do menu e do rodapé abrem o formulário da RBS com a modalidade e o modelo (`data-category` e `data-product`: carros em Automóveis, caminhões em Pesados; sem `data-product`, o atendimento é do Jetta). Área do parceiro, Lista de parceiros e Quero ser parceiro vão para o credenciamento da RBS (`data-company-partner`, configurado em `partnerUrl`). Termos, privacidade, cookies e Portal do Titular vão para `consorcios/privacidade.html`. Os demais (Início, Área do cliente, Central de Ajuda, Blog, Perguntas Frequentes, Regulamento, governança, Facebook) vão para a página inicial da RBS (`data-company-home`). O logotipo e "Consórcio Jetta" da trilha mantêm o visitante na página.
- Dados da RBS no rodapé: WhatsApp (11) 98986-4178, credenciamento@rbsconsultoriainteligente.com.br, RBS CONSULTORIA INTELIGENTE LTDA, CNPJ 63.744.847/0001-09 e o aviso de que a RBS não é administradora. Saíram o SAC, a Ouvidoria, o endereço e o registro no Banco Central do Consórcio Volkswagen. Ficou o aviso de que o Consórcio Volkswagen é administrado pela Embracon e a nota sobre parcelas e imagens ilustrativas.
- Acessibilidade em Libras: o original carrega o Hand Talk com o token da Volkswagen. Aqui o mesmo botão (com o painel "Acessibilidade em Libras" no hover) carrega o VLibras do governo federal no clique, e o botão do VLibras assume o lugar dele.
- Pop-up de saída: como no original, aparece quando o cursor sai da página ou, até 1024 px, quando o visitante volta a rolar para cima depois de 10% da página; depois de fechado, só volta após 24 h (`localStorage`, chave `rbsVwExitPopup`). O "Simule aqui" dele abre o formulário da RBS.
- Movimento reduzido: sem parallax, sem reprodução automática do vídeo e sem transições.


## Hospedagem e subdomínio

Os diretórios são servidos por `index.html`, com assets próprios, e funcionam em qualquer servidor estático (incluindo Live Server): todas as mídias da Embracon são locais. Para um subdomínio que aponte à raiz deste mesmo site, mantenha os caminhos `/consorcios/...` ou adicione um rewrite de host para a administradora escolhida, depois de definir o hostname. Se publicar somente a pasta `consorcios` como raiz de outro site, atualize `homeUrl`, `partnerUrl`, os links à página principal e as URLs canônicas. Não foram feitas alterações de DNS nem publicação na produção.

## Recursos e limites

Os arquivos públicos essenciais de cada marca estão nas respectivas pastas. O front-end não executa Next.js nem os scripts de rastreamento das administradoras. O formulário continua independente de serviços de leads das administradoras. As consultas, login bancário, contratação e simuladores oficiais não foram copiados. Não calculamos parcelas sem regras: o visitante recebe a simulação no atendimento.

Dependências externas restantes: os vídeos do YouTube da Embracon (carregados de `youtube-nocookie.com` somente após o clique), o vídeo do Jetta, servido diretamente pelo CDN público da Volkswagen (`assets.volkswagen.com`, inserido quando a área entra na tela; se falhar, a área mostra uma foto do Jetta), e o VLibras (`vlibras.gov.br`), carregado somente no clique do botão de Libras da página Volkswagen. A rota `/api/consorcio-media` foi removida, pois todas as mídias da Embracon passaram a ser locais.

As páginas preservam a estrutura e o CSS originais; composição client-only e interações foram reconstruídas. A validação visual comparativa em desktop e celular (360, 390, 768, 1024 e 1440 px) continua obrigatória antes de considerar a cópia pixel perfect.

## Verificação

`node --test tests/consorcio-lead.test.cjs` verifica os campos, o destinatário e as mensagens do formulário. O formulário não é enviado durante os testes.

Originais: Embracon (`https://www.embracon.com.br/consorcio`), Bradesco (`https://banco.bradesco/html/classic/produtos-servicos/consorcios/index.shtm`), Volkswagen (`https://www.cnvw.com.br/modelos/consorcio-jetta`).

## Revisão e publicação

A implementação usa a branch `feat/consorcio-pages` para revisão. A integração na `main`, a publicação no domínio principal e a configuração dos subdomínios dependem da revisão do código e dos nomes de host escolhidos. Não foi alterado o DNS.
