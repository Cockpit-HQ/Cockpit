<?php

namespace Assets\Utils;

use Symfony\Component\Process\Process;

class Ffmpeg {

    protected string $binary = 'ffmpeg';

    public function __construct(?string $binary = null) {

        if ($binary) {
            $this->binary = $binary;
        }
    }

    public function thumbnail(string $dest, array $options = []) {

        $options = array_merge([
            'src' => null,
        ], $options);

        $command = "{$this->binary} -i '{$options['src']}' -vf 'thumbnail=600' -frames:v 1 '{$dest}'";

        $process = Process::fromShellCommandline($command);
        $process->run();
    }

    public function getVideoMeta(string $src): ?array {

        $command = "{$this->binary} -i '{$src}' 2>&1";

        $process = Process::fromShellCommandline($command);
        $process->run();

        $output = $process->getOutput();

        $meta = [
            'duration' => null,
            'width' => null,
            'height' => null,
            'codec' => null
        ];

        // Get duration
        if (preg_match('/Duration:\s*(\d+):(\d+):(\d+)(?:\.(\d+))?/', $output, $matches)) {
            $hours = (int)$matches[1];
            $minutes = (int)$matches[2];
            $seconds = (int)$matches[3];
            $milliseconds = isset($matches[4]) ? (float)("0." . $matches[4]) : 0;

            $meta['duration'] = ($hours * 3600) + ($minutes * 60) + $seconds + $milliseconds;
        }

        // Get codec
        if (preg_match('/Video:\s*([^(,\s]+)/', $output, $matches)) {
            $meta['codec'] = trim($matches[1]);
        }

        // Get resolution (separate pattern)
        if (preg_match('/,\s*(\d+)x(\d+)[\s,\[]/', $output, $matches)) {
            $meta['width'] = (int)$matches[1];
            $meta['height'] = (int)$matches[2];
        }

        // Return null if we couldn't get any metadata
        if ($meta['duration'] === null && $meta['width'] === null) {
            return null;
        }

        return $meta;
    }
}
