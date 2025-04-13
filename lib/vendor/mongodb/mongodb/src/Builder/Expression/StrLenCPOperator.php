<?php

/**
 * THIS FILE IS AUTO-GENERATED. ANY CHANGES WILL BE LOST!
 */

declare(strict_types=1);

namespace MongoDB\Builder\Expression;

use MongoDB\Builder\Type\Encode;
use MongoDB\Builder\Type\OperatorInterface;

/**
 * Returns the number of UTF-8 code points in a string.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/strLenCP/
 * @internal
 */
final class StrLenCPOperator implements ResolvesToInt, OperatorInterface
{
    public const ENCODE = Encode::Single;
    public const NAME = '$strLenCP';
    public const PROPERTIES = ['expression' => 'expression'];

    /** @var ResolvesToString|string $expression */
    public readonly ResolvesToString|string $expression;

    /**
     * @param ResolvesToString|string $expression
     */
    public function __construct(ResolvesToString|string $expression)
    {
        $this->expression = $expression;
    }
}
