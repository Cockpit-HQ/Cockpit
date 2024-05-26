<?php

namespace App\Helper;

class ApiRateLimiter extends \Lime\Helper {

    protected int $rateLimitTime;

    protected function initialize() {
        // Retrieve the rate limit time (in seconds) from the configuration
        $this->rateLimitTime = $this->app->retrieve('api.security.ratelimit.time', 60);
    }

    public function handle($request) {

        $identifier = $this->app->param('api_key', $request->server['HTTP_API_KEY'] ?? $request->getBearerToken());

        if (!$identifier) {
            $identifier = $request->getClientIp();
        }

        $ratelimit = $this->app->retrieve('api.security.ratelimit', 0);

        if (!$ratelimit) {
            return;
        }

        if ($this->isRateLimitExceeded($identifier, $ratelimit)) {
            $response = new \Lime\Response();
            $response->status = 429;
            $response->mime = 'json';
            $response->body = json_encode(['error' => 'Rate limit exceeded']);
            $response->flush();
            exit;
        }
    }

    public function isRateLimitExceeded(string $identifier, int $ratelimit = 0): bool {

        if ($ratelimit <= 0) {
            return false;
        }

        $key     = "api.ratelimit.{$this->rateLimitTime}.{$identifier}";
        $time    = time();
        $default = ['requests' => 0, 'time' => $time + $this->rateLimitTime];
        $meta    = $this->app->memory->get($key, $default);

        if ($meta['time'] < $time) {
            $this->app->memory->del($key);
            $meta = $default;
        }

        if ($meta['requests'] >= $ratelimit) {
            return true;
        }

        $meta['requests'] += 1;

        $this->app->memory->set($key, $meta);

        return false;
    }

}
