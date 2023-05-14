export default {

    _meta: {
        label: 'Color',
        info: 'Color input',
        icon: 'system:assets/icons/color.svg',
        settings: [
            {name: 'size', type: 'number', opts: {placeholder: '40'}},
        ]
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

    watch: {

        val() {
            this.update();
        },
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
        <div class="kiss-overlay-input" field="color">
            <canvas class="app-border-radius" :width="size" :height="size" :style="{ background: val }" v-if="val"></canvas>
            <canvas class="app-border-radius" :width="size" :height="size" :style="transparent" v-if="!val"></canvas>
            <input v-model="val" type="color" style="cursor:pointer;" @change="update">
        </div>
    `
}