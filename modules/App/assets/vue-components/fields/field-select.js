
export default {

    _meta: {
        label: 'Select',
        info: 'Select from a list',
        icon: 'system:assets/icons/select.svg',
        settings: [
            { name: 'multiple', type: 'boolean', opts: { default: false } },
            { name: 'options', type: 'text', multiple: true },
        ],
        render(value, field) {

            const options = field?.opts?.options ?? []

            if (Array.isArray(options) && options.length > 0 && (typeof(options[0]) !== 'string')) {

                const selectedValues = typeof(value) === 'string' ? value.split(',') : value || []
                let selectedOptions = options.filter((o) => selectedValues.indexOf((o.value ?? o).toString().trim()) !== -1);

                if (selectedOptions.length > 0){
                    return selectedOptions.map(o => (o.label ?? o).toString().trim()).join(', ');
                }
            }

            return Array.isArray(value) ? value.join(', ') : value;
        }
    },

    data() {
        return {
            val: this.modelValue,
            loading: false,
            list: { '': [] }
        }
    },

    props: {
        modelValue: {
            type: String,
            default: ''
        },
        options: {
            default: []
        },
        src: {
            type: Object,
            default: null
        },
        multiple: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
    },

    watch: {
        modelValue() {
            this.val = this.modelValue;
            this.update();
        },

        options() {
            this.resolveItems();
        }
    },

    computed: {

    },

    mounted() {
        this.resolveItems()
    },

    methods: {

        selected(value) {
            return !Array.isArray(this.val) || this.val.indexOf(value) == -1 ? false : true;
        },

        select(value) {

            if (!Array.isArray(this.val)) {
                this.val = [];
            }

            if (this.selected(value)) {
                this.val.splice(this.val.indexOf(value), 1);
            } else {
                this.val.push(value);
            }

            this.update();
        },

        update() {
            this.$emit('update:modelValue', this.val)
        },

        resolveItems() {

            this.loading = true;

            (this.src ? this.resolveItemsBySrc() : this.resolveItemsByOptions()).then(list => {
                this.list = list;
                this.loading = false;
            });
        },

        resolveItemsByOptions() {

            return new Promise((resolve) => {

                let list = [], groups = { '': [] };

                if (typeof (this.options) === 'string' || Array.isArray(this.options)) {

                    (typeof (this.options) === 'string' ? this.options.split(',') : this.options || []).forEach((option) => {

                        option = {
                            value: (option.value ?? option).toString().trim(),
                            label: (option.label ?? option).toString().trim(),
                            group: (option.group ?? '').toString().trim()
                        };

                        list.push(option)
                    });

                }

                list.forEach(item => {

                    if (!groups[item.group]) {
                        groups[item.group] = [];
                    }

                    groups[item.group].push(item);
                });

                if (!groups[''].length) {
                    delete groups[''];
                }

                resolve(groups);
            });
        },

        resolveItemsBySrc() {

            const mapping = Object.assign({
                value: '',
                label: '',
                group: ''
            }, this.src.map || {});

            return new Promise((resolve) => {

                let groups = { '': [] };

                this.$request(this.src.route, this.src.params || {}).then(list => {

                    if (!Array.isArray(list)) {
                        resolve(groups);
                        return;
                    }

                    list.forEach(item => {

                        const option = {
                            value: item[mapping.value] ?? item,
                            label: item[mapping.label] || item[mapping.value] || item,
                            group: item[mapping.group] ?? ''
                        };

                        if (!groups[option.group]) {
                            groups[option.group] = [];
                        }

                        groups[option.group].push(option);
                    });

                    if (!groups[''].length) {
                        delete groups[''];
                    }

                    resolve(groups);

                }).catch((err) => {
                    console.error(err);
                    resolve(groups);
                });;
            });
        }
    },

    template: /*html*/`
        <div field="select" :class="{'kiss-disabled':loading}">

            <select class="kiss-input kiss-width-1-1" :class="{'kiss-color-muted': !value && value !== 0}" v-model="val" @change="update" v-if="!multiple">
                <option :value="null">{{ placeholder || ''}}</option>
                <optgroup :label="group || 'Options'" v-for="(lst,group) in list">
                    <option v-for="option in lst" :value="option.value">{{ option.label }}</option>
                </optgroup>
            </select>

            <div v-if="multiple">

                <div class="kiss-margin-small" v-for="(lst,group) in list">

                    <div class="kiss-text-bold kiss-margin-xsmall kiss-size-xsmall" v-if="group">{{ group }}</div>

                    <div class="kiss-flex kiss-flex-middle kiss-position-relative" :class="{'kiss-color-muted': !selected(option.value)}" v-for="option in lst">
                        <div class="kiss-size-4"><icon>{{ selected(option.value) ? 'radio_button_checked' : 'radio_button_unchecked' }}</icon></div>
                        <div class="kiss-size-small kiss-margin-small-left">{{ option.label }}</div>
                        <a class="kiss-cover" @click="select(option.value)"></a>
                    </div>
                </div>

            </div>

        </div>
    `
}
