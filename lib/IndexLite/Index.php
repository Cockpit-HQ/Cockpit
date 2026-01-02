<?php

namespace IndexLite;

use PDO;

// Include FuzzyEnhancer for enhanced fuzzy search capabilities
require_once __DIR__ . '/FuzzyEnhancer.php';

class Index {

    private PDO $db;
    private array $fields;
    private ?FuzzyEnhancer $fuzzyEnhancer = null;

    public function __construct(string $path, array $options = []) {

        $this->db = new PDO("sqlite:{$path}");
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $this->fields = $this->getFieldsFromExistingTable();

        // Register fuzzy search functions
        $this->fuzzyEnhancer = new FuzzyEnhancer($this->db);
        $this->fuzzyEnhancer->registerFunctions();

        // Register Geo functions
        $this->db->sqliteCreateFunction('geodist', function($lat1, $lon1, $lat2, $lon2) {
            $earthRadius = 6371000; // meters
            
            $lat1 = \deg2rad((float)$lat1);
            $lon1 = \deg2rad((float)$lon1);
            $lat2 = \deg2rad((float)$lat2);
            $lon2 = \deg2rad((float)$lon2);
            
            $dLat = $lat2 - $lat1;
            $dLon = $lon2 - $lon1;
            
            $a = \sin($dLat/2) * \sin($dLat/2) + \cos($lat1) * \cos($lat2) * \sin($dLon/2) * \sin($dLon/2);
            $c = 2 * \atan2(\sqrt($a), \sqrt(1-$a));
            
            return $earthRadius * $c;
        }, 4);

        $this->db->sqliteCreateFunction('geopoly', function() {
            $args = \func_get_args();
            $lat = (float)\array_shift($args);
            $lon = (float)\array_shift($args);
            $polygon = $args;
            
            $vertices = [];
            for ($i = 0; $i < \count($polygon); $i += 2) {
                $vertices[] = ['lat' => (float)$polygon[$i], 'lon' => (float)$polygon[$i+1]];
            }
            
            // Ray casting algorithm
            $inside = false;
            $count = \count($vertices);
            for ($i = 0, $j = $count - 1; $i < $count; $j = $i++) {
                if ((($vertices[$i]['lat'] > $lat) != ($vertices[$j]['lat'] > $lat)) &&
                    ($lon < ($vertices[$j]['lon'] - $vertices[$i]['lon']) * ($lat - $vertices[$i]['lat']) / ($vertices[$j]['lat'] - $vertices[$i]['lat']) + $vertices[$i]['lon'])) {
                    $inside = !$inside;
                }
            }
            return $inside;
        });

        $pragma = [
            'journal_mode'  => $options['journal_mode'] ??  'WAL',
            'temp_store'  => $options['temp_store'] ??  'MEMORY',
            'journal_size_limit' => $options['journal_size_limit'] ?? '27103364',
            'synchronous'   => $options['synchronous'] ?? 'NORMAL',
            'mmap_size'     => $options['mmap_size'] ?? '134217728',
            'cache_size'    => $options['cache_size'] ?? '-20000',
            'page_size'     => $options['page_size'] ?? '8192',
            'busy_timeout'  => $options['busy_timeout'] ?? '5000',
            'auto_vacuum'  => $options['auto_vacuum'] ?? 'INCREMENTAL',
        ];

        foreach ($pragma as $key => $value) {
            $this->db->exec("PRAGMA {$key} = {$value}");
        }
    }

    /**
     * Returns the database connection.
     *
     * This method is used by the Autocomplete class to access the database.
     *
     * @return PDO The database connection.
     */
    public function getConnection(): PDO {
        return $this->db;
    }

    /**
     * Returns the fields defined in the index.
     *
     * @return array The array of field names.
     */
    public function getFields(): array {
        return $this->fields;
    }

    /**
     * Get or create the fuzzy enhancer instance
     */
    private function getFuzzyEnhancer(): FuzzyEnhancer {
        if (!$this->fuzzyEnhancer) {
            $this->fuzzyEnhancer = new FuzzyEnhancer($this->db);
        }
        return $this->fuzzyEnhancer;
    }

    /**
     * Creates and returns an Autocomplete instance for this index.
     *
     * @return Autocomplete The autocomplete helper for this index.
     */
    public function autocomplete(): Autocomplete {
        return new Autocomplete($this);
    }

