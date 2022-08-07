export default {

    offcanvas(component, data, callbacks, options) {

        let offcanvas;

        data = data || {};
        callbacks = callbacks || {};

        let def = {

            $viewSetup(app) {

                app.mixin({
                    methods: {
                        $close() {

                            if (this.$el.closest) {
                                this.$el.closest('kiss-offcanvas').close();
                            } else {
                                this.$el.parentNode.closest('kiss-offcanvas').close();
                            }
                        },
                        $call(name, ...args) {
                            if (callbacks[name]) {
                                callbacks[name](...args);
                            }
                        }
                    }
                });
            },

            data() {
                return  {
                    data
                }
            },

            components: {
                'vue-offcanvas-content': component
            }
        };

        offcanvas = App.ui.offcanvas(/*html*/`
            <div class="vue-offcanvas">
                <vue-offcanvas-content v-bind="data"></vue-offcanvas-content>
            </div>
        `, options || {});

        offcanvas.$view = offcanvas.querySelector('.vue-offcanvas');

        VueView.compile(offcanvas.$view, def);
        setTimeout(() => offcanvas.show(), 50);

        return offcanvas;
    },

    modal(url, data, callbacks, options, modaltype) {

        data = data || {};
        callbacks = callbacks || {};

        let def = {

            $viewSetup(app) {

                app.mixin({
                    methods: {
                        $close() {

                            if (this.$el.closest) {
                                this.$el.closest('kiss-dialog').close();
                            } else {
                                this.$el.parentNode.closest('kiss-dialog').close();
                            }
                        },
                        $call(name, ...args) {
                            if (callbacks[name]) {
                                callbacks[name](...args);
                            }
                        }
                    }
                });
            },

            data() {

                return  {
                    data
                }
            },

            components: {
                'vue-dialog-content':  url
            }
        };

        let dialog = App.ui.dialog(/*html*/`
            <div class="vue-modal">
                <vue-dialog-content v-bind="data"></vue-dialog-content>
            </div>
        `, options || {}, modaltype);

        dialog.$view = dialog.querySelector('.vue-modal');

        VueView.compile(dialog.$view, def);
        dialog.show();

        return dialog;
    }
}
