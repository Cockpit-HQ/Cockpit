export default {

    _meta: {
        size: 'large'
    },

    data() {
        return {
            search: this.value || '',
            loading: false,
            findings: null,
            selected: null,
            filter: ''
        }
    },

    computed: {

        groups() {
            if (!this.findings) return [];
            const groups = {};
            this.findings.forEach(f => {
                if (f.group) groups[f.group] = true;
            });
            return Object.keys(groups).sort();
        },

        visibleFindings() {

            if (!this.findings) return [];

            if (!this.filter) {
                return this.findings;
            }

            return this.findings.filter(f => f.group == this.filter);
        }
    },

    props: {
        value: String,
    },

    mounted() {

        this.dialog = this.$el.closest('kiss-dialog');

        setTimeout(() => {
            this.$refs.searchInput.focus();
        });

        this.dialog.addEventListener('click', e => {
            if (e.target.closest('kiss-content')) return;
            this.dialog.close();
        });
    },

    watch: {
        search: {
            handler: KISS.utils.debounce(function () {
                this.query();
            }, 850)
        }
    },

    methods: {

        keydown(event) {

            switch (event.keyCode) {

                // close on ESC
                case 27:
                    this.dialog.close();
                    break;
                // enter
                case 13:

                    if (this.selected !== null) {
                        event.preventDefault();
                        this.goto(this.visibleFindings[this.selected]);
                        return;
                    }
                    break;

                // up | down
                case 38:
                case 40:

                    if (!Array.isArray(this.visibleFindings)) {
                        return;
                    }

                    event.preventDefault();

                    if (this.selected === null) {
                        this.selected = event.keyCode == 38 ? this.visibleFindings.length - 1 : 0;
                    } else {

                        if (event.keyCode == 38) {
                            this.selected = this.visibleFindings[this.selected - 1] ? this.selected - 1 : this.visibleFindings.length - 1;
                        } else {
                            this.selected = this.visibleFindings[this.selected + 1] ? this.selected + 1 : 0;
                        }
                    }

                    const ele = document.getElementById(`app-search-finding-${this.selected}`);

                    if (ele && !KISS.utils.isElementInView(ele, ele.parentElement)) {
                        ele.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    break;

            }

        },

        goto(finding) {
            location.href = finding.route;
        },

        query() {

            this.selected = null;
            this.findings = null;
            this.filter = '';

            if (!this.search.trim()) {
                return;
            }

            this.loading = true;

            this.$request('/utils/search', { search: this.search }).then(findings => {

                if (!Array.isArray(findings)) {
                    findings = [];
                }

                findings = findings.sort((a, b) => {
                    return (a.group || '').localeCompare(b.group || '') || a.title.localeCompare(b.title);
                });

                this.findings = findings;
                this.loading = false;

                if (findings.length) {
                    this.selected = 0;
                }

                setTimeout(() => {
                    this.$refs.searchInput.focus();
                }, 50);
            });
        }
    },

    template: /*html*/`
        <form id="app-search" role="search">
            <div class="kiss-flex kiss-flex-middle kiss-margin-small">
                <div class="kiss-color-muted kiss-margin-small-end">
                    <kiss-svg :src="$baseUrl('system:assets/icons/search.svg')" width="25"><canvas width="25" height="25"></canvas></kiss-svg>
                </div>
                <div class="kiss-flex-1 kiss-margin-small-end">
                    <input autofocus class="kiss-input kiss-input-blank kiss-form-large kiss-width-1-1" :class="{'kiss-disabled': loading}" type="search" v-model="search" :placeholder="t('Search...')" :aria-label="t('Search...')" :disabled="loading" @keydown="keydown" @input="selected=null" ref="searchInput" style="font-size:25px;padding:0;">
                </div>
                <button type="button" :aria-label="t('Close')" class="kiss-input-blank kiss-cursor-pointer" kiss-dialog-close>
                    <kiss-svg class="kiss-color-muted" :src="$baseUrl('system:assets/icons/close.svg')" width="20"><canvas width="20" height="20"></canvas></kiss-svg>
                </button>
            </div>

            <kiss-card class="kiss-color-muted kiss-size-large kiss-align-center kiss-padding" v-if="loading">
                <app-loader size="small" mode="dots"></app-loader>
            </kiss-card>

            <kiss-card class="kiss-color-muted kiss-size-large kiss-align-center kiss-padding-large" v-if="Array.isArray(findings) && !findings.length">
                {{ t('Nothing found') }}
            </kiss-card>

            <div style="
                    background-color:var(--kiss-base-background-color);
                    margin: 0 calc(-1 * var(--kiss-dialog-content-spacing)) calc(-1 * var(--kiss-dialog-content-spacing)) calc(-1 * var(--kiss-dialog-content-spacing));
                    --kiss-button-small-padding-horizontal: 1em;
                    --kiss-button-small-line-height: 3em;
                    --kiss-button-small-font-size: .7em;" v-if="Array.isArray(findings) && findings.length">

                <div class="kiss-padding-small kiss-bgcolor-contrast" v-if="groups.length > 1">
                    <div class="kiss-flex" gap="small" style="overflow-x:auto;flex-wrap:nowrap">
                        <a href="#" class="kiss-button kiss-button-small" :class="{'kiss-button-blank': filter}" @click.prevent="filter='';selected=null;$refs.searchInput.focus()" style="text-transform: capitalize;flex-shrink:0">{{ t('All') }}</a>
                        <a v-for="group in groups" href="#" class="kiss-button kiss-button-small" :class="{'kiss-button-blank': filter != group}" @click.prevent="filter=group;selected=null;$refs.searchInput.focus()" style="text-transform: capitalize;flex-shrink:0">{{ group }}</a>
                    </div>
                </div>

                <div style="max-height:50vh;overflow:auto;">
                    <template v-for="finding, idx in visibleFindings">
                        <div class="kiss-size-xsmall kiss-text-bold kiss-color-muted kiss-margin-small-top kiss-padding-small" v-if="(idx == 0 || finding.group != (visibleFindings[idx-1] || {}).group) && finding.group">
                            {{ finding.group }}
                        </div>
                        <kiss-card :id="'app-search-finding-'+idx" class="kiss-padding-small" :theme="idx == this.selected && 'contrast'">
                            <a :href="finding.route" class="kiss-flex kiss-flex-middle" :class="{'kiss-color-primary': idx == this.selected, 'kiss-color-muted': idx != this.selected}">
                                <div class="kiss-margin-small-end">
                                    <kiss-svg :src="$baseUrl(finding.icon || 'system:assets/icons/link.svg')" width="20" height="20"></kiss-svg>
                                </div>
                                <div class="kiss-flex-1 kiss-text-truncate">{{ finding.title }}</div>
                                <div class="kiss-size-xsmall kiss-text-monospace" v-if="finding.context">{{ finding.context }}</div>
                            </a>
                        </kiss-card>
                    </template>
                </div>

            </div>
        </form>
    `
}
