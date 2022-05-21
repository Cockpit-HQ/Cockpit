export default {

    data: function () {

        return {
            tabulator: null
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
            default: '250px'
        }
    },

    watch:{

        rows:{
            handler: function (data) {
                this.tabulator.replaceData(data || []);
            },
            deep: true,
        }
    },
    mounted() {

        //instantiate Tabulator when element is mounted
        this.tabulator = new Tabulator(this.$refs.table, {
            layout:"fitDataFill",
            renderVertical: 'basic',
            maxHeight: this.height,
            movableRows: true,
            data: this.rows,
            columns: this.columns,
        });

        this.tabulator.on('dataChanged', data => {
            this.$emit('update:tableData', data)
        });

        this.tabulator.on('rowMoved', () => {

            let data = new Array(this.tabulator.getDataCount());

            this.tabulator.getRows(true).forEach(r => {
                data[r.getPosition(true)] = r._row.data;
            });

            this.$emit('update:tableData', data);
        });
    },

    template: /*html*/`<div class="kiss-table" ref="table"></div>`
  }