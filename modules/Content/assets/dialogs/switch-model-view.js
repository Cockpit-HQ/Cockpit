export default {

    data() {

        return {
            models: null,
            loading: true,
            filter: ''
        }
    },

    props: {
        data: {
            type: Object
        },
        caption: {
            type: String
        }
    },

    mounted() {
        this.load();
    },

    computed: {
        filtered() {
            return this.models.filter(model => {

                if (this.filter && !`${model.name} ${model.label}`.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                    return false;
                }

                return true
            });
        },
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="kiss-padding kiss-text-bold">
                {{ t('Switch model') }}
            </div>
            <div class="kiss-padding  kiss-bgcolor-contrast">
                <input type="text" class="kiss-input" :placeholder="t('Filter models...')" v-model="filter">
            </div>
            <div class="app-offcanvas-content kiss-padding kiss-bgcolor-contrast kiss-flex-1">

                <app-loader v-if="loading"></app-loader>

                <ul class="app-list-items" v-if="!loading && Array.isArray(models)">
                    <li v-for="model in filtered">
                        <kiss-card class="kiss-flex kiss-flex-middle">
                            <div class="kiss-margin-small-right" :style="{color: model.color || 'inherit' }"><kiss-svg :src="$base(model.icon || 'content:assets/icons/'+model.type+'.svg')" width="25" height="25"><canvas width="25" height="25"></canvas></kiss-svg></div>
                            <div class="kiss-flex-1 kiss-position-relative kiss-margin-right kiss-link-muted kiss-size-small">
                                <div class="kiss-text-bold">{{ model.label || model.name }}</div>
                                <div class="kiss-color-muted kiss-size-xsmall kiss-text-truncate">{{model.info || model.type}}</div>
                                <a class="kiss-cover" :href="$route('/content/singleton/item/'+model.name)" v-if="model.type=='singleton'"></a>
                                <a class="kiss-cover" :href="$route('/content/collection/items/'+model.name)" v-if="model.type=='collection'"></a>
                                <a class="kiss-cover" :href="$route('/content/tree/items/'+model.name)" v-if="model.type=='tree'"></a>
                            </div>
                        </kiss-card>
                    </li>
                </ul>

            </div>
            <div class="kiss-padding kiss-bgcolor-contrast">
                <button class="kiss-button kiss-width-1-1" kiss-offcanvas-close>{{ t('Close') }}</button>
            </div>
        </div>
    `,

    methods: {

        load() {

            this.loading = true;

            this.$request('/content/models/load').then(models => {
                this.models = models;
                this.loading = false;
            });
        },
    }
}
