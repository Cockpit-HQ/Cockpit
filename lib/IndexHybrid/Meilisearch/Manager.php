<?php

namespace IndexHybrid\Meilisearch;

use Exception;

class Manager {

    protected string $host;
    protected array $options;
    protected array $indexes = [];

    public function __construct(string $host, array $options = []) {

        $this->options = array_merge([
            'api_key' => null,
            'timeout' => 30,
            'connect_timeout' => 10,
            'retry_attempts' => 3,
            'retry_delay' => 1000, // milliseconds
        ], $options);

        $this->host = rtrim($host, '/');
        
        // Validate connection on construction
        if (!$this->validateConnection()) {
            throw new Exception("Could not connect to Meilisearch server at: {$host}");
        }
    }

    /**
     * Validate connection to Meilisearch server
     */
    private function validateConnection(): bool {
        try {
            $response = $this->sendRequest('/health', 'GET');
            return isset($response['status']) && $response['status'] === 'available';
        } catch (Exception $e) {
            return false;
        }
    }

    /**
     * @param string $name The name of the index to retrieve or create.
     * @return Index The retrieved or created index.
     */
    public function index(string $name): Index {

        $name = $this->name($name);

        if (isset($this->indexes[$name])) {
            return $this->indexes[$name];
        }

        $index = new Index($name, $this);

        $this->indexes[$name] = $index;

        return $index;
    }

    /**
     * Creates an index with the given name, fields, and options.
     *
     * @param string $name The name of the index to create.
     * @param array $fields The fields to be indexed.
     * @param array $options Additional options for the index.
     * @return Index Returns an instance of the created Index.
     * @throws Exception Throws an exception if the index already exists.
     */
    public function createIndex(string $name, array $fields = [], array $options = []): Index {

        $name = $this->name($name);

        if ($this->exists($name)) {
            throw new Exception("Index <{$name}> already exists.");
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

    public function removeIndex(string $name): void {

        $name = $this->name($name);

        if (!$this->exists($name)) {
            return;
        }

        $rsp = $this->sendRequest("/indexes/{$name}", 'DELETE');

        unset($this->indexes[$name]);
    }

    public function exists(string $name): bool {
        return $this->getIndexes($name) !== null;
    }

    /**
     * Retrieves the indexes from the server.
     *
     * @param string|null $name (optional) The name of the index to retrieve. If provided, only the index with the matching name will be returned.
     * @return array|null Returns an array of indexes if $name is not provided, or the specified index if $name is provided and found. Returns null if no index is found.
     */
    public function getIndexes(?string $name = null) {

        $name = $name ? $this->name($name) : null;
        $rsp = $this->sendRequest("/indexes", 'GET');
        $indexes = [];

        foreach ($rsp['results'] as $index) {
            $indexes[$index['uid']] = $index;
        }

        return $name ? ($indexes[$name] ?? null) : $this->indexes;
    }

    /**
     * Formats the given name to a valid index name.
     *
     * @param string $name The name to be formatted.
     * @return string Returns the formatted index name.
     */
    protected function name(string $name): string {

        $name = preg_replace('/[^a-zA-Z0-9]+/', ' ', $name);
        $name = ucwords($name);
        $name = str_replace(' ', '', $name);
        $name = lcfirst($name);

        return $name;
    }

    /**
     * Sends a HTTP request to the specified URL using the specified method and data.
     *
     * @param string $url The URL to send the request to.
     * @param string $method The HTTP method to use for the request (e.g. GET, POST, PUT, DELETE).
     * @param mixed $data The data to send with the request. Defaults to null.
     *
     * @return mixed The response from the server, parsed as a JSON object.
     *
     * @throws Exception If the server returns a HTTP status code of 400 or higher, or if the request fails.
     */
    public function sendRequest(string $url, string $method, mixed $data = null) {
        $url = trim($url, '/');
        $fullUrl = "{$this->host}/{$url}";
        
        $attempts = 0;
        $maxAttempts = $this->options['retry_attempts'];
        
        while ($attempts < $maxAttempts) {
            $attempts++;
            
            try {
                $ch = curl_init($fullUrl);
                
                $headers = [
                    'Content-Type: application/json',
                    'User-Agent: IndexHybrid/1.0',
                ];

                if (isset($this->options['api_key'])) {
                    $headers[] = "Authorization: Bearer {$this->options['api_key']}";
                }

                curl_setopt_array($ch, [
                    CURLOPT_HTTPHEADER => $headers,
                    CURLOPT_CUSTOMREQUEST => $method,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_TIMEOUT => $this->options['timeout'],
                    CURLOPT_CONNECTTIMEOUT => $this->options['connect_timeout'],
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_MAXREDIRS => 3,
                    CURLOPT_SSL_VERIFYPEER => true,
                    CURLOPT_SSL_VERIFYHOST => 2,
                ]);

                if ($data !== null) {
                    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data, JSON_THROW_ON_ERROR));
                }

                $response = curl_exec($ch);
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                $curlError = curl_error($ch);
                
                curl_close($ch);

                // Handle cURL errors
                if ($response === false || !empty($curlError)) {
                    throw new Exception("cURL error: {$curlError}");
                }

                // Handle HTTP errors
                if ($httpCode >= 400) {
                    $errorData = json_decode($response, true);
                    $errorMessage = $errorData['message'] ?? $response;
                    
                    // Don't retry client errors (4xx), only server errors (5xx)
                    if ($httpCode < 500) {
                        throw new Exception("Meilisearch client error ({$httpCode}): {$errorMessage}");
                    }
                    
                    throw new Exception("Meilisearch server error ({$httpCode}): {$errorMessage}");
                }

                // Success - parse and return response
                return json_decode($response, true, 512, JSON_THROW_ON_ERROR);
                
            } catch (Exception $e) {
                // If this was the last attempt or a client error, rethrow
                if ($attempts >= $maxAttempts || (isset($httpCode) && $httpCode < 500)) {
                    throw $e;
                }
                
                // Wait before retrying (exponential backoff)
                $delay = $this->options['retry_delay'] * pow(2, $attempts - 1);
                usleep($delay * 1000); // Convert to microseconds
            }
        }
        
        throw new Exception("Request failed after {$maxAttempts} attempts");
    }
}
