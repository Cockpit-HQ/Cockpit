let instanceCount = 0;

export default {
    data() {

        return {
            uid: `richtext-action-format-${++instanceCount}`
        }
    },

    props: {
        editor: {
            type: Object,
            default: null
        },
        actions: {
            type: Object,
            default: null
        }
    },

    computed: {
        formats() {
            return this.actions.formats();
        },

        format() {

            return this.formats.find(format => format.isActive(this.editor)) || {
                icon: 'unknown_document',
                title: 'Unknown'
            };
        }
    },

    mounted() {
        this.$el.parentNode.setAttribute('kiss-popout', `#${this.uid}`);
    },

    methods: {
        changeFormat(format) {
            format.apply(this.editor);
        }
    },

    template: /*html*/`
        <div>
            <icon>{{ format.icon }}</icon>
        </div>
        <teleport to="body">
            <kiss-popout :id="uid">
                <kiss-content>
                    <kiss-navlist>
                        <div class="kiss-text-caption kiss-color-muted kiss-size-xsmall">{{ t('Current') }}</div>
                        <div class="kiss-flex kiss-flex-middle kiss-text-bold kiss-size-large kiss-margin-xsmall-top" gap="small">
                            {{ t(format.title) }}
                        </div>
                        <hr>
                        <ul class="kiss-color-muted" style="overflow:auto;max-height: 200px">
                            <li v-for="item in formats"><a class="kiss-flex kiss-flex-middle" gap="small" @click="changeFormat(item)"><icon class="kiss-color-primary">{{ item.icon }}</icon> {{ t(item.title) }}</a></li>
                        </ul>
                    </kiss-navlist>
                </kiss-content>
            </kiss-popout>
        </teleport>
    `
}
