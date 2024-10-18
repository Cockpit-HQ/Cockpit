class EditorActions {

    constructor(editor) {

        this.editor = editor;

        this.actions = {
            bold: {
                icon: 'format_bold',
                action: (editor) => editor.chain().focus().toggleBold().run(),
                isActive: (editor) => editor.isActive('bold')
            },
            italic: {
                icon: 'format_italic',
                action: (editor) => editor.chain().focus().toggleItalic().run(),
                isActive: (editor) => editor.isActive('italic')
            },
            strikethrough: {
                icon: 'format_strikethrough',
                action: (editor) => editor.chain().focus().toggleStrike().run(),
                isActive: (editor) => editor.isActive('strike')
            },
            underline: {
                icon: 'format_underlined',
                action: (editor) => editor.chain().focus().toggleUnderline().run(),
                isActive: (editor) => editor.isActive('underline')
            },
            alignLeft: {
                icon: 'format_align_left',
                action: (editor) => editor.chain().focus().setTextAlign('left').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'left' })
            },
            alignCenter: {
                icon: 'format_align_center',
                action: (editor) => editor.chain().focus().setTextAlign('center').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'center' })
            },
            alignRight: {
                icon: 'format_align_right',
                action: (editor) => editor.chain().focus().setTextAlign('right').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'right' })
            },
            alignJustify: {
                icon: 'format_align_justify',
                action: (editor) => editor.chain().focus().setTextAlign('justify').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'justify' })
            },
            image: {
                icon: 'image',
                action: (editor) => {

                    let meta = {
                        src: '',
                        alt: '',
                        width: '',
                        height: ''
                    };

                    VueView.ui.modal('app:assets/vue-components/fields/richtext/dialogs/image.js', {meta}, {

                        save: meta => {

                            if (meta && meta.src) {
                                editor.chain().focus().setImage(meta).run()
                            }
                        }
                    }, {size: 'medium'});
                },
            },
            link: {
                icon: 'link',
                action: (editor) => {
                    const previousUrl = editor.getAttributes('link').href
                    const url = window.prompt('URL', previousUrl)

                    // cancelled
                    if (url === null) {
                        return
                    }

                    // empty
                    if (url === '') {
                        editor.chain().focus().extendMarkRange('link').unsetLink().run()
                        return
                    }

                    // update link
                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
                },
                isActive: (editor) => editor.isActive('link')
            },
            hr: {
                icon: 'horizontal_rule',
                action: (editor) => editor.chain().focus().setHorizontalRule().run(),
            },
        };
    }

    action(name) {
        return this.actions[name] || null;
    }

    isActive(name) {
        return this.actions[name]?.isActive ? this.actions[name].isActive(this.editor) : false;
    }
}

export default EditorActions;
