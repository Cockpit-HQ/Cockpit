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
            case 'boundary-include':
            case 'boundary':

                let boundary = this.getAttribute('boundary');

                if (boundary) {
                    boundary = document.querySelector(boundary);

                    if (boundary) {

                        const brect = boundary.getBoundingClientRect();

                        maxHeight = brect.top - rect.top;

                        if (mode === 'boundary-include') {
                            maxHeight += brect.height;
                            this.style.paddingBottom = `${brect.height}px`;
                        }
                    }
                }

                if (maxHeight > window.innerHeight) {
                    return;
                }


                if ((rect.top + maxHeight) >= window.innerHeight) {
                    maxHeight = window.innerHeight - rect.top;
                }

                break;
        }

       this.style.maxHeight = `${maxHeight}px`;
    }
});
