export default {

    _meta: {
        size: 'medium',
        flip: true
    },

    data() {
        return {
            val: this.folder ? JSON.parse(JSON.stringify(this.folder)) : {
                name: '',
                _p: this.parent || '',
                icon: null
            },
            folders: null,
            loading: false,
        }
    },

    mounted() {

        this.$request(`/assets/folders`, {nc:Math.random()}).then(folders => {
            this.folders = folders;
        }).catch(rsp => {
            App.ui.notify(rsp.error || 'Loading folders failed!', 'error');
        });
    },

    props: {
        folder: {
            type: Object,
            default: null
        },
        parent: {
            type: String,
            default: ''
        }
    },

    computed: {

        parentFolder() {

            if (this.val._p && Array.isArray(this.folders) && this.folders.length) {
                return this.folders.find(folder => folder._id == this.val._p) || null;
            }

            return null;
        },

        isEdit() {
            return this.folder && !!this.folder._id;
        },

        selectableFolders() {

            if (!this.folders || !this.folders.length) {
                return [];
            }

            if (!this.val._id) {
                return this.folders;
            }

            let exclude = [this.val._id];
            let check = [this.val._id];

            while (check.length) {

                let id = check.pop();
                
                this.folders.forEach(folder => {
                    if (folder._p == id) {
                        exclude.push(folder._id);
                        check.push(folder._id);
                    }
                });
            }

            return this.folders.filter(folder => !exclude.includes(folder._id));
        },

        dialogTitle() {
            return this.isEdit ? this.t('Edit folder') : this.t('Create folder');
        }
    },

    template: /*html*/`
        <div class="app-offcanvas-container">

            <kiss-row class="kiss-flex-middle kiss-padding kiss-text-bold" gap="small">
                <icon class="kiss-size-3">folder</icon>
                <div class="kiss-flex-1">{{ dialogTitle }}</div>
            </kiss-row>

            <div class="app-offcanvas-content kiss-padding kiss-bgcolor-contrast kiss-flex-1">
            
                <div class="kiss-margin">
                    <label class="kiss-text-caption">{{ t('Folder name') }}</label>
                    <input
                        type="text"
                        class="kiss-input kiss-margin-xsmall"
                        v-model="val.name"
                        :placeholder="t('Enter folder name')"
                        required
                        autofocus
                    >
                </div>

                <div class="kiss-margin" :class="{'kiss-disabled': !val._id}" v-if="Array.isArray(folders) && folders.length">
                    <label class="kiss-text-caption">{{ t('Parent folder') }}</label>
                    <kiss-card class="kiss-overlay-input kiss-display-block" hover="bordered-primary" theme="bordered">
                        <kiss-card class="kiss-flex kiss-flex-middle" theme="shadowed contrast">
                            <div class="kiss-padding kiss-bgcolor-contrast"><icon size="larger">folder</icon></div>
                            <div class="kiss-padding kiss-text-truncate kiss-flex-1" :class="{'kiss-color-muted kiss-text-caption': !val._p, 'kiss-text-bold': val._p}">
                                {{ (parentFolder && parentFolder.name) || t('Assign folder') }}
                            </div>
                        </kiss-card>
                        <select v-model="val._p">
                            <option style="font-weight:bold" value="">- {{ t('none') }} -</option>
                            <hr v-if="selectableFolders.length">
                            <option v-for="f in selectableFolders" :value="f._id">{{ (new Array(f._depth+1).join('-'))}} {{ f.name }}</option>
                        </select>
                    </kiss-card>
                </div>

                <div class="kiss-flex">
                    <div class="kiss-flex-1">
                        <label>{{ t('Icon') }}</label>
                        <div class="kiss-size-xsmall kiss-color-muted kiss-margin-xsmall-top">
                            {{ t('Folder icon') }}
                        </div>
                    </div>
                    <div><icon-picker v-model="val.icon" size="30"></icon-picker></div>
                </div>
            </div>

            <div class="kiss-padding kiss-bgcolor-contrast">
                <div class="kiss-button-group kiss-flex kiss-child-width-1-2">
                    <button class="kiss-button" kiss-offcanvas-close :disabled="loading">
                        {{ t('Cancel') }}
                    </button>
                    <button
                        class="kiss-button kiss-button-primary"
                        @click="save"
                        :disabled="loading || !val.name"
                    >
                        <span v-if="loading">{{ t('Saving...') }}</span>
                        <span v-else>{{ t('Save') }}</span>
                    </button>
                </div>
            </div>
        </div>
    `,

    methods: {

        save() {

            if (!this.val.name || !this.val.name.trim()) {
                App.ui.notify('Folder name is required', 'danger');
                return false;
            }

            const invalidChars = /[<>:"|?*]/;
            if (invalidChars.test(this.val.name)) {
                App.ui.notify('Folder name contains invalid characters', 'danger');
                return false;
            }

            this.loading = true;

            this.$request('/assets/saveFolder', {folder: this.val, parent: this.parent}).then(folder => {

                this.$call('save', folder);

                App.ui.notify(
                    this.isEdit ? this.t('Folder updated!') : this.t('Folder created!'),
                    'success'
                );

                this.$close();

            }).catch(rsp => {

                if (rsp.status === 409) {
                    this.errors.name = this.t('A folder with this name already exists in the selected location');
                } else {
                    App.ui.notify(
                        rsp.error || (this.isEdit ? this.t('Updating folder failed!') : this.t('Creating folder failed!')),
                        'error'
                    );
                }

            }).finally(() => {
                this.loading = false;
            });
        }
    }
}
