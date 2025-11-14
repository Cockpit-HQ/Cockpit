import "../components/app-avatar/app-avatar.js";
import "../components/app-actionbar/app-actionbar.js";
import "../components/app-datetime/app-datetime.js";
import "../components/app-fieldcontainer/app-fieldcontainer.js";
import "../components/app-frame/app-frame.js";
import "../components/app-loader/app-loader.js";
import "../components/app-scrollcontainer/app-scrollcontainer.js";
import "../components/app-textcomplete/app-textcomplete.js";

import "../../../System/assets/js/components.js";

// General
VueView.component('vue-draggable', Vue.defineAsyncComponent(() => {
    return new Promise(resolve => {
        App.assets.require(['app:assets/vendor/vue/components/vue-draggable.js']).then(() => resolve(window.VueDraggablePlus.VueDraggable));
    })
}));

VueView.component('vue-table', Vue.defineAsyncComponent(() => {
    return new Promise(resolve => {
        App.assets.require([
            'app:assets/vendor/ag-grid/ag-grid.js',
            'app:assets/css/vendor/ag-grid-theme.css'
        ]).then(() => {
            App.utils.import('app:assets/vendor/ag-grid/ag-grid-vue3.js').then((m) => resolve(m));
        });
    })
}));

VueView.component('vue-chart', Vue.defineAsyncComponent(() => {
    return new Promise(resolve => {
        App.assets.require([
            'app:assets/vendor/chartjs/chart.js',
        ]).then(() => {
            App.utils.import('app:assets/vendor/chartjs/vue-chart.js').then((m) => resolve(m));
        });
    })
}));

VueView.component('revisions-widget', 'system:assets/vue-components/revisions/widget.js');
VueView.component('user-info', 'app:assets/vue-components/user-info.js');

// Fields
VueView.component('field-boolean', 'app:assets/vue-components/fields/field-boolean.js');
VueView.component('field-code', 'app:assets/vue-components/fields/field-code.js');
VueView.component('field-color', 'app:assets/vue-components/fields/field-color.js');
VueView.component('field-date', 'app:assets/vue-components/fields/field-date.js');
VueView.component('field-datetime', 'app:assets/vue-components/fields/field-datetime.js');
VueView.component('field-nav', 'app:assets/vue-components/fields/field-nav.js');
VueView.component('field-number', 'app:assets/vue-components/fields/field-number.js');
VueView.component('field-object', 'app:assets/vue-components/fields/field-object.js');
VueView.component('field-select', 'app:assets/vue-components/fields/field-select.js');
VueView.component('field-set', 'app:assets/vue-components/fields/field-set.js');
VueView.component('field-table', 'app:assets/vue-components/fields/field-table.js');
VueView.component('field-tags', 'app:assets/vue-components/fields/field-tags.js');
VueView.component('field-text', 'app:assets/vue-components/fields/field-text.js');
VueView.component('field-time', 'app:assets/vue-components/fields/field-time.js');
VueView.component('field-wysiwyg', 'app:assets/vue-components/fields/richtext/field-richtext.js');
