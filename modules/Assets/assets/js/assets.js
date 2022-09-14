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
