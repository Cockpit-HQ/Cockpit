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
                limit: 15,
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

            }, {flip: true, size: 'large'})
        },

    },

    template: /*html*/`
        <kiss-card :class="{'kiss-disabled': loading}">

            <div class="kiss-text-caption kiss-text-bold">{{ t('Assets') }}</div>
            <div class="kiss-color-muted kiss-size-small kiss-margin-xsmall">{{ t('Latest uploaded assets') }}</div>
            <div class="kiss-padding-large" v-if="loading"><app-loader size="small"></app-loader></div>

            <kiss-grid class="animated fadeIn kiss-margin-small" cols="3@s 5@m" gap="small" v-if="!loading && assets.length">
                <kiss-card class="kiss-position-relative" theme="contrast bordered" v-for="asset in assets">
                    <canvas width="400" height="300"></canvas>
                    <asset-preview :asset="asset"></asset-preview>
                    <a class="kiss-cover" @click="show(asset)"></a>
                </kiss-card>
            </kiss-grid>

            <div class="kiss-margin-small" v-if="!loading">
                <a class="kiss-button kiss-button-small" :href="$routeUrl('/assets')">{{ t('Goto assets') }}</a>
            </div>

        </kiss-card>
    `
}
