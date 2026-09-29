<?php
/**
 * RBS Consultoria Inteligente — registro de leads do formulário de credenciamento.
 * Para ativar: em assets/js/main.js, defina CONFIG.formEndpoint = 'api/credenciamento.php'.
 * Requer PHP 7.4+ com mail() habilitado (padrão na Hostinger).
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const DESTINO   = 'credenciamento@rbsconsultoriainteligente.com.br';
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

function campo(string $k, int $max = 200): string {
    $v = isset($_POST[$k]) ? (is_array($_POST[$k]) ? implode(', ', $_POST[$k]) : $_POST[$k]) : '';
    $v = trim(strip_tags((string) $v));
    $v = preg_replace('/[\r\n]+/', ' ', $v);
    return mb_substr($v, 0, $max);
}

$lead = [
    'data'          => date('Y-m-d H:i:s'),
    'nome'          => campo('nome'),
    'whatsapp'      => campo('whatsapp', 20),
    'email'         => campo('email'),
    'cidade'        => campo('cidade'),
    'perfil'        => campo('perfil'),
    'possui_cnpj'   => campo('possui_cnpj', 5),
    'atua_consorcio'=> campo('atua_consorcio', 5),
    'administradoras' => isset($_POST['administradoras']) ? campo('administradoras') : '',
    'tamanho_equipe'=> campo('tamanho_equipe', 30),
    'mensagem'      => campo('mensagem', 1000),
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

// 2) avisa por e-mail
$assunto = 'Nova solicitação de credenciamento | ' . $lead['nome'];
$corpo = "Nova solicitação de credenciamento pelo site\n\n";
foreach ($lead as $k => $v) {
    if ($v !== '') { $corpo .= str_pad(ucfirst(str_replace('_', ' ', $k)) . ':', 26) . $v . "\n"; }
}
$headers = [
    'From: RBS Site <' . REMETENTE . '>',
    'Reply-To: ' . $lead['email'],
    'Content-Type: text/plain; charset=UTF-8',
];
@mail(DESTINO, '=?UTF-8?B?' . base64_encode($assunto) . '?=', $corpo, implode("\r\n", $headers));

echo json_encode(['ok' => true]);
