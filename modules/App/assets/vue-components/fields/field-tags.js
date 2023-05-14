
let instanceCount = 0;

let ready = new Promise(function(resolve) {

    App.assets.require([
        'app:assets/vendor/choices/choices.js',
        'app:assets/vendor/choices/choices.css',
    ], function() {
        resolve(window.Choices);
    });
});

export default {

    _meta: {
        label: 'Tags',
        info: 'Tags list',
        icon: 'system:assets/icons/tags.svg',
        settings: [
            {name: 'placeholder', type: 'text'},
            {name: 'max', type: 'number', info: 'Max items'},
            {name: 'list', type: 'text', multiple: true, info: 'Options list'},
        ],
        render(value, field, context) {

            if (typeof(value) === 'object') {
                value = JSON.stringify(value).replace(/("|\[|\])/g, '');
            } else {
                value = '';
            }

            return context == 'table-cell' && value.length > 100 ? App.utils.truncate(value, 100) : value;
        }
    },

    data() {
        return {
            uid: `field-tags-${++instanceCount}`,
            val: this.modelValue || [],
            options: []
        }
    },

    props: {
        modelValue: {
            type: Array,
            default: []
        },
        placeholder: {
            type: String,
            default: ''
        },
        max: {
            type: Number
        },
        list: {
            type: Array,
            default: []
        }
    },

    mounted() {

        ready.then(() => {

            if (Array.isArray(this.list) && this.list.length) {

                this.options = this.list.map((item, idx) => {
                    return { id: idx, value: item}
                });
            }

            this.input = this.$el.querySelector('input, select');

            this.choices = new Choices(this.input, {
                paste: false,
                duplicateItemsAllowed: false,
                maxItemCount: this.max || -1,
                placeholder: this.placeholder ? true : false,
                placeholderValue: this.placeholder || '',
                removeItemButton: true,
                searchResultLimit: 8,
                choices: this.options,

                loadingText: App.i18n.get('Loading...'),
                noResultsText: App.i18n.get('No results found'),
                noChoicesText: App.i18n.get('No choices to choose from'),
                itemSelectText: App.i18n.get('Press to select'),
            })

            this.updateChoices();

            this.input.addEventListener('change', (e) => {
                this.val = this.choices.getValue(true);
                this.update();
            });
        });

    },

    watch: {
        modelValue() {

            this.val = this.modelValue;

            this.updateChoices();
            this.update();
        }
    },

    computed: {

    },

    methods: {

        updateChoices() {

            if (!this.choices) return;

            this.choices.removeActiveItems();

            if (Array.isArray(this.list) && this.list.length) {

                if (Array.isArray(this.val)) {
                    this.val.forEach(val => this.choices.setChoiceByValue(val))
                }

                //this.choices.setChoices(this.val || []);
            } else {

                this.choices.setValue(this.val || []);
            }

        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    },

    template: /*html*/`
        <div field="tags">
            <input type="text" hidden v-if="!Array.isArray(list) || !list.length" />
            <select multiple v-if="Array.isArray(list) && list.length" hidden></select>
        </div>
    `
}
