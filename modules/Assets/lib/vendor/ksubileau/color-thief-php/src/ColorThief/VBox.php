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

class VBox
{
    /** @var int */
    public $r1;
    /** @var int */
    public $r2;
    /** @var int */
    public $g1;
    /** @var int */
    public $g2;
    /** @var int */
    public $b1;
    /** @var int */
    public $b2;

    /** @var array<int, int> */
    public $histo;

    /** @var int */
    private $volume;
    /** @var bool */
    private $volume_set = false;

    /** @var int */
    private $count;
    /** @var bool */
    private $count_set = false;

    /**
     * @var array
     * @phpstan-var ColorRGB
     */
    private $avg;
    /** @var bool */
    private $avg_set = false;

    /**
     * VBox constructor.
     *
     * @param array<int, int> $histo
     */
    public function __construct(int $r1, int $r2, int $g1, int $g2, int $b1, int $b2, array $histo)
    {
        $this->r1 = $r1;
        $this->r2 = $r2;
        $this->g1 = $g1;
        $this->g2 = $g2;
        $this->b1 = $b1;
        $this->b2 = $b2;
        $this->histo = $histo;
    }

    public function volume(bool $force = false): int
    {
        if (true !== $this->volume_set || $force) {
            $this->volume = (($this->r2 - $this->r1 + 1) * ($this->g2 - $this->g1 + 1) * ($this->b2 - $this->b1 + 1));
            $this->volume_set = true;
        }

        return $this->volume;
    }

    public function count(bool $force = false): int
    {
        if (true !== $this->count_set || $force) {
            $npix = 0;

            // Select the fastest way (i.e. with the fewest iterations) to count
            // the number of pixels contained in this vbox.
            if ($this->volume() > \count($this->histo)) {
                // Iterate over the histogram if the size of this histogram is lower than the vbox volume
                foreach ($this->histo as $bucketIndex => $count) {
                    $rgbBuckets = ColorThief::getColorsFromIndex($bucketIndex, ColorThief::SIGBITS);
                    if ($this->contains($rgbBuckets, 0)) {
                        $npix += $count;
                    }
                }
            } else {
                // Or iterate over points of the vbox if the size of the histogram is greater than the vbox volume
                for ($redBucket = $this->r1; $redBucket <= $this->r2; ++$redBucket) {
                    for ($greenBucket = $this->g1; $greenBucket <= $this->g2; ++$greenBucket) {
                        for ($blueBucket = $this->b1; $blueBucket <= $this->b2; ++$blueBucket) {
                            // The getColorIndex function takes RGB values instead of buckets. The left shift converts our bucket into its RGB value.
                            $bucketIndex = ColorThief::getColorIndex(
                                $redBucket << ColorThief::RSHIFT,
                                $greenBucket << ColorThief::RSHIFT,
                                $blueBucket << ColorThief::RSHIFT,
                                ColorThief::SIGBITS
                            );
                            if (isset($this->histo[$bucketIndex])) {
                                $npix += $this->histo[$bucketIndex];
                            }
                        }
                    }
                }
            }
            $this->count = $npix;
            $this->count_set = true;
        }

        return $this->count;
    }

    public function copy(): self
    {
        return new self($this->r1, $this->r2, $this->g1, $this->g2, $this->b1, $this->b2, $this->histo);
    }

    /**
     * Calculates the average color represented by this VBox.
     *
     * @phpstan-return ColorRGB
     */
    public function avg(bool $force = false): array
    {
        if (true !== $this->avg_set || $force) {
            $ntot = 0;
            $mult = 1 << ColorThief::RSHIFT;
            $rsum = 0;
            $gsum = 0;
            $bsum = 0;

            for ($redBucket = $this->r1; $redBucket <= $this->r2; ++$redBucket) {
                for ($greenBucket = $this->g1; $greenBucket <= $this->g2; ++$greenBucket) {
                    for ($blueBucket = $this->b1; $blueBucket <= $this->b2; ++$blueBucket) {
                        // getColorIndex takes RGB values instead of buckets, so left shift so we get a bucketIndex
                        $bucketIndex = ColorThief::getColorIndex(
                            $redBucket << ColorThief::RSHIFT,
                            $greenBucket << ColorThief::RSHIFT,
                            $blueBucket << ColorThief::RSHIFT,
                            ColorThief::SIGBITS
                        );

                        // The bucket values need to be multiplied by $mult to get the RGB values.
                        // Can't use a left shift here, as we're working with a floating point number to put the value at the bucket's midpoint.
                        $hval = $this->histo[$bucketIndex] ?? 0;
                        $ntot += $hval;
                        $rsum += ($hval * ($redBucket + 0.5) * $mult);
                        $gsum += ($hval * ($greenBucket + 0.5) * $mult);
                        $bsum += ($hval * ($blueBucket + 0.5) * $mult);
                    }
                }
            }

            if ($ntot) {
                $this->avg = [
                    (int) ($rsum / $ntot),
                    (int) ($gsum / $ntot),
                    (int) ($bsum / $ntot),
                ];
            } else {
                // echo 'empty box'."\n";
                $this->avg = [
                    (int) ($mult * ($this->r1 + $this->r2 + 1) / 2),
                    (int) ($mult * ($this->g1 + $this->g2 + 1) / 2),
                    (int) ($mult * ($this->b1 + $this->b2 + 1) / 2),
                ];

                // Ensure all channel values are leather or equal 255 (Issue #24)
                $this->avg = array_map(function ($val) {
                    return min($val, 255);
                }, $this->avg);
            }

            $this->avg_set = true;
        }

        return $this->avg;
    }

    /**
     * @phpstan-param ColorRGB $rgbValue
     */
    public function contains(array $rgbValue, int $rshift = ColorThief::RSHIFT): bool
    {
        // Get the buckets from the RGB values.
        $redBucket = $rgbValue[0] >> $rshift;
        $greenBucket = $rgbValue[1] >> $rshift;
        $blueBucket = $rgbValue[2] >> $rshift;

        return
            $redBucket >= $this->r1 &&
            $redBucket <= $this->r2 &&
            $greenBucket >= $this->g1 &&
            $greenBucket <= $this->g2 &&
            $blueBucket >= $this->b1 &&
            $blueBucket <= $this->b2;
    }

    /**
     * Determines the longest axis.
     *
     * @phpstan-return 'r'|'g'|'b'
     */
    public function longestAxis(): string
    {
        // Color-Width for RGB
        $red = $this->r2 - $this->r1;
        $green = $this->g2 - $this->g1;
        $blue = $this->b2 - $this->b1;

        return $red >= $green && $red >= $blue ? 'r' : ($green >= $red && $green >= $blue ? 'g' : 'b');
    }
}
