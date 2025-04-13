<?php

/**
 * THIS FILE IS AUTO-GENERATED. ANY CHANGES WILL BE LOST!
 */

declare(strict_types=1);

namespace MongoDB\Builder\Accumulator;

use MongoDB\Builder\Type\Encode;
use MongoDB\Builder\Type\OperatorInterface;
use MongoDB\Builder\Type\WindowInterface;

/**
 * Returns the position of a document (known as the document number) in the $setWindowFields stage partition. Ties result in different adjacent document numbers.
 * New in MongoDB 5.0.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/documentNumber/
 * @internal
 */
final class DocumentNumberAccumulator implements WindowInterface, OperatorInterface
{
    public const ENCODE = Encode::Object;
    public const NAME = '$documentNumber';

    public function __construct()
    {
    }
}
