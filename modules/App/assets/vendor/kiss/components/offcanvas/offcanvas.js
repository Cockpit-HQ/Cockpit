import { on, onMutation } from '../../js/events.js';

on(document.documentElement, 'click', '[kiss-offcanvas]', function (e) {

    e.preventDefault();

    let offcanvas = document.querySelector(this.getAttribute('kiss-offcanvas') || this.getAttribute('href'));

    if (offcanvas && offcanvas.show) {
        offcanvas.show();
    }
});

customElements.define('kiss-offcanvas', class extends HTMLElement {

    connectedCallback() {

        let $self = this, pointerStart = null;

        on(this, 'pointerdown', e => pointerStart = e.target);
        on(this, 'pointerup', e => {

            if (e.target == this && pointerStart == this) {

                e.preventDefault();

                if (!this.matches('[modal="true"]')) {
                    this.close();
                }
            }
        });


        on(this, 'click', '[kiss-offcanvas-close]', function(e){

            if (this.getAttribute('kiss-offcanvas-close') != 'no-prevent') {
                e.preventDefault();
            }

            $self.close();
        });

    }

    show() {
        this.setAttribute('open', 'true');
    }

    close() {
        this.removeAttribute('open');
    }
});
