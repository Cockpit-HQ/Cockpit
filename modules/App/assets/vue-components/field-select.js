
export default {

    _meta: {
        label: 'Select',
        info: 'Select from a list',
        icon: 'system:assets/icons/select.svg',
        settings: [
            {name: 'multiple', type: 'boolean', opts: {default: false}},
            {name: 'options', type: 'text', multiple: true},
        ],
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

            let list = [], groups = {'': []};

            if (typeof(this.options) === 'string' || Array.isArray(this.options)) {

                (typeof(this.options) === 'string' ? this.options.split(',') : this.options || []).forEach(function(option) {

                    option = {
                        value : (option.hasOwnProperty('value') ? option.value.toString().trim() : option.toString().trim()),
                        label : (option.hasOwnProperty('label') ? option.label.toString().trim() : option.toString().trim()),
                        group : (option.hasOwnProperty('group') ? option.group.toString().trim() : '')
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

            return groups;
        }
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
        }
    },

    template: /*html*/`
        <div field="select">
            <select class="kiss-input kiss-width-1-1" v-model="val" @change="update" v-if="!multiple">
                <option :value="null"></option>
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