# Prompt de continuidade — finalizar o site da RBS no VS Code

Você é o agente de desenvolvimento responsável por revisar, corrigir e concluir o site da **RBS Consultoria Inteligente**, aberto neste workspace. Este prompt pode ser usado no Codex ou no Claude.

Execute o trabalho no código existente. Não pare em um diagnóstico ou numa lista de recomendações: implemente as correções necessárias, execute os testes pertinentes e confira o resultado no navegador quando houver essa capacidade.

## 1. Contexto e objetivo

O site institucional da RBS já existia em código. Uma etapa anterior adicionou três páginas de administradoras de consórcio, a partir de referências públicas, com autorização informada pelo cliente:

- Embracon: https://www.embracon.com.br/consorcio
- Bradesco Consórcios: https://banco.bradesco/html/classic/produtos-servicos/consorcios/index.shtm
- Volkswagen Consórcio — Jetta: https://www.cnvw.com.br/modelos/consorcio-jetta

A finalidade é manter grande fidelidade às referências e permitir que o visitante solicite atendimento à RBS: ele informa seus dados em um formulário local e abre o WhatsApp do cliente com uma mensagem preparada.

O usuário já clonou/importou o projeto no computador e quer finalizar esta versão. Seu escopo é **este repositório da RBS**. A Roma Capital é outro projeto; preserve os links existentes para ela, mas não edite outro repositório nesta tarefa.

Repositório: https://github.com/devnalberth/RBS-SITE
Branch de trabalho: `feat/consorcio-pages`
PR existente: https://github.com/devnalberth/RBS-SITE/pull/1

Na conferência de 16/10/2026 UTC, o PR estava aberto, em rascunho e sem merge, com head `ace7a23d2e3e2682041593eb330497716e24d7b3`. Isso é um registro da entrega anterior, não uma obrigação de voltar a esse commit. Verifique o estado atual e preserve alterações mais recentes.

## 2. Comece pela inspeção do workspace

1. Leia `AGENTS.md` ou instruções locais equivalentes, se existirem.
2. Confira `git status`, a branch e `git remote -v`.
3. Identifique alterações locais antes de editar. Não descarte arquivos, não use reset destrutivo e não sobrescreva trabalho do usuário.
4. Confirme que este é o projeto RBS. Não presuma que o nome da pasta no Windows seja igual ao nome do repositório.
5. Leia `README.md` e `CONSORCIOS.md`.
6. Inspecione as páginas, estilos, scripts, rotas e APIs relevantes.
7. Apresente um diagnóstico inicial curto, priorizando o que impede navegação, atendimento, fidelidade visual e publicação.
8. Continue diretamente para as correções que puder resolver com os arquivos e as instruções disponíveis.

Se estiver na branch errada, avalie o estado do Git antes de mudar. Se já estiver na branch correta, não recrie a branch. Não crie um PR duplicado.

## 3. Arquitetura existente

O projeto usa **HTML, CSS e JavaScript**, com endpoints PHP para funcionalidades do site principal e uma função Node para mídia na Vercel. Não é uma aplicação Next.js e não precisa ser reescrito em React, Vite ou outro framework.

Na versão de referência desta entrega, não havia `package.json` nem `vercel.json`. Confira os arquivos atuais antes de escolher comandos de execução. Não presuma que `npm install` ou `npm run dev` já existem.

Principais arquivos do site institucional:

- `index.html`: página inicial.
- `credenciamento.html`: credenciamento e formulários de parceiros.
- `contempladas.html`: catálogo de cartas contempladas.
- `contato.html`: contato.
- `politica-de-privacidade.html`: política existente.
- `404.html`.
- `assets/css/style.css`, `assets/js/main.js`.
- `assets/css/contempladas.css`, `assets/js/catalog.js`.
- `api/credenciamento.php`: registro e e-mail de credenciamento.
- `api/cartas.php`: integração do catálogo.
- `api/config.example.php`: exemplo da configuração do servidor.
- `.htaccess`, `robots.txt`, `sitemap.xml`, `llms.txt`.

Principais arquivos adicionados para consórcios:

