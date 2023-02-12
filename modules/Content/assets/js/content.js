// Global Vue components
VueView.component('field-contentItemLink', 'content:assets/vue-components/field-content-item-link.js');
VueView.component('options-linkModel', 'content:assets/vue-components/options-link-model.js');

App.utils.$interpolate.fns.$content = function(link, display) {

    if (!link || !link._model || !link._id) return '';

    return `<display-content class="kiss-display-inline-block" model="${link._model}" id="${link._id}" display="${display}"></display-content>`;
};
