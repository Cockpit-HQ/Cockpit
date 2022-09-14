<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>GraphiQL</title>
  <meta name="robots" content="noindex" />
  <style>
    html, body {
      height: 100%;
      margin: 0;
      overflow: hidden;
      width: 100%;
    }
  </style>

  <style>
    <?php include($this->path('system:assets/vendor/graphiql/graphiql.min.css')) ?>
  </style>
  <script>
    <?php
      include($this->path('system:assets/vendor/graphiql/es6-promise.auto.min.js'));
      include($this->path('system:assets/vendor/graphiql/react.production.min.js'));
      include($this->path('system:assets/vendor/graphiql/react-dom.production.min.js'));
      include($this->path('system:assets/vendor/graphiql/graphiql.min.js'));
    ?>
  </script>

</head>
<body>
  <script>
      // Parse the search string to get url parameters.
      let search = window.location.search;
      let parameters = {};
      search.substr(1).split('&').forEach(function (entry) {
        let eq = entry.indexOf('=');
        if (eq >= 0) {
          parameters[decodeURIComponent(entry.slice(0, eq))] =
            decodeURIComponent(entry.slice(eq + 1));
        }
      });

      // if variables was provided, try to format it.
      if (parameters.variables) {
        try {
          parameters.variables =
            JSON.stringify(JSON.parse(parameters.variables), null, 2);
        } catch (e) {
          // Do nothing, we want to display the invalid JSON as a string, rather
          // than present an error.
        }
      }

      // When the query and variables string is edited, update the URL bar so
      // that it can be easily shared
      function onEditQuery(newQuery) {
        parameters.query = newQuery;
        updateURL();
      }
      function onEditVariables(newVariables) {
        parameters.variables = newVariables;
        updateURL();
      }
      function onEditOperationName(newOperationName) {
        parameters.operationName = newOperationName;
        updateURL();
      }
      function updateURL() {
        let newSearch = '?' + Object.keys(parameters).filter(function (key) {
          return Boolean(parameters[key]);
        }).map(function (key) {
          return encodeURIComponent(key) + '=' +
            encodeURIComponent(parameters[key]);
        }).join('&');
        history.replaceState(null, null, newSearch);
      }

       function graphQLFetcher(graphQLParams) {
          // This example expects a GraphQL server at the path /graphql.
          // Change this to point wherever you host your GraphQL server.
          return fetch(window.location.origin + '<?=$this->route('/api/gql')?>', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'API-KEY': (window.apiKey && apiKey.value) || ''
            },
            body: JSON.stringify(graphQLParams),
          }).then(function (response) {
            return response.text();
          }).then(function (responseBody) {
            try {
              return JSON.parse(responseBody);
            } catch (error) {
              return responseBody;
            }
          });
        }

      // Render <GraphiQL /> into the body.
      ReactDOM.render(
        React.createElement(GraphiQL, {
          fetcher: graphQLFetcher,
          query: parameters.query,
          variables: parameters.variables,
          operationName: parameters.operationName,
          onEditQuery: onEditQuery,
          onEditVariables: onEditVariables,
          onEditOperationName: onEditOperationName
        }),
        document.body,
      );

  </script>

  <input id="apiKey" type="text" placeholder="API Key" value="<?=($apiKey ? $apiKey : '')?>">

<style>

/* GraphiQL One Dark Alt (Dark Mode) theme by Ben Keating[1]
 * Colors taken from Atom's One Dark theme[2]. Add this file to the end of
 * your <head> block to override built-in default styling.
 *
 * [1]. https://twitter.com/flowpoke
 * [2]. https://github.com/atom/atom/tree/master/packages/one-dark-ui
 */

.CodeMirror {
    background: #131720 !important;
}
.graphiql-container .doc-explorer-contents, .graphiql-container .history-contents {
  background-color: #10131a;
  border-top: 1px solid #181A1F;
}

