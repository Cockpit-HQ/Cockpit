<!doctype html>
<html>
<head>

  <script type="module">
    import "<?=($this->pathToUrl('settings:assets/vendor/rapidoc.js')) ?>";
  </script>

</head>
<body>
    <rapi-doc
      spec-url="<?=$openApiUrl?>"
      show-header="false"
      show-info="false"
      render-style="read"
      load-fonts="false"

      bg-color="#10131a"
      text-color="#fafafa"
      primary-color="#0e8fff"
    ></rapi-doc>
</body>
</html>