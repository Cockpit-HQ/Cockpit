
export default {

    data() {
        return {
            val: this.modelValue
        }
    },

    props: {
        modelValue: {
            type: String,
            default: false
        },
        height: {
            type: String,
            default: '150px'
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

    template: /*html*/`
        <div>
            <input type="text" class="kiss-input kiss-width-1-1" v-model="val" @input="update" v-if="!multiline">
            <textarea class="kiss-textarea kiss-input kiss-width-1-1" v-model="val" @input="update" :style="{height}" v-if="multiline"></textarea>
        </div>
    `,

    methods: {
        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}