- `consorcios/index.html`: hub de administradoras.
- `consorcios/embracon/index.html`.
- `consorcios/bradesco/index.html`.
- `consorcios/volkswagen/index.html`.
- `consorcios/privacidade.html`.
- `consorcios/assets/config.js`: empresa, WhatsApp e caminhos.
- `consorcios/assets/lead-core.js`: validação e construção da mensagem.
- `consorcios/assets/lead-form.js`: etapas, modal e abertura do WhatsApp.
- `consorcios/assets/brand-ui.js`: interações reconstruídas das páginas.
- `consorcios/assets/consorcio.css`, `hub.css`, ícones e recursos de cada marca.
- `api/consorcio-media.js`: mídia para a Vercel.
- `proxy/consorcio-media.php`: equivalente para Apache/PHP.
- `tests/consorcio-lead.test.cjs`, `tests/consorcio-media.test.cjs`.

Os arquivos locais são a fonte de verdade para a implementação atual. Verifique os nomes e o conteúdo antes de alterá-los.

## 4. Comportamento esperado dos contatos

Configuração registrada em `consorcios/assets/config.js`:

- Empresa: **RBS Consultoria Inteligente**.
- WhatsApp: **5511989864178**, exibido como **(11) 98986-4178**.
- Retorno ao site: `/`.
- Administradoras em `/consorcios/embracon/`, `/consorcios/bradesco/` e `/consorcios/volkswagen/`.

O número foi obtido do próprio projeto. Confira se a configuração atual continua coerente com os demais contatos do site. Não invente nem substitua o destinatário.

Fluxo das novas páginas:

1. O visitante clica em simular ou solicitar atendimento.
2. O formulário abre e identifica claramente o atendimento pela RBS.
3. A modalidade é selecionada ou vem do botão clicado. Volkswagen deve identificar Jetta.
4. O visitante informa nome completo, e-mail, telefone com DDD e CEP opcional, e autoriza o contato.
5. A aplicação valida os campos e prepara a mensagem com os dados, a administradora, a modalidade/produto, a página de origem e UTMs previstas na implementação.
6. Abre o WhatsApp com a mensagem preenchida e oferece link de continuidade caso o navegador bloqueie a nova aba.
7. O visitante confirma o envio no WhatsApp.

**Abrir uma mensagem preenchida não significa que o contato foi enviado.** Não mostre uma confirmação de envio que a aplicação não consegue comprovar.

Os formulários de consórcio não possuem banco de dados ou serviço de registro de leads. Não adicione CRM, persistência, disparo automático ou integração paga como parte desta correção.

O credenciamento do site institucional é outro fluxo: já possui PHP, registro e envio de e-mail. Preserve essa funcionalidade e suas regras, sem convertê-la por engano para o fluxo simples de consórcios.

## 5. Prioridade: fidelidade visual e responsividade

Compare as três páginas com suas referências em navegador, quando houver acesso. O HTML e parte do CSS vieram dos sites públicos; os runtimes e várias interações foram substituídos por código local. A cópia ainda não foi validada como pixel perfect.

Confira, por página:

- Header, logomarca, navegação e menu móvel.
- Fontes reais carregadas, pesos e estilos, inclusive a tipografia do Bradesco.
- Larguras, alinhamentos, espaçamentos, hierarquia e quebras de linha.
- Hero, banners, imagens, vídeos, ícones e proporções.
- Cards, carrosséis, abas, perguntas frequentes, rodapé e chamadas para atendimento.
- Estados de foco, hover, aberto, fechado, erro e sucesso.
- Modal do formulário e transições entre etapas.
- Camadas, sobreposições e elementos fixos.
- Movimento reduzido, quando a página usar animação ou reprodução automática.

Use pelo menos larguras de 360, 390, 768, 1024 e 1440 px, ajustando se o projeto exigir. Elimine rolagem horizontal involuntária, texto cortado, botões inacessíveis, modal fora da tela e navegação quebrada.

Preserve o design institucional existente da RBS. Nas páginas de administradoras, preserve o estilo da referência e a identificação do atendimento pela RBS. Não redesenhe o site inteiro por preferência pessoal.

Inspecione todas as seções, não apenas o primeiro viewport. Se a referência pública mudou desde a captura de 14/10/2026, registre diferenças relevantes antes de fazer uma alteração ampla.

Não afirme que a fidelidade foi comprovada sem comparar as páginas renderizadas. Se não houver navegador disponível, faça as correções verificáveis e registre precisamente a validação visual pendente.

## 6. Prioridade: interações, links e formulário

Teste os principais pontos de entrada para atendimento nas três páginas e no hub.

Confira:

