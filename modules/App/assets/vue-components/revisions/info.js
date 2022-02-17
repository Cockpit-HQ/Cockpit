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
        }
    },

    mounted() {
        this.load();
    },

    methods: {
        load() {

            this.loading = true;

            this.$request(`/utils/revisions/${this.oid}`).then(revisions => {

                this.revisions = revisions;
                this.loading = false;

            }).catch(rsp => {
                this.saving = false;
                App.ui.notify(rsp.error || 'Loading revisions count failed!', 'error');
            });

        }
    },

    template: /*html*/`
        <app-loader size="small" v-if="loading"></app-loader>
        <div class="kiss-size-small kiss-color-muted" v-if="!loading && !revisions.length">{{ t('No revisions yet') }}</div>

        <ul class="app-list-items animated fadeIn">
            <li v-for="rev in revisions">
                <div class="kiss-size-small">{{ (new Date(rev._created * 1000).toLocaleString()) }}</div>
                <div class="kiss-color-muted kiss-size-xsmall">{{ rev._by }}</div>
            </li>
        </ul>

    `
}