
export default {

    data() {
        return {
            val: this.modelValue
        }
    },

    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },

    template: /*html*/`
        <div>
            <input class="app-switch" type="checkbox" v-model="val" @change="update">
        </div>
    `,

    methods: {
        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}