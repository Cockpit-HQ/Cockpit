<?php

/*
 * This file is part of the Color Thief PHP project.
 *
 * (c) Kevin Subileau
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare(strict_types=1);

namespace ColorThief\Image\Adapter;

use ColorThief\Exception\InvalidArgumentException;
use ColorThief\Exception\NotReadableException;

/**
 * @property resource|\GdImage|null $resource
 */
class GdAdapter extends AbstractAdapter
{
    public static function isAvailable(): bool
    {
        return extension_loaded('gd') && function_exists('gd_info');
    }

    public function load($resource): AdapterInterface
    {
        if (version_compare(\PHP_VERSION, '8.0.0') >= 0) {
            if (!($resource instanceof \GdImage)) {
                throw new InvalidArgumentException('Argument is not an instance of GdImage.');
            }
        } else {
            if (!\is_resource($resource) || 'gd' != get_resource_type($resource)) {
                throw new InvalidArgumentException('Argument is not a valid GD resource.');
            }
        }

        return parent::load($resource);
    }

    public function loadFromBinary(string $data): AdapterInterface
    {
        $resource = @imagecreatefromstring($data);
        if (false === $resource) {
            throw new NotReadableException('Unable to read image from binary data.');
        }

        return parent::load($resource);
    }

    public function loadFromPath(string $file): AdapterInterface
    {
        if (!is_readable($file)) {
            throw new NotReadableException("Unable to read image from path ({$file}).");
        }

        [, , $type] = @getimagesize($file);

        switch ($type) {
            case \IMAGETYPE_GIF:
                $resource = @imagecreatefromgif($file);
                break;

            case \IMAGETYPE_JPEG:
                $resource = @imagecreatefromjpeg($file);
                break;

            case \IMAGETYPE_PNG:
                $resource = @imagecreatefrompng($file);
                break;

            case \IMAGETYPE_WEBP:
                if (!function_exists('imagecreatefromwebp')) {
                    throw new NotReadableException('Unsupported image type. GD/PHP installation does not support WebP format.');
                }
                $resource = @imagecreatefromwebp($file);
                break;

            default:
                throw new NotReadableException('Unsupported image type for GD image adapter.');
        }

        if (false === $resource) {
            throw new NotReadableException("Unable to decode image from file ({$file}).");
        }

        return parent::load($resource);
    }

    public function destroy(): void
    {
        if ($this->resource) {
            // For PHP 7.x only, noop starting from PHP 8.0
            imagedestroy($this->resource);
        }
        parent::destroy();
    }

    public function getHeight(): int
    {
        return imagesy($this->resource);
    }

    public function getWidth(): int
    {
        return imagesx($this->resource);
    }

    public function getPixelColor(int $x, int $y): \stdClass
    {
        $rgba = imagecolorat($this->resource, $x, $y);
        $color = imagecolorsforindex($this->resource, $rgba);

        return (object) $color;
    }
}
