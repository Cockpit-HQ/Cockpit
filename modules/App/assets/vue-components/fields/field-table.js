
export default {

    _meta: {
        label: 'Table',
        info: 'Mangage table data',
        icon: 'system:assets/icons/table.svg',
        settings: [
            {
                name: 'columns',
                type: 'set',
                multiple: true,
                opts: {
                    display: '${value.name}',
                    fields: [
                        {name:'name', type:'text', required: true},
                        {name:'label', type:'text'},
                    ]
                }
            },
        ],
        render(value, field) {
            return Array.isArray(value) ? value.length : 'n/a';
        }
    },

    data() {
        return {
            val: this.modelValue || [],
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
        columns: {
            type: Array,
            default: []
        },
        height: {
            type: String,
            default: '300px'
        }
    },

    watch: {
        modelValue() {
            this.val = this.modelValue;
            this.update();
        },

        val() {
            this.update();
        }
    },

    computed: {

        cols() {

            let cols = [
                {rowHandle:true, formatter:'handle', headerSort:false, frozen:true, width:30, minWidth:30}
            ];

            this.columns.forEach(col => {

                cols.push({
                    field: col.name,
                    title: col.label || col.name,
                    editor: col.editor || true,
                    headerSort: false
                });
            })

            cols.push({

                formatter: (cell, formatterParams, onRendered) => {
                    return '<icon class="kiss-color-danger" table-action="remove">delete</icon>';
                },

                // causing issues - hopefully will be fixed with upcoming tabulator version
                // cellClick: (e, cell) => {
                //     let idx = cell.getRow(true).getPosition(true);
                //     this.val.splice(idx, 1);
                //     this.update();
                // },

                headerSort:false, frozen:true, width:30, minWidth:30})

            return cols;
        }
    },

    mounted() {
        this.$el.addEventListener('click', (e) => {

            if (e.target.getAttribute('table-action') == 'remove') {
                let row = e.target.closest('[role="row"]');
                this.val.splice([...row.parentElement.childNodes].indexOf(row), 1);
            }
        })
    },

    methods: {
        addRow() {
            let val = {};
            this.columns.forEach(col => val[col.name] = null);

            if (!Array.isArray(this.val)) {
                this.val = [];
            }

            this.val.push(val);
            this.update();
        },

        updateTableData(data) {
            this.val = data;
            this.update();
        },

        update() {
            this.$emit('update:modelValue', this.val ? this.val || [] : null)
        }
    },

    template: /*html*/`
        <div field="table">

            <div class="kiss-color-muted" v-if="!cols.length">
                <icon class="kiss-size-large">info</icon> {{ t('No columns defined') }}
            </div>

            <div v-if="cols.length">
                <vue-table :columns="cols" :rows="val" :height="height" @update:table-data="updateTableData"></vue-table>

                <div class="kiss-margin-small-top">
                    <button type="button" class="kiss-button kiss-button-small" @click="addRow">{{ t('Add row') }}</button>
                </div>
            </div>

        </div>
    `
}
