export default {

    data() {

        return {
            ASSETS_BASE_URL: window.ASSETS_BASE_URL,
            item: null,
            loading: true
        }
    },

    props: {
        asset: {
            type: Object
        }
    },

    mounted() {

        this.loading = true;

        this.$request(`/assets/asset/${this.asset._id}`, {asset:this.asset}).then(asset => {
            this.item = asset;
            this.loading = false;
        }).catch(rsp => {
            App.ui.notify(rsp.error || 'Asset not found!', 'error');
        });
    },

    computed: {
        size() {
            return App.utils.formatSize(this.item.size);
        }
    },

    template: /*html*/`

        <div class="kiss-height-100vh kiss-flex kiss-flex-column">
            <div class="kiss-padding kiss-size-4 kiss-text-bold kiss-flex kiss-flex-middle">
                <div class="kiss-margin-small-right"><icon size-larger>create</icon></div>
                {{ t('Edit asset') }}
            </div>
            <div class="app-offcanvas-content kiss-padding">

                <app-loader v-if="!item"></app-loader>

                <form v-if="item">

                    <div class="kiss-bgcolor-contrast kiss-position-relative kiss-padding kiss-margin-bottom" :class="{'kiss-bgcolor-transparentimage': item.type == 'image'}">
                        <canvas width="400" height="150"></canvas>
                        <div class="kiss-cover kiss-align-center kiss-flex kiss-flex-middle kiss-flex-center"><asset-preview :asset="item"></asset-preview></div>
                        <div class="kiss-cover kiss-padding">
                            <span class="kiss-badge">{{ item.mime }}</span>
                        </div>
                        <a class="kiss-cover" :href="ASSETS_BASE_URL+item.path" target="_blank" rel="noopener"></a>
                    </div>

                    <div class="kiss-margin-small">
                        <label>{{ t('Title') }}</label>
                        <input class="kiss-input" type="text" v-model="item.title">
                    </div>

                    <div class="kiss-margin-small">
                        <label>{{ t('Description') }}</label>
                        <textarea class="kiss-input" v-model="item.description"></textarea>
                    </div>

                    <div class="kiss-margin-small" v-if="item.type == 'image' && Array.isArray(item.colors) && item.colors.length">
                        <label>{{ t('Colors') }}</label>
                        <div>
                            <a class="kiss-badge kiss-badge-outline kiss-margin-xsmall-right" :style="{color}" v-for="color in item.colors">{{ color }}</a>
                        </div>
                    </div>

                </form>

            </div>
            <div class="kiss-padding kiss-padding-remove-bottom kiss-bg-contrast" v-if="item">
                {{ size}}
            </div>
            <div class="kiss-padding">
                <div class="kiss-button-group kiss-flex kiss-child-width-1-2">
                    <button class="kiss-button" kiss-offcanvas-close>{{ t('Close') }}</button>
                    <button class="kiss-button kiss-button-primary" :disabled="!item || loading" @click="update()">{{ t('Update asset') }}</button>
                </div>
            </div>
        </div>

    `,

    methods: {

        update() {

            this.$request('/assets/update', {asset: this.item}).then(asset => {

                Object.assign(this.item, asset);
                this.$call('update', asset);
                App.ui.notify('Asset updated!');
            })
        }
    }
}