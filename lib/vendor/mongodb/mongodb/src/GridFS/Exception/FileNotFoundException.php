<?php
/*
 * Copyright 2016-present MongoDB, Inc.
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

namespace MongoDB\GridFS\Exception;

use MongoDB\BSON\Document;
use MongoDB\Exception\RuntimeException;

use function sprintf;

class FileNotFoundException extends RuntimeException
{
    /**
     * Thrown when a file cannot be found by its filename.
     *
     * @param string $filename Filename
     * @internal
     */
    public static function byFilename(string $filename): self
    {
        return new self(sprintf('File with name "%s" not found', $filename));
    }

    /**
     * Thrown when a file cannot be found by its filename and revision.
     *
     * @param string  $filename  Filename
     * @param integer $revision  Revision
     * @param string  $namespace Namespace for the files collection
     * @internal
     */
    public static function byFilenameAndRevision(string $filename, int $revision, string $namespace): self
    {
        return new self(sprintf('File with name "%s" and revision "%d" not found in "%s"', $filename, $revision, $namespace));
    }

    /**
     * Thrown when a file cannot be found by its ID.
     *
     * @param mixed  $id        File ID
     * @param string $namespace Namespace for the files collection
     * @internal
     */
    public static function byId(mixed $id, string $namespace): self
    {
        $json = Document::fromPHP(['_id' => $id])->toRelaxedExtendedJSON();

        return new self(sprintf('File "%s" not found in "%s"', $json, $namespace));
    }
}
