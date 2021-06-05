<!DOCTYPE html>
<html lang="en" data-base="<?=$this->base('/')?>" data-version="<?=APP_VERSION?>" data-theme="<?=$this->helper('theme')->theme()?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$this->helper('theme')->title()?></title>

    <link rel="icon" href="<?=$this->helper('theme')->favicon()?>">

    <?=$this->assets([
        $this['debug'] ? 'app:assets/css/app.css' : 'app:assets/app.bundle.css',
        'app:assets/vendor/JSON5.js',
        'app:assets/vendor/noty/noty.min.js',
        'app:assets/vendor/lodash.js',
        $this['debug'] ? ['src' => 'app:assets/js/app.js', 'type' => 'module'] : 'app:assets/app.bundle.js',
    ], APP_VERSION)?>

    <?php $this->block('app.layout.header') ?>

    <?php if ($this->helper('theme')->theme() == 'auto'): ?>
    <script>
        // set client preferred color scheme
        document.documentElement.setAttribute('data-theme', getComputedStyle(document.documentElement).getPropertyValue("--app-auto-theme").trim());
    </script>
    <?php endif ?>

</head>
<body>

    <?=$content_for_layout?>

    <?php $this->block('app.layout.footer') ?>

    <script type="module">

        let paths = {};

        <?php foreach($this['modules'] as $name => $module): ?>
            paths['<?=$name?>'] = '<?=$this->base("{$name}:")?>';
        <?php endforeach ?>

        App._paths = paths;
    </script>

</body>
</html>