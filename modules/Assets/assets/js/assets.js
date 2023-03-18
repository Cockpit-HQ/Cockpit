// Global Vue components
VueView.component('asset-preview', 'assets:assets/vue-components/asset-preview.js');
VueView.component('field-asset', 'assets:assets/vue-components/field-asset.js');

App.on('field-wysiwyg-init', evt => {
    let opts = evt.params[0];
    opts.toolbar += ` | insertAssetButton`;
});

App.on('field-wysiwyg-setup', evt => {

    let editor = evt.params[0];

    if (editor.settings && editor.settings.assetsPicker === false) {
        return;
    }

    editor.ui.registry.addButton("insertAssetButton", {
        text: 'Asset',
        onAction: function () {

            VueView.ui.modal('assets:assets/dialogs/asset-picker.js', {}, {

                selectAsset: (asset) => {

                    let content, url = App.base(`#uploads:${asset.path}`);

                    if (/^image\//.test(asset.mime)) {
                        content = `<img src="${url}" alt="${asset.title}">`;
                    } else {
                        content = `<a href="${url}">${asset.title}</a>`;
                    }

                    editor.insertContent(content);
                }

            }, {size: 'xlarge'})
        }
    });
});

App.utils.$interpolate.fns.$image = function(asset, w = 25, h = 25, mode = 'bestFit', q = 80) {

    if (!asset || !asset.type || asset.type !== 'image') return '';

    return `<display-image class="kiss-display-inline-block" src="${asset._id}" w="${w}" h="${h}" mode="${mode}" q="${q}" style="vertical-align: middle;"></display-image>`;
};

