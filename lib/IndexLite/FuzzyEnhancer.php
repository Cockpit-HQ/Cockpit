<?php

namespace IndexLite;

use PDO;

/**
 * Enhances IndexLite with advanced fuzzy search capabilities using custom SQLite functions
 */
class FuzzyEnhancer {
    
    protected PDO $db;
    protected static array $registeredConnections = [];
    
    public function __construct(PDO $db) {
        $this->db = $db;
        $this->registerFunctions();
    }
    
    /**
     * Register custom SQLite functions for enhanced fuzzy matching
     */
    protected function registerFunctions(): void {
        // Use connection ID to track registration per database connection
        $connectionId = spl_object_id($this->db);
        
        // Prevent duplicate registration for this connection
        if (isset(self::$registeredConnections[$connectionId])) {
            return;
        }
        
        // Basic Levenshtein distance
        $this->db->sqliteCreateFunction('levenshtein', function($s1, $s2) {
            return levenshtein($s1, $s2);
        }, 2);
        
        // Case-insensitive Levenshtein
        $this->db->sqliteCreateFunction('levenshtein_ci', function($s1, $s2) {
            return levenshtein(strtolower($s1), strtolower($s2));
        }, 2);
        
        // Normalized Levenshtein (0-1 score, where 1 is perfect match)
        $this->db->sqliteCreateFunction('levenshtein_ratio', function($s1, $s2) {
            $maxLen = max(strlen($s1), strlen($s2));
            if ($maxLen == 0) return 1.0;
            $distance = levenshtein($s1, $s2);
            return 1 - ($distance / $maxLen);
        }, 2);
        
        // Damerau-Levenshtein with transpositions
        $this->db->sqliteCreateFunction('damerau_levenshtein', [$this, 'damerauLevenshtein'], 2);
        
        // Jaro-Winkler similarity (good for short strings and names)
        $this->db->sqliteCreateFunction('jaro_winkler', [$this, 'jaroWinkler'], 2);
        
        // Trigram similarity
        $this->db->sqliteCreateFunction('trigram_similarity', [$this, 'trigramSimilarity'], 2);
        
        // Soundex matching
        $this->db->sqliteCreateFunction('soundex_match', function($s1, $s2) {
            return soundex($s1) === soundex($s2) ? 1 : 0;
        }, 2);
        
        // Metaphone matching (better than soundex)
        $this->db->sqliteCreateFunction('metaphone_match', function($s1, $s2, $phonemes = 5) {
            return metaphone($s1, $phonemes) === metaphone($s2, $phonemes) ? 1 : 0;
        }, 3);
        
        // Contains fuzzy - for partial fuzzy matching within text
        $this->db->sqliteCreateFunction('contains_fuzzy', function($haystack, $needle, $threshold = 2) {
            $haystack = strtolower($haystack);
            $needle = strtolower($needle);
            $words = preg_split('/\s+/', $haystack);
            
            foreach ($words as $word) {
                if (levenshtein($word, $needle) <= $threshold) {
                    return 1;
                }
            }
            return 0;
        }, 3);
        
        // Combined fuzzy score (0-100)
        $this->db->sqliteCreateFunction('fuzzy_score', function($s1, $s2) {
            $s1 = strtolower($s1);
            $s2 = strtolower($s2);
            
            // Exact match = 100
            if ($s1 === $s2) return 100;
            
            // Calculate different similarity scores
            $scores = [];
            
            // Levenshtein (weighted by string length)
            $maxLen = max(strlen($s1), strlen($s2));
            if ($maxLen > 0) {
                $leven = levenshtein($s1, $s2);
                $scores[] = max(0, 100 - ($leven * 100 / $maxLen));
            }
            
            // Soundex bonus
            if (soundex($s1) === soundex($s2)) {
                $scores[] = 80;
            }
            
            // Prefix match bonus
            $minLen = min(strlen($s1), strlen($s2));
            $commonPrefix = 0;
            for ($i = 0; $i < $minLen; $i++) {
                if ($s1[$i] === $s2[$i]) {
                    $commonPrefix++;
                } else {
                    break;
                }
            }
            if ($commonPrefix > 0) {
                $scores[] = ($commonPrefix / $minLen) * 90;
            }
            
            // Return the highest score
            return empty($scores) ? 0 : max($scores);
        }, 2);
        
        self::$registeredConnections[$connectionId] = true;
    }
    
