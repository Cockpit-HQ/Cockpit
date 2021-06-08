<!doctype html>
<html>
<head>
    <title>REST - Api</title>
</head>
<body>
    <rapi-doc
        spec-url="<?=$openApiUrl?>"
        show-header="false"
        show-info="false"
        render-style="read"
        load-fonts="false"

        bg-color="<?=($bgColor ? $bgColor : '#10131a')?>"
        text-color="<?=($textColor ? $textColor : '#fafafa')?>"
        primary-color="<?=($primaryColor ? $primaryColor : '#0e8fff')?>"
    ></rapi-doc>

    <script type="module" src="<?=$this->base('settings:assets/vendor/rapidoc.js')?>"></script>
</body>
</html>