- Botões de simulação, contato e chat abrem o formulário correto.
- A administradora e a modalidade seguem do botão para a mensagem.
- O Jetta continua identificado no fluxo Volkswagen.
- Nome, e-mail, DDD/telefone, CEP opcional e autorização têm validação coerente.
- Entradas com e sem máscara, prefixo +55 e caracteres acentuados funcionam.
- Um campo corrigido limpa o erro correspondente.
- Formulário vazio ou inválido não abre WhatsApp.
- A autorização não vem marcada previamente.
- Voltar de etapa preserva coerência da seleção.
- Fechar pelo botão, Escape e clique fora funciona conforme o comportamento definido.
- Fechar e reabrir não deixa mensagens, erros ou links de um contato anterior.
- Foco inicial, ordem de Tab e retorno ao botão de origem funcionam.
- Conteúdo e botões do diálogo são acessíveis com teclado e em telas pequenas.
- O endereço gerado usa o destinatário configurado e codificação correta da mensagem.
- Não há redirecionamento automático ao entrar na página ou antes de concluir o formulário.
- O link alternativo funciona quando uma nova aba é bloqueada.
- Os links de privacidade, retorno à RBS e troca de administradora funcionam.

Audite também os links institucionais. Área do cliente, boleto, consultas e Canal do Consorciado devem continuar nos destinos oficiais apropriados. Confira especialmente CTAs com rótulos como “Acesse agora”: não transforme um acesso institucional em captação de lead por engano.

Não recrie login bancário ou coleta de agência, conta, senha ou códigos bancários. As simulações comerciais dependem do atendimento; não invente valores, taxas, prazos ou garantia de contemplação.

Use dados fictícios nos testes. Não envie mensagens pelo WhatsApp nem e-mails reais. Para testar endpoints que registram leads ou enviam e-mail, use mocks ou configuração isolada de teste.

## 7. Mídias e execução local

A maior parte dos recursos está no repositório. Há dependências externas deliberadas:

### Embracon

A rota `/api/consorcio-media?asset=...` atende quatro identificadores fixos:

- `home-video`.
- `matriz`.
- `como-funciona-lance`.
- `como-ser-contemplado`.

Ela busca as quatro mídias públicas permitidas. A versão Node fica em `api/consorcio-media.js`; a versão Apache/PHP fica em `proxy/consorcio-media.php`, com rewrite no `.htaccess`.

A implementação prevê GET/HEAD, um intervalo Range, cache HTTP, timeout de 15 segundos e limite de 4 MiB. Não a transforme num proxy que aceita URLs arbitrárias. Preserve a lista fixa e não encaminhe cookies ou credenciais.

O uso de links diretos da Embracon já apresentou restrição CORP/same-site na etapa anterior. Investigue o carregamento antes de substituir a rota por hotlinks.

### Volkswagen

O vídeo Jetta usa o CDN oficial:
https://assets.volkswagen.com/is/content/volkswagenag/JOB-0048-Imprensa-BeautyShots-JettaGLI-Clipe30s-0x360-730k

Confira disponibilidade, reprodução e tratamento quando o recurso não carregar.

### Ambiente

Live Server ou um servidor exclusivamente estático não executam PHP nem a função Node. Não classifique a ausência dessas rotas nesse ambiente como prova de falha no código de produção.

Escolha um ambiente compatível com a funcionalidade que está sendo testada:

- Apache com PHP/cURL e mod_rewrite para o fluxo previsto na hospedagem PHP.
- Ambiente que execute a função Node para conferir a rota da Vercel.
- Servidor estático apenas para verificações que não dependem desses endpoints.

O README menciona Apache/Hostinger, e a etapa anterior também teve previews da Vercel. Não presuma que um build Vercel aprovado valida os endpoints PHP do site principal.

Se PHP/cURL ou outra ferramenta essencial não estiver disponível, conclua o restante do trabalho e informe a limitação concreta com os comandos de validação adequados. Não alegue execução que não ocorreu.

## 8. Revisão do site principal da RBS

Faça uma revisão de regressões e dos itens que impedem a entrega final:

- Home, credenciamento, contempladas, contato e página 404.
- Menus, âncoras, links entre páginas e botões das administradoras.
- Header e rodapé em desktop e celular.
- Imagens e vídeo principal, poster e comportamento com movimento reduzido.
- Formulários e campos condicionais já existentes no credenciamento.
- Catálogo e integração existentes em `api/cartas.php`, incluindo estado de carregamento, vazio e erro.
- Links de privacidade e termos.
- Rotas curtas sem extensão, barras finais e acesso direto/recarregamento nas páginas internas.
- Funcionamento das novas pastas `/consorcios/` com os redirects do `.htaccess`.

