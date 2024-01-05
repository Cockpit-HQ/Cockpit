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
}
