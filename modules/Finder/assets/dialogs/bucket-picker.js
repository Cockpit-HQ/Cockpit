export default {

    data() {

        return {
            uuid: App.utils.uuid(),
            loading: true,
            uploading: false,
            currentpath: '/',
            files: [],
            folders: [],
            selected: [],

            actionFolder: null,
            actionFile: null,

            selectedFile: null,

            filter: ''
        }
    },

    props: {

        bucket: {
            type: String,
            default: null
        },

        selectFile: {
            default: null
        },

        type: {
            default: null
        }
    },

    mounted() {

        if (!this.bucket) {
            return;
        }

        this.loadpath();

        const el = document.getElementById(this.uuid);

        el.addEventListener('dragover', e => e.preventDefault());
        el.addEventListener('drop', e => {

            if (!e.dataTransfer.files) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            this.uploadFiles(e.dataTransfer.files);
        });
    },

    computed: {

        breadcrumbs() {

            let breadcrumbs = [];
            let parts   = this.currentpath.split('/');
            let tmppath = [];

            for (let i=0; i<parts.length; i++) {

                if (!parts[i]) continue;

                tmppath.push(parts[i]);
                breadcrumbs.push({
                    name:parts[i],
                    path:tmppath.join('/')
                });
            }

            return breadcrumbs;
        },

        filteredFiles() {

            if (!this.filter.trim() && !this.type) {
                return this.files;
            }

            return this.files.filter(file => {

                if (this.filter && !file.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                    return false;
                }

                if (this.type && file.type !== this.type) {
                    return false;
                }

                return true;
            });
        },

        filteredFolders() {

            if (!this.filter.trim()) {
                return this.folders;
            }

            return this.folders.filter(folder => {

                if (!folder.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                    return false;
                }

                return true;
            });
        }
    },

    methods: {

        loadpath(path) {

            path = path || this.currentpath;

            this.loading = true;
            this.selectedFile = null;

            this.$request(`/finder/buckets/api/${this.bucket}`, {cmd: 'ls', path}).then(rsp => {

                this.currentpath = path;
                this.files = rsp.files || [];
                this.folders = rsp.folders || [];
                this.selected = [];
                this.filter = '';

                this.loading = false;
            });
        },

        toggleAllSelect(e) {

            this.selected = [];

            if (e.target.checked) {
                this.files.forEach(file => this.selected.push(file.path));
            }
        },


        toggleFileActions(file) {

            if (!file) {
                return setTimeout(() => this.actionFile = null, 300);
            }

            this.actionFile = file;
        },

        toggleFolderActions(folder) {

            if (!folder) {
                return setTimeout(() => this.actionFolder = null, 300);
            }

            this.actionFolder = folder;
        },

        download(file) {
            window.open(this.$route(`/finder/uploads/api?cmd=download&path=${file.path}`));
        },

        createFolder() {

            App.ui.prompt('Please enter a folder name:', '', name => {

                if (name.trim()) {

                    this.$request(`/finder/buckets/api/${this.bucket}`, {cmd: 'createfolder', path: this.currentpath, name}).then(() => {
                        this.loadpath();
                    });
                }
            });
        },

        rename(item) {

            App.ui.prompt('Please enter a name:', item.name, name => {

                if (name !== item.name && name.trim()) {

                    this.selectedFile = null;

                    this.$request(`/finder/buckets/api/${this.bucket}`, {cmd: 'rename', path: item.path, name}).then(() => {

                        item.path = item.path.replace(item.name, name);
                        item.name = name;
                    });
                }
            });
        },

        remove(item) {

            App.ui.confirm('Are you sure?', () => {

                this.$request(`/finder/buckets/api/${this.bucket}`, {cmd: 'removefiles', paths: [item.path]}).then(() => {

                    const index = this[item.is_file ? 'files':'folders'].indexOf(item);

                    this[item.is_file ? 'files':'folders'].splice(index, 1);
                    this.selected = [];

                    this.selectedFile = null;

                    App.ui.notify('Item(s) deleted', 'success');
                });
            });
        },

        removeSelected() {

            App.ui.confirm('Are you sure?', () => {

                this.$request(`/finder/buckets/api/${this.bucket}`, {cmd:'removefiles', paths: this.selected}).then(() => {
                    this.loadpath();
                    App.ui.notify('File(s) deleted', 'success');
                });
            });
        },

        uploadFiles(files) {

            let formData = new FormData();
            let xhr = new XMLHttpRequest();

            let size = 0;

            [...files].forEach((file, i) => {
                size += file.size;
                formData.append('files[]', files[i]);
            });

            if (size >= App._vars.maxUploadSize) {
                return App.ui.notify('File(s) size exceeds max upload size limit!', 'error');
            }

            formData.append('cmd', 'upload');
            formData.append('path', this.currentpath);

            xhr.open('POST', App.route(`/finder/buckets/api/${this.bucket}`));

            this.uploading = 0;

            xhr.upload.addEventListener('progress', ({loaded, total}) => {
                this.uploading = Math.round((loaded/total) * 100);
            });

            xhr.addEventListener('loadend', () => {

                this.uploading = false;

                if (xhr.status === 200) {
                    this.loadpath();
                }
            });

            xhr.addEventListener('error', () => {
                App.ui.notify('Upload failed!', 'error');
            });

            xhr.send(formData);
        }
    },

    template: /*html*/`
    <div :id="uuid">

        <div class="kiss-size-4">
            <span class="kiss-color-muted">Bucket:</span> {{ bucket }}
        </div>

        <div :class="{'kiss-disabled':loading}">
            <ul class="kiss-breadcrumbs">
                <li><a @click="loadpath('/')"><icon size="larger">home</icon></a></li>
                <li v-for="f in breadcrumbs"><a @click="loadpath(f.path)">{{ f.name }}</a></li>
            </ul>
        </div>

        <app-loader v-if="loading"></app-loader>

        <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin-large" v-if="!loading && !folders.length && !files.length">
            <div>
                <kiss-svg class="kiss-margin-auto" :src="$base('finder:icon.svg')" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                <p class="kiss-size-large kiss-text-bold kiss-margin-small-top">{{ t('Empty') }}</p>
            </div>
        </div>

        <div v-if="!loading && (folders.length || files.length)">

            <div class="kiss-margin">
                <input type="text" class="kiss-input" :placeholder="t('Filter files & folders...')" v-model="filter">
            </div>

            <div class="kiss-dialog-overflow" :expand="true">

                <kiss-grid cols="2@m 3@xl" class="kiss-margin-bottom" gap="small" v-if="folders.length">

                    <kiss-card class="kiss-flex kiss-flex-middle" theme="shadowed contrast" v-for="folder in filteredFolders">
                        <div class="kiss-padding kiss-bgcolor-contrast"><icon size="larger">folder</icon></div>
                        <div class="kiss-padding kiss-text-truncate kiss-flex-1 kiss-text-bold kiss-size-small">
                            <a class="kiss-link-muted" @click="loadpath(currentpath+'/'+folder.name)">{{ folder.name }}</a>
                        </div>
                        <a class="kiss-padding" @click="toggleFolderActions(folder)"><icon>more_horiz</icon></a>
                    </kiss-card>

                </kiss-grid>

                <kiss-grid cols="2@s 3@m 4@xl" class="spotlight-group" gap="small" v-if="!loading && files.length" match="true" hover="shadow">

                    <kiss-card class="kiss-position-relative kiss-bgcolor-contrast" theme="bordered" :style="{borderColor: (selectedFile && selectedFile.path === file.path && 'var(--kiss-color-primary)') || null}" v-for="file in filteredFiles">
                        <div class="kiss-position-relative" :class="{'kiss-bgcolor-transparentimage': file.type === 'image'}">
                            <canvas width="400" height="300"></canvas>
                            <div class="kiss-cover kiss-padding kiss-flex kiss-flex-middle kiss-flex-center">
                                <div v-if="file.type === 'image'">
                                    <display-image class="kiss-display-block" :src="'uploads://buckets/'+bucket+'/'+file.path" w="400" h="300"></display-image>
                                </div>
                                <span class="kiss-color-muted kiss-size-large kiss-text-upper" v-if="file.type !== 'image'">{{ file.ext }}</span>
                            </div>
                            <a class="kiss-cover" @click="selectedFile=file"></a>
                        </div>
                        <div class="kiss-padding kiss-flex kiss-flex-middle">
                            <div><input class="kiss-checkbox" type="checkbox" v-model="selected" :value="file.path"></div>
                            <div class="kiss-margin-small-left kiss-text-truncate kiss-size-xsmall kiss-flex-1" :title="file.name">{{ App.utils.truncate(file.name, 15) }}</div>
                            <a class="kiss-margin-small-left" @click="toggleFileActions(file)"><icon>more_horiz</icon></a>
                        </div>
                    </kiss-card>

                </kiss-grid>

            </div>

        </div>

        <div :class="{'kiss-disabled':loading}">
            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-margin-right" v-if="selected.length">
                    <button class="kiss-button kiss-button-danger" @click="removeSelected()">{{ t('Delete') }} -{{ selected.length }}-</button>
                </div>
                <div class="kiss-button-group kiss-margin-right">
                    <button class="kiss-button" @click="createFolder()">{{ t('Create folder') }}</button>
                    <button class="kiss-button kiss-overlay-input" :disabled="uploading">
                        {{ t('Upload file') }}
                        <input type="file" name="files[]" @change="(e) => {uploadFiles(e.target.files)}" multiple v-if="!uploading" />
                    </button>
                </div>
                <div class="kiss-flex-1 kiss-margin-right"></div>
                <div class="kiss-button-group">
                    <button class="kiss-button" autofocus kiss-dialog-close>{{ t('Cancel') }}</button>
                    <button class="kiss-button kiss-button-primary" v-if="selectedFile" @click="selectFile && selectFile(selectedFile)" kiss-dialog-close>{{ t('Select file') }}</button>
                </div>
            </div>
        </div>

        <teleport to="body">
            <kiss-popout :open="actionFile && 'true'" @popoutclose="toggleFileActions(null)">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul v-if="actionFile">
                            <li class="kiss-nav-header">{{ t('File actions') }}</li>
                            <li>
                                <div class="kiss-color-muted kiss-text-truncate kiss-margin-small-bottom">{{ App.utils.truncate(actionFile.name, 30) }}</div>
                            </li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" @click="rename(actionFile)">
                                    <icon class="kiss-margin-small-right" size="larger">drive_file_rename_outline</icon>
                                    {{ t('Rename') }}
                                </a>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" :href="actionFile.url" target="_blank" :download="actionFile.name">
                                    <icon class="kiss-margin-small-right" size="larger">cloud_download</icon>
                                    {{ t('Download') }}
                                </a>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li>
                                <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionFile)">
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
                                <a class="kiss-flex kiss-flex-middle" @click="rename(actionFolder)">
                                    <icon class="kiss-margin-small-right" size="larger">drive_file_rename_outline</icon>
                                    {{ t('Rename') }}
                                </a>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li>
                                <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionFolder)">
                                    <icon class="kiss-margin-small-right" size="larger">delete</icon>
                                    {{ t('Delete') }}
                                </a>
                            </li>
                        </ul>
                    </kiss-navlist>
                </kiss-content>
            </kiss-popout>

            <app-loader-cover v-if="uploading !== false" :label="uploading+'%'"></app-loader-cover>

        </teleport>
    </div>
    `

}
