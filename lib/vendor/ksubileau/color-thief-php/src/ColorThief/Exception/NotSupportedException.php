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

namespace ColorThief\Exception;

/**
 * Exception thrown when an operation is not supported.
 */
class NotSupportedException extends \RuntimeException implements Exception
{
    // nothing to override
}
