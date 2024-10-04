<?php
/*
 * Copyright 2018-present MongoDB, Inc.
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

namespace MongoDB\Model;

use Iterator;
use MongoDB\Exception\InvalidArgumentException;
use MongoDB\Exception\UnexpectedValueException;
use ReturnTypeWillChange;

use function is_array;
use function MongoDB\BSON\toPHP;
use function sprintf;
use function strlen;
use function substr;
use function unpack;

/**
 * Iterator for BSON documents.
 *
 * @template-implements Iterator<int, mixed>
 */
class BSONIterator implements Iterator
{
    private const BSON_SIZE = 4;

    private string $buffer;

    private int $bufferLength;

    /** @var array|object|null */
    private $current = null;

    private int $key = 0;

    private int $position = 0;

    private array $options;

    /**
     * @see https://php.net/iterator.current
     * @return mixed
     */
    #[ReturnTypeWillChange]
    public function current()
    {
        return $this->current;
    }

    /**
     * @see https://php.net/iterator.key
     * @return int
     */
    #[ReturnTypeWillChange]
    public function key()
    {
        return $this->key;
    }

    /**
     * @see https://php.net/iterator.next
     * @return void
     */
    #[ReturnTypeWillChange]
    public function next()
    {
        $this->key++;
        $this->current = null;
        $this->advance();
    }

    /**
     * @see https://php.net/iterator.rewind
     * @return void
     */
    #[ReturnTypeWillChange]
    public function rewind()
    {
        $this->key = 0;
        $this->position = 0;
        $this->current = null;
        $this->advance();
    }

    /** @see https://php.net/iterator.valid */
    #[ReturnTypeWillChange]
    public function valid(): bool
    {
        return $this->current !== null;
    }

    /**
     * Constructs a BSON Iterator.
     *
     * Supported options:
     *
     *  * typeMap (array): Type map for BSON deserialization.
     *
     * @internal
     * @see https://php.net/manual/en/function.mongodb.bson-tophp.php
     * @param string $data    Concatenated, valid, BSON-encoded documents
     * @param array  $options Iterator options
     * @throws InvalidArgumentException for parameter/option parsing errors
     */
    public function __construct(string $data, array $options = [])
    {
        if (isset($options['typeMap']) && ! is_array($options['typeMap'])) {
            throw InvalidArgumentException::invalidType('"typeMap" option', $options['typeMap'], 'array');
        }

        if (! isset($options['typeMap'])) {
            $options['typeMap'] = [];
        }

        $this->buffer = $data;
        $this->bufferLength = strlen($data);
        $this->options = $options;
    }

    private function advance(): void
    {
        if ($this->position === $this->bufferLength) {
            return;
        }

        if ($this->bufferLength - $this->position < self::BSON_SIZE) {
            throw new UnexpectedValueException(sprintf('Expected at least %d bytes; %d remaining', self::BSON_SIZE, $this->bufferLength - $this->position));
        }

        [, $documentLength] = unpack('V', substr($this->buffer, $this->position, self::BSON_SIZE));

        if ($this->bufferLength - $this->position < $documentLength) {
            throw new UnexpectedValueException(sprintf('Expected %d bytes; %d remaining', $documentLength, $this->bufferLength - $this->position));
        }

        $this->current = toPHP(substr($this->buffer, $this->position, $documentLength), $this->options['typeMap']);
        $this->position += $documentLength;
    }
}
