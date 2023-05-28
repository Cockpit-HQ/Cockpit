import { on } from '../../js/events.js';


on(document.documentElement, 'keyup', function (e) {

    if (!['Esc', 'Escape'].includes(e.key)) {
        return;
    }

    let last = null

    document.querySelectorAll('kiss-dialog[open="true"][esc="true"]').forEach(dialog => {
        last = dialog;
    });

    if (last) last.close();
});

customElements.define('kiss-dialog', class extends HTMLElement {

    connectedCallback() {

        on(this, 'click', '[kiss-dialog-close]', e => {
            e.preventDefault();
            this.close();
        });
    }

    show() {

        this.setAttribute('open', 'true');

        setTimeout(() => {

            const focusElement = this.querySelector('[autofocus]') ||
                                 this.querySelector('a[href]:not([target="_blank"]),button:not([disabled])');

            if (focusElement) {
                focusElement.focus();
            }

        }, 100);
    }

    close() {
        this.removeAttribute('open');
    }
});
