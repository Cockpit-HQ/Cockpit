<?php

namespace JSONStream;

class CollectionReader {

    protected const CHUNK_SIZE = 8192;

    protected $resource;
    protected bool $asArray = false;
    protected string $buffer = '';
    protected int $nestingLevel = 0;

    public function __construct(string $path, bool $asArray = true) {

        if (!file_exists($path)) {
            throw new \InvalidArgumentException('There is no file at given path');
        }

        $this->asArray = $asArray;

        $this->resource = fopen($path, 'rb');
    }

    public function close(): void {
        if (is_resource($this->resource)) {
            fclose($this->resource);
        }
    }

    public function get(): \Generator {

        $this->buffer = '';
        $this->nestingLevel = 0;

        rewind($this->resource);

        while (!feof($this->resource)) {
            $chunk = fread($this->resource, self::CHUNK_SIZE);
            yield from $this->parseChunk($chunk);
        }
    }

    private function parseChunk($chunk): \Generator {
        // Continue from where we left off
        $this->buffer .= $chunk;

        $start = 0;
        $keepFrom = 0;
        $yielded = 0;

        // We want to iterate over chars but since,
        // we can have multibyte strings we can't access them by position alone
        $split = mb_str_split($this->buffer);

        foreach ($split as $position => $char) {
            // Start of the collection
            if ($this->nestingLevel === 0 && $char === '[') {
                continue;
            }

            // We reached the end of the collection
            if ($this->nestingLevel === 0 && $char === ']') {
                break;
            }

            // Maybe start of an item, but we need to check if we're not nested
            if ($char === '{') {
                // Definitely start of the item
                if ($this->nestingLevel === 0) {
                    $start = $position;
                }

                $this->nestingLevel++;
            } elseif ($char === '}') {
                // Maybe end of the item?
                $this->nestingLevel--;

                // Definitely end of the item
                if ($this->nestingLevel === 0) {
                    $keepFrom = $position + 1;

                    yield json_decode(
                        mb_substr($this->buffer, $start, $position - $start + 1),
                        $this->asArray
                    );

                    $yielded++;
                }
            }
        }

        // If we don't reset nesting level when current buffer hasn't yielded any items,
        // we'll never reach 0 and won't be able to read items from next chunks.
        if ($yielded === 0) {
            $this->nestingLevel = 0;
        }

        // Keep the unparsed part for later.
        $this->buffer = mb_substr($this->buffer, $keepFrom);
    }

    public function __destruct() {
        $this->close();
    }
}
