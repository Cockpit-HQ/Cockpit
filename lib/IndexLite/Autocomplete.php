<?php

namespace IndexLite;

use PDO;

/**
 * Autocomplete class for IndexLite
 *
 * Provides autocomplete and suggestion functionality for an Index instance
 */
class Autocomplete {

    /**
     * @var Index The index instance to provide suggestions from
     */
    private Index $index;

    /**
     * @var PDO The database connection
     */
    private PDO $db;

    /**
     * @var array The fields available in the index
     */
    private array $fields;

    /**
     * Constructor
     *
     * @param Index $index The index instance to provide suggestions from
     */
    public function __construct(Index $index) {
        $this->index = $index;
        $this->db = $index->getConnection();
        $this->fields = $index->getFields();
    }

    /**
     * Gets autocomplete suggestions for a given prefix.
     *
     * @param string $prefix The prefix to get suggestions for.
     * @param array $options An array of options (optional).
     *  Possible options:
     *   - field: The specific field to get suggestions from (default: all indexed fields).
     *   - limit: The maximum number of suggestions to retrieve (default: 10).
     *   - minLength: The minimum length of prefix to search for (default: 2).
     *   - filter: Additional filter to apply to the suggestions (default: '').
     *   - countMatches: Whether to include the count of documents matching each suggestion (default: false).
     *   - highlight: Whether to highlight the matching prefix in suggestions (default: false).
     *   - fuzzy: Controls fuzzy matching - false to disable, or integer (1-3) for edit distance (default: false).
     *
     * @return array The suggestions as an array.
     */
    public function getSuggestions(string $prefix, array $options = []): array {

        $prefix = trim($prefix);

        $options = array_merge([
            'field' => null,
            'limit' => 10,
            'minLength' => 2,
            'filter' => '',
            'countMatches' => false,
            'highlight' => false,
            'fuzzy' => false
        ], $options);

        // Don't suggest if prefix is too short
        if (mb_strlen($prefix) < $options['minLength']) {
            return [
                'query' => $prefix,
                'suggestions' => []
            ];
        }

        // Get suggestions using the appropriate match condition
        return $this->getSuggestionsByPrefix($prefix, $options);
    }

