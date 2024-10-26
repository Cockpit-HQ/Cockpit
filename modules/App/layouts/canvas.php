<?php

    $paths = [
        '#config' => $this->baseUrl("#config:"),
        '#uploads' => $this->fileStorage->getURL('uploads://'),
    ];

    $importmap = [];

    foreach ($this['modules'] as $name => $module) {
        $paths[$name] = $this->baseUrl("{$name}:");
        $importmap["module-{$name}/"] = rtrim($paths[$name], '/').'/';
    }

    $locales = [];

    foreach ($this->helper('locales')->locales(true) as $i18n => $loc) {
        $locales[$i18n] = $loc['name'] ? $loc['name'] : $i18n;
    }

?><!DOCTYPE html>
<html
    lang="en"
    class="<?=$this->helper('theme')->pageClass()?>"
    data-base="<?=$this->base('/')?>"
    data-route="<?=$this->route('/')?>"
    data-csrf="<?= $this->helper('csrf')->token("app.csrf.{$this['user/_id']}") ?>"
    data-version="<?=$this->retrieve('app.version')?>"
    data-theme="<?=$this->helper('theme')->theme()?>"
>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,nofollow">
    <title><?=$this->helper('theme')->title()?></title>
    <link rel="icon" href="<?=$this->helper('theme')->favicon()?>">

    <script type="importmap"><?=json_encode(['imports' => $importmap], JSON_PRETTY_PRINT);?></script>

    <?=$this->helper('theme')->assets(context: 'app:header')?>

    <script src="<?=$this->route('/app.i18n.data.js')?>" type="module"></script>

    <?php $this->block('app.layout.head') ?>

    <?php if ($this->helper('theme')->theme() == 'auto'): ?>
    <script>
        // set client preferred color scheme
        document.documentElement.setAttribute('data-theme', getComputedStyle(document.documentElement).getPropertyValue('--app-auto-theme').trim());
    </script>
    <?php endif ?>

</head>
<body>

    <?=$content_for_layout?>

    <?php $this->block('app.layout.footer') ?>

    <script type="module">

        Object.assign(App, {
            _paths   : Object.freeze(<?=json_encode($paths)?>),
            _locales : <?=json_encode($locales)?>,
            _vars    : Object.freeze(<?=json_encode($this->helper('theme')->vars())?>),
            user     : Object.freeze(<?=json_encode($this->retrieve('user', null))?>),
        });

    </script>

    <?=$this->helper('theme')->assets(context: 'app:footer')?>

</body>
</html>
