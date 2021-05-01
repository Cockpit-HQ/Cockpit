import { FieldTypes } from "../js/settings.js"

let FieldRenderer = {

    data() {

        return {
            val: this.modelValue
        }
    },

    props: {
        modelValue: {
            default: null
        },
        field: {
            default: null
        },
        languages: {
            type: Array,
            default: []
        },
    },

    watch: {
        val: {
            handler() {
                this.update()
            },
            deep: true
        },
        modelValue() {
            this.val = this.modelValue;
            this.update();
        }
    },

    template: /*html*/`
        <div v-is="'field-'+field.type" v-model="val" v-bind="field.opts"></div>
    `,

    methods: {
        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}


export default {

    data() {

        return {
            val: this.modelValue,
            fieldItem: null,
            fieldTypes: null
        }
    },

    props: {
        modelValue: {
            default: null
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

    components: {
        fieldRenderer: FieldRenderer
    },

    template: /*html*/`
        <div v-if="fieldTypes">
            <app-fieldcontainer class="kiss-margin" v-for="field in fields">
                <label class="kiss-text-capitalize">{{field.label || field.name}}</label>
                <div class="kiss-color-muted kiss-size-small" v-if="field.info">{{ field.info }}</div>
                <field-renderer class="kiss-margin-small-top" :field="field" v-model="val[field.name]" v-if="!field.multiple"></field-renderer>

                <div class="kiss-margin-small-top" v-if="field.multiple">

                    <kiss-card class="kiss-padding-small kiss-size-small kiss-color-muted" theme="bordered" v-show="!val[field.name] || !Array.isArray(val[field.name]) || !val[field.name].length">{{ t('No items') }}</kiss-card>

                    <vue-draggable v-model="val[field.name]" handle=".fm-handle" v-if="Array.isArray(val[field.name])">
                        <template #item="{ element, index }">
                            <div class="kiss-margin-small kiss-flex kiss-flex-middle">
                                <kiss-card class="kiss-flex-1 kiss-padding-small kiss-size-small" theme="bordered" @click="editFieldItem(field, index)">
                                    {{ getPreview(val[field.name][index], field) }}
                                </kiss-card>
                                <a class="kiss-margin-small-left kiss-color-danger" @click="removeFieldItem(val[field.name], index)"><icon>delete</icon></a>
                                <a class="fm-handle kiss-margin-left kiss-color-muted"><icon>drag_handle</icon></a>
                            </div>
                        </template>
                    </vue-draggable>

                    <div class="kiss-margin kiss-align-center">
                        <a @click="addFieldItem(field)" :tooltip="t('Add item')" flow="down"><icon class="kiss-size-large">control_point</icon></a>
                    </div>
                </div>

            </app-fieldcontainer>
        </div>
        <teleport to="body">
            <kiss-dialog open="true" size="large" v-if="fieldItem">
                <kiss-content class="animated fadeInUp faster">

                    <div class="kiss-size-4 kiss-text-bold kiss-margin">{{fieldItem.create ? t('Add item'):t('Edit item')}}</div>

                    <div class="kiss-margin-top">
                        <div><span class="kiss-badge kiss-text-upper">{{fieldItem.field.type}}</span></div>
                        <field-renderer class="kiss-margin-small-top" :field="fieldItem.field" v-model="fieldItem.value"></field-renderer>
                    </div>

                    <div class="kiss-button-group kiss-child-width-1-2 kiss-flex kiss-margin-top">
                        <a class="kiss-button" @click="fieldItem=null">
                            {{ t('Cancel') }}
                        </a>
                        <button class="kiss-button kiss-button-primary" @click="saveFieldItem">
                            <span v-if="!fieldItem.create">{{ t('Edit item') }}</span>
                            <span v-if="fieldItem.create">{{ t('Add item') }}</span>
                        </button>
                    </div>

                </kiss-content>
            </kiss-dialog>
        </teleport>
    `,

    mounted() {
        FieldTypes.get().then(types => {
            this.fieldTypes = types;
        })
    },

    methods: {

        addFieldItem(field) {

            if (!Array.isArray(this.val[field.name])) {
                this.val[field.name] = [];
            }

            this.fieldItem = {
                field,
                value: JSON.parse(JSON.stringify(field.default || null)),
                create: true
            };
        },

        editFieldItem(field, index) {

            this.fieldItem = {
                field,
                value: JSON.parse(JSON.stringify(this.val[field.name][index])),
                index
            };
        },

        saveFieldItem() {

            if (this.fieldItem.value === null) {
                this.fieldItem = null;
                return;
            }

            if (this.fieldItem.create) {
                this.val[this.fieldItem.field.name].push(this.fieldItem.value);
            } else {
                this.val[this.fieldItem.field.name][this.fieldItem.index] = this.fieldItem.value;
            }

            this.fieldItem = null;
        },

        removeFieldItem(list, index) {
            list.splice(index, 1);
        },

        getPreview(value, field) {

            if (this.fieldTypes[field.type] && this.fieldTypes[field.type].render) {
               return this.fieldTypes[field.type].render(value, field);
            }

            return value;
        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    }
}