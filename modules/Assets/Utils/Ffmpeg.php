<?php

namespace Assets\Utils;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class Ffmpeg {

    protected string $binary = 'ffmpeg';

    /**
     * @param string|null $binary
     */
    public function __construct(?string $binary = null) {

        if ($binary) {
            $this->binary = $binary;
        }
    }

    /**
     * @param string $dest
     * @param array $options
     * @return void
     */
    public function thumbnail(string $dest, array $options = []) {

        $options = array_merge([
            'src' => null,
            'scan' => 10
        ], $options);

        $options['scan'] = intval($options['scan']);

        $command = "{$this->binary} -hwaccel auto -i '{$options['src']}' -vf 'thumbnail=n={$options['scan']}' -frames:v 1 '{$dest}'";

        $process = Process::fromShellCommandline($command);
        $process->setTimeout(25);
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

    /**
     * Transcodes a video based on the provided configuration.
     *
     * @param string $srcPath Path to the source video file.
     * @param string $destPath Path to the destination video file.
     * @param array $config Transcoding configuration options.
     * Example: [
     * 'video_codec' => 'libx264',       // e.g., -c:v libx264
     * 'audio_codec' => 'aac',           // e.g., -c:a aac
     * 'video_bitrate' => '1M',          // e.g., -b:v 1M
     * 'audio_bitrate' => '128k',        // e.g., -b:a 128k
     * 'resolution' => '1280x720',       // e.g., -s 1280x720 (for direct size setting)
     * 'scale' => '1280:-2',             // e.g., -vf scale=1280:-2 (more flexible scaling, overrides 'resolution')
     * 'preset' => 'medium',             // e.g., -preset medium (for x264/x265)
     * 'crf' => 23,                      // e.g., -crf 23 (for x264/x265)
     * 'framerate' => 30,                // e.g., -r 30
     * 'format' => 'mp4',                // e.g., -f mp4 (output container format)
     * 'pixel_format' => 'yuv420p',      // e.g., -pix_fmt yuv420p (for compatibility)
     * 'audio_channels' => 2,            // e.g., -ac 2
     * 'hwaccel' => 'auto',              // e.g., -hwaccel auto (set to null or false to disable)
     * 'overwrite' => true,              // e.g., -y (overwrite output file if it exists)
     * 'raw' => '',                      // e.g., '-movflags +faststart -profile:v main' (additional raw ffmpeg flags)
     * 'timeout' => 3600,                // Process timeout in seconds (default: 1 hour)
     * ]
     * @return void
     * @throws \InvalidArgumentException If source file is not found or not readable.
     * @throws ProcessFailedException If the FFMPEG command fails (e.g., non-zero exit code).
     */
    public function transcode(string $srcPath, string $destPath, array $config = []): void {

        if (!is_file($srcPath) || !is_readable($srcPath)) {
            throw new \InvalidArgumentException("Source file not found or not readable: " . $srcPath);
        }

        // Default configuration for transcoding
        $defaultConfig = [
            'overwrite' => true,          // Overwrite output file if it exists
            'timeout' => 3600,            // Default timeout: 1 hour
            'hwaccel' => 'auto',          // Hardware acceleration ('auto', 'cuda', 'vaapi', etc., or null/false to disable)
            'video_codec' => null,        // e.g., 'libx264', 'libvpx-vp9'
            'audio_codec' => null,        // e.g., 'aac', 'libopus'
            'video_bitrate' => null,      // e.g., '1M', '2500k'
            'audio_bitrate' => null,      // e.g., '128k', '192k'
            'resolution' => null,         // For -s WxH (e.g., '1280x720')
            'scale' => null,              // For -vf scale=W:H (e.g., '1280:-2', takes precedence over 'resolution')
            'preset' => null,             // For codecs like x264/x265 (e.g., 'ultrafast', 'medium', 'slow')
            'crf' => null,                // Constant Rate Factor (e.g., 23 for x264)
            'framerate' => null,          // e.g., 25, 30
            'format' => null,             // Output container format (e.g., 'mp4', 'webm')
            'pixel_format' => null,       // Pixel format (e.g., 'yuv420p' for compatibility)
            'audio_channels' => null,     // Number of audio channels (e.g., 1 for mono, 2 for stereo)
            'raw' => '',                  // Any additional ffmpeg command line options as a string
        ];

        // Merge user configuration with defaults
        $config = array_merge($defaultConfig, $config);

        // Start building the ffmpeg command
        $commandParts = [$this->binary];

        // Add hardware acceleration if specified
        if ($config['hwaccel']) {
            $commandParts[] = "-hwaccel {$config['hwaccel']}";
        }

        // Add overwrite flag if enabled
        if ($config['overwrite']) {
            $commandParts[] = "-y";
        }

        // Add input file (source path)
        $commandParts[] = "-i " . escapeshellarg($srcPath);

        // Map configuration keys to FFMPEG options and their flags
        $simpleOptionMap = [
            'video_codec'   => '-c:v',
            'audio_codec'   => '-c:a',
            'video_bitrate' => '-b:v',
            'audio_bitrate' => '-b:a',
            'preset'        => '-preset',
            'crf'           => '-crf',
            'framerate'     => '-r',
            'format'        => '-f',
            'pixel_format'  => '-pix_fmt',
            'audio_channels'=> '-ac',
        ];

        foreach ($simpleOptionMap as $key => $flag) {
            if (isset($config[$key])) $commandParts[] = "{$flag} {$config[$key]}";
        }

        // Video filter (-vf) construction
        $vfArguments = [];

        // Handle scaling: 'scale' takes precedence over 'resolution'
        if (isset($config['scale'])) {
            $vfArguments[] = "scale={$config['scale']}";
        }

        if (!empty($vfArguments)) {
            $commandParts[] = "-vf '" . implode(',', $vfArguments) . "'";
        } elseif (isset($config['resolution'])) {
            $commandParts[] = "-s {$config['resolution']}";
        }

        if (!empty($config['raw'])) {
            $commandParts[] = $config['raw'];
        }

        $commandParts[] = escapeshellarg($destPath);

        $command = implode(' ', $commandParts);
        $process = Process::fromShellCommandline($command);
        $process->setTimeout($config['timeout']);

        // mustRun() throws a ProcessFailedException on failure (non-zero exit code)
        $process->mustRun();
    }
}
