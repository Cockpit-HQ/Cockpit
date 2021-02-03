import "../vendor/vue/vue.js";
import "../vendor/kiss/lib.js"
import "../vendor/storage.js";
import "../vendor/i18n.js";

import utils from "./utils.js";

import "./components.js";

let html = document.documentElement;
let App = {

    base_route: (html.getAttribute("data-route") || '').replace(/\/$/, ''),
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
        return this.base_route + url;
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

App.ui = {

    notify: function (message, status, timeout) {

        timeout = (timeout === false ? false : timeout) || 2500;

        new Noty({
            type: status || 'info',
            text: message,
            timeout: timeout,
            layout: 'topCenter',
            theme: 'app',
            progressBar: true
        }).show();
    },

    block: function (content) {

    },

    unblock: function () {

    },

    dialog: function (content, options, dialogtype) {

        let id = Math.random().toString(36).substring(2) + Date.now().toString(36);

        document.body.insertAdjacentHTML('beforeend', `
            <kiss-dialog id="dialog-${id}" size="${(options && options.size) || ''}" type="${dialogtype}">
                <kiss-content class="animated fadeInUp faster">
                    ${content}
                </kiss-content>
            </kiss-dialog>
        `);

        let dialog = document.getElementById(`dialog-${id}`);

        dialog.__close = dialog.close;
        dialog.__show = dialog.show;

        dialog.close = function() {
            dialog.__close();
            dialog.parentNode.removeChild(dialog);
        };

        dialog.show = function() {
            dialog.__show();

            setTimeout(() => {
                let ele = dialog.querySelector('[autofocus]');

                if (ele) {
                    ele.focus();
                }
            }, 300)
        };

        return dialog;
    },

    alert: function (content, options) {

        let dialog = this.dialog(`
            <div class="kiss-margin-bottom">
                ${content}
            </div>
            <div class="kiss-margin-top kiss-flex kiss-flex-right kiss-flex-middle">
                <button type="button" class="kiss-button kiss-button-primary" kiss-dialog-close>Ok</button>
            </div>
        `, options, 'alert');

        dialog.show();


    },

    confirm: function (text, onconfirm, oncancel, options) {

        // if (confirm(text)) {
        //     (onconfirm || function () { })();
        // } else {
        //     (oncancel || function () { })();
        // }


        let dialog = this.dialog(`
            <div class="kiss-margin-bottom">
                ${text}
            </div>
            <div class="kiss-margin-top kiss-flex kiss-flex-right kiss-flex-middle">
                <button type="button" class="kiss-button-cancel kiss-button kiss-button-link">Cancel</button>
                <button type="button" class="kiss-button-confirm kiss-button kiss-button-primary kiss-margin-small-left">Ok</button>
            </div>
        `, options, 'confirm');

        utils.on(dialog, 'click', '.kiss-button-confirm', () => {
            if(onconfirm) onconfirm();
            dialog.close();
        });

        utils.on(dialog, 'click', '.kiss-button-cancel', () => {
            if(oncancel) onconfirm();
            dialog.close();
        });

        dialog.show();
    },

    prompt: function (text, value, clb, options) {

    }
};

App.assets = {

    _ress: {},

    require: function (ress, onSuccess, onError) {

        onSuccess = onSuccess || function () { };
        onError = onError || function () { };

        var req = [],
            ress = Array.isArray(ress) ? ress : [ress];

        for (var i = 0, len = ress.length; i < len; i++) {

            if (!ress[i]) continue;

            if (!this._ress[ress[i]]) {

                if (ress[i].match(/\.js$/i)) {
                    this._ress[ress[i]] = this.getScript(ress[i]);
                } else if (ress[i].match(/\.(jpg|jpeg|gif|png)$/i)) {
                    this._ress[ress[i]] = this.getImage(ress[i]);
                } else if (ress[i].match(/\.css$/i)) {
                    this._ress[ress[i]] = this.getCss(ress[i]);
                } else {
                    continue;
                }
            }

            req.push(this._ress[ress[i]]);
        }

        return Promise.all(req).then(onSuccess).catch(function (e) {
            onError.apply(self, [e]);
        });
    },

    getScript: function (url) {

        return new Promise(function (resolve, reject) {

            var script = document.createElement('script');

            script.async = true;

            script.onload = function () {
                resolve(url);
            };

            script.onerror = function () {
                reject(url);
            };

            script.src = (url.match(/^(\/\/|http)/) ? url : App.base(url)) + '?v=' + App.version;

            document.getElementsByTagName('head')[0].appendChild(script);

        });
    },

    getCss: function (url) {

        return new Promise(function (resolve, reject) {

            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = (url.match(/^(\/\/|http)/) ? url : App.base(url)) + '?v=' + App.version;

            document.getElementsByTagName('head')[0].appendChild(link);

            var img = document.createElement('img');
            img.onerror = function () {
                resolve(url);
            };
            img.src = link.href + '?v=' + App.version;
        });
    },

    getImage: function (url) {

        return new Promise(function (resolve, reject) {

            var img = document.createElement('img');

            img.onload = function () { resolve(url); };
            img.onerror = function () { reject(url); };

            img.src = (url.match(/^(\/\/|http)/) ? url : App.base(url)) + '?v=' + App.version;
        });
    }
};

// general services
App.session = window.JSONStorage ? window.JSONStorage.select("app", "session") : null;
App.storage = window.JSONStorage ? window.JSONStorage.select("app", "local") : null;
App.memory = window.JSONStorage ? window.JSONStorage.select("app", "memory") : null;
App.i18n = window.i18n || null;
App.utils = utils;

// custom utils
App.utils.import = function(uri) {
    return import(App.base(uri)+'?v='+App.version);
};

App.utils.vueModal = function(url, data, events, options) {

    data = data || {};
    events = events || {};

    let dialog = App.ui.dialog(/*html*/`
        <vue-view class="vue-modal" >

            <vue-dialog-content v-bind="data"></vue-dialog-content>

            <script type="module">

                export default {
                    data() {
                        return  {
                            data: ${JSON.stringify(data)}
                        }
                    },

                    components: {
                        'vue-dialog-content':  '${url}'
                    }
                }
            </script>
        </vue-view>
    `, options || {});

    let _element, _app, idle;

    idle = setInterval(() => {

        _element = dialog.querySelector('.vue-modal');

        if (!_element.__vue_app__) return;

        clearInterval(idle);

        _app = _element.__vue_app__;

        _app.mixin({

            methods: {
                $closeDialog() {
                    dialog.close();
                },
                $event(name, ...args) {

                    if (!events[name]) return;

                    events[name](...args);
                }
            }
        });

    }, 1);

    dialog.show();
};

window.App = App;