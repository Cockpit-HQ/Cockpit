import "./vue-view.js";

import "../components/app-avatar/app-avatar.js";
import "../components/app-actionbar/app-actionbar.js";
import "../components/app-fieldcontainer/app-fieldcontainer.js";
import "../components/app-loader/app-loader.js";
import "../components/app-tabs/app-tabs.js";


VueView.component('vue-draggable', Vue.defineAsyncComponent(() => {
    return new Promise(resolve => {
        App.assets.require([
            'app:assets/vendor/Sortable.js',
            'app:assets/vendor/vue/components/vue-draggable.js'
        ]).then(() => resolve(window.vuedraggable))
    })
}));

//VueView.component('fields-renderer', 'app:assets/vue-components/fields-renderer.js');

// Fields
VueView.component('field-boolean', 'app:assets/vue-components/field-boolean.js');
VueView.component('field-code', 'app:assets/vue-components/field-code.js');
VueView.component('field-color', 'app:assets/vue-components/field-color.js');
VueView.component('field-object', 'app:assets/vue-components/field-object.js');
VueView.component('field-text', 'app:assets/vue-components/field-text.js');
VueView.component('field-wysiwyg', 'app:assets/vue-components/field-wysiwyg.js');
