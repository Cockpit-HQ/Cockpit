<?php

/**
 * THIS FILE IS AUTO-GENERATED. ANY CHANGES WILL BE LOST!
 */

declare(strict_types=1);

namespace MongoDB\Builder\Expression;

use MongoDB\Builder\Type\Encode;
use MongoDB\Builder\Type\OperatorInterface;
use MongoDB\Builder\Type\Optional;

/**
 * Removes whitespace characters, including null, or the specified characters from the end of a string.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/rtrim/
 * @internal
 */
final class RtrimOperator implements ResolvesToString, OperatorInterface
{
    public const ENCODE = Encode::Object;
    public const NAME = '$rtrim';
    public const PROPERTIES = ['input' => 'input', 'chars' => 'chars'];

    /** @var ResolvesToString|string $input The string to trim. The argument can be any valid expression that resolves to a string. */
    public readonly ResolvesToString|string $input;

    /**
     * @var Optional|ResolvesToString|string $chars The character(s) to trim from the beginning of the input.
     * The argument can be any valid expression that resolves to a string. The $ltrim operator breaks down the string into individual UTF code point to trim from input.
     * If unspecified, $ltrim removes whitespace characters, including the null character.
     */
    public readonly Optional|ResolvesToString|string $chars;

    /**
     * @param ResolvesToString|string $input The string to trim. The argument can be any valid expression that resolves to a string.
     * @param Optional|ResolvesToString|string $chars The character(s) to trim from the beginning of the input.
     * The argument can be any valid expression that resolves to a string. The $ltrim operator breaks down the string into individual UTF code point to trim from input.
     * If unspecified, $ltrim removes whitespace characters, including the null character.
     */
    public function __construct(
        ResolvesToString|string $input,
        Optional|ResolvesToString|string $chars = Optional::Undefined,
    ) {
        $this->input = $input;
        $this->chars = $chars;
    }
}
