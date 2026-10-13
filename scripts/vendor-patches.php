<?php

/**
 * Re-applies small PHP 8.5 compatibility fixes to vendor packages without an upstream release.
 *
 * Runs automatically after `composer install` / `composer update` (see composer.json scripts).
 * Every patch is idempotent: once a package ships the fix upstream, its search string no longer
 * matches and the patch is skipped, so the entry can be removed.
 */

$vendorDir = dirname(__DIR__).'/lib/vendor';

$patches = [

    // imagedestroy() is a no-op since PHP 8.0 and deprecated since PHP 8.5
    'claviska/simpleimage/src/claviska/SimpleImage.php' => [
        ["\n                imagedestroy(\$gif);", ''],
    ],

    // curl_close() / imagedestroy() are no-ops since PHP 8.0 and deprecated since PHP 8.5
    // (claviska/simpleimage pins league/color-extractor 0.4.*)
    'league/color-extractor/src/Palette.php' => [
        ["        } finally {\n            curl_close(\$ch);\n        }", "        } finally {\n            unset(\$ch);\n        }"],
        ["\n        imagedestroy(\$image);", ''],
    ],

    // SplObjectStorage::attach() / detach() / contains() are deprecated since PHP 8.5
    'ksubileau/color-thief-php/src/ColorThief/ColorSwatches.php' => [
        ['$usedColors->contains($color)', '$usedColors->offsetExists($color)'],
        ['$usedColors->attach($color);', '$usedColors->offsetSet($color);'],
    ],

    'mongodb/mongodb/src/PsrLogAdapter.php' => [
        ['$instance->loggers->attach($logger);', '$instance->loggers->offsetSet($logger);'],
        ['$instance->loggers->detach($logger);', '$instance->loggers->offsetUnset($logger);'],
    ],
];

foreach ($patches as $file => $replacements) {

    $path = "{$vendorDir}/{$file}";

    if (!is_file($path)) {
        continue;
    }

    $contents = file_get_contents($path);
    $patched = $contents;

    foreach ($replacements as [$search, $replace]) {
        $patched = str_replace($search, $replace, $patched);
    }

    if ($patched !== $contents) {
        file_put_contents($path, $patched);
        echo "vendor-patches: patched {$file}\n";
    }
}
