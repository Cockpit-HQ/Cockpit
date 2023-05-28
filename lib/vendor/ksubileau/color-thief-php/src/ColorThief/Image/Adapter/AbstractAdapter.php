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

use ColorThief\Exception\NotReadableException;
use ColorThief\Exception\NotSupportedException;

/**
 * Base adapter implementation to handle image manipulation.
 */
abstract class AbstractAdapter implements AdapterInterface
{
    /**
     * @var object|resource|null Image resource/object of current image adapter
     */
    protected $resource;

    /**
     * Creates new instance of the image adapter.
     */
    public function __construct()
    {
        if (!$this->isAvailable()) {
            throw new NotSupportedException('Image adapter is not available with this PHP installation. Required extension may be missing.');
        }
    }

    public function load($resource): AdapterInterface
    {
        $this->resource = $resource;

        return $this;
    }

    public function loadFromUrl(string $url): AdapterInterface
    {
        $options = [
            'http' => [
                'method' => 'GET',
                'protocol_version' => 1.1, // force use HTTP 1.1 for service mesh environment with envoy
                'header' => [
                    'Accept-language: en',
                    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
                ],
            ],
        ];

        $context = stream_context_create($options);

        $data = @file_get_contents($url, false, $context);
        if (false === $data) {
            throw new NotReadableException("Unable to load image from url ({$url}).");
        }

        return $this->loadFromBinary($data);
    }

    public function destroy(): void
    {
        $this->resource = null;
    }

    public function getResource()
    {
        return $this->resource;
    }
}
