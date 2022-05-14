<?php

namespace MemoryStorage;

class Client {

    protected $driver;
    protected $key;

    public function __construct(string $server, array $options = []) {

        if (strpos($server, 'redis://') === 0) {

            $uri = parse_url($server);

            $options = array_merge([
                'host' => $uri['host'],
                'port' => $uri['port'] ?? 6379,
                'auth' => null,
                'timeout' => 1,
            ], $options);

            $this->driver = new \Redis();

            if (isset($options['auth'])) {
                $this->driver->connect($options['host'], $options['port'], $options['timeout'], NULL, 0, 0, ['auth' => $options['auth']]);
            } else {
                $this->driver->connect($options['host'], $options['port'], $options['timeout'], NULL, 0, 0);
            }

            // use custom prefix on all keys
            if (isset($options['prefix']) && $options['prefix']) {
                $this->driver->setOption(\Redis::OPT_PREFIX, $options['prefix']);
            }

            // select database
            if (isset($options['db']) && is_numeric($options['db'])) {
                $this->driver->select($options['db']);
            }

            $this->driver->setOption(\Redis::OPT_SERIALIZER, \Redis::SERIALIZER_PHP);

        } elseif (strpos($server, 'redislite://') === 0) {
            $this->driver = new \RedisLite(str_replace('redislite://', '', $server), $options);
        }

        if (isset($options['key']) && is_string($options['key'])) {
            $this->key = $options['key'];
        }
    }

    public function flush(): void  {
        $this->driver->flushdb();
    }

    public function get(string $key, mixed $default = null, bool $decrypt = false): mixed {

        $value = $this->driver->get($key);

        if ($value !== false && $decrypt) {
            $value = $this->decrypt($value);
        }

        if ($value === false) {
            return \is_callable($default) ? \call_user_func($default) : $default;
        }

        return $value;
    }

    public function set(string $key, mixed $value, bool $encrypt = false): void {

        if ($encrypt) {
            $value = $this->encrypt($value);
        }

        $this->driver->set($key, $value);
    }

    protected function encrypt(mixed $value): string {

        $str = json_encode($value);
        $key = hash('sha256', $this->key, true);
        $iv = openssl_random_pseudo_bytes(16);

        $ciphertext = openssl_encrypt($str, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);
        $hash = hash_hmac('sha256', $ciphertext . $iv, $key, true);

        return base64_encode($iv . $hash . $ciphertext);
    }

    protected function decrypt(string $value): mixed {

        $value = base64_decode($value);

        $iv = substr($value, 0, 16);
        $hash = substr($value, 16, 32);
        $ciphertext = substr($value, 48);
        $key = hash('sha256', $this->key, true);

        if (!hash_equals(hash_hmac('sha256', $ciphertext . $iv, $key, true), $hash)) {
            return false;
        }

        return json_decode(openssl_decrypt($ciphertext, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv), true);
    }

    public function __call($method, $args) {

        return call_user_func_array([$this->driver, $method], $args);
    }

}
