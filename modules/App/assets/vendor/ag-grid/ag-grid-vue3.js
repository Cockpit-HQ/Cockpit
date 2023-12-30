export default {

    data: function () {

        return {
            agGrid: null,
            api: null
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
            columnDefs: this.columns,
            rowData: this.rows,
            suppressScrollOnNewData: true,
        }, this.gridOptions || {});

        //instantiate Tabulator when element is mounted
        this.agGrid = new agGrid.Grid(this.$refs.table, opts);
        this.api = opts.api;

    },

    unmounted() {

        if (this.api) {
            this.api.destroy();
        }
    },

    template: /*html*/`<div class="ag-theme-default" ref="table" :style="{height: height}"></div>`
}
