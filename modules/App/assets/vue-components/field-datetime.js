
let instanceCount = 0;

export default {

    _meta: {
        label: 'Date-Time',
        info: 'Pick a date & time',
        icon: 'system:assets/icons/datetime.svg'
    },

    data() {

        let dt = this.modelValue ? this.modelValue.split(' ') : [null, null];

        return {
            uid: `field-datetime-${++instanceCount}`,
            val: this.modelValue,
            date: dt[0],
            time: dt[1]
        }
    },

    props: {
        modelValue: {
            type: String,
            default: ''
        },
        minDate: {
            type: String,
            default: null
        },
        maxDate: {
            type: String,
            default: null
        },
        stepDate: {
            default: null
        },
        minTime: {
            type: String,
            default: null
        },
        maxTime: {
            type: String,
            default: null
        },
        stepTime: {
            default: null
        },
        listTime: {
            type: Array,
            default: []
        },
        readonly: {
            type: Boolean,
            default: null
        }
    },

    watch: {
        modelValue() {

            this.date = null;
            this.time = null;

            if (this.modelValue) {
                let dt = this.modelValue.split(' ');
                this.date = dt[0];
                this.time = dt[1];
                this.update();
            }
        }
    },

    methods: {
        update() {

            if (this.date && this.time) {
                this.val = `${this.date} ${this.time}`;
                this.$emit('update:modelValue', this.val)
            }
        }
    },

    template: /*html*/`
        <div field="datetime">
            <kiss-grid cols="2">
                <div>
                    <input type="date" class="kiss-input kiss-width-1-1" v-model="date" @input="update" :max="maxDate" :min="minDate" :step="stepDate" :readonly="readonly">
                </div>
                <div>
                    <input type="time" class="kiss-input kiss-width-1-1" v-model="time" @input="update" :max="maxTime" :min="minTime" :step="stepTime" :list="uid+'-list'" :readonly="readonly">
                </div>
            </kiss-grid>
            <datalist :id="uid+'-list'" v-if="listTime.length">
                <option v-for="option in listTime">{{ option }}</option>
            </datalist>
        </div>
    `
}