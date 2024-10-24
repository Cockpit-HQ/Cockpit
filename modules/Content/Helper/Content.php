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
}
