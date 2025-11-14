import {FieldRenderer} from '../../../../System/assets/vue-components/fields/renderer.js';

export default {

    _meta: {
        label: 'Set',
        info: 'Set of fields',
        icon: 'system:assets/icons/object.svg',
        settings: [
            {name: 'fields', type: 'fields-manager', opts: {i18n: false}},
            {name: 'display', type: 'text'},
        ],
        render(value, field, context) {

            if (Array.isArray(value)) {
                return `<span class="kiss-badge kiss-badge-outline">${value.length}</span>`;
            }

            if (!field.opts.display) {
                return `<span class="kiss-badge kiss-badge-outline">Object</span>`
            }

            let output = 'n/a';

            try {
                output = App.utils.$interpolate(field.opts.display, { /* deprecated */ value, data:value});
            } catch(e) {}

            return output;
        }
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
        mode: {
            type: String,
            default: 'form'
        }
    },

    components: {
        FieldRenderer
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

    mounted() {

    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.val ? this.val || {} : null)
        }
    },

    template: /*html*/`
        <div class="kiss-position-relative" field="set">
            <kiss-tabs v-if="mode==='tabs'">
                <tab v-for="field in fields" :key="field.name" :caption="field.label || field.name">
                    <field-renderer :field="field" v-model="val[field.name]"></field-renderer>
                </tab>
            </kiss-tabs>
            <fields-renderer v-model="val" :fields="fields" :nested="true" v-if="mode!=='tabs'"></fields-renderer>
        </div>
    `
}
