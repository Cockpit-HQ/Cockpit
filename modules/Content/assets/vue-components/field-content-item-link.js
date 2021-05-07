
let instanceCount = 0;

export default {

    _meta: {
        label: 'Content Link',
        info: 'Reference to another model item',
        icon: 'content:assets/icons/reference.svg'
    },

    data() {
        return {
            uid: `field-content-item-link-${++instanceCount}`,
            val: this.modelValue
        }
    },

    props: {
        modelValue: {
            type: Object,
            default: null
        }
    },

    watch: {
        modelValue() {
            this.val = this.modelValue;
            this.update();
        }
    },


    template: /*html*/`
        <div field="content-item-link">

            <a class="kiss-button kiss-button-small">
                <icon class="kiss-margin-small-right">link</icon>
                {{ t('Link model item') }}
            </a>
        </div>
    `,

    methods: {
        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}