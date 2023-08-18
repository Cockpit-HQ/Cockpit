<?php

namespace IndexHybrid\Meilisearch;

use Exception;

class Manager {

    protected string $host;
    protected array $options;
    protected array $indexes = [];

    public function __construct(string $host, array $options = []) {

        $this->options = array_merge([
            'api_key' => null
        ], $options);

        $this->host = $host;
    }

    public function index(string $name): Index {

        $name = $this->name($name);

        if (isset($this->indexes[$name])) {
            return $this->indexes[$name];
        }

        $index = new Index($name, $this);

        $this->indexes[$name] = $index;

        return $index;
    }

    public function createIndex(string $name, array $fields = [], array $options = []) {

        $name = $this->name($name);

        if ($this->exists($name)) {
            throw new \Exception("Index <{$name}> already exists.");
        }

        $data = array_merge([
            'uid' => $name,
            'primaryKey' => 'id'
        ], $options);

        $this->sendRequest("/indexes", 'POST', $data);

        if (count($fields)) {
            $this->sendRequest("/indexes/{$name}/settings/filterable-attributes", 'PUT', $fields);
        }

        return $this->index($name);
    }

    public function removeIndex(string $name) {

        $name = $this->name($name);

        if (!$this->exists($name)) {
            return;
        }

        $rsp = $this->sendRequest("/indexes/{$name}", 'DELETE');

        unset($this->indexes[$name]);
    }

    public function exists(string $name): bool {
        return $this->getIndexes($name) !== null ? true : false;
    }

    public function getIndexes(?string $name = null) {

        $name = $name ? $this->name($name) : null;

        $indexes = [];

        if (!count($indexes)) {

            $rsp = $this->sendRequest("/indexes", 'GET');

            foreach ($rsp['results']as $i => $index) {
                $indexes[$index['uid']] = $index;
            }
        }

        return $name ? ($indexes[$name] ?? null) : $this->indexes;
    }

    protected function name(string $name) {

        $name = strtolower($name);
        $name = preg_replace('/[^a-z0-9]+/', ' ', $name);
        $name = ucwords($name);
        $name = str_replace(' ', '', $name);
        $name = lcfirst($name);

        return $name;
    }

    public function sendRequest(string $url, string $method, mixed $data = null) {

        $url = trim($url, '/');
        $ch = curl_init("{$this->host}/{$url}");

        $headers = [
            'Content-Type: application/json',
        ];

        if (isset($this->options['api_key'])) {
            $headers[] = "Authorization: Bearer {$this->options['api_key']}";
        }

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

        if ($data !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($httpCode >= 400) {
            throw new Exception("MeiliSearch request error: {$response}");
        }

        curl_close($ch);
        return json_decode($response, true);
    }
}
