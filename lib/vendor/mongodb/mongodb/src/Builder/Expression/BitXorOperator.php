<?php

/**
 * THIS FILE IS AUTO-GENERATED. ANY CHANGES WILL BE LOST!
 */

declare(strict_types=1);

namespace MongoDB\Builder\Expression;

use MongoDB\BSON\Int64;
use MongoDB\Builder\Type\Encode;
use MongoDB\Builder\Type\OperatorInterface;
use MongoDB\Exception\InvalidArgumentException;

use function array_is_list;

/**
 * Returns the result of a bitwise xor (exclusive or) operation on an array of int and long values.
 * New in MongoDB 6.3.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/bitXor/
 * @internal
 */
final class BitXorOperator implements ResolvesToInt, ResolvesToLong, OperatorInterface
{
    public const ENCODE = Encode::Single;
    public const NAME = '$bitXor';
    public const PROPERTIES = ['expression' => 'expression'];

    /** @var list<Int64|ResolvesToInt|ResolvesToLong|int|string> $expression */
    public readonly array $expression;

    /**
     * @param Int64|ResolvesToInt|ResolvesToLong|int|string ...$expression
     * @no-named-arguments
     */
    public function __construct(Int64|ResolvesToInt|ResolvesToLong|int|string ...$expression)
    {
        if (\count($expression) < 1) {
            throw new InvalidArgumentException(\sprintf('Expected at least %d values for $expression, got %d.', 1, \count($expression)));
        }

        if (! array_is_list($expression)) {
            throw new InvalidArgumentException('Expected $expression arguments to be a list (array), named arguments are not supported');
        }

        $this->expression = $expression;
    }
}
