<?php

    if (!class_exists('Cockpit')) {
        return;
    }

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

            .graphiql-logo {
                display: none;
            }

            .graphiql-session-header-right {
                padding-right: 20px;
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

<body>
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