    /**
     * Creates a virtual table using FTS5 in an SQLite database.
     *
     * @param string $path The filepath of the SQLite database.
     * @param array $fields An array of field names for the virtual table.
     * @param array $options Optional parameters for customization.
     *
     * @return void
     */
    public static function create(string $path, array $fields, array $options = []) {

        $db = new PDO("sqlite:{$path}");
        $tokenizer = $options['tokenizer'] ?? 'porter unicode61 remove_diacritics 1';

        $ftsFields = ['id UNINDEXED', '__payload UNINDEXED'];

        foreach ($fields as $field) {

            if (\in_array($field, ['id', '__payload'])) {
                continue;
            }

            $ftsFields[] = $field;
        }

        $ftsFieldsString = \implode(', ', $ftsFields);

        $db->exec("CREATE VIRTUAL TABLE IF NOT EXISTS documents USING fts5({$ftsFieldsString}, tokenize='{$tokenizer}')");
    }

    /**
     * Retrieves the field names from an existing table in the SQLite database.
     *
     * @return array An array of field names, or an empty array if the table does not exist or an error occurs.
     */
    private function getFieldsFromExistingTable(): array {
        $result = $this->db->query("PRAGMA table_info(documents)");
        if ($result === false) {
            return [];
        }

        $fields = [];
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $fields[] = $row['name'];
        }

