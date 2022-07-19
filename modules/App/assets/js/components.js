import "./vue-view.js";

import "../components/app-avatar/app-avatar.js";
import "../components/app-actionbar/app-actionbar.js";
import "../components/app-fieldcontainer/app-fieldcontainer.js";
import "../components/app-frame/app-frame.js";
import "../components/app-loader/app-loader.js";
import "../components/app-scrollcontainer/app-scrollcontainer.js";

import "../../../System/assets/js/components.js";

// General
VueView.component('vue-draggable', Vue.defineAsyncComponent(() => {
    return new Promise(resolve => {
        App.assets.require(['app:assets/vendor/Sortable.js']).then(() => {
            App.assets.require(['app:assets/vendor/vue/components/vue-draggable.js']).then(() => resolve(window.vuedraggable));
        });
    })
}));

VueView.component('vue-table', Vue.defineAsyncComponent(() => {
    return new Promise(resolve => {
        App.assets.require([
            'app:assets/vendor/tabulator/tabulator.js',
            'app:assets/css/vendor/tabulator.css'
        ]).then(() => {
            App.utils.import('app:assets/vendor/tabulator/tabulator-vue.js').then((m) => resolve(m));
        });
    })
}));

VueView.component('revisions-widget', 'system:assets/vue-components/revisions/widget.js');

// Fields
VueView.component('field-boolean', 'app:assets/vue-components/field-boolean.js');
VueView.component('field-code', 'app:assets/vue-components/field-code.js');
VueView.component('field-color', 'app:assets/vue-components/field-color.js');
VueView.component('field-date', 'app:assets/vue-components/field-date.js');
VueView.component('field-datetime', 'app:assets/vue-components/field-datetime.js');
VueView.component('field-nav', 'app:assets/vue-components/field-nav.js');
VueView.component('field-number', 'app:assets/vue-components/field-number.js');
VueView.component('field-object', 'app:assets/vue-components/field-object.js');
VueView.component('field-select', 'app:assets/vue-components/field-select.js');
VueView.component('field-set', 'app:assets/vue-components/field-set.js');
VueView.component('field-table', 'app:assets/vue-components/field-table.js');
VueView.component('field-tags', 'app:assets/vue-components/field-tags.js');
VueView.component('field-text', 'app:assets/vue-components/field-text.js');
VueView.component('field-time', 'app:assets/vue-components/field-time.js');
VueView.component('field-wysiwyg', 'app:assets/vue-components/field-wysiwyg.js');
