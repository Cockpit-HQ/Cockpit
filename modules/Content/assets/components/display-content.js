
let _contentCache = {};

customElements.define('display-content', class extends HTMLElement {

    static get observedAttributes() {
        return ['model', 'id', 'display'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(oldvalue, newvalue) {
        if (oldvalue != newvalue) this.render();
    }

    render() {

        this.innerHTML = '<app-loader class="kiss-display-inline-block" size="small" mode="dots"></app-loader>';

        const  id = this.getAttribute('id');
        const model = this.getAttribute('model');
        const display = this.getAttribute('display');

        if (!id || !model) {
            return;
        }

        if (!_contentCache[id]) {

            _contentCache[id] = new Promise((resolve => {

                App.request(`/content/collection/find/${model}`, {
                    options: {
                        filter:{_id: id},
                        limit:1
                    }
                }).then(resp => resolve(resp.items[0] || null));
            }));
        }

        _contentCache[id].then(item => {

            let html = 'n/a';

            if (item) {
                try {
                    html = display
                            ? App.utils.$interpolate(display, {data:item})
                            : (() => {

                                let data = {}, str;

                                Object.keys(item).forEach(key => {

                                    if (key[0] === '_' || !item[key] || typeof(item[key]) !== 'string') {
                                        return;
                                    }

                                    data[key] = item[key];
                                });

                                str = JSON.stringify(Object.values(data)).replace(/('null'|\[|\]|\{|\}|"|\\|')/g, '').replace(/,/g, ', ');

                                if (!str) return 'n/a';

                                if (str.length > 50) {
                                    str = str.substr(0, 50).trim() + '...';
                                }

                                return str;
                            })();

                } catch(e) {}
            }

            this.innerHTML = html;
        });
    }

});
