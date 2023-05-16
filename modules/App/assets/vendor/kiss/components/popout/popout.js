import { on, trigger } from '../../js/events.js';
import { isInViewport } from '../../js/utils.js';


on(document.documentElement, 'click', '[kiss-popout]', function (e) {

    e.preventDefault();

    let menu = document.querySelector(this.getAttribute('kiss-popout') || this.getAttribute('href'));

    if (menu && menu.show) {

        let position = this.getAttribute('kiss-popout-pos');

        menu.show(position ? this : null, position);
    }
});

customElements.define('kiss-popout', class extends HTMLElement {

    connectedCallback() {

        on(this, 'click', e => {

            if (e.target.matches('[kiss-popout-close]') || e.target.closest('[kiss-popout-close]')) {
                return this.close();
            }

            if (this.getAttribute('modal') !== 'true') {
                this.close();
            }
        });
    }

    show(ele, position = 'left') {

        let content = this.querySelector('kiss-content');

        if (content) {
            content.style.position = '';
            content.style.top = '';
            content.style.left = '';
        }

        if (content && ele) {

            let rect = ele.getBoundingClientRect(),
                left = rect.left,
                top = rect.top + ele.offsetHeight;

            switch (position) {
                case 'right':
                    left = rect.right - content.offsetWidth;
                    break;

                case 'center':
                    left = (rect.right - ele.offsetWidth/2) - content.offsetWidth / 2;
                    break;

                case 'left':
                default:
                    left = rect.left;
                    break;
            }

            if (left + content.offsetWidth > this.offsetWidth) {
                left = rect.right - content.offsetWidth;
            }

            content.style.position = 'absolute';
            content.style.top = `${top}px`;
            content.style.left = `${left}px`;

            if (!isInViewport(content)) {
                content.style.position = '';
                content.style.top = '';
                content.style.left = '';
            }
        }

        this.setAttribute('open', 'true');
    }

    close() {
        this.removeAttribute('open');
        trigger(this, 'popoutclose');
    }
});
