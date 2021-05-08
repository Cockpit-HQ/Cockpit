
let Components = {

    section: {
        icon: 'settings:assets/icons/component.svg',
        label: 'Section',
        group: 'Core',
        fields: [
            {name: 'class', type: 'text'}
        ],
        preview: null,
        children: true
    }
};


let pickComponent = {

    data() {
        return {

        }
    },

    props: {
        components: {
            type: Object,
            default: Components
        }
    },

    template: /*html*/`
        <div class="kiss-padding-small">

            <kiss-row class="kiss-child-width-1-2@m">
                <div v-for="meta, component in components">
                    <kiss-card class="kiss-padding-small kiss-align-center kiss-position-relative" theme="bordered" hover="shadow">
                        <div class="kiss-position-relative">
                            <canvas width="600" height="250"></canvas>
                            <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center">
                                <div><kiss-svg :src="$base(meta.icon || 'settings:assets/icons/component.svg')" width="30" height="30"></kiss-svg></div>
                            </div>
                        </div>
                        <div class="kiss-size-xsmall kiss-text-bold">{{ meta.label || component }}</div>
                        <a class="kiss-cover" @click="select(component)"></a>
                    </kiss-card>
                </div>
            </kiss-row>

        </kiss-row>
    `,

    methods: {
        select(component) {
            this.$call('select', component);
            this.$close();
        }
    }

}

let editComponent = {

    data() {
        return {
            meta: Components[this.component.component],
            item: _.cloneDeep(this.component)
        }
    },

    props: {

        component: {
            type: Object,
            default: null
        }
    },

    components: {
        'fields-renderer': Vue.defineAsyncComponent(() => App.utils.import('settings:assets/vue-components/fields-renderer.js'))
    },

    template: /*html*/`
        <div>

            <div class="kiss-size-4 kiss-text-bold kiss-margin-bottom">{{ t('Edit component') }}</div>

            <input class="kiss-input" type="text" v-model="item.label">
            <fields-renderer class="kiss-margin-large" v-model="item.data" :fields="meta.fields" :nested="true"></fields-renderer>

            <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                <button type="button" class="kiss-button kiss-flex-1" @click="$close()">{{ t('Cancel') }}</button>
                <button type="button" class="kiss-button kiss-button-primary kiss-flex-1" @click="save">{{ t('Save') }}</button>
            </div>
        </kiss-row>
    `,

    methods: {
        save() {
            Object.assign(this.component, this.item);
            this.$close();
        }
    }

}


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

            <vue-draggable
                :list="val"
                :group="group || uid"
                @change="change"
                handle=".lm-handle"
                class="field-layout-dragarea"
                style="min-height: 100px;"
            >
                <template #item="{ element }">
                    <kiss-card class="kiss-padding-small" theme="bordered" style="margin: 8px 0;">
                        <div class="kiss-flex kiss-flex-middle">
                            <a class="lm-handle kiss-margin-small-right kiss-color-muted"><icon>drag_handle</icon></a>
                            <a class="kiss-margin-small-right kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                            <a class="kiss-margin-small-right" @click="edit(element)"><icon>tune</icon></a>
                            <div class="kiss-flex-1 kiss-size-small kiss-text-bold">
                                {{ element.label }}
                            </div>
                        </div>
                        <field-layout class="kiss-margin-small" v-model="element.children" :group="group || uid" :level="++level" v-if="element.children"></field-layout>
                    </kiss-card>
                </template>
            </vue-draggable>

            <div class="kiss-margin-small kiss-align-center">
                <a @click="addComponent"><icon :class="{'kiss-size-small':level}">control_point</icon></a>
            </div>

        </div>
    `,

    methods: {

        addComponent() {

            App.utils.vueOffcanvas(pickComponent, null, {

                select: component => {

                    let meta = Components[component], data = {};

                    (meta.fields || []).forEach(field => {
                        data[field.name] = null;
                    });

                    this.val.push({
                        component,
                        label: meta.label || component,
                        children: meta.children ? [] : null,
                        data
                    });
                }
            }, {flip: true, size: 'large'})

        },

        edit(item) {

            let meta = Components[item.component];

            App.utils.vueModal(editComponent, {component: item}, {

            }, {size: 'large'})
        },

        remove(item) {
            this.val.splice(this.val.indexOf(item), 1);
            this.update();
        },

        change(evt) {
            this.update();
        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}