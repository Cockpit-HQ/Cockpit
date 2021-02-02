let FieldsCollection = {

    fields : {},

    collect() {

        let promises = [];

        Object.keys(VueView.components).forEach((c, match, promise) => {

            match = c.match(/^field\-(.*)/);

            if (match && typeof(VueView.components[c]) == 'string') {

                promises.push(App.utils.import(VueView.components[c]).then(def => {

                    if (!def.default._meta) return;

                    this.fields[c.replace('field-', '')] = def.default._meta;
                }));
            }
        });

        return Promise.all(promises).then(() => this.fields);
    }

}


export default {
    data() {

        return {
            fields: [],
            availableFields: [],
            field: null,
            ready: false,

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

    template: /*html*/`
        <div>

            <app-loader size="small" v-if="!ready"></app-loader>

            <kiss-card class="animated fadeIn kiss-padding kiss-align-center kiss-text-caption" theme="bordered" v-if="ready && !fields.length">
                <div class="kiss-text-bold">{{ t('No fields') }}</div>
            </kiss-card>

            <vue-draggable class="animated fadeIn" v-model="fields" v-if="ready && fields.length" handle=".fm-handle">
                <template #item="{ element }">
                    <kiss-card class="kiss-padding kiss-flex kiss-flex-middle" theme="bordered" style="margin: 8px 0;">
                        <div class="kiss-size-small kiss-flex-1">{{ element.label || element.name }}</div>
                        <div class="kiss-badge kiss-text-caption">{{element.type}}</div>
                        <a class="kiss-margin-left" @click="edit(element)"><icon>settings</icon></a>
                        <a class="kiss-margin-left kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                        <a class="fm-handle kiss-margin-left kiss-color-muted"><icon>drag_handle</icon></a>
                    </kiss-card>
                </template>
            </vue-draggable>

            <div class="kiss-margin kiss-align-center" v-if="ready">
                <a @click="add"><icon>control_point</icon></a>
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
                                <option :value="fieldType" v-for="(f,fieldType) in availableFields">{{ f.label || fieldType }}</option>
                            </select>
                        </div>

                        <app-tabs class="kiss-margin-large">
                            <tab class="animated fadeIn faster" :title="t('General')">

                                <div class="kiss-margin">
                                    <label>{{t('Display name')}}</label>
                                    <input class="kiss-input kiss-width-1-1" type="text" v-model="field.label">
                                </div>

                                <div class="kiss-margin">
                                    <label>{{t('Group')}}</label>
                                    <input class="kiss-input kiss-width-1-1" type="text" v-model="field.group">
                                </div>

                                <div class="kiss-margin">
                                    <label>{{t('Options')}}</label>
                                    <field-object v-model="field.opts"></field-object>
                                </div>


                            </tab>
                            <tab class="animated fadeIn faster" :title="t('Meta')">
                                <div class="kiss-margin">
                                    <label>{{t('Meta')}}</label>
                                    <field-object v-model="field.meta" :height="150"></field-object>
                                </div>
                            </tab>
                        </app-tabs>


                        <div class="kiss-margin-large-top kiss-flex kiss-flex-right kiss-flex-middle">

                            <a class="kiss-button" @click="field=null" v-if="!state.editField">
                                {{ t('Cancel') }}
                            </a>
                            <button class="kiss-button kiss-button-primary kiss-margin-left">
                                <span v-if="!state.editField">{{ t('Add field') }}</span>
                                <span v-if="state.editField">{{ t('Close') }}</span>
                            </button>
                        </div>


                    </form>
                </kiss-content>
            </kiss-dialog>
        </teleport>
    `,

    mounted() {

        FieldsCollection.collect().then(fields => {
            this.availableFields = fields;
            this.ready = true;
        });
    },

    methods: {

        add() {

            this.state.editField = false;

            this.field = {
                name: '',
                type: 'text',
                label: '',
                group: '',
                i18n: false,
                required: false,
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