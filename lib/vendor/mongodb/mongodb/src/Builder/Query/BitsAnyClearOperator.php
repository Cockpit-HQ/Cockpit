<?php

/**
 * THIS FILE IS AUTO-GENERATED. ANY CHANGES WILL BE LOST!
 */

declare(strict_types=1);

namespace MongoDB\Builder\Query;

use MongoDB\BSON\Binary;
use MongoDB\BSON\PackedArray;
use MongoDB\Builder\Type\Encode;
use MongoDB\Builder\Type\FieldQueryInterface;
use MongoDB\Builder\Type\OperatorInterface;
use MongoDB\Exception\InvalidArgumentException;
use MongoDB\Model\BSONArray;

use function array_is_list;
use function is_array;

/**
 * Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/query/bitsAnyClear/
 * @internal
 */
final class BitsAnyClearOperator implements FieldQueryInterface, OperatorInterface
{
    public const ENCODE = Encode::Single;
    public const NAME = '$bitsAnyClear';
    public const PROPERTIES = ['bitmask' => 'bitmask'];

    /** @var BSONArray|Binary|PackedArray|array|int|string $bitmask */
    public readonly Binary|PackedArray|BSONArray|array|int|string $bitmask;

    /**
     * @param BSONArray|Binary|PackedArray|array|int|string $bitmask
     */
    public function __construct(Binary|PackedArray|BSONArray|array|int|string $bitmask)
    {
        if (is_array($bitmask) && ! array_is_list($bitmask)) {
            throw new InvalidArgumentException('Expected $bitmask argument to be a list, got an associative array.');
        }

        $this->bitmask = $bitmask;
    }
}
