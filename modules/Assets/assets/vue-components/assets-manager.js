function getUppy(meta = {}) {

    return new Uppy.Uppy({
        meta,
        autoProceed: false,
        restrictions: {
            maxFileSize: App._vars.maxUploadSize || null,
            //maxNumberOfFiles: 3,
            minNumberOfFiles: 1,
            //allowedFileTypes: ['image/*', 'video/*']
        },
        allowMultipleUploadBatches: false
    }).use(Uppy.Dashboard, {
        showProgressDetails: true,
        //note: 'Images and video only, 2–3 files, up to 1 MB',
        height: 450,
        browserBackButtonClose: false
    }).use(Uppy.XHRUpload, {
        endpoint: App.route('/assets/upload'),
        bundle: true
    }).use(Uppy.Webcam, { target: Uppy.Dashboard, showVideoSourceDropdown: true })
    .use(Uppy.ScreenCapture, { target: Uppy.Dashboard })
    //.use(Uppy.Url, { target: Uppy.Dashboard, companionUrl: 'https://companion.uppy.io' })
    .use(Uppy.ImageEditor, { target: Uppy.Dashboard });
}


export default {

    data() {
        return {
            assets: [],
            selected: [],
            selectedAsset: null,
            folders: [],
            folder: null,

            filter: '',
            txtFilter: '',

            breadcrumbs: [],

            actionAsset: null,
            actionFolder: null,

            page: 1,
            count: 0,
            pages: 1,
            limit: 15,

            loading: false,
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
        },

        initFilter: {
            default: null
        }
    },

    mounted() {

        this.load();

        App.assets.require([
            'assets:assets/vendor/uppy/uppy.js',
            'assets:assets/css/uppy.css',

            'assets:assets/vendor/spotlight/spotlight.bundle.js',
            'assets:assets/vendor/spotlight/css/spotlight.min.css',
        ]).then(() => {
            this.uppy = true;
        })
    },

    watch: {
        filter(val) {
            this.txtFilter = val;
            this.load();
        }
    },

    methods: {

        upload() {

            this.uppy = getUppy({
                folder: this.folder || ''
            });

            this.uppy.on('complete', result => {
                // console.log('successful files:', result.successful)
                // console.log('failed files:', result.failed)
                this.load();
            })

            this.uppy.getPlugin('Dashboard').openModal();
        },

        load(page = 1) {

            let options = {
                limit: this.limit,
                skip: (page - 1) * this.limit,
            };

            if (this.filter || this.initFilter) {
                options.filter = [this.filter, this.initFilter].filter(f => f);
            }

            this.loading = true;
            this.selected = [];
            this.selectedAsset = null;

            this.$request('/assets/assets', {options, folder: this.folder}).then(rsp => {
                this.assets = rsp.assets;
                this.folders = rsp.folders;
                this.page = rsp.page;
                this.pages = rsp.pages;
                this.count = rsp.count;

                this.view = 'assets';
                this.loading = false;
            })
        },

        edit(asset) {

            VueView.ui.offcanvas('assets:assets/dialogs/asset.js', {asset}, {

                update: updatedAsset => {
                    Object.assign(asset, updatedAsset)
                }

            }, {flip: true, size: 'large'})
        },

        remove(asset) {

            App.ui.confirm('Are you sure?', () => {

                this.$request(`/assets/remove`, {assets: [asset._id]}).then(res => {
                    this.load(this.page == 1 ? 1 : (this.assets.length - 1 ? this.page : this.page - 1));
                    App.ui.notify('Asset removed!');
                }).catch(rsp => {
                    App.ui.notify(rsp.error || 'Deleting asset failed!', 'error');
                });;
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

        toggleFolderActions(folder) {

            if (!folder) {
                setTimeout(() => this.actionFolder = null, 300);
                return;
            }

            this.actionFolder = folder;
        },

        createFolder() {

            App.ui.prompt(this.t('Foldername'), '', name => {

                this.$request(`/assets/saveFolder`, {name, parent: this.folder}).then(folder => {
                    this.folders.push(folder);
                    App.ui.notify('Folder created!');
                }).catch(rsp => {
                    App.ui.notify(rsp.error || 'Creating folder failed!', 'error');
                });
            });
        },

        renameFolder(folder) {

            App.ui.prompt(this.t('Foldername'), folder.name, name => {

                this.$request(`/assets/saveFolder`, {name, parent: this.folder, folder}).then(f => {
                    Object.assign(folder, f);
                    App.ui.notify('Folder renamed!');
                }).catch(rsp => {
                    App.ui.notify(rsp.error || 'Renaming folder failed!', 'error');
                });
            });
        },

        removeFolder(folder) {

            App.ui.confirm('Are you sure?', () => {

                this.$request(`/assets/removeFolder`, {folder}).then(res => {
                    this.folders.splice(this.folders.indexOf(folder), 1);
                    App.ui.notify('Folder removed!');
                }).catch(rsp => {
                    App.ui.notify(rsp.error || 'Deleting folder failed!', 'error');
                });
            });
        },

        openFolder(folder) {

            this.folder = folder ? folder._id : null;

            if (this.folder) {

                let skip = false;

                this.breadcrumbs = this.breadcrumbs.filter(f => {
                    if (f._id == folder._id) skip = true;
                    return !skip;
                });

                this.breadcrumbs.push(folder);

            } else {
                this.breadcrumbs = [];
            }

            this.load(1);
        },

        copyAssetLinkID(asset) {
            App.utils.copyText(location.origin + App.route(`/assets/link/${asset._id}`), () =>  App.ui.notify('Asset link copied!'));
        },
    },

    template: /*html*/`

        <div>
            <ul class="kiss-breadcrumbs">
                <li><a @click="openFolder(null)"><icon size="larger">home</icon></a></li>
                <li v-for="f in breadcrumbs"><a @click="openFolder(f)">{{ f.name }}</a></li>
            </ul>
        </div>

        <div class="kiss-margin" :class="{'kiss-dialog-overflow': modal}" :expand="modal">

            <app-loader v-if="loading"></app-loader>

            <kiss-grid cols="4@m 5@xl" class="kiss-margin-bottom" gap="small" v-if="!loading && folders.length">

                <kiss-card class="kiss-flex kiss-flex-middle" theme="shadowed contrast" v-for="folder in folders">
                    <div class="kiss-padding kiss-bgcolor-contrast"><icon size="larger">folder</icon></div>
                    <div class="kiss-padding kiss-text-truncate kiss-flex-1 kiss-text-bold">
                        <a class="kiss-link-muted" @click="openFolder(folder)">{{ folder.name }}</a>
                    </div>
                    <a class="kiss-padding" @click="toggleFolderActions(folder)"><icon>more_horiz</icon></a>
                </kiss-card>

            </kiss-grid>

            <form class="kiss-margin kiss-flex kiss-flex-middle" v-if="(!loading && assets.length) || filter" @submit.prevent="filter = txtFilter">
                <input type="text" class="kiss-input kiss-flex-1 kiss-margin-xsmall-right" :placeholder="t('Filter assets...')" v-model="txtFilter">

                <div class="kiss-button-group kiss-margin-small-left">
                    <button type="button" class="kiss-button" @click="filter = ''" v-if="filter">{{ t('Reset') }}</button>
                    <button class="kiss-button kiss-flex">{{ t('Search') }}</button>
                </div>
            </form>

            <div class="animated fadeIn kiss-margin-large kiss-color-muted kiss-align-center" :class="{'kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center': !modal}" v-if="!loading && !assets.length">
                <div>
                    <kiss-svg :src="$base('assets:icon.svg')" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                    <p class="kiss-margin-small-top kiss-size-large">{{ t('No assets') }}</p>
                </div>
            </div>

            <kiss-grid cols="2@s 5@m 6@xl" class="spotlight-group" gap="small" v-if="!loading && assets.length" match="true" hover="shadow">

                    <kiss-card class="kiss-position-relative kiss-bgcolor-contrast" theme="bordered" hover="shadow" :style="{borderColor: (selectedAsset && selectedAsset._id == asset._id && 'var(--kiss-color-primary)') || null}" v-for="asset in assets">
                        <div class="kiss-position-relative" :class="{'kiss-bgcolor-transparentimage': asset.type == 'image'}">
                            <canvas width="400" height="300"></canvas>
                            <div class="kiss-cover kiss-padding kiss-flex kiss-flex-middle kiss-flex-center">
                                <div><asset-preview :asset="asset"></asset-preview></div>
                            </div>
                            <a class="kiss-cover spotlight" :href="$base('#uploads:'+asset.path)" :data-media="asset.type" :data-title="asset.title" v-if="['image', 'video'].indexOf(asset.type) > -1"></a>
                            <a class="kiss-cover" @click="selectedAsset=asset" v-if="modal"></a>
                        </div>
                        <div class="kiss-padding kiss-flex kiss-flex-middle">
                            <div class="kiss-text-truncate kiss-size-xsmall kiss-flex-1"><a class="kiss-link-muted" @click="edit(asset)">{{ App.utils.truncate(asset.title, 25) }}</a></div>
                            <a class="kiss-margin-small-left" @click="toggleAssetActions(asset)"><icon>more_horiz</icon></a>
                        </div>
                    </kiss-card>

            </kiss-grid>

        </div>

        <div class="kiss-flex kiss-flex-middle kiss-margin-large-top" v-if="modal">
            <div class="kiss-flex kiss-flex-middle" v-if="!loading && count">
                <app-pagination>
                    <div class="kiss-color-muted">{{ count }} {{ count == 1 ? t('Item') : t('Items') }}</div>
                    <a class="kiss-margin-small-left" v-if="(page - 1) >= 1" @click="load(page - 1)">{{ t('Previous') }}</a>
                    <div class="kiss-margin-small-left kiss-overlay-input" v-if="count > limit">
                        <strong>{{ page }} &mdash; {{pages}}</strong>
                        <select v-model="page" @change="load(page)" v-if="pages > 1">
                            <option v-for="p in pages" :value="p">{{ p }}</option>
                        </select>
                    </div>
                    <a class="kiss-margin-small-left" v-if="(page + 1) <= pages" @click="load(page + 1)">{{ t('Next') }}</a>
                </app-pagination>
            </div>
            <div class="kiss-flex-1 kiss-margin-right"></div>
            <div class="kiss-button-group kiss-margin-right">
                <button class="kiss-button" @click="createFolder()">{{ t('Create folder') }}</button>
                <button class="kiss-button" :disabled="!uppy" @click="upload()">{{ t('Upload asset') }}</button>
            </div>
            <div class="kiss-button-group">
                <button class="kiss-button" kiss-dialog-close>{{ t('Cancel') }}</button>
                <button class="kiss-button kiss-button-primary" v-if="selectedAsset" @click="selectAsset && selectAsset(selectedAsset)">{{ t('Select asset') }}</button>
            </div>
        </div>

        <app-actionbar v-if="!modal">
            <kiss-container>
                <div class="kiss-flex kiss-flex-middle">
                    <div class="kiss-flex kiss-flex-middle" v-if="!loading && count">
                        <app-pagination>
                            <div class="kiss-color-muted">{{ count }} {{ count == 1 ? t('Item') : t('Items') }}</div>
                            <a class="kiss-margin-small-left" v-if="(page - 1) >= 1" @click="load(page - 1)">{{ t('Previous') }}</a>
                            <div class="kiss-margin-small-left kiss-overlay-input" v-if="count > limit">
                                <strong>{{ page }} &mdash; {{pages}}</strong>
                                <select v-model="page" @change="load(page)" v-if="pages > 1">
                                    <option v-for="p in pages" :value="p">{{ p }}</option>
                                </select>
                            </div>
                            <a class="kiss-margin-small-left" v-if="(page + 1) <= pages" @click="load(page + 1)">{{ t('Next') }}</a>
                        </app-pagination>
                    </div>
                    <div class="kiss-flex-1 kiss-margin-right"></div>
                    <div class="kiss-button-group">
                        <button class="kiss-button" @click="createFolder()">{{ t('Create folder') }}</button>
                        <button class="kiss-button kiss-button-primary" :disabled="!uppy" @click="upload()">{{ t('Upload asset') }}</button>
                    </div>
                </div>
            </kiss-container>
        </app-actionbar>

        <teleport to="body">
            <kiss-popout :open="actionAsset && 'true'" @popoutclose="toggleAssetActions(null)">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul>
                            <li class="kiss-nav-header">{{ t('Asset actions') }}</li>
                            <li v-if="actionAsset">
                                <div class="kiss-color-muted kiss-text-truncate kiss-margin-small-bottom">{{ App.utils.truncate(actionAsset.title, 30) }}</div>
                            </li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" @click="edit(actionAsset)">
                                    <icon class="kiss-margin-small-right" size="larger">create</icon>
                                    {{ t('Edit') }}
                                </a>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" @click="copyAssetLinkID(actionAsset)">
                                    <icon class="kiss-margin-small-right" size="larger">share</icon>
                                    {{ t('Copy asset link') }}
                                </a>
                            </li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" :href="actionAsset && $base('#uploads:'+actionAsset.path)" target="_blank" rel="noopener" download>
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
            </kiss-popout>

            <kiss-popout :open="actionFolder && 'true'" @popoutclose="toggleFolderActions(null)">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul>
                            <li class="kiss-nav-header">{{ t('Folder actions') }}</li>
                            <li v-if="actionFolder">
                                <div class="kiss-color-muted kiss-text-truncate kiss-margin-small-bottom">{{ actionFolder.name }}</div>
                            </li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" @click="renameFolder(actionFolder)">
                                    <icon class="kiss-margin-small-right" size="larger">drive_file_rename_outline</icon>
                                    {{ t('Rename') }}
                                </a>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li>
                                <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="removeFolder(actionFolder)">
                                    <icon class="kiss-margin-small-right" size="larger">delete</icon>
                                    {{ t('Delete') }}
                                </a>
                            </li>
                        </ul>
                    </kiss-navlist>
                </kiss-content>
            </kiss-popout>

        </teleport>
    `
}
