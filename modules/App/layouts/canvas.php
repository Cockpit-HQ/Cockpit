<!DOCTYPE html>
<html lang="en" data-base="<?=$this->base('/')?>" data-route="<?=$this->route('/')?>" data-version="<?=APP_VERSION?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$this['app.name']?></title>

    <link rel="icon" type="image/png"  href="<?=$this->base('/favicon.png')?>">

    <?=$this->assets([
        'app:assets/css/app.css',
        'app:assets/vendor/JSON5.min.js',
        'app:assets/vendor/noty/noty.min.js',
        ['src' => 'app:assets/js/app.js', 'type' => 'module']
    ], APP_VERSION)?>

    <?php $this->block('app.layout.header') ?>

</head>
<body>
    
    <?=$content_for_layout?>

    <?php $this->block('app.layout.footer') ?>

</body>
</html>