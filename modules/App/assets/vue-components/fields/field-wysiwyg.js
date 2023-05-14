let ready = new Promise(function(resolve) {

    App.assets.require([
        'app:assets/vendor/tinymce/tinymce.min.js'
    ], function() {
        resolve(window.tinymce);
    });
});

let instanceCount = 0;

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
            id: ++instanceCount
        }
    },

    props: {
        modelValue: {
            type: String,
            default: false
        },

        tinymce: {
            type: Object,
            default: {}
        }
    },

    watch: {
        modelValue() {
            if (this.editor && !this.editor.isFocused) {
                this.editor.setContent(this.modelValue || '');
            }
        }
    },

    beforeUnmount() {

        if (this.editor) {
            tinymce.remove(this.editor)
        }
    },

    mounted() {

        ready.then(() => {

            let opts = Object.assign({
                deprecation_warnings: false,
                target: this.$el.querySelector('.wysiwyg-container'),
                menubar: false,
                plugins: [
                    'advlist autolink lists link image preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table code wordcount'
                ].join(' '),
                toolbar: [
                    'undo redo | blocks',
                    'bold italic | alignleft aligncenter',
                    'alignright alignjustify | bullist numlist outdent indent',
                    'removeformat | hr image link table'
                ].join(' | '),

                height: 400,

                content_style: '',

                skin_url: App.base('app:assets/css/vendor/tinymce'),
                relative_urls : false,
                paste_as_text: true,

            }, this.tinymce || {});

            opts.content_style += `
                html,body {
                    background-color: ${getComputedStyle(document.documentElement).getPropertyValue('background-color')};
                    color: ${getComputedStyle(document.documentElement).getPropertyValue('color')};
                }
                a { color: ${getComputedStyle(document.documentElement).getPropertyValue('--kiss-color-primary')};}
            `;

            opts.setup = (editor) => {

                this.editor = editor;

                editor.on('init', e => {

                    editor.setContent(this.modelValue || '');

                    editor.on('change input undo redo ExecCommand', e => {
                        this.$emit('update:modelValue', editor.getContent())
                    });

                    editor.on('focus blur input', e => {

                        if (e.type == 'input') {
                            editor.isFocused = true;
                            return;
                        }

                        editor.isFocused = e.type == 'focus';
                        this.$el.dispatchEvent(new Event(editor.isFocused ? 'focusin':'focusout', { bubbles: true, cancelable: true }));
                    });
                });

                App.trigger('field-wysiwyg-setup', [editor]);

                let observer = new MutationObserver(mutations => {

                    if (!document.body.contains(this.$el) && this.editor) {
                        tinymce.remove(this.editor)
                        observer.disconnect();
                    }
                });

                observer.observe(document.body, {childList: true, subtree: true});
            };

            App.trigger('field-wysiwyg-init', [opts]);

            tinymce.init(opts);

        });
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.editor.getContent())
        }
    },

    template: /*html*/`
        <div field="wysiwyg">
            <div :id="'mce-field-'+id" class="wysiwyg-container"></div>
        </div>
    `
}
