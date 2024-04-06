import "../../vendor/vue/vue.js";
import "../../vendor/vue/vue-router.js";
import "../vue-view.js";
import "../../vendor/kiss/lib.js"
import "../../vendor/storage.js";
import "../../vendor/i18n.js";
import "../../vendor/dompurify.js";
import "../../vendor/mousetrap.js";
import utils from "./utils.js";
import ui from "./ui.js";
import assets from "./assets.js";

let html = document.documentElement;
let baseUrl = (html.getAttribute('data-base') || '').replace(/\/$/, '');
let routeUrl = (html.getAttribute('data-route') || '').replace(/\/$/, '');

let App = {

    base_url: baseUrl,
    route_url: routeUrl,
    csrf: (html.getAttribute("data-csrf") || undefined),
    version: (html.getAttribute("data-version") || '0.0.1'),

    _events: {},
    _paths: {},

    base(url) {

        let path = url.match(/^(.*?)\:/);

        if (path && this._paths[path[1]]) {
            return url.replace(path[0], this._paths[path[1]]);
        }

        return this.base_url + url;
    },

    route(url) {
        return this.route_url + url;
    },

    reroute(url) {
        location.href = /^http/.test(url) ? url : this.route(url);
    },

    request(url, data, type) {

        url = this.route(url);
        type = type || 'json';

        let csrf = this.csrf;

        return new Promise(function (fulfill, reject) {

            let xhr = new XMLHttpRequest();

            xhr.open('post', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            url += (url.indexOf('?') !== -1 ? '&' : '?') + 'nc=' + Math.random().toString(36).substr(2);

            data = data || {};

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

            if (csrf) {
                xhr.setRequestHeader('X-CSRF-TOKEN', csrf);
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

                if (this.status === 200) {
                    fulfill(resdata);
                } else {
                    reject(resdata);
                }
            };

            // send the collected data as JSON
            xhr.send(data);
        });
    },

    on(name, fn) {
        if (!this._events[name]) this._events[name] = [];
        this._events[name].push(fn);
    },

    off(name, fn) {
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

    trigger(name, params) {

        if (!this._events[name]) return;

        let event = { name, params };

        for (let i = 0; i < this._events[name].length; i++) {
            this._events[name][i].apply(App, [event]);
        }
    },

    deferred() {

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
App.session = window.JSONStorage ? window.JSONStorage.select('app', 'session') : null;
App.storage = window.JSONStorage ? window.JSONStorage.select('app', 'local') : null;
App.memory = window.JSONStorage ? window.JSONStorage.select('app', 'memory') : null;
App.i18n = window.i18n || null;
App.assets = assets;
App.ui = ui;
App.utils = utils;

App.utils.import = function (uri) {
    return import(`${App.base(uri)}?v=${App.version}`);
};


window.App = App;
