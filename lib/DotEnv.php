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
            if (!strpos($line, '=')) continue;

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
}
