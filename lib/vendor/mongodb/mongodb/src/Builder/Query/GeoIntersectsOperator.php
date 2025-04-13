<?php

/**
 * THIS FILE IS AUTO-GENERATED. ANY CHANGES WILL BE LOST!
 */

declare(strict_types=1);

namespace MongoDB\Builder\Query;

use MongoDB\BSON\Document;
use MongoDB\BSON\Serializable;
use MongoDB\Builder\Type\Encode;
use MongoDB\Builder\Type\FieldQueryInterface;
use MongoDB\Builder\Type\GeometryInterface;
use MongoDB\Builder\Type\OperatorInterface;
use stdClass;

/**
 * Selects geometries that intersect with a GeoJSON geometry. The 2dsphere index supports $geoIntersects.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/query/geoIntersects/
 * @internal
 */
final class GeoIntersectsOperator implements FieldQueryInterface, OperatorInterface
{
    public const ENCODE = Encode::Object;
    public const NAME = '$geoIntersects';
    public const PROPERTIES = ['geometry' => null];

    /** @var Document|GeometryInterface|Serializable|array|stdClass $geometry */
    public readonly Document|Serializable|GeometryInterface|stdClass|array $geometry;

    /**
     * @param Document|GeometryInterface|Serializable|array|stdClass $geometry
     */
    public function __construct(Document|Serializable|GeometryInterface|stdClass|array $geometry)
    {
        $this->geometry = $geometry;
    }
}
