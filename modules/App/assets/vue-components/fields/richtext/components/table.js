let instanceCount = 0;

export default {
    data() {

        return {
            uid: `richtext-action-table-${++instanceCount}`
        }
    },

    props: {
        editor: {
            type: Object,
            default: null
        }
    },

    computed: {
        isActive() {
            return this.editor.isActive('table');
        }
    },

    mounted() {
        this.$el.parentNode.addEventListener('click', () => {

            if (!this.isActive) {
                return this.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }

            //this.$refs.popout.toggle();

        }, false);
    },

    methods: {

    },

    template: /*html*/`
        <div>
            <icon>table</icon>
        </div>
        <teleport to="body">
            <kiss-popout :id="uid" ref="popout">
                <kiss-content>
                    <kiss-navlist>
                        <div class="kiss-text-caption kiss-color-muted kiss-size-xsmall">{{ t('Table') }}</div>
                        <div class="kiss-flex kiss-flex-middle kiss-text-bold kiss-size-large kiss-margin-xsmall-top" gap="small">
                            XXX
                        </div>
                        <hr>
                        <ul class="kiss-color-muted" style="overflow:scroll;max-height: 200px">
                            <li><a class="kiss-flex kiss-flex-middle" gap="small" @click="changeFormat('paragraph')"><icon class="kiss-color-primary">format_paragraph</icon> Paragraph</a></li>
                            <li><a class="kiss-flex kiss-flex-middle" gap="small" @click="changeFormat('code')"><icon class="kiss-color-primary">data_object</icon> Code</a></li>
                            <li v-for="i in [1,2,3,4,5,6]"><a class="kiss-flex kiss-flex-middle" gap="small" @click="changeFormat('h'+i)"><icon class="kiss-color-primary">format_h{{i}}</icon> Heading {{ i }}</a></li>
                        </ul>
                    </kiss-navlist>
                </kiss-content>
            </kiss-popout>
        </teleport>
    `
}
