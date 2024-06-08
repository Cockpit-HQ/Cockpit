<?php

class DotEnv {

    public static function load(string $dir = '.'): bool {

        $config = is_file($dir) ? $dir : "{$dir}/.env";

        if (!file_exists($config)) {
            return false;
        }

        $vars = self::parse(file_get_contents($config));

        foreach ($vars as $key => $value) {
            $_ENV[$key] = $value;
            putenv("{$key}={$value}");
        }

        return true;
    }

    public static function parse(string $str, bool $expand = true): array {

        $lines = explode("\n", $str);
        $vars = [];

        foreach ($lines as &$line) {

            $line = trim($line);

            if (!$line) continue;
            if ($line[0] == '#') continue;
            if (!str_contains($line, '=')) continue;

            list($name, $value) = explode('=', $line, 2);

            $value = trim($value, '"\' ');
            $name = trim($name);

            $vars[$name] = $value;
        }

        if ($expand) {

            $envs = array_merge(getenv(), $vars);

            foreach ($envs as $key => $value) {
                $str = str_replace('${'.$key.'}', $value, $str);
            }

            $vars = self::parse($str, false);
        }

        return $vars;
    }

    public static function value(string $key, $default = null) {

        $value = $_ENV[$key] ?? getenv($key);

        if (!$value) {
            $value = is_callable($default) ? $default() : $default;
        }

        return $value;
    }

    public static function resolveEnvsInString(string $str) {

        static $envs = null;

        if (!str_contains($str, '${')) {
            return $str;
        }

        if ($envs === null) {
            $envs = array_merge(getenv(), $_ENV);
        }

        // Use regex only if '${' is found
        if (preg_match_all('/\$\{([A-Za-z0-9_]+)\}/', $str, $matches)) {

            if (count($matches[1]) === 1 && '${'.$matches[1][0].'}' === $str && isset($envs[$matches[1][0]])) {

                $value = $envs[$matches[1][0]];

                if ($value === 'null') {
                    $value = null;
                } elseif ($value === 'true') {
                    $value = true;
                } elseif ($value === 'false') {
                    $value = false;
                } elseif (is_numeric($value)) {
                    return ($value + 0);
                }

                return $value;
            }

            foreach ($matches[1] as $key) {
                if (!isset($envs[$key])) continue;
                $str = str_replace('${'.$key.'}', $envs[$key], $str);
            }
        }

        return $str;
    }

    public static function resolveEnvsInArray(&$array): void {

        foreach ($array as &$value) {
            if (is_string($value)) {
                $value = self::resolveEnvsInString($value);
            } elseif (is_array($value)) {
                self::resolveEnvsInArray($value);
            }
        }
    }
}
