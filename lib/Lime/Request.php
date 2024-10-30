<?php

namespace Lime;

class Request {

    public array $request = [];
    public array $post = [];
    public array $query = [];
    public array $files = [];
    public array $cookies = [];
    public array $headers = [];

    public array $server = [];
    public array $body = [];

    public string $site_url = '';
    public string $base_url = '';
    public string $base_route = '';
    public string $route = '/';
    public string $method = 'GET';

    public bool $stopped = false;

    public static function fromGlobalRequest(array $config = []): self {

        $config = array_merge([
            'site_url'   => '',
            'base_url'   => '/',
            'base_route' => '',
            'route' => $_SERVER['PATH_INFO'] ?? '/',
            'request' => $_REQUEST,
            'method' => $_SERVER['REQUEST_METHOD'] ?? 'GET',
            'post' => $_POST,
            'cookies' => $_COOKIE,
            'query' => $_GET,
            'files' => $_FILES,
            'server' => $_SERVER,
            'headers' => self::getAllHeaders($_SERVER)
        ], $config);

        // check for php://input and merge with $_REQUEST
        if (
            (isset($_SERVER['CONTENT_TYPE']) && stripos($_SERVER['CONTENT_TYPE'],'application/json')!==false) ||
            (isset($_SERVER['HTTP_CONTENT_TYPE']) && stripos($_SERVER['HTTP_CONTENT_TYPE'],'application/json')!==false) // PHP build in Webserver !?
        ) {
            if ($json = json_decode(@file_get_contents('php://input'), true)) {
                $config['body'] = $json;
                $config['request'] = array_merge($config['request'], $json);
            }
        }

        return new self($config);
    }

    public function __construct(array $config = []) {

        $this->request = $config['request'] ?? [];
        $this->method = $config['method'] ?? 'GET';
        $this->post = $config['post'] ?? [];
        $this->query = $config['query'] ?? [];
        $this->server = $config['server'] ?? [];
        $this->body = $config['body'] ?? [];
        $this->files = $config['files'] ?? [];
        $this->headers = $config['headers'] ?? [];
        $this->cookies = $config['cookies'] ?? [];

        $this->site_url = $config['site_url'] ?? '';
        $this->base_url = $config['base_url'] ?? '';
        $this->base_route = $config['base_route'] ?? '';
        $this->route = $config['route'] ?? '/';
    }

    public function param(?string $index = null, mixed $default = null, mixed $source = null): mixed {

        $src = $source ?: $this->request;
        $cast = null;

        if (str_contains($index, ':')) {
            list($index, $cast) = explode(':', $index, 2);
        }

        $value = fetch_from_array($src, $index, null);

        if (is_null($value)) {
            $value = $default;
        }

        if ($cast && $value !== null) {

            if (!in_array($cast, ['string', 'bool', 'boolean', 'int', 'integer', 'float', 'double', 'array', 'object'])) {
                return null;
            }

            if (in_array($cast, ['bool', 'boolean']) && is_string($value) && in_array($value, ['true', 'false'])) {
                $value = $value === 'true';
            }

            if ($cast === 'string' && (is_array($value) || is_object($value))) {
                $value = json_encode($value);
            }

            settype($value, $cast);
        }

        return $value;
    }

    public function getClientIp(): ?string {

        if (isset($this->server['HTTP_X_FORWARDED_FOR'])){
            // Use the forwarded IP address, typically set when the
            // client is using a proxy server.
            return $this->server['HTTP_X_FORWARDED_FOR'];
        }elseif (isset($this->server['HTTP_CLIENT_IP'])){
            // Use the forwarded IP address, typically set when the
            // client is using a proxy server.
            return $this->server['HTTP_CLIENT_IP'];
        }
        elseif (isset($this->server['REMOTE_ADDR'])){
            // The remote IP address
            return $this->server['REMOTE_ADDR'];
        }

        return null;
    }

    public function getClientLang(string $default = 'en'): string {
        if (!isset($this->server['HTTP_ACCEPT_LANGUAGE'])) {
            return $default;
        }
        return strtolower(substr($this->server['HTTP_ACCEPT_LANGUAGE'], 0, 2));
    }

