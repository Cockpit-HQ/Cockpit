<?php

    if (!class_exists('Cockpit')) {
        return;
    }

?><!doctype html>
<html>
<head>
    <title>REST - API</title>
</head>
<body>
    <rapi-doc
        spec-url="<?=$this->escape($openApiUrl)?>"
        show-header="false"
        show-info="false"
        render-style="read"
        load-fonts="false"

        <?php if($apiKey): ?>
        api-key-name = "api-key"
        api-key-location = "header"
        api-key-value = "<?=$this->escape($apiKey)?>"
        <?php endif ?>

        bg-color="<?=$this->escape($bgColor ? $bgColor : '#10131a')?>"
        text-color="<?= $this->escape($textColor ? $textColor : '#fafafa')?>"
        primary-color="<?= $this->escape($primaryColor ? $primaryColor : '#0e8fff')?>"
    ></rapi-doc>

    <script type="module" src="<?=$this->base('system:assets/vendor/rapidoc.js')?>"></script>
</body>
</html>
