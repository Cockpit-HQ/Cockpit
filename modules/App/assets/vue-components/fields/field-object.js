export default {

    _meta: {
        label: 'Object',
        info: 'Object input',
        icon: 'system:assets/icons/object.svg',
        settings: [
            {name: 'height', type: 'number'},
            {name: 'strict', type: 'boolean', info: 'Use standard JSON instead of JSON5'},
        ]
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
        },
        size: {
            type: Number,
            default: 14
        },
        asString: {
            type: Boolean,
            default: false
        },
        strict: {
            type: Boolean,
            default: false
        },
        codemirror: {
            type: Object,
            default: {}
        }
    },

    components: {
        'field-code': Vue.defineAsyncComponent(() =>
            App.utils.import('app:assets/vue-components/fields/field-code.js')
        )
    },

    watch: {
        val: {
            handler() { this.update() },
            deep: true
        },
        modelValue: {
            handler(val) {

                if (this.code && this.code.editor && !this.code.editor.hasFocus()) {

                    if (this.asString && typeof(val) == 'string') {
                        this.val = val;
                    } else {
                        this.val = this.strict ? JSON.stringify(val, null, 2) : JSON5.stringify(val, null, 2);
                    }
                }
            },
            deep: true
        }
    },

    mounted() {

        this.code = this.$el.querySelector('.field-object-code');

        try {

            let val = this.modelValue;

            if (this.asString && typeof(val) == 'string') {
                val = this.strict ? JSON.parse(val) : JSON5.parse(val);
            }

            this.val = this.strict ? JSON.stringify(val, null, 2) : JSON5.stringify(val, null, 2);
            this.error = null;

        } catch (e) {
            // Handle parse errors gracefully
            if (this.modelValue) {
                // If we can't parse it, show the raw value
                this.val = typeof this.modelValue === 'string' ? this.modelValue : JSON.stringify(this.modelValue);
                this.error = `Failed to parse: ${e.message}`;
                console.warn('field-object: Failed to parse initial value:', e);
            }
        }
    },

    methods: {
        update() {

            this.error = null

            if (!this.val) {
                this.$emit('update:modelValue', null);
                return;
            }

            try {

                let val = this.strict ? JSON.parse(this.val) : JSON5.parse(this.val);

                this.$emit('update:modelValue', this.asString ? this.val : val);
                this.error = null;

            } catch (e) {
                // Provide more helpful error messages
                const lineNumber = e.lineNumber || 'Unknown line';
                const parserType = this.strict ? 'JSON' : 'JSON5';
                const message = e.message || `Invalid ${parserType} syntax`;
                this.error = `${lineNumber}: ${message}`;

                // Log detailed error for debugging
                console.error(`field-object: ${parserType} parse error:`, {
                    error: e,
                    value: this.val,
                    lineNumber,
                    message
                });
            }
        }
    },

    template: /*html*/`
        <div class="kiss-position-relative" field="object">
            <field-code class="field-object-code" v-model="val" :height="height" :size="size" :codemirror="codemirror" :mode="strict ? 'json' : 'json5'"></field-code>

            <div class="kiss-margin kiss-text-monospace kiss-size-small kiss-bgcolor-danger kiss-position-absolute animated fadeIn" style="left:0;right:0;bottom:0;z-index:3;padding:5px;" v-if="error">
                {{ error }}
            </div>
        </div>
    `
}
