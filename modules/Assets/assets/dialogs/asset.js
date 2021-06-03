export default {

    data() {

        return {
            ASSETS_BASE_URL: window.ASSETS_BASE_URL,
            item: null,
            loading: true,
            focalPointing: false
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
        },

        focalPoint() {

            if (!this.item.fp) {
                return {left: '50%', top: '50%'};
            }

            return {left: (this.item.fp.x * 100)+'%', top: (this.item.fp.y * 100)+'%'}
        }
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="kiss-padding kiss-text-bold kiss-flex kiss-flex-middle">
                <div class="kiss-margin-small-right"><icon size-larger>create</icon></div>
                {{ t('Edit asset') }}
            </div>
            <div class="app-offcanvas-content kiss-padding">

                <app-loader v-if="!item"></app-loader>

                <form v-if="item" @submit.prevent="update">

                    <div class="kiss-bgcolor-contrast kiss-position-relative kiss-padding kiss-margin-bottom" :class="{'kiss-bgcolor-transparentimage': item.type == 'image'}">
                        <canvas width="400" height="150"></canvas>
                        <div class="kiss-cover kiss-align-center kiss-flex kiss-flex-middle kiss-flex-center">
                            <asset-preview :asset="item"></asset-preview>
                        </div>
                        <div class="kiss-cover kiss-padding-small" v-if="!focalPointing">
                            <span class="kiss-badge">{{ item.mime }}</span>
                        </div>
                        <a class="kiss-cover" :href="ASSETS_BASE_URL+item.path" target="_blank" rel="noopener" v-if="!focalPointing"></a>
                        <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center" v-if="focalPointing">
                            <div class="kiss-display-inline-block kiss-position-relative" style="height:100%;" @click="setFocalPoint">
                                <canvas class="kiss-responsive-height" :width="asset.width" :height="asset.height"></canvas>
                                <div class="kiss-position-absolute" :style="focalPoint">
                                    <div style="width:8px;height:8px;background:red;border-radius:50%;transform: translate(-50%, -50%);"></div>
                                </div>
                            </div>
                        </div>
                        <div class="kiss-position-absolute kiss-position-bottom-right kiss-padding-small" v-if="item.type == 'image'">
                            <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-bgcolor-warning': focalPointing}" :title="t('Set focal point')" @click="focalPointing = !focalPointing"><icon>gps_fixed</icon></button>
                        </div>
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
                        <div class="kiss-size-4">
                            <a class="kiss-margin-xsmall-right" :style="{color}" :title="color" @click="copyColor(color)" v-for="color in item.colors"><icon>invert_colors</icon></a>
                        </div>
                    </div>

                    <div class="kiss-margin-small kiss-color-muted kiss-text-monospace kiss-size-small">
                        {{ size }}
                    </div>

                </form>

            </div>
            <hr class="kiss-width-1-1 kiss-margin-remove">
            <div class="kiss-padding kiss-padding-remove-bottom kiss-bgcolor-contrast kiss-size-small" v-if="item">
                <div>

                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-size-4 kiss-margin-small-right kiss-flex" title="ID"><icon>adjust</icon></div>
                        <div class="kiss-text-truncate kiss-text-bold kiss-text-monospace kiss-size-small kiss-flex-1">{{ item._id }}</div>
                        <a :title="t('Copy')" @click="copyID()"><icon>copy</icon></a>
                    </div>

                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Created at')"><icon>more_time</icon></div>
                        <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1">{{ (new Date(item._created * 1000).toLocaleString()) }}</div>
                        <div><icon>account_circle</icon></div>
                    </div>

                    <div class="kiss-flex kiss-flex-middle" v-if="item._created != item._modified">
                        <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Modified at')"><icon>history</icon></div>
                        <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1">{{ (new Date(item._modified * 1000).toLocaleString()) }}</div>
                        <div><icon>account_circle</icon></div>
                    </div>
            </div>
            <div class="kiss-padding kiss-bgcolor-contrast">
                <div class="kiss-button-group kiss-flex kiss-child-width-1-2">
                    <button class="kiss-button" kiss-offcanvas-close>{{ t('Close') }}</button>
                    <button class="kiss-button kiss-button-primary" :disabled="!item || loading" @click="update()">{{ t('Update') }}</button>
                </div>
            </div>
        </div>
    `,

    methods: {

        copyID() {
            App.utils.copyText(this.item._id, () =>  App.ui.notify('ID copied!'));
        },

        copyColor(color) {
            App.utils.copyText(color, () =>  App.ui.notify('Color copied!'));
        },

        replace() {

        },

        setFocalPoint(e) {

            this.item.fp = {
                x: (e.offsetX / e.target.offsetWidth),
                y: (e.offsetY / e.target.offsetHeight)
            };
        },

        update() {

            this.$request('/assets/update', {asset: this.item}).then(asset => {

                Object.assign(this.item, asset);
                this.$call('update', asset);
                App.ui.notify('Asset updated!');
            }).catch(rsp => {
                App.ui.notify(rsp.error || 'Updating asset failed!', 'error');
            });
        }
    }
}