        return $fields;
    }

    /**
     * Adds a document to the virtual table in the SQLite database.
     *
     * @param mixed $id The unique identifier for the document.
     * @param array $data The data to be added as a document.
     * @param bool $safe Optional parameter to indicate whether the document needs to be removed before adding (default: true).
     *
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
     * Replaces a document in the virtual table using FTS5 in an SQLite database.
     *
     * @param mixed $id The identifier of the document to replace.
     * @param array $data An array of data to replace the document with.
     *
     * @return void
     */
    public function replaceDocument(mixed $id, array $data): void {
        $this->addDocument($id, $data, true);
    }

    /**
     * Adds multiple documents to the database
     *
     * @param array $documents The documents to add
     *
     * @return void
     */
    public function addDocuments(array $documents) {

        $this->db->beginTransaction();
        $insertStmt = $this->db->prepare($this->buildInsertQuery());

        foreach ($documents as $document) {

            if (!isset($document['id'])) {
                $document['id'] = Utils::uuidv4();
            }

            $data = [];

            foreach ($this->fields as $field) {

                if (!isset($document[$field])) {
                    $document[$field] = null;
                }

                $value = $document[$field];
                $value = Utils::stringifyValue($value);
                $value = Utils::processHtmlContent($value);

                $data[":{$field}"] = $value;
            }

            $data[":__payload"] = \json_encode($document);

            $insertStmt->execute($data);
        }

        $this->db->commit();
    }

    /**
     * Removes a document from the database by its ID
     *
     * @param mixed $id The ID of the document to remove
     *
     * @return void
     */
    public function removeDocument(mixed $id) {
        $sql = "DELETE FROM documents WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }

    /**
     * Counts the number of documents in the database based on the given query and filter.
     * If no query is provided, counts all documents.
     *
     * @param string $query The query string to search for
     * @param string $filter The additional filter to apply to the query
     *
     * @return int The number of documents matching the query and filter
     */
    public function countDocuments(string $query = '', string $filter = ''): int {

        if ($query) {

            $where = $this->buildMatchQuery($query);

            $safeFilter = $this->sanitizeFilter($filter);
            if ($safeFilter) {
                $where = "({$where}) AND {$safeFilter}";
            }

            $sql = "SELECT COUNT(*) FROM documents WHERE {$where}";

        } else {
            $sql = "SELECT COUNT(*) FROM documents";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchColumn();
    }

    /**
     * Clears all documents from the database.
     *
     * @return void
     */
    public function clear(): void {
        $this->db->exec('DELETE FROM documents');
    }

    /**
     * Searches for documents based on the given query and options.
     *
     * @param string $query The search query.
     * @param array $options An array of options (optional).
     *  Possible options:
     *   - fields: The fields to retrieve from the documents (default: '*').
     *   - limit: The maximum number of documents to retrieve (default: 50).
     *   - offset: The offset to start retrieving documents from (default: 0).
     *   - filter: Additional filter to apply to the search query (default: '').
     *   - fuzzy: Enable fuzzy search (null=disabled, int=FTS5 NEAR distance, true=enhanced algorithms)
     *   - fuzzy_algorithm: Algorithm for enhanced fuzzy ('fts5', 'levenshtein', 'jaro_winkler', 'trigram', 'soundex', 'hybrid')
     *   - fuzzy_threshold: Distance threshold for algorithms (default: 2)
     *   - fuzzy_min_score: Minimum score for hybrid algorithm (default: 70)
     *
     * @return array The search results as an associative array with the following keys:
     *   - hits: An array of documents matching the search query.
     *   - query: The search query.
     *   - processingTimeMs: The execution time of the search in milliseconds.
     *   - limit: The maximum number of documents retrieved.
     *   - offset: The offset used for retrieving documents.
     *   - estimatedTotalHits: The estimated total number of documents that match the search query.
     */


    private function parseGeoFilter(string $filter): string {
        
        // _geoRadius(lat, lng, distance_in_meters)
        $filter = \preg_replace_callback('/_geoRadius\s*\(\s*([-\d\.]+)\s*,\s*([-\d\.]+)\s*,\s*(\d+)\s*\)/', function($matches) {
            $lat = $matches[1];
            $lng = $matches[2];
            $dist = $matches[3];
            return "geodist(json_extract(__payload, '$._geo.lat'), json_extract(__payload, '$._geo.lng'), {$lat}, {$lng}) <= {$dist}";
        }, $filter);

        // _geoBoundingBox(lat1, lng1, lat2, lng2) -> top_right, bottom_left
        // Meilisearch: [lat1, lng1], [lat2, lng2] (top right, bottom left)
        $filter = \preg_replace_callback('/_geoBoundingBox\s*\(\s*\[\s*([-\d\.]+)\s*,\s*([-\d\.]+)\s*\]\s*,\s*\[\s*([-\d\.]+)\s*,\s*([-\d\.]+)\s*\]\s*\)/', function($matches) {
            $lat1 = (float)$matches[1];
            $lng1 = (float)$matches[2];
            $lat2 = (float)$matches[3];
            $lng2 = (float)$matches[4];
            
            $minLat = \min($lat1, $lat2);
            $maxLat = \max($lat1, $lat2);
            $minLng = \min($lng1, $lng2);
            $maxLng = \max($lng1, $lng2);

            return "json_extract(__payload, '$._geo.lat') BETWEEN {$minLat} AND {$maxLat} AND json_extract(__payload, '$._geo.lng') BETWEEN {$minLng} AND {$maxLng}";
        }, $filter);

        // _geoPolygon([lat, lng], [lat, lng], ...)
        $filter = \preg_replace_callback('/_geoPolygon\s*\((.*?)\)/', function($matches) {
            // Extract all coordinates
            \preg_match_all('/\[\s*([-\d\.]+)\s*,\s*([-\d\.]+)\s*\]/', $matches[1], $coords);
            
            $args = [];
            foreach ($coords[1] as $i => $lat) {
                $args[] = $lat;
                $args[] = $coords[2][$i];
            }
            
            $polyArgs = \implode(', ', $args);
            return "geopoly(json_extract(__payload, '$._geo.lat'), json_extract(__payload, '$._geo.lng'), {$polyArgs})";
        }, $filter);

        return $filter;
    }

    public function search(string $query, array $options = []) {

        $start = \microtime(true);

        // Meilisearch compatibility: Input aliases
        if (isset($options['attributesToRetrieve'])) {
            $options['fields'] = $options['attributesToRetrieve'];
        }
        if (isset($options['attributesToHighlight'])) {
            $options['highlight'] = $options['attributesToHighlight'];
        }
        if (isset($options['hitsPerPage'])) {
            $options['limit'] = $options['hitsPerPage'];
        }
        if (isset($options['page'])) {
            $options['offset'] = ($options['page'] - 1) * ($options['limit'] ?? 50);
        }
        if (isset($options['filter']) && \is_array($options['filter'])) {
            $options['filter'] = \implode(' AND ', $options['filter']);
        }

        $options = \array_merge([
            'fields' => '*',
            'limit' => 50,
            'offset' => 0,
            'filter' => '',
            'sort' => null,
            'boosts' => [],
            'highlight' => false,
            'synonyms' => [],
            'fuzzy' => null,
            'fuzzy_algorithm' => 'fts5',        // Algorithm: fts5, levenshtein, jaro_winkler, trigram, soundex, hybrid
            'fuzzy_threshold' => 2,             // Threshold for distance-based algorithms
            'fuzzy_min_score' => 70,            // Minimum score for hybrid algorithm
            'facets' => [],                     // Array of facet fields
            'facet_limit' => 20,
            'facet_offset' => 0,
        ], $options);

        if ($options['fields'] !== '*') {
            $options['fields'] = \is_string($options['fields']) ? \array_map(fn($f) => \trim($f), \explode(',' , $options['fields'])) : $options['fields'];
            $intersectFields = \array_flip($options['fields']);
        }

        $where = '';
        $highlightFields = [];

        // Prepare highlighting fields
        if ($options['highlight']) {
            if ($options['highlight'] === true) {
                $highlightFields = \array_filter($this->fields, fn($f) => !\in_array($f, ['id', '__payload']));
            } elseif (\is_array($options['highlight'])) {
                $highlightFields = \array_intersect($options['highlight'], $this->fields);
            }
        }

        if ($query) {
            
            // Check if we should use enhanced fuzzy search
            if ($options['fuzzy'] !== null && $options['fuzzy_algorithm'] !== 'fts5') {
                return $this->enhancedFuzzySearch($query, $options);
            }

            $where = $this->buildMatchQuery($query, $options['fuzzy'], $options['boosts'], $options['synonyms']);

            $safeFilter = $this->sanitizeFilter($options['filter']);
            
            // Apply Geo Filters
            if ($safeFilter) {
                $safeFilter = $this->parseGeoFilter($safeFilter);
            }

            if ($safeFilter) {
                $where = "({$where}) AND {$safeFilter}";
            }

            // Build ORDER BY clause
            $orderClause = [];
            
            if (!empty($options['sort']) && \is_array($options['sort'])) {
                foreach ($options['sort'] as $field => $dir) {
                    // Handle _geoPoint sorting? (Not implemented yet, standard fields only)
                    if (\in_array($field, $this->fields) && !\in_array($field, ['id', '__payload'])) {
                        $dir = \strtoupper($dir) === 'DESC' ? 'DESC' : 'ASC';
                        $orderClause[] = "{$field} {$dir}";
                    }
                }
            }

            // Use bm25() for ranking as fallback or primary sort
            $orderClause[] = $this->buildBm25OrderExpression($options['boosts'] ?? []) . " ASC";
            
            $orderBy = \implode(', ', $orderClause);

            // Build SELECT clause with highlighting
            $select = "*";
            if (!empty($highlightFields)) {
                $snippets = [];
                foreach ($highlightFields as $field) {
                    $colIndex = \array_search($field, $this->fields);
                    if ($colIndex !== false) {
                        // snippet(table, colIndex, start, end, ellipsis, maxTokens)
                        $snippets[] = "snippet(documents, {$colIndex}, '<em>', '</em>', '...', 64) as \"_snippet_{$field}\"";
                    }
                }
                if (!empty($snippets)) {
                    $select .= ", " . \implode(', ', $snippets);
                }
            }

            $sql = "SELECT {$select} FROM documents WHERE {$where} ORDER BY {$orderBy} LIMIT :limit OFFSET :offset";

        } else {
            $safeFilter = $this->sanitizeFilter($options['filter']);
            
            // Apply Geo Filters
            if ($safeFilter) {
                $safeFilter = $this->parseGeoFilter($safeFilter);
            }

            // Build ORDER BY clause for non-search queries
            $orderClause = [];
            if (!empty($options['sort']) && \is_array($options['sort'])) {
                foreach ($options['sort'] as $field => $dir) {
                    if (\in_array($field, $this->fields) && !\in_array($field, ['id', '__payload'])) {
                        $dir = \strtoupper($dir) === 'DESC' ? 'DESC' : 'ASC';
                        $orderClause[] = "{$field} {$dir}";
                    }
                }
            }
            $orderBy = !empty($orderClause) ? "ORDER BY " . \implode(', ', $orderClause) : "";

            if ($safeFilter) {
                $where = $safeFilter;
                $sql = "SELECT * FROM documents WHERE {$where} {$orderBy} LIMIT :limit OFFSET :offset";
            } else {
                $where = '1';
                $sql = "SELECT * FROM documents {$orderBy} LIMIT :limit OFFSET :offset";
            }
        }

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', \intval($options['limit']), PDO::PARAM_INT);
        $stmt->bindValue(':offset', \intval($options['offset']), PDO::PARAM_INT);
        $stmt->execute();

        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($items as &$item) {

            $payload = \json_decode($item['__payload'] ?? '{}', true);
            $item = \array_merge($item, $payload);
            unset($item['__payload']);

            // Process highlights
            if (!empty($highlightFields)) {
                $item['_formatted'] = $item;
                foreach ($highlightFields as $field) {
                    if (isset($item["_snippet_{$field}"])) {
                        $item['_formatted'][$field] = $item["_snippet_{$field}"];
                        unset($item["_snippet_{$field}"]);
                    }
                }
            }

            if ($options['fields'] !== '*') {
                $item = \array_intersect_key($item, $intersectFields);
                // Keep _formatted if it exists
                if (isset($item['_formatted'])) {
                    $item['_formatted'] = \array_intersect_key($item['_formatted'], $intersectFields);
                }
            }
        }

        $count = \count($items);

        if ($options['offset'] || $count === $options['limit']) {
            $count = $this->countDocuments($query);
        }

        $processingTimeMs = (\microtime(true) - $start) * 1000;

        $result = [
            'hits' => $items,
            'query' => $query,
            'processingTimeMs' => $processingTimeMs,
            'limit' => $options['limit'],
            'offset' => $options['offset'],
            'estimatedTotalHits' => $count,
        ];

        // Multi-facet support
        if (!empty($options['facets']) && \is_array($options['facets'])) {
            $facetData = $this->computeFacets($where, $options['facets'], (int)$options['facet_limit'], (int)$options['facet_offset']);
            if (!empty($facetData)) {
                $result['facets'] = $facetData;
            }
        }

        // Meilisearch compatibility: Response format
        if (isset($result['facets'])) {
            $result['facetDistribution'] = [];
            foreach ($result['facets'] as $field => $values) {
                $distribution = [];
                foreach ($values as $item) {
                    $distribution[$item['value']] = $item['count'];
                }
                $result['facetDistribution'][$field] = $distribution;
            }
        }
        
        $result['hitsPerPage'] = $result['limit'];
        $result['page'] = $result['limit'] > 0 ? \floor($result['offset'] / $result['limit']) + 1 : 1;
        $result['totalPages'] = $result['limit'] > 0 ? \ceil($result['estimatedTotalHits'] / $result['limit']) : 1;

        return $result;
    }

    /**
     * Enhanced fuzzy search using custom SQLite functions
     */
    private function enhancedFuzzySearch(string $query, array $options): array {
        $start = \microtime(true);
        $enhancer = $this->getFuzzyEnhancer();
        $fields = $this->getFields();
        
        // Build fuzzy WHERE clause
        $fuzzyWhere = $enhancer->buildEnhancedFuzzyQuery($query, $fields, [
            'algorithm' => $options['fuzzy_algorithm'],
            'threshold' => $options['fuzzy_threshold'],
            'min_score' => $options['fuzzy_min_score'],
        ]);
        
        // Add filter if provided (sanitized)
        $safeFilter = $this->sanitizeFilter($options['filter'] ?? '');
        if ($safeFilter) {
            $where = "({$fuzzyWhere}) AND {$safeFilter}";
        } else {
            $where = $fuzzyWhere;
        }
        
        // Build relevance score based on algorithm
        $scoreExpr = $this->buildScoreExpression($query, $fields, $options);
        
        // Execute query
        $sql = "SELECT *, {$scoreExpr} as relevance_score 
                FROM documents 
                WHERE {$where} 
                ORDER BY relevance_score DESC 
                LIMIT :limit OFFSET :offset";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', \intval($options['limit']), PDO::PARAM_INT);
        $stmt->bindValue(':offset', \intval($options['offset']), PDO::PARAM_INT);
        $stmt->execute();
        
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Apply field filtering if needed
        if ($options['fields'] !== '*') {
            $intersectFields = \is_string($options['fields']) 
                ? \array_flip(\array_map('trim', \explode(',', $options['fields']))) 
                : \array_flip($options['fields']);
        }
        
        // Process results
        foreach ($items as &$item) {
            $payload = \json_decode($item['__payload'] ?? '{}', true);
            $item = \array_merge($item, $payload);
            unset($item['__payload']);
            
            // Apply field filtering if needed
            if ($options['fields'] !== '*') {
                $item = \array_intersect_key($item, $intersectFields);
            }
        }
        
        // Count total results
        $countSql = "SELECT COUNT(*) FROM documents WHERE {$where}";
        $count = $this->db->query($countSql)->fetchColumn();
        
        $processingTimeMs = (\microtime(true) - $start) * 1000;

        $result = [
            'hits' => $items,
            'query' => $query,
            'processingTimeMs' => $processingTimeMs,
            'limit' => $options['limit'],
            'offset' => $options['offset'],
            'estimatedTotalHits' => $count,
            'fuzzy_algorithm' => $options['fuzzy_algorithm'],
        ];

        // Multi-facet support (use same WHERE)
        if (!empty($options['facets']) && \is_array($options['facets'])) {
            $facetData = $this->computeFacets($where, $options['facets'], (int)($options['facet_limit'] ?? 20), (int)($options['facet_offset'] ?? 0));
            if (!empty($facetData)) {
                $result['facets'] = $facetData;
            }
        }
        
        return $result;
    }

    /**
     * Compute facets for multiple fields using an existing WHERE clause
     */
    private function computeFacets(string $where, array $facetFields, int $limit = 20, int $offset = 0): array {
        $facets = [];

        // Validate and sanitize fields
        $validFields = \array_filter($facetFields, function($f) {
            return \in_array($f, $this->fields, true) && !\in_array($f, ['id', '__payload'], true);
        });

        if (empty($validFields)) return $facets;

        foreach ($validFields as $field) {
            // Sanitize field name: allow alphanumeric + underscore only
            $sanitized = \preg_replace('/[^a-zA-Z0-9_]/', '', $field);
            if ($sanitized !== $field || $sanitized === '') continue;

            $sql = "SELECT {$sanitized} as value, COUNT(*) as count FROM documents WHERE {$where} GROUP BY {$sanitized} ORDER BY count DESC";
            if ($limit > 0) {
                $sql .= " LIMIT " . (int)$limit . " OFFSET " . \max(0, (int)$offset);
            }

            $stmt = $this->db->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

            // Normalize counts to int
            foreach ($rows as &$r) {
                $r['count'] = (int)$r['count'];
            }

            $facets[$field] = $rows;
        }

        return $facets;
    }

    /**
     * Build relevance score expression based on algorithm with SQL injection protection
     */
    private function buildScoreExpression(string $query, array $fields, array $options): string {
        $algorithm = $options['fuzzy_algorithm'];
        $expressions = [];
        
        // Escape the query to prevent SQL injection
        $escapedQuery = $this->escapeQueryForSql($query);
        
        foreach ($fields as $field) {
            if ($field === 'id' || $field === '__payload') continue;
            
            // Sanitize field name (only allow alphanumeric and underscore)
            $sanitizedField = \preg_replace('/[^a-zA-Z0-9_]/', '', $field);
            if ($sanitizedField !== $field || empty($sanitizedField)) {
                continue; // Skip invalid field names
            }
            
            $boost = (float) ($options['boosts'][$field] ?? 1.0);
            
            switch ($algorithm) {
                case 'levenshtein':
                    $expressions[] = "(100 - levenshtein_ci({$sanitizedField}, {$escapedQuery}) * 10) * {$boost}";
                    break;
                    
                case 'jaro_winkler':
                    $expressions[] = "jaro_winkler({$sanitizedField}, {$escapedQuery}) * 100 * {$boost}";
                    break;
                    
                case 'trigram':
                    $expressions[] = "trigram_similarity({$sanitizedField}, {$escapedQuery}) * 100 * {$boost}";
                    break;
                    
                case 'hybrid':
                default:
                    $expressions[] = "fuzzy_score({$sanitizedField}, {$escapedQuery}) * {$boost}";
                    break;
            }
        }
        
        // Return the maximum score from all fields, or 0 if no expressions
        if (empty($expressions)) {
            return '0';
        }
        
        if (\count($expressions) === 1) {
            return $expressions[0];
        }
        
        return 'MAX(' . \implode(', ', $expressions) . ')';
    }

    /**
     * Performs a faceted search for documents based on the given query, facet field, and options.
     *
     * @param string $query The search query.
     * @param string $facetField The field to be used for faceting.
     * @param array $options An array of options (optional).
     *  Possible options:
     *   - limit: The maximum number of facets to retrieve (default: 50).
     *   - offset: The offset to start retrieving facets from (default: 0).
     *   - filter: Additional filter to apply to the search query (default: '').
     *
     * @return array The faceted search results as an associative array with the following keys:
     *   - facets: An array of facets matching the search query, each with the following keys:
     *     - name: The facet field name.
     *     - count: The number of documents that have the facet value.
     *   - query: The search query.
     *   - limit: The maximum number of facets retrieved.
     *   - offset: The offset used for retrieving facets.
     *
     * @throws PDOException if there is an error executing the SQL statement.
     */
    public function facetSearch(string $query, string $facetField, array $options = []): array {

        $options = array_merge([
            'limit' => 50,
            'offset' => 0,
            'filter' => '',
        ], $options);

        $where = $this->buildMatchQuery($query);

        $safeFilter = $this->sanitizeFilter($options['filter']);
        if ($safeFilter) {
            $where = "({$where}) AND {$safeFilter}";
        }

        // Validate facet field against known fields and exclude non-content columns
        if (!\in_array($facetField, $this->fields, true) || \in_array($facetField, ['id', '__payload'], true)) {
            return [];
        }

        $sql = "SELECT {$facetField}, COUNT(*) as count FROM documents WHERE {$where} GROUP BY {$facetField} ORDER BY count DESC";

        if ($options['limit']) {

            $limit  = \intval($options['limit']);
            $offset = \intval($options['offset']);
            $sql   .= " LIMIT {$limit} OFFSET {$offset}";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    /**
     * Expands query terms with synonyms and formats for FTS5
     */
    private function expandSynonyms(string $query, array $synonyms, ?int $fuzzyDistance = null): string {
        
        // If no synonyms and no fuzzy distance, preserve original phrase behavior (backward compat)
        if (empty($synonyms) && $fuzzyDistance === null) {
            return "\"" . $this->escapeForMatch($query) . "\"";
        }

        // Tokenize
        $terms = \preg_split('/\s+/', $query, -1, PREG_SPLIT_NO_EMPTY);
        $expandedTerms = [];
        
        foreach ($terms as $term) {
            $termLower = \strtolower($term);
            $variants = [$term];
            
            if (isset($synonyms[$termLower])) {
                $syns = \is_array($synonyms[$termLower]) ? $synonyms[$termLower] : [$synonyms[$termLower]];
                $variants = \array_merge($variants, $syns);
            }
            
            // Escape and format each variant
            $escapedVariants = \array_map(function($v) use ($fuzzyDistance) {
                $esc = $this->escapeForMatch($v);
                return $fuzzyDistance !== null ? "\"{$esc}\" NEAR/{$fuzzyDistance}" : "\"{$esc}\"";
            }, $variants);
            
            if (\count($escapedVariants) > 1) {
                $expandedTerms[] = '(' . \implode(' OR ', $escapedVariants) . ')';
            } else {
                $expandedTerms[] = $escapedVariants[0];
            }
        }
        
        return \implode(' AND ', $expandedTerms);
    }

    /**
     * Builds a match query for searching documents based on the given query and fuzzy distance.
     *
     * @param string $query The search query.
     * @param int|null $fuzzyDistance The fuzzy distance for fuzzy matching (optional).
     *
     * @return string The built match query as a string.
     */
    private function buildMatchQuery(string $query, ?int $fuzzyDistance = null, array $boosts = [], array $synonyms = []): string {

        $fields = [];
        $_fields = $this->fields;
        $hasBoosts = !empty($boosts);

        if (\preg_match('/(\w+):/', $query)) {

            \preg_match_all('/(\w+):\s*([\'"][^\'"]+[\'"]|\S+)/', $query, $matches, PREG_SET_ORDER);

            foreach ($matches as $match) {

                if (!\in_array($match[1], $_fields)) continue;

                $field = $match[1];
                $value = \trim($match[2], '\'"');
                $fields[$field] = $this->expandSynonyms($value, $synonyms, $fuzzyDistance);
            }

        } else {

            foreach ($_fields as $field) {
                $fields[$field] = $this->expandSynonyms($query, $synonyms, $fuzzyDistance);
            }
        }

        $searchQueries = [];

        foreach ($fields as $field => $q) {

            if ($field === 'id' || $field === '__payload') {
                continue;
            }

            // Build boolean MATCH expression (boosting is applied via bm25 weights in ORDER BY)
            $searchQuery = "\"{$field}\" MATCH '{$q}'";

            $searchQueries[] = $searchQuery;
        }

        // Combine queries with OR
        $combinedQuery = \implode(' OR ', $searchQueries);

        return $combinedQuery;
    }

    /**
     * Builds an insert query based on the fields defined in the class.
     *
     * @return string The insert query string.
     *
     * Example usage:
     *
     * $queryBuilder = new QueryBuilder();
     *
     * $query = $queryBuilder->buildInsertQuery();
     *
     * // $query will contain the insert query string based on the fields defined in the QueryBuilder class.
     */
    private function buildInsertQuery() {

        $fields = $this->fields;

        $placeholders = \array_map(function ($field) {
            return ":{$field}";
        }, $fields);

        $fieldsString = \implode(', ', $fields);
        $placeholdersString = \implode(', ', $placeholders);

        return "INSERT INTO documents ({$fieldsString}) VALUES ({$placeholdersString})";
    }

    /**
     * Updates the indexed fields for the documents table.
     *
     * @param array $fields An array of fields to be updated.
     * @param string|null $tokenizer The tokenizer to use for the updated fields (optional).
     *
     * @return void
     */
    public function updateIndexedFields($fields, ?string $tokenizer = null) {

        $fields = \array_filter($fields, fn($field) => $field !== 'id' && $field !== '__payload');
        $currentFields = \array_filter($this->fields, fn($field) => $field !== 'id' && $field !== '__payload');

        if (!\count(\array_diff($fields, $currentFields))) {
            return;
        }

        // Rename the current table
        $this->db->exec('ALTER TABLE documents RENAME TO documents_old');

        $fields = \array_merge(['id', '__payload'], $fields);
        $currentFields = \array_merge(['id', '__payload'], $currentFields);
        $columns = \implode(', ', \array_intersect($currentFields, $fields));

        // Create a new table with updated fields
        $tokenizer = $tokenizer ?? 'porter unicode61 remove_diacritics 1';
        $ftsFields = ['id UNINDEXED', '__payload UNINDEXED'];

        foreach ($fields as $field) {
            if (\in_array($field, ['id', '__payload'])) continue;
            $ftsFields[] = $field;
        }

        $ftsFieldsString = \implode(', ', $ftsFields);

        $this->db->exec("CREATE VIRTUAL TABLE IF NOT EXISTS documents USING fts5({$ftsFieldsString}, tokenize='{$tokenizer}')");

        // Copy data from the old table to the new table
        $this->db->exec("INSERT INTO documents ({$columns}) SELECT {$columns} FROM documents_old");
        // Drop the old table
        $this->db->exec('DROP TABLE documents_old');
        // Update the fields property
        $this->fields = $fields;
    }
    
    /**
     * Properly escape query strings for SQL to prevent injection
     */
    protected function escapeQueryForSql(string $query): string {
        // Remove any null bytes
        $query = \str_replace("\0", '', $query);
        
        // Escape single quotes by doubling them
        $query = \str_replace("'", "''", $query);
        
        // Wrap in single quotes
        return "'{$query}'";
    }

    /**
     * Escape a term for safe embedding in FTS5 MATCH right-hand side
     */
    private function escapeForMatch(string $term): string {
        $escaped = Utils::escapeFts5SpecialChars($term);
        // Also ensure any single quotes are doubled for safe SQL embedding
        $escaped = \str_replace("'", "''", $escaped);
        return $escaped;
    }

    /**
     * Build bm25() expression with per-column weights based on boosts
     */
    private function buildBm25OrderExpression(array $boosts): string {
        $weights = [];
        foreach ($this->fields as $field) {
            if ($field === 'id' || $field === '__payload') {
                $weights[] = '0';
                continue;
            }
            $w = isset($boosts[$field]) ? (float)$boosts[$field] : 1.0;
            $weights[] = (string)$w;
        }

        // If all weights are default, we can omit them
        $allDefault = \count(\array_unique($weights)) === 1 && \reset($weights) === '1';
        if ($allDefault) {
            return 'bm25(documents)';
        }

        return 'bm25(documents, ' . \implode(', ', $weights) . ')';
    }

    /**
     * Basic sanitization for filter fragments to avoid obvious SQL injection vectors
     */
    protected function sanitizeFilter(?string $filter): string {
        $filter = \trim((string)$filter);
        if ($filter === '') return '';
        // Disallow statement separators and comments
        if (\preg_match('/(;|--|\/\*)/', $filter)) {
            return '';
        }
        return $filter;
    }
}
