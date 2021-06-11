import "../vendor/vue/vue.js";
import "../vendor/kiss/lib.js"
import "../vendor/storage.js";
import "../vendor/i18n.js";
import utils from "./app/utils.js";
import ui from "./app/ui.js";
import assets from "./app/assets.js";
import "./components.js";

let html = document.documentElement;
let App = {

    base_url: (html.getAttribute("data-base") || '').replace(/\/$/, ''),
    version: (html.getAttribute("data-version") || '0.0.1'),

    _events: {},
    _paths: {},

    base: function (url) {

        let path = url.match(/^(\w+)\:/);

        if (path && this._paths[path[1]]) {
            return url.replace(path[0], this._paths[path[1]]);
        }

        return this.base_url + url;
    },

    route: function (url) {
        return this.base_url + url;
    },

    reroute: function (url) {
        location.href = url.match(/^http/) ? url : this.route(url);
    },

    request: function (url, data, type) {

        url = this.route(url);
        type = type || 'json';

        return new Promise(function (fulfill, reject) {

            var xhr = new XMLHttpRequest();

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

                var resdata = xhr.responseText;

                if (type == 'json') {
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

            for (var i = 0; i < this._events[name].length; i++) {
                if (this._events[name][i] === fn) {
                    this._events[name].splice(i, 1);
                    break;
                }
            }
        }
    },

    trigger: function (name, params) {

        if (!this._events[name]) return;

        var event = { "name": name, "params": params };

        for (var i = 0; i < this._events[name].length; i++) {
            this._events[name][i].apply(App, [event]);
        }
    },

    deferred: function () {

        var resolve, fail;

        var d = new Promise(function (fullfill, reject) {
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

window.App = App;