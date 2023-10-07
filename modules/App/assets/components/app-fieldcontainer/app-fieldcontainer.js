import { trigger } from '../../vendor/kiss/js/events.js';

const fn = e => {

    let element = e.target, closest = e.target.matches('app-fieldcontainer') ? e.target : null;

    while ((element = element.parentElement)) {
        if (element.matches('app-fieldcontainer')) {
            closest = element
        }
    }

    let containers = document.querySelectorAll('app-fieldcontainer[active="true"]');

    containers.forEach(container => {

        if (container !== closest) {
            container.removeAttribute('active')
        }
    });
};


document.addEventListener('click', fn);
document.addEventListener('focusin', fn);

customElements.define('app-fieldcontainer', class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {

        this.addEventListener('click', e => this.focus());
        this.addEventListener('focusin', e => this.focus());
    }

    disconnectedCallback() {

    }

    focus() {

        if (this.getAttribute('active') === 'true') {
            return;
        }

        this.setAttribute('active', 'true');
        fn({target: this});
        trigger(this, 'fieldcontainer:focus');
    }
});
