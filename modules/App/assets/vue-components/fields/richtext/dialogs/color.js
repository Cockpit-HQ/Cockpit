export default {

    _meta: {
        size: 'medium',
    },

    data() {
        return {
            value: this.color || ''
        }
    },

    props: {
        color: {
            type: String,
            default: ''
        }
    },

    computed: {
        bgColor() {
            return this.value || '';
        }
    },

    methods: {
        save() {
            this.$call('save', this.value);
            this.$close();
        }
    },

    template: /*html*/`
        <div>
            <div class="kiss-size-4 kiss-text-bold">{{ t('Color') }}</div>

            <kiss-card class="kiss-margin kiss-display-block" theme="bordered contrast" :style="{backgroundColor:bgColor}">
                <canvas width="800" height="200"></canvas>
                <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center">
                    <div class="kiss-button-group">
                        <button type="button" class="kiss-button kiss-overlay-input">
                            <icon>colorize</icon>
                            <input type="color" v-model="value">
                        </button>
                        <button type="button" class="kiss-button kiss-color-danger" @click="value=''" v-if="value"><icon>delete</icon></button>
                    </div>
                </div>
            </kiss-card>

            <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                <button type="button" class="kiss-button kiss-flex-1" @click="$close()">{{ t('Cancel') }}</button>
                <button type="button" class="kiss-button kiss-button-primary kiss-flex-1" @click="save">{{ t('Save') }}</button>
            </div>
        </div>
    `
}
