# SwaggerPhp Legacy Analysers

This directory contains legacy analyser classes adapted from `zircote/swagger-php` v4.

## Purpose

`zircote/swagger-php` v5.0 removed the `TokenAnalyser` class, which Cockpit CMS relies on for extracting annotations.
To maintain compatibility and functionality with `swagger-php` v5+, these classes were copied and adapted to work with the new version.

## Classes

- **LegacyTokenAnalyser**: Replaces the removed `OpenApi\Analysers\TokenAnalyser`. It performs static analysis on PHP tokens to extract annotations.
- **LegacyDocBlockParser**: A helper class used by `LegacyTokenAnalyser` to parse docblocks using `Doctrine\Common\Annotations\DocParser`.

## Usage

These classes are used in `modules/System/Controller/Api.php` to configure the `OpenApi\Generator`:

```php
use SwaggerPhp\LegacyTokenAnalyser;

$yaml = \OpenApi\Generator::scan($paths, ['analyser' => new LegacyTokenAnalyser()])->toYaml();
```
