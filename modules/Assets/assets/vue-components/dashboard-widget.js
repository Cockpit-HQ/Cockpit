export default {

    data() {
        return {
            assets: [],
            loading: true,
        }
    },

    mounted() {
        this.load();
    },

    methods: {
        load() {

            this.loading = true;

            const options = {
                sort: {_created: -1},
                limit: 12,
            };

            this.$request('/assets/assets', {options}).then(rsp => {

                this.assets = rsp.assets;
                this.loading = false;
            })
        },

        show(asset) {

            VueView.ui.offcanvas('assets:assets/dialogs/asset.js', {asset}, {

                update: updatedAsset => {
                    Object.assign(asset, updatedAsset)
                }

            });
        },

    },

    template: /*html*/`
        <kiss-card :class="{'kiss-disabled': loading}">

            <div class="kiss-text-caption kiss-text-bold">{{ t('Assets') }}</div>
            <div class="kiss-color-muted kiss-size-small kiss-margin-xsmall">{{ t('Latest uploaded assets') }}</div>
            <div class="kiss-padding-large" v-if="loading"><app-loader size="small"></app-loader></div>

            <kiss-grid class="animated fadeIn kiss-margin-small" cols="3@s 3@m" gap="small" v-if="!loading && assets.length">
                <kiss-card class="kiss-position-relative" theme="bordered" :class="asset.type === 'image' ? 'kiss-bgcolor-transparentimage':'kiss-bgcolor-contrast'" hover="bordered-primary" v-for="asset in assets">
                    <canvas width="400" height="300"></canvas>
                    <div class="kiss-cover kiss-padding-larger kiss-flex kiss-flex-middle kiss-flex-center">
                        <asset-preview :asset="asset"></asset-preview>
                    </div>
                    <a class="kiss-cover" @click="show(asset)" :title="asset.title"></a>
                </kiss-card>
            </kiss-grid>

            <div class="kiss-margin-small" v-if="!loading">
                <a class="kiss-button kiss-button-small" :href="$routeUrl('/assets')">{{ t('Go to assets') }}</a>
            </div>

        </kiss-card>
    `
}
