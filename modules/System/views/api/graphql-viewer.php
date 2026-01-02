<?php

    if (!class_exists('Cockpit')) {
        return;
    }

    $theme = $this->param('theme');
    $primaryColor = $this->param('primaryColor');
    $bgColor = $this->param('bgColor');
    $textColor = $this->param('textColor');

?><!doctype html>
<html lang="en">
    <head>
        <title>GraphiQL</title>
        <style>
            body {
                height: 100%;
                margin: 0;
                width: 100%;
                overflow: hidden;
            }

            #graphiql {
                height: 100vh;
            }
        </style>
        <style>
            <?php include($this->path('system:assets/vendor/graphiql/graphiql.min.css')) ?>

            :root {
                --color-primary: <?=$this->escape($primaryColor ? $primaryColor : '#0000ff')?>;
                <?php if($bgColor): ?>
                --editor-background: <?=$this->escape($bgColor)?>;
                <?php endif ?>
                <?php if($textColor): ?>
                --color-base: <?=$this->escape($textColor)?>;
                <?php endif ?>
            }

            #graphiql {

                .graphiql-logo {
                    display: none;
                }

                .graphiql-session-header-right {
                    padding-right: 20px;
                }

                .graphiql-sessions,
                .graphiql-container {
                    <?php if($bgColor): ?>
                    background-color: <?=$this->escape($bgColor)?>;
                    <?php endif ?>
                }

                .graphiql-container .graphiql-sidebar button,
                .graphiql-toolbar-button svg {
                    <?php if($textColor): ?>
                    color: <?=$this->escape($textColor)?>;
                    <?php endif ?>
                }

                .graphiql-editors {
                    background: none;
                }

                .graphiql-execute-button {
                    <?php if($primaryColor): ?>
                    background-color: <?=$this->escape($primaryColor)?>;
                    <?php endif ?>
                }
            }
        </style>
        <script>
        <?php
            include($this->path('system:assets/vendor/graphiql/react.production.min.js'));
            include($this->path('system:assets/vendor/graphiql/react-dom.production.min.js'));
            include($this->path('system:assets/vendor/graphiql/graphiql.min.js'));
        ?>
        </script>
    </head>

<body class="<?=$theme == 'dark' ? 'graphiql-dark' : ''?>">
    <div id="graphiql"></div>
    <script>

        const root = ReactDOM.createRoot(document.getElementById('graphiql'));

        const fetcher = GraphiQL.createFetcher({
            url: `${window.location.origin}<?=$this->route('/api/gql')?>`,
            headers: { 'API-KEY': '<?=$this->escape($this->param('apiKey', ''))?>' },
        });

        root.render(
            React.createElement(GraphiQL, {
                fetcher,
                defaultEditorToolsVisibility: true,
            }),
        );
    </script>
</body>
</html>

