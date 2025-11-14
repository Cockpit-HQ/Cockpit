import "./app/app.js";
import "./components.js";

App.utils.$interpolate = function (str, data) {

    data = Object.assign({}, App.utils.$interpolate.fns, data);

    return App.utils.interpolate(str, data);
};

App.utils.$interpolate.fns = {};

window.App = App;
