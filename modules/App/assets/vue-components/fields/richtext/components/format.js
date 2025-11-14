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

    mounted() {
        this.$el.parentNode.setAttribute('kiss-popout', `#${this.uid}`);
    },

    methods: {
        changeFormat(format) {

            switch (format) {
                case 'paragraph':
                    return this.editor.chain().focus().setParagraph().run()
                case 'code':
                    return this.editor.chain().focus().toggleCodeBlock().run()
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    return this.editor.chain().focus().toggleHeading({level: Number(format.substr(-1))}).run()

            }
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
                            {{ format.title }}
                        </div>
                        <hr>
                        <ul class="kiss-color-muted" style="overflow:auto;max-height: 200px">
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
