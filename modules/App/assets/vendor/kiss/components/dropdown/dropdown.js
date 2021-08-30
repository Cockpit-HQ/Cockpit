import {on} from '../../js/events.js';


on(document.documentElement, 'click', function(e) {

    let dropdowns = document.body.querySelectorAll('kiss-dropdown[open="true"]'),
        dp = e.target.closest('kiss-dropdown');

    for (let i=0;i<dropdowns.length;i++) {
        if (!dp || dp!==dropdowns[i]) dropdowns[i].close();
    }

});

customElements.define('kiss-dropdown', class extends HTMLElement {

    connectedCallback() {

        this.addEventListener('click', (e) => {

            if (e.target.matches('input,select,textarea')) {
                return;
            }

            if (this.getAttribute('open') == 'true') {

                if (this.getAttribute('autohide') == 'false') {
                    return
                }

                this.close();
            } else {
                this.open();
            }
        });
    }

    open() {
        this.setAttribute('open', 'true');
    }

    close() {
        this.removeAttribute('open');
    }
});