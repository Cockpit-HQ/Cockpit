export default {


    data() {
        return {
            loading: true,
            mode: 'all'
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
        }
    },

    watch: {
        mode() {
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

            let data = {}, str;

            Object.keys(item).forEach(key => {

                if (key[0] === '_' || !item[key] || typeof(item[key]) !== 'string') {
                    return;
                }

                data[key] = item[key];
            });

            str = JSON.stringify(Object.values(data)).replace(/('null'|\[|\]|\{|\}|"|\\|')/g, '').replace(/,/g, ', ');
            str = App.utils.truncate(App.utils.stripTags(str), 50);

            if (!str) return 'n/a';

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

            <ul class="kiss-tabs-nav kiss-margin-small" :class="{'kiss-disabled':loading}">
                <li :active="mode == 'all' ? 'true':'false'"><a class="kiss-tabs-nav-link" @click="mode='all'">{{ t('All items') }}</a></li>
                <li :active="mode == 'all' ? 'false':'true'"><a class="kiss-tabs-nav-link"  @click="mode='byme'">{{ t('Update by me') }}</a></li>
            </ul>

            <div class="kiss-padding-large" v-if="loading"><app-loader size="small"></app-loader></div>

            <div class="kiss-margin" style="max-height: 450px;overflow: scroll" v-if="!loading">

                <kiss-card class="kiss-padding kiss-margin-small" theme="bordered" hover="contrast shadowed bordered-primary" v-for="model in modelsWithItems">

                    <div class="kiss-flex kiss-flex-middle kiss-margin kiss-visible-toggle" gap="small">
                        <div>
                            <kiss-svg :src="$baseUrl(model.icon ? model.icon : 'content:assets/icons/collection.svg')" width="25" height="25" :style="{color:model.color ? model.color : 'var(--kiss-color-muted)'}"><canvas width="25" height="25"></canvas></kiss-svg>
                        </div>
                        <a class="kiss-text-bold kiss-text-capitalize kiss-link-muted" :href="$routeUrl('/content/'+model.type+'/items/'+model.name)">{{ model.label || model.name}}</a>
                        <a class="kiss-invisible-hover" :href="$routeUrl('/content/'+model.type+'/item/'+model.name)"><icon>add_circle</icon></a>
                    </div>

                    <div class="kiss-flex kiss-flex-middle kiss-margin-small kiss-size-small" gap="small" v-for="item in model.items">
                        <icon :class="{'kiss-color-success': item._state === 1, 'kiss-color-danger': !item._state, 'kiss-color-muted': item._state === -1}">trip_origin</icon>
                        <a class="kiss-link-muted kiss-flex-1" :href="getItemLink(model, item)" v-html="displayContent(item)"></a>
                        <div class="kiss-text-monospace kiss-color-muted kiss-size-xsmall">{{ (new Date(item._modified * 1000).toLocaleString()) }}</div>
                    </div>

                </kiss-card>

            </div>

        </kiss-card>
    `
}
