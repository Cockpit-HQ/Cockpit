import { on } from '../../js/events.js';

customElements.define('kiss-dialog', class extends HTMLElement {

    connectedCallback() {

        on(this, 'click', '[kiss-dialog-close]', e => {
            e.preventDefault();
            this.close();
        });
    }

    show() {
        this.setAttribute('open', 'true');
    }

    close() {
        this.removeAttribute('open');
    }
});