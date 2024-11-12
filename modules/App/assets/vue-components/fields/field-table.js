
export default {

    _meta: {
        label: 'Table',
        info: 'Manage table data',
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
            val: Array.isArray(this.modelValue) ? [...this.modelValue] : [],
            selected: [],
            gridOptions: {
                rowSelection: {
                    mode: 'multiRow',
                    headerCheckbox: true,
                    checkboxes: true,
                    hideDisabledCheckboxes: false,
                },
                onSelectionChanged: (e) => {
                    this.selected = e.api.getSelectedRows();
                },
                onRowDragEnd: (e) => {
                    let rowData = [];
                    e.api.forEachNode((rowNode) => rowData.push(rowNode.data));
                    this.updateTableData(rowData);
                },
                rowDragManaged: true,
                animateRows: true,
            }
        }
    },

    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        options: {
            default: () => ({})
        },
        columns: {
            type: Array,
            default: () => []
        },
        height: {
            type: String,
            default: '300px'
        }
    },

    watch: {
        // Watch for external changes to modelValue
        modelValue: {
            handler(newVal) {
                this.val = Array.isArray(newVal) ? [...newVal] : [];
            },
            deep: true
        }
    },

    computed: {

        cols() {

            let cols = [
                {
                    rowDrag: true,
                    width: 50,
                    pinned: 'left',
                }
            ];

            this.columns.forEach(col => {

                cols.push({
                    field: col.name,
                    headerName: col.label || col.name,
                    editable: true,
                    flex: 1,
                    resizable: true,
                });
            });

            return cols;
        }
    },

    methods: {

        addRow() {
            let val = {};
            this.columns.forEach(col => val[col.name] = null);
            this.val.push(val);
            this.emitUpdate();
        },

        removeSelected() {
            this.val = this.val.filter(row => !this.selected.includes(row));
            this.selected = [];
            this.emitUpdate();
        },

        updateTableData(data) {
            this.val = Array.isArray(data) ? data : [];
            this.emitUpdate();
        },

        emitUpdate() {
            this.$emit('update:modelValue', this.val);
        }
    },

    template: /*html*/`
        <div field="table">
            <div class="kiss-color-muted" v-if="!cols.length">
                <icon class="kiss-size-large">info</icon> {{ t('No columns defined') }}
            </div>

            <div v-if="cols.length">
                <vue-table
                    :columns="cols"
                    :rows="val"
                    :height="height"
                    :grid-options="gridOptions"
                    @update:row-data="updateTableData">
                </vue-table>

                <div class="kiss-button-group kiss-margin-small-top">
                    <button type="button" class="kiss-button kiss-button-small" @click="addRow">
                        <icon class="kiss-margin-small-right">control_point</icon> {{ t('Add row') }}
                    </button>
                    <button type="button" class="kiss-button kiss-button-danger kiss-button-small" @click="removeSelected" v-if="selected.length">
                        {{ t('Remove selected') }}
                    </button>
                </div>
            </div>
        </div>
    `
}
