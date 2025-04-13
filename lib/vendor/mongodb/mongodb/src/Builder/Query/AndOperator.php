<?php

/**
 * THIS FILE IS AUTO-GENERATED. ANY CHANGES WILL BE LOST!
 */

declare(strict_types=1);

namespace MongoDB\Builder\Query;

use MongoDB\Builder\Type\Encode;
use MongoDB\Builder\Type\OperatorInterface;
use MongoDB\Builder\Type\QueryInterface;
use MongoDB\Exception\InvalidArgumentException;

use function array_is_list;

/**
 * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/query/and/
 * @internal
 */
final class AndOperator implements QueryInterface, OperatorInterface
{
    public const ENCODE = Encode::Single;
    public const NAME = '$and';
    public const PROPERTIES = ['queries' => 'queries'];

    /** @var list<QueryInterface|array> $queries */
    public readonly array $queries;

    /**
     * @param QueryInterface|array ...$queries
     * @no-named-arguments
     */
    public function __construct(QueryInterface|array ...$queries)
    {
        if (\count($queries) < 1) {
            throw new InvalidArgumentException(\sprintf('Expected at least %d values for $queries, got %d.', 1, \count($queries)));
        }

        if (! array_is_list($queries)) {
            throw new InvalidArgumentException('Expected $queries arguments to be a list (array), named arguments are not supported');
        }

        $this->queries = $queries;
    }
}
