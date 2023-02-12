import "../vendor/vue/vue.js";
import "../vendor/vue/vue-router.js";
import "../vendor/kiss/lib.js"
import "../vendor/storage.js";
import "../vendor/i18n.js";
import "../vendor/dompurify.js";
import "../vendor/mousetrap.js";
import utils from "./app/utils.js";
import ui from "./app/ui.js";
import assets from "./app/assets.js";
import "./components.js";

let html = document.documentElement;
let baseUrl = (html.getAttribute('data-base') || '').replace(/\/$/, '');
let routeUrl = (html.getAttribute('data-route') || '').replace(/\/$/, '');

let App = {

    base_url: baseUrl,
    route_url: routeUrl,
    version: (html.getAttribute("data-version") || '0.0.1'),

    _events: {},
    _paths: {},

    base: function (url) {

        let path = url.match(/^(.*?)\:/);

        if (path && this._paths[path[1]]) {
            return url.replace(path[0], this._paths[path[1]]);
        }

        return this.base_url + url;
    },

    route: function (url) {
        return this.route_url + url;
    },

    reroute: function (url) {
        location.href = /^http/.test(url) ? url : this.route(url);
    },

    request: function (url, data, type) {

        url = this.route(url);
        type = type || 'json';

        return new Promise(function (fulfill, reject) {

            let xhr = new XMLHttpRequest();

            xhr.open('post', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            url += (url.indexOf('?') !== -1 ? '&' : '?') + 'nc=' + Math.random().toString(36).substr(2);

            if (data) {

                if (typeof (data) === 'object' && data instanceof HTMLFormElement) {
                    data = new FormData(data);
                } else if (typeof (data) === 'object' && data instanceof FormData) {
                    // do nothing
                } else if (typeof (data) === 'object') {

                    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                    data = JSON.stringify(data || {});
                }
            }

            xhr.onloadend = function () {

                let resdata = xhr.responseText;

                if (type === 'json') {
                    try {
                        resdata = JSON.parse(xhr.responseText);
                    } catch (e) {
                        resdata = null;
                    }
                }

                if (this.status == 200) {
                    fulfill(resdata, xhr);
                } else {
                    reject(resdata, xhr);
                }
            };

            // send the collected data as JSON
            xhr.send(data);
        });
    },

    on: function (name, fn) {
        if (!this._events[name]) this._events[name] = [];
        this._events[name].push(fn);
    },

    off: function (name, fn) {
        if (!this._events[name]) return;

        if (!fn) {
            this._events[name] = [];
        } else {

            for (let i = 0; i < this._events[name].length; i++) {
                if (this._events[name][i] === fn) {
                    this._events[name].splice(i, 1);
                    break;
                }
            }
        }
    },

    trigger: function (name, params) {

        if (!this._events[name]) return;

        let event = { name, params };

        for (let i = 0; i < this._events[name].length; i++) {
            this._events[name][i].apply(App, [event]);
        }
    },

    deferred: function () {

        let resolve, fail;

        let d = new Promise(function (fullfill, reject) {
            resolve = fullfill;
            fail = reject;
        });

        d.resolve = function (data) {
            resolve(data);
        };

        d.reject = function (data) {
            fail(data);
        };

        return d;
    }
};

// general services
App.session = window.JSONStorage ? window.JSONStorage.select("app", "session") : null;
App.storage = window.JSONStorage ? window.JSONStorage.select("app", "local") : null;
App.memory = window.JSONStorage ? window.JSONStorage.select("app", "memory") : null;
App.i18n = window.i18n || null;
App.assets = assets;
App.ui = ui;
App.utils = utils;

// custom utils
App.utils.import = function(uri) {
    return import(App.base(uri)+'?v='+App.version);
};

App.utils.$interpolate = function (str, data) {

    data = Object.assign({}, App.utils.$interpolate.fns, data);

    return utils.interpolate(str, data);
};

App.utils.$interpolate.fns = {};

window.App = App;
