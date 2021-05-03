import { FieldTypes } from "../js/settings.js"

let FieldRenderer = {

    data() {

        return {
            val: this.modelValue,
            fieldItem: null,
            fieldTypes: null,
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

    mounted() {
        FieldTypes.get().then(types => {
            this.fieldTypes = types;
        })
    },

    template: /*html*/`
        <div v-if="fieldTypes">

            <div v-is="'field-'+field.type" v-model="val" v-bind="field.opts" v-if="!field.multiple"></div>

            <div v-if="field.multiple">
                <kiss-card class="kiss-padding-small kiss-size-small kiss-color-muted" theme="bordered" v-show="!val || !Array.isArray(val) || !val.length">{{ t('No items') }}</kiss-card>

                <vue-draggable v-model="val" handle=".fm-handle" v-if="Array.isArray(val)">
                    <template #item="{ element, index }">
                        <div class="kiss-margin-small kiss-flex kiss-flex-middle">
                            <kiss-card class="kiss-flex-1 kiss-padding-small kiss-size-small kiss-position-relative" theme="bordered">
                                {{ getPreview(val[index], field) }}
                                <a class="kiss-cover" @click="editFieldItem(field, index)"></a>
                            </kiss-card>
                            <a class="kiss-margin-small-left kiss-color-danger" @click="removeFieldItem(val, index)"><icon>delete</icon></a>
                            <a class="fm-handle kiss-margin-left kiss-color-muted"><icon>drag_handle</icon></a>
                        </div>
                    </template>
                </vue-draggable>

                <div class="kiss-margin kiss-align-center">
                    <a @click="addFieldItem(field)" :tooltip="t('Add item')" flow="down"><icon class="kiss-size-large">control_point</icon></a>
                </div>
            </div>
        </div>

        <teleport to="body">
            <kiss-dialog open="true" size="large" v-if="fieldItem">
                <kiss-content class="animated fadeInUp faster">

                    <div class="kiss-size-4 kiss-text-bold kiss-margin">{{fieldItem.create ? t('Add item'):t('Edit item')}}</div>

                    <div class="kiss-margin-top">
                        <div class="kiss-margin-bottom"><span class="kiss-badge kiss-text-upper">{{fieldItem.field.type}}</span></div>
                        <div v-is="'field-'+field.type" v-model="fieldItem.value" v-bind="field.opts"></div>
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

    methods: {

        addFieldItem(field) {

            if (!Array.isArray(this.val)) {
                this.val = [];
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
                value: JSON.parse(JSON.stringify(this.val[index])),
                index
            };
        },

        saveFieldItem() {

            if (this.fieldItem.value === null) {
                this.fieldItem = null;
                return;
            }

            if (this.fieldItem.create) {
                this.val.push(this.fieldItem.value);
            } else {
                this.val[this.fieldItem.index] = this.fieldItem.value;
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


export default {

    data() {

        return {
            val: this.modelValue,
            group: null
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
        locales: {
            type: Array,
            default: []
        },
        nested: {
            default: false
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

    computed: {
        groups() {

            let groups = [];

            (this.fields || []).forEach(field => {
                if (!field.group || groups.indexOf(field.group) > -1) return;
                groups.push(field.group);
            });

            return groups;
        },

        visibleFields() {

            return this.fields.filter(field => {
                return !this.group || this.group == field.group;
            });
        }
    },

    components: {
        fieldRenderer: FieldRenderer
    },

    template: /*html*/`
        <div class="fields-renderer" :nested="nested">

            <app-tabs class="kiss-margin-large-bottom" static="true" v-if="groups.length">
                <ul class="app-tabs-nav">
                    <li :active="group === null">
                        <a class="app-tabs-nav-link" @click="group = null">{{t('All')}}</a>
                    </li>
                    <li :active="group == name" v-for="name in groups">
                        <a class="app-tabs-nav-link" @click="group = name">{{ name }}</a>
                    </li>
                </ul>
            </app-tabs>

            <app-fieldcontainer class="kiss-margin" v-for="field in visibleFields">
                <div>
                    <div class="kiss-flex kiss-flex-middle">
                        <label class="fields-renderer-field kiss-text-capitalize kiss-flex kiss-flex-middle kiss-flex-1">
                            {{field.label || field.name}}
                            <icon class="kiss-size-5 kiss-margin-small-left kiss-color-muted" v-if="field.i18n && locales.length">language</icon>
                        </label>
                        <a class="app-fieldcontainer-visible-hover kiss-size-xsmall kiss-margin-left" @click="val[field.name] = ((field.opts && field.opts.default) || null)">{{ t('Clear') }}</a>
                    </div>
                <div class="kiss-color-muted kiss-size-small" v-if="field.info">{{ field.info }}</div>

                <div class="kiss-margin-small-top" v-if="!field.i18n || !locales.length">
                    <field-renderer :field="field" v-model="val[field.name]"></field-renderer>
                </div>

                <div class="kiss-margin-small-top" v-if="field.i18n && locales.length">
                    <div class="kiss-margin" v-for="locale in locales">
                        <span class="kiss-badge kiss-badge-outline kiss-color-muted kiss-margin-small">{{ locale.i18n }}</span>
                        <field-renderer :field="field" v-model="val[field.name+(locale.i18n == 'default' ? '': '_'+locale.i18n)]"></field-renderer>
                    </div>
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