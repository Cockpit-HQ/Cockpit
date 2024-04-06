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

use MongoDB\BSON\Document;
use MongoDB\Codec\DocumentCodec;
use MongoDB\Driver\Command;
use MongoDB\Driver\Exception\RuntimeException as DriverRuntimeException;
use MongoDB\Driver\Server;
use MongoDB\Driver\Session;
use MongoDB\Driver\WriteConcern;
use MongoDB\Exception\InvalidArgumentException;
use MongoDB\Exception\UnexpectedValueException;
use MongoDB\Exception\UnsupportedException;

use function array_key_exists;
use function assert;
use function current;
use function is_array;
use function is_bool;
use function is_integer;
use function is_object;
use function is_string;
use function MongoDB\create_field_path_type_map;
use function MongoDB\is_document;
use function MongoDB\is_pipeline;
use function MongoDB\is_write_concern_acknowledged;
use function MongoDB\server_supports_feature;

/**
 * Operation for the findAndModify command.
 *
 * This class is used internally by the FindOneAndDelete, FindOneAndReplace, and
 * FindOneAndUpdate operation classes.
 *
 * @internal
 * @see https://mongodb.com/docs/manual/reference/command/findAndModify/
 */
class FindAndModify implements Executable, Explainable
{
    private const WIRE_VERSION_FOR_HINT = 9;

    private const WIRE_VERSION_FOR_UNSUPPORTED_OPTION_SERVER_SIDE_ERROR = 8;

    private string $databaseName;

    private string $collectionName;

    private array $options;

