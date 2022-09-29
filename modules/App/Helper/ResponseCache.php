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

    public function handle($request) {

        if (!$request->param('rspc')) {
            return;
        }

        if (!$this->getCache($request)) {
            $this->cache($request);
            return false;
        }

        return true;
    }

    protected function cache($request) {

        $cacheHandler = $this->cacheHandler;

        $this->app->on('shutdown', function() use($request, $cacheHandler) {

            if ($request->stopped || $this->response->status != 200) {
                return;
            }

            $cacheHandler->cache($request, $this->response);

        }, -2000);
    }

    protected function getCache($request) {

        $cache = $this->cacheHandler->getCache($request);

        if ($cache) {

            $this->app->on('before', function() use($cache) {

                if (!isset($this->response)) {
                    return;
                }

                $this->response->headers['APP_RSP_CACHE'] = 'true';
                $this->response->mime = $cache['mime'] ?? 'text/html';
                $this->response->body = $cache['contents'];

                $this->trigger('app.response.cache.after');

                $this->response->flush();

                $this->stop();
            });

            return true;
        }

        return false;
    }
}

class ResponseCacheFileHandler extends \Lime\AppAware {

    public function cache($request, $response) {

        $hash = trim($request->route.'/'.md5(serialize($request->request)), '/').'.php';

        $this->app->fileStorage->write("cache://{$hash}", '<?php return '.var_export([
            'mime' => $response->mime,
            'eol' => (time() + $this->app->retrieve('response/cache/duration', 60)),
            'contents' => is_object($response->body) ? json_decode(json_encode($response->body), true) : $response->body
        ], true ).';');
    }

    public function getCache($request) {

        $hash = trim($request->route.'/'.md5(serialize($request->request)), '/').'.php';
        $file = $this->app->path("#cache:{$hash}");
        $cache = null;

        if ($file) {

            $cache = include($file);

            if ($cache['eol'] < time()) {
                unlink($file);
                $cache = null;
            }
        }

        return $cache;
    }
}

class ResponseCacheMemoryeHandler extends \Lime\AppAware {

    public function cache($request, $response) {

        $hash = trim($request->route.'/'.md5(serialize($request->request)), '/');

        $this->app->memory->set($hash, [
            'mime' => $response->mime,
            'eol' => (time() + $this->app->retrieve('response/cache/duration', 60)),
            'contents' => is_object($response->body) ? json_decode(json_encode($response->body), true) : $response->body
        ]);
    }

    public function getCache($request) {

        $hash = trim($request->route.'/'.md5(serialize($request->request)), '/');
        $cache = $this->app->memory->get($hash);

        if ($cache) {

            if ($cache['eol'] < time()) {
                $this->app->memory->del($hash);
                $cache = null;
            }
        }

        return $cache;
    }
}
