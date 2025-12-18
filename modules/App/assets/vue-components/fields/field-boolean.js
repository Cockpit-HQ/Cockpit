let uuid = 0;

export default {

    _meta: {
        label: 'Boolean',
        info: 'True or False',
        icon: 'system:assets/icons/boolean.svg',
        settings: [
            {name: 'label', type: 'text'},
            {name: 'mode', type: 'select', opts: {options: ['boolean', 'number']}, info: 'Save as boolean (true/false) or number (1/0)'},
        ],
        render(value, field, context) {

            if (typeof(value) === 'boolean' || value === 1 || value === 0) {
                return `<icon class="kiss-color-${value ? 'success' : 'danger'}">trip_origin</icon>`;
            }

            return '<icon class="kiss-color-muted">trip_origin</icon>';
        }
    },

    data() {
        return {
            val: this.mode === 'number' ? !!this.modelValue : this.modelValue,
            uuid: `field-boolean-${++uuid}`
        }
    },

    props: {
        modelValue: {
            type: [Boolean, Number],
            default: false
        },
        label: {
            type: String,
            default: false
        },
        mode: {
            type: String,
            default: 'boolean'
        }
    },

    watch: {
        modelValue() {
            this.val = this.mode === 'number' ? !!this.modelValue : this.modelValue;
            this.update();
        }
    },

    methods: {
        update() {
            let value = this.val;
            if (this.mode === 'number') {
                value = this.val ? 1 : 0;
            }
            this.$emit('update:modelValue', value)
        }
    },

    template: /*html*/`
        <div class="kiss-flex kiss-flex-middle" field="boolean">
            <input :id="uuid" class="app-switch" type="checkbox" v-model="val" @change="update">
            <label :for="uuid" class="kiss-margin-small-start" :class="{'kiss-color-muted':!val}" v-if="label">{{ label }}</label>
        </div>
    `,
}
