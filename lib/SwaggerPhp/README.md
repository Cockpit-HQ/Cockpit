# SwaggerPhp Alternative Analysers

This folder contains a custom `AlternativeTokenAnalyser` and `AlternativeDocBlockParser` to support parsing Swagger annotations using `phpstan/phpdoc-parser` instead of `doctrine/annotations`.

This allows us to continue using DocBlock annotations with `swagger-php` v5 without relying on the deprecated `doctrine/annotations` library.

The `AlternativeTokenAnalyser` is used in `modules/System/Controller/Api.php` to generate the OpenAPI specification.

## Classes

- **AlternativeTokenAnalyser**: Replaces the removed `OpenApi\Analysers\TokenAnalyser`. It performs static analysis on PHP tokens to extract annotations.
- **AlternativeDocBlockParser**: A helper class used by `AlternativeTokenAnalyser` to parse docblocks using `phpstan/phpdoc-parser`.

## Usage

These classes are used in `modules/System/Controller/Api.php` to configure the `OpenApi\Generator`:

```php
use SwaggerPhp\AlternativeTokenAnalyser;
 
 $yaml = \OpenApi\Generator::scan($paths, ['analyser' => new AlternativeTokenAnalyser()])->toYaml();
```
