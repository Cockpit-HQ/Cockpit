
export default {

    data() {

        return  {
            val: JSON.parse(JSON.stringify(this.lkey))
        }
    },

    props: {
        lkey: {type: Object, default: null}
    },

    template: /*html*/`
        <div>

            <div class="kiss-size-4 kiss-text-caption kiss-text-bold kiss-margin-bottom">{{ t('Key editor') }}</div>

            <form @submit.prevent="save">

                <div class="kiss-margin">
                    <label>{{ t('Key') }}</label>
                    <input class="kiss-input" type="text" v-model="val.name" :placeholder="t('Key name')" required>
                </div>

                <div class="kiss-margin">
                    <label>{{ t('Info') }}</label>
                    <textarea class="kiss-input kiss-textarea" v-model="val.info" :placeholder="t('Key info')"></textarea>
                </div>

                <div class="kiss-margin">
                <field-boolean class="kiss-margin-small" v-model="val.plural" :label="t('Has plural')"></field-boolean>
                </div>

                <div class="kiss-margin">
                    <div class="kiss-button-group kiss-flex kiss-child-width-1-2">
                        <button type="button" class="kiss-button" kiss-dialog-close>{{ t('Cancel') }}</button>
                        <button class="kiss-button kiss-button-primary">{{ t('Save key') }}</button>
                    </div>
                </div>

            </form>

        </div>
    `,

    methods: {

        save() {

            this.$call('save', this.val);
            this.$close();
        }
    }
}