    /**
     * Gets suggestions for a prefix with or without fuzzy matching.
     *
     * @param string $prefix The prefix to get suggestions for.
     * @param array $options The options for retrieving suggestions.
     * @return array The suggestions based on the prefix.
     */
    private function getSuggestionsByPrefix(string $prefix, array $options): array {

        $escapedPrefix = Utils::escapeFts5SpecialChars($prefix);

        // Determine the match condition based on fuzzy option
        if ($options['fuzzy']) {

            // Process fuzzy option - convert to boolean and extract distance if needed
            $fuzzyDistance = 1;
            if (is_int($options['fuzzy']) && $options['fuzzy'] > 0) {
                $fuzzyDistance = min($options['fuzzy'], 3); // Cap at 3 for performance reasons
                $options['fuzzy'] = true;
            }

            $matchCondition = "\"{$escapedPrefix}\" NEAR/{$fuzzyDistance}";
        } else {
            // For exact prefix matching, remove trailing quotes and append '*'
            $escapedPrefix = rtrim($escapedPrefix, '"');
            $matchCondition = "{$escapedPrefix}*";
        }

        // Build the query based on whether a specific field is specified
        if ($options['field'] && in_array($options['field'], $this->fields) &&
            $options['field'] !== 'id' && $options['field'] !== '__payload') {

            $where = "\"{$options['field']}\" MATCH '{$matchCondition}'";

            if ($options['filter']) {
                $where = "({$where}) AND {$options['filter']}";
            }

            // Select the specific field and get unique values
            $sql = "SELECT DISTINCT {$options['field']} as term FROM documents WHERE {$where} ORDER BY length({$options['field']}) LIMIT :limit";

            if ($options['countMatches']) {
                $sql = "SELECT {$options['field']} as term, COUNT(*) as count FROM documents WHERE {$where} GROUP BY {$options['field']} ORDER BY count DESC, length({$options['field']}) LIMIT :limit";
            }
        } else {
            // Handle searching across all fields
            $fieldQueries = [];

            foreach ($this->fields as $field) {
                if ($field === 'id' || $field === '__payload') {
                    continue;
                }

                $fieldQueries[] = "\"{$field}\" MATCH '{$matchCondition}'";
            }

            $where = implode(' OR ', $fieldQueries);

            if ($options['filter']) {
                $where = "({$where}) AND {$options['filter']}";
            }

            // For multi-field suggestions, extract phrases containing the match
            $sql = "
                WITH matches AS (
                    SELECT id, snippet(documents, 0, '<mark>', '</mark>', '...', 10) as snippet
                    FROM documents
                    WHERE {$where}
                    LIMIT 100
                )
                SELECT DISTINCT snippet FROM matches
                LIMIT :limit
            ";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', (int)$options['limit'], PDO::PARAM_INT);

        try {
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return [
                'query' => $prefix,
                'suggestions' => [],
                'error' => $e->getMessage()
            ];
        }

        // Process results based on options
        $suggestions = $this->processResults($results, $prefix, $options);

        return [
            'query' => $prefix,
            'suggestions' => $suggestions
        ];
    }

    /**
     * Returns popular terms in the index that can be used as suggestions.
     *
     * @param array $options An array of options (optional).
     *  Possible options:
     *   - field: The specific field to get popular terms from (default: all indexed fields).
     *   - limit: The maximum number of terms to retrieve (default: 10).
     *   - minTermFrequency: The minimum frequency a term must have to be included (default: 2).
     *   - filter: Additional filter to apply to the popular terms (default: '').
     *   - minLength: The minimum length of terms to include (default: 3).
     *   - maxLength: The maximum length of terms to include (default: 20).
     *
     * @return array The popular terms and their frequencies.
     */
    public function getPopularTerms(array $options = []): array {
        $options = array_merge([
            'field' => null,
            'limit' => 10,
            'minTermFrequency' => 2,
            'filter' => '',
            'minLength' => 3,
            'maxLength' => 20
        ], $options);

        $where = '';

        if ($options['filter']) {
            $where = "WHERE {$options['filter']}";
        }

        // If a specific field is provided, get popular terms from that field
        if ($options['field'] && in_array($options['field'], $this->fields) &&
            $options['field'] !== 'id' && $options['field'] !== '__payload') {

            // For FTS5, we need to use the special 'documents_terms' virtual table
            $sql = "
                WITH term_counts AS (
                    SELECT term, COUNT(*) as count
                    FROM (
                        SELECT documents_terms.term as term
                        FROM documents_terms
                        JOIN documents ON documents.rowid = documents_terms.rowid
                        {$where}
                        WHERE documents_terms.col = :column_index
                        AND length(documents_terms.term) BETWEEN :min_length AND :max_length
                    )
                    GROUP BY term
                    HAVING count >= :min_freq
                )
                SELECT term, count
                FROM term_counts
                ORDER BY count DESC
                LIMIT :limit
            ";

            // Find the column index for the specified field
            $columnIndex = array_search($options['field'], $this->fields);

            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':column_index', $columnIndex, PDO::PARAM_INT);
            $stmt->bindValue(':min_freq', (int)$options['minTermFrequency'], PDO::PARAM_INT);
            $stmt->bindValue(':min_length', (int)$options['minLength'], PDO::PARAM_INT);
            $stmt->bindValue(':max_length', (int)$options['maxLength'], PDO::PARAM_INT);
            $stmt->bindValue(':limit', (int)$options['limit'], PDO::PARAM_INT);
        } else {
            // Get popular terms across all fields
            $sql = "
                WITH term_counts AS (
                    SELECT term, COUNT(*) as count
                    FROM (
                        SELECT documents_terms.term as term
                        FROM documents_terms
                        JOIN documents ON documents.rowid = documents_terms.rowid
                        {$where}
                        WHERE length(documents_terms.term) BETWEEN :min_length AND :max_length
                    )
                    GROUP BY term
                    HAVING count >= :min_freq
                )
                SELECT term, count
                FROM term_counts
                ORDER BY count DESC
                LIMIT :limit
            ";

            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':min_freq', (int)$options['minTermFrequency'], PDO::PARAM_INT);
            $stmt->bindValue(':min_length', (int)$options['minLength'], PDO::PARAM_INT);
            $stmt->bindValue(':max_length', (int)$options['maxLength'], PDO::PARAM_INT);
            $stmt->bindValue(':limit', (int)$options['limit'], PDO::PARAM_INT);
        }

