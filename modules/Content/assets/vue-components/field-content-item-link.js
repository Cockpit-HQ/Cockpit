
let instanceCount = 0;

export default {

    _meta: {
        label: 'Content Link',
        info: 'Content item reference',
        icon: 'content:assets/icons/reference.svg',
        settings: [
            {name: 'link', type: 'options-linkModel'},
            {name: 'filter', type: 'object', opts:{height: 120}},
            {name: 'display', type: 'text'},
        ],

        addFieldItem(field, value) {

            if (!field.opts.link) {
                return;
            }

            App.utils.getContentModels().then(models => {

                const model = models[field.opts.link];

                if (!model) {
                    return;
                }

                VueView.ui.modal('content:assets/dialogs/select-content-item.js', {
                    model: model,
                    filter: field.opts?.filter,
                    multiple: true
                }, {
                    pickItem: (item) => {

                        value.push({
                            _model: model.name,
                            _id: item._id
                        });

                    },

                    pickItems: (items) => {

                        items.forEach(item => {
                            value.push({
                                _model: model.name,
                                _id: item._id
                            });
                        });
                    }

                });

            });

        },

        render(value, field, context) {

            if (Array.isArray(value)) {
                return `<span class="kiss-badge kiss-badge-outline">${value.length}</span>`;
            }

            if (!field.opts.link || !value || !value._id) {
                return 'n/a'
            }

            return `<display-content class="kiss-display-inline-block" model="${field.opts.link}" id="${value._id}" display="${field.opts.display || ''}"><app-loader class="kiss-display-inline-block" size="small" mode="dots"></app-loader></display-content>`;
        }
    },

    data() {
        return {
            uid: `field-content-item-link-${++instanceCount}`,
            val: this.modelValue,
            model: null,
            item: null
        }
    },

    props: {
        modelValue: {
            type: Object,
            default: null
        },
        link: {
            type: String,
            default: null
        },
        filter: {
            type: Object,
            default: null
        },
        display: {
            type: String,
            default: null
        }
    },

    watch: {
        modelValue() {
            this.val = this.modelValue;
            this.update();
        }
    },

    mounted() {

        App.utils.getContentModels().then(models => {

            this.model = false;

            if (models[this.link]) {
                this.model = models[this.link];
            }
        });
    },

    methods: {

        pickItem() {

            VueView.ui.modal('content:assets/dialogs/select-content-item.js', {model: this.model, filter: this.filter}, {
                pickItem: (item) => {

                    this.val = {
                        _model: this.model.name,
                        _id: item._id
                    };
                    this.item = item;
                    this.update();
                }
            });
        },

        getDisplay() {
            return `<display-content class="kiss-display-inline-block" model="${this.model.name}" id="${this.val._id}" display="${this.display || ''}"><app-loader class="kiss-display-inline-block" size="small" mode="dots"></app-loader></display-content>`;
        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    },

    template: /*html*/`
        <div field="content-item-link">

            <div class="kiss-size-small kiss-color-muted" v-if="!link">
                {{ t('No model selected') }}
            </div>

            <div class="kiss-size-small kiss-color-muted" v-if="link && model === false">
                {{ t('Unknown model') }}
            </div>

            <div v-if="link && model">

                <kiss-card class="kiss-padding-larger kiss-color-muted kiss-align-center kiss-margin-small kiss-position-relative" theme="contrast" v-if="!val">
                    <kiss-svg :src="$baseUrl('content:assets/icons/reference.svg')" width="40" height="40"></kiss-svg>
                    <div class="kiss-margin-small kiss-size-small">{{ t('No content item linked' )}}</div>
                    <a class="kiss-cover" @click="pickItem()"></a>
                </kiss-card>

                <div class="kiss-margin-small kiss-position-relative" v-if="val && val._id">
                    <div class="kiss-size-small" v-html="getDisplay()"></div>
                    <a class="kiss-cover" :href="$routeUrl('/content/'+model.type+'/item/'+model.name+'/'+val._id)" target="_blank" rel="noopener"></a>
                </div>

                <button type="button" class="kiss-button kiss-button-small" @click="pickItem()">
                    <icon class="kiss-margin-small-right">link</icon>
                    {{ 'Link '+(model.name || model.label)+' item' }}
                </button>

            </div>
        </div>
    `
}
