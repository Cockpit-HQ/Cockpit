function sortObject(object){
    var sortedObj = {},
        keys = Object.keys(object);

    keys.sort(function(key1, key2){
        key1 = key1.toLowerCase(), key2 = key2.toLowerCase();
        if(key1 < key2) return -1;
        if(key1 > key2) return 1;
        return 0;
    });

    for(var index in keys){
        var key = keys[index];
        if(typeof object[key] == 'object' && !(object[key] instanceof Array)){
            sortedObj[key] = sortObject(object[key]);
        } else {
            sortedObj[key] = object[key];
        }
    }

    return sortedObj;
}


export default {

    data() {
        return {

        }
    },

    props: {
        object: {
            type: Object,
            default: null
        }
    },

    computed: {
        highlighted() {
            return this.syntaxHighlight(this.object || {});
        }
    },

    template: `
        <div><pre v-html="highlighted"></pre></div>
    `,

    methods: {

        syntaxHighlight(json) {

            if (typeof json != 'string') {
                json = JSON.stringify(json, undefined, 2);
            }

            let cls;

            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {

                cls = 'kiss-color-primary';

                if (/^"/.test(match)) {
                    cls = /:$/.test(match) ? 'kiss-text-bold' : 'kiss-color-success';
                } else if (/true|false/.test(match)) {
                    cls = 'kiss-color-danger';
                } else if (/null/.test(match)) {
                    cls = 'kiss-color-muted';
                }

                return '<span class="'+cls+'">'+match+'</span>';
            });
        }
    }
}