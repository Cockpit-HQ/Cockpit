<?php

namespace Assets\Utils;

use Symfony\Component\Process\Process;

class Vips {

    protected string $binary = 'vipsthumbnail';

    public function __construct(?string $binary = null) {

        if ($binary) {
            $this->binary = $binary;
        }
    }

    public function thumbnail(string $dest, array $options = []) {

        $options = array_merge([
            'size' => '200x200',
            'src' => null,
            'quality' => 100,
        ], $options);

        $command = "{$this->binary} '{$options['src']}' --size {$options['size']} --smartcrop attention -o '{$dest}[Q={$options['quality']}]'";

        $process = Process::fromShellCommandline($command);
        $process->run();
    }
}
