
let instanceCount = 0;

export default {

    _meta: {
        label: 'Time',
        info: 'Pick a time',
        icon: 'system:assets/icons/time.svg',
        settings: [
            {name: 'readonly', type: 'boolean', opts: {default: false}},
            {name: 'placeholder', type: 'text'},
            {name: 'min', type: 'time'},
            {name: 'max', type: 'time'},
            {name: 'step', type: 'number'},
            {name: 'list', type: 'time', multiple: true},
        ]
    },

    data() {
        return {
            uid: `field-time-${++instanceCount}`,
            val: this.modelValue
        }
    },

    props: {
        modelValue: {
            type: String,
            default: ''
        },
        min: {
            type: String,
            default: null
        },
        max: {
            type: String,
            default: null
        },
        list: {
            type: Array,
            default: []
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
        <div field="time">
            <input type="time" class="kiss-input kiss-width-1-1" v-model="val" @input="update" :max="max" :min="min" :list="uid+'-list'" :readonly="readonly">
            <datalist :id="uid+'-list'" v-if="Array.isArray(list) && list.length">
                <option v-for="option in list">{{ option }}</option>
            </datalist>
        </div>
    `
}
