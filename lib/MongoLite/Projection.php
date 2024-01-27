<?php

namespace MongoLite;

class Projection {

    public static function onDocuments(array $documents, array $fields): array {

        $vals = array_values($fields);
        $isInclusion = in_array(1, $vals) ? true : false;

        if (!$isInclusion && !in_array(0, $vals)) {
            $isInclusion = true;
        }

        $projection = self::normalizeProjection($fields);

        foreach ($documents as &$document) {

            $id = $document['_id'] ?? null;
            $document = self::process($document, $projection, $isInclusion);

            if ($id && ($fields['_id'] ?? true)) {
                $document['_id'] = $id;
            }
        }

        return $documents;
    }

    public static function onDocument(array $document, array $fields): array {
        return self::onDocuments([$document], $fields)[0];
    }

    protected static function normalizeProjection($fields): array {

        $projection = [];

        foreach ($fields as $field => $value) {

            if (str_contains($field, '.')) {
                $projection = array_replace_recursive($projection, self::dotNotationToArray($field, $value));
            } else {
                $projection[$field] = $value;
            }
        }

        return $projection;
    }

    protected static function process(array $document, array $fields, bool $isInclusion): array {

        $result = [];

        if (self::is_sequential($document)) {
            foreach ($document as $key => $value) {
                $result[] = self::process($value, $fields, $isInclusion);
            }
            return $result;
        }

        foreach ($document as $field => $value) {

            if (is_array($value) && isset($fields[$field]) && is_array($fields[$field])) {

                $result[$field] = self::process($value, $fields[$field], $isInclusion);

            } else {

                if ($isInclusion && isset($fields[$field]) && $fields[$field] == 1) {
                    $result[$field] = $value;
                } elseif (!$isInclusion && (!isset($fields[$field]) || $fields[$field] != 0)) {
                    $result[$field] = $value;
                }
            }
        }

        return $result;
    }

    protected static function dotNotationToArray(string $dotNotation, mixed $value = 1): array {

        $result = [];
        $parts = explode('.', $dotNotation);
        $valPos = count($parts) - 1;
        $pointer = &$result;

        foreach ($parts as $i => $part) {
            $pointer[$part] = $i === $valPos  ? $value : [];
            $pointer = &$pointer[$part];
        }
        return $result;
    }

    protected static function is_sequential(array $arr): bool {

        $i = 0;

        foreach ($arr as $key => $value) {
            if ($key !== $i) return false;
            $i++;
        }

        return true;
    }
}
