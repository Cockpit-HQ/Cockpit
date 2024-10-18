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
            listBullet: {
                icon: 'format_list_bulleted',
                action: (editor) => editor.chain().focus().toggleBulletList().run(),
                isActive: (editor) => editor.isActive('bulletList')
            },
            listOrdered: {
                icon: 'format_list_numbered',
                action: (editor) => editor.chain().focus().toggleOrderedList().run(),
                isActive: (editor) => editor.isActive('orderedList')
            },
            image: {
                icon: 'image',
                action: (editor) => {

                    const attr = editor.getAttributes('image');

                    let meta = {
                        src: attr.src || '',
                        alt: attr.alt || '',
                        width: attr.width || '',
                        height: attr.height || ''
                    };

                    VueView.ui.modal('app:assets/vue-components/fields/richtext/dialogs/image.js', {meta}, {

                        save: meta => {

                            if (meta && meta.src) {
                                editor.chain().focus().setImage(meta).run()
                            }
                        }
                    }, {size: 'medium'});
                },
                isActive: (editor) => editor.isActive('image')
            },
            link: {
                icon: 'link',
                action: (editor) => {
                    const attr = editor.getAttributes('link');

                    let meta = {
                        href: attr.href,
                        title: attr.title,
                        target: attr.target,
                    }

                    VueView.ui.modal('app:assets/vue-components/fields/richtext/dialogs/link.js', {meta}, {

                        save: meta => {

                            if (meta.href) {
                                editor.chain().focus().extendMarkRange('link').setLink(meta).run()
                            }

                            if (!meta.href) {
                                editor.chain().focus().extendMarkRange('link').unsetLink().run()
                            }
                        }
                    }, {size: 'medium'});

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
