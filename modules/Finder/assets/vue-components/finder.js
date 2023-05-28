export default {

    data() {

        return {
            loading: true,
            uploading: false,
            currentpath: App.session.get(`finder.persist.${this.root}`, this.root),
            files: [],
            folders: [],
            selected: [],

            actionFolder: null,
            actionFile: null,

            filter: ''
        }
    },

    props: {
        root: {
            type: String,
            default: '/'
        },

        modal: {
            type: Boolean,
            default: false
        }
    },

    mounted() {

        this.loadpath();

        App.assets.require([
            'assets:assets/vendor/spotlight/spotlight.bundle.js',
            'assets:assets/vendor/spotlight/css/spotlight.min.css',
        ]);

        if (!this.modal) {

            document.body.addEventListener('dragover', e => e.preventDefault());
            document.body.addEventListener('drop', e => {

                if (!e.dataTransfer.files) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();
                this.uploadFiles(e.dataTransfer.files);
            });
        }
    },

    computed: {

        breadcrumbs() {

            let breadcrumbs = [];
            let parts   = this.currentpath.split('/');
            let tmppath = [];

            for(let i=0;i<parts.length;i++){

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

            if (!this.filter.trim()) {
                return this.files;
            }

            return this.files.filter(file => {

                if (!file.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
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

            this.$request('/finder/api', {cmd: 'ls', path}).then(rsp => {

                this.currentpath = path;
                this.files = rsp.files || [];
                this.folders = rsp.folders || [];
                this.selected = [];
                this.filter = '';

                this.loading = false;

                App.session.set(`finder.persist.${this.root}`, path);
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
                setTimeout(() => this.actionFile = null, 300);
                return;
            }

            this.actionFile = file;
        },

        toggleFolderActions(folder) {

            if (!folder) {
                setTimeout(() => this.actionFolder = null, 300);
                return;
            }

            this.actionFolder = folder;
        },

        download(file) {
            window.open(this.$route(`/finder/api?cmd=download&path=${file.path}`));
        },

        createFolder() {

            App.ui.prompt('Please enter a folder name:', '', name => {

                if (name.trim()) {

                    this.$request('/finder/api', {cmd: 'createfolder', path: this.currentpath, name}).then(() => {
                        this.loadpath();
                    });
                }
            });
        },

        createFile() {

            App.ui.prompt('Please enter a file name:', '', name => {

                if (name.trim()) {

                    this.$request('/finder/api', {cmd: 'createfile', path: this.currentpath, name}).then(() => {
                        this.loadpath();
                    });
                }
            });
        },

        edit(file) {

            VueView.ui.offcanvas('finder:assets/dialogs/file-editor.js', {file}, {


            }, {flip: true, size: 'xxlarge'})
        },

        rename(item) {

            App.ui.prompt('Please enter a name:', item.name, name => {

                if (name !== item.name && name.trim()) {

                    this.$request('/finder/api', {cmd: 'rename', path: item.path, name}).then(() => {

                        item.path = item.path.replace(item.name, name);
                        item.name = name;
                    });
                }
            });
        },

        remove(item) {

            App.ui.confirm('Are you sure?', () => {

                this.$request('/finder/api', {cmd: 'removefiles', paths: [item.path]}).then(() => {

                    const index = this[item.is_file ? 'files':'folders'].indexOf(item);

                    this[item.is_file ? 'files':'folders'].splice(index, 1);
                    this.selected = [];

                    App.ui.notify('Item(s) deleted', 'success');
                });
            });
        },

        removeSelected() {

            App.ui.confirm('Are you sure?', () => {

                this.$request('/finder/api', {cmd:'removefiles', paths: this.selected}).then(() => {
                    this.loadpath();
                    App.ui.notify('File(s) deleted', 'success');
                });
            });
        },

        open(file) {

            if (file.mime.indexOf('text') > -1 || ['json', 'svg'].includes(file.ext)) {
                return this.edit(file);
            }

            if (file.mime.match('(image|video|audio)') && window.Spotlight) {
                Spotlight.show([{ src: file.url }]);
            }
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

            xhr.open('POST', App.route('/finder/api'));

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
        <div :class="{'kiss-disabled':loading}">
            <ul class="kiss-breadcrumbs">
                <li><a @click="loadpath(root)"><icon size="larger">home</icon></a></li>
                <li v-for="f in breadcrumbs"><a @click="loadpath(f.path)">{{ f.name }}</a></li>
            </ul>
        </div>

        <app-loader v-if="loading"></app-loader>

        <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin-large" v-if="!loading && !folders.length && !files.length">
            <div>
                <kiss-svg class="kiss-margin-auto" src="<?= $this->base('finder:icon.svg') ?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                <p class="kiss-size-large kiss-text-bold kiss-margin-small-top">{{ t('Empty') }}</p>
            </div>
        </div>

        <div v-if="!loading && (folders.length || files.length)">

            <div class="kiss-margin">
                <input type="text" class="kiss-input" :placeholder="t('Filter files & folders...')" v-model="filter">
            </div>

            <kiss-grid cols="4@m 5@xl" class="kiss-margin-bottom" gap="small" v-if="folders.length">

                <kiss-card class="kiss-flex kiss-flex-middle" theme="shadowed contrast" v-for="folder in filteredFolders">
                    <div class="kiss-padding kiss-bgcolor-contrast"><icon size="larger">folder</icon></div>
                    <div class="kiss-padding kiss-text-truncate kiss-flex-1 kiss-text-bold kiss-size-small">
                        <a class="kiss-link-muted" @click="loadpath(currentpath+'/'+folder.name)">{{ folder.name }}</a>
                    </div>
                    <a class="kiss-padding" @click="toggleFolderActions(folder)"><icon>more_horiz</icon></a>
                </kiss-card>

            </kiss-grid>

            <table class="kiss-table animated fadeIn" v-if="files.length">
                <thead>
                    <tr>
                        <th width="30"><input class="kiss-checkbox" type="checkbox" @click="toggleAllSelect"></th>
                        <th width="10"></th>
                        <th>{{ t('Name') }}</th>
                        <th class="kiss-align-right" width="10%">{{ t('Size') }}</th>
                        <th class="kiss-align-right" width="100">{{ t('Updated') }}</th>
                        <th width="30"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="file in filteredFiles">
                        <td><input class="kiss-checkbox" type="checkbox" v-model="selected" :value="file.path"></td>
                        <td class="kiss-align-center"><a @click="download(file)"><icon size="larger">cloud_download</icon></a></td>
                        <td class="kiss-position-relative">
                            {{ file.name }}
                            <a class="kiss-cover" @click="open(file)"></a>
                        </td>
                        <td class="kiss-align-right kiss-text-monospace kiss-color-muted">{{ file.size }}</td>
                        <td class="kiss-align-right kiss-color-muted"><span class="kiss-display-block kiss-align-center kiss-badge kiss-badge-outline kiss-color-muted">{{ file.lastmodified }}</span></td>
                        <td class="kiss-align-right"><a class="kiss-padding" @click="toggleFileActions(file)"><icon>more_horiz</icon></a></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <app-actionbar :class="{'kiss-disabled':loading}">
            <kiss-container>
                <div class="kiss-flex kiss-flex-middle">
                    <div class="kiss-margin-right" v-if="selected.length">
                        <button class="kiss-button kiss-button-danger" @click="removeSelected()">{{ t('Delete') }} -{{ selected.length }}-</button>
                    </div>
                    <div class="kiss-flex-1 kiss-margin-right"></div>
                    <div class="kiss-button-group">
                        <button class="kiss-button" @click="createFolder()">{{ t('Create folder') }}</button>
                        <button class="kiss-button" @click="createFile()">{{ t('Create file') }}</button>
                        <button class="kiss-button kiss-button-primary kiss-overlay-input" :disabled="uploading">
                            {{ t('Upload file') }}
                            <input type="file" name="files[]" @change="(e) => {uploadFiles(e.target.files)}" multiple v-if="!uploading" />
                        </button>
                    </div>
                </div>
            </kiss-container>
        </app-actionbar>

        <teleport to="body">
            <kiss-popout :open="actionFile && 'true'" @popoutclose="toggleFileActions(null)">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul>
                            <li class="kiss-nav-header">{{ t('File actions') }}</li>
                            <li v-if="actionFile">
                                <div class="kiss-color-muted kiss-text-truncate kiss-margin-small-bottom">{{ App.utils.truncate(actionFile.name, 30) }}</div>
                            </li>
                            <li v-if="actionFile && (actionFile.mime.indexOf('text') > -1 || ['json', 'svg'].includes(actionFile.ext))">
                                <a class="kiss-flex kiss-flex-middle" @click="edit(actionFile)">
                                    <icon class="kiss-margin-small-right" size="larger">create</icon>
                                    {{ t('Edit') }}
                                </a>
                            </li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" @click="rename(actionFile)">
                                    <icon class="kiss-margin-small-right" size="larger">drive_file_rename_outline</icon>
                                    {{ t('Rename') }}
                                </a>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" @click="download(actionFile)">
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
                                <a class="kiss-flex kiss-flex-middle" @click="download(actionFolder)">
                                    <icon class="kiss-margin-small-right" size="larger">cloud_download</icon>
                                    {{ t('Download') }}
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
    `

}