O README registra possíveis pendências de conteúdo: indicadores, informações da equipe, certificações, redes sociais, dados cadastrais e termos de uso. Verifique o estado atual; nem toda observação antiga continua pendente.

Corrija problemas técnicos e inconsistências verificáveis. Não invente CNPJ, razão social, certificações, depoimentos, números comerciais ou perfis sociais. Se um dado obrigatório faltar, identifique o campo e seu impacto no relatório final. Preserve seções de depoimentos ocultas até existirem informações reais para preenchê-las.

Não exiba configurações privadas ou chaves de APIs em código público. Preserve o padrão existente de configuração PHP fora do Git.

## 9. SEO e qualidade de front-end

Confira títulos, descrições, idioma, viewport, hierarquia de headings, textos alternativos, caminhos canônicos e URLs reais do projeto. Atualize sitemap e `llms.txt` se alguma rota ou conteúdo relevante mudar.

Verifique recursos que retornam 404, erros JavaScript, fontes não carregadas, arquivos com conteúdo errado, console, rede e caminhos relativos. Confira imagens pela resposta e pelo conteúdo real, não só pela extensão.

Evite carregar os scripts/tracking originais das administradoras que foram removidos. Não reinstale as aplicações completas das marcas apenas para reproduzir a aparência.

Preserve CSS isolado por página, sem vazar o estilo de uma administradora para outra ou para o site RBS. Remova apenas código comprovadamente desnecessário ou defeituoso; evite refatorações amplas sem relação com o problema.

## 10. Testes e critérios de conclusão

Na etapa anterior, passaram **14 testes Node neste repositório**, e o build de preview Vercel foi aprovado. Isso é histórico, não valida automaticamente a versão atual.

Execute novamente, na raiz do projeto:

```bash
node --test tests/consorcio-lead.test.cjs tests/consorcio-media.test.cjs
```

Execute também os checks pertinentes às mudanças, por exemplo:

```bash
git diff --check
```

Valide sintaxe de JavaScript e, quando disponível, de PHP para os arquivos alterados. Acrescente testes quando houver um comportamento novo ou uma regressão relevante; não crie testes que apenas repitam a implementação.

Antes de considerar a implementação concluída:

- As quatro rotas de consórcio abrem diretamente e pelo site principal.
- Recursos essenciais e fontes carregam.
- CTAs de atendimento e links institucionais têm destinos coerentes.
- O formulário bloqueia entradas inválidas e produz a mensagem correta quando válido.
- O fluxo foi conferido em desktop e celular ou a limitação está explicitamente registrada.
- Funcionalidades existentes da RBS continuam operacionais no ambiente compatível.
- A rota de mídia funciona no runtime efetivamente escolhido para hospedagem.
- Não há erros de console, links quebrados ou placeholders técnicos novos.
- Os testes adequados passaram e a documentação reflete a forma real de executar o projeto.

Na conferência anterior, o hub e a página Bradesco da RBS abriram no navegador, as imagens visíveis carregaram e o CTA principal abriu o formulário com a identificação da RBS. A comparação visual completa e o teste válido até a abertura do WhatsApp continuaram pendentes. A execução PHP na hospedagem também não tinha sido validada.

## 11. Git e entrega

Mantenha as correções na branch `feat/consorcio-pages`. O PR #1 já existe: commits enviados a essa branch atualizam a proposta.

Conclua a implementação e deixe as alterações prontas para revisão. Não faça merge na main, deploy de produção ou alteração de DNS como efeito automático desta tarefa. Não crie nova conta, serviço pago ou integração desnecessária.

Se algum comando exigir credenciais, não solicite segredos no chat nem os registre no código. Registre a etapa bloqueada e continue nas partes independentes.

Atualize `CONSORCIOS.md` e/ou `README.md` quando as instruções existentes ficarem incorretas. Se fizer sentido, deixe um relatório curto de conclusão no repositório.

Na resposta final, apresente:

1. O que foi corrigido e por quê.
2. Páginas e fluxos efetivamente testados, com resultado.
3. Forma correta de executar e conferir este projeto localmente.
4. Dependências externas e limitações ainda existentes.
5. Dados do cliente que continuam faltando, somente se encontrados.
6. Arquivos relevantes alterados e estado da branch/PR.
7. Pendências concretas para publicação, incluindo hospedagem e nomes dos subdomínios ainda não definidos.

Seja objetivo e transparente. Não chame o site de “100% igual” ou “pronto para produção” quando houver verificações importantes sem conclusão.

**Comece agora lendo o projeto e verificando o Git. Depois apresente um plano breve e execute as correções.**
