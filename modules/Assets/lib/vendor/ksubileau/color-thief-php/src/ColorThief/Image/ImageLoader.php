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

namespace ColorThief\Image;

use ColorThief\Exception\NotReadableException;
use ColorThief\Exception\NotSupportedException;
use ColorThief\Image\Adapter\AdapterInterface;

class ImageLoader
{
    /**
     * @var AdapterInterface|string|null
     */
    private $preferredAdapter = null;

    /**
     * Configure the preferred adapter to use to load images.
     *
     * @param string|AdapterInterface|null $adapter Name of the preferred adapter or adapter instance.
     *                                              If null, the adapter is automatically chosen according to the
     *                                              available extensions.
     */
    public function setPreferredAdapter($adapter): self
    {
        $this->preferredAdapter = $adapter;

        return $this;
    }

    /**
     * @param mixed $source Path/URL to the image, GD resource, Imagick/Gmagick instance, or image as binary string
     */
    public function load($source): AdapterInterface
    {
        $image = null;

        $preferredAdapter = $this->preferredAdapter;
        // Select appropriate adapter depending on source type if no preference given
        if (null === $preferredAdapter) {
            if ($this->isGdImage($source)) {
                $preferredAdapter = 'Gd';
            } elseif ($this->isImagick($source)) {
                $preferredAdapter = 'Imagick';
            } elseif ($this->isGmagick($source)) {
                $preferredAdapter = 'Gmagick';
            }
        }

        $image = $this->createAdapter($preferredAdapter);

        switch (true) {
            case $this->isGdImage($source):
            case $this->isImagick($source):
            case $this->isGmagick($source):
                return $image->load($source);
            case $this->isBinary($source):
                return $image->loadFromBinary($source);
            case $this->isUrl($source):
                return $image->loadFromUrl($source);
            case $this->isFilePath($source):
                return $image->loadFromPath($source);
            default:
                throw new NotReadableException('Image source does not exists or is not readable.');
        }
    }

    /**
     * Creates an adapter instance according to config settings.
     *
     * @param string|AdapterInterface|null $preferredAdapter
     */
    public function createAdapter($preferredAdapter = null): AdapterInterface
    {
        if (null === $preferredAdapter) {
            // Select first available adapter
            if (\ColorThief\Image\Adapter\ImagickAdapter::isAvailable()) {
                $preferredAdapter = 'Imagick';
            } elseif (\ColorThief\Image\Adapter\GmagickAdapter::isAvailable()) {
                $preferredAdapter = 'Gmagick';
            } elseif (\ColorThief\Image\Adapter\GdAdapter::isAvailable()) {
                $preferredAdapter = 'Gd';
            } else {
                throw new NotSupportedException('At least one of GD, Imagick or Gmagick extension must be installed. None of them was found.');
            }
        }

        if (is_string($preferredAdapter)) {
            $adapterName = ucfirst($preferredAdapter);
            $adapterClass = sprintf('\\ColorThief\\Image\\Adapter\\%sAdapter', $adapterName);

            if (!class_exists($adapterClass)) {
                throw new NotSupportedException("Image adapter ({$adapterName}) could not be instantiated.");
            }

            return new $adapterClass();
        }

        if ($preferredAdapter instanceof AdapterInterface) {
            return $preferredAdapter;
        }

        throw new NotSupportedException('Unknown image adapter type.');
    }

    /**
     * Determines if given source data is a GD image.
     *
     * @param mixed $data
     */
    public function isGdImage($data): bool
    {
        if (version_compare(\PHP_VERSION, '8.0.0') >= 0) {
            return $data instanceof \GdImage;
        }

        return \is_resource($data) && 'gd' == get_resource_type($data);
    }

    /**
     * Determines if given source data is an Imagick object.
     *
     * @param mixed $data
     */
    public function isImagick($data): bool
    {
        return is_a($data, 'Imagick');
    }

    /**
     * Determines if given source data is a Gmagick object.
     *
     * @param mixed $data
     */
    public function isGmagick($data): bool
    {
        return is_a($data, 'Gmagick');
    }

    /**
     * Determines if given source data is file path.
     *
     * @param mixed $data
     */
    public function isFilePath($data): bool
    {
        if (is_string($data)) {
            try {
                return is_file($data);
            } catch (\Exception $e) {
                return false;
            }
        }

        return false;
    }

    /**
     * Determines if given source data is url.
     *
     * @param mixed $data
     */
    public function isUrl($data): bool
    {
        return (bool) filter_var($data, FILTER_VALIDATE_URL);
    }

    /**
     * Determines if given source data is binary data.
     *
     * @param mixed $data
     */
    public function isBinary($data): bool
    {
        if (is_string($data)) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_buffer($finfo, $data);
            finfo_close($finfo);

            return 'text' != substr($mime, 0, 4) && 'application/x-empty' != $mime;
        }

        return false;
    }
}