    /**
     * Properly escape query strings for SQL to prevent injection
     */
    protected function escapeQueryForSql(string $query): string {
        // Remove any null bytes
        $query = str_replace("\0", '', $query);
        
        // Escape single quotes by doubling them
        $query = str_replace("'", "''", $query);
        
        // Wrap in single quotes
        return "'{$query}'";
    }
    
    /**
     * Damerau-Levenshtein distance (includes transpositions)
     */
    public function damerauLevenshtein(string $s1, string $s2): int {
        $len1 = strlen($s1);
        $len2 = strlen($s2);
        
        if ($len1 == 0) return $len2;
        if ($len2 == 0) return $len1;
        
        $matrix = [];
        
        // Initialize first column and row
        for ($i = 0; $i <= $len1; $i++) {
            $matrix[$i][0] = $i;
        }
        for ($j = 0; $j <= $len2; $j++) {
            $matrix[0][$j] = $j;
        }
        
        // Calculate distances
        for ($i = 1; $i <= $len1; $i++) {
            for ($j = 1; $j <= $len2; $j++) {
                $cost = ($s1[$i-1] === $s2[$j-1]) ? 0 : 1;
                
                $matrix[$i][$j] = min(
                    $matrix[$i-1][$j] + 1,     // deletion
                    $matrix[$i][$j-1] + 1,     // insertion
                    $matrix[$i-1][$j-1] + $cost // substitution
                );
                
                // Transposition
                if ($i > 1 && $j > 1 && 
                    $s1[$i-1] === $s2[$j-2] && 
                    $s1[$i-2] === $s2[$j-1]) {
                    $matrix[$i][$j] = min(
                        $matrix[$i][$j],
                        $matrix[$i-2][$j-2] + $cost
                    );
                }
            }
        }
        
        return $matrix[$len1][$len2];
    }
    
    /**
     * Jaro-Winkler similarity
     */
    public function jaroWinkler(string $s1, string $s2, float $p = 0.1): float {
        $jaro = $this->jaro($s1, $s2);
        
        // Calculate common prefix length (up to 4 chars)
        $prefix = 0;
        $max = min(strlen($s1), strlen($s2), 4);
        
        for ($i = 0; $i < $max; $i++) {
            if ($s1[$i] === $s2[$i]) {
                $prefix++;
            } else {
                break;
            }
        }
        
        return $jaro + ($prefix * $p * (1 - $jaro));
    }
    
    /**
     * Jaro similarity (helper for Jaro-Winkler)
     */
    protected function jaro(string $s1, string $s2): float {
        $len1 = strlen($s1);
        $len2 = strlen($s2);
        
        if ($len1 == 0 && $len2 == 0) return 1.0;
        if ($len1 == 0 || $len2 == 0) return 0.0;
        
        $matchDistance = (int) (max($len1, $len2) / 2) - 1;
        $matches = 0;
        $transpositions = 0;
        
        $s1Matches = array_fill(0, $len1, false);
        $s2Matches = array_fill(0, $len2, false);
        
        // Find matches
        for ($i = 0; $i < $len1; $i++) {
            $start = max(0, $i - $matchDistance);
            $end = min($i + $matchDistance + 1, $len2);
            
            for ($j = $start; $j < $end; $j++) {
                if ($s2Matches[$j] || $s1[$i] !== $s2[$j]) continue;
                
                $s1Matches[$i] = true;
                $s2Matches[$j] = true;
                $matches++;
                break;
            }
        }
        
        if ($matches == 0) return 0.0;
        
        // Count transpositions
        $k = 0;
        for ($i = 0; $i < $len1; $i++) {
            if (!$s1Matches[$i]) continue;
            
            while (!$s2Matches[$k]) $k++;
            
            if ($s1[$i] !== $s2[$k]) {
                $transpositions++;
            }
            $k++;
        }
        
        return ($matches / $len1 + $matches / $len2 + 
                ($matches - $transpositions / 2) / $matches) / 3.0;
    }
    
