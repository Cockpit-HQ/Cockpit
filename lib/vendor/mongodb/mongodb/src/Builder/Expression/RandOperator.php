<?php

/**
 * THIS FILE IS AUTO-GENERATED. ANY CHANGES WILL BE LOST!
 */

declare(strict_types=1);

namespace MongoDB\Builder\Expression;

use MongoDB\Builder\Type\Encode;
use MongoDB\Builder\Type\OperatorInterface;

/**
 * Returns a random float between 0 and 1
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/rand/
 * @internal
 */
final class RandOperator implements ResolvesToDouble, OperatorInterface
{
    public const ENCODE = Encode::Object;
    public const NAME = '$rand';

    public function __construct()
    {
    }
}
