<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File not found</title>

    <link rel="icon" type="image/png"  href="<?=$this->base('/favicon.png')?>">

    <?=$this->assets([
        'app:assets/css/app.css',
        'app:assets/vendor/noty/noty.min.js',
        ['src' => 'app:assets/js/app.js', 'type' => 'module']
    ], APP_VERSION)?>

</head>
<body class="kiss-flex kiss-flex-middle">

    <kiss-container class="kiss-align-center">

        <div class="kiss-margin-bottom">
            <img class="app-logo kiss-margin-auto" src="<?=$this->base('/logo.svg')?>" width="40" alt="Logo">
        </div>

        <h1>404</h1>

        <p class="kiss-margin kiss-color-muted"><?=_t('Requested resource is not available')?></p>

    </kiss-container>
    
</body>
</html>