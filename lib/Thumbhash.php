<?php

/**
 * Class Thumbhash
 *
 * simplified/compact version of thumbhash implementation - https://github.com/SRWieZ/thumbhash (MIT License)
 *
 * @package SRWieZ/thumbhash
 */


class Thumbhash {

    public static function fromFile($file): array {

        $image = imagecreatefromstring(file_get_contents($file));

        $width = imagesx($image);
        $height = imagesy($image);

        $pixels = [];
        for ($y = 0; $y < $height; $y++) {
            for ($x = 0; $x < $width; $x++) {
                $color_index = imagecolorat($image, $x, $y);
                $color = imagecolorsforindex($image, $color_index);
                $alpha = 255 - ceil($color['alpha'] * (255 / 127)); // GD only supports 7-bit alpha channel
                $pixels[] = $color['red'];
                $pixels[] = $color['green'];
                $pixels[] = $color['blue'];
                $pixels[] = $alpha;
            }
        }

        return self::RGBAToHash($width, $height, $pixels);
    }

    /**
     * Encodes an RGBA image to a ThumbHash. RGB should not be premultiplied by A.
     *
     * @param int $w The width of the input image. Must be ≤100px.
     * @param int $h The height of the input image. Must be ≤100px.
     * @param array $rgba The pixels in the input image, row-by-row. Must have w*h*4 elements.
     * @returns array The ThumbHash as an array.
     * @throws Exception
     */

    public static function RGBAToHash(int $w, int $h, array $rgba): array {
        // Encoding an image larger than 100x100 is slow with no benefit
        if ($w > 100 || $h > 100) {
            throw new \Exception("{$w}x{$h} doesn't fit in 100x100");
        }

        // Determine the average color
        $avg_r = 0;
        $avg_g = 0;
        $avg_b = 0;
        $avg_a = 0;

        // TODO : use array_chunk ?
        for ($i = 0, $j = 0; $i < $w * $h; $i++, $j += 4) {
            $alpha = $rgba[$j + 3] / 255;
            $avg_r += $alpha / 255 * $rgba[$j];
            $avg_g += $alpha / 255 * $rgba[$j + 1];
            $avg_b += $alpha / 255 * $rgba[$j + 2];
            $avg_a += $alpha;
        }
        if ($avg_a) {
            $avg_r /= $avg_a;
            $avg_g /= $avg_a;
            $avg_b /= $avg_a;
        }

        $hasAlpha = $avg_a < $w * $h;
        $l_limit = $hasAlpha ? 5 : 7; // Use fewer luminance bits if there's alpha
        $lx = max(1, round($l_limit * $w / max($w, $h)));
        $ly = max(1, round($l_limit * $h / max($w, $h)));
        $l = []; // luminance
        $p = []; // yellow - blue
        $q = []; // red - green
        $a = []; // alpha

        // TODO : use array_chunk ?
        // Convert the image from RGBA to LPQA (composite atop the average color)
        for ($i = 0, $j = 0; $i < $w * $h; $i++, $j += 4) {
            $alpha = $rgba[$j + 3] / 255;
            $r = $avg_r * (1 - $alpha) + $alpha / 255 * $rgba[$j];
            $g = $avg_g * (1 - $alpha) + $alpha / 255 * $rgba[$j + 1];
            $b = $avg_b * (1 - $alpha) + $alpha / 255 * $rgba[$j + 2];
            $l[$i] = ($r + $g + $b) / 3;
            $p[$i] = ($r + $g) / 2 - $b;
            $q[$i] = $r - $g;
            $a[$i] = $alpha;
        }

        // var_dump($l, $p, $q, $a);
        // Encode using the DCT into DC (constant) and normalized AC (varying) terms
        list($l_dc, $l_ac, $l_scale) = static::encodeChannel($l, max(3, $lx), max(3, $ly), $w, $h);
        list($p_dc, $p_ac, $p_scale) = static::encodeChannel($p, 3, 3, $w, $h);
        list($q_dc, $q_ac, $q_scale) = static::encodeChannel($q, 3, 3, $w, $h);
        list($a_dc, $a_ac, $a_scale) = $hasAlpha ? static::encodeChannel($a, 5, 5, $w, $h) : [0, 0, 0];

        $isLandscape = $w > $h;
        $header24 = round(63 * $l_dc) | (round(31.5 + 31.5 * $p_dc) << 6) | (round(31.5 + 31.5 * $q_dc) << 12) | (round(31 * $l_scale) << 18) | ($hasAlpha << 23);
        $header16 = ($isLandscape ? $ly : $lx) | (round(63 * $p_scale) << 3) | (round(63 * $q_scale) << 9) | ($isLandscape << 15);
        $hash = [$header24 & 255, ($header24 >> 8) & 255, $header24 >> 16, $header16 & 255, $header16 >> 8];
        $ac_start = $hasAlpha ? 6 : 5;
        $ac_index = 0;

        if ($hasAlpha) {
            $hash[] = round(15 * $a_dc) | (round(15 * $a_scale) << 4);
        }

        $acList = $hasAlpha ? [$l_ac, $p_ac, $q_ac, $a_ac] : [$l_ac, $p_ac, $q_ac];

        foreach ($acList as $ac) {
            foreach ($ac as $f) {
                $hash_key = $ac_start + ($ac_index >> 1);
                if (!isset($hash[$hash_key])) {
                    $hash[$hash_key] = 0;
                }
                $hash[$hash_key] |= round(15 * $f) << (($ac_index++ & 1) << 2);
            }
        }

        return $hash;
    }

