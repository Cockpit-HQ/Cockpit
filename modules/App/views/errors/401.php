<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access denied!</title>

    <link rel="icon" href="<?=$this->helper('theme')->favicon()?>">

    <?=$this->assets([
        'app:assets/css/app.css',
        'app:assets/vendor/noty/noty.min.js',
        ['src' => 'app:assets/js/app.js', 'type' => 'module']
    ], $this->retrieve('app.version'))?>

</head>
<body class="kiss-flex kiss-flex-middle">

    <kiss-container class="kiss-align-center">

        <div class="kiss-margin-bottom">
                <img class="app-logo kiss-margin-auto" src="<?=$this->base('app:assets/img/logo.svg')?>" width="40" alt="Logo">
        </div>

        <h1>401</h1>

        <p class="kiss-margin kiss-color-muted"><?=t('Unauthorized request')?></p>

    </kiss-container>

</body>
</html>