    /**
     * Constructs a findAndModify command.
     *
     * Supported options:
     *
     *  * arrayFilters (document array): A set of filters specifying to which
     *    array elements an update should apply.
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
     *  * bypassDocumentValidation (boolean): If true, allows the write to
     *    circumvent document level validation.
     *
     *  * fields (document): Limits the fields to return for the matching
     *    document.
     *
     *  * hint (string|document): The index to use. Specify either the index
     *    name as a string or the index key pattern as a document. If specified,
     *    then the query system will only consider plans using the hinted index.
     *
     *    This is only supported on server versions >= 4.4. Using this option in
     *    other contexts will result in an exception at execution time.
     *
     *  * maxTimeMS (integer): The maximum amount of time to allow the query to
     *    run.
     *
     *  * new (boolean): When true, returns the modified document rather than
     *    the original. This option is ignored for remove operations. The
     *    The default is false.
     *
     *  * query (document): Query by which to filter documents.
     *
     *  * remove (boolean): When true, removes the matched document. This option
     *    cannot be true if the update option is set. The default is false.
     *
     *  * session (MongoDB\Driver\Session): Client session.
     *
     *  * sort (document): Determines which document the operation modifies if
     *    the query selects multiple documents.
     *
     *  * typeMap (array): Type map for BSON deserialization.
     *
     *  * update (document): Update or replacement to apply to the matched
     *    document. This option cannot be set if the remove option is true.
     *
     *  * upsert (boolean): When true, a new document is created if no document
     *    matches the query. This option is ignored for remove operations. The
     *    default is false.
     *
     *  * let (document): Map of parameter names and values. Values must be
     *    constant or closed expressions that do not reference document fields.
     *    Parameters can then be accessed as variables in an aggregate
     *    expression context (e.g. "$$var").
     *
     *  * writeConcern (MongoDB\Driver\WriteConcern): Write concern.
     *
     * @param string $databaseName   Database name
     * @param string $collectionName Collection name
     * @param array  $options        Command options
     * @throws InvalidArgumentException for parameter/option parsing errors
     */
    public function __construct(string $databaseName, string $collectionName, array $options)
    {
        $options += ['remove' => false];

        if (isset($options['arrayFilters']) && ! is_array($options['arrayFilters'])) {
            throw InvalidArgumentException::invalidType('"arrayFilters" option', $options['arrayFilters'], 'array');
        }

        if (isset($options['bypassDocumentValidation']) && ! is_bool($options['bypassDocumentValidation'])) {
            throw InvalidArgumentException::invalidType('"bypassDocumentValidation" option', $options['bypassDocumentValidation'], 'boolean');
        }

        if (isset($options['codec']) && ! $options['codec'] instanceof DocumentCodec) {
            throw InvalidArgumentException::invalidType('"codec" option', $options['codec'], DocumentCodec::class);
        }

        if (isset($options['collation']) && ! is_document($options['collation'])) {
            throw InvalidArgumentException::expectedDocumentType('"collation" option', $options['collation']);
        }

        if (isset($options['fields']) && ! is_document($options['fields'])) {
            throw InvalidArgumentException::expectedDocumentType('"fields" option', $options['fields']);
        }

        if (isset($options['hint']) && ! is_string($options['hint']) && ! is_array($options['hint']) && ! is_object($options['hint'])) {
            throw InvalidArgumentException::invalidType('"hint" option', $options['hint'], ['string', 'array', 'object']);
        }

        if (isset($options['maxTimeMS']) && ! is_integer($options['maxTimeMS'])) {
            throw InvalidArgumentException::invalidType('"maxTimeMS" option', $options['maxTimeMS'], 'integer');
        }

        if (array_key_exists('new', $options) && ! is_bool($options['new'])) {
            throw InvalidArgumentException::invalidType('"new" option', $options['new'], 'boolean');
        }

        if (isset($options['query']) && ! is_document($options['query'])) {
            throw InvalidArgumentException::expectedDocumentType('"query" option', $options['query']);
        }

        if (! is_bool($options['remove'])) {
            throw InvalidArgumentException::invalidType('"remove" option', $options['remove'], 'boolean');
        }

        if (isset($options['session']) && ! $options['session'] instanceof Session) {
            throw InvalidArgumentException::invalidType('"session" option', $options['session'], Session::class);
        }

        if (isset($options['sort']) && ! is_document($options['sort'])) {
            throw InvalidArgumentException::expectedDocumentType('"sort" option', $options['sort']);
        }

        if (isset($options['typeMap']) && ! is_array($options['typeMap'])) {
            throw InvalidArgumentException::invalidType('"typeMap" option', $options['typeMap'], 'array');
        }

        if (isset($options['update']) && ! is_array($options['update']) && ! is_object($options['update'])) {
            throw InvalidArgumentException::invalidType('"update" option', $options['update'], 'array or object');
        }

        if (isset($options['writeConcern']) && ! $options['writeConcern'] instanceof WriteConcern) {
            throw InvalidArgumentException::invalidType('"writeConcern" option', $options['writeConcern'], WriteConcern::class);
        }

        if (array_key_exists('upsert', $options) && ! is_bool($options['upsert'])) {
            throw InvalidArgumentException::invalidType('"upsert" option', $options['upsert'], 'boolean');
        }

        if (isset($options['let']) && ! is_document($options['let'])) {
            throw InvalidArgumentException::expectedDocumentType('"let" option', $options['let']);
        }

        if (isset($options['bypassDocumentValidation']) && ! $options['bypassDocumentValidation']) {
            unset($options['bypassDocumentValidation']);
        }

        if (! (isset($options['update']) xor $options['remove'])) {
            throw new InvalidArgumentException('The "remove" option must be true or an "update" document must be specified, but not both');
        }

        if (isset($options['writeConcern']) && $options['writeConcern']->isDefault()) {
            unset($options['writeConcern']);
        }

        if (isset($options['codec']) && isset($options['typeMap'])) {
            throw InvalidArgumentException::cannotCombineCodecAndTypeMap();
        }

        $this->databaseName = $databaseName;
        $this->collectionName = $collectionName;
        $this->options = $options;
    }

