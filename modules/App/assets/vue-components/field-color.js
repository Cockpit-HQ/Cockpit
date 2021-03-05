export default {

    _meta: {
        label: 'Color',
        info: 'Color input',
        icon: 'settings:assets/icons/color.svg'
    },

    data() {
        return {
            val: this.modelValue,
            transparent: {
                backgroundImage: 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
            }
        }
    },

    props: {
        modelValue: {
            type: String,
            default: null
        },
        size: {
            type: Number,
            default: 40
        }
    },

    template: /*html*/`
        <div class="kiss-overlay-input" field="color">
            <canvas class="app-border-radius" :width="size" :height="size" :style="val ? { background: val } : transparent"></canvas>
            <input v-model="val" type="color" style="cursor:pointer;" @change="update">
        </div>
    `,

    methods: {

        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}