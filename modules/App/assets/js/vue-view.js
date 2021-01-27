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

        compile(el) {
            this.ready.then(() => {
                this._compile(el);
            });
        },

        _compile(el) {

            let script = el.querySelector('script');
            let template = el.querySelector('template');
            let def = {}, app;

            if (script) {
                def = (new Function(script.innerHTML.replace('export default', 'return ')))();
                script.parentNode.removeChild(script);
            }

            if (template) {
                def.template = template.innerHTML;
                template.parentNode.removeChild(template);
            }

            def = Object.assign({}, def || {});

            def.components = def.components || {};

            Object.keys(def.components).forEach(name => {

                if (typeof(def.components[name]) == 'string') {
                    def.components[name] = (function(url) {
                        return Vue.defineAsyncComponent(() => App.utils.import(url));
                    })(def.components[name]);
                }
            });

            app = Vue.createApp(def);

            Object.keys(VueView.components).forEach(name => {

                if (typeof(VueView.components[name]) == 'string') {
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

                    $route(url) {
                        return App.route(url);
                    },

                    $base(url) {
                        return App.base(url);
                    },

                    $request(url, data) {
                        return App.request(url, data);
                    }
                }
            });

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

    window.VueView = VueView;

})();
