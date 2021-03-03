export default {

    _meta: {
        label: 'Boolean',
        info: 'An input that is either true or false'
    },

    data() {
        return {
            val: this.modelValue
        }
    },

    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        label: {
            type: Boolean,
            default: false
        }
    },

    template: /*html*/`
        <div class="kiss-flex kiss-flex-middle" field="boolean">
            <div class="kiss-flex kiss-flex-middle"><input class="app-switch" type="checkbox" v-model="val" @change="update"></div>
            <span class="kiss-margin-left" :class="{'kiss-color-muted':!val}" v-if="label">{{ label }}</span>
        </div>
    `,

    methods: {
        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}