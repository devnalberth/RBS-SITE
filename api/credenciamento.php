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
    'nome_fantasia' => campo('nome_fantasia'),
    'cnpj'          => campo('cnpj', 18),
    'telefone_empresa' => campo('telefone_empresa', 20),
    'email_socio_admin' => campo('email_socio_admin'),
    'chave_pix'     => campo('chave_pix', 120),
    'cpf'           => campo('cpf', 14),
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

// 2) avisa por e-mail, em seções
$recebido = date('d/m/Y \à\s H:i');
$secoes = [
    'Contato' => [
        'Nome'      => $lead['nome'],
        'CPF'       => $lead['cpf'],
        'WhatsApp'  => $lead['whatsapp'],
        'E-mail'    => $lead['email'],
        'Cidade/UF' => $lead['cidade'],
    ],
    'Empresa' => [
        'Razão social'  => $lead['razao_social'],
        'Nome fantasia' => $lead['nome_fantasia'],
        'CNPJ'          => $lead['cnpj'],
        'Telefone'      => $lead['telefone_empresa'],
        'E-mail do sócio administrador' => $lead['email_socio_admin'],
        'Chave Pix'     => $lead['chave_pix'],
    ],
    'Perfil' => [
        'Perfil profissional'   => $lead['perfil'],
        'Possui CNPJ'           => $lead['possui_cnpj'],
        'Já atua com consórcio' => $lead['atua_consorcio'],
        'Tamanho da equipe'     => $lead['tamanho_equipe'],
    ],
    'Interesse' => [
        'Administradoras'  => $lead['administradoras'],
        'Aba de origem'    => $lead['administradora_origem'],
    ],
    'Origem do contato' => [
        'Recebido em'  => $recebido,
        'Página'       => $lead['pagina'],
        'UTM source'   => $lead['utm_source'],
        'UTM medium'   => $lead['utm_medium'],
        'UTM campaign' => $lead['utm_campaign'],
        'Consentimento LGPD' => 'Sim',
    ],
];
if ($lead['possui_cnpj'] !== 'Sim') { unset($secoes['Empresa']); }
$waLead = 'https://wa.me/55' . $tel;
$admEscolhidas = array_filter(array_map('trim', explode(',', $lead['administradoras'])), fn($a) => $a !== '' && $a !== 'Ainda não sei');
$adm = implode(', ', $admEscolhidas) ?: ($lead['administradora_origem'] ?: 'A definir');

$texto = "NOVA SOLICITAÇÃO DE CREDENCIAMENTO\nAdministradora: {$adm}\nRecebida em {$recebido}\n";
foreach ($secoes as $titulo => $itens) {
    $texto .= "\n" . mb_strtoupper($titulo) . "\n";
    foreach ($itens as $rotulo => $valor) {
        if ($valor !== '') { $texto .= "{$rotulo}: {$valor}\n"; }
    }
    if ($titulo === 'Interesse' && $lead['mensagem'] !== '') {
        $texto .= "\nMENSAGEM\n{$lead['mensagem']}\n";
    }
}
$texto .= "\nResponder pelo WhatsApp: {$waLead}\n";

$linhas = '';
foreach ($secoes as $titulo => $itens) {
    $linhas .= '<tr><td colspan="2" style="padding:24px 0 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#2c6d82;font-weight:700;border-bottom:1px solid #d5e0e5">' . h($titulo) . '</td></tr>';
    foreach ($itens as $rotulo => $valor) {
        if ($valor === '') { continue; }
        $linhas .= '<tr><td style="padding:8px 16px 8px 0;width:180px;color:#50666f;vertical-align:top">' . h($rotulo) . '</td><td style="padding:8px 0;color:#0d2f3e;font-weight:600;vertical-align:top">' . h($valor) . '</td></tr>';
    }
    if ($titulo === 'Interesse' && $lead['mensagem'] !== '') {
        $linhas .= '<tr><td colspan="2" style="padding:24px 0 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#2c6d82;font-weight:700;border-bottom:1px solid #d5e0e5">Mensagem</td></tr>';
        $linhas .= '<tr><td colspan="2" style="padding:12px 0;color:#0d2f3e;line-height:22px">' . nl2br(h($lead['mensagem'])) . '</td></tr>';
    }
}
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
