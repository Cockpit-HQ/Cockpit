<?php

namespace IndexHybrid\Meilisearch;

use Exception;

class Index {

    protected Manager $manager;
    private $name;

    public function __construct(string $name, Manager $manager) {
        $this->name = $name;
        $this->manager = $manager;
    }

    public function clear() {
        return $this->manager->sendRequest("/indexes/{$this->name}/documents", 'DELETE');
    }

    public function addDocument(mixed $id, array $data, bool $safe = true) {

        if ($safe) {
            $this->removeDocument($id);
        }

        $data['id'] = $id;

        $this->addDocuments([$data]);
    }

    public function addDocuments(array $documents) {

        foreach ($documents as &$document) {

            if (!isset($document['id'])) {
                $document['id'] = uuidv4();
            }
        }

        return $this->manager->sendRequest("/indexes/{$this->name}/documents", 'POST', $documents);
    }

    public function replaceDocument(mixed $id, array $document) {
        $document['id'] = $id;
        return $this->manager->sendRequest("/indexes/{$this->name}/documents", 'POST', $document);
    }

    public function removeDocument(mixed $id) {
        return $this->manager->sendRequest("/indexes/{$this->name}/documents/{$id}", 'DELETE');
    }

    public function search(string $query, array $options = []) {

        $options = array_merge([
            'fields' => null,
            'limit' => 50,
            'offset' => 0,
            'filter' => null,
        ], $options);

        $params = [
            'q' => $query,
            'limit' => $options['limit'],
            'offset' => $options['offset'],
        ];

        if ($options['fields']) {
            $params['attributesToRetrieve'] = is_string($options['fields']) ? explode(',' , $options['fields']) : $options['fields'];
        }

        if (!$options['filter']) {
            $queryString = http_build_query($params);
            return $this->manager->sendRequest("/indexes/{$this->name}/search?{$queryString}", 'GET');
        }

        return $this->manager->sendRequest("/indexes/{$this->name}/search", 'POST', $params);
    }

    public function countDocuments(string $query = '') {

        if (!$query) {
            return $this->manager->sendRequest("/indexes/{$this->name}/stats", 'GET')['numberOfDocuments'] ?? 0;
        }

        return $this->search($query, ['limit' => 1])['estimatedTotalHits'] ?? 0;
    }
}

function uuidv4() {

    if (function_exists('random_bytes')) {
        $uuid = bin2hex(random_bytes(16));
    } elseif (function_exists('openssl_random_pseudo_bytes')) {
        $uuid = bin2hex(openssl_random_pseudo_bytes(16));
    } else {
        $uuid = md5(uniqid('', true));
    }

    $uuid[12] = '4';
    $uuid[16] = dechex(hexdec($uuid[16]) & 3 | 8);

    return substr($uuid, 0, 8) . '-' . substr($uuid, 8, 4) . '-' . substr($uuid, 12, 4) . '-' . substr($uuid, 16, 4) . '-' . substr($uuid, 20);
}
