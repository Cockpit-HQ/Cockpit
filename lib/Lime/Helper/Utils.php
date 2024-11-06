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
        return ($size == 0) ? 'n/a' : (round($size/pow(1024, ($i = floor(log($size, 1024)))), 2) . $sizes[$i]);
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
     * Return max file upload
     *
     * @return int
     */
    public function getMaxFileUploads(): int {

        static $max = -1;

        if ($max < 0) {
            // Start with post_max_size.
            $max = intval(ini_get('max_file_uploads'));

            if (!$max) {
                $max = 20;
            }
        }

        return $max;
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

        preg_match_all($regex, $content, $matches);

        if (isset($matches[0])) {

            foreach ($matches[0] as $i => $match) {

                if (trim($matches[2][$i])) {
                    $content = str_replace($match, " {$matches[1][$i]}=\"{$base}{$matches[2][$i]}\"", $content);
                }
            }
        }

        //$content = preg_replace($regex, " $1=\"$base\$2\"", $content);

        // Background image.
        $regex     = '#style\s*=\s*[\'\"](.*):\s*url\s*\([\'\"]?(?!/|' . $protocols . '|\#)([^\)\'\"]+)[\'\"]?\)#m';
        $content   = preg_replace($regex, 'style="$1: url(\'' . $base . '$2$3\')', $content);

        return $content;
    }

    /**
     * @param $string
     * @param string $replacement
     * @param bool|true $tolower
     * @return string
     */
    public function sluggify(string $string, string $replacement = '-', bool $tolower = true): string {

        if (empty($string)) return '';

        // Ensure UTF-8 encoding
        if (!mb_check_encoding($string, 'UTF-8')) {
            $string = mb_convert_encoding($string, 'UTF-8', mb_detect_encoding($string));
        }

        $string = strtr($string, [
            '©' => '(c)', '®' => '(r)', '™' => '(tm)',
            '€' => 'EUR', '£' => 'GBP', '¥' => 'JPY',
        ]);

        if (function_exists('transliterator_transliterate')) {
            $string = transliterator_transliterate('Any-Latin; Latin-ASCII', $string);
        } elseif (function_exists('iconv')){
            $_locale = setlocale(LC_ALL, 0);
            setlocale(LC_ALL, 'en_US.UTF-8');
            $string = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $string);
            setlocale(LC_ALL, $_locale);
        } else {

            // fallback
            $transliterationMap = [
                // Latin-1 Supplement
                'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'Ae', 'Å'=>'A', 'Æ'=>'AE', 'Ç'=>'C',
                'È'=>'E', 'É'=>'E', 'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I',
                'Ð'=>'D', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O', 'Õ'=>'O', 'Ö'=>'Oe', 'Ø'=>'Oe',
                'Ù'=>'U', 'Ú'=>'U', 'Û'=>'U', 'Ü'=>'Ue', 'Ý'=>'Y', 'Þ'=>'TH', 'ß'=>'ss',
                'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'ae', 'å'=>'a', 'æ'=>'ae', 'ç'=>'c',
                'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i',
                'ð'=>'d', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o', 'ö'=>'oe', 'ø'=>'oe',
                'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ü'=>'ue', 'ý'=>'y', 'þ'=>'th', 'ÿ'=>'y',

                // Latin Extended-A
                'Ā'=>'A', 'ā'=>'a', 'Ă'=>'A', 'ă'=>'a', 'Ą'=>'A', 'ą'=>'a',
                'Ć'=>'C', 'ć'=>'c', 'Ĉ'=>'C', 'ĉ'=>'c', 'Ċ'=>'C', 'ċ'=>'c', 'Č'=>'C', 'č'=>'c',
                'Ď'=>'D', 'ď'=>'d', 'Đ'=>'D', 'đ'=>'d',
                'Ē'=>'E', 'ē'=>'e', 'Ĕ'=>'E', 'ĕ'=>'e', 'Ė'=>'E', 'ė'=>'e', 'Ę'=>'E', 'ę'=>'e', 'Ě'=>'E', 'ě'=>'e',
                'Ĝ'=>'G', 'ĝ'=>'g', 'Ğ'=>'G', 'ğ'=>'g', 'Ġ'=>'G', 'ġ'=>'g', 'Ģ'=>'G', 'ģ'=>'g',
                'Ĥ'=>'H', 'ĥ'=>'h', 'Ħ'=>'H', 'ħ'=>'h',
                'Ĩ'=>'I', 'ĩ'=>'i', 'Ī'=>'I', 'ī'=>'i', 'Ĭ'=>'I', 'ĭ'=>'i', 'Į'=>'I', 'į'=>'i', 'İ'=>'I', 'ı'=>'i',
                'Ĳ'=>'IJ', 'ĳ'=>'ij',
                'Ĵ'=>'J', 'ĵ'=>'j',
                'Ķ'=>'K', 'ķ'=>'k', 'ĸ'=>'k',
                'Ĺ'=>'L', 'ĺ'=>'l', 'Ļ'=>'L', 'ļ'=>'l', 'Ľ'=>'L', 'ľ'=>'l', 'Ŀ'=>'L', 'ŀ'=>'l', 'Ł'=>'L', 'ł'=>'l',
                'Ń'=>'N', 'ń'=>'n', 'Ņ'=>'N', 'ņ'=>'n', 'Ň'=>'N', 'ň'=>'n', 'ŉ'=>'n', 'Ŋ'=>'N', 'ŋ'=>'n',
                'Ō'=>'O', 'ō'=>'o', 'Ŏ'=>'O', 'ŏ'=>'o', 'Ő'=>'O', 'ő'=>'o', 'Œ'=>'OE', 'œ'=>'oe',
                'Ŕ'=>'R', 'ŕ'=>'r', 'Ŗ'=>'R', 'ŗ'=>'r', 'Ř'=>'R', 'ř'=>'r',
                'Ś'=>'S', 'ś'=>'s', 'Ŝ'=>'S', 'ŝ'=>'s', 'Ş'=>'S', 'ş'=>'s', 'Š'=>'S', 'š'=>'s',
                'Ţ'=>'T', 'ţ'=>'t', 'Ť'=>'T', 'ť'=>'t', 'Ŧ'=>'T', 'ŧ'=>'t',
                'Ũ'=>'U', 'ũ'=>'u', 'Ū'=>'U', 'ū'=>'u', 'Ŭ'=>'U', 'ŭ'=>'u', 'Ů'=>'U', 'ů'=>'u', 'Ű'=>'U', 'ű'=>'u', 'Ų'=>'U', 'ų'=>'u',
                'Ŵ'=>'W', 'ŵ'=>'w',
                'Ŷ'=>'Y', 'ŷ'=>'y', 'Ÿ'=>'Y',
                'Ź'=>'Z', 'ź'=>'z', 'Ż'=>'Z', 'ż'=>'z', 'Ž'=>'Z', 'ž'=>'z',

                // Greek characters
                'Α'=>'A', 'Β'=>'B', 'Γ'=>'G', 'Δ'=>'D', 'Ε'=>'E', 'Ζ'=>'Z', 'Η'=>'H', 'Θ'=>'8',
                'Ι'=>'I', 'Κ'=>'K', 'Λ'=>'L', 'Μ'=>'M', 'Ν'=>'N', 'Ξ'=>'3', 'Ο'=>'O', 'Π'=>'P',
                'Ρ'=>'R', 'Σ'=>'S', 'Τ'=>'T', 'Υ'=>'Y', 'Φ'=>'F', 'Χ'=>'X', 'Ψ'=>'PS', 'Ω'=>'W',
                'α'=>'a', 'β'=>'b', 'γ'=>'g', 'δ'=>'d', 'ε'=>'e', 'ζ'=>'z', 'η'=>'h', 'θ'=>'8',
                'ι'=>'i', 'κ'=>'k', 'λ'=>'l', 'μ'=>'m', 'ν'=>'n', 'ξ'=>'3', 'ο'=>'o', 'π'=>'p',
                'ρ'=>'r', 'σ'=>'s', 'τ'=>'t', 'υ'=>'y', 'φ'=>'f', 'χ'=>'x', 'ψ'=>'ps', 'ω'=>'w',

                // Cyrillic characters
                'А'=>'A', 'Б'=>'B', 'В'=>'V', 'Г'=>'G', 'Д'=>'D', 'Е'=>'E', 'Ё'=>'Yo', 'Ж'=>'Zh',
                'З'=>'Z', 'И'=>'I', 'Й'=>'J', 'К'=>'K', 'Л'=>'L', 'М'=>'M', 'Н'=>'N', 'О'=>'O',
                'П'=>'P', 'Р'=>'R', 'С'=>'S', 'Т'=>'T', 'У'=>'U', 'Ф'=>'F', 'Х'=>'H', 'Ц'=>'C',
                'Ч'=>'Ch', 'Ш'=>'Sh', 'Щ'=>'Sh', 'Ъ'=>'', 'Ы'=>'Y', 'Ь'=>'', 'Э'=>'E', 'Ю'=>'Yu',
                'Я'=>'Ya',
                'а'=>'a', 'б'=>'b', 'в'=>'v', 'г'=>'g', 'д'=>'d', 'е'=>'e', 'ё'=>'yo', 'ж'=>'zh',
                'з'=>'z', 'и'=>'i', 'й'=>'j', 'к'=>'k', 'л'=>'l', 'м'=>'m', 'н'=>'n', 'о'=>'o',
                'п'=>'p', 'р'=>'r', 'с'=>'s', 'т'=>'t', 'у'=>'u', 'ф'=>'f', 'х'=>'h', 'ц'=>'c',
                'ч'=>'ch', 'ш'=>'sh', 'щ'=>'sh', 'ъ'=>'', 'ы'=>'y', 'ь'=>'', 'э'=>'e', 'ю'=>'yu',
                'я'=>'ya',

                // Turkish characters
                'Ğ'=>'G', 'İ'=>'I', 'Ş'=>'S',
                'ğ'=>'g', 'ı'=>'i', 'ş'=>'s',

                // Arabic
                'ا'=>'a', 'ب'=>'b', 'ت'=>'t', 'ث'=>'th', 'ج'=>'j', 'ح'=>'h', 'خ'=>'kh', 'د'=>'d',
                'ذ'=>'dh', 'ر'=>'r', 'ز'=>'z', 'س'=>'s', 'ش'=>'sh', 'ص'=>'s', 'ض'=>'d', 'ط'=>'t',
                'ظ'=>'z', 'ع'=>'\'', 'غ'=>'gh', 'ف'=>'f', 'ق'=>'q', 'ك'=>'k', 'ل'=>'l', 'م'=>'m',
                'ن'=>'n', 'ه'=>'h', 'و'=>'w', 'ي'=>'y', 'ء'=>'\'', 'ة'=>'h', 'ى'=>'a',

                // Chinese (Pinyin)
                '千'=>'qian', '百'=>'bai', '万'=>'wan', '亿'=>'yi', '人'=>'ren', '月'=>'yue', '日'=>'ri', '山'=>'shan',
                '水'=>'shui', '火'=>'huo', '木'=>'mu', '土'=>'tu', '金'=>'jin', '心'=>'xin', '手'=>'shou', '口'=>'kou',
                '眼'=>'yan', '耳'=>'er', '鼻'=>'bi', '舌'=>'she', '牙'=>'ya', '齿'=>'chi', '头'=>'tou', '发'=>'fa',

                // Japanese (Romaji)
                'あ'=>'a', 'い'=>'i', 'う'=>'u', 'え'=>'e', 'お'=>'o',
                'か'=>'ka', 'き'=>'ki', 'く'=>'ku', 'け'=>'ke', 'こ'=>'ko',
                'さ'=>'sa', 'し'=>'shi', 'す'=>'su', 'せ'=>'se', 'そ'=>'so',
                'た'=>'ta', 'ち'=>'chi', 'つ'=>'tsu', 'て'=>'te', 'と'=>'to',
                'な'=>'na', 'に'=>'ni', 'ぬ'=>'nu', 'ね'=>'ne', 'の'=>'no',
                'は'=>'ha', 'ひ'=>'hi', 'ふ'=>'fu', 'へ'=>'he', 'ほ'=>'ho',
                'ま'=>'ma', 'み'=>'mi', 'む'=>'mu', 'め'=>'me', 'も'=>'mo',
                'や'=>'ya', 'ゆ'=>'yu', 'よ'=>'yo',
                'ら'=>'ra', 'り'=>'ri', 'る'=>'ru', 'れ'=>'re', 'ろ'=>'ro',
                'わ'=>'wa', 'を'=>'wo', 'ん'=>'n',

                // Korean (Revised Romanization)
                'ㄱ'=>'g', 'ㄴ'=>'n', 'ㄷ'=>'d', 'ㄹ'=>'r', 'ㅁ'=>'m', 'ㅂ'=>'b', 'ㅅ'=>'s',
                'ㅇ'=>'', 'ㅈ'=>'j', 'ㅊ'=>'ch', 'ㅋ'=>'k', 'ㅌ'=>'t', 'ㅍ'=>'p', 'ㅎ'=>'h',
                'ㅏ'=>'a', 'ㅓ'=>'eo', 'ㅗ'=>'o', 'ㅜ'=>'u', 'ㅡ'=>'eu', 'ㅣ'=>'i',
                'ㅐ'=>'ae', 'ㅔ'=>'e', 'ㅚ'=>'oe', 'ㅟ'=>'wi', 'ㅢ'=>'ui',
            ];

            // Replace characters based on the transliteration map
            $string = strtr($string, $transliterationMap);

            $string = preg_replace('/[^\x00-\x7F]/', '', $string);
        }

        $string = preg_replace('/[^a-zA-Z0-9\-_\s]/', '', $string);
        $string = $tolower ? mb_strtolower($string, 'UTF-8') : $string;
        $string = preg_replace('/[\s-]+/', $replacement, $string);

        return trim($string, $replacement);
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
        $original_count = count($data);
        while (count($new_data) < $original_count) {
            foreach ($data as $name => $dependencies) {
                if (!count($dependencies)) {
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

        if (preg_match('/^('.$yes_words.')$/i', $string)) {
            return true;
        } else if (preg_match('/^('.$no_words.')$/i', $string)) {
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

        $ret        = substr($string, 0, $length);
        $last_space = strrpos($ret, ' ');

        if ($last_space !== false && $string != $ret) {
            $ret = substr($ret, 0, $last_space);
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

        if (function_exists('curl_exec')){
            $conn = curl_init($url);
            curl_setopt($conn, CURLOPT_SSL_VERIFYPEER, true);
            curl_setopt($conn, CURLOPT_FRESH_CONNECT,  true);
            curl_setopt($conn, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($conn,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');
            curl_setopt($conn, CURLOPT_AUTOREFERER, true);
            curl_setopt($conn, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($conn, CURLOPT_VERBOSE, 0);
            $content = (curl_exec($conn));
            curl_close($conn);

        } elseif (function_exists('file_get_contents')){

            $content = @file_get_contents($url);

        } elseif (function_exists('fopen') && function_exists('stream_get_contents')){
            $handle  = @fopen ($url, "r");
            $content = @stream_get_contents($handle);
        }
        return $content;
    }

    public function buildTree(array $elements, array $options = [], mixed $parentId = null): array {

        $options = array_merge([
            'parent_id_column_name' => '_pid',
            'children_key_name' => 'children',
            'id_column_name' => '_id',
            'sort_column_name' => null
        ], $options);

        $branch = [];

        foreach ($elements as $element) {

            $pid = $element[$options['parent_id_column_name']] ?? null;

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

            usort($branch, function ($a, $b) use($options) {

                $_a = $a[$options['sort_column_name']] ?? null;
                $_b = $b[$options['sort_column_name']] ?? null;

                if ($_a == $_b) {
                    return 0;
                }

                return ($_a < $_b) ? -1 : 1;
            });
        }

        return $branch;
    }

    public function buildTreeList(array $items, array $options = [], mixed $parent = null, mixed $result = null, int $depth = 0, string $path = '-'): mixed {

        $options = array_merge([
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
                unset($items[$key]);
                $this->buildTreeList($items, $options, $item[$options['id_column_name']], $result, $depth + 1, "{$path}{$item[$options['id_column_name']]}-");
            }
        }

        if ($depth == 0) {

            foreach ($result as $i => $itm) {
                $result[$i]['_isParent'] = isset($result[$i+1]) && $result[($i+1)][$options['parent_id_column_name']]===$itm[$options['id_column_name']];
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

        if (function_exists('idn_to_ascii')) {
            $email = @idn_to_ascii($email);
        }

        return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    /**
     * Cast boolean string values to boolean
     * @param  mixed $input
     * @return mixed
     */
    public function fixStringBooleanValues(mixed &$input): mixed {

        if (!is_array($input)) {

            if (($input === 'true' || $input === 'false')) {
                $input = filter_var($input, FILTER_VALIDATE_BOOLEAN);
            }
            return $input;
        }

        foreach ($input as $k => $v) {

            if (is_array($input[$k])) {
                $input[$k] = $this->fixStringBooleanValues($input[$k]);
            }

            if (($v === 'true' || $v === 'false')) {
                $v = filter_var($v, FILTER_VALIDATE_BOOLEAN);
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

        if (!is_array($input)) {

            if (is_string($input) && is_numeric($input)) {
                $input += 0;
            }
            return $input;
        }

        foreach ($input as $k => $v) {

            if (is_array($input[$k])) {
                $input[$k] = $this->fixStringNumericValues($input[$k]);
            }

            if (is_string($v) && is_numeric($v)) {
                $v += 0;
            }

            $input[$k] = $v;
        }

        return $input;
    }

    /**
     * Execute callable with retry if it fails
     * @param int $times
     * @param callable $fn
     * @param int $delay
     * @return null
     * @throws \Exception
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
     * @return string
     */
    public function var_export(mixed $expr, bool $return = false): string {

        $export = var_export($expr, true);
        $array  = preg_split("/\r\n|\n|\r/", $export);
        $array  = preg_replace(["/\s*array\s\($/", "/\)(,)?$/", "/\s=>\s$/"], [NULL, ']$1', ' => ['], $array);
        $export = implode(PHP_EOL, array_filter(["["] + $array));

        if ($return) {
            return $export;
        }

        echo $export;
    }
}
