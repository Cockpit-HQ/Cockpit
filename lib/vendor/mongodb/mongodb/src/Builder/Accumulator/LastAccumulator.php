<?php

/**
 * THIS FILE IS AUTO-GENERATED. ANY CHANGES WILL BE LOST!
 */

declare(strict_types=1);

namespace MongoDB\Builder\Accumulator;

use DateTimeInterface;
use MongoDB\BSON\Type;
use MongoDB\Builder\Type\AccumulatorInterface;
use MongoDB\Builder\Type\Encode;
use MongoDB\Builder\Type\ExpressionInterface;
use MongoDB\Builder\Type\OperatorInterface;
use MongoDB\Builder\Type\WindowInterface;
use stdClass;

/**
 * Returns the result of an expression for the last document in a group or window.
 * Changed in MongoDB 5.0: Available in the $setWindowFields stage.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/last/
 * @internal
 */
final class LastAccumulator implements AccumulatorInterface, WindowInterface, OperatorInterface
{
    public const ENCODE = Encode::Single;
    public const NAME = '$last';
    public const PROPERTIES = ['expression' => 'expression'];

    /** @var DateTimeInterface|ExpressionInterface|Type|array|bool|float|int|null|stdClass|string $expression */
    public readonly DateTimeInterface|Type|ExpressionInterface|stdClass|array|bool|float|int|null|string $expression;

    /**
     * @param DateTimeInterface|ExpressionInterface|Type|array|bool|float|int|null|stdClass|string $expression
     */
    public function __construct(
        DateTimeInterface|Type|ExpressionInterface|stdClass|array|bool|float|int|null|string $expression,
    ) {
        $this->expression = $expression;
    }
}
