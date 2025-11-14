export default {

    data() {

        let locales = [];

        Object.keys(App._locales).forEach(key => {
            locales.push({i18n: key, name: App._locales[key]});
        });

        locales[0].visible = true;

        return {
            filter: this.ids && Array.isArray(this.ids) ? {_id: {$in: this.ids}} : {},
            loading: false,
            modelFields: JSON.parse(JSON.stringify(this.model.fields)),
            data: {},
            locales,
        }
    },

    props: {
        model: {
            type: Object
        },
        ids: {
            type: Array,
        }
    },

    mounted() {

    },

    computed: {

        fields() {
            return (this.modelFields || []).filter(field => field._selected);
        }
    },

    methods: {

        update() {

            if (!this.filter) {
                this.filter = {};
            }

            let validate = {root: this.$el}, data = {};

            App.trigger('fields-renderer-validate', validate);

            if (validate.errors) {
                return;
            }

            let allowedFields = [];
            let locales = {};
            const keys = Object.keys(this.data);

            this.locales.forEach(loc => {
                if (loc.visible) locales[loc.i18n] = loc.i18n;
            });

            this.fields.forEach(field => {

                allowedFields.push(field.name);

                if (field.i18n) {

                    Object.keys(locales).forEach(i18n => {
                        allowedFields.push(`${field.name}_${i18n}`);
                    });
                }
            });

            keys.forEach(field => {
                if (allowedFields.indexOf(field) !== -1) data[field] = this.data[field];
            });

            const update = () => {

                this.$request(`/content/collection/batchUpdate/${this.model.name}`, {filter: this.filter, data}).then(() => {
                    App.ui.notify('Items updated!');
                    this.$call('update');
                }).catch(rsp => {
                    App.ui.notify(rsp.error || 'Updating failed!', 'error');
                });
            };

            if (!Object.keys(this.filter).length) {
                App.ui.confirm('Are you sure you want to update all content items?', update);
            } else {
                update();
            }
        },
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="kiss-padding kiss-text-bold">
                {{ t('Batch edit items') }}
            </div>
            <div class="app-offcanvas-content kiss-padding kiss-bgcolor-contrast kiss-flex-1">

                <kiss-row gap="large">
                    <div class="kiss-flex-1">

                        <div class="kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-size-2 kiss-color-muted" v-if="!fields.length">
                            {{ t('Select fields to update') }}
                        </div>

                        <div v-if="fields.length">
                            <fields-renderer class="kiss-margin" v-model="data" :fields="fields" :locales="locales"></fields-renderer>
                        </div>

                    </div>
                    <div class="kiss-width-1-4@m">

                        <div class="kiss-margin" v-if="model.fields.length">

                            <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Fields') }}</div>

                            <kiss-dropdown class="kiss-display-block kiss-margin-small">
                                <button class="kiss-button kiss-width-1-1">{{ t('Add fields') }}</button>
                                <kiss-dropdownbox class="kiss-width-1-1">
                                    <kiss-navlist class="kiss-margin">
                                        <ul>
                                            <li class="kiss-nav-header">{{ t('Fields') }}</li>
                                        </ul>

                                        <ul class="kiss-overflow-y-auto" style="max-height:200px;">
                                            <li v-for="field in modelFields">
                                                <div class="kiss-flex kiss-flex-middle" :class="field._selected === false ? 'kiss-color-muted':''">
                                                    <div class="kiss-margin-small-right"><input class="kiss-checkbox" type="checkbox" v-model="field._selected"></div>
                                                    <div>{{ field.label || field.name}}</div>
                                                </div>
                                            </li>

                                        </ul>
                                    </kiss-navlist>
                                </kiss-dropdownbox>
                            </kiss-dropdown>

                            <kiss-card class="kiss-position-relative kiss-padding-small kiss-margin-small kiss-text-bolder kiss-flex kiss-flex-middle" :class="{'kiss-color-muted': !field._selected}" :theme="!field._selected ? 'bordered':'bordered contrast'" v-for="field in fields">
                                <icon class="kiss-margin-small-right kiss-color-primary">edit</icon>
                                <span class="kiss-size-small kiss-flex-1">{{ field.label || field.name }}</span>
                                <a class="kiss-color-danger" @click="field._selected = !field._selected"><icon>delete</icon></a>
                            </kiss-card>

                        </div>

                        <div class="kiss-margin" v-if="locales.length > 1">

                            <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Locales') }}</div>

                            <kiss-card class="kiss-position-relative kiss-padding-small kiss-margin-small kiss-text-bolder kiss-flex kiss-flex-middle" :class="{'kiss-color-muted': !loc.visible}" :theme="!loc.visible ? 'bordered':'bordered contrast'" v-for="loc in locales">
                                <icon class="kiss-margin-small-right" :class="{'kiss-color-primary': loc.visible}">{{ loc.visible ? 'visibility' : 'visibility_off' }}</icon>
                                <span class="kiss-size-small kiss-flex-1">{{ loc.name }}</span>
                                <span class="kiss-color-muted kiss-size-xsmall" v-if="loc.i18n == 'default'">{{ t('Default') }}</span>
                                <a class="kiss-cover" @click="loc.visible = !loc.visible"></a>
                            </kiss-card>
                        </div>

                    </div>
                </kiss-row>

            </div>
            <div class="kiss-padding kiss-padding-remove-bottom" v-if="!Array.isArray(ids) || !ids.length">
                <div class="kiss-text-caption kiss-text-bold kiss-margin-small">{{ t('Matching filter') }}</div>
                <field-object embed="true" v-model="filter" height="150"></field-object>
            </div>
            <div class="kiss-padding">
                <div class="kiss-button-group kiss-flex">
                    <button class="kiss-button kiss-flex-1" kiss-offcanvas-close>{{ t('Close') }}</button>
                    <button class="kiss-button kiss-button-primary kiss-flex-1" @click="update" v-if="fields.length">{{ t('Update') }}</button>
                </div>
            </div>
        </div>
    `,
}
