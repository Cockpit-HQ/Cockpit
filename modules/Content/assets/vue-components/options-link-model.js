export default {

    data() {

        return {
            val: this.modelValue || null,
            options: this.models || null
        }
    },

    props: {
        modelValue: {
            type: Object,
            default: {}
        },
        models: {
            type: Object,
            default: null
        },
        showGoto: {
            type: Boolean,
            default: true
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

        if (this.models) return;
        App.utils.getContentModels().then(models => {
            this.options = models;
        });
    },

    computed: {
        collections() {
            return Object.values(this.options || {}).filter(m => ['collection', 'tree'].includes(m.type));
        },

        model() {
            return this.val && this.options[this.val] ? this.options[this.val] : null;
        }
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.val ? this.val || null : null)
        }
    },

    template: /*html*/`
        <div>
            <app-loader size="small" v-if="!options"></app-loader>

            <div class="kiss-color-muted" v-if="options && !collections.length">
                {{ t('No models available') }}
            </div>

            <kiss-card class="kiss-padding kiss-overlay-input kiss-display-block" theme="bordered" hover="contrast" v-if="options && collections.length">

                <div class="kiss-flex kiss-flex-middle" gap="small" v-if="model">
                    <div>
                        <kiss-svg class="kiss-margin-auto" :src="$baseUrl(model.icon ? model.icon : 'content:assets/icons/'+model.type+'.svg')" width="25" height="25" :style="{color:model.color || 'inherit'}"><canvas width="25" height="25"></canvas></kiss-svg>
                    </div>
                    <strong>{{ model.label || model.name }}</strong>
                </div>
                <div class="kiss-size-small kiss-color-muted" v-if="!model">
                    {{ t('Select content model...') }}
                </div>
                <select class="kiss-input kiss-select" v-model="val">
                    <option></option>
                    <option v-for="m in collections" :value="m.name">{{ m.label || m.name }}</option>
                </select>
            </kiss-card>

            <div class="kiss-size-xsmall kiss-margin-small" v-if="options && showGoto && model">
                <a :href="$routeUrl('/content/'+options[val].type+'/items/'+val)" target="_blank"><icon>open_in_new</icon> {{ t('Goto items') }}</a>
            </div>

        </div>
    `
}
