
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
            options: [],
            loading: false
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
        },
        src: {
            type: Object,
            default: null
        }
    },

    mounted() {

        ready.then(() => {

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

            if (this.src || (Array.isArray(this.list) && this.list.length)) {
                this.resolveOptions();
            }

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

            if (!this.choices || this.loading) return;

            this.choices.removeActiveItems();

            if (this.options.length) {

                if (Array.isArray(this.val)) {
                    this.val.forEach(val => this.choices.setChoiceByValue(val))
                }

            } else {
                this.choices.setValue(this.val || []);
            }

        },

        update() {
            this.$emit('update:modelValue', this.val)
        },

        resolveOptions() {

            this.loading = true;

            (this.src ? this.resolveItemsBySrc() : this.resolveItemsByList()).then(options => {

                this.loading = false;
                this.options = options;
                this.choices.setChoices(this.options, 'value', 'label', true);
                this.updateChoices();
            });
        },

        resolveItemsByList() {

            return new Promise((resolve) => {

                if (Array.isArray(this.list) && this.list.length) {

                    let id, value, label, options = [];

                    options = this.list.map((item, idx) => {

                        id = item.id ?? idx;
                        value = item.value ?? item;
                        label = item.label ?? value;

                        return { id, value, label }
                    });

                    resolve(options)
                }
            });
        },

        resolveItemsBySrc() {

            const mapping = Object.assign({
                value: '',
                label: '',
            }, this.src.map || {});

            return new Promise((resolve) => {

                let options = [];

                this.$request(this.src.route, this.src.params || {}).then(list => {

                    if (!Array.isArray(list)) {
                        resolve(groups);
                        return;
                    }

                    list.forEach((item, idx) => {

                        options.push({
                            value: item[mapping.value] ?? item,
                            label: item[mapping.label] || item[mapping.value] || item,
                            id: item[mapping.id] ?? item[mapping.value] ?? idx
                        });
                    });

                    resolve(options);
                }).catch((err) => {
                    console.error(err);
                    resolve([]);
                });
            });
        }
    },

    template: /*html*/`
        <div field="tags">
            <select multiple hidden v-if="src"></select>
            <select multiple hidden v-else-if="Array.isArray(list) && list.length"></select>
            <input type="text" hidden v-else />
        </div>
    `
}
