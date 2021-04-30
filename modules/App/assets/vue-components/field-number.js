
export default {

    _meta: {
        label: 'Number',
        info: 'Quantityt etc',
        icon: 'settings:assets/icons/number.svg'
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

    template: /*html*/`
        <div field="number">
            <input type="number" class="kiss-input kiss-width-1-1" v-model.number="val" @input="update" :placeholder="placeholder" :max="max" :min="min" :step="step" :readonly="readonly">
        </div>
    `,

    methods: {
        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}