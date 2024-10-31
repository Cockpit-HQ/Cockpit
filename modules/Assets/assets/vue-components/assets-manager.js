import {initUppyUploader} from '../js/uppy.js';

export default {

    data() {
        return {
            assets: [],
            selected: [],
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
            limit: App.storage.get('assets.manager.limit', 15),

            sort: App.storage.get('assets.manager.sort', {_created: -1}),
            sortOptions: {title: 'Title', _created: 'Created', size: 'Size'},

            view: App.session.get('assets.manager.view', 'cards'),

            loading: false,
            uppy: null
        }
    },

    props: {

        modal: {
            type: Boolean,
            default: false
        },

        onSelect: {
            default: null
        },

        selectMultiple: {
            type: Boolean,
            default: false
        },

        initFilter: {
            default: null
        }
    },

    computed: {

        selectedAssets() {

            if (!this.selected.length) {
                return [];
            };

            return this.assets.filter(asset => this.selected.indexOf(asset._id) > -1);
        },

        sortDir() {
            return this.sort[Object.keys(this.sort)[0]];
        },

        sortKey() {
            return Object.keys(this.sort)[0];
        }
    },

    mounted() {

        this.load();

        App.assets.require([
            'assets:assets/vendor/spotlight/spotlight.bundle.js',
            'assets:assets/vendor/spotlight/css/spotlight.min.css',
        ]).then(() => {

            if (this.$el.parentNode) {

                this.$el.parentNode.addEventListener('dragover', (evt) => {

                    if (
                        evt.dataTransfer.items &&
                        evt.dataTransfer.items.length > 0 &&
                        evt.dataTransfer.items[0].kind === 'file'
                    ) {
                        if (!this.uppy) {
                            this.uppy = true;
                            this.upload();
                        }
                    }
                });
            }
        });
    },

    watch: {
        filter(val) {
            this.txtFilter = val;
            this.load();
        },
        limit(val) {
            App.storage.set('assets.manager.limit', val);
            this.load();
        },
        sort: {
            deep: true,
            handler(val) {
                App.storage.set('assets.manager.sort', val);
                this.load();
            }
        },
        view(val) {
            App.session.set('assets.manager.view', val);
        }
    },

    methods: {

        async upload() {

            this.uppy = await initUppyUploader({
                folder: this.folder || ''
            });

            this.uppy.on('dashboard:modal-closed', () => {
                this.uppy = null;
            });

            this.uppy.on('complete', result => {

                let failed = [];

                result.successful.forEach(res => {

                    res.response.body.failed.forEach(file => {
                        failed.push(file);
                    });
                });

                if (failed.length) {
                    App.ui.notify(['<strong>'+App.i18n.get('Upload failed for:')+'</strong>', failed.join('<br>')].join('<br>'), 'error');
                }

                this.load();
            })

            this.uppy.openModal();
        },

        load(page = 1) {

            let options = {
                limit: this.limit,
                skip: (page - 1) * this.limit,
                sort: this.sort
            };

            if (this.filter || this.initFilter) {
                options.filter = [this.filter, this.initFilter].filter(f => f);
            }

            this.loading = true;
            this.selected = [];

            this.$request('/assets/assets', {options, folder: this.folder}).then(rsp => {
                this.assets = rsp.assets;
                this.folders = rsp.folders;
                this.page = rsp.page;
                this.pages = rsp.pages;
                this.count = rsp.count;

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

        toggleSelect(asset) {

            if (!this.selectMultiple) {
                this.selected = [];
            }

            if (this.selected.indexOf(asset._id) > -1) {
                this.selected.splice(this.selected.indexOf(asset._id), 1);
                return;
            }

            this.selected.push(asset._id);
        },

        toggleAllSelect(e) {

            this.selected = [];

            if (e.target.checked) {
                this.assets.forEach(asset => this.selected.push(asset._id));
            }
        },

        isSelected(asset) {
            return this.selected.indexOf(asset._id) > -1;
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

            this.filter = '';

            this.load(1);
        },

        copyAssetLinkID(asset) {
            App.utils.copyText(location.origin + App.route(`/assets/link/${asset._id}`), () =>  App.ui.notify('Asset link copied!'));
        },

        updateSortBy(e) {

            let sort = {};
            sort[e.srcElement.value] = this.sortDir;
            this.sort = sort;
        }
    },

    template: /*html*/`

        <div>
            <ul class="kiss-breadcrumbs">
                <li><a @click="openFolder(null)"><icon size="larger">home</icon></a></li>
                <li v-for="f in breadcrumbs"><a @click="openFolder(f)">{{ f.name }}</a></li>
            </ul>
        </div>

        <form class="kiss-margin kiss-flex kiss-flex-middle" v-if="(!loading && (assets.length || folders.length)) || filter" @submit.prevent="filter = txtFilter">
            <input type="text" class="kiss-input kiss-flex-1 kiss-margin-xsmall-right" :placeholder="t('Search for assets or folders')" v-model="txtFilter">

            <div class="kiss-button-group kiss-margin-small-left">
                <button type="button" class="kiss-button" @click="filter = ''" v-if="filter">{{ t('Reset') }}</button>
                <button class="kiss-button kiss-flex">{{ t('Search') }}</button>
            </div>
        </form>

        <div class="kiss-margin" :class="{'kiss-dialog-overflow': modal}" :expand="modal">

            <app-loader v-if="loading"></app-loader>

            <kiss-grid cols="4@m 5@xl" class="kiss-margin-bottom" gap="small" v-if="!loading && folders.length">

                <kiss-card class="kiss-flex kiss-flex-middle" theme="shadowed contrast" v-for="folder in folders">
                    <div class="kiss-padding kiss-bgcolor-contrast"><icon size="larger">folder</icon></div>
                    <div class="kiss-padding kiss-text-truncate kiss-flex-1 kiss-text-bold kiss-position-relative">
                        {{ folder.name }}
                        <a class="kiss-cover" :aria-label="t('Open folder:')+folder.name" @click="openFolder(folder)"></a>
                    </div>
                    <a class="kiss-padding" @click="toggleFolderActions(folder)"><icon>more_horiz</icon></a>
                </kiss-card>

            </kiss-grid>

            <div class="animated fadeIn kiss-margin-large-top kiss-color-muted kiss-align-center" :class="{'kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center': !modal}" v-if="!loading && !assets.length">
                <div>
                    <kiss-svg :src="$baseUrl('assets:icon.svg')" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                    <p class="kiss-margin-small-top kiss-size-large">{{ t('No assets') }}</p>
                </div>
            </div>

            <kiss-grid cols="2@s 5@m 6@xl" class="spotlight-group" gap="small" v-if="!loading && assets.length && view == 'cards'" match="true" hover="shadow">

                    <kiss-card class="kiss-position-relative kiss-bgcolor-contrast" theme="bordered" hover="shadow" :style="{borderColor: isSelected(asset) ? 'var(--kiss-color-primary)' : null}" v-for="asset in assets">
                        <div class="kiss-position-relative" :class="{'kiss-bgcolor-transparentimage': asset.type == 'image'}">
                            <canvas width="400" height="300"></canvas>
                            <div class="kiss-cover kiss-padding kiss-flex kiss-flex-middle kiss-flex-center">
                                <div><asset-preview :asset="asset"></asset-preview></div>
                            </div>
                            <a class="kiss-cover spotlight" :href="$baseUrl('#uploads:'+asset.path)" :data-media="asset.type" :data-title="asset.title" :aria-label="asset.title" v-if="['image', 'video'].indexOf(asset.type) > -1"></a>
                            <a class="kiss-cover" @click="toggleSelect(asset)" :aria-label="asset.title" v-if="modal"></a>
                        </div>
                        <div class="kiss-padding kiss-flex kiss-flex-middle" gap="small">
                            <div v-if="!modal || selectMultiple"><input class="kiss-checkbox" type="checkbox" v-model="selected" :value="asset._id"></div>
                            <div class="kiss-text-truncate kiss-size-xsmall kiss-flex-1"><a class="kiss-link-muted" @click="edit(asset)">{{ asset.title }}</a></div>
                            <a @click="toggleAssetActions(asset)" :aria-label="t('Toggle asset options')"><icon>more_horiz</icon></a>
                        </div>
                    </kiss-card>

            </kiss-grid>

            <table class="kiss-table" v-if="!loading && assets.length && view == 'table'">
                <thead>
                    <tr>
                        <th width="20" v-if="!modal || selectMultiple"><input class="kiss-checkbox kiss-size-6" type="checkbox" @click="toggleAllSelect"></th>
                        <th width="50"></th>
                        <th width="70%">{{ t('Title') }}</th>
                        <th>{{ t('Size') }}</th>
                        <th>{{ t('Mime') }}</th>
                        <th width="20"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="asset in assets" :style="{borderLeft: isSelected(asset) ? '1px var(--kiss-color-primary) solid' : null}">
                        <td v-if="!modal || selectMultiple"><input class="kiss-checkbox" type="checkbox" v-model="selected" :value="asset._id"></td>
                        <td class="kiss-position-relative kiss-padding-small">
                            <asset-preview :asset="asset" max-height="30px"></asset-preview>
                            <a class="kiss-cover spotlight" :href="$baseUrl('#uploads:'+asset.path)" :data-media="asset.type" :data-title="asset.title" :aria-label="asset.title" v-if="!modal && ['image', 'video'].indexOf(asset.type) > -1"></a>
                        </td>
                        <td class="kiss-text-truncate" :class="{'kiss-color-primary': isSelected(asset)}"><a class="kiss-link-muted" @click="modal ? toggleSelect(asset) : edit(asset)">{{ asset.title }}</a></td>
                        <td class="kiss-color-muted kiss-text-monospace">{{ App.utils.formatSize(asset.size) }}</td>
                        <td class="kiss-color-muted kiss-text-monospace">{{ asset.mime }}</td>
                        <td><a @click="toggleAssetActions(asset)" :aria-label="t('Toggle asset options')"><icon>more_horiz</icon></a></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="kiss-flex kiss-flex-middle kiss-margin-large-top" v-if="modal" gap="">
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
                    <div class="kiss-margin-left kiss-overlay-input">
                        <span class="kiss-color-muted">{{ t('Show') }}:</span> {{ limit}}
                        <select v-model="limit">
                            <option v-for="l in [15, 30, 50, 100]" :value="l">{{ l }}</option>
                        </select>
                    </div>
                    <div class="kiss-margin-left">
                        <a @click="sort[sortKey] = sortDir == -1 ? 1 : -1"><icon>{{ sortDir == 1 ? 'arrow_downward':'arrow_upward' }}</icon></a>
                        <div class="kiss-margin-xsmall-left kiss-overlay-input">
                            <span class="kiss-color-muted">{{ sortOptions[sortKey]}}</span>
                            <select @change="updateSortBy">
                                <option v-for="(lbl, key) in sortOptions" :value="key" :selected="key==sortKey">{{ t(lbl) }}</option>
                            </select>
                        </div>
                    </div>
                </app-pagination>
            </div>
            <div class="kiss-flex kiss-flex-middle" gap="" v-if="!loading">
                <a class="kiss-link-muted" :class="view=='cards' ? 'kiss-color-primary' : 'kiss-color-muted'" @click="view='cards'"><icon size="large">grid_view</icon></a>
                <a class="kiss-link-muted" :class="view=='table' ? 'kiss-color-primary' : 'kiss-color-muted'" @click="view='table'"><icon size="large">dns</icon></a>
            </div>
            <div class="kiss-flex-1 kiss-margin-right"></div>
            <div class="kiss-button-group kiss-margin-right">
                <button class="kiss-button" @click="createFolder()">{{ t('Create folder') }}</button>
                <button class="kiss-button" @click="upload()">{{ t('Upload asset') }}</button>
            </div>
            <div class="kiss-button-group">
                <button class="kiss-button" kiss-dialog-close>{{ t('Cancel') }}</button>
                <button class="kiss-button kiss-button-primary" v-if="selected.length" @click="onSelect && onSelect(selectMultiple ? selectedAssets : selectedAssets[0])">{{ t('Select') }}</button>
            </div>
        </div>

        <app-actionbar v-if="!modal">
            <kiss-container>
                <div class="kiss-flex kiss-flex-middle" gap>
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
                            <div class="kiss-margin-left kiss-overlay-input">
                                <span class="kiss-color-muted">{{ t('Show') }}:</span> {{ limit}}
                                <select v-model="limit">
                                    <option v-for="l in [15, 30, 50, 100]" :value="l">{{ l }}</option>
                                </select>
                            </div>
                            <div class="kiss-margin-left">
                                <a @click="sort[sortKey] = sortDir == -1 ? 1 : -1"><icon>{{ sortDir == 1 ? 'arrow_downward':'arrow_upward' }}</icon></a>
                                <div class="kiss-margin-xsmall-left kiss-overlay-input">
                                    <span class="kiss-color-muted">{{ sortOptions[sortKey]}}</span>
                                    <select @change="updateSortBy">
                                        <option v-for="(lbl, key) in sortOptions" :value="key" :selected="key==sortKey">{{ t(lbl) }}</option>
                                    </select>
                                </div>
                            </div>
                        </app-pagination>
                    </div>
                    <div class="kiss-flex kiss-flex-middle" gap="" v-if="!loading">
                        <a class="kiss-link-muted" :class="view=='cards' ? 'kiss-color-primary' : 'kiss-color-muted'" @click="view='cards'"><icon size="large">grid_view</icon></a>
                        <a class="kiss-link-muted" :class="view=='table' ? 'kiss-color-primary' : 'kiss-color-muted'" @click="view='table'"><icon size="large">dns</icon></a>
                    </div>
                    <div class="kiss-flex-1 kiss-margin-right"></div>
                    <div v-if="selected.length">
                        <button type="button" class="kiss-button kiss-button-danger" @click="removeSelected()">{{ t('Delete') }} -{{ selected.length }}-</button>
                    </div>
                    <div class="kiss-button-group">
                        <button class="kiss-button" @click="createFolder()">{{ t('Create folder') }}</button>
                        <button class="kiss-button kiss-button-primary" @click="upload()">{{ t('Upload asset') }}</button>
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
                                <a class="kiss-flex kiss-flex-middle" :href="actionAsset && $baseUrl('#uploads:'+actionAsset.path)" target="_blank" rel="noopener" download>
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
                                    <icon class="kiss-margin-small-right" size="larger">edit</icon>
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
