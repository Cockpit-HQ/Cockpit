<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File not found</title>

    <link rel="icon" href="<?=$this->helper('theme')->favicon()?>">

    <?=$this->assets([
        'app:assets/css/app.css',
        'app:assets/vendor/noty/noty.min.js',
        'app:assets/components/bg-fluxanimation/bg-fluxanimation.js',
        ['src' => 'app:assets/js/app.js', 'type' => 'module']
    ], $this->retrieve('app.version'))?>

    <?php if ($this->helper('theme')->theme() == 'auto') : ?>
    <script>
        // set client preferred color scheme
        document.documentElement.setAttribute('data-theme', getComputedStyle(document.documentElement).getPropertyValue('--app-auto-theme').trim());
    </script>
    <?php endif ?>

</head>
<body class="kiss-flex kiss-flex-middle">

    <bg-fluxanimation class="kiss-cover" colors="--kiss-color-danger"></bg-fluxanimation>

    <kiss-container class="kiss-align-center">

        <div class="kiss-margin-bottom">
            <img class="app-logo kiss-margin-auto" src="<?=$this->base('app:assets/img/logo.svg')?>" width="40" alt="Logo">
        </div>

        <h1 class="kiss-text-bold">404</h1>

        <p class="kiss-margin kiss-color-muted"><?=t('Requested resource is not available')?></p>

    </kiss-container>

</body>
</html>
