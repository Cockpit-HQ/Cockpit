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

            let models = this.models
                        .filter(model => model.items.length > 0)
                        .sort((a, b) => {
                            const timeA = a.items[0]._modified || 0;
                            const timeB = b.items[0]._modified || 0;
                            return timeB - timeA;  // Descending order
                        });

            if (models[0] && models[0]?._visibleItems === undefined) {
                models[0]._visibleItems = true;
            }

            return models;
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

                    model.iFields = {};

                    model.fields.forEach(field => {
                        model.iFields[field.name] = field;
                    });

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

        displayContent(item, model) {

            let data = {},
                images = [],
                linkedContent = [],
                str, value;

            Object.keys(item).forEach(key => {

                if (item[key]?._id && item[key]?.path && item[key]?.type === 'image') {
                    images.push(item[key]._id);
                }

                value = item[key];

                if (key[0] === '_' || !item[key]) {
                    return;
                }

                if (Array.isArray(value) && value.length && typeof(value[0]) === 'string') {
                    value = value.join(', ');
                }

                if (typeof(value) === 'string') {
                    data[key] = value;
                }

                if (model.iFields[key]?.type === 'contentItemLink') {

                    if (value._id && value._model) {
                        linkedContent.push({...value, display: model.iFields[key].opts?.display});
                    }

                    if (Array.isArray(value) && value.length && value[0]._id && value[0]._model) {
                        linkedContent.push({...value[0], display: model.iFields[key].opts?.display});
                    }
                }

            });

            str = Object.values(data).join(' ');
            str = App.utils.truncate(App.utils.stripTags(str), 50);

            let output = [];

            if (images.length) {
                output.push(`<display-image src="${images[0]}" w="40" h="25"></display-image>`);
            }

            if (linkedContent.length) {
                linkedContent.forEach(val => {
                    output.push(`<display-content id="${val._id}" model="${val._model}" display="${val.display || ''}"></display-content>`);
                });
            }

            if (!str && !images.length && !linkedContent.length) {
                str = 'n/a';
            }

            if (str) {
                output.push(str);
            }

            return `<div class="kiss-flex" gap="small">${output.join(' ')}</div>`;
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
                    <icon size="large">arrow_drop_down</icon>
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
                        <div class="kiss-flex-1"></div>
                        <a class="kiss-link-muted kiss-flex kiss-flex-middle" gap="small" @click="model._visibleItems = !model._visibleItems">
                            <span class="kiss-badge">{{ model.items.length }}</span>
                            <icon>unfold_more</icon>
                        </a>
                    </div>

                    <div class="kiss-margin-small" v-if="model._visibleItems">
                        <div class="kiss-flex kiss-flex-middle kiss-margin-small kiss-size-small" gap="small" v-for="item in model.items">
                            <icon :class="{'kiss-color-success': item._state === 1, 'kiss-color-danger': !item._state, 'kiss-color-muted': item._state === -1}">trip_origin</icon>
                            <a class="kiss-link-muted kiss-flex-1" :href="getItemLink(model, item)" v-html="displayContent(item, model)"></a>
                            <div class="kiss-text-monospace kiss-color-muted kiss-size-xsmall"><app-datetime type="relative" :datetime="item._modified" /></div>
                        </div>
                    </div>

                </kiss-card>

            </div>

            <div class="kiss-margin-small" v-if="!loading">
                <a class="kiss-button kiss-button-small" :href="$routeUrl('/content')">{{ t('Go to content') }}</a>
            </div>

        </kiss-card>
    `
}
