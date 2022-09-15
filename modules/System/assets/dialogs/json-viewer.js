function sortObject(object){
    let sortedObj = {},
        keys = Object.keys(object);

    keys.sort(function(key1, key2){
        key1 = key1.toLowerCase();
        key2 = key2.toLowerCase();
        if(key1 < key2) return -1;
        if(key1 > key2) return 1;
        return 0;
    });

    for(let index in keys){
        let key = keys[index];
        if(typeof object[key] === 'object' && !(object[key] instanceof Array)){
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
            json: null
        }
    },

    props: {
        data: {
            type: Object
        },
        caption: {
            type: String
        }
    },

    computed: {
        highlighted() {
            return this.syntaxHighlight(this.data || {});
        }
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="kiss-padding kiss-text-bold">
                {{ caption || t('JSON Viewer') }}
            </div>
            <div class="app-offcanvas-content kiss-padding kiss-bgcolor-contrast kiss-flex-1">
                <pre class="kiss-size-small" v-html="highlighted"></pre>
            </div>
            <div class="kiss-padding kiss-bgcolor-contrast">
                <div class="kiss-button-group kiss-flex kiss-child-width-1-2">
                    <button class="kiss-button" kiss-offcanvas-close>{{ t('Close') }}</button>
                    <button class="kiss-button kiss-button-primary" @click="copy()">{{ t('Copy') }}</button>
                </div>
            </div>
        </div>
    `,

    methods: {

        copy() {
            App.utils.copyText(JSON.stringify(this.data, undefined, 2), () =>  App.ui.notify('JSON copied!'));
        },

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
