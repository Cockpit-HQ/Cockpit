export default {


    data() {
        return {
            loading: true,
            mode: 'all',
            state: null,
        }
    },

    props: {
        models: {
            type: Array,
            default: () => []
        }
    },

    mounted() {
        this.load();
    },

    computed: {
        modelsWithItems() {
            return this.models.filter(model => model.items.length);
        },
        stateText() {
            return this.state === null ? this.t('All') : this.state === 1 ? this.t('Published') : this.t('Unpublished');
        }
    },

    watch: {
        mode() {
            this.load();
        },
        state() {
            this.load();
        }
    },

    methods: {
        async load() {

            let promises = [];

            this.loading = true;

            this.models.forEach(model => {

                const p = new Promise((resolve, reject) => {

                    let options = {
                        sort: {_modified: -1},
                        limit: 3,
                    };

                    if (this.mode === 'byme') {
                        options.filter = {
                            _mby: App.user._id
                        };
                    }

                    if (this.state !== null) {
                        options.filter = options.filter || {};
                        options.filter._state = this.state;
                    }

                    this.$request(`/content/collection/find/${model.name}`, {options}).then(rsp => {
                        model.items = rsp.items;
                        resolve();
                    });
                });

                promises.push(p);
            });

            Promise.all(promises).then(() => {
                this.loading = false;
            });
        },

        displayContent(item) {

            let data = {}, images = [], str;

            Object.keys(item).forEach(key => {

                if (item[key]?._id && item[key]?.path && item[key]?.type === 'image') {
                    images.push(item[key]._id);
                }

                if (key[0] === '_' || !item[key] || typeof(item[key]) !== 'string') {
                    return;
                }

                data[key] = item[key];
            });

            str = JSON.stringify(Object.values(data)).replace(/('null'|\[|\]|\{|\}|"|\\|')/g, '').replace(/,/g, ', ');
            str = App.utils.truncate(App.utils.stripTags(str), 50);

            if (!str) return 'n/a';

            if (images.length) {
                str = `<div class="kiss-flex" gap="small"><display-image src="${images[0]}" w="40" h="25"></display-image><div>${str}</div></div>`;
            }

            return str;
        },

        getItemLink(model, item) {
            return this.$routeUrl(`/content/${model.type}/item/${model.name}/${item._id}`);
        },
    },


    template: /*html*/`
        <kiss-card>
            <div class="kiss-text-caption kiss-text-bold">{{ t('Content') }}</div>
            <div class="kiss-color-muted kiss-size-small kiss-margin-xsmall">{{ t('Latest updated content items') }}</div>

            <div class="kiss-flex kiss-flex-middle kiss-margin-small" gap>

                <ul class="kiss-tabs-nav kiss-flex-1" :class="{'kiss-disabled':loading}">
                    <li :active="mode == 'all' ? 'true':'false'"><a class="kiss-tabs-nav-link" @click="mode='all'">{{ t('All items') }}</a></li>
                    <li :active="mode == 'all' ? 'false':'true'"><a class="kiss-tabs-nav-link"  @click="mode='byme'">{{ t('By me') }}</a></li>
                </ul>

                <span class="kiss-badge kiss-overlay-input" :class="{'kiss-bgcolor-success': state === 1, 'kiss-bgcolor-danger': state === 0}">
                    {{ stateText }}
                    <select v-model="state">
                        <option :value="null">{{ t('All') }}</option>
                        <hr>
                        <option :value="1">{{ t('Published') }}</option>
                        <option :value="0">{{ t('Unpublished') }}</option>
                    </select>
                </span>
            </div>

            <div class="kiss-padding-large" v-if="loading"><app-loader size="small"></app-loader></div>

            <div class="animated fadeIn kiss-padding-large kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin" v-if="!loading && !modelsWithItems.length">
                <div>
                    <kiss-svg :src="$baseUrl('content:icon.svg')" width="30" height="30"></kiss-svg>
                    <p class="kiss-size-small kiss-margin-small-top">{{ t('No content items') }}</p>
                </div>
            </div>

            <div class="animated fadeIn kiss-margin-small" v-if="!loading">

                <kiss-card class="kiss-padding kiss-margin-small" theme="bordered" hover="contrast shadowed bordered-primary" v-for="model in modelsWithItems">

                    <div class="kiss-flex kiss-flex-middle kiss-margin kiss-visible-toggle" gap="small">
                        <div>
                            <kiss-svg :src="$baseUrl(model.icon ? model.icon : 'content:assets/icons/'+model.type+'.svg')" width="25" height="25" :style="{color:model.color ? model.color : 'var(--kiss-color-muted)'}"><canvas width="25" height="25"></canvas></kiss-svg>
                        </div>
                        <a class="kiss-text-bold kiss-text-capitalize kiss-link-muted" :href="$routeUrl('/content/'+model.type+'/items/'+model.name)">{{ model.label || model.name}}</a>
                        <a class="kiss-invisible-hover" :href="$routeUrl('/content/'+model.type+'/item/'+model.name)" :title="t('Create item')"><icon>add_circle</icon></a>
                    </div>

                    <div class="kiss-flex kiss-flex-middle kiss-margin-small kiss-size-small" gap="small" v-for="item in model.items">
                        <icon :class="{'kiss-color-success': item._state === 1, 'kiss-color-danger': !item._state, 'kiss-color-muted': item._state === -1}">trip_origin</icon>
                        <a class="kiss-link-muted kiss-flex-1" :href="getItemLink(model, item)" v-html="displayContent(item)"></a>
                        <div class="kiss-text-monospace kiss-color-muted kiss-size-xsmall"><app-datetime type="relative" :datetime="item._modified" /></div>
                    </div>

                </kiss-card>

            </div>

            <div class="kiss-margin-small" v-if="!loading">
                <a class="kiss-button kiss-button-small" :href="$routeUrl('/content')">{{ t('Go to content') }}</a>
            </div>

        </kiss-card>
    `
}
