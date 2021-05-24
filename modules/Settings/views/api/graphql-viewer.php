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
  <link href="//unpkg.com/graphiql@0.11.11/graphiql.css" rel="stylesheet" />
  <script src="//unpkg.com/react@15.6.1/dist/react.min.js"></script>
  <script src="//unpkg.com/react-dom@15.6.1/dist/react-dom.min.js"></script>
  <script src="//unpkg.com/graphiql@0.11.11/graphiql.min.js"></script>

  <script src="//cdn.jsdelivr.net/fetch/2.0.1/fetch.min.js"></script>

</head>
<body>
  <script>
    // Collect the URL parameters
    var parameters = {};
    window.location.search.substr(1).split('&').forEach(function (entry) {
      var eq = entry.indexOf('=');
      if (eq >= 0) {
        parameters[decodeURIComponent(entry.slice(0, eq))] =
          decodeURIComponent(entry.slice(eq + 1));
      }
    });
    // Produce a Location query string from a parameter object.
    function locationQuery(params, location) {
      return (location ? location: '') + '?' + Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(params[key]);
      }).join('&');
    }
    // Derive a fetch URL from the current URL, sans the GraphQL parameters.
    var graphqlParamNames = {
      query: true,
      variables: true,
      operationName: true
    };

      // Defines a GraphQL fetcher using the fetch API.
      function graphQLHttpFetcher(graphQLParams) {
          return fetch(window.location.origin + '<?=$this->route('/api/graphql')?>', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphQLParams)
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

      var fetcher = graphQLHttpFetcher;

    // When the query and variables string is edited, update the URL bar so
    // that it can be easily shared.
    function onEditQuery(newQuery) {
      parameters.query = newQuery;

    }
    function onEditVariables(newVariables) {
      parameters.variables = newVariables;

    }
    function onEditOperationName(newOperationName) {
      parameters.operationName = newOperationName;

    }
    function updateURL() {
      var cleanParams = Object.keys(parameters).filter(function(v) {
        return parameters[v];
      }).reduce(function(old, v) {
        old[v] = parameters[v];
        return old;
      }, {});

      history.replaceState(null, null, locationQuery(cleanParams) + window.location.hash);
    }
    // Render <GraphiQL /> into the body.
    ReactDOM.render(
      React.createElement(GraphiQL, {
        fetcher: fetcher,
        onEditQuery: onEditQuery,
        onEditVariables: onEditVariables,
        onEditOperationName: onEditOperationName,
        query: "{}",
        response: null,
        variables: null,
        operationName: null,
        editorTheme: null,
        websocketConnectionParams: null,
      }),
      document.body
    );
  </script>

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
  border: 1px solid rgb(91, 98, 107);
  box-shadow: none !important;
  fill: #c9ccd2;
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

</style>
</body>
</html>