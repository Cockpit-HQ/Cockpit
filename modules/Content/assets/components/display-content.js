
let _contentCache = {};

customElements.define('display-content', class extends HTMLElement {

    static get observedAttributes() {
        return ['model', 'id', 'display'];
    }

    constructor() {
        super();
    }

    connectedCallback() {

        this.ready = false;

        setTimeout(() => {
            this.render();
            this.ready = true;
        }, 0);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.ready && oldValue !== newValue) this.render(name, oldValue, newValue);
    }

    render() {

        this.innerHTML = '<app-loader class="kiss-display-inline-block" size="small" mode="dots"></app-loader>';

        App.utils.getContentModels().then(models => {

            const  id = this.getAttribute('id');
            const model = this.getAttribute('model');

            if (!id || !model || !models[model]) {
                return;
            }

            const display = this.getAttribute('display') || models[model].meta?.display || null;

            if (!_contentCache[id]) {

                _contentCache[id] = new Promise((resolve => {

                    App.request(`/content/collection/find/${model}`, {
                        options: {
                            filter:{_id: id},
                            limit:1
                        }
                    }).then(resp => resolve(resp.items[0] || null)).catch(() => {
                        resolve(null);
                    });
                }));
            }

            _contentCache[id].then(item => {

                let html = 'n/a';

                if (!item) {
                    this.innerHTML = html;
                    return item;
                }

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
                                str = App.utils.truncate(App.utils.stripTags(str), 50);

                                if (!str) return 'n/a';

                                return str;
                            })();

                } catch(e) {}


                this.innerHTML = `<div class="kiss-flex kiss-flex-middle" gap="xsmall">${item._state !== 1 ? '<icon size="larger" class="kiss-color-danger">error</icon>':''}<div class="kiss-flex-1">${html}</div></div>`;
            });

        });
    }

});
