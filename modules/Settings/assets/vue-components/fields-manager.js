import { FieldTypes } from "../js/settings.js"

let fieldTypes = await FieldTypes.get();
let instanceCount = 0;

export default {
    data() {

        return {
            uid: `fm-${++instanceCount}`,
            fields: this.modelValue || [],
            fieldTypes,
            field: null,

            state: {
                editField: false
            }
        }
    },

    props: {
        modelValue: {
            type: Array,
            default: []
        }
    },

    watch: {
        fields: {
            handler() { this.update() },
            deep: true
        },
        modelValue(val) {
            this.fields = Array.isArray(val) ? val : [];
        }
    },

    computed: {
        fieldGroups() {

            let groups = [];

            this.fields.forEach(f => {
                if (f.group.trim() && this.field !==  f) groups.push(f.group);
            })

            return _.uniq(groups).sort();
        }
    },

    template: /*html*/`
        <div>

            <kiss-card class="animated fadeIn kiss-padding kiss-align-center kiss-text-caption" theme="bordered" v-if="!fields.length">
                <div class="kiss-text-bold">{{ t('No fields') }}</div>
            </kiss-card>

            <vue-draggable v-model="fields" v-if="fields.length" handle=".fm-handle">
                <template #item="{ element }">
                    <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle" theme="bordered" style="margin: 8px 0;">
                        <div class="kiss-margin-right">
                            <div class="kiss-padding-small app-border-radius" :style="{background: _.get(fieldTypes, element.type+'.color', 'rgb(255, 248, 214)')}">
                                <img :src="$base(_.get(fieldTypes, element.type+'.icon', 'settings:assets/icons/edit.svg'))" width="20" height="20" style="opacity:.6" :title="element.type">
                            </div>
                        </div>
                        <div class="kiss-flex-1 kiss-text-bold">{{ element.label || element.name }}</div>
                        <div class="kiss-margin-small-right kiss-size-small kiss-color-muted">{{ element.group || '' }}</div>
                        <a class="kiss-margin-left" @click="edit(element)"><icon>settings</icon></a>
                        <a class="kiss-margin-left kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                        <a class="fm-handle kiss-margin-left kiss-color-muted"><icon>drag_handle</icon></a>
                    </kiss-card>
                </template>
            </vue-draggable>

            <div class="kiss-margin kiss-align-center" v-if="ready">
                <a class="kiss-size-large" @click="add"><icon>control_point</icon></a>
            </div>

        </div>

        <teleport to="body">
            <kiss-dialog open="true" size="large" v-if="field">
                <kiss-content class="animated fadeInUp faster">

                    <div class="kiss-size-4 kiss-text-bold">{{ t('Field settings') }}</div>

                    <form class="kiss-margin" @submit.prevent="addOrEditField">

                        <div class="kiss-margin">
                            <label>{{t('Name')}}</label>
                            <input class="kiss-input kiss-width-1-1" type="text" v-model="field.name" required>
                        </div>

                        <div class="kiss-margin">
                            <label>{{t('Type')}}</label>
                            <select class="kiss-input kiss-width-1-1" type="text" v-model="field.type" required>
                                <option></option>
                                <option :value="fieldType" v-for="(f,fieldType) in fieldTypes">{{ f.label || fieldType }}</option>
                            </select>
                        </div>

                        <app-tabs class="kiss-margin-large">
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
                                <field-boolean class="kiss-margin-small" v-model="field.i18n" :label="t('Localize field')"></field-boolean>
                                <field-boolean class="kiss-margin-small" v-model="field.multiple" :label="t('Allow multiple values')"></field-boolean>
                                </div>

                            </tab>
                            <tab :caption="t('Options')">

                                <div class="kiss-margin">
                                    <label>{{t('Options')}}</label>
                                    <field-object v-model="field.opts"></field-object>
                                </div>

                            </tab>
                            <tab :caption="t('Meta')">
                                <div class="kiss-margin">
                                    <label>{{t('Meta')}}</label>
                                    <field-object v-model="field.meta" :height="150"></field-object>
                                </div>
                            </tab>
                        </app-tabs>


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
        </teleport>
    `,

    methods: {

        add() {

            this.state.editField = false;

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
            this.field = field;
        },

        remove(field) {
            this.fields.splice(this.fields.indexOf(field), 1);
        },

        addOrEditField() {

            if (!this.state.editField) {
                this.fields.push(this.field);
            }

            this.$forceUpdate();

            this.field = null;
        },

        update() {

            this.error = null

            try {
                this.$emit('update:modelValue', this.fields)
            } catch(e) {
                this.error = `${e.lineNumber}: ${e.message}`;
            }
        }
    }
}