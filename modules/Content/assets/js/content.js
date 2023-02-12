// Global Vue components
VueView.component('field-contentItemLink', 'content:assets/vue-components/field-content-item-link.js');
VueView.component('options-linkModel', 'content:assets/vue-components/options-link-model.js');

App.utils.$interpolate.fns.$content = function(model, id, display) {
    return `<display-content class="kiss-display-inline-block" model="${model || ''}" id="${id || ''}" display="${display || ''}"></display-content>`;
};
