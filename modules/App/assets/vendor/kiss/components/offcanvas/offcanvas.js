import { on } from '../../js/events.js';

on(document.documentElement, 'click', '[kiss-offcanvas]', function (e) {

    e.preventDefault();

    let offcanvas = document.querySelector(this.getAttribute('kiss-offcanvas') || this.getAttribute('href'));

    if (offcanvas && offcanvas.show) {
        offcanvas.show();
    }
});

customElements.define('kiss-offcanvas', class extends HTMLElement {

    connectedCallback() {

        on(this, 'click', e => {

            if (e.target == this) {

                e.preventDefault();

                if (!this.matches('[modal="true"]')) {
                    this.close();
                }
            }

        });

        on(this, 'click', '[kiss-offcanvas-close]', e => {
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
