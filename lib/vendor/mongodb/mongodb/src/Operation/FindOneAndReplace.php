<?php
/*
 * Copyright 2015-present MongoDB, Inc.
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

namespace MongoDB\Operation;

use MongoDB\Codec\DocumentCodec;
use MongoDB\Driver\Exception\RuntimeException as DriverRuntimeException;
use MongoDB\Driver\Server;
use MongoDB\Exception\InvalidArgumentException;
use MongoDB\Exception\UnsupportedException;

use function array_key_exists;
use function is_integer;
use function MongoDB\is_document;
use function MongoDB\is_first_key_operator;
use function MongoDB\is_pipeline;

/**
 * Operation for replacing a document with the findAndModify command.
 *
 * @see \MongoDB\Collection::findOneAndReplace()
 * @see https://mongodb.com/docs/manual/reference/command/findAndModify/
 */
class FindOneAndReplace implements Executable, Explainable
{
    public const RETURN_DOCUMENT_BEFORE = 1;
    public const RETURN_DOCUMENT_AFTER = 2;

    private FindAndModify $findAndModify;

    /**
     * Constructs a findAndModify command for replacing a document.
     *
     * Supported options:
     *
     *  * bypassDocumentValidation (boolean): If true, allows the write to
     *    circumvent document level validation.
     *
     *  * codec (MongoDB\Codec\DocumentCodec): Codec used to decode documents
     *    from BSON to PHP objects.
     *
     *  * collation (document): Collation specification.
     *
     *  * comment (mixed): BSON value to attach as a comment to this command.
     *
     *    This is not supported for servers versions < 4.4.
     *
     *  * hint (string|document): The index to use. Specify either the index
     *    name as a string or the index key pattern as a document. If specified,
     *    then the query system will only consider plans using the hinted index.
     *
     *    This is not supported for server versions < 4.4 and will result in an
     *    exception at execution time if used.
     *
     *  * maxTimeMS (integer): The maximum amount of time to allow the query to
     *    run.
     *
     *  * projection (document): Limits the fields to return for the matching
     *    document.
     *
     *  * returnDocument (enum): Whether to return the document before or after
     *    the update is applied. Must be either
     *    FindOneAndReplace::RETURN_DOCUMENT_BEFORE or
     *    FindOneAndReplace::RETURN_DOCUMENT_AFTER. The default is
     *    FindOneAndReplace::RETURN_DOCUMENT_BEFORE.
     *
     *  * session (MongoDB\Driver\Session): Client session.
     *
     *  * sort (document): Determines which document the operation modifies if
     *    the query selects multiple documents.
     *
     *  * typeMap (array): Type map for BSON deserialization.
     *
     *  * upsert (boolean): When true, a new document is created if no document
     *    matches the query. The default is false.
     *
     *  * let (document): Map of parameter names and values. Values must be
     *    constant or closed expressions that do not reference document fields.
     *    Parameters can then be accessed as variables in an aggregate
     *    expression context (e.g. "$$var").
     *
     *  * writeConcern (MongoDB\Driver\WriteConcern): Write concern.
     *
     * @param string       $databaseName   Database name
     * @param string       $collectionName Collection name
     * @param array|object $filter         Query by which to filter documents
     * @param array|object $replacement    Replacement document
     * @param array        $options        Command options
     * @throws InvalidArgumentException for parameter/option parsing errors
     */
    public function __construct(string $databaseName, string $collectionName, $filter, $replacement, array $options = [])
    {
        if (! is_document($filter)) {
            throw InvalidArgumentException::expectedDocumentType('$filter', $filter);
        }

        if (isset($options['codec']) && ! $options['codec'] instanceof DocumentCodec) {
            throw InvalidArgumentException::invalidType('"codec" option', $options['codec'], DocumentCodec::class);
        }

        if (isset($options['projection']) && ! is_document($options['projection'])) {
            throw InvalidArgumentException::expectedDocumentType('"projection" option', $options['projection']);
        }

        if (array_key_exists('returnDocument', $options) && ! is_integer($options['returnDocument'])) {
            throw InvalidArgumentException::invalidType('"returnDocument" option', $options['returnDocument'], 'integer');
        }

        if (
            isset($options['returnDocument']) &&
            $options['returnDocument'] !== self::RETURN_DOCUMENT_AFTER &&
            $options['returnDocument'] !== self::RETURN_DOCUMENT_BEFORE
        ) {
            throw new InvalidArgumentException('Invalid value for "returnDocument" option: ' . $options['returnDocument']);
        }

        if (isset($options['projection'])) {
            $options['fields'] = $options['projection'];
        }

        if (isset($options['returnDocument'])) {
            $options['new'] = $options['returnDocument'] === self::RETURN_DOCUMENT_AFTER;
        }

        unset($options['projection'], $options['returnDocument']);

        $replacement = $this->validateReplacement($replacement, $options['codec'] ?? null);

        $this->findAndModify = new FindAndModify(
            $databaseName,
            $collectionName,
            ['query' => $filter, 'update' => $replacement] + $options,
        );
    }

    /**
     * Execute the operation.
     *
     * @see Executable::execute()
     * @return array|object|null
     * @throws UnsupportedException if collation or write concern is used and unsupported
     * @throws DriverRuntimeException for other driver errors (e.g. connection errors)
     */
    public function execute(Server $server)
    {
        return $this->findAndModify->execute($server);
    }

    /**
     * Returns the command document for this operation.
     *
     * @see Explainable::getCommandDocument()
     * @return array
     */
    public function getCommandDocument()
    {
        return $this->findAndModify->getCommandDocument();
    }

    /**
     * @param array|object $replacement
     * @return array|object
     */
    private function validateReplacement($replacement, ?DocumentCodec $codec)
    {
        if (isset($codec)) {
            $replacement = $codec->encode($replacement);
        }

        if (! is_document($replacement)) {
            throw InvalidArgumentException::expectedDocumentType('$replacement', $replacement);
        }

        // Treat empty arrays as replacement documents for BC
        if ($replacement === []) {
            $replacement = (object) $replacement;
        }

        if (is_first_key_operator($replacement)) {
            throw new InvalidArgumentException('First key in $replacement is an update operator');
        }

        if (is_pipeline($replacement, true /* allowEmpty */)) {
            throw new InvalidArgumentException('$replacement is an update pipeline');
        }

        return $replacement;
    }
}