        try {
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            // If the terms table doesn't exist (can happen with some FTS5 configurations)
            // fall back to a simple content-based approach
            return $this->getPopularTermsFallback($options);
        }

        return [
            'terms' => $results
        ];
    }

    /**
     * Fallback method for getting popular terms when the FTS5 terms table is not available.
     *
     * @param array $options The options for retrieving popular terms.
     * @return array The popular terms based on content sampling.
     */
    private function getPopularTermsFallback(array $options): array {
        // Find a field to use if none specified or specified field is invalid
        $field = $options['field'] ?? null;

        if (!$field || $field === 'id' || $field === '__payload' || !in_array($field, $this->fields)) {
            // Find the first valid field
            foreach ($this->fields as $f) {
                if ($f !== 'id' && $f !== '__payload') {
                    $field = $f;
                    break;
                }
            }
        }

        // If no valid field found, return empty
        if (!$field) {
            return ['terms' => []];
        }

        $sql = "SELECT {$field} FROM documents LIMIT 100";

        if ($options['filter']) {
            $sql = "SELECT {$field} FROM documents WHERE {$options['filter']} LIMIT 100";
        }

        $stmt = $this->db->query($sql);
        $content = '';

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $content .= ' ' . ($row[$field] ?? '');
        }

        // Extract words and count them
        preg_match_all('/\b(\w{' . $options['minLength'] . ',' . $options['maxLength'] . '})\b/u', $content, $matches);
        $words = array_count_values($matches[0]);
        arsort($words);

        // Filter by minimum frequency
        $words = array_filter($words, function($count) use ($options) {
            return $count >= $options['minTermFrequency'];
        });

        // Format and limit results
        $results = [];
        foreach (array_slice($words, 0, $options['limit']) as $term => $count) {
            $results[] = [
                'term' => $term,
                'count' => $count
            ];
        }

        return [
            'terms' => $results
        ];
    }

    /**
     * Gets recent search queries that can be suggested to users.
     *
     * This method requires having a separate table to store search history.
     * If the table doesn't exist, it will be created.
     *
     * @param array $options An array of options (optional).
     *  Possible options:
     *   - limit: The maximum number of recent queries to retrieve (default: 10).
     *   - minCount: The minimum number of times a query must have been searched (default: 1).
     *   - days: Only include queries from the past X days (default: 30).
     *
     * @return array The recent search queries.
     */
    public function getRecentSearches(array $options = []): array {
        $options = array_merge([
            'limit' => 10,
            'minCount' => 1,
            'days' => 30
        ], $options);

        // Ensure the search history table exists
        $this->ensureSearchHistoryTable();

        // Get recent searches
        $daysAgo = date('Y-m-d H:i:s', strtotime('-' . (int)$options['days'] . ' days'));

        $sql = "
            SELECT query, COUNT(*) as count, MAX(timestamp) as last_searched
            FROM search_history
            WHERE timestamp > :days_ago
            GROUP BY query
            HAVING count >= :min_count
            ORDER BY last_searched DESC
            LIMIT :limit
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':days_ago', $daysAgo);
        $stmt->bindValue(':min_count', (int)$options['minCount'], PDO::PARAM_INT);
        $stmt->bindValue(':limit', (int)$options['limit'], PDO::PARAM_INT);

        try {
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return [
                'queries' => [],
                'error' => $e->getMessage()
            ];
        }

        return [
            'queries' => $results
        ];
    }

    /**
     * Logs a search query to the search history table.
     *
     * @param string $query The search query to log.
     * @param array $metadata Optional metadata about the search (e.g., user_id, results_count).
     * @return bool Whether the query was successfully logged.
     */
    public function logSearch(string $query, array $metadata = []): bool {
        if (empty(trim($query))) {
            return false;
        }

        // Ensure the search history table exists
        $this->ensureSearchHistoryTable();

        // Insert the search query
        $sql = "
            INSERT INTO search_history (query, metadata, timestamp)
            VALUES (:query, :metadata, :timestamp)
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':query', $query);
        $stmt->bindValue(':metadata', json_encode($metadata));
        $stmt->bindValue(':timestamp', date('Y-m-d H:i:s'));

        try {
            return $stmt->execute();
        } catch (\PDOException $e) {
            return false;
        }
    }

    /**
     * Ensures that the search history table exists.
     */
    private function ensureSearchHistoryTable(): void {
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS search_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                query TEXT NOT NULL,
                metadata TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Add index on query and timestamp if it doesn't exist
        $result = $this->db->query("SELECT name FROM sqlite_master WHERE type='index' AND name='idx_search_history_query'");
        if (!$result->fetch()) {
            $this->db->exec("CREATE INDEX idx_search_history_query ON search_history(query)");
        }

        $result = $this->db->query("SELECT name FROM sqlite_master WHERE type='index' AND name='idx_search_history_timestamp'");
        if (!$result->fetch()) {
            $this->db->exec("CREATE INDEX idx_search_history_timestamp ON search_history(timestamp)");
        }
    }

    // These methods have been removed as we now use SQLite's NEAR operator for fuzzy matching

    /**
     * Highlights the matching prefix in a suggestion.
     *
     * @param string $suggestion The suggestion text.
     * @param string $prefix The prefix to highlight.
     * @return string The suggestion with the prefix highlighted.
     */
    private function highlightPrefix(string $suggestion, string $prefix): string {
        $prefixLen = mb_strlen($prefix);

        // Search for the prefix ignoring case
        $pos = mb_stripos($suggestion, $prefix);

        if ($pos !== false) {
            // Extract the actual matching substring (preserving original case)
            $matchingPart = mb_substr($suggestion, $pos, $prefixLen);

            // Replace only that occurrence with a highlighted version
            $before = mb_substr($suggestion, 0, $pos);
            $after = mb_substr($suggestion, $pos + $prefixLen);

            return $before . '<strong>' . $matchingPart . '</strong>' . $after;
        }

        // If no exact match found (possible with fuzzy suggestions), return as is
        return $suggestion;
    }

    /**
     * Processes search results from the database into suggestion format.
     *
     * @param array $results The raw results from the database.
     * @param string $prefix The prefix that was searched for.
     * @param array $options The options used for the search.
     * @return array The processed suggestions.
     */
    private function processResults(array $results, string $prefix, array $options): array {
        $suggestions = [];

        foreach ($results as $row) {
            $term = $row['term'] ?? ($row['snippet'] ?? '');

            if (empty($term)) {
                continue;
            }

            // Optionally highlight the matching prefix
            if ($options['highlight']) {
                $term = $this->highlightPrefix($term, $prefix);
            }

            // Return object with count if requested
            if ($options['countMatches'] && isset($row['count'])) {
                $suggestions[] = [
                    'suggestion' => $term,
                    'count' => (int)$row['count']
                ];
            } else {
                $suggestions[] = $term;
            }
        }

        return $suggestions;
    }

}
