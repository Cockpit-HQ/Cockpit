
export default {

    _meta: {
        label: 'Number',
        info: 'Quantity etc',
        icon: 'system:assets/icons/number.svg',
        settings: [
            {name: 'readonly', type: 'boolean', opts: {default: false}},
            {name: 'placeholder', type: 'text'},
            {name: 'min', type: 'number'},
            {name: 'max', type: 'number'},
            {name: 'step', type: 'number'},
        ]
    },

    data() {
        return {
            val: this.modelValue
        }
    },

    props: {
        modelValue: {
            type: Number,
            default: null
        },
        placeholder: {
            type: String,
            default: ''
        },
        min: {
            type: Number
        },
        max: {
            type: Number
        },
        step: {
            default: null
        },
        readonly: {
            type: Boolean,
            default: null
        }
    },

    watch: {
        modelValue() {
            this.val = this.modelValue;
            this.update();
        }
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.val)
        }
    },

    template: /*html*/`
        <div field="number">
            <input type="number" class="kiss-input kiss-width-1-1" v-model.number="val" @input="update" :placeholder="placeholder" :max="max" :min="min" :step="step" :readonly="readonly">
        </div>
    `,
}
