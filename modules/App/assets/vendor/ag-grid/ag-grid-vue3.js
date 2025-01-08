export default {

    data: function () {

        return {
            api: null,
        }
    },

    props: {
        rows: {
            type: Array,
            default: []
        },
        columns: {
            type: Array,
            default: []
        },
        height: {
            type: String,
            default: '300px'
        },
        placeholder: {
            type: String,
            default: 'No data'
        },
        gridOptions: {
            type: Object,
            default: {}
        }
    },

    watch:{

        rows:{
            handler: function (data) {

                if (this.api) {
                    this.api.setGridOption('rowData', data);
                }
            },
            deep: true,
        }
    },
    mounted() {

        let opts = Object.assign({
            theme: 'legacy',
            columnDefs: this.columns,
            rowData: this.rows,
            suppressScrollOnNewData: true,
            onCellEditingStarted: (e) => e.api.setGridOption('suppressRowDrag', true),
            onCellEditingStopped: (e) => e.api.setGridOption('suppressRowDrag', false),
        }, this.gridOptions || {});

        //instantiate Tabulator when element is mounted
        this.api = agGrid.createGrid(this.$refs.table, opts);

    },

    unmounted() {

        if (this.api) {
            this.api.destroy();
        }
    },

    template: /*html*/`<div class="ag-theme-default" ref="table" :style="{height: height}"></div>`
}
