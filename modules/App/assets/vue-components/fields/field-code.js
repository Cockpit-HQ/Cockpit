let ready = new Promise(function(resolve) {

    App.assets.require([
        'app:assets/vendor/codemirror/lib/codemirror.js',
        'app:assets/css/vendor/codemirror.css',
    ], function() {

        App.assets.require([
            // Modes
            'app:assets/vendor/codemirror/mode/clike/clike.js',
            'app:assets/vendor/codemirror/mode/css/css.js',
            'app:assets/vendor/codemirror/mode/gfm/gfm.js',
            'app:assets/vendor/codemirror/mode/htmlembedded/htmlembedded.js',
            'app:assets/vendor/codemirror/mode/htmlmixed/htmlmixed.js',
            'app:assets/vendor/codemirror/mode/javascript/javascript.js',
            'app:assets/vendor/codemirror/mode/markdown/markdown.js',
            'app:assets/vendor/codemirror/mode/php/php.js',
            'app:assets/vendor/codemirror/mode/sql/sql.js',
            'app:assets/vendor/codemirror/mode/twig/twig.js',
            'app:assets/vendor/codemirror/mode/xml/xml.js',
            'app:assets/vendor/codemirror/mode/xquery/xquery.js',
            'app:assets/vendor/codemirror/mode/yaml/yaml.js',
            'app:assets/vendor/codemirror/mode/yaml-frontmatter/yaml-frontmatter.js',

            'app:assets/vendor/codemirror/addon/fold/foldgutter.css',
            'app:assets/vendor/codemirror/addon/fold/foldcode.js',
            'app:assets/vendor/codemirror/addon/fold/foldgutter.js',
            'app:assets/vendor/codemirror/addon/fold/brace-fold.js',
            'app:assets/vendor/codemirror/addon/fold/indent-fold.js',
            'app:assets/vendor/codemirror/addon/fold/xml-fold.js',

        ], function() {
            resolve(window.CodeMirror);
        });
    });
});

export default {

    _meta: {
        label: 'Code',
        info: 'Code input',
        icon: 'system:assets/icons/code.svg',
        settings: [
            {name: 'mode', type: 'select', opts: {options: ['css', 'html', 'json', 'javascript', 'markdown', 'php', 'yaml', 'xml']}},
            {name: 'height', type: 'number'},
        ],
        render(value, field, context) {
            return App.utils.truncate(App.utils.stripTags(value), context == 'table-cell' ? 20 : 50);
        }
    },

    data() {
        return {

        }
    },

    props: {
        modelValue: {
            type: String,
            default: false
        },
        height: {
            type: Number,
            default: 350
        },
        size: {
            type: Number,
            default: 14
        },
        mode: {
            type: String,
            default: null
        },
        codemirror: {
            type: Object,
            default: {}
        }
    },

    watch: {
        modelValue() {
            if (this.editor && !this.editor.hasFocus()) {
                this.editor.setValue(this.modelValue || '');
            }
        }
    },

    mounted() {

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0 && this.editor) {
                    this.editor.refresh()
                }
            });
        }, {root: this.$el.parentNode});

        observer.observe(this.$el);

        ready.then(CodeMirror => {

            let wrapper = this.$el.querySelector('.codemirror-wrapper');
            let mode = this.mode;

            // mode fallback
            if (['css', 'json', 'json5', 'js', 'javascript', 'php'].indexOf(mode) > -1) {
                mode = 'text/x-csrc';
            }

            if (mode == 'html') {
                mode = { name: 'htmlmixed' };
            }

            wrapper.innerHTML = '';

            this.editor = CodeMirror(wrapper, Object.assign({
                value: this.modelValue || '',
                lineNumbers: true,
                mode: null,
                height: this.height,
                foldGutter: mode ? true:false,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                mode,
            }, this.codemirror || {}));

            if (this.height) {
                this.editor.setSize('100%', this.height);
            }

            this.$el.editor = this.editor;

            this.editor.on('change', () => {
                this.$emit('update:modelValue', this.editor.getValue())
            });

            this.editor.on('focus', () => {
                this.$el.dispatchEvent(new Event('focusin', { bubbles: true, cancelable: true }));
            });

            this.editor.on('blur', () => {
                this.$el.dispatchEvent(new Event('focusout', { bubbles: true, cancelable: true }));
            });
        })
    },

    methods: {
        update() {
            if (this.editor) this.$emit('update:modelValue', this.editor.getValue())
        }
    },

    template: /*html*/`
        <div field="code">
            <div class="codemirror-wrapper" :style="{fontSize: size+'px'}"></div>
        </div>
    `
}