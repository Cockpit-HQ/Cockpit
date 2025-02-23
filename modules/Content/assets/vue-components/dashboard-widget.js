export default {


    data() {
        return {
            loading: true,
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

    methods: {
        load() {

            let promises = [];

            this.loading = true;

            this.models.forEach(model => {

                const p = new Promise((resolve, reject) => {

                    const options = {
                        sort: {_modified: -1},
                        limit: 5,
                    };

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
        }
    },

    template: /*html*/`
        <kiss-card>
            <div class="kiss-text-caption kiss-text-bold">{{ t('Content') }}</div>
            <div class="kiss-padding-large" v-if="loading"><app-loader size="small"></app-loader></div>

            <div class="kiss-margin" v-if="!loading">

                <kiss-card class="kiss-padding kiss-margin-small" theme="bordered" hover="contrast shadowed" v-for="model in modelsWithItems">

                    <div class="kiss-flex kiss-flex-middle kiss-margin" gap="small">
                        <div>
                            <kiss-svg :src="$baseUrl(model.icon ? model.icon : 'content:assets/icons/collection.svg')" width="25" height="25" :style="{color:model.color ? model.color : 'var(--kiss-color-muted)'}"><canvas width="25" height="25"></canvas></kiss-svg>
                        </div>
                        <span class="kiss-text-bold kiss-text-capitalize">{{ model.label || model.name}}</span>
                    </div>

                    <div class="kiss-flex kiss-flex-middle kiss-margin-small kiss-size-small" gap="small" v-for="item in model.items">
                        <icon :class="{'kiss-color-success': item._state === 1, 'kiss-color-danger': !item._state, 'kiss-color-muted': item._state === -1}">trip_origin</icon>
                        <div class="kiss-flex-1" v-html="displayContent(item)"></div>
                        <div class="kiss-text-monospace kiss-color-muted kiss-size-xsmall">{{ (new Date(item._modified * 1000).toLocaleString()) }}</div>
                    </div>

                </kiss-card>

            </div>

        </kiss-card>
    `
}
