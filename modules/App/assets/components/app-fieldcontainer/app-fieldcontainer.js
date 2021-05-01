const fn = e => {

    let element = e.target, closest = e.target.matches('app-fieldcontainer') ? e.target : null;

    while ((element = element.parentElement)) {
        if (element.matches('app-fieldcontainer')) {
            closest = element
        }
    }

    let containers = document.querySelectorAll('app-fieldcontainer');

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

        this.addEventListener('click', e => this.setAttribute('active','true'));
        this.addEventListener('focusin', e => this.setAttribute('active','true'));
    }

    disconnectedCallback() {

    }
});