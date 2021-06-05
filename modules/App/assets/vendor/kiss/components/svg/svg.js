
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

        if (!url.trim()) {
            this.innerHTML = '';
            return;
        }

        if (width && height) {
            this.innerHTML = `<canvas width="${width}" height="${height}"></canvas>`;
        }

        fetch(url).then(response => response.text()).then(content => {

            content = content.trim();

            let attrs = {
                width: this.getAttribute('width') || '',
                height: this.getAttribute('height') || ''
            };

            if (!content.match(/^<svg/)) {
                this.innerHTML = '';
                return;
            }

            this.innerHTML = content;

            let svg = this.children[0];

            Object.keys(attrs).forEach(attr => attrs[attr] && svg.setAttribute(attr, attrs[attr]));
        }).catch(() => {
            this.innerHTML = '';
        });
    }

});
