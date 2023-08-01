export default {

    data() {
        return {
            contents: null,
            loading: true
        }
    },

    props: {
        root: {
            type: String,
            default: null
        },
        file: {
            default: null
        }
    },

    mounted() {

        this.$request('/finder/api', {root: this.root, cmd: 'readfile', path: this.file.path}).then(rsp => {
            this.contents = rsp.contents;
            this.loading = false;
        });
    },

    computed: {
        mode() {

            const ext = this.file.ext.toLowerCase();

            if (['css', 'json', 'js', 'php'].indexOf(ext) > -1) {
                return ext;
            }

            if (['html', 'htm'].indexOf(ext) > -1) {
                return 'html';
            }

            return 'text';
        }
    },

    methods: {

        save() {

            this.$request('/finder/api', {root: this.root, cmd: 'writefile', path: this.file.path, contents: this.contents}).then(ret => {

                if (ret.success === false) {
                    App.ui.notify(ret.error || 'Saving contents failed', 'error');
                    return;
                }

                App.ui.notify('File updated!', 'success');
            });
        },

    },

    template: /*html*/`
        <div class="app-offcanvas-container">

            <div class="kiss-padding kiss-text-bold kiss-flex kiss-flex-middle">
                <icon class="kiss-margin-small-right kiss-size-3" size="larger">create</icon>
                <div class="kiss-flex-1">{{ t('Edit file') }}</div>
                <span class="kiss-badge kiss-badge-outline kiss-color-danger" v-if="!file.is_writable">{{ t('Readonly') }}</span>
            </div>

            <div class="app-offcanvas-content kiss-bgcolor-contrast kiss-flex-1">
                <field-code v-model="contents" :mode="mode" height="auto" v-if="!loading"></field-code>
            </div>

            <div class="kiss-padding kiss-bgcolor-contrast">
                <div class="kiss-button-group kiss-flex">
                    <button class="kiss-button kiss-flex-1" kiss-offcanvas-close>{{ t('Close') }}</button>
                    <button class="kiss-button kiss-flex-1 kiss-button-primary" @click="save()" v-if="file.is_writable">{{ t('Save') }}</button>
                </div>
            </div>

        </div>
    `,

}
