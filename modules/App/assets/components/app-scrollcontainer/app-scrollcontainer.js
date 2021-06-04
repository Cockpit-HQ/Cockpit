customElements.define('app-scrollcontainer', class extends HTMLElement {


    static get observedAttributes() {
        return ['boundary'];
    }

    constructor() {
        super();
    }

    connectedCallback() {

        document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => {
            setTimeout(() => this.expand());
        }));

        window.addEventListener('resize',  () => requestAnimationFrame(() => {
            setTimeout(() => this.expand());
        }));

        window.addEventListener('load',  () => requestAnimationFrame(() => {
            setTimeout(() => this.expand());
        }));
    }

    attributeChangedCallback(oldvalue, newvalue) {
        if (oldvalue != newvalue)this.expand();
    }

    expand() {

        this.style.maxHeight = '';

        let rect = this.getBoundingClientRect();
        let boundary = this.getAttribute('boundary');
        let maxHeight = window.innerHeight - rect.top;

        if (boundary) {
            boundary = document.querySelector(boundary);

            if (boundary) {
                maxHeight = boundary.getBoundingClientRect().top - rect.top;
            }
        }

        if (maxHeight > window.innerHeight) {
            return;
        }

        this.style.maxHeight = `${maxHeight}px`;
    }
});