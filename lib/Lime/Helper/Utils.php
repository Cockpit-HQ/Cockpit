<?php

namespace Lime\Helper;

/**
 * Class Utils
 * @package Lime\Helper
 */
class Utils extends \Lime\Helper {

    /**
     * @param $size
     * @return string
     */
    public function formatSize(int $size): string {
        $sizes = [' Bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
        return ($size == 0) ? 'n/a' : (\round($size/\pow(1024, ($i = \floor(\log($size, 1024)))), 2) . $sizes[$i]);
    }

    /**
     * Return max upload size
     *
     * @return int
     */
    public function getMaxUploadSize(): int {
        static $max_size = -1;

        if ($max_size < 0) {
            // Start with post_max_size.
            $post_max_size = $this->parseSize(ini_get('post_max_size'));
            if ($post_max_size > 0) {
                $max_size = $post_max_size;
            }

            // If upload_max_size is less, then reduce. Except if upload_max_size is
            // zero, which indicates no limit.
            $upload_max = $this->parseSize(ini_get('upload_max_filesize'));
            if ($upload_max > 0 && $upload_max < $max_size) {
                $max_size = $upload_max;
            }
        }
        return $max_size;
    }

    /**
     * Parse size string
     *
     * @param string $size
     * @return void
     */
    public function parseSize(string $size): float {

        $unit = preg_replace('/[^bkmgtpezy]/i', '', $size); // Remove the non-unit characters from the size.
        $size = preg_replace('/[^0-9\.]/', '', $size); // Remove the non-numeric characters from the size.

        if ($unit) {
            // Find the position of the unit in the ordered string which is the power of magnitude to multiply a kilobyte by.
            return round($size * pow(1024, stripos('bkmgtpezy', $unit[0])));
        }

        return round($size);
    }

    /**
     * @param $content
     * @param string $base
     * @return mixed
     */
    public function fixRelativeUrls(string $content, string $base = '/'): string {

        $protocols = '[a-zA-Z0-9\-]+:';
        $regex     = '#\s+(src|href|poster)="(?!/|' . $protocols . '|\#|\')([^"]*)"#m';

        \preg_match_all($regex, $content, $matches);

        if (isset($matches[0])) {

            foreach ($matches[0] as $i => $match) {

                if (\trim($matches[2][$i])) {
                    $content = \str_replace($match, " {$matches[1][$i]}=\"{$base}{$matches[2][$i]}\"", $content);
                }
            }
        }

        //$content = preg_replace($regex, " $1=\"$base\$2\"", $content);

        // Background image.
        $regex     = '#style\s*=\s*[\'\"](.*):\s*url\s*\([\'\"]?(?!/|' . $protocols . '|\#)([^\)\'\"]+)[\'\"]?\)#m';
        $content   = \preg_replace($regex, 'style="$1: url(\'' . $base . '$2$3\')', $content);

        return $content;
    }

    /**
     * @param $string
     * @param string $replacement
     * @param bool|true $tolower
     * @return mixed|string
     */
    public function sluggify(string $string, string $replacement = '-', bool $tolower = true): string {
        $quotedReplacement = \preg_quote($replacement, '/');

        $merge = array(
            '/[^\s\p{Ll}\p{Lm}\p{Lo}\p{Lt}\p{Lu}\p{Nd}]/mu' => ' ',
            '/\\s+/' => $replacement,
            \sprintf('/^[%s]+|[%s]+$/', $quotedReplacement, $quotedReplacement) => '',
        );

        $map = array(
            '/ä|æ|ǽ/' => 'ae',
            '/ö|œ/' => 'oe',
            '/ü/' => 'ue',
            '/Ä/' => 'Ae',
            '/Ü/' => 'Ue',
            '/Ö/' => 'Oe',
            '/À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ/' => 'A',
            '/à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª/' => 'a',
            '/Ç|Ć|Ĉ|Ċ|Č/' => 'C',
            '/ç|ć|ĉ|ċ|č/' => 'c',
            '/Ð|Ď|Đ/' => 'D',
            '/ð|ď|đ/' => 'd',
            '/È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě/' => 'E',
            '/è|é|ê|ë|ē|ĕ|ė|ę|ě/' => 'e',
            '/Ĝ|Ğ|Ġ|Ģ/' => 'G',
            '/ĝ|ğ|ġ|ģ/' => 'g',
            '/Ĥ|Ħ/' => 'H',
            '/ĥ|ħ/' => 'h',
            '/Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ/' => 'I',
            '/ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı/' => 'i',
            '/Ĵ/' => 'J',
            '/ĵ/' => 'j',
            '/Ķ/' => 'K',
            '/ķ/' => 'k',
            '/Ĺ|Ļ|Ľ|Ŀ|Ł/' => 'L',
            '/ĺ|ļ|ľ|ŀ|ł/' => 'l',
            '/Ñ|Ń|Ņ|Ň/' => 'N',
            '/ñ|ń|ņ|ň|ŉ/' => 'n',
            '/Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ/' => 'O',
            '/ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º/' => 'o',
            '/Ŕ|Ŗ|Ř/' => 'R',
            '/ŕ|ŗ|ř/' => 'r',
            '/Ś|Ŝ|Ş|Š/' => 'S',
            '/ś|ŝ|ş|š|ſ/' => 's',
            '/Ţ|Ť|Ŧ/' => 'T',
            '/ţ|ť|ŧ/' => 't',
            '/Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ/' => 'U',
            '/ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ/' => 'u',
            '/Ý|Ÿ|Ŷ/' => 'Y',
            '/ý|ÿ|ŷ/' => 'y',
            '/Ŵ/' => 'W',
            '/ŵ/' => 'w',
            '/Ź|Ż|Ž/' => 'Z',
            '/ź|ż|ž/' => 'z',
            '/Æ|Ǽ/' => 'AE',
            '/ß/' => 'ss',
            '/Ĳ/' => 'IJ',
            '/ĳ/' => 'ij',
            '/Œ/' => 'OE',
            '/ƒ/' => 'f',
            '/А|а/' => 'a',
            '/Б|б/' => 'b',
            '/В|в/' => 'v',
            '/Г|г/' => 'g',
            '/Д|д/' => 'd',
            '/Е|е|Ё|ё/' => 'e',
            '/Ж|ж/' => 'j',
            '/З|з/' => 'z',
            '/И|и/' => 'i',
            '/Й|й/' => 'y',
            '/К|к/' => 'k',
            '/Л|л/' => 'l',
            '/М|м/' => 'm',
            '/Н|н/' => 'n',
            '/О|о/' => 'o',
            '/П|п/' => 'p',
            '/Р|р/' => 'r',
            '/С|с/' => 's',
            '/Т|т/' => 't',
            '/У|у/' => 'u',
            '/Ф|ф/' => 'f',
            '/Х|х/' => 'h',
            '/Ц|ц/' => 'c',
            '/Ч|ч/' => 'ch',
            '/Ш|ш/' => 'sh',
            '/Щ|щ/' => 'shch',
            '/Ы|ы/' => 'y',
            '/Э|э/' => 'e',
            '/Ю|ю/' => 'yu',
            '/Я|я/' => 'ya',
            '/Ъ|ъ|Ь|ь/' => '',
        ) + $merge;

        $string = \preg_replace(\array_keys($map), \array_values($map), $string);

        return $tolower ? \strtolower($string):$string;
    }

    /**
     * resolves complicated dependencies to determine what order something can run in
     *
     * start with an array like:
     * [
     *     'a' => ['b', 'c'],
     *     'b' => [],
     *     'c' => ['b']
     * ]
     *
     * a depends on b and c, c depends on b, and b depends on nobody
     * in this case we would return ['b', 'c', 'a']
     *
     * @param array $data
     * @return array
     */
    public function resolveDependencies(array $data): array {

        $new_data = [];
        $original_count = \count($data);
        while (\count($new_data) < $original_count) {
            foreach ($data as $name => $dependencies) {
                if (!\count($dependencies)) {
                    $new_data[] = $name;
                    unset($data[$name]);
                    continue;
                }
                foreach ($dependencies as $key => $dependency) {
                    if (\in_array($dependency, $new_data)) {
                        unset($data[$name][$key]);
                    }
                }
            }
        }
        return $new_data;
    }

    /**
    * Converts many english words that equate to true or false to boolean.
    *
    * Supports 'y', 'n', 'yes', 'no' and a few other variations.
    *
    * @param  string $string  The string to convert to boolean
    * @param  bool   $default The value to return if we can't match any
    *                          yes/no words
    * @return boolean
    */
    public function strToBool(string $string, bool $default = false): bool {

        $yes_words = 'affirmative|all right|aye|indubitably|most assuredly|ok|of course|okay|sure thing|y|yes+|yea|yep|sure|yeah|true|t|on|1|oui|vrai';
        $no_words  = 'no*|no way|nope|nah|na|never|absolutely not|by no means|negative|never ever|false|f|off|0|non|faux';

        if (\preg_match('/^('.$yes_words.')$/i', $string)) {
            return true;
        } else if (\preg_match('/^('.$no_words.')$/i', $string)) {
            return false;
        }

        return $default;
    }

    /**
    * Truncate a string to a specified length without cutting a word off.
    *
    * @param   string  $string  The string to truncate
    * @param   integer $length  The length to truncate the string to
    * @param   string  $append  Text to append to the string IF it gets
    *                           truncated, defaults to '...'
    * @return  string
    */
    public function safeTruncate(string $string, int $length, string $append = '...'): string {

        $ret        = \substr($string, 0, $length);
        $last_space = \strrpos($ret, ' ');

        if ($last_space !== false && $string != $ret) {
            $ret = \substr($ret, 0, $last_space);
        }

        if ($ret != $string ) {
            $ret .= $append;
        }

        return $ret;
    }

    /**
    * Get content from url source.
    *
    * @param   string  $url
    * @return  string
    */
    public function urlGetContents(string $url): string {

        $content = '';

        if (\function_exists('curl_exec')){
            $conn = \curl_init($url);
            \curl_setopt($conn, CURLOPT_SSL_VERIFYPEER, true);
            \curl_setopt($conn, CURLOPT_FRESH_CONNECT,  true);
            \curl_setopt($conn, CURLOPT_RETURNTRANSFER, 1);
            \curl_setopt($conn,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');
            \curl_setopt($conn, CURLOPT_AUTOREFERER, true);
            \curl_setopt($conn, CURLOPT_FOLLOWLOCATION, 1);
            \curl_setopt($conn, CURLOPT_VERBOSE, 0);
            $content = (\curl_exec($conn));
            \curl_close($conn);

        } elseif (\function_exists('file_get_contents')){

            $content = @\file_get_contents($url);

        } elseif (\function_exists('fopen') && function_exists('stream_get_contents')){
            $handle  = @\fopen ($url, "r");
            $content = @\stream_get_contents($handle);
        }
        return $content;
    }

    public function buildTree(array $elements, array $options = [], mixed $parentId = null): array {

        $options = \array_merge([
            'parent_id_column_name' => '_pid',
            'children_key_name' => 'children',
            'id_column_name' => '_id',
            'sort_column_name' => null
        ], $options);

        $branch = [];

        foreach ($elements as $element) {

            $pid = isset($element[$options['parent_id_column_name']]) ? $element[$options['parent_id_column_name']] : null;

            if ($pid == $parentId) {

                $element[$options['children_key_name']] = [];
                $children = $this->buildTree($elements, $options, $element[$options['id_column_name']]);

                if ($children) {
                    $element[$options['children_key_name']] = $children;
                }

                $branch[] = $element;
            }
        }

        if ($options['sort_column_name']) {

            \usort($branch, function ($a, $b) use($options) {

                $_a = isset($a[$options['sort_column_name']]) ? $a[$options['sort_column_name']] : null;
                $_b = isset($b[$options['sort_column_name']]) ? $b[$options['sort_column_name']] : null;

                if ($_a == $_b) {
                    return 0;
                }

                return ($_a < $_b) ? -1 : 1;
            });
        }

        return $branch;
    }

    public function buildTreeList(array $items, array $options = [], mixed $parent = null, mixed $result = null, int $depth = 0, string $path = '-'): mixed {

        $options = \array_merge([
            'parent_id_column_name' => '_pid',
            'id_column_name' => '_id'
        ], $options);

        if (!$result) {
            $result = new \ArrayObject([]);
        }

        foreach ($items as $key => &$item) {

            if ($item[$options['parent_id_column_name']] == $parent) {
                $item['_depth'] = $depth;
                $item['_path'] = $path.$item[$options['id_column_name']];
                $result[] = $item;
                $idx = \count($result) - 1;
                unset($items[$key]);
                $this->buildTreeList($items, $options, $item[$options['id_column_name']], $result, $depth + 1, "{$path}{$item[$options['id_column_name']]}-");
            }
        }

        if ($depth == 0) {

            foreach ($result as $i => $item) {
                $result[$i]['_isParent'] = isset($result[$i+1]) && $result[($i+1)][$options['parent_id_column_name']]===$item[$options['id_column_name']];
            }
        }

        return $depth == 0 ? $result->getArrayCopy() : $result;
    }

    /**
     * Check if string is valid email
     * @param  string  $email
     * @return boolean
     */
    public function isEmail(string $email): bool {

        if (\function_exists('idn_to_ascii')) {
            $email = @\idn_to_ascii($email);
        }

        return (bool) \filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    /**
     * Cast boolean string values to boolean
     * @param  mixed $input
     * @return mixed
     */
    public function fixStringBooleanValues(mixed &$input): mixed {

        if (!\is_array($input)) {

            if (\is_string($input) && ($input === 'true' || $input === 'false')) {
                $input = filter_var($input, FILTER_VALIDATE_BOOLEAN);
            }
            return $input;
        }

        foreach ($input as $k => $v) {

            if (\is_array($input[$k])) {
                $input[$k] = $this->fixStringBooleanValues($input[$k]);
            }

            if (\is_string($v) && ($v === 'true' || $v === 'false')) {
                $v = \filter_var($v, FILTER_VALIDATE_BOOLEAN);
            }

            $input[$k] = $v;
        }

        return $input;
    }

    /**
     * Cast numeric string values to numbers
     * @param  mixed $input
     * @return mixed
     */
    public function fixStringNumericValues(mixed &$input): mixed {

        if (!\is_array($input)) {

            if (\is_string($input) && \is_numeric($input)) {
                $input += 0;
            }
            return $input;
        }

        foreach ($input as $k => $v) {

            if (\is_array($input[$k])) {
                $input[$k] = $this->fixStringNumericValues($input[$k]);
            }

            if (\is_string($v) && \is_numeric($v)) {
                $v += 0;
            }

            $input[$k] = $v;
        }

        return $input;
    }

    /**
     * Execute callable with retry if it fails
     * @param  int $times
     * @param  callable $fn
     * @param  int $delay
     * @return null
     */
    public function retry(int $times, callable $fn, int $delay = 0): mixed {

        retrybeginning:
        try {
            return $fn();
        } catch (\Exception $e) {

            if (!$times) {
                throw new \Exception($e->getMessage(), 0, $e);
            }

            $times--;

            if ($delay) {
                sleep($delay);
            }

            goto retrybeginning;
        }
    }

    /**
     * var_export with bracket array notation
     * source: https://www.php.net/manual/en/function.var-export.php#122853
     *
     * @param [type] $expr
     * @param boolean $return
     * @return void
     */
    public function var_export(mixed $expr, bool $return = false): mixed {

        $export = var_export($expr, true);
        $array  = preg_split("/\r\n|\n|\r/", $export);
        $array  = preg_replace(["/\s*array\s\($/", "/\)(,)?$/", "/\s=>\s$/"], [NULL, ']$1', ' => ['], $array);
        $export = join(PHP_EOL, array_filter(["["] + $array));

        if ($return) {
            return $export;
        }

        echo $export;
    }

    public function resolveEnvString(string $str) {

        $envs = getenv();

        foreach ($envs as $key => $value) {
            $str = str_replace("\${$key}", $value, $str);
        }

        return $str;
    }
}
