import { FieldTypes } from "../../js/settings.js"

let instanceCount = 0;

let FieldsManager = {

    name: 'fields-manager',

    data() {

        return {
            uid: `fm-${++instanceCount}`,
            fields: this.modelValue || [],
            fieldTypes: null,
            field: null,

            fieldType: {
                filter: '',
                selected: null,
                type: null
            },

            state: {
                editField: false
            }
        }
    },

    mounted() {
        FieldTypes.get().then(fieldTypes => {

            this.fieldTypes = {};

            Object.keys(fieldTypes).sort().forEach(ft => {
                this.fieldTypes[ft] = fieldTypes[ft];
            });
        });
    },

    props: {
        modelValue: {
            type: Array,
            default: []
        },
        i18n: {
            type: Boolean,
            default: true
        }
    },

    watch: {
        fields: {
            handler() { this.update() },
            deep: true
        },
        field(){
            this.fieldType = {};
        },
        modelValue(val) {
            this.fields = Array.isArray(val) ? val : [];
        }
    },

    computed: {
        fieldGroups() {

            let groups = [];

            this.fields.forEach(f => {
                if (f.group && f.group.trim() && this.field !==  f) groups.push(f.group);
            })

            return [...new Set(groups)].sort();
        },

        filteredFieledTypes() {

            let meta = null, types = {};

            Object.keys(this.fieldTypes).forEach(ft => {

                meta = this.fieldTypes[ft]

                if (this.fieldType.filter && !`${ft} ${meta.label || ''}`.toLocaleLowerCase().includes(this.fieldType.filter.toLocaleLowerCase())) {
                    return;
                }

                types[ft] = meta;
            });

            return types;
        }
    },

    methods: {

        add(previous) {

            this.state.editField = false;
            this.state.position = previous ? this.fields.indexOf(previous) + 1 : false;

            this.field = {
                name: '',
                type: 'text',
                label: '',
                info: '',
                group: '',
                i18n: false,
                required: false,
                multiple: false,
                meta: {},
                opts: {},
            };
        },

        edit(field) {

            this.state.editField = true;
            this.state.position = false;

            if (Array.isArray(field.opts)) field.opts = {};
            if (Array.isArray(field.meta)) field.meta = {};

            this.field = field;
        },

        remove(field) {
            this.fields.splice(this.fields.indexOf(field), 1);
        },

        addOrEditField() {

            if (!this.state.editField) {

                if (this.state.position !== false) {
                    this.fields.splice(this.state.position, 0, this.field);
                } else {
                    this.fields.push(this.field);
                }
            }

            this.$forceUpdate();

            this.field = null;
        },

        setFieldType(fieldType) {

            if (this.field.type != fieldType) {
                this.field.opts = {};
                this.field.type = fieldType;
            }
        },

        fieldTypeKeyboardSelect(event) {

            switch (event.keyCode) {

                // close on ESC
                case 27:
                    this.fieldType.selected = null;
                    break;
                // enter
                case 13:

                    if (this.fieldType.selected !== null && this.fieldType.type) {
                        event.preventDefault();
                        this.setFieldType(this.fieldType.type);
                        this.$refs.fieldTypeSelectorPopout.close();
                        return;
                    }

                    if (Object.keys(this.filteredFieledTypes).length === 1) {
                        event.preventDefault();
                        this.setFieldType(Object.keys(this.filteredFieledTypes)[0]);
                        this.$refs.fieldTypeSelectorPopout.close();
                        return;
                    }

                    break;

                // up | down
                case 38:
                case 40:

                    const ftypes = Object.keys(this.filteredFieledTypes);

                    if (!ftypes.length) {
                        return;
                    }

                    event.preventDefault();

                    if (this.fieldType.selected === null) {
                        this.fieldType.selected = event.keyCode == 38 ? ftypes.length - 1 : 0;
                    } else {

                        if (event.keyCode == 38) {
                            this.fieldType.selected = ftypes[this.fieldType.selected - 1] ? this.fieldType.selected - 1 : ftypes.length - 1 ;
                        } else {
                            this.fieldType.selected = ftypes[this.fieldType.selected + 1] ? this.fieldType.selected + 1 : 0 ;
                        }
                    }

                    this.fieldType.type = ftypes[this.fieldType.selected];

                    const ele = document.getElementById(`${this.uid}-field-type-picker-${this.fieldType.type}`);

                    if (ele) {
                        ele.scrollIntoView({behavior: 'smooth', block: 'start'});
                    }
                    break;
            }
        },

        update() {

            this.error = null

            try {
                this.$emit('update:modelValue', this.fields)
            } catch(e) {
                this.error = `${e.lineNumber}: ${e.message}`;
            }
        }
    },

    template: /*html*/`
        <div>

            <kiss-card class="animated fadeIn kiss-padding kiss-align-center kiss-text-caption" theme="contrast" v-if="!fields.length">
                <div class="kiss-text-bold">{{ t('No fields') }}</div>
            </kiss-card>

            <app-loader v-if="!fieldTypes"></app-loader>

            <vue-draggable v-model="fields" :animation="150" v-if="fieldTypes && fields.length" handle=".fm-handle">

                <div class="kiss-position-relative" style="margin: 8px 0;" v-for="(element, index) in fields">
                    <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-visible-toggle" gap="small" theme="bordered contrast" hover="bordered-primary">
                        <a class="fm-handle kiss-margin-small-right kiss-color-muted"><icon>drag_handle</icon></a>
                        <div class="kiss-margin-small-right">
                            <div class="kiss-padding-small app-border-radius" :style="{background: fieldTypes?.[element.type]?.color ?? 'rgb(255, 248, 214)'}">
                                <img :src="$baseUrl(fieldTypes?.[element.type]?.icon ?? 'system:assets/icons/edit.svg')" width="20" height="20" style="opacity:.6" :title="element.type">
                            </div>
                        </div>
                        <div class="kiss-flex-1">
                            <div class="kiss-flex kiss-text-bold" gap="xsmall">
                                {{ element.label || element.name }}
                                <icon class="kiss-color-muted" v-if="element.i18n">language</icon>
                                <icon class="kiss-color-muted" v-if="element.multiple">format_list_numbered</icon>
                                <icon class="kiss-color-muted" v-if="element.condition">conversion_path</icon>
                            </div>
                            <div class="kiss-size-xsmall">
                                <span class="kiss-color-muted">{{ element.name }}</span>
                            </div>
                        </div>
                        <div class="kiss-size-small kiss-color-muted kiss-invisible-hover">{{ element.group || '' }}</div>
                        <div class="kiss-button-group kiss-invisible-hover kiss-size-xsmall">
                            <a class="kiss-button kiss-button-small" :title="t('Move up')" v-if="fields.indexOf(element) !== 0" @click="fields.splice(index - 1, 0, fields.splice(index, 1)[0])"><icon>arrow_upward</icon></a>
                            <a class="kiss-button kiss-button-small" :title="t('Move down')" v-if="fields.indexOf(element) !== fields.length - 1" @click="fields.splice(index, 2, fields[index + 1], fields[index])"><icon>arrow_downward</icon></a>
                        </div>
                        <a @click="edit(element)"><icon>settings</icon></a>
                        <a class="kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                    </kiss-card>

                    <div class="kiss-position-absolute kiss-width-1-3 kiss-align-center kiss-visible-toggle" style="bottom:0;height:20px;left:50%;transform:translateX(-50%) translateY(15%);z-index:5;" v-if="fields.length > 1 && index !== (fields.length - 1)">
                        <button type="button" class="kiss-button kiss-button-small kiss-hidden-hover animated fadeIn faster" :title="t('Add field')" @click="add(element)"><span class="kiss-size-6">+</span></button>
                    </div>
                </div>

            </vue-draggable>

            <div class="kiss-margin-small" v-if="fieldTypes">
                <button type="button" class="kiss-button kiss-button-small" @click="add()"><icon class="kiss-margin-small-right">control_point</icon> {{ t('Add field') }}</button>
            </div>

        </div>

        <teleport to="body">
            <kiss-dialog open="true" size="large" v-if="field">
                <kiss-content class="animated fadeInUp faster">

                    <div class="kiss-size-4 kiss-text-bold kiss-flex kiss-flex-middle">
                        <icon class="kiss-size-3 kiss-margin-small-right">tune</icon>
                        {{ t('Field settings') }}
                    </div>

                    <form class="kiss-margin" @submit.prevent="addOrEditField">

                        <div class="kiss-margin">
                            <label>{{t('Name')}}</label>
                            <input class="kiss-input kiss-width-1-1" type="text" v-model="field.name" required>
                        </div>

                        <div class="kiss-margin">
                            <label>{{t('Type')}}</label>

                            <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-position-relative" theme="bordered">
                                <div class="kiss-padding-small app-border-radius kiss-margin-right" :style="{background: fieldTypes?.[field.type]?.color ?? 'rgb(255, 248, 214)'}">
                                    <img :src="$baseUrl(fieldTypes?.[field.type]?.icon ?? 'system:assets/icons/edit.svg')" width="20" height="20">
                                </div>
                                <div>
                                    <div class="kiss-text-bold kiss-size-small">{{ fieldTypes?.[field.type]?.label ?? field.type }}</div>
                                    <div class="kiss-color-muted kiss-size-xsmall">{{ fieldTypes?.[field.type]?.info ?? '' }}</div>
                                </div>
                                <a class="kiss-cover" :kiss-popout="'#'+uid+'-fieldtype-selector'"></a>
                            </kiss-card>
                        </div>

                        <kiss-tabs class="kiss-margin-large">
                            <tab :caption="t('General')">

                                <div class="kiss-margin">
                                    <label>{{t('Display name')}}</label>
                                    <input class="kiss-input kiss-width-1-1" type="text" v-model="field.label">
                                </div>

                                <div class="kiss-margin">
                                    <label>{{t('Info')}}</label>
                                    <input class="kiss-input kiss-width-1-1" type="text" v-model="field.info">
                                    <div class="kiss-size-small kiss-color-muted kiss-margin-small-top">{{ t('Displays a hint for content editors') }}</div>
                                </div>

                                <div class="kiss-margin">
                                    <label>{{t('Group')}}</label>
                                    <input class="kiss-input kiss-width-1-1" type="text" v-model="field.group" :list="uid+'-field-group'">
                                </div>
                                <datalist :id="uid+'-field-group'" v-if="fieldGroups.length">
                                    <option v-for="group in fieldGroups">{{ group }}</option>
                                </datalist>

                                <div class="kiss-margin">
                                    <field-boolean class="kiss-margin-small" v-model="field.required" :label="t('Required')"></field-boolean>
                                    <field-boolean class="kiss-margin-small" v-model="field.i18n" :label="t('Localize field')" v-if="i18n"></field-boolean>
                                    <field-boolean class="kiss-margin-small" v-model="field.multiple" :label="t('Allow multiple values')"></field-boolean>
                                </div>

                            </tab>
                            <tab :caption="t('Options')">

                                <div class="kiss-margin-bottom kiss-flex kiss-flex-right" v-if="fieldTypes[field.type] && fieldTypes[field.type].settings">
                                    <div class="kiss-button-group">
                                        <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': state.optionsView != 'json'}" @click="state.optionsView = 'form'" type="button">Fields</button>
                                        <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': state.optionsView === 'json'}" @click="state.optionsView = 'json'" type="button">JSON</button>
                                    </div>
                                </div>

                                <div class="kiss-margin kiss-dialog-overflow" style="max-height:30vh;" v-if="state.optionsView != 'json'">
                                    <fields-renderer v-model="field.opts" :fields="fieldTypes[field.type].settings" v-if="fieldTypes[field.type] && fieldTypes[field.type].settings"></fields-renderer>
                                </div>

                                <div class="kiss-margin" v-if="!(fieldTypes[field.type] && fieldTypes[field.type].settings) || state.optionsView === 'json'">
                                    <field-object v-model="field.opts"></field-object>
                                </div>

                            </tab>
                            <tab :caption="t('Meta')">
                                <div class="kiss-margin">
                                    <label>{{t('Meta')}}</label>
                                    <field-object v-model="field.meta" :height="150"></field-object>
                                </div>
                                <div class="kiss-margin">
                                    <label>{{t('Condition')}}</label>
                                    <field-code v-model="field.condition" mode="js" :height="100"></field-code>
                                    <div class="kiss-size-small kiss-color-muted kiss-margin-small-top">{{ t('Show or hide field based on a condition') }}</div>
                                </div>
                            </tab>
                        </kiss-tabs>


                        <div class="kiss-margin-large-top kiss-flex kiss-flex-right">

                            <div class="kiss-button-group">
                                <a class="kiss-button" @click="field=null" v-if="!state.editField">
                                    {{ t('Cancel') }}
                                </a>
                                <button class="kiss-button kiss-button-primary">
                                    <span v-if="!state.editField">{{ t('Add field') }}</span>
                                    <span v-if="state.editField">{{ t('Close') }}</span>
                                </button>
                            </div>
                        </div>


                    </form>
                </kiss-content>
            </kiss-dialog>

            <kiss-popout :id="uid+'-fieldtype-selector'" modal="true" ref="fieldTypeSelectorPopout" @popoutclose="fieldType = {}">
                <kiss-content class="kiss-width-1-3@m">
                        <div class="kiss-size-4 kiss-text-bold">{{ t('Select field type') }}</div>
                        <div class="kiss-margin">
                            <input class="kiss-input kiss-width-1-1" :placeholder="t('Filter...')" @keydown="fieldTypeKeyboardSelect" @input="fieldType.selected=null" v-model="fieldType.filter" autofocus>
                        </div>
                        <kiss-navlist style="height:50vh;overflow:scroll;" v-if="field">

                            <kiss-card :id="uid+'-field-type-picker-'+fieldTypeName" class="kiss-padding-small kiss-margin-xsmall" theme="bordered" hover="contrast shadow" :style="{borderColor: (fieldType.selected || fieldType.selected == 0) && fieldType.type == fieldTypeName ? 'var(--kiss-color-primary)':''}" v-for="(f,fieldTypeName) in filteredFieledTypes">
                                <kiss-row class="kiss-position-relative kiss-flex-middle" gap="small" kiss-popout-close="true">
                                    <div>
                                        <div class="kiss-padding-small app-border-radius" :style="{background: f.color || 'rgb(255, 248, 214)'}">
                                            <img :src="$baseUrl(f.icon || 'system:assets/icons/edit.svg')" width="20" height="20" :title="fieldType">
                                        </div>
                                    </div>
                                    <div class="kiss-flex-1">
                                        <strong class="kiss-size-small">{{ f.label || fieldTypeName }}</strong>
                                        <div class="kiss-color-muted kiss-size-xsmall">{{ f.info || '' }}</div>
                                    </div>
                                    <a class="kiss-cover" @click="setFieldType(fieldTypeName)"></a>
                                </kiss-row>
                            </kiss-card>

                        </kiss-navlist>
                        <div class="kiss-margin">
                            <button type="button" class="kiss-button kiss-width-1-1" kiss-popout-close="true">{{ t('Cancel') }}</button>
                        </div>
                </kiss-content>
            </kiss-popout>
        </teleport>
    `
}

export default FieldsManager;
