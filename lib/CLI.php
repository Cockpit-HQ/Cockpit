<?php

class CLI {

    public static function beep(): void {
        echo "\x7";
    }

    public static function opts(?string $name = null, mixed $default = null): mixed {

        static $opts;

        if (is_null($opts)) {

            global $argv;

            $args = $argv;
            array_shift($args);
            $opts = [];
            $cnt = count($args);

            for ($i=0;$i<$cnt;$i++){

                $a = $args[$i];
                $b = isset($args[$i+1]) ? $args[$i+1] : null;

                if (substr($a, 0, 2) == '--') {

                    $k = substr($a, 2);

                    if ($b && substr($b, 0, 1) !== '-') {
                        $opts[$k] = $b;
                    } else {
                        $opts[$k] = true;
                    }

                } elseif (substr($a, 0, 1) == '-') {

                    $k = substr($a, 1);

                    if ($b && substr($b, 0, 1) !== '-') {
                        $opts[$k] = $b;
                    } else {
                        $opts[$k] = true;
                    }
                }
            }
        }

        if (!$name) {
            return $opts;
        }

        return isset($opts[$name]) ? $opts[$name] : $default;
    }


    public static function write(string $out, ?string $fgcolor = null, ?string $bgcolor = null): void {

        if ($fgcolor === true) $fgcolor = 'green';
        if ($fgcolor === false) $fgcolor = 'red';

        $fg_colors = [
            'black'     => '0;30',
            'white'     => '1;37',
            'dark_gray' => '1;30', 'light_gray'   => '0;37',
            'blue'      => '0;34', 'light_blue'   => '1;34',
            'green'     => '0;32', 'light_green'  => '1;32',
            'cyan'      => '0;36', 'light_cyan'   => '1;36',
            'red'       => '0;31', 'light_red'    => '1;31',
            'purple'    => '0;35', 'light_purple' => '1;35',
            'brown'     => '0;33',
            'yellow'    => '1;33'
        ];

        $bg_colors = [
            'black'      => '40',
            'white'      => '47',
            'red'        => '41',
            'green'      => '42',
            'yellow'     => '43',
            'blue'       => '44',
            'magenta'    => '45',
            'cyan'       => '46',
            'light_gray' => '47'
        ];

        $colored = "";

        if ($fgcolor && isset($fg_colors[$fgcolor])) {
            $colored .= "\033[".$fg_colors[$fgcolor]."m";
        }

        if ($bgcolor && isset($bg_colors[$bgcolor])) {
            $colored .= "\033[" . $bg_colors[$bgcolor] . "m";
        }

        if ($colored) {
            $out = $colored.$out."\033[0m";
        }

        echo "{$out}";
    }

    public static function writeln(string $out, ?string $fgcolor = null, ?string $bgcolor = null): void {
        self::write("{$out}\n", $fgcolor, $bgcolor);
    }

    public static function progress(mixed $percent = false, mixed $dec = 0): void {

        if ($percent === false) {
            echo PHP_EOL;
            return;
        }

        $len = 4 + (($dec > 0) ? ($dec + 1) : 0);

        $str = str_pad(number_format($percent, $dec) . '%', $len, " ", STR_PAD_LEFT);
        $len += 3; // add 2 for () and a space before bar starts.

        $width = `tput cols`;
        $barWidth = $width - ($len) - 2; // subtract 2 for [] around bar
        $numBars = round(($percent) / 100 * ($barWidth));
        $numEmptyBars = $barWidth - $numBars;

        $barsString = '[' . str_repeat("=", ($numBars)) . str_repeat(" ", ($numEmptyBars)) . ']';

        echo "($str) " . $barsString . "\r";

        if ($percent == 100) {
            echo PHP_EOL;
        }
    }

}
