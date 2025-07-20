function getContentsComponent(component) {

    let p;

    p = new Promise(resolve => {
        if (typeof (component) === 'string') {
            App.utils.import(component).then(m => resolve(m.default));
        } else {
            resolve(component);
        }
    });

    return p;
}

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
            }
        };

        getContentsComponent(component).then(c => {

            def.components = {
                VueOffcanvasContent: c
            };

            offcanvas = App.ui.offcanvas(/*html*/`
                <div class="vue-offcanvas">
                    <vue-offcanvas-content v-bind="data"></vue-offcanvas-content>
                </div>
            `, Object.assign({}, c._meta || {}, options || {}));

            offcanvas.$view = offcanvas.querySelector('.vue-offcanvas');

            VueView.compile(offcanvas.$view, def);
            setTimeout(() => offcanvas.show(), 50);
        });
    },

    modal(component, data, callbacks, options, modaltype) {

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
            }
        };

        getContentsComponent(component).then(c => {

            def.components = {
                VueDialogContent: c
            };

            let dialog = App.ui.dialog(/*html*/`
                <div class="vue-modal">
                    <vue-dialog-content v-bind="data"></vue-dialog-content>
                </div>
            `, Object.assign({}, c._meta || {}, options || {}), modaltype);

            dialog.$view = dialog.querySelector('.vue-modal');

            VueView.compile(dialog.$view, def);
            setTimeout(() => dialog.show(), 100);
        });

    },

    popout(component, data, callbacks, options) {

        data = data || {};
        callbacks = callbacks || {};

        let def = {

            $viewSetup(app) {

                app.mixin({
                    methods: {
                        $close() {

                            if (this.$el.closest) {
                                this.$el.closest('kiss-popout').close();
                            } else {
                                this.$el.parentNode.closest('kiss-popout').close();
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
            }
        };

        getContentsComponent(component).then(c => {

            def.components = {
                VuePopoutContent: c
            };

            let popout = App.ui.popout(/*html*/`
                <div class="vue-popout">
                    <vue-popout-content v-bind="data"></vue-popout-content>
                </div>
            `, Object.assign({}, c._meta || {}, options || {}));

            popout.$view = popout.querySelector('.vue-popout');

            VueView.compile(popout.$view, def);
            setTimeout(() => popout.show(), 50);
        });
    },
}
