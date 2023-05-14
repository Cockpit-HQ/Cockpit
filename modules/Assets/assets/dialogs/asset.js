export default {

    data() {

        return {
            item: null,
            loading: true,
            focalPointing: false,
            folders: null
        }
    },

    props: {
        asset: {
            type: Object
        }
    },

    mounted() {

        this.loading = true;

        App.assets.require([
            'assets:assets/vendor/uppy/uppy.js',
            'assets:assets/css/uppy.css',
            'assets:assets/css/asset.css',
        ]).then(() => {
            this.uppy = true;
        })

        this.$request(`/assets/asset/${this.asset._id}`, {asset:this.asset}).then(asset => {
            this.item = asset;
            this.loading = false;
        }).catch(rsp => {
            App.ui.notify(rsp.error || 'Asset not found!', 'error');
        });

        this.$request(`/assets/folders`, {nc:Math.random()}).then(folders => {
            this.folders = folders;
        }).catch(rsp => {
            App.ui.notify(rsp.error || 'Loading folders failed!', 'error');
        });
    },

    computed: {

        folder() {

            if (this.item && Array.isArray(this.folders) && this.folders.length) {
                return this.folders.find(folder => folder._id == this.item.folder) || null;
            }

            return null;
        },

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

                    <div class="kiss-bgcolor-contrast kiss-position-relative kiss-padding" :class="{'kiss-bgcolor-transparentimage': item.type == 'image'}">
                        <canvas width="400" height="150"></canvas>
                        <div class="kiss-cover kiss-align-center kiss-flex kiss-flex-middle kiss-flex-center">
                            <asset-preview :asset="item"></asset-preview>
                        </div>
                        <div class="kiss-cover kiss-padding-small" v-if="!focalPointing">
                            <span class="kiss-badge">{{ item.mime }}</span>
                        </div>
                        <a class="kiss-cover" :href="$base('#uploads:'+item.path)" target="_blank" rel="noopener" v-if="!focalPointing"></a>
                        <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center" v-if="focalPointing">
                            <div class="kiss-display-inline-block kiss-position-relative" style="height:100%;" @click="setFocalPoint">
                                <canvas class="kiss-responsive-height" :width="asset.width" :height="asset.height"></canvas>
                                <div class="kiss-position-absolute" style="pointer-events:none;" :style="focalPoint">
                                    <div class="asset-focalpoint-pointer"></div>
                                </div>
                            </div>
                        </div>
                        <div class="kiss-position-absolute kiss-position-bottom-right kiss-padding-small">
                            <button type="button" class="kiss-button kiss-button-small" @click="uploadAsset" v-if="!focalPointing"><icon>upload</icon></button>
                            <button type="button" class="kiss-button kiss-button-small kiss-margin-xsmall-left" :class="{'kiss-bgcolor-warning': focalPointing}" :title="t('Set focal point')" @click="focalPointing = !focalPointing" v-if="item.type == 'image'"><icon>gps_fixed</icon></button>
                        </div>
                    </div>

                    <div class="kiss-margin-small kiss-flex kiss-flex-middle">
                        <div class="kiss-margin-small-right kiss-color-muted kiss-text-monospace kiss-size-small kiss-flex-1">
                            {{ size }} <span v-if="item.type=='image' && item.mime!='image/svg+xml'">&mdash; {{ item.width }}x{{ item.height }}</span>
                        </div>
                        <div v-if="item.type == 'image' && Array.isArray(item.colors) && item.colors.length">
                            <div class="kiss-size-4">
                                <a class="kiss-margin-xsmall-right" :style="{color}" :title="color" @click="copyColor(color)" v-for="color in item.colors"><icon>invert_colors</icon></a>
                            </div>
                        </div>
                    </div>

                    <app-fieldcontainer v-if="Array.isArray(folders) && folders.length">
                        <label>{{ t('Folder') }}</label>
                        <div class="kiss-overlay-input kiss-display-block">
                            <kiss-card class="kiss-flex kiss-flex-middle" theme="shadowed contrast">
                                <div class="kiss-padding kiss-bgcolor-contrast"><icon size="larger">folder</icon></div>
                                <div class="kiss-padding kiss-text-truncate kiss-flex-1" :class="{'kiss-color-muted kiss-text-caption': !folder, 'kiss-text-bold': folder}">
                                    {{ (folder && folder.name) || t('Assign folder') }}
                                </div>
                            </kiss-card>
                            <select v-model="item.folder">
                                <option vlaie="">- {{ t('none') }} -</option>
                                <option v-for="f in folders" :value="f._id">{{ (new Array(f._depth+1).join('-'))}} {{ f.name }}</option>
                            </select>
                        </div>
                    </app-fieldcontainer>

                    <fields-renderer class="kiss-margin" v-model="item" :fields="[{name:'title', type:'text'},{name:'description', type:'text', opts: {multiline:true, height:200}},{name:'tags', type:'tags'}]"></fields-renderer>

                </form>

            </div>
            <hr class="kiss-width-1-1 kiss-margin-remove">
            <div class="kiss-padding kiss-padding-remove-bottom kiss-bgcolor-contrast" v-if="item">
                <div class="kiss-size-small">

                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-size-4 kiss-margin-small-right kiss-flex" title="ID"><icon>adjust</icon></div>
                        <div class="kiss-text-truncate kiss-text-bold kiss-text-monospace kiss-size-small kiss-flex-1">
                            {{ item._id }}
                            </div>
                        <a class="kiss-margin-xsmall-right" :title="t('Copy asset link')" @click="copyAssetLinkID()"><icon>share</icon></a>
                        <a :title="t('Copy')" @click="copyID()"><icon>copy</icon></a>
                    </div>

                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Created at')"><icon>more_time</icon></div>
                        <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1">{{ (new Date(item._created * 1000).toLocaleString()) }}</div>
                        <user-info :user-id="item._cby"></user-info>
                    </div>

                    <div class="kiss-flex kiss-flex-middle" v-if="item._created != item._modified">
                        <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Modified at')"><icon>history</icon></div>
                        <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1">{{ (new Date(item._modified * 1000).toLocaleString()) }}</div>
                        <user-info :user-id="item._mby"></user-info>
                    </div>
            </div>
            <div class="kiss-margin-small-top kiss-margin-small-bottom kiss-bgcolor-contrast">
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

        copyAssetLinkID() {
            App.utils.copyText(location.origin + App.route(`/assets/link/${this.item._id}`), () =>  App.ui.notify('Asset link copied!'));
        },

        copyColor(color) {
            App.utils.copyText(color, () =>  App.ui.notify('Color copied!'));
        },

        setFocalPoint(e) {

            this.item.fp = {
                x: (e.offsetX / e.target.offsetWidth),
                y: (e.offsetY / e.target.offsetHeight)
            };
        },

        uploadAsset() {

            if (!window.Uppy) return;

            this.uppy = new Uppy.Uppy({
                meta: {
                    assetId: this.item._id
                },
                autoProceed: false,
                restrictions: {
                    maxFileSize: App._vars.maxUploadSize || null,
                    maxNumberOfFiles: 1,
                    minNumberOfFiles: 1,
                },
                allowMultipleUploadBatches: false
            }).use(Uppy.Dashboard, {
                showProgressDetails: true,
                height: 450,
                browserBackButtonClose: false
            }).use(Uppy.XHRUpload, {
                endpoint: App.route('/assets/replace'),
                bundle: true
            }).use(Uppy.Webcam, { target: Uppy.Dashboard, showVideoSourceDropdown: true })
            .use(Uppy.ScreenCapture, { target: Uppy.Dashboard })
            .use(Uppy.ImageEditor, { target: Uppy.Dashboard });

            this.uppy.on('complete', result => {
                Object.assign(this.item, result.successful[0].response.body)
                this.$call('update', this.item);
                App.ui.notify('Asset file updated!');
            });

            this.uppy.getPlugin('Dashboard').openModal();
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