    /**
     * Execute the operation.
     *
     * @see Executable::execute()
     * @return array|object|null
     * @throws UnexpectedValueException if the command response was malformed
     * @throws UnsupportedException if hint or write concern is used and unsupported
     * @throws DriverRuntimeException for other driver errors (e.g. connection errors)
     */
    public function execute(Server $server)
    {
        /* Server versions >= 4.2.0 raise errors for unsupported update options.
         * For previous versions, the CRUD spec requires a client-side error. */
        if (isset($this->options['hint']) && ! server_supports_feature($server, self::WIRE_VERSION_FOR_UNSUPPORTED_OPTION_SERVER_SIDE_ERROR)) {
            throw UnsupportedException::hintNotSupported();
        }

        /* CRUD spec requires a client-side error when using "hint" with an
         * unacknowledged write concern on an unsupported server. */
        if (
            isset($this->options['writeConcern']) && ! is_write_concern_acknowledged($this->options['writeConcern']) &&
            isset($this->options['hint']) && ! server_supports_feature($server, self::WIRE_VERSION_FOR_HINT)
        ) {
            throw UnsupportedException::hintNotSupported();
        }

        $inTransaction = isset($this->options['session']) && $this->options['session']->isInTransaction();
        if ($inTransaction && isset($this->options['writeConcern'])) {
            throw UnsupportedException::writeConcernNotSupportedInTransaction();
        }

        $cursor = $server->executeWriteCommand($this->databaseName, new Command($this->createCommandDocument()), $this->createOptions());

        if (isset($this->options['codec'])) {
            $cursor->setTypeMap(['root' => 'bson']);
            $result = current($cursor->toArray());
            assert($result instanceof Document);

            $value = $result->get('value');

            return $value === null ? $value : $this->options['codec']->decode($value);
        }

        if (isset($this->options['typeMap'])) {
            $cursor->setTypeMap(create_field_path_type_map($this->options['typeMap'], 'value'));
        }

        $result = current($cursor->toArray());

        return is_object($result) ? ($result->value ?? null) : null;
    }

    /**
     * Returns the command document for this operation.
     *
     * @see Explainable::getCommandDocument()
     * @return array
     */
    public function getCommandDocument()
    {
        return $this->createCommandDocument();
    }

    /**
     * Create the findAndModify command document.
     */
    private function createCommandDocument(): array
    {
        $cmd = ['findAndModify' => $this->collectionName];

        if ($this->options['remove']) {
            $cmd['remove'] = true;
        } else {
            if (isset($this->options['new'])) {
                $cmd['new'] = $this->options['new'];
            }

            if (isset($this->options['upsert'])) {
                $cmd['upsert'] = $this->options['upsert'];
            }
        }

        foreach (['collation', 'fields', 'let', 'query', 'sort'] as $option) {
            if (isset($this->options[$option])) {
                $cmd[$option] = (object) $this->options[$option];
            }
        }

        if (isset($this->options['update'])) {
            /** @psalm-var array|object */
            $update = $this->options['update'];
            /* A non-empty pipeline will encode as a BSON array, so leave it
             * as-is. Cast anything else to an object since a BSON document is
             * likely expected. This includes empty arrays, which historically
             * can be used to represent empty replacement documents.
             *
             * This also allows an empty pipeline expressed as a PackedArray or
             * Serializable to still encode as a BSON array, since the object
             * cast will have no effect. */
            $cmd['update'] = is_pipeline($update) ? $update : (object) $update;
        }

        foreach (['arrayFilters', 'bypassDocumentValidation', 'comment', 'hint', 'maxTimeMS'] as $option) {
            if (isset($this->options[$option])) {
                $cmd[$option] = $this->options[$option];
            }
        }

        return $cmd;
    }

    /**
     * Create options for executing the command.
     *
     * @see https://php.net/manual/en/mongodb-driver-server.executewritecommand.php
     */
    private function createOptions(): array
    {
        $options = [];

        if (isset($this->options['session'])) {
            $options['session'] = $this->options['session'];
        }

        if (isset($this->options['writeConcern'])) {
            $options['writeConcern'] = $this->options['writeConcern'];
        }

        return $options;
    }
}
