customElements.define('app-frame', class extends HTMLElement {

    static get observedAttributes() {
        return ['src'];
    }

    constructor() {
        super();
    }

    connectedCallback() {

        this.innerHTML = '<iframe></iframe>';

        setTimeout(() => {

            this.iframe = this.querySelector('iframe');

            if (this.getAttribute('seamless') == 'true') {
                this.iframe.style.height = '0px';
                setInterval(() => this.resize(), 150);
            }

            this.update();

        }, 0);
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }

    attributeChangedCallback(name, oldValue, newValue) {

        if (!this.iframe) {
            return;
        }

        this.update();
    }

    update() {
        this.iframe.src = this.getAttribute('src') || '';
    }

    resize() {

        if (!this.iframe.contentDocument.body) {
            return;
        }

        if (this._offsetHeight == this.iframe.contentDocument.body.offsetHeight) {
            return;
        }

        this._offsetHeight = this.iframe.contentDocument.body.offsetHeight;

        this.iframe.style.height = this._offsetHeight+'px';

    }
});
