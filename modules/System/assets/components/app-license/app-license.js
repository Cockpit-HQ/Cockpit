customElements.define('app-license', class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        document.addEventListener('DOMContentLoaded', () => this.check());
    }

    disconnectedCallback() {

    }

    check() {

        App.request('/system/utils/license').then(rsp => {

            if (rsp.isTrial) {

                this.innerHTML = /*html*/`
                <a class="kiss-button kiss-button-small kiss-button-danger kiss-margin-left animated fadeInDown" href="https://getcockpit.com" target="_blank">
                    Pro trial version
                </a>`;

            } else {
                this.remove();
            }
        });
    }
});
