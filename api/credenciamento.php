<?php
/**
 * RBS Consultoria Inteligente — registro de leads do formulário de credenciamento.
 * Ativo quando CONFIG.formEndpoint = 'api/credenciamento.php' em assets/js/main.js.
 * Requer PHP 7.4+ com mail() habilitado (padrão na Hostinger).
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
date_default_timezone_set('America/Sao_Paulo');

const DESTINO   = 'rbs.consultoria.inteligente@gmail.com';
const REMETENTE = 'site@rbsconsultoriainteligente.com.br'; // precisa existir no domínio
const ARQUIVO   = __DIR__ . '/dados/leads.csv';            // pasta protegida por .htaccess

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'erro' => 'Método não permitido']);
    exit;
}

// honeypot
if (!empty($_POST['site_empresa'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function campo(string $k, int $max = 200, bool $multilinha = false): string {
    $v = isset($_POST[$k]) ? (is_array($_POST[$k]) ? implode(', ', $_POST[$k]) : $_POST[$k]) : '';
    $v = trim(strip_tags((string) $v));
    $v = $multilinha ? preg_replace("/\r\n?/", "\n", $v) : preg_replace('/[\r\n]+/', ' ', $v);
    return mb_substr($v, 0, $max);
}

function texto($v, int $max): string {
    return mb_substr(trim(strip_tags(is_scalar($v) ? (string) $v : '')), 0, $max);
}

// sócios adicionais (Volkswagen), um por linha no CSV
function outrosSocios(): string {
    $nomes = (array) ($_POST['socio_nome'] ?? []);
    $linhas = [];
    foreach (array_slice($nomes, 0, 5, true) as $i => $nome) {
        $dados = array_map(fn($k) => texto(((array) ($_POST[$k] ?? []))[$i] ?? '', 120), ['socio_email', 'socio_telefone', 'socio_rg', 'socio_cpf']);
        $linhas[] = implode(' | ', array_merge([texto($nome, 120)], $dados));
    }
    return implode("\n", $linhas);
}

function h(string $v): string {
    return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
}

$lead = [
    'data'          => date('Y-m-d H:i:s'),
    'nome'          => campo('nome'),
    'whatsapp'      => campo('whatsapp', 20),
    'email'         => campo('email'),
    'cidade'        => campo('cidade'),
    'perfil'        => campo('perfil'),
    'possui_cnpj'   => campo('possui_cnpj', 5),
    'razao_social'  => campo('razao_social'),
    'cnpj'          => campo('cnpj', 18),
    'telefone_empresa' => campo('telefone_empresa', 20),
    'email_socio_admin' => campo('email_socio_admin'),
    'chave_pix'     => campo('chave_pix', 120),
    'cep'           => campo('cep', 9),
    'endereco'      => campo('endereco'),
    'numero'        => campo('numero', 20),
    'complemento'   => campo('complemento', 100),
    'bairro'        => campo('bairro', 100),
    'cidade_empresa'=> campo('cidade_empresa', 100),
    'estado'        => campo('estado', 2),
    'inscricao_municipal' => campo('inscricao_municipal', 40),
    'conselho'      => campo('conselho', 40),
    'numero_conselho' => campo('numero_conselho', 40),
    'cpf'           => campo('cpf', 14),
    'rg'            => campo('rg', 20),
    'outros_socios' => outrosSocios(),
    'atua_consorcio'=> campo('atua_consorcio', 5),
    'administradoras' => campo('administradoras'),
    'tamanho_equipe'=> campo('tamanho_equipe', 30),
    'mensagem'      => campo('mensagem', 1000, true),
    'consentimento' => campo('consentimento', 5),
    'administradora_origem' => campo('administradora_origem'),
    'utm_source'    => campo('utm_source'),
    'utm_medium'    => campo('utm_medium'),
    'utm_campaign'  => campo('utm_campaign'),
    'pagina'        => campo('pagina', 300),
    'ip'            => $_SERVER['REMOTE_ADDR'] ?? '',
];

// validação mínima (o front já valida)
$tel = preg_replace('/\D/', '', $lead['whatsapp']);
if (mb_strlen($lead['nome']) < 3 || strlen($tel) < 10 || !filter_var($lead['email'], FILTER_VALIDATE_EMAIL) || $lead['consentimento'] !== 'sim') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'erro' => 'Dados incompletos']);
    exit;
}

// 1) grava no CSV
$dir = dirname(ARQUIVO);
if (!is_dir($dir)) { @mkdir($dir, 0750, true); }
$novo = !file_exists(ARQUIVO);
if ($fh = @fopen(ARQUIVO, 'a')) {
    if (flock($fh, LOCK_EX)) {
        if ($novo) { fwrite($fh, "\xEF\xBB\xBF"); fputcsv($fh, array_keys($lead), ';'); }
        fputcsv($fh, array_values($lead), ';');
        flock($fh, LOCK_UN);
    }
    fclose($fh);
}

// 2) avisa por e-mail, nas seções montadas pelo formulário para a administradora escolhida
$recebido = date('d/m/Y \à\s H:i');
$secoes = [];
$resumo = json_decode((string) ($_POST['resumo'] ?? ''), true);
foreach (array_slice((array) ($resumo['secoes'] ?? []), 0, 15) as $s) {
    if (!is_array($s)) { continue; }
    $titulo = texto($s['title'] ?? '', 80);
    $itens = [];
    foreach (array_slice((array) ($s['rows'] ?? []), 0, 30) as $r) {
        if (!is_array($r)) { continue; }
        $valor = texto($r[1] ?? '', 1000);
        if ($valor !== '') { $itens[] = [texto($r[0] ?? '', 80), $valor]; }
    }
    if ($titulo !== '' && $itens) { $secoes[] = [$titulo, $itens]; }
}
if (!$secoes) {
    $itens = [];
    foreach ($lead as $k => $v) {
        if ($v !== '' && !in_array($k, ['data', 'ip', 'consentimento', 'pagina', 'utm_source', 'utm_medium', 'utm_campaign'], true)) {
            $itens[] = [ucfirst(str_replace('_', ' ', $k)), $v];
        }
    }
    $secoes[] = ['Dados enviados', $itens];
}
$origem = [['Recebido em', $recebido], ['Página', $lead['pagina']], ['Aba de origem', $lead['administradora_origem']], ['UTM source', $lead['utm_source']], ['UTM medium', $lead['utm_medium']], ['UTM campaign', $lead['utm_campaign']], ['Consentimento LGPD', 'Sim']];
$secoes[] = ['Origem do contato', array_values(array_filter($origem, fn($r) => $r[1] !== ''))];

$waLead = 'https://wa.me/55' . $tel;
$admEscolhidas = array_filter(array_map('trim', explode(',', $lead['administradoras'])), fn($a) => $a !== '' && $a !== 'Ainda não sei');
$adm = implode(', ', $admEscolhidas) ?: ($lead['administradora_origem'] ?: 'A definir');

$texto = "NOVA SOLICITAÇÃO DE CREDENCIAMENTO\nAdministradora: {$adm}\nRecebida em {$recebido}\n";
$linhas = '';
$estiloTitulo = 'padding:24px 0 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#2c6d82;font-weight:700;border-bottom:1px solid #d5e0e5';
foreach ($secoes as [$titulo, $itens]) {
    $texto .= "\n" . mb_strtoupper($titulo) . "\n";
    $linhas .= '<tr><td colspan="2" style="' . $estiloTitulo . '">' . h($titulo) . '</td></tr>';
    foreach ($itens as [$rotulo, $valor]) {
        $texto .= ($rotulo !== '' ? "{$rotulo}: " : '') . $valor . "\n";
        $linhas .= $rotulo !== ''
            ? '<tr><td style="padding:8px 16px 8px 0;width:200px;color:#50666f;vertical-align:top">' . h($rotulo) . '</td><td style="padding:8px 0;color:#0d2f3e;font-weight:600;vertical-align:top">' . h($valor) . '</td></tr>'
            : '<tr><td colspan="2" style="padding:12px 0;color:#0d2f3e;line-height:22px">' . nl2br(h($valor)) . '</td></tr>';
    }
}
$texto .= "\nResponder pelo WhatsApp: {$waLead}\n";
$html = '<!doctype html><html lang="pt-BR"><body style="margin:0;padding:24px;background:#f1f6f8;font-family:Arial,Helvetica,sans-serif;font-size:14px">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">'
    . '<tr><td style="background:#0d2f3e;padding:24px 32px;color:#ffffff"><div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#afc3ca">Site RBS · Credenciamento</div>'
    . '<div style="display:inline-block;margin-top:12px;padding:6px 14px;border-radius:999px;background:#ffffff;color:#0d2f3e;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase">' . h($adm) . '</div>'
    . '<div style="font-size:22px;font-weight:700;margin-top:6px">' . h($lead['nome']) . '</div>'
    . '<div style="color:#afc3ca;margin-top:4px">' . h($lead['cidade']) . ' · ' . h($lead['perfil']) . '</div></td></tr>'
    . '<tr><td style="padding:8px 32px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">' . $linhas . '</table>'
    . '<p style="margin:28px 0 0"><a href="' . h($waLead) . '" style="display:inline-block;background:#1e7a4f;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:999px">Responder pelo WhatsApp</a>'
    . ' &nbsp; <a href="mailto:' . h($lead['email']) . '" style="color:#1d566b;font-weight:600">Responder por e-mail</a></p>'
    . '</td></tr></table></body></html>';

$assunto = 'Credenciamento ' . $adm . ' | ' . $lead['nome'] . ' | ' . $lead['cidade'];
$limite = 'rbs-' . bin2hex(random_bytes(8));
$corpo = "--{$limite}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . chunk_split(base64_encode($texto))
    . "--{$limite}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . chunk_split(base64_encode($html))
    . "--{$limite}--";
$headers = [
    'From: RBS Site <' . REMETENTE . '>',
    'Reply-To: ' . $lead['email'],
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $limite . '"',
];
$enviado = @mail(DESTINO, '=?UTF-8?B?' . base64_encode($assunto) . '?=', $corpo, implode("\r\n", $headers));

echo json_encode(['ok' => true, 'email' => $enviado]);
