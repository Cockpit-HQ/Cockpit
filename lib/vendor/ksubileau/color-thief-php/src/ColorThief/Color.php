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

namespace ColorThief;

use ColorThief\Exception\NotSupportedException;

class Color
{
    /**
     * RGB Red value of current color instance.
     *
     * @var int
     */
    private $red;

    /**
     * RGB Green value of current color instance.
     *
     * @var int
     */
    private $green;

    /**
     * RGB Blue value of current color instance.
     *
     * @var int
     */
    private $blue;

    /**
     * Creates new instance.
     */
    public function __construct(int $red = 0, int $green = 0, int $blue = 0)
    {
        $this->red = $red;
        $this->green = $green;
        $this->blue = $blue;
    }

    /**
     * Get red value.
     */
    public function getRed(): int
    {
        return $this->red;
    }

    /**
     * Get green value.
     */
    public function getGreen(): int
    {
        return $this->green;
    }

    /**
     * Get blue value.
     */
    public function getBlue(): int
    {
        return $this->blue;
    }

    /**
     * Calculates integer value of current color instance.
     */
    public function getInt(): int
    {
        return ($this->red << 16) + ($this->green << 8) + $this->blue;
    }

    /**
     * Calculates hexadecimal value of current color instance.
     */
    public function getHex(string $prefix = ''): string
    {
        return sprintf('%s%02x%02x%02x', $prefix, $this->red, $this->green, $this->blue);
    }

    /**
     * Calculates RGB in array format of current color instance.
     *
     * @phpstan-return ColorRGB
     */
    public function getArray(): array
    {
        return [$this->red, $this->green, $this->blue];
    }

    /**
     * Calculates RGB in string format of current color instance.
     */
    public function getRgb(): string
    {
        return sprintf('rgb(%d, %d, %d)', $this->red, $this->green, $this->blue);
    }

    /**
     * Formats current color instance into given format.
     *
     * @return string|int|array|self
     * @phpstan-return ColorRGB|string|int|self
     */
    public function format(string $type)
    {
        switch (strtolower($type)) {
            case 'rgb':
                return $this->getRgb();

            case 'hex':
                return $this->getHex('#');

            case 'int':
                return $this->getInt();

            case 'array':
                return $this->getArray();

            case 'obj':
                return $this;

            default:
                throw new NotSupportedException("Color format ({$type}) is not supported.");
        }
    }

    /**
     * Get color as string.
     */
    public function __toString(): string
    {
        return $this->getHex('#');
    }
}
