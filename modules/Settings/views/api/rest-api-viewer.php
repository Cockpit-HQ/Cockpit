<!doctype html>
<html>
<head>
  <?php
        // echo $this->assets([
        //   $this['debug'] ? 'app:assets/css/app.css' : 'app:assets/app.bundle.css',
        // ], APP_VERSION);
  ?>

  <script type="module">
    <?php include($this->path('settings:assets/vendor/rapidoc.js')) ?>
  </script>
</head>
  <body>
    <rapi-doc
    spec-url="<?=$openApiUrl?>"
    show-header="false"
    show-info="false"
    allow-server-selection="false"
    render-style="read"

    bg-color="#10131a"
    text-color="#fafafa"
    primary-color="#0e8fff"
    ></rapi-doc>
  </body>
</html>