.graphiql-container .toolbar-button {
  background: #1c2125 !important;
  box-shadow: none !important;
  color: #5c626d !important;
  border: 1px solid #181a1f !important;
  margin: 0 !important;
}

.graphiql-container .result-window .CodeMirror-gutters {
  background: #131720;
  border: none !important;
}

.graphiql-container .resultWrap {
  border-left: solid 1px #181a1f;
}

.graphiql-container .variable-editor-title {
  background: #10131a;
  border-bottom: 1px solid #181a1f;
  border-top: 1px solid #181a1f;
  color: #cacdd3;
}

.graphiql-container .topBar {
  background: #10131a;
  border-color: #181A1F;
}

.graphiql-container .docExplorerHide {
  color: #606671;
}

.graphiql-container .doc-explorer-title, .graphiql-container .history-title, .doc-explorer-back {
  color: #CACDD3 !important;

}

.graphiql-container .doc-explorer {
  background: #10131a;
}

.graphiql-container .docExplorerWrap, .graphiql-container .historyPaneWrap {
  box-shadow: none;
}

.graphiql-container .docExplorerShow {
  border-left: none;
}
.graphiql-container .docExplorerShow, .graphiql-container .historyShow {
background: #10131a;
border-bottom: 1px solid #181A1E;
color: #CACDD3;
}

.graphiql-container .docExplorerShow:before, .graphiql-container .doc-explorer-back:before  {
  border-color: #CACDD3;
}

.graphiql-container .search-box {
  margin: auto auto 10px auto;
  border: none;
}
.graphiql-container .search-box input {
  background: #1E2127;
  padding-left: 28px;
}

.graphiql-container .search-box:before {
  color: #c1c4ca;
  font-size: 21px;
  left: 8px;
}

.graphiql-container, .graphiql-container button, .graphiql-container input {
  color: #9299A7;
}

.CodeMirror-gutters {
  border: none !important;
  background-color: #282d33;
}

.CodeMirror .CodeMirror-cursor {
    border-left: 1px solid #999;
}

.graphiql-container .execute-button {
  background: #10131a;
  border: 1px solid <?=($primaryColor ? $primaryColor : '#0e8fff')?>;
  box-shadow: none !important;
  fill: <?=($primaryColor ? $primaryColor : '#0e8fff')?>;
}

.graphiql-container .history-contents p {
  border: none;
}

.graphiql-container .historyPaneWrap {
  background: #10131a;
}

.graphiql-container .execute-options > li.selected, .graphiql-container .toolbar-menu-items > li.hover, .graphiql-container .toolbar-menu-items > li:active, .graphiql-container .toolbar-menu-items > li:hover, .graphiql-container .toolbar-select-options > li.hover, .graphiql-container .toolbar-select-options > li:active, .graphiql-container .toolbar-select-options > li:hover, .graphiql-container .history-contents > p:hover, .graphiql-container .history-contents > p:active {
  background: #383C41;
}

.graphiql-container .doc-category-title {
  border-bottom: 1px solid #181a1f;
  color: #cacdd3;
}

.graphiql-container .field-name {
  color: #9CA3AC;
}

.graphiql-container .type-name {
    color: #95be76;
}


.cm-property {
  color: #A5ACB8;
}

.cm-string {
  color: #97BE7B;
}

.cm-variable {
    color: #a87f5b;
}

.cm-attribute {
  color: #B58860;
}

.cm-def {
  color: #CC3932;
}

.cm-keyword {
  color: #7cf3ff;
}

.graphiql-container .keyword {
    color: #9ea5b0;
}

.graphiql-container .arg-name {
    color: #b5875d;
}

.graphiql-container .doc-category-item {
    color: #BC6069;
}

a {
  color: #7b9ad4;
}

#apiKey {
  position: absolute;
  z-index: 2;
  top: 12px;
  left: 440px;
  border: none;
  padding: 5px;
  border-radius: 2px;
  background: #2c313e;
  color: #ccc;
}
</style>
</body>
</html>