    /*
     * Encode a channel using the Discrete Cosine Transform (DCT)
     * into DC (constant) and normalized AC (varying) terms.
     */
    public static function encodeChannel(array $channel, int $nx, int $ny, int $w, int $h): array {
        $dc = 0;
        $ac = [];
        $scale = 0;
        $fx = [];

        for ($cy = 0; $cy < $ny; $cy++) {
            for ($cx = 0; $cx * $ny < $nx * ($ny - $cy); $cx++) {
                $f = 0;
                for ($x = 0; $x < $w; $x++) {
                    $fx[$x] = cos(pi() / $w * $cx * ($x + 0.5));
                }
                for ($y = 0; $y < $h; $y++) {
                    for ($x = 0, $fy = cos(pi() / $h * $cy * ($y + 0.5)); $x < $w; $x++) {
                        $f += $channel[$x + $y * $w] * $fx[$x] * $fy;
                    }
                }
                $f /= $w * $h;
                if ($cx || $cy) {
                    $ac[] = $f;
                    $scale = max($scale, abs($f));
                } else {
                    $dc = $f;
                }
            }
        }
        if ($scale) {
            for ($i = 0; $i < count($ac); $i++) {
                $ac[$i] = 0.5 + 0.5 / $scale * $ac[$i];
            }
        }

        return [$dc, $ac, $scale];
    }

    public static function convertHashToString(array $hash): string {
        return rtrim(base64_encode(implode(array_map('chr', $hash))), '=');
    }

    public static function convertStringToHash(string $str): array {
        return array_map('ord', str_split(base64_decode("{$str}=")));
    }

