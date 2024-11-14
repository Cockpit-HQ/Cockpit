<?php

namespace Lime;

class Response {

    public mixed $body    = '';
    public int $status    = 200;
    public string $mime   = 'html';
    public bool $gzip     = false;
    public bool $nocache  = false;
    public bool $etag     = false;
    public array $headers = [];

    /* status codes */
    public static array $statusCodes = [
    // Informational 1xx
    100 => 'Continue',
    101 => 'Switching Protocols',
    // Successful 2xx
    200 => 'OK',
    201 => 'Created',
    202 => 'Accepted',
    203 => 'Non-Authoritative Information',
    204 => 'No Content',
    205 => 'Reset Content',
    206 => 'Partial Content',
    // Redirection 3xx
    300 => 'Multiple Choices',
    301 => 'Moved Permanently',
    302 => 'Found',
    303 => 'See Other',
    304 => 'Not Modified',
    305 => 'Use Proxy',
    307 => 'Temporary Redirect',
    308 => 'Permanent Redirect',
    // Client Error 4xx
    400 => 'Bad Request',
    401 => 'Unauthorized',
    402 => 'Payment Required',
    403 => 'Forbidden',
    404 => 'Not Found',
    405 => 'Method Not Allowed',
    406 => 'Not Acceptable',
    407 => 'Proxy Authentication Required',
    408 => 'Request Timeout',
    409 => 'Conflict',
    410 => 'Gone',
    411 => 'Length Required',
    412 => 'Precondition Failed',
    413 => 'Request Entity Too Large',
    414 => 'Request-URI Too Long',
    415 => 'Unsupported Media Type',
    416 => 'Request Range Not Satisfiable',
    417 => 'Expectation Failed',
    422 => 'Unprocessable Entity',
    426 => 'Upgrade Required',
    428 => 'Precondition Required',
    429 => 'Too Many Requests',
    431 => 'Request Header Fields Too Large',
    451 => 'Unavailable For Legal Reasons',
    // Server Error 5xx
    500 => 'Internal Server Error',
    501 => 'Not Implemented',
    502 => 'Bad Gateway',
    503 => 'Service Unavailable',
    504 => 'Gateway Timeout',
    505 => 'HTTP Version Not Supported',
    506 => 'Variant Also Negotiates',
    507 => 'Insufficient Storage',
    508 => 'Loop Detected',
    510 => 'Not Extended',
    511 => 'Network Authentication Required'
    ];

    /* mime types */
    public static array $mimeTypes = [
        'asc'   => 'text/plain',
        'au'    => 'audio/basic',
        'avi'   => 'video/x-msvideo',
        'avif'  => 'image/avif',
        'bin'   => 'application/octet-stream',
        'class' => 'application/octet-stream',
        'css'   => 'text/css',
        'csv'   => 'application/vnd.ms-excel',
        'doc'   => 'application/msword',
        'dll'   => 'application/octet-stream',
        'dvi'   => 'application/x-dvi',
        'exe'   => 'application/octet-stream',
        'htm'   => 'text/html',
        'html'  => 'text/html',
        'json'  => 'application/json',
        'js'    => 'application/x-javascript',
        'txt'   => 'text/plain',
        'rtf'   => 'text/rtf',
        'wml'   => 'text/vnd.wap.wml',
        'wmls'  => 'text/vnd.wap.wmlscript',
        'xsl'   => 'text/xml',
        'xml'   => 'text/xml',
        'bmp'   => 'image/bmp',
        'rss'   => 'application/rss+xml',
        'atom'  => 'application/atom+xml',
        'gif'   => 'image/gif',
        'jpeg'  => 'image/jpeg',
        'jpg'   => 'image/jpeg',
        'jpe'   => 'image/jpeg',
        'png'   => 'image/png',
        'tiff'  => 'image/tiff',
        'tif'   => 'image/tiff',
        'ico'   => 'image/vnd.microsoft.icon',
        'svg'   => 'image/svg+xml',
        'webp'   => 'image/webp',
        'mpeg'  => 'video/mpeg',
        'mpg'   => 'video/mpeg',
        'mpe'   => 'video/mpeg',
        'webm'  => 'video/webm',
        'qt'    => 'video/quicktime',
        'mov'   => 'video/quicktime',
        'wmv'   => 'video/x-ms-wmv',
        'mp2'   => 'audio/mpeg',
        'mp3'   => 'audio/mpeg',
        'snd'   => 'audio/basic',
        'midi'  => 'audio/midi',
        'mid'   => 'audio/midi',
        'm3u'   => 'audio/x-mpegurl',
        'rm'    => 'audio/x-pn-realaudio',
        'ram'   => 'audio/x-pn-realaudio',
        'rpm'   => 'audio/x-pn-realaudio-plugin',
        'ra'    => 'audio/x-realaudio',
        'wav'   => 'audio/x-wav',
        'weba'  => 'audio/webm',
        'zip'   => 'application/zip',
        'epub'  => 'application/epub+zip',
        'pdf'   => 'application/pdf',
        'xls'   => 'application/vnd.ms-excel',
        'ppt'   => 'application/vnd.ms-powerpoint',
        'wbxml' => 'application/vnd.wap.wbxml',
        'wmlc'  => 'application/vnd.wap.wmlc',
        'wmlsc' => 'application/vnd.wap.wmlscriptc',
        'spl'   => 'application/x-futuresplash',
        'gtar'  => 'application/x-gtar',
        'gzip'  => 'application/x-gzip',
        'swf'   => 'application/x-shockwave-flash',
        'tar'   => 'application/x-tar',
        'xhtml' => 'application/xhtml+xml',
        'text'  => 'text/plain',
        'yaml'  => 'application/x-yaml',
    ];

    public function flush(): void {

        if ($this->gzip && !ob_start('ob_gzhandler')) {
            ob_start();
        }

        if (!headers_sent()) {

            $body = $this->body;
            $headers = [];

            if (is_array($this->body) || is_object($this->body)) {
                $body = json_encode($this->body);
                $this->mime = 'json';
            }

            $headers['Content-type'] = self::$mimeTypes[$this->mime] ?? 'text/html';

            if ($this->nocache){
                $headers['Clear-Site-Data'] = 'cache'; // HTTP/1.1
                $headers['Cache-Control'] = 'no-cache, must-revalidate'; // HTTP/1.1
                $headers['Expires'] = 'Sat, 26 Jul 1997 05:00:00 GMT';
                $headers['Pragma'] = 'no-cache';
            }

            if ($this->etag){
                $headers['ETag'] = md5($body);
            }

            header('HTTP/1.0 '.$this->status.' '.self::$statusCodes[$this->status]);

            $headers = array_merge($headers, $this->headers);

            foreach ($headers as $h => $v) {
                header(is_numeric($h) ? $v : "{$h}: {$v}");
            }

            if (is_resource($body)) {
                fpassthru($body);
            } else {

                echo $body;

                // Flush output buffers
                while (ob_get_level()) {
                    ob_end_flush();
                }
                flush();
            }
        }
    }
}
