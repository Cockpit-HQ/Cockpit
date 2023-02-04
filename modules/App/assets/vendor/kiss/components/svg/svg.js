let svgCache = {};

customElements.define('kiss-svg', class extends HTMLElement {

    static get observedAttributes() {
        return ['src'];
    }

    connectedCallback() {
        this.update();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName == 'src') this.update();
    }

    update() {

        let url = this.getAttribute('src');
        let width = this.getAttribute('width');
        let height = this.getAttribute('height');

        if (!url || !url.trim()) {
            this.innerHTML = '';
            return;
        }

        if (width && height) {
            this.innerHTML = `<canvas width="${width}" height="${height}"></canvas>`;
        }

        const mutate = (content) => {

            let attrs = {
                width: this.getAttribute('width') || '',
                height: this.getAttribute('height') || ''
            };

            let svgStart = content.indexOf('<svg');

            if (svgStart === -1) {
                this.innerHTML = '';
                return;
            }

            this.innerHTML = content.substr(svgStart);

            let svg = this.children[0];

            Object.keys(attrs).forEach(attr => attrs[attr] && svg.setAttribute(attr, attrs[attr]));
        }

        if (!svgCache[url]) {
            svgCache[url] = fetch(url).then(response => response.text());
        }

        svgCache[url].then(content => {
            mutate(content.trim());
        }).catch(() => {
            this.innerHTML = '';
        });
    }

});
