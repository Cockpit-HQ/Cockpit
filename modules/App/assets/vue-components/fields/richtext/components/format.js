export default {
    data() {

    },

    props: {
        editor: {
            type: Object,
            default: null
        }
    },

    computed: {
        format() {

            if (this.editor.isActive('paragraph')) {
                return {
                    icon: 'format_paragraph',
                    title: 'Paragraph'
                }
            }
            if (this.editor.isActive('codeBlock')) {
                return {
                    icon: 'data_object',
                    title: 'Code Block'
                }
            };

            // Check for all heading levels
            for (let i = 1; i <= 6; i++) {
                if (this.editor.isActive('heading', { level: i })) {
                    return {
                        icon: `format_h${i}`,
                        title: `Heading ${i}`
                    }
                }
            }

            return {
                icon: 'unknown_document',
                title: 'Unknown'
            };
        }
    },

    template: /*html*/`
        <div :title="format.text">
            <icon>{{ format.icon }}</icon>
        </div>
    `
}