    /**
     * Decodes a ThumbHash to an RGBA image. RGB is not premultiplied by A.
     *
     * @param  array  $hash  The bytes of the ThumbHash.
     * @return array The width, height, and pixels of the rendered placeholder image.
     */
    public static function hashToRGBA(array $hash): array {
        // Read the constants
        $header24 = $hash[0] | ($hash[1] << 8) | ($hash[2] << 16);
        $header16 = $hash[3] | ($hash[4] << 8);
        $l_dc = ($header24 & 63) / 63;
        $p_dc = (($header24 >> 6) & 63) / 31.5 - 1;
        $q_dc = (($header24 >> 12) & 63) / 31.5 - 1;
        $l_scale = (($header24 >> 18) & 31) / 31;
        $hasAlpha = $header24 >> 23;
        $p_scale = (($header16 >> 3) & 63) / 63;
        $q_scale = (($header16 >> 9) & 63) / 63;
        $isLandscape = $header16 >> 15;
        $lx = max(3, ($isLandscape ? $hasAlpha ? 5 : 7 : $header16 & 7));
        $ly = max(3, ($isLandscape ? $header16 & 7 : ($hasAlpha ? 5 : 7)));
        $a_dc = $hasAlpha ? ($hash[5] & 15) / 15 : 1;
        $a_scale = ($hash[5] >> 4) / 15;

        // Read the varying factors (boost saturation by 1.25x to compensate for quantization)
        $ac_start = $hasAlpha ? 6 : 5;
        $ac_index = 0;
        $decodeChannel = function ($nx, $ny, $scale) use (&$hash, &$ac_start, &$ac_index) {
            $ac = [];
            for ($cy = 0; $cy < $ny; $cy++) {
                for ($cx = $cy ? 0 : 1; $cx * $ny < $nx * ($ny - $cy); $cx++) {
                    $ac[] = ((((int)$hash[$ac_start + ($ac_index >> 1)] >> (($ac_index++ & 1) << 2)) & 15) / 7.5 - 1) * $scale;
                }
            }

            return $ac;
        };
        $l_ac = $decodeChannel($lx, $ly, $l_scale);
        $p_ac = $decodeChannel(3, 3, $p_scale * 1.25);
        $q_ac = $decodeChannel(3, 3, $q_scale * 1.25);
        $a_ac = $hasAlpha ? $decodeChannel(5, 5, $a_scale) : null;
        // Decode using the DCT into RGB
        $ratio = static::toApproximateAspectRatio($hash);
        $w = round($ratio > 1 ? 32 : 32 * $ratio);
        $h = round($ratio > 1 ? 32 / $ratio : 32);
        $rgba = [];
        $fx = [];
        $fy = [];

        for ($y = 0, $i = 0; $y < $h; $y++) {
            for ($x = 0; $x < $w; $x++, $i += 4) {
                $l = $l_dc;
                $p = $p_dc;
                $q = $q_dc;
                $a = $a_dc;

                // Precompute the coefficients
                for ($cx = 0, $n = max($lx, $hasAlpha ? 5 : 3); $cx < $n; $cx++) {
                    $fx[$cx] = cos(M_PI / $w * ($x + 0.5) * $cx);
                }
                for ($cy = 0, $n = max($ly, $hasAlpha ? 5 : 3); $cy < $n; $cy++) {
                    $fy[$cy] = cos(M_PI / $h * ($y + 0.5) * $cy);
                }

                // Decode L
                for ($cy = 0, $j = 0; $cy < $ly; $cy++) {
                    for ($cx = $cy ? 0 : 1, $fy2 = $fy[$cy] * 2; $cx * $ly < $lx * ($ly - $cy); $cx++, $j++) {
                        $l += $l_ac[$j] * $fx[$cx] * $fy2;
                    }
                }

                // Decode P and Q
                for ($cy = 0, $j = 0; $cy < 3; $cy++) {
                    for ($cx = $cy ? 0 : 1, $fy2 = $fy[$cy] * 2; $cx < 3 - $cy; $cx++, $j++) {
                        $f = $fx[$cx] * $fy2;
                        $p += $p_ac[$j] * $f;
                        $q += $q_ac[$j] * $f;
                    }
                }

                // Decode A
                if ($hasAlpha) {
                    for ($cy = 0, $j = 0; $cy < 5; $cy++) {
                        for ($cx = $cy ? 0 : 1, $fy2 = $fy[$cy] * 2; $cx < 5 - $cy; $cx++, $j++) {
                            $a += $a_ac[$j] * $fx[$cx] * $fy2;
                        }
                    }
                }

                // Convert to RGB
                $b = $l - 2 / 3 * $p;
                $r = (3 * $l - $b + $q) / 2;
                $g = $r - $q;
                $rgba[$i] = max(0, 255 * min(1, $r));
                $rgba[$i + 1] = max(0, 255 * min(1, $g));
                $rgba[$i + 2] = max(0, 255 * min(1, $b));
                $rgba[$i + 3] = max(0, 255 * min(1, $a));
            }
        }

        return compact('w', 'h', 'rgba');
    }


    /**
     * Extracts the average color from a ThumbHash. RGB is not premultiplied by A.
     *
     * @param  array  $hash  The bytes of the ThumbHash.
     * @return array The RGBA values for the average color. Each value ranges from 0 to 1.
     */
    public static function toAverageRGBA(array $hash): array {
        $header = $hash[0] | ($hash[1] << 8) | ($hash[2] << 16);
        $l = ($header & 63) / 63;
        $p = (($header >> 6) & 63) / 31.5 - 1;
        $q = (($header >> 12) & 63) / 31.5 - 1;
        $hasAlpha = $header >> 23;
        $a = $hasAlpha ? ($hash[5] & 15) / 15 : 1;
        $b = $l - 2 / 3 * $p;
        $r = (3 * $l - $b + $q) / 2;
        $g = $r - $q;

        return [
            'r' => max(0, min(1, $r)),
            'g' => max(0, min(1, $g)),
            'b' => max(0, min(1, $b)),
            'a' => $a
        ];
    }


