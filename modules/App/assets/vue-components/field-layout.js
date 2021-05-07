
let Components = {

    section: {
        label: 'Section',
        group: 'Core',
        fields: [],
        preview: null,
        children: true
    }

};


let instanceCount = 0;

export default {

    name: 'field-layout',

    _meta: {
        label: 'Layout',
        info: 'Build custom component based layouts',
        icon: 'settings:assets/icons/layout.svg'
    },

    data() {
        return {
            uid: `field-layout-${++instanceCount}`,
            val: this.modelValue || []
        }
    },

    props: {
        modelValue: {
            type: Array,
            default: []
        },
        group: {
            type: String,
            default: null
        },
        level: {
            type: Number,
            default: 0
        }
    },

    watch: {
        modelValue() {
            this.val = this.modelValue || [];
            this.update();
        }
    },

    template: /*html*/`
        <div field="layout">

            <vue-draggable v-model="val" :group="group || uid" @change="change" handle=".lm-handle" v-if="val.length">
                <template #item="{ element }">
                    <kiss-card class="kiss-padding-small" theme="bordered" style="margin: 8px 0;">
                        <div class="kiss-flex kiss-flex-middle">
                            <a class="lm-handle kiss-margin-small-right kiss-color-muted"><icon>drag_handle</icon></a>
                            <div class="kiss-flex-1 kiss-size-small kiss-text-bold">
                                {{ element.label }}
                            </div>
                        </div>
                        <field-layout v-model="element.children" :group="group || uid" :level="++level" v-if="element.children"></field-layout>
                    </kiss-card>
                </template>
            </vue-draggable>

            <div class="kiss-margin kiss-align-center">
                <a class="kiss-size-large" @click="addComponent"><icon>control_point</icon></a>
            </div>

        </div>
    `,

    methods: {

        addComponent() {
            this.val.push({
                component: 'section',
                label: 'Section',
                children: []
            })
        },

        change(evt) {
            window.console.log(evt);
        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}