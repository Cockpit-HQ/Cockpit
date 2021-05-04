
let instanceCount = 0;

export default {

    _meta: {
        label: 'Text',
        info: 'Simple text',
        icon: 'settings:assets/icons/text.svg'
    },

    data() {
        return {
            uid: `field-text-${++instanceCount}`,
            val: this.modelValue
        }
    },

    props: {
        modelValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        showCount: {
            type: Boolean,
            default: true
        },
        height: {
            type: String,
            default: '150px'
        },
        minlength: {
            type: Number
        },
        maxlength: {
            type: Number
        },
        list: {
            type: Array,
            default: []
        },
        readonly: {
            type: Boolean,
            default: false
        },
        multiline: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        modelValue() {
            this.val = this.modelValue;
            this.update();
        }
    },

    computed: {
        countIndicator() {
            return Math.abs((this.maxlength || 0) - (this.val || '').length);;
        }
    },

    template: /*html*/`
        <div field="text">
            <input type="text" class="kiss-input kiss-width-1-1" v-model="val" @input="update" :placeholder="placeholder" :maxlength="maxlength" :minlength="minlength" :list="uid+'-list'" :readonly="readonly" v-if="!multiline">
            <textarea class="kiss-textarea kiss-input kiss-width-1-1" v-model="val" @input="update" :placeholder="placeholder" :maxlength="maxlength" :minlength="minlength" :style="{height}" :readonly="readonly" v-if="multiline"></textarea>
            <div v-if="showCount">
                <span class="kiss-size-xsmall kiss-color-muted">{{countIndicator}}</span>
            </div>

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