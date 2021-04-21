import { on } from '../../js/events.js';


on(document.documentElement, 'click', '[kiss-popoutmenu]', function (e) {

    e.preventDefault();

    let menu = document.querySelector(this.getAttribute('kiss-popoutmenu') || this.getAttribute('href'));

    if (menu && menu.show) {
        menu.show(this);
    }
});

customElements.define('kiss-popoutmenu', class extends HTMLElement {

    connectedCallback() {

        on(this, 'click', e => {
            this.close();
        });
    }

    show(ele) {

        if (ele) {

            let content = this.querySelector('kiss-content');

            if (content) {

                let rect = ele.getBoundingClientRect(),
                    left = rect.left,
                    top = rect.top + ele.offsetHeight;

                if (left + content.offsetWidth > this.offsetWidth) {
                    left = rect.right - content.offsetWidth;
                }

                content.style.position = 'absolute';
                content.style.top = `${top}px`;
                content.style.left = `${left}px`;

            }
        }

        this.setAttribute('open', 'true');
    }

    close() {
        this.removeAttribute('open');
    }
});