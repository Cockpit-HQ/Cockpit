
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
        render(value, field, context) {

            if (Array.isArray(value)) {
                return `<span class="kiss-badge kiss-badge-outline">${value.length}</span>`;
            }

            if (!field.opts.link) {
                return 'n/a'
            }

            if (!field.opts.display) {
                return `<span class="kiss-badge kiss-badge-outline">${value._id.substr(-5)}</span>`
            }

            return `<display-content class="kiss-display-inline-block" model="${field.opts.link}" id="${value._id}" display="${field.opts.display}"><app-loader class="kiss-display-inline-block" size="small" mode="dots"></app-loader></display-content>`;
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

        this.$request('/content/models/load').then(models => {

            this.model = false;

            models.forEach(m => {
                if (m.name == this.link) this.model = m;
            });
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
            }, {size: 'xlarge'})
        },

        getDisplay() {
            return `<display-content class="kiss-display-inline-block" model="${this.model.name}" id="${this.val._id}" display="${this.display}"><app-loader class="kiss-display-inline-block" size="small" mode="dots"></app-loader></display-content>`;
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

                <kiss-card class="kiss-padding kiss-color-muted kiss-align-center kiss-margin-small kiss-position-relative" theme="contrast" v-if="!val">
                    <kiss-svg :src="$base('content:assets/icons/reference.svg')" width="40" height="40"></kiss-svg>
                    <div class="kiss-margin-small kiss-size-small">{{ t('No content item linked' )}}</div>
                    <a class="kiss-cover" @click="pickItem()"></a>
                </kiss-card>

                <div class="kiss-margin-small kiss-position-relative" v-if="val && val._id">
                    <div class="kiss-size-small" v-if="display" v-html="getDisplay()"></div>
                    <span class="kiss-badge kiss-badge-outline kiss-color-primary" v-else>{{ val._id}}</span>
                    <a class="kiss-cover" :href="$route('/content/'+model.type+'/item/'+model.name+'/'+val._id)" target="_blank" rel="noopener"></a>
                </div>

                <a class="kiss-button kiss-button-small" @click="pickItem()">
                    <icon class="kiss-margin-small-right">link</icon>
                    {{ 'Link '+(model.name || model.label)+' item' }}
                </a>

            </div>
        </div>
    `
}
