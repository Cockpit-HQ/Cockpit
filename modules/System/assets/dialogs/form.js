export default {

    data() {

        return {
            val: JSON.parse(JSON.stringify(this.data || {})),
        }
    },

    props: {
        data: {
            type: Object
        },
        caption: {
            type: String
        },
        icon: {
            type: String
        },
        fields: {
            type: Array,
            default: []
        }
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <kiss-row class="kiss-flex-middle kiss-padding kiss-text-bold" gap="small">
                <kiss-svg :src="$baseUrl(icon || 'system:assets/icons/settings.svg')" width="30" height="30"></kiss-svg>
                <div class="kiss-flex-1">{{ caption || t('Form') }}</div>
            </kiss-row>
            <div class="app-offcanvas-content kiss-padding kiss-bgcolor-contrast kiss-flex-1">
                <fields-renderer v-model="val" :fields="fields"></fields-renderer>
            </div>
            <div class="kiss-padding kiss-bgcolor-contrast">
                <div class="kiss-button-group kiss-flex kiss-child-width-1-2">
                    <button class="kiss-button" kiss-offcanvas-close>{{ t('Close') }}</button>
                    <button class="kiss-button kiss-button-primary" @click="save">{{ t('Save') }}</button>
                </div>
            </div>
        </div>
    `,

    methods: {

        save() {

            let validate = { root: this.$el };

            App.trigger('fields-renderer-validate', validate);

            if (validate.errors) {
                return;
            }

            this.$call('save', this.val);
            this.$close();

        },
    }
}