    public function getSiteUrl(bool $withpath = false): string {

        $url = $this->site_url;

        if ($withpath) {

            $path = dirname($this->server['SCRIPT_NAME']);

            if ($path == '/' || str_ends_with($url, $path)) {
                $path = '';
            }

            $url .= $path;
        }

        return rtrim($url, '/');
    }

    public function is(string $type): bool {

        switch (strtolower($type)){
            case 'ajax':
                return (
                    (isset($this->server['HTTP_X_REQUESTED_WITH']) && ($this->server['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'))        ||
                    (isset($this->server['CONTENT_TYPE']) && stripos($this->server['CONTENT_TYPE'],'application/json')!==false)           ||
                    (isset($this->server['HTTP_CONTENT_TYPE']) && stripos($this->server['HTTP_CONTENT_TYPE'],'application/json')!==false)
                );

            case 'mobile':

                $mobileDevices = [
                    'android', 'iphone', 'ipod', 'ipad', 'windows phone',
                    'blackberry', 'webos', 'kindle', 'samsung', 'huawei',
                    'zte-', 'lg-', 'googlebot-mobile'
                ];

                return preg_match('/(' . implode('|', $mobileDevices). ')/i', strtolower($this->server['HTTP_USER_AGENT']));

            case 'post':
                return (isset($this->server['REQUEST_METHOD']) && strtolower($this->server['REQUEST_METHOD']) == 'post');

            case 'get':
                return (isset($this->server['REQUEST_METHOD']) && strtolower($this->server['REQUEST_METHOD']) == 'get');

            case 'put':
                return (isset($this->server['REQUEST_METHOD']) && strtolower($this->server['REQUEST_METHOD']) == 'put');

            case 'delete':
                return (isset($this->server['REQUEST_METHOD']) && strtolower($this->server['REQUEST_METHOD']) == 'delete');

            case 'ssl':
                return (!empty($this->server['HTTPS']) && $this->server['HTTPS'] !== 'off');

            case 'preflight':
                return (isset($this->server['REQUEST_METHOD']) && strtolower($this->server['REQUEST_METHOD']) == 'options');

            case 'cors':

                if (!isset($this->headers['Origin'])) {
                    return false;
                }

                return $this->headers['Origin'] == $this->getSiteUrl();
        }

        return false;
    }

    public function getBearerToken(): ?string {

        $headers = null;
        $token   = null;
        $server  = $this->server;

        if (isset($server['Authorization'])) {
            $headers = trim($server['Authorization']);
        } elseif (isset($server['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($server['HTTP_AUTHORIZATION']);
        } else {
            $requestHeaders = $this->headers;
            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }

        // HEADER: Get the access token from the header
        if ($headers) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                $token = $matches[1];
            }
        }

        return $token;
    }

    public static function getAllHeaders(array $server): array {

        if (!$server) {
            $server = $_SERVER;
        }

        $headers = [];

        $copy_server = [
            'CONTENT_TYPE'   => 'Content-Type',
            'CONTENT_LENGTH' => 'Content-Length',
            'CONTENT_MD5'    => 'Content-Md5',
        ];

        foreach ($server as $key => $value) {
            if (str_starts_with($key, 'HTTP_')) {
                $key = substr($key, 5);
                if (!isset($copy_server[$key]) || !isset($server[$key])) {
                    $key = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', $key))));
                    $headers[$key] = $value;
                }
            } elseif (isset($copy_server[$key])) {
                $headers[$copy_server[$key]] = $value;
            }
        }

        if (!isset($headers['Authorization'])) {
            if (isset($server['REDIRECT_HTTP_AUTHORIZATION'])) {
                $headers['Authorization'] = $server['REDIRECT_HTTP_AUTHORIZATION'];
            } elseif (isset($server['PHP_AUTH_USER'])) {
                $basic_pass = $server['PHP_AUTH_PW'] ?? '';
                $headers['Authorization'] = 'Basic ' . base64_encode($server['PHP_AUTH_USER'] . ':' . $basic_pass);
            } elseif (isset($server['PHP_AUTH_DIGEST'])) {
                $headers['Authorization'] = $server['PHP_AUTH_DIGEST'];
            }
        }

        return $headers;
    }
}
