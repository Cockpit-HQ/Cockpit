import { FieldTypes } from "../../js/settings.js";

let fuid = 0;

export let FieldRenderer = {

    data() {

        if (!this.field.opts || (this.field.opts && Array.isArray(this.field.opts))) {
            this.field.opts = {};
        }

        // set default value if defined
        if (this.modelValue === undefined) {

            let val = null;

            val = (!this.locale && this.field.opts.default !== undefined && this.field.opts.default) || null;

            if (this.locale && this.field.opts[`default_${this.locale}`]) {
                val = this.field.opts[`default_${this.locale}`];
            }

            if (!this.locale && this.field.type == 'boolean' && val === null) {
                val = false;
            }

            this.$emit('update:modelValue', val);
        }

        return {
            val: this.modelValue,
            fieldItem: null,
            fieldTypes: null,
            actionItem: null,
            uid: `field-render-uid-${++fuid}`
        }
    },

    mounted() {
        FieldTypes.get().then(types => {
            this.fieldTypes = types;
        });
    },

    props: {
        modelValue: {
            default: undefined
        },
        field: {
            default: null
        },
        locale: {
            default: null
        }
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

    computed: {
        multipleListMode() {

            const allowed = ['list', 'grid'];

            let mode = 'list';

            if (this.fieldTypes[this.field.type]?.multipleListMode) {
                mode = this.fieldTypes[this.field.type].multipleListMode;
            }

            if (this.field.meta?.multipleListMode) {
                mode = this.field.meta.multipleListMode;
            }

            return allowed.includes(mode) ? mode : 'list';
        }
    },

    methods: {

        getFieldType() {

            if (VueView.components[`field-${this.field.type}`]) return `field-${this.field.type}`
            if (VueView.components[this.field.type]) return this.field.type;
            return 'field-object';
        },

        addFieldItem(field) {

            if (!Array.isArray(this.val)) {
                this.val = [];
            }

            let defaultAction = (field) => {

                this.fieldItem = {
                    field,
                    value: JSON.parse(JSON.stringify(field.default || null)),
                    create: true,
                    meta: this.fieldTypes[field.type]
                };
            };

            (this.fieldTypes[field.type]?.addFieldItem || defaultAction)(field, this.val);

        },

        editFieldItem(field, index) {

            this.fieldItem = {
                field,
                value: JSON.parse(JSON.stringify(this.val[index])),
                index,
                meta: this.fieldTypes[field.type]
            };
        },

        saveFieldItem() {

            let validate = {root: document.querySelector(`[data-field-render-uid="${this.uid}"]`)};

            if (validate.root) {
                App.trigger('fields-renderer-validate', validate);
            }

            if (validate.errors) {
                return;
            }

            if (this.fieldItem.field.required) {

                let field = this.fieldItem.field,
                    pass = true,
                    val = this.fieldItem.value;

                if (val && Array.isArray(val) && !val.length) {
                    pass = false;
                }

                if (!val && !(val===false || val===0)) {
                    pass = false;
                }

                if (!pass) {
                    return App.ui.notify(`<span class="kiss-text-capitalize">${field.label || field.name}</span>`, 'error', {title: this.t('Field required:')});
                }
            }

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

        cloneFieldItem(list, index) {

            let item = JSON.parse(JSON.stringify(list[index]));
            list.push(item);
        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    },

    template: /*html*/`
        <div v-if="fieldTypes">

            <component :is="getFieldType()" v-model="val" v-bind="field.opts" :locale="locale" :data-field-render-uid="uid" v-if="!field.multiple"></component>

            <div v-if="field.multiple">

                <kiss-card class="kiss-padding-larger kiss-align-center kiss-size-small kiss-color-muted" theme="contrast" v-show="!val || !Array.isArray(val) || !val.length">
                    <kiss-svg :src="$baseUrl('system:assets/icons/list-items.svg')" width="30" height="30"><canvas width="30" height="30"></canvas></kiss-svg>
                    <div class="kiss-margin-small kiss-size-small">{{ t('No items') }}</div>
                </kiss-card>

                <vue-draggable class="field-multiple-sortable-grid" v-model="val" animation="100" v-if="multipleListMode=='grid' && Array.isArray(val)">
                    <kiss-card class="kiss-padding-xsmall kiss-flex" gap="small" theme="bordered contrast" v-for="(element, index) in val">
                        <div class="kiss-position-relative kiss-size-small kiss-flex-1">
                            <span class="kiss-badge kiss-badge-outline kiss-color-muted" v-if="val[index] == null">n/a</span>
                            <div class="kiss-text-truncate" v-else-if="fieldTypes[field.type]?.render" v-html="fieldTypes[field.type].render(val[index], field)"></div>
                            <div v-else>
                                <span class="kiss-badge kiss-badge-outline" v-if="Array.isArray(val[index])">{{ val[index].length }}</span>
                                <span class="kiss-badge kiss-badge-outline" v-else-if="typeof(val[index]) === 'object'">Object</span>
                                <div class="kiss-text-truncate" v-else>{{ val[index] }}</div>
                            </div>
                            <a class="kiss-cover" @click="editFieldItem(field, index)"></a>
                        </div>
                        <a @click="actionItem = element"><icon>more_vert</icon></a>
                    </kiss-card>
                </vue-draggable>

                <vue-draggable v-model="val" animation="100" handle=".fm-handle" v-if="multipleListMode=='list' && Array.isArray(val)">
                    <div class="kiss-margin-small kiss-flex kiss-flex-middle" v-for="(element, index) in val">
                        <kiss-card class="kiss-flex-1 kiss-padding-small kiss-flex kiss-flex-middle" gap="small" theme="bordered contrast">
                            <a class="fm-handle kiss-color-muted kiss-cursor-grab"><icon>drag_handle</icon></a>
                            <div class="kiss-position-relative kiss-size-small kiss-flex-1">
                                <span class="kiss-badge kiss-badge-outline kiss-color-muted" v-if="val[index] == null">n/a</span>
                                <div class="kiss-text-truncate" v-else-if="fieldTypes[field.type]?.render" v-html="fieldTypes[field.type].render(val[index], field)"></div>
                                <div v-else>
                                    <span class="kiss-badge kiss-badge-outline" v-if="Array.isArray(val[index])">{{ val[index].length }}</span>
                                    <span class="kiss-badge kiss-badge-outline" v-else-if="typeof(val[index]) === 'object'">Object</span>
                                    <div class="kiss-text-truncate" v-else>{{ val[index] }}</div>
                                </div>
                                <a class="kiss-cover" @click="editFieldItem(field, index)"></a>
                            </div>
                            <a @click="actionItem = element"><icon>more_horiz</icon></a>
                        </kiss-card>
                    </div>
                </vue-draggable>

                <div class="kiss-margin-small">
                    <button type="button" class="kiss-button kiss-button-small" @click="addFieldItem(field)"><icon class="kiss-margin-small-right">control_point</icon> {{ t('Add item') }}</button>
                </div>
            </div>
        </div>

        <teleport to="body">
            <kiss-dialog open="true" size="large" :data-field-render-uid="uid" v-if="fieldItem">
                <kiss-content class="animated fadeInUp faster">

                    <div class="kiss-flex kiss-flex-middle">
                        <div>
                            <kiss-svg class="kiss-color-primary" :src="$baseUrl(fieldItem.meta.icon || 'system:assets/icons/edit.svg')" width="50" height="50"></kiss-svg>
                        </div>
                        <div class="kiss-flex-1 kiss-margin-left">
                            <span class="kiss-size-xsmall kiss-color-muted kiss-text-upper">{{ fieldItem.field.type }}</span>
                            <kiss-row class="kiss-flex-middle">
                                <div class="kiss-size-4 kiss-flex-1">
                                    <strong class="kiss-text-capitalize">{{ field.label || field.name}}</strong>
                                    <span class="kiss-color-muted kiss-text-light kiss-margin-small-left">{{ fieldItem.create ? t('Add item'):t('Update item') }}</span>
                                </div>
                            </kiss-row>
                        </div>
                    </div>

                    <div class="kiss-margin">
                        <fields-renderer v-model="fieldItem" :fields="[{name:'value', label: t('Item value'), type:field.type, opts:field.opts}]" :locale="locale"></fields-renderer>
                    </div>

                    <div class="kiss-button-group kiss-child-width-1-2 kiss-flex kiss-margin">
                        <a class="kiss-button" @click="fieldItem=null">
                            {{ t('Cancel') }}
                        </a>
                        <button class="kiss-button kiss-button-primary" @click="saveFieldItem">
                            <span v-if="!fieldItem.create">{{ t('Update item') }}</span>
                            <span v-if="fieldItem.create">{{ t('Add item') }}</span>
                        </button>
                    </div>

                </kiss-content>
            </kiss-dialog>
        </teleport>
        <teleport to="body" v-if="actionItem">
            <kiss-popout open="true" @popoutclose="actionItem = null">
                <kiss-content>
                    <kiss-navlist>
                        <ul>
                            <li class="kiss-nav-header">{{ field.label || field.name }} - Item</li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" @click="editFieldItem(field, val.indexOf(actionItem))">
                                    <icon class="kiss-margin-small-right">create</icon>
                                    {{ t('Edit') }}
                                </a>
                            </li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" @click="cloneFieldItem(val, val.indexOf(actionItem))">
                                    <icon class="kiss-margin-small-right">control_point_duplicate</icon>
                                    {{ t('Clone') }}
                                </a>
                            </li>
                            <li class="kiss-nav-divider" v-if="val.length > 1"></li>
                            <li v-if="val.indexOf(actionItem) !== 0">
                                <a class="kiss-flex kiss-flex-middle" @click="val.unshift(val.splice(val.indexOf(actionItem), 1)[0])">
                                    <icon class="kiss-margin-small-right">arrow_upward</icon>
                                    {{ t('Move first') }}
                                </a>
                            </li>
                            <li v-if="val.indexOf(actionItem) !== val.length - 1">
                                <a class="kiss-flex kiss-flex-middle" @click="val.push(val.splice(val.indexOf(actionItem), 1)[0])">
                                    <icon class="kiss-margin-small-right">arrow_downward</icon>
                                    {{ t('Move last') }}
                                </a>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li>
                                <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="removeFieldItem(val, val.indexOf(actionItem))">
                                    <icon class="kiss-margin-small-right">delete</icon>
                                    {{ t('Delete') }}
                                </a>
                            </li>
                        </ul>
                    </kiss-navlist>
                </kiss-content>
            </kiss-popout>
        </teleport>
    `
}


export default {

    data() {

        return {
            val: this.modelValue,
            group: null,
            uid: `app-fr-${++fuid}`,
            fieldActions: [],
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
        outline: {
            type: String,
            default: null
        },
    },

    beforeMount() {
        App.trigger('fields-renderer-init', {form: this});
    },

    mounted() {

        App.on('fields-renderer-validate', evt => {

            if (!evt.params.root.contains(this.$el)) {
                return;
            }

            let errors = [], pass = true, val;

            this.fields.forEach(field => {

                val = this.val[field.name];
                pass = true;

                if (field.required) {

                    if (val && Array.isArray(val) && !val.length) {
                        pass = false;
                    }

                    if (!val && !(val===false || val===0)) {
                        pass = false;
                    }
                }

                if (!pass) {
                    errors.push({field, required: true});
                    App.ui.notify(`<span class="kiss-size-xsmall">${this.t('Field required:')}</span><br><strong class="kiss-text-capitalize">${field.label || field.name}</strong>`, 'error');
                }
            });

            if (errors.length) {
                evt.params.errors = errors;
            }
        });

        // watch outline links on scroll
        if (this.outline) {

            this.$el.parentNode.addEventListener('fieldcontainer:focus', () => this.updateOutline());

            setTimeout(() => {
                window.addEventListener('scroll', this.updateOutline);
                this.updateOutline();
            }, 500);
        }
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
                if (!this.checkFieldCondition(field)) return;
                groups.push(field.group);
            });

            return groups.sort();
        },

        visibleFields() {

            return (this.fields || []).filter(field => {

                if (!this.checkFieldCondition(field)) {
                    return false;
                }

                return !this.group || this.group == field.group;
            });
        },
        visibleLocales() {
            return this.locales.filter(l => l.visible);
        },
    },

    components: {
        fieldRenderer: FieldRenderer
    },

    methods: {

        clear(field, val) {

            val[field.name] = (field.opts && field.opts.default !== undefined && field.opts.default) || null;

            if (field.i18n && this.locales.length) {

                this.locales.forEach(l => {
                    val[`${field.name}_${l.i18n}`] = ((field.opts && field.opts[`default_${l.i18n}`]) || null)
                });
            }

            if (field.type == 'boolean' && val[field.name] === null) {
                val[field.name] = false;
            }
        },

        copyLocaleValue(to, from, field) {
            to = field + (to === 'default' ? '': `_${to}`);
            from = field + (from === 'default' ? '': `_${from}`);

            this.val[to] = JSON.parse(JSON.stringify(this.val[from]));
        },

        update() {
            this.$emit('update:modelValue', this.val)
        },

        checkFieldCondition(field) {

            if (!field.condition) {
                return true;
            }

            // compile condition
            if (typeof(field.condition) === 'string') {

                if (!field.condition.trim()) {
                    return true;
                } else {
                    field.condition = new Function('data', `return ${field.condition}`);
                }

            }

            try {

                const check = field.condition(JSON.parse(JSON.stringify(this.val)));

                if (!check && this.val[field.name] !== undefined) {
                    delete this.val[field.name];
                }

                return check;

            } catch(e) {}

            return true;
        },

        focus(field, evt) {

            evt.preventDefault();
            evt.stopPropagation();

            const target = document.getElementById(`${this.uid}-${field.name}`);
            target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            target.focus();

            setTimeout(() => this.updateOutline(), 100);
        },

        updateOutline() {

            let links = document.getElementById(`${this.uid}-outline`).querySelectorAll('a[data-target]'), section;

            for (let i = 0; i < links.length; i++) {

                links[i].classList.remove('inview');
                links[i].classList.remove('active');
                section = document.getElementById(links[i].dataset.target);

                if (!section) {
                    continue;
                }

                if (KISS.utils.isInViewport(section, true)) {
                    links[i].classList.add('inview');

                    if (section.getAttribute('active') == 'true') {
                        links[i].classList.add('active');
                    }
                }
            }
        }
    },

    template: /*html*/`
        <div class="fields-renderer" :nested="nested">

            <kiss-card class="kiss-padding-small kiss-overlay-input kiss-flex kiss-flex-middle kiss-width-1-3@m kiss-margin" theme="bordered contrast" v-if="groups.length">
                <div class="kiss-margin-small-right">
                    <icon class="kiss-size-1" :class="{'kiss-color-muted': !group, 'kiss-color-primary': group}">{{ !group ? 'dialpad' : 'workspaces' }}</icon>
                </div>
                <div>
                    <span class="kiss-text-caption kiss-color-muted">{{ t('Group') }}</span>
                    <div :class="{'kiss-color-muted': !group, 'kiss-text-bold': group}">{{ group || t('All fields') }}</div>
                </div>
                <select v-model="group">
                    <option :value="null">{{t('All')}}</option>
                    <hr />
                    <option :selected="group == name" v-for="name in groups">{{ name }}</option>
                </select>
            </kiss-card>

            <app-fieldcontainer :id="uid+'-'+field.name" class="kiss-margin" :class="{'kiss-disabled': field.opts && field.opts.readonly}" v-for="field in visibleFields">
                <div>
                    <div class="kiss-flex kiss-flex-middle" gap="small">
                        <label class="fields-renderer-field kiss-text-capitalize kiss-flex kiss-flex-middle kiss-flex-1" gap="xsmall">
                            <div>{{field.label || field.name}}</div>
                            <icon class="kiss-size-5 kiss-color-muted" v-if="field.i18n && locales.length" :title="t('Localized')">language</icon>
                            <icon class="kiss-size-5 kiss-color-danger" v-if="field.required" :title="t('Required')">trip_origin</icon>
                        </label>
                        <div class="kiss-flex kiss-flex-middle app-fieldcontainer-visible-hover" gap="xsmall" v-if="fieldActions.length && !field.i18n">
                            <component :is="action.component" v-model="val[field.name]" :document="val" :field="field" :locale="locale" v-for="action in fieldActions"></component>
                        </div>
                        <a class="app-fieldcontainer-visible-hover" :class="{'kiss-color-muted': nested}" @click="clear(field, val)" :aria-label="t('Clear') + ': ' + (field.label || field.name)" kiss-tooltip="right" v-if="field.opts && !field.opts.readonly"><icon>backspace</icon></a>
                    </div>
                </div>
                <div class="kiss-color-muted kiss-size-xsmall" v-if="field.info">{{ field.info }}</div>

                <div class="kiss-margin-small-top" v-if="!field.i18n || !locales.length">
                    <field-renderer :field="field" v-model="val[field.name]"></field-renderer>
                </div>

                <div class="kiss-margin-small-top" v-if="field.i18n && locales.length">
                    <div class="kiss-margin" v-for="locale in visibleLocales">
                        <div class="kiss-flex kiss-flex-middle" gap="small">
                            <div class="kiss-margin-small kiss-flex kiss-flex-middle kiss-visible-toggle" gap="xsmall" v-if="Array.isArray(locales) && locales.length > 1">
                                <span class="kiss-badge kiss-badge-outline kiss-color-primary">{{ locale.i18n }}</span>
                                <kiss-dropdown>
                                    <a class="kiss-invisible-hover kiss-color-muted" :ariaLabel="t('Copy value from another locale')" kiss-tooltip="right"><icon>content_copy</icon></a>

                                    <kiss-dropdownbox pos="left">
                                        <kiss-navlist>
                                            <ul>
                                                <li class="kiss-nav-header">{{ t('Locale') }}</li>
                                                <li :class="{'kiss-hidden': l.i18n == locale.i18n}" v-for="l in locales"><a @click="copyLocaleValue(locale.i18n, l.i18n, field.name)">{{ l.name }}</a></li>
                                            </ul>
                                        </kiss-navlist>
                                    </kiss-dropdownbox>
                                </kiss-dropdown>
                            </div>
                            <div class="kiss-flex-1"></div>
                            <div class="kiss-flex kiss-flex-middle app-fieldcontainer-visible-hover" gap="xsmall" v-if="fieldActions.length">
                                <component :is="action.component" v-model="val[field.name+(locale.i18n === 'default' ? '': '_'+locale.i18n)]" :document="val" :field="field" :locale="locale.i18n" v-for="action in fieldActions"></component>
                            </div>
                        </div>
                        <field-renderer :field="field" :locale="locale.i18n" v-model="val[field.name+(locale.i18n === 'default' ? '': '_'+locale.i18n)]"></field-renderer>
                    </div>
                </div>

            </app-fieldcontainer>
        </div>
        <teleport :to="outline" v-if="outline">
            <kiss-card>
                <div class="kiss-text-caption kiss-text-bold">{{ t('Fields') }}</div>
                <ul :id="uid+'-outline'" class="app-field-links-outline kiss-margin-small">
                    <li v-for="field in visibleFields">
                        <div>
                            <a class="kiss-text-capitalize kiss-text-truncate" :data-target="uid+'-'+field.name" @click="evt => focus(field, evt)">
                                {{ field.label || field.name }}
                            </a>
                        </div>
                    </li>
                </ul>
            </kiss-card>
        </teleport>
    `
}
