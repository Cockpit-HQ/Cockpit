export default {

    data()  {
        return {
            loading: true,
            revisions: []
        }
    },

    props: {
        oid: {
            type: String,
            default: false
        },
        current: {
            type: Object,
            default: {}
        }
    },

    mounted() {
        this.load();
    },

    computed: {
        latest() {
            return this.revisions.length ? this.revisions.slice(0, 3) : [];
        }
    },

    methods: {
        load() {

            this.loading = true;

            this.$request(`/system/utils/revisions/${this.oid}?limit=4`).then(revisions => {

                this.revisions = revisions;
                this.loading = false;

            }).catch(rsp => {
                this.saving = false;
                App.ui.notify(rsp.error || 'Loading revisions count failed!', 'error');
            });

        },

        restore(revision) {

            Object.keys(revision.data).forEach(key => {

                if (this.current[key] !== undefined) {
                    this.current[key] = JSON.parse(JSON.stringify(revision.data[key]));
                }
            });
        }
    },

    template: /*html*/`
        <app-loader size="small" v-if="loading"></app-loader>
        <div class="kiss-size-small kiss-color-muted" v-if="!loading && !revisions.length">{{ t('No revisions yet') }}</div>

        <ul class="app-list-items animated fadeIn">
            <li class="kiss-flex" v-for="rev in latest">
                <div class="kiss-flex-1">
                    <div class="kiss-size-small">{{ (new Date(rev._created * 1000).toLocaleString()) }}</div>
                    <div class="kiss-color-muted kiss-size-xsmall">By {{ rev._by && rev._by.user ? rev._by.user : 'n/a' }}</div>
                </div>
                <div>
                    <a @click="restore(rev)"><icon class="kiss-size-4">settings_backup_restore</icon></a>
                </div>
            </li>
        </ul>

        <div class="kiss-margin-top">
            <button type="button" class="kiss-button kiss-button-small">{{ t('Show more revisions') }}</button>
        </div>

    `
}