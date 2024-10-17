let ready = new Promise(function(resolve) {

    App.assets.require([
        'app:assets/vendor/vue/components/vue-tiptap.js',
        'app:assets/css/vendor/tiptap.css',
    ], () => {
        resolve(window.VueTiptap);
    });
});

let instanceCount = 0;

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
                    const url = window.prompt('URL')
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run()
                    }
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
        };
    }

    action(name) {
        return this.actions[name] || null;
    }

    isActive(name) {
        return this.actions[name]?.isActive ? this.actions[name].isActive(this.editor) : false;
    }
}

let MenuBar = {
    data() {

        let actions = new EditorActions(this.editor);

        return {
            actions: actions
        }
    },

    props: {
        editor: {
            type: Object,
            default: null
        },
        toolbar: {
            type: String,
            default: null
        }
    },

    computed: {
        groups() {
            let groups = [];

            if (!this.toolbar) return false;

            this.toolbar.split(' | ').forEach(item => {

                let group = [];

                item.split(' ').forEach(itm => {

                    itm = itm.trim();

                    if (!itm || !this.actions.actions[itm]) return;
                    group.push(itm);
                });

                if (group.length) groups.push(group);
            });

            return groups.length ? groups : false;
        }
    },

    template: /*html*/`
        <div class="kiss-margin-small kiss-flex" gap="small" v-if="groups">
            <div class="kiss-button-group" v-for="group in groups">
                <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': actions.isActive(action)}" @click="actions.action(action).action(editor)" v-for="action in group"><icon>{{ actions.action(action).icon }}</icon></button>
            </div>
        </div>
    `
}


export default {

    _meta: {
        label: 'Wysiwyg',
        info: 'Rich text field',
        icon: 'system:assets/icons/wysiwyg.svg',
        render(value, field, context) {

            if (Array.isArray(value)) {
                return value.length ? `${value.length}x...` : '';
            }

            if (typeof(value) !== 'string') {
                return 'n/a';
            }

            return value ? App.utils.truncate(App.utils.stripTags(value), context == 'table-cell' ? 20 : 50) : '';
        }
    },

    data() {
        return {
            id: ++instanceCount,
            editor: null
        }
    },

    props: {
        modelValue: {
            type: String,
            default: false
        },

        height: {
            type: String,
            default: '500px'
        },

        toolbar: {
            type: String,
            default: 'bold italic strikethrough underline | alignLeft alignCenter alignRight alignJustify | link image'
        }
    },

    components: {
        MenuBar,
        EditorContent: Vue.defineAsyncComponent(() => {
            return new Promise(resolve => {
                ready.then(() => resolve(window.VueTiptap.EditorContent));
            })
        })
    },

    watch: {
        modelValue() {
            if (this.editor && !this.editor.isFocused) {
                setTimeout(() => {
                    //this.editor.commands.setContent(this.modelValue || '', false)
                }, 100);
            }
        }
    },

    beforeUnmount() {
        if (this.editor) this.editor.destroy();
    },

    mounted() {

        let $this = this;

        ready.then(() => {

            this.editor = new VueTiptap.Editor({
                extensions: [
                    VueTiptap.extensions.StarterKit,
                    VueTiptap.extensions.TextAlign.configure({
                        types: ['heading', 'paragraph'],
                    }),
                    VueTiptap.extensions.Underline,
                    VueTiptap.extensions.Link,
                    VueTiptap.extensions.Image,
                ],

                onUpdate: ({ editor }) => {
                    $this.update()
                }
            });

            this.editor.commands.setContent(this.modelValue || '', false);
        });
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.editor.getHTML())
        }
    },

    template: /*html*/`
        <div field="wysiwyg" v-if="editor">
            <kiss-card class="kiss-padding-small" theme="contrast bordered">
                <menu-bar :editor="editor" :toolbar="toolbar" />
                <editor-content :id="'tiptap-editor-'+id" class="tiptap-content-wrapper" :editor="editor" :style="{minHeight:'200px', maxHeight: height}" />
            </kiss-card>
        </div>
    `
}
