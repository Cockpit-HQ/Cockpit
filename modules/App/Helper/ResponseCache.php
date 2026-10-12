<?php

namespace App\Helper;

class ResponseCache extends \Lime\Helper {

    protected $cacheHandler = null;

    protected function initialize() {

        if ($this->app->retrieve('response/cache/handler', 'memory') == 'memory') {
            $this->cacheHandler = new ResponseCacheMemoryeHandler($this->app);
        } else {
            $this->cacheHandler = new ResponseCacheFileHandler($this->app);
        }
    }

    /**
     * Handle the response caching.
     *
     * Must only be called after the request has been authenticated.
     *
     * @param \Lime\Request $request The request object.
     * @param array $context The resolved auth context (e.g. token, user) the response depends on.
     * @return bool True if the response was served from cache.
     */
    public function handle($request, array $context = []): bool {

        if (!$request->param('rspc')) {
            return false;
        }

        $key = $this->getKey($request, $context);

        if (!$this->getCache($request, $key)) {
            $this->cache($request, $key);
            return false;
        }

        return true;
    }

    /**
     * Invalidate all cached responses.
     *
     * @return void
     */
    public function invalidate() {
        $this->app->memory->set('rspc:gen', \uniqid('', true));
    }

    /**
     * Build the cache key for a request.
     *
     * @param \Lime\Request $request The request object.
     * @param array $context The resolved auth context.
     * @return string The cache key.
     */
    protected function getKey($request, array $context = []): string {

        // let modules/addons add request data the response depends on (e.g. custom headers)
        $vary = [];

        $this->app->trigger('app.response.cache.vary', [&$vary, $request]);

        $hash = \md5(\serialize([
            $request->method,
            $request->request,
            $context,
            $vary,
            $this->app->memory->get('rspc:gen'),
        ]));

        return \trim("{$request->route}/{$hash}", '/');
    }

    /**
     * Cache the response.
     *
     * @param \Lime\Request $request The request object.
     * @param string $key The cache key.
     * @return void
     */
    protected function cache($request, string $key) {

        $cacheHandler = $this->cacheHandler;
        $ttl = $this->app->retrieve('response/cache/duration', 60);

        if (\is_numeric($request->param('rspc')) && $request->param('rspc') > 1) {
            $ttl = \intval($request->param('rspc'));
        }

        if ($ttl < 1) {
            return;
        }

        $this->app->on('after', function() use($request, $key, $ttl, $cacheHandler) {

            if ($request->stopped || $this->response->status != 200) {
                return;
            }

            $contents = $this->response->body;
            $mime = $this->response->mime;

            // store the raw response string
            if (\is_array($contents) || \is_object($contents)) {
                $contents = \json_encode($contents);
                $mime = 'json';
            }

            if (!\is_string($contents)) {
                return;
            }

            $created = \gmdate("D, d M Y H:i:s", \time()) . " GMT";

            $cacheHandler->cache($key, [
                'created' => $created,
                'mime' => $mime,
                'eol' => (\time() + $ttl),
                'contents' => $contents
            ], $ttl);

            $this->response->headers['Last-Modified'] = $created;

        }, -2000);
    }

    /**
     * Apply the cached response (if any) to the app response.
     *
     * @param \Lime\Request $request The request object.
     * @param string $key The cache key.
     * @return bool True if a cached response was found.
     */
    protected function getCache($request, string $key): bool {

        $cache = $this->cacheHandler->getCache($key);

        if (!$cache) {
            return false;
        }

        $response = $this->app->response;

        $response->headers['APP_RSP_CACHE'] = 'true';
        $response->headers['APP_RSP_EOL'] = $cache['eol'];
        $response->headers['Last-Modified'] = $cache['created'];

        $since = \strtotime($request->server['HTTP_IF_MODIFIED_SINCE'] ?? '');

        if ($since && $since >= \strtotime($cache['created'])) {
            $response->status = 304;
            $response->body = '';
            return true;
        }

        $response->mime = $cache['mime'] ?? 'text/html';
        $response->body = $cache['contents'];

        $this->app->trigger('app.response.cache.after');

        return true;
    }
}

class ResponseCacheFileHandler extends \Lime\AppAware {

    public function cache(string $key, array $data, int $ttl) {
        $this->app->fileStorage->write("cache://rspc/{$key}.php", '<?php return '.\var_export($data, true).';');
    }

    public function getCache(string $key) {

        $file = $this->app->path("#cache:rspc/{$key}.php");
        $cache = null;

        if ($file) {

            $cache = include($file);

            if ($cache['eol'] < \time()) {
                \unlink($file);
                $cache = null;
            }
        }

        return $cache;
    }
}

class ResponseCacheMemoryeHandler extends \Lime\AppAware {

    public function cache(string $key, array $data, int $ttl) {
        $this->app->memory->setex("rspc:{$key}", $ttl, $data);
    }

    public function getCache(string $key) {

        $key = "rspc:{$key}";
        $cache = $this->app->memory->get($key);

        if ($cache) {

            if ($cache['eol'] < \time()) {
                $this->app->memory->del($key);
                $cache = null;
            }
        }

        return $cache;
    }
}
