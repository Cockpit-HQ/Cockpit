<?php

namespace System\Helper;

class License extends \Lime\Helper {

    protected ?array $license = null;
    protected $unregistered = false;

    protected function initialize() {
        $this->load();
    }

    public function license(?string $key = null) {
        return $key ? ($this->license[$key] ?? null) : $this->license;
    }

    protected function load() {

        $this->license = null;

        $file = $this->app->path('#app:license.lic');

        if (!$file) {
            return false;
        }

        try {

            $license = json_decode(file_get_contents($file), $assoc = true, JSON_THROW_ON_ERROR);

            if (!isset(
                $license['domain'],
                $license['email'],
                $license['order'],
                $license['model'],
                $license['key'],
                $license['signature'],
            )) {
                return false;
            }

            $data = [
                'name'    => $license['name'],
                'company' => $license['company'] ?? '',
                'domain'  => $license['domain'],
                'email'   => $license['email'],
                'order'   => $license['order'],
                'model'   => $license['model'],
                'key'     => $license['key'],
            ];

            // @todo: come up with something more sophisticated 😄
            // md5 is used only due to performance reasons.
            // Key checking against license server will be implemented later.
            $hash = hash('md5', json_encode($data));

            if ($hash !== $license['signature']) {
                return false;
            }

            $this->license = $data;

        } catch (\Exception $e) {
            // Handle the JSON Exception
        }
    }

    public function unregistered(?bool $true = null) {

        if ($true === true) {
            $this->unregistered = true;
        }

        return $this->unregistered;
    }
}
