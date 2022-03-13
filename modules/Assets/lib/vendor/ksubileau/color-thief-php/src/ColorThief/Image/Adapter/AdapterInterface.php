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

/**
 * Basic interface for all image adapters.
 */
interface AdapterInterface
{
    /**
     * Checks if the image adapter is available.
     */
    public static function isAvailable(): bool;

    /**
     * Loads an image from path in filesystem.
     */
    public function loadFromPath(string $file): self;

    /**
     * Loads an image from given URL.
     */
    public function loadFromUrl(string $url): self;

    /**
     * Loads an image from a binary string representation.
     */
    public function loadFromBinary(string $data): self;

    /**
     * Loads an image resource.
     *
     * @param resource|object $resource
     */
    public function load($resource): self;

    /**
     * Destroys the image.
     */
    public function destroy(): void;

    /**
     * Returns image height.
     */
    public function getHeight(): int;

    /**
     * Returns image width.
     */
    public function getWidth(): int;

    /**
     * Returns the color of the specified pixel.
     */
    public function getPixelColor(int $x, int $y): \stdClass;

    /**
     * Get the raw resource.
     *
     * @return resource|object|null
     */
    public function getResource();
}