    /**
     * Trigram similarity (Jaccard coefficient of trigram sets)
     */
    public function trigramSimilarity(string $s1, string $s2): float {
        $trigrams1 = $this->getTrigrams($s1);
        $trigrams2 = $this->getTrigrams($s2);
        
        if (empty($trigrams1) && empty($trigrams2)) return 1.0;
        if (empty($trigrams1) || empty($trigrams2)) return 0.0;
        
        $intersection = count(array_intersect($trigrams1, $trigrams2));
        $union = count(array_unique(array_merge($trigrams1, $trigrams2)));
        
        return $union > 0 ? $intersection / $union : 0.0;
    }
    
    /**
     * Extract trigrams from a string
     */
    protected function getTrigrams(string $text): array {
        $text = ' ' . strtolower($text) . ' ';
        $trigrams = [];
        $len = strlen($text);
        
        if ($len < 3) return [];
        
        for ($i = 0; $i < $len - 2; $i++) {
            $trigrams[] = substr($text, $i, 3);
        }
        
        return array_unique($trigrams);
    }
    
    /**
     * Build enhanced fuzzy search query with proper SQL injection protection
     */
    public function buildEnhancedFuzzyQuery(
        string $query, 
        array $fields, 
        array $options = []
    ): string {
        $algorithm = $options['algorithm'] ?? 'hybrid';
        $threshold = (int) ($options['threshold'] ?? 2);
        $minScore = (int) ($options['min_score'] ?? 70);
        
        // Escape the query to prevent SQL injection
        $escapedQuery = $this->escapeQueryForSql($query);
        
        $conditions = [];
        
        foreach ($fields as $field) {
            if ($field === 'id' || $field === '__payload') continue;
            
            // Sanitize field name (only allow alphanumeric and underscore)
            $sanitizedField = preg_replace('/[^a-zA-Z0-9_]/', '', $field);
            if ($sanitizedField !== $field || empty($sanitizedField)) {
                continue; // Skip invalid field names
            }
            
            switch ($algorithm) {
                case 'levenshtein':
                    // Use contains_fuzzy for word-level fuzzy matching
                    $conditions[] = "contains_fuzzy({$sanitizedField}, {$escapedQuery}, {$threshold}) = 1";
                    break;
                    
                case 'soundex':
                    $conditions[] = "soundex_match({$sanitizedField}, {$escapedQuery}) = 1";
                    break;
                    
                case 'trigram':
                    // Use a practical threshold for trigram similarity (0.3 is good for partial matches)
                    $minSimilarity = 0.3;
                    $conditions[] = "contains_fuzzy({$sanitizedField}, {$escapedQuery}, {$threshold}) = 1 OR trigram_similarity({$escapedQuery}, {$sanitizedField}) >= {$minSimilarity}";
                    break;
                    
                case 'jaro_winkler':
                    // Use a more lenient threshold for Jaro-Winkler (0.6 is good for fuzzy matching)
                    $minSimilarity = 0.6;
                    $conditions[] = "contains_fuzzy({$sanitizedField}, {$escapedQuery}, {$threshold}) = 1 OR jaro_winkler({$escapedQuery}, {$sanitizedField}) >= {$minSimilarity}";
                    break;
                    
                case 'contains':
                    $conditions[] = "contains_fuzzy({$sanitizedField}, {$escapedQuery}, {$threshold}) = 1";
                    break;
                    
                case 'hybrid':
                default:
                    // Use fuzzy_score for best results
                    $conditions[] = "fuzzy_score({$sanitizedField}, {$escapedQuery}) >= {$minScore}";
                    break;
            }
        }
        
        return implode(' OR ', $conditions);
    }
}