    /**
     * Extracts the approximate aspect ratio of the original image.
     *
     * @param  array  $hash  The bytes of the ThumbHash.
     * @return float The approximate aspect ratio (i.e. width / height).
     */
    public static function toApproximateAspectRatio(array $hash): float {
        $header = $hash[3];
        $hasAlpha = $hash[2] & 0x80;
        $isLandscape = $hash[4] & 0x80;
        $lx = $isLandscape ? ($hasAlpha ? 5 : 7) : ($header & 7);
        $ly = $isLandscape ? ($header & 7) : ($hasAlpha ? 5 : 7);

        return $lx / $ly;
    }

    /**
     * Encodes an RGBA image to a PNG data URL. RGB should not be premultiplied by
     * A. This is optimized for speed and simplicity and does not optimize for size
     * at all. This doesn't do any compression (all values are stored uncompressed).
     *
     * @param $w Int The width of the input image. Must be ≤100px.
     * @param $h Int The height of the input image. Must be ≤100px.
     * @param $rgba String The pixels in the input image, row-by-row. Must have w*h*4 elements.
     * @returns String A data URL containing a PNG for the input image.
     */
    public static function rgbaToDataURL(int $w, int $h, array $rgba): string {
        $row = $w * 4 + 1;
        $idat = 6 + $h * (5 + $row);
        $bytes = [
            137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0,
            $w >> 8, $w & 255, 0, 0, $h >> 8, $h & 255, 8, 6, 0, 0, 0, 0, 0, 0, 0,
            ($idat >> 24) & 0xFF, ($idat >> 16) & 255, ($idat >> 8) & 255, $idat & 255,
            73, 68, 65, 84, 120, 1
        ];
        $table = [
            0, 498536548, 997073096, 651767980, 1994146192, 1802195444, 1303535960,
            1342533948, -306674912, -267414716, -690576408, -882789492, -1687895376,
            -2032938284, -1609899400, -1111625188
        ];
        $a = 1;
        $b = 0;
        $y = 0;
        $i = 0;
        $end = $row - 1;

        for (; $y < $h; $y++, $end += $row - 1) {
            array_push($bytes, ($y + 1 < $h ? 0 : 1), $row & 255, $row >> 8, ~$row & 255, ($row >> 8) ^ 255, 0);

            for ($b = ($b + $a) % 65521; $i < $end; $i++) {
                $u = intval($rgba[$i]) & 255;
                $bytes[] = $u;
                $a = ($a + $u) % 65521;
                $b = ($b + $a) % 65521;
            }
        }

        array_push(
            $bytes,
            $b >> 8,
            $b & 255,
            $a >> 8,
            $a & 255,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            73,
            69,
            78,
            68,
            174,
            66,
            96,
            130
        );

        $ranges = [[12, 29], [37, 41 + $idat]];

        foreach ($ranges as $range) {
            $start = $range[0];
            $end = $range[1];
            $c = ~0;

            for ($i = $start; $i < $end; $i++) {
                $c ^= $bytes[$i];
                $c = (($c >> 4) & 0xFFFFFFF) ^ $table[$c & 15];
                $c = (($c >> 4) & 0xFFFFFFF) ^ $table[$c & 15];
            }

            $c = ~$c;
            $bytes[$end++] = ($c >> 24) & 0xFF;
            $bytes[$end++] = ($c >> 16) & 255;
            $bytes[$end++] = ($c >> 8) & 255;
            $bytes[$end++] = $c & 255;
        }


        return 'data:image/png;base64,' . base64_encode(implode('', array_map('chr', $bytes)));
    }


    /**
     * Decodes a ThumbHash to a PNG data URL. This is a convenience function that
     * just calls "thumbHashToRGBA" followed by "rgbaToDataURL".
     *
     * @param array $hash The bytes of the ThumbHash.
     * @returns array A data URL containing a PNG for the rendered ThumbHash.
     */
    public static function toDataURL(array $hash): string {
        $image = static::hashToRGBA($hash);

        return static::rgbaToDataURL($image['w'], $image['h'], $image['rgba']);
    }
}
