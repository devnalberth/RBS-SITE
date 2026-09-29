<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido.'], JSON_UNESCAPED_UNICODE);
    exit;
}

function proxy_json_error(int $status, string $error, string $message): void
{
    http_response_code($status);
    echo json_encode(['error' => $error, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function build_upstream_url(string $baseUrl, string $path): string
{
    $url = $baseUrl . $path;
    if (!empty($_SERVER['QUERY_STRING'])) {
        $url .= '?' . $_SERVER['QUERY_STRING'];
    }
    return $url;
}

function fallback_resolve(string $baseUrl): array
{
    $host = parse_url($baseUrl, PHP_URL_HOST);
    if (!is_string($host) || $host === '') {
        return [];
    }

    $scheme = strtolower((string) parse_url($baseUrl, PHP_URL_SCHEME));
    $port = parse_url($baseUrl, PHP_URL_PORT) ?: ($scheme === 'http' ? 80 : 443);
    $ips = '147.79.105.157,89.116.213.249';

    return [$host . ':' . $port . ':' . $ips];
}

function fetch_upstream(string $url, array $headers, array $resolve = []): array
{
    if (!function_exists('curl_init')) {
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => implode("\r\n", $headers),
                'timeout' => 20,
                'ignore_errors' => true,
            ],
        ]);
        $body = @file_get_contents($url, false, $context);

        return $body === false
            ? ['networkError' => 'Falha ao contatar a API.']
            : ['status' => 200, 'body' => $body];
    }

    $ch = curl_init($url);
    $options = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
    ];

    if ($resolve !== []) {
        $options[CURLOPT_RESOLVE] = $resolve;
    }

    curl_setopt_array($ch, $options);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    return $body === false
        ? ['networkError' => $error ?: 'Falha ao contatar a API.']
        : ['status' => $status > 0 ? $status : 200, 'body' => $body];
}

$config = require __DIR__ . '/config.php';
$apiKey = trim((string) ($config['investmaster_api_key'] ?? ''));
$baseUrl = rtrim(trim((string) ($config['investmaster_api_base_url'] ?? '')), '/');

if ($apiKey === '' || $baseUrl === '') {
    proxy_json_error(500, 'missing_api_config', 'API não configurada.');
}

if (filter_var($baseUrl, FILTER_VALIDATE_URL) === false) {
    proxy_json_error(500, 'invalid_api_base_url', 'URL base da API inválida.');
}

$headers = [
    'Accept: application/json',
    'Authorization: Bearer ' . $apiKey,
    'X-API-Key: ' . $apiKey,
];

$primaryUrl = build_upstream_url($baseUrl, '/api/v1/cartas');
$response = fetch_upstream($primaryUrl, $headers);

if (isset($response['networkError'])) {
    $response = fetch_upstream($primaryUrl, $headers, fallback_resolve($baseUrl));
}

if (isset($response['networkError'])) {
    proxy_json_error(502, 'upstream_unreachable', 'Não foi possível consultar as cartas agora.');
}

$status = (int) ($response['status'] ?? 502);
$body = (string) ($response['body'] ?? '');

if ($status === 404) {
    $fallbackUrl = build_upstream_url($baseUrl, '/api/public/cartas');
    $response = fetch_upstream($fallbackUrl, $headers);

    if (isset($response['networkError'])) {
        proxy_json_error(502, 'upstream_unreachable', 'Não foi possível consultar as cartas agora.');
    }

    $status = (int) ($response['status'] ?? 502);
    $body = (string) ($response['body'] ?? '');
}

header('Cache-Control: public, max-age=0, s-maxage=5, stale-while-revalidate=20');
http_response_code($status);
echo $body;
