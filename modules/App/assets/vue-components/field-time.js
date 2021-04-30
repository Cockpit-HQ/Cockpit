
let instanceCount = 0;

export default {

    _meta: {
        label: 'Time',
        info: 'Pick a time',
        icon: 'settings:assets/icons/time.svg'
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

    template: /*html*/`
        <div field="time">
            <input type="time" class="kiss-input kiss-width-1-1" v-model="val" @input="update" :max="max" :min="min" :list="uid+'-list'" :readonly="readonly">
            <datalist :id="uid+'-list'" v-if="list.length">
                <option v-for="option in list">{{ option }}</option>
            </datalist>
        </div>
    `,

    methods: {
        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}