import ui from "./vue-view/ui.js";

/**
 * Dynamic vue template (Vue 3.x)
 */
(function() {

    let VueView = {

        ready: new Promise(function(resolve) {
            document.addEventListener('DOMContentLoaded', e => resolve())
        }),

        components: {},

        component(name, def) {
            this.components[name] = def;
        },

        compile(el, def) {
            this.ready.then(() => {
                this._compile(el, def);
            });
        },

        _compile: async function(el, definition) {

            let script = definition ? null : el.querySelector('script');
            let template = definition ? null : el.querySelector('template');
            let def = definition || {}, app;

            if (script) {
                let module = await import(`data:text/javascript;charset=utf-8,${encodeURIComponent(script.innerHTML)}`);
                def = module.default;
                script.parentNode.removeChild(script);
            }

            if (template) {
                def.template = template.innerHTML;
                template.parentNode.removeChild(template);
            }

            def = Object.assign({}, def || {});

            def.components = def.components || {};

            Object.keys(def.components).forEach(name => {

                if (typeof(def.components[name]) === 'string') {
                    def.components[name] = (function(url) {
                        return Vue.defineAsyncComponent(() => App.utils.import(url));
                    })(def.components[name]);
                }
            });

            app = Vue.createApp(def);

            Object.keys(VueView.components).forEach(name => {

                if (typeof(VueView.components[name]) === 'string') {
                    app.component(name, Vue.defineAsyncComponent(() => App.utils.import(VueView.components[name])));
                } else {
                    app.component(name, VueView.components[name]);
                }
            });

            app.mixin({
                data() {
                    return {
                        App: window.App
                    }
                },

                methods: {
                    t(key) {
                        return App.i18n.get(key);
                    },

                    $routeUrl(url) {
                        return App.route(url);
                    },

                    $baseUrl(url) {
                        return App.base(url);
                    },

                    $request(url, data, type) {
                        return App.request(url, data, type);
                    },

                    $dialog: VueView.ui.modal,
                    $offcanvas: VueView.ui.offcanvas,
                }
            });

            // view router
            if (def.$router && window.VueRouter) {

                def.$router = Object.assign({
                    history: VueRouter.createWebHashHistory(),
                    routes: []
                }, def.$router);

                def.$router.routes.forEach(route => {

                    if (typeof(route.component) === 'string') {
                        route.component = (function(url) {
                            return Vue.defineAsyncComponent(() => App.utils.import(url));
                        })(route.component);
                    }
                })

                app.use(new VueRouter.createRouter(def.$router));
            }

            if (def.$viewSetup) {
                def.$viewSetup(app);
            }

            app.mount(el);
            el.setAttribute('init', true);

            return app;
        }
    };

    class VueElement extends HTMLElement {
        connectedCallback() {
            VueView.compile(this);
        }
    }

    customElements.define('vue-view', VueElement);

    VueView.ui = ui;

    window.VueView = VueView;

})();
