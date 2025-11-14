let editItem = {

    _meta: {
        size: 'large',
    },

    data() {

        let data = JSON.parse(JSON.stringify(this.item));

        if (!data.meta || Array.isArray(data.meta)) {
            data.meta = {};
        }

        return {
            data
        }
    },

    props: {
        item: {
            type: Object,
            default: null
        },
        fields: {
            type: Array,
            default: []
        },
        url: {
            type: Object,
            default: {
                type: 'field-text',
                opts: {
                    placeholder: 'https://...'
                }
            }
        },
        locale: {
            type: String,
            default: null
        }
    },

    methods: {
        save() {
            Object.assign(this.item, this.data);
            this.$close();
        }
    },

    template: /*html*/`
        <div>

            <div class="kiss-flex kiss-flex-middle kiss-margin-bottom">
                <div>
                    <kiss-svg :class="{'kiss-color-primary':data.active, 'kiss-color-danger':!data.active}" :src="$baseUrl('system:assets/icons/link.svg')" width="45" height="45"></kiss-svg>
                </div>
                <div class="kiss-flex-1 kiss-margin-left">
                    <span class="kiss-size-xsmall kiss-color-muted kiss-text-upper">{{ t('Navlink') }}</span>
                    <kiss-row class="kiss-flex-middle">
                        <div class="kiss-size-4 kiss-text-bold kiss-flex-1">{{ t('Edit link') }}</div>
                        <div><field-boolean v-model="data.active" :label="t('Active')"></field-boolean></div>
                    </kiss-row>
                </div>
            </div>

            <kiss-tabs class="kiss-margin-large">

                <tab :caption="t('General')">

                    <div class="kiss-margin">
                        <label class="kiss-size-small kiss-text-caption">{{ t('Title') }}</label>
                        <input class="kiss-input" type="text" v-model="data.title">
                    </div>
                    <div class="kiss-margin">
                        <label class="kiss-size-small kiss-text-caption">{{ t('Url') }}</label>
                        <component :is="url.type" v-model="data.url" v-bind="url.opts" :locale="locale"></component>
                    </div>
                    <div class="kiss-margin">
                        <label class="kiss-size-small kiss-text-caption">{{ t('Target') }}</label>
                        <input class="kiss-input" type="text" v-model="data.target">
                    </div>

                    <fields-renderer class="kiss-margin-large" v-model="data.data" :fields="fields"></fields-renderer>
                </tab>
                <tab :caption="t('Meta')">
                    <field-object v-model="data.meta"></field-object>
                </tab>
            </kiss-tabs>

            <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                <button type="button" class="kiss-button kiss-flex-1" @click="$close()">{{ t('Cancel') }}</button>
                <button type="button" class="kiss-button kiss-button-primary kiss-flex-1" @click="save">{{ t('Save') }}</button>
            </div>
        </div>
    `
}


let instanceCount = 0;

export default {

    name: 'field-nav',

    _meta: {
        label: 'Navigation',
        info: 'Nested navigation tree',
        icon: 'system:assets/icons/list.svg',
        settings: [
            {name: 'fields', type: 'fields-manager', opts: {i18n: false}},
        ],
    },

    data() {
        return {
            uid: `field-nav-${++instanceCount}`,
        }
    },

    props: {
        modelValue: {
            type: Array,
            default: []
        },
        fields: {
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
        },
        url: {
            type: Object,
            default: {
                type: 'field-text',
                opts: {
                    placeholder: 'https://...'
                }
            }
        },
        locale: {
            type: String,
            default: null
        }
    },

    watch: {
        modelValue: {
            handler() {
                this.val = this.modelValue || [];
            },
            deep: true
        }
    },

    computed: {
        val: {
            get() {
                return this.modelValue || []
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    },

    methods: {

        addItem(collection) {

            collection = collection || this.val;

            let data = {};

            (this.fields || []).forEach(field => {
                data[field.name] = field.default || null;
            });

            collection.push({
                active: false,
                title: '',
                url: '',
                target: '',
                data,
                children: []
            });

            this.update();
        },

        edit(item) {

            VueView.ui.modal(editItem, {item, fields: this.fields, url: this.url, locale: this.locale}, {

            })
        },

        remove(item) {
            this.val.splice(this.val.indexOf(item), 1);
            this.update();
        },

        update() {
            this.$emit('update:modelValue', this.val);
        }

    },

    template: /*html*/`
        <div field="nav">

            <kiss-card class="kiss-margin-small kiss-text-caption kiss-color-muted kiss-align-center" v-if="level === 0 && !val.length">
                {{ t('No items') }}
            </kiss-card>

            <vue-draggable
                v-model="val"
                :group="group || uid"
                :swapThreshold="0.65"
                :animation="150"
                handle=".lm-handle"
                class="field-nav-dragarea"
            >
                <div class="kiss-margin-xsmall" v-for="element in val">
                    <kiss-card class="kiss-padding-small kiss-margin-xsmall" theme="bordered shadowed" hover="contrast">
                        <div class="kiss-flex kiss-flex-middle">
                            <a class="lm-handle kiss-margin-small-right kiss-color-muted"><icon>drag_handle</icon></a>
                            <div class="kiss-flex-1 kiss-size-xsmall kiss-text-bold" :class="{'kiss-color-muted': !element.title}">
                                <a class="kiss-link-muted" @click="edit(element)">{{ element.title || t('Title...') }}<icon class="kiss-color-danger kiss-margin-small-left" size="larger" v-if="!element.active">link_off</icon></a>
                            </div>
                            <a class="kiss-margin-small-left" @click="edit(element)"><icon>tune</icon></a>
                            <a class="kiss-margin-small-left" @click="addItem(element.children)"><icon>create_new_folder</icon></a>
                            <a class="kiss-margin-small-left kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                        </div>
                    </kiss-card>

                    <div :style="{paddingLeft: (((level+1)*15)+'px')}">
                        <field-nav class="kiss-display-block" v-model="element.children" :group="group || uid" :fields="fields" :level="level+1" :url="url"></field-nav>
                    </div>
                </div>
            </vue-draggable>

            <div class="kiss-margin-small kiss-align-center" v-if="!level">
                <a @click="addItem()"><icon :class="{'kiss-size-small':level}">control_point</icon></a>
            </div>

        </div>
    `,
}
