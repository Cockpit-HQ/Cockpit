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
                _id: null,
                icon: null
            },
            loading: false,
        }
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
        isEdit() {
            return this.folder && !!this.folder._id;
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
                    >
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
