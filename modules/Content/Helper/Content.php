<?php

namespace Content\Helper;


class Content extends \Lime\Helper {

    protected array $allowedModels = [];

    public function allowedModels(?string $role = null): array {

        $role = $role ?? $this->app->helper('auth')->getUser('role');

        if (!$role) {
            return [];
        }

        if (isset($this->allowedModels[$role])) {
            return $this->allowedModels[$role];
        }

        $this->allowedModels[$role] = [];

        $models = $this->app->module('content')->models();
        $acl = $this->app->helper('acl');
        $allowed = [];

        foreach ($models as $name => $model) {

            if ($acl->isAllowed("content/{$name}/read", $role)) {
                $allowed[] = $name;
            }
        }

        $this->allowedModels[$role] = $allowed;

        return $this->allowedModels[$role];
    }

    public function replaceLocaleInArrayKeys(array &$array, string $locale = '', $keepDefault = false) {

        $locale = trim($locale);

        if ($locale === 'default') {
            $locale = '';
        }

        foreach ($array as $key => &$value) {

            if (str_contains($key, ':locale')) {

                $defKey = str_replace(':locale', '', $key);
                $newKey = $defKey.($locale ? "_{$locale}" : '');
                $array[$newKey] = &$value;

                if ($keepDefault) {
                    $array[$defKey] = &$value;
                }

                unset($array[$key]);
            }

            if (is_array($value)) {
                $this->replaceLocaleInArrayKeys($value, $locale, $keepDefault);
            }
        }
    }

    public function resolveLocalesInProjectionOptions(array &$fields) {

        $locales = array_keys($this->app->helper('locales')->locales(true));

        foreach ($fields as $key => &$value) {

            if (str_contains($key, ':locale')) {

                $defKey = str_replace(':locale', '', $key);
                $fields[$defKey] = &$value;

                foreach ($locales as $locale) {
                    if ($locale === 'default') continue;
                    $fields["{$defKey}_{$locale}"] = &$value;
                }

                unset($fields[$key]);
            }

            if (is_array($value)) {
                $this->resolveLocalesInProjectionOptions($value);
            }
        }
    }

    public function isContentUnique(string|array $model, array $data, string|array $fields, mixed &$info = []): bool {

        $model = is_string($model) ? $this->app->module('content')->model($model) : $model;
        $fields = is_string($fields) ? explode(',', $fields) : $fields;

        if (!$model || !in_array($model['type'], ['collection', 'tree'])) {
            return false;
        }

        $locales = array_keys($this->app->helper('locales')->locales(true));
        $collection = "content/collections/{$model['name']}";
        $projection = ['_id' => 1];
        $filter = [];

        foreach ($fields as $field) {

            $field = trim($field);

            if (!isset($data[$field]) || !$data[$field] || !is_string($data[$field])) continue;

            $projection[$field] = 1;
            $value = $data[$field];
            $filter[] = [$field => $value];

            $mfield = array_find($model['fields'], fn($f) => $f['name'] === $field);

            if ($mfield && $mfield['i18n']) {

                foreach ($locales as $locale) {
                    $key = "{$field}_{$locale}";
                    if ($locale === 'default' || !isset($data[$key]) || !$data[$key] || !is_string($data[$key])) continue;

                    $filter[] = [$key => $data[$key]];
                    $projection[$key] = 1;
                }
            }
        }

        $exists = $this->app->dataStorage->findOne($collection, ['$or' => $filter], $projection);

        if ($exists && (($data['_id'] ?? null) !== $exists['_id'])) {

            foreach ($projection as $key => $val) {

                if ($key === '_id') continue;

                if ($exists[$key] === $data[$key]) {
                    $info['field'] = $key;
                    $info['value'] = $data[$key];
                    break;
                }
            }

            return false;
        }

        return true;
    }
}
