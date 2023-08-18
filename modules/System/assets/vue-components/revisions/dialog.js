export default {

    data() {

        return {
            revisions: [],
            loading: true,
            selectedRev: null
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
        },
        caption: {
            type: String
        },
        revision: {
            type: Object,
            default: null
        }
    },

    computed: {
        changes() {

            if (!this.selectedRev) return [];

            let changes = [], _diff, _diffhtml, current, prev;

            Object.keys(this.selectedRev.data).forEach(key => {

                _diffhtml = '';

                if (this.current[key] == undefined) return;

                current = JSON.stringify(this.current[key], null, ' ');
                prev = JSON.stringify(this.selectedRev.data[key], null, ' ');

                if (current == prev) return;

                if (current.length > 200 || prev.length > 200) {

                    _diffhtml = prev;

                } else {

                    _diff = Diff.diffChars(prev, current);

                    for (let i=0; i < _diff.length; i++) {

                        if (_diff[i].added && _diff[i + 1] && _diff[i + 1].removed) {
                            let swap = _diff[i];
                            _diff[i] = _diff[i + 1];
                            _diff[i + 1] = swap;
                        }

                        if (_diff[i].removed) {
                            _diffhtml += '<del>'+_diff[i].value+'</del>';
                        } else if (_diff[i].added) {
                            _diffhtml += '<ins>'+_diff[i].value+'</ins>';
                        } else {
                            _diffhtml += _diff[i].value;
                        }
                    }
                }


                changes.push({
                    key,
                    current: this.current[key],
                    revision: this.selectedRev.data[key],
                    //diff: htmldiff(JSON.stringify(this.selectedRev.data[key], null, ' '), JSON.stringify(this.current[key], null, ' '))
                    diff: _diffhtml
                });
            });

            return changes;
        }
    },

    mounted() {
        this.load(this.revision)
    },

    methods: {

        load(rev) {

            this.loading = true;

            this.$request(`/system/utils/revisions/${this.oid}?limit=20`).then(revisions => {

                App.assets.require([
                    'system:assets/vendor/jsdiff.js',
                ]).then(() => {

                    this.revisions = revisions;
                    this.loading = false;

                    if (rev) {
                        this.revisions.forEach(r => {
                            if (r._created == rev._created) {
                                this.selectedRev = r;
                            }
                        })
                    }
                });

            }).catch(rsp => {
                this.saving = false;
                App.ui.notify(rsp.error || 'Loading revisions failed!', 'error');
            });

        },

        restoreField(key) {
            this.current[key] = JSON.parse(JSON.stringify(this.selectedRev.data[key]));
        },

        restoreAll() {

            Object.keys(this.selectedRev.data).forEach(key => {

                if (this.current[key] !== undefined) {
                    this.current[key] = JSON.parse(JSON.stringify(this.selectedRev.data[key]));
                }
            });
        }

    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="kiss-padding kiss-text-bold">
                {{ caption || t('Revisions') }}
            </div>
            <div class="app-offcanvas-content kiss-flex kiss-flex-column">

                <div class="kiss-height-50vh kiss-padding kiss-flex kiss-flex-middle" v-if="loading">
                    <app-loader size="small"></app-loader>
                </div>

                <kiss-row class="kiss-flex-1" v-if="!loading && revisions.length">
                    <div class="kiss-bgcolor-contrast kiss-flex-1 kiss-padding kiss-position-relative kiss-overflow-y-auto">

                        <div class="kiss-flex kiss-height-30vh kiss-flex-middle kiss-flex-center" v-if="!selectedRev">
                            <div class="kiss-color-muted kiss-size-2 kiss-width-1-2 kiss-align-center">{{ t('Select a version') }}</div>
                        </div>

                        <div class="kiss-flex kiss-height-30vh kiss-flex-middle kiss-flex-center" v-if="selectedRev && !changes.length">
                            <div class="kiss-color-muted kiss-size-2 kiss-width-1-2 kiss-align-center">{{ t('No changes') }}</div>
                        </div>

                        <div class="kiss-cover kiss-padding" v-if="selectedRev">
                            <div class="kiss-margin" v-for="item in changes">

                                <div class="kiss-text-bold kiss-text-caption">{{ item.key }}</div>

                                <kiss-card class="kiss-margin-small-top kiss-padding-small kiss-flex kiss-flex-middle" theme="contrast shadowed" hover="shadow">
                                    <pre class="kiss-text-monospace kiss-size-small kiss-overflow-y-auto kiss-margin-small-right kiss-flex-1" style="max-height:15vh" v-html="item.diff"></pre>
                                    <div><a @click="restoreField(item.key)"><icon class="kiss-size-4">settings_backup_restore</icon></a></div>
                                </kiss-card>
                            </div>

                        </div>

                    </div>
                    <div class="kiss-width-1-5 kiss-flex kiss-flex-column">

                        <div class="kiss-text-caption kiss-margin-small"><strong>{{ t('Versions') }}</strong></div>

                        <div class="kiss-flex-1 kiss-overflow-y-auto kiss-position-relative">

                            <ul class="app-list-items kiss-cover">
                                <li class="kiss-flex kiss-position-relative" v-for="rev in revisions">
                                    <div class="kiss-flex-1">
                                        <div :class="(selectedRev == rev) ? 'kiss-color-primary kiss-text-bold':'kiss-size-small kiss-color-muted'">{{ (new Date(rev._created * 1000).toLocaleString()) }}</div>
                                        <div class="kiss-size-xsmall" :class="(selectedRev == rev) ? '':'kiss-color-muted'">By {{ rev._by && rev._by.user ? rev._by.user : 'n/a' }}</div>
                                    </div>
                                    <a class="kiss-cover" @click="selectedRev = rev"></a>
                                </li>
                            </ul>

                        </div>

                    </div>
                </kiss-row>

            </div>
            <div class="kiss-padding">
                <kiss-row>
                    <div class="kiss-flex-1">
                        <button class="kiss-button kiss-button-primary kiss-width-1-1 kiss-margin-right" @click="restoreAll()" v-if="selectedRev && changes.length">{{ t('Restore all fields') }}</button>
                    </div>
                    <div class="kiss-width-1-5">
                        <button class="kiss-button kiss-width-1-1" kiss-offcanvas-close>{{ t('Close') }}</button>
                    </div>
                </kiss-row>
            </div>
        </div>
    `
}
