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
use ColorThief\Exception\NotSupportedException;
use Imagick;

/**
 * @property ?Imagick $resource
 */
class ImagickAdapter extends AbstractAdapter
{
    public static function isAvailable(): bool
    {
        return extension_loaded('imagick') && class_exists('Imagick');
    }

    public function load($resource): AdapterInterface
    {
        if (!($resource instanceof Imagick)) {
            throw new InvalidArgumentException('Argument is not an instance of Imagick.');
        }

        if (Imagick::COLORSPACE_CMYK == $resource->getImageColorspace()) {
            // Leave original object unmodified
            $resource = clone $resource;

            $imagickVersion = phpversion('imagick');
            if ($imagickVersion && version_compare($imagickVersion, '3.0.0', '<')) {
                throw new NotSupportedException('Imagick extension version 3.0.0 or later is required for sampling CMYK images.');
            }

            // With ImageMagick version 6.7.7, CMYK images converted to RGB color space work as expected,
            // but for later versions (6.9.7 and 7.0.8 have been tested), conversion to SRGB seems to be required
            $imageMagickVersion = $resource->getVersion();
            if ($imageMagickVersion['versionNumber'] > 1655) {
                $resource->transformImageColorspace(Imagick::COLORSPACE_SRGB);
            } else {
                $resource->transformImageColorspace(Imagick::COLORSPACE_RGB);
            }
        }

        return parent::load($resource);
    }

    public function loadFromBinary(string $data): AdapterInterface
    {
        $resource = new Imagick();
        try {
            $resource->readImageBlob($data);
        } catch (\ImagickException $e) {
            throw new NotReadableException('Unable to read image from binary data.', 0, $e);
        }

        return $this->load($resource);
    }

    public function loadFromPath(string $file): AdapterInterface
    {
        try {
            $resource = new Imagick($file);
        } catch (\ImagickException $e) {
            throw new NotReadableException("Unable to read image from path ({$file}).", 0, $e);
        }

        return $this->load($resource);
    }

    public function destroy(): void
    {
        if ($this->resource) {
            $this->resource->clear();
        }
        parent::destroy();
    }

    public function getHeight(): int
    {
        return $this->resource->getImageHeight();
    }

    public function getWidth(): int
    {
        return $this->resource->getImageWidth();
    }

    public function getPixelColor(int $x, int $y): \stdClass
    {
        /** @var \ImagickPixel $pixel */
        $pixel = $this->resource->getImagePixelColor($x, $y);

        // Un-normalized values don't give a full range 0-1 alpha channel
        // So we ask for normalized values, and then we un-normalize it ourselves.
        $colorArray = $pixel->getColor(1);
        $color = new \stdClass();
        $color->red = (int) round($colorArray['r'] * 255);
        $color->green = (int) round($colorArray['g'] * 255);
        $color->blue = (int) round($colorArray['b'] * 255);
        $color->alpha = (int) (127 - round($colorArray['a'] * 127));

        return $color;
    }
}
