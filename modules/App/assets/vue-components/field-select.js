
export default {

    _meta: {
        label: 'Select',
        info: 'Select from a list',
        icon: 'settings:assets/icons/select.svg',
        render(value, field) {
            return Array.isArray(value) ? value.join(', ') : value;
        }
    },

    data() {
        return {
            val: this.modelValue
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
        multiple: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        modelValue() {
            this.val = this.modelValue;
            this.update();
        }
    },

    computed: {
        list() {

            let list = [];

            if (typeof(this.options) === 'string' || Array.isArray(this.options)) {

                (typeof(this.options) === 'string' ? this.options.split(',') : this.options || []).forEach(function(option) {

                    option = {
                        value : (option.hasOwnProperty('value') ? option.value.toString().trim() : option.toString().trim()),
                        label : (option.hasOwnProperty('label') ? option.label.toString().trim() : option.toString().trim()),
                        group : (option.hasOwnProperty('group') ? option.group.toString().trim() : '')
                    };

                    list.push(option)
                });

            } else if (typeof(this.options) === 'object') {

                Object.keys(opts.options).forEach(function(key) {

                    list.push({
                        value: key,
                        label: this.options[key].label || this.options[key],
                        group: this.options[key].group || ''
                    })
                })
            }

            return list;
        }
    },

    template: /*html*/`
        <div field="select">
            <select class="kiss-input kiss-width-1-1" v-model="val" @change="update" v-if="!multiple">
                <option :value="null"></option>
                <option v-for="option in list" :value="option.value">{{ option.label }}</option>
            </select>

            <div v-if="multiple">

                <div class="kiss-flex kiss-flex-middle kiss-position-relative" :class="{'kiss-color-muted': !selected(option.value)}" v-for="option in list">
                    <div class="kiss-size-4"><icon>{{ selected(option.value) ? 'radio_button_checked' : 'radio_button_unchecked' }}</icon></div>
                    <div class="kiss-size-small kiss-margin-small-left">{{ option.label }}</div>
                    <a class="kiss-cover" @click="select(option.value)"></a>
                </div>

            </div>

        </div>
    `,

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
        }
    }
}