
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
        fields: {
            type: Array,
            default: []
        },
        languages: {
            type: Array,
            default: []
        },
    },

    watch: {
        val: {
            handler() { this.update() },
            deep: true
        },
        modelValue() {
            this.val = this.modelValue;
            this.update();
        }
    },

    template: /*html*/`
        <div>
            <app-fieldcontainer class="kiss-margin" v-for="field in fields">
                <label class="kiss-text-capitalize">{{field.label || field.name}}</label>
                <div class="kiss-color-muted kiss-size-small" v-if="field.info">{{ field.info }}</div>
                <div class="kiss-margin-small-top">
                    <div v-is="'field-'+field.type" v-model="val[field.name]" v-bind="field.opts"></div>
                </div>
            </app-fieldcontainer>
        </div>
    `,

    methods: {
        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}