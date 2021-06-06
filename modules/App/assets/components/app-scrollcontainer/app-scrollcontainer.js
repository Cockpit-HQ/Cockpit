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
        let mode = this.getAttribute('mode');

        if (rect.top > window.innerHeight) {
            return;
        }

        let maxHeight = window.innerHeight - rect.top;

        switch (mode) {
            case 'boundary':

                let boundary = this.getAttribute('boundary');

                if (boundary) {
                    boundary = document.querySelector(boundary);

                    if (boundary) {
                        maxHeight = boundary.getBoundingClientRect().top - rect.top;
                    }
                }

                if (maxHeight > window.innerHeight) {
                    return;
                }

                break;
        }


        this.style.maxHeight = `${maxHeight}px`;
    }
});