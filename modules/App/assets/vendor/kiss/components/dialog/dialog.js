import { on } from '../../js/events.js';
import { isElementOnTop } from '../../js/utils.js';


on(document.documentElement, 'keyup', function (e) {

    if (!['Esc', 'Escape'].includes(e.key)) {
        return;
    }

    let elements = document.querySelectorAll('kiss-dialog[open="true"][esc="true"]'), ele;

    for (let i = 0; i < elements.length; i++) {

        ele = elements[i];

        if (isElementOnTop(ele)) {
            e.stopImmediatePropagation();
            ele.close();
            break;
        }
    }
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

            this.scroll(0, 0);

        }, 100);
    }

    close() {
        this.removeAttribute('open');
    }
});
