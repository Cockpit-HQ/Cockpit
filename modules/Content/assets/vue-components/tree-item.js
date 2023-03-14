export default {

    name: 'tree-item',

    data() {
        return {
            fieldTypes: null
        }
    },

    props: {
        model: {
            type: Object,
            default: null
        },
        item: {
            type: Object,
            default: null
        },
        locale: {
            type: String,
            default: 'default'
        }
    },

    mounted() {
        App.utils.import('system:assets/js/settings.js').then(exp => {

            exp.FieldTypes.get().then(types => {
                this.fieldTypes = types;
            });
        });
    },

    computed: {

        meta() {
            return (this.model.meta || {}).tree || {};
        },

        contents() {
            return App.utils.$interpolate(this.meta.display || '', { data: this.item });
        },

        fields() {
            return (Array.isArray(this.model.fields) ? this.model.fields : []).slice(0, 3);
        }

    },


    template: /*html*/`
        <div class="kiss-flex kiss-flex-middle" v-if="fieldTypes">
            <div><icon :class="{'kiss-color-danger': !item._state, 'kiss-color-success': item._state === 1}">circle</icon></div>
            <div class="kiss-margin-small-left" v-if="meta.display" v-html="contents"></div>
            <div class="kiss-margin-small-left" v-if="!meta.display" v-for="field in fields">
                <span class="kiss-badge kiss-badge-outline kiss-color-muted" v-if="item[field.name] == null">n/a</span>
                <div class="kiss-text-truncate" v-else-if="fieldTypes[field.type] && fieldTypes[field.type].render" v-html="fieldTypes[field.type].render(item[field.name], field, 'table-cell')"></div>
                <div class="kiss-text-truncate" v-else>
                    <span class="kiss-badge kiss-badge-outline" v-if="Array.isArray(item[field.name])">{{ item[field.name].length }}</span>
                    <span class="kiss-badge kiss-badge-outline" v-else-if="typeof(item[field.name]) == 'object'">Object</span>
                    <span v-else>{{ item[field.name] }}</span>
                </div>
            </div>
        </div>
    `
}
