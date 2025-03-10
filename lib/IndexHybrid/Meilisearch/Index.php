<?php

namespace IndexHybrid\Meilisearch;

use IndexLite\Utils;

class Index {

    protected Manager $manager;
    private string $name;

    public function __construct(string $name, Manager $manager) {
        $this->name = $name;
        $this->manager = $manager;
    }

    /**
     * Clears all the documents from the specified index.
     *
     * @return void
     */
    public function clear() {
        return $this->manager->sendRequest("/indexes/{$this->name}/documents", 'DELETE');
    }

    /**
     * Adds a document to the index.
     *
     * @param mixed $id The identifier of the document.
     * @param array $data The data of the document.
     * @param bool $safe Optional. Specifies whether to remove an existing document with the same ID before adding the new document. Defaults to true.
     * @return void
     */
    public function addDocument(mixed $id, array $data, bool $safe = true): void {

        if ($safe) {
            $this->removeDocument($id);
        }

        $data['id'] = $id;

        $this->addDocuments([$data]);
    }

    /**
     * Add multiple documents to the index.
     *
     * @param array $documents The documents to be added. Each document should be an associative array with the following keys:
     *                        - id (optional) : The ID of the document. If not provided, a UUID will be generated.
     *                        - ... (other fields): Other fields of the document.
     *
     * @return array The response from the manager's sendRequest() method.
     */
    public function addDocuments(array $documents) {

        foreach ($documents as &$document) {

            if (!isset($document['id'])) {
                $document['id'] = Utils::uuidv4();
            }
        }

        return $this->manager->sendRequest("/indexes/{$this->name}/documents", 'POST', $documents);
    }

    /**
     * Replace a document in the index with the given ID.
     *
     * @param mixed $id The ID of the document to be replaced.
     * @param array $document The replacement document. This should be an associative array with the following keys:
     *                        - id : The ID of the document. This should match the $id parameter.
     *                        - ... (other fields): Other fields of the replacement document.
     *
     * @return array The response from the manager's sendRequest() method.
     */
    public function replaceDocument(mixed $id, array $document) {
        $document['id'] = $id;
        return $this->manager->sendRequest("/indexes/{$this->name}/documents", 'POST', $document);
    }

    /**
     * Remove a document from the index.
     *
     * @param mixed $id The ID of the document to be removed.
     *
     * @return array The response from the manager's sendRequest() method.
     */
    public function removeDocument(mixed $id) {
        return $this->manager->sendRequest("/indexes/{$this->name}/documents/{$id}", 'DELETE');
    }

    /**
     * Perform a search query on the specified index.
     *
     * @param string $query The search query string.
     * @param array $options [optional] An array of options for the search query:
     *     - fields: The list of fields to retrieve. It can be either a comma-separated string or an array of field names.
     *     - limit: The number of results to limit to. Defaults to 50.
     *     - offset: The number of results to skip. Defaults to 0.
     *     - filter: A filter to apply to the search results.
     * @return mixed The search results.
     */
    public function search(string $query, array $options = []) {

        $options = array_merge([
            'fields' => '*',
            'limit' => 50,
            'offset' => 0,
            'filter' => null,
        ], $options);

        $params = [
            'q' => $query,
            'limit' => $options['limit'],
            'offset' => $options['offset'],
        ];

        if ($options['fields'] !== '*') {
            $params['attributesToRetrieve'] = is_string($options['fields']) ? array_map(fn($f) => trim($f), explode(',' , $options['fields'])) : $options['fields'];
        }

        if (!$options['filter']) {
            $queryString = http_build_query($params);
            return $this->manager->sendRequest("/indexes/{$this->name}/search?{$queryString}", 'GET');
        }

        return $this->manager->sendRequest("/indexes/{$this->name}/search", 'POST', $params);
    }

    /**
     * Count the number of documents in the specified index.
     *
     * @param string $query [optional] The search query string. Defaults to an empty string.
     * @return int The number of documents in the index.
     */
    public function countDocuments(string $query = '') {

        if (!$query) {
            return $this->manager->sendRequest("/indexes/{$this->name}/stats", 'GET')['numberOfDocuments'] ?? 0;
        }

        return $this->search($query, ['limit' => 1])['estimatedTotalHits'] ?? 0;
    }
}
