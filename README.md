# RBS-SITE

Site estático da RBS para hospedagem compartilhada, construído com HTML, CSS, JavaScript puro e proxy PHP. Os arquivos desta raiz correspondem diretamente ao conteúdo de `public_html`.

## Estrutura

- `index.html`: página inicial.
- `contato.html`: contato e formulário para WhatsApp.
- `contempladas.html`: catálogo dinâmico de cartas.
- `404.html`: página de erro.
- `assets/css/global.css`: variáveis, reset e estilos globais.
- `assets/css/style.css`: arquivo central que importa o global, o layout e o CSS de cada seção.
- `assets/js/`: interações em JavaScript puro.
- `api/cartas.php`: proxy seguro para a API da Investmaster.

## Configuração da API

1. Copie `api/config.example.php` para `api/config.local.php`.
2. Informe a chave da Investmaster em `investmaster_api_key`.
3. Não envie `config.local.php` ao repositório; ele já está ignorado pelo Git e bloqueado pelo `.htaccess`.

Também é possível definir as variáveis de ambiente `INVESTMASTER_API_KEY` e `INVESTMASTER_API_BASE_URL` no servidor.

O catálogo consulta `api/cartas.php` sempre que a página é aberta. O proxy consulta a Investmaster em tempo real e mantém apenas um cache compartilhado de cinco segundos, portanto não depende de rebuild ou novo deploy para receber atualizações.

## Publicação

Envie o conteúdo desta pasta para a raiz pública do domínio da RBS. O servidor precisa oferecer Apache ou LiteSpeed com PHP, extensão cURL ou acesso HTTPS via `file_get_contents`, e suporte a `.htaccess`.
