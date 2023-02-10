
const isNumeric = function(mixed_var){
    return (typeof(mixed_var)==='number' || typeof(mixed_var)==='string') && mixed_var !== '' && !isNaN(mixed_var);
}

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

        check() {

            let newVal = null;

            if (isNumeric(this.min) && isNumeric(this.val) && this.val < this.min) {
                newVal = this.min;
            }

            if (isNumeric(this.max) && isNumeric(this.val) && this.val > this.max) {
                newVal = this.max;
            }

            if (newVal !== null) {
                this.val = newVal;
                this.update();
            }
        },

        update() {
            this.$emit('update:modelValue', this.val === '' ? null : this.val)
        }
    },

    template: /*html*/`
        <div field="number">
            <input type="number" class="kiss-input kiss-width-1-1" v-model.number="val" @input="update" @change="check" :placeholder="placeholder" :max="max" :min="min" :step="step" :readonly="readonly">
        </div>
    `,
}
