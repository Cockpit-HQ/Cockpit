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

            if (!isset($license['domain']) || !isset($license['email']) || !isset($license['key']) || !isset($license['model'])) {
                return false;
            }

            $this->license = array_merge([
                'domain' => null,
                'email' => null,
                'key' => null,
                'model' => null,
            ], $license);

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
