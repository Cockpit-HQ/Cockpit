import FieldCode from "./field-code.js"

export default {

    _meta: {
        label: 'Object',
        info: 'Object input'
    },

    data() {
        return {
            val: null,
            error: null
        }
    },

    props: {
        modelValue: {
            default: null
        },
        height: {
            default: null
        }
    },

    components: {
        'field-code': FieldCode
    },

    watch: {
        val() {
            this.update();
        },
        modelValue(val) {

            if (this.code.editor && !this.code.editor.hasFocus()) {
                this.val = JSON5.stringify(this.modelValue, null, 2);
            }
        }
    },

    template: /*html*/`
        <div class="kiss-position-relative">
            <field-code class="field-object-code" v-model="val" :height="height"></field-code>

            <div class="kiss-margin kiss-text-monospace kiss-size-small kiss-bgcolor-danger kiss-position-absolute animated fadeIn" style="left:0;right:0;bottom:0;z-index:3;padding:5px;" v-if="error">
                {{ error }}
            </div>
        </div>
    `,

    mounted() {
        this.code = this.$el.querySelector('.field-object-code');
        this.val = JSON5.stringify(this.modelValue, null, 2);
    },

    methods: {
        update() {

            this.error = null

            try {
                this.$emit('update:modelValue', this.val ? JSON5.parse(this.val) : null)
            } catch(e) {
                this.error = `${e.lineNumber}: ${e.message}`;
            }
        }
    }
}