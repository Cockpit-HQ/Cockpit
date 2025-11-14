let instanceCount = 0;

export default {
    data() {

        return {
            uid: `richtext-action-color-${++instanceCount}`
        }
    },

    props: {
        editor: {
            type: Object,
            default: null
        }
    },

    computed: {
        color() {
            return this.editor.getAttributes('textStyle').color || '';
        }
    },

    methods: {
        pick() {
            VueView.ui.modal('app:assets/vue-components/fields/richtext/dialogs/color.js', {color: this.color}, {

                save: color => {
                    this.editor.chain().focus().setColor(color).run();
                }
            });
        }
    },

    template: /*html*/`
        <div>
            <icon @click="pick()" :style="{color}">format_color_text</icon>
        </div>
    `
}
