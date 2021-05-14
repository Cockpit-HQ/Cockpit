
let instanceCount = 0;

export default {

    _meta: {
        label: 'Content Link',
        info: 'Reference to another model item',
        icon: 'content:assets/icons/reference.svg',
        settings: [
            {name: 'link', type: 'options-linkModel'},
            {name: 'display', type: 'text'},
        ]
    },

    data() {
        return {
            uid: `field-content-item-link-${++instanceCount}`,
            val: this.modelValue,
            model: null
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

    template: /*html*/`
        <div field="content-item-link">

            <div class="kiss-size-small kiss-color-muted" v-if="!link">
                {{ t('No model selected') }}
            </div>

            <div class="kiss-size-small kiss-color-muted" v-if="model === false">
                {{ t('Unknown model') }}
            </div>

            <div v-if="link && model">

                <a class="kiss-button kiss-button-small" @click="pickItem()">
                    <icon class="kiss-margin-small-right">link</icon>
                    {{ 'Link '+(model.name || model.label)+' item' }}
                </a>

            </div>
        </div>
    `,

    methods: {

        pickItem() {

            App.utils.vueModal('content:assets/dialogs/select-content-item.js', {model: this.model}, {

            }, {size: 'large'})
        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}