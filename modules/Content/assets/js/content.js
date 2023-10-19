import "../components/display-content.js";

// Global Vue components
VueView.component('field-contentItemLink', 'content:assets/vue-components/field-content-item-link.js');
VueView.component('options-linkModel', 'content:assets/vue-components/options-link-model.js');

let contentModelsPromise = null;

App.utils.getContentModels = () => {

    if (contentModelsPromise) return contentModelsPromise;

    contentModelsPromise = new Promise((resolve, reject) => {

        App.request('/content/models/load').then(_models => {

            let data = {};

            _models.forEach(model => data[model.name] = model);

            resolve(data)

        }).catch((err) => {
            reject(err);
        });
    });

    return contentModelsPromise;
}


App.utils.$interpolate.fns.$content = function(link, display) {

    if (!link || !link._model || !link._id) return '';

    return `<display-content class="kiss-display-inline-block" model="${link._model}" id="${link._id}" display="${display}"></display-content>`;
};
