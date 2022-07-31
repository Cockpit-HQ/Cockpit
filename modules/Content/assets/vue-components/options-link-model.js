export default {

    data() {

        return {
            val: this.modelValue || null,
            models: null
        }
    },

    props: {
        modelValue: {
            type: Object,
            default: {}
        }
    },

    watch: {
        val: {
            handler() { this.update() },
            deep: true
        },
        modelValue(val) {
            this.val = this.modelValue || null;
        }
    },

    mounted() {

        this.$request('/content/models/load').then(models => {
            this.models = models;
        });
    },

    computed: {
        collections() {
            return (this.models || []).filter(m => ['collection', 'tree'].includes(m.type));
        }
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.val ? this.val || null : null)
        }
    },

    template: /*html*/`
        <div>
            <app-loader size="small" v-if="!models"></app-loader>

            <div class="kiss-color-muted" v-if="Array.isArray(models) && !models.length">
                {{ t('No models available') }}
            </div>

            <select class="kiss-input kiss-select" v-model="val" v-if="Array.isArray(models) && models.length">
                <option></option>
                <option v-for="m in collections" :value="m.name">{{ m.label || m.name }}</option>
            </select>


        </div>
    `
}
