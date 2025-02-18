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

    public function getVideoDuration(string $src): ?float {

        $command = "{$this->binary} -i '{$src}' 2>&1";

        $process = Process::fromShellCommandline($command);
        $process->run();

        $output = $process->getOutput();

        if (preg_match('/Duration:\s*(\d+):(\d+):(\d+)(?:\.(\d+))?/', $output, $matches)) {
            $hours = (int)$matches[1];
            $minutes = (int)$matches[2];
            $seconds = (int)$matches[3];

            // Handle milliseconds if present
            $milliseconds = isset($matches[4]) ? (float)("0." . $matches[4]) : 0;

            $duration = ($hours * 3600) + ($minutes * 60) + $seconds + $milliseconds;
            return $duration;
        }

        return null;
    }
}
