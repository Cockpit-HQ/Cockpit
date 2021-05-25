customElements.define('app-favicon', class extends HTMLElement {

    static get observedAttributes() {
        return ['src'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.updateFavIcon();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateFavIcon();
    }

    disconnectedCallback() {

    }

    updateFavIcon() {

        let favicon = document.querySelector("#app-favicon");

        if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            favicon.id = 'app-favicon';
            document.head.appendChild(favicon);
        }

        let src = this.getAttribute('src');
        let color = this.getAttribute('color') || '#000';

        if (!src) return;

        favicon.href = src;

        if (!src.match(/\.svg$/)) {
            return;
        }

        fetch(src).then(response => response.text()).then(content => {

            content = content.trim();

            if (!content.match(/^<svg/)) {
                return;
            }

            content = content.replace(/fill="(.*?)"/g, `fill="${color}"`);
            content = 'data:image/svg+xml;base64,'+btoa(content);
            favicon.href = content;
        });
    }
});