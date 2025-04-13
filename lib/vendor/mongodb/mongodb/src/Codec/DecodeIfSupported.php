<?php
/*
 * Copyright 2023-present MongoDB, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace MongoDB\Codec;

use MongoDB\Exception\UnsupportedValueException;

/**
 * @psalm-template BSONType
 * @psalm-template NativeType
 */
trait DecodeIfSupported
{
    /** @psalm-assert-if-true BSONType $value */
    abstract public function canDecode(mixed $value): bool;

    /**
     * @psalm-param BSONType $value
     * @psalm-return NativeType
     * @throws UnsupportedValueException if the decoder does not support the value
     */
    abstract public function decode(mixed $value): mixed;

    /** @psalm-return ($value is BSONType ? NativeType : $value) */
    public function decodeIfSupported(mixed $value): mixed
    {
        return $this->canDecode($value) ? $this->decode($value) : $value;
    }
}
