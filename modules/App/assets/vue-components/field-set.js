import FieldsRenderer from "../../../Settings/assets/vue-components/fields-renderer.js"

export default {

    _meta: {
        label: 'Set',
        info: 'Set of fields',
        icon: 'settings:assets/icons/object.svg'
    },

    data() {

        return {
            val: this.modelValue || {}
        }
    },

    props: {
        modelValue: {
            default: {}
        },
        fields: {
            type: Array,
            default: []
        },
    },

    components: {
        'fields-renderer': FieldsRenderer
    },

    watch: {
        val: {
            handler() { this.update() },
            deep: true
        },
        modelValue(val) {
            this.val = this.modelValue || {};
        }
    },

    template: /*html*/`
        <div class="kiss-position-relative" field="set">
            <fields-renderer v-model="val" :fields="fields"></fields-renderer>
        </div>
    `,

    mounted() {

    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.val ? this.val || {} : null)
        }
    }
}