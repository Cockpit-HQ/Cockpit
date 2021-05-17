function initUppy() {

    return new Uppy.Core({
        autoProceed: false,
        restrictions: {
            //maxFileSize: 1000000,
            //maxNumberOfFiles: 3,
            minNumberOfFiles: 1,
            //allowedFileTypes: ['image/*', 'video/*']
        }
    }).use(Uppy.Dashboard, {
        showProgressDetails: true,
        //note: 'Images and video only, 2–3 files, up to 1 MB',
        height: 450,
        browserBackButtonClose: false
    }).use(Uppy.XHRUpload, {
        endpoint: App.route('/assets/upload')
    }).use(Uppy.Webcam, { target: Uppy.Dashboard, showVideoSourceDropdown: true })
    .use(Uppy.ScreenCapture, { target: Uppy.Dashboard })
    //.use(Uppy.Url, { target: Uppy.Dashboard, companionUrl: 'https://companion.uppy.io' })
    .use(Uppy.ImageEditor, { target: Uppy.Dashboard });
}


export default {

    data() {
        return {
            ASSETS_BASE_URL: window.ASSETS_BASE_URL,
            assets: [],
            actionAsset: null,
            selected: [],
            selectedAsset: null,
            folders: [],
            folder: null,

            page: 1,
            count: 0,
            pages: 1,
            limit: 15,

            loading: false,
            view: 'assets',
            uppy: null
        }
    },

    props: {
        modal: {
            type: Boolean,
            default: false
        },

        selectAsset: {
            default: null
        }
    },

    mounted() {

        this.load();

        App.assets.require([
            'assets:assets/vendor/uppy/uppy.js',
            'assets:assets/vendor/uppy/uppy.css',

            'assets:assets/vendor/spotlight/spotlight.bundle.js',
            'assets:assets/vendor/spotlight/css/spotlight.min.css',
        ]).then(() => {

            App.assets.require([
                'assets:assets/css/uppy.css',
            ]);

            this.uppy = initUppy();

            this.uppy.on('complete', result => {
                // console.log('successful files:', result.successful)
                // console.log('failed files:', result.failed)
                this.load();
            })

            //this.uppy.getPlugin('Dashboard').openModal()
        }, 1000)
    },

    template: /*html*/`

        <div class="DashboardContainer"></div>

        <div class="kiss-margin-large" v-if="view == 'assets'">

            <app-loader class="kiss-margin-large" v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-margin-large kiss-color-muted kiss-align-center" :class="{'kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center': !modal}" v-if="!loading && !assets.length">
                <div>
                    <kiss-svg :src="$base('assets:icon.svg')" width="35" height="35"><canvas width="35" height="35"></canvas></kiss-svg>
                    <p class="kiss-margin-small-top">{{ t('No assets') }}</p>
                </div>
            </div>

            <kiss-row class="kiss-child-width-1-2 kiss-child-width-1-5@m spotlight-group" v-if="!loading && assets.length" match="true" hover="shadow">
                <div v-for="asset in assets">
                    <kiss-card class="kiss-position-relative" theme="bordered" :style="{borderColor: (selectedAsset && selectedAsset._id == asset._id && 'var(--kiss-color-primary)') || null}">
                        <div class="kiss-bgcolor-contrast kiss-position-relative" :class="{'kiss-bgcolor-transparentimage': asset.type == 'image'}">
                            <canvas width="400" height="300"></canvas>
                            <div class="kiss-cover kiss-padding kiss-flex kiss-flex-middle kiss-flex-center">
                                <div><asset-preview :asset="asset"></asset-preview></div>
                            </div>
                            <a class="kiss-cover spotlight" :href="ASSETS_BASE_URL+asset.path" :data-media="asset.type" :data-title="asset.title" v-if="['image', 'video'].indexOf(asset.type) > -1"></a>
                            <a class="kiss-cover" @click="selectedAsset=asset" v-if="modal"></a>
                        </div>
                        <div class="kiss-padding kiss-flex kiss-flex-middle">
                            <div class="kiss-text-truncate kiss-size-xsmall kiss-flex-1">{{ asset.title }}</div>
                            <a class="kiss-margin-small-left" @click="toggleAssetActions(asset)"><icon>more_horiz</icon></a>
                        </div>
                    </kiss-card>
                </div>
            </kiss-row>

            <div class="kiss-flex kiss-flex-middle kiss-margin-large-top" v-if="modal">
                <div class="kiss-flex kiss-flex-middle" v-if="!loading && count">
                    <div class="kiss-size-small">{{ count}} {{ count == 1 ? t('Item') : t('Items') }}</div>
                    <div class="kiss-margin-small-left kiss-overlay-input">
                        <span class="kiss-badge kiss-badge-outline kiss-color-muted">{{ page }} / {{pages}}</span>
                        <select v-model="page" @change="load(page)" v-if="pages > 1"><option v-for="p in pages" :value="p">{{ p }}</option></select>
                    </div>
                    <div class="kiss-margin-small-left kiss-size-small">
                        <a class="kiss-margin-small-right" v-if="(page - 1) >= 1" @click="load(page - 1)">{{ t('Previous') }}</a>
                        <a v-if="(page + 1) <= pages" @click="load(page + 1)">{{ t('Next') }}</a>
                    </div>
                </div>
                <div class="kiss-flex-1"></div>
                <button class="kiss-button" :disabled="!uppy" @click="uppy.getPlugin('Dashboard').openModal()">{{ t('Upload asset') }}</button>
                <div class="kiss-button-group kiss-margin-left">
                    <button class="kiss-button" kiss-dialog-close>{{ t('Cancel') }}</button>
                    <button class="kiss-button kiss-button-primary" v-if="selectedAsset" @click="selectAsset && selectAsset(selectedAsset)">{{ t('Select asset') }}</button>
                </div>
            </div>

            <app-actionbar v-if="!modal">
                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex kiss-flex-middle" v-if="!loading && count">
                            <div class="kiss-size-small">{{ count}} {{ count == 1 ? t('Item') : t('Items') }}</div>
                            <div class="kiss-margin-small-left kiss-overlay-input">
                                <span class="kiss-badge kiss-badge-outline kiss-color-muted">{{ page }} / {{pages}}</span>
                                <select v-model="page" @change="load(page)" v-if="pages > 1"><option v-for="p in pages" :value="p">{{ p }}</option></select>
                            </div>
                            <div class="kiss-margin-small-left kiss-size-small">
                                <a class="kiss-margin-small-right" v-if="(page - 1) >= 1" @click="load(page - 1)">{{ t('Previous') }}</a>
                                <a v-if="(page + 1) <= pages" @click="load(page + 1)">{{ t('Next') }}</a>
                            </div>
                        </div>
                        <div class="kiss-flex-1"></div>
                        <button class="kiss-button kiss-button-primary" :disabled="!uppy" @click="uppy.getPlugin('Dashboard').openModal()">{{ t('Upload asset') }}</button>
                    </div>
                </kiss-container>
            </app-actionbar>

            <teleport to="body">
                <kiss-popoutmenu :open="actionAsset && 'true'" id="asset-menu-actions" @popoutmenuclose="toggleAssetActions(null)">
                    <kiss-content>
                        <kiss-navlist class="kiss-margin">
                            <ul>
                                <li class="kiss-nav-header">{{ t('Asset actions') }}</li>
                                <li v-if="actionAsset">
                                    <div class="kiss-color-muted kiss-text-truncated kiss-margin-small-bottom">{{ actionAsset.title }}</div>
                                </li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle">
                                        <icon class="kiss-margin-small-right" size="larger">create</icon>
                                        {{ t('Edit') }}
                                    </a>
                                </li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="actionAsset && ASSETS_BASE_URL+actionAsset.path" target="_blank" rel="noopener" download>
                                        <icon class="kiss-margin-small-right" size="larger">cloud_download</icon>
                                        {{ t('Download') }}
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionAsset)">
                                        <icon class="kiss-margin-small-right" size="larger">delete</icon>
                                        {{ t('Delete') }}
                                    </a>
                                </li>
                            </ul>
                        </kiss-navlist>
                    </kiss-content>
                </kiss-popoutmenu>
            </teleport>

        </div>
    `,

    methods: {

        load(page = 1) {

            let options = {
                limit: this.limit,
                skip: (page - 1) * this.limit,
            };

            this.loading = true;
            this.selected = [];
            this.selectedAsset = null;

            this.$request('/assets/assets', {options}).then(rsp => {
                this.assets = rsp.assets;
                this.page = rsp.page;
                this.pages = rsp.pages;
                this.count = rsp.count;

                this.view = 'assets';
                this.loading = false;
            })
        },

        remove(asset) {

            App.ui.confirm('Are you sure?', () => {

                this.$request(`/assets/remove`, {assets: [asset._id]}).then(res => {
                    this.load(this.page == 1 ? 1 : (this.assets.length - 1 ? this.page : this.page - 1));
                    App.ui.notify('Asset removed!');
                });
            });
        },

        removeSelected() {

            App.ui.confirm('Are you sure?', () => {

                this.$request(`/assets/remove`, {assets: this.selected}).then(res => {
                    this.load(this.page == 1 ? 1 : (this.assets.length - this.selected.length ? this.page : this.page - 1));
                    App.ui.notify('Assets removed!');
                });
            });
        },

        toggleAllSelect(e) {

            this.selected = [];

            if (e.target.checked) {
                this.assets.forEach(asset => this.selected.push(asset._id));
            }
        },

        toggleAssetActions(asset) {

            if (!asset) {
                setTimeout(() => this.actionAsset = null, 300);
                return;
            }

            this.actionAsset = asset;
        },
    }

}