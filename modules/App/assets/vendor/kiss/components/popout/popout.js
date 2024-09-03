import { on, trigger } from '../../js/events.js';
import { isInViewport, isElementOnTop, setHighestZindex } from '../../js/utils.js';


on(document.documentElement, 'click', '[kiss-popout]', function (e) {

    e.preventDefault();

    let menu = document.querySelector(this.getAttribute('kiss-popout') || this.getAttribute('href'));

    if (menu && menu.show) {

        let position = this.getAttribute('kiss-popout-pos');

        menu.show(position ? this : null, position);
    }
});

on(document.documentElement, 'keyup', function (e) {

    if (!['Esc', 'Escape'].includes(e.key)) {
        return;
    }

    let elements = document.querySelectorAll('kiss-popout[open="true"]'), ele;

    for (let i = 0; i < elements.length; i++) {

        ele = elements[i];

        if (isElementOnTop(ele)) {
            e.stopImmediatePropagation();
            ele.close();
            break;
        }
    }
});

customElements.define('kiss-popout', class extends HTMLElement {

    static get observedAttributes() {
        return ['open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {

        if (name == 'open') {
            if (newValue === 'true') {
                setHighestZindex(this);
            } else {
                this.style.zIndex = '';
            }
        }
    }

    connectedCallback() {

        on(this, 'click', e => {

            if (e.target.matches('[kiss-popout-close]') || e.target.closest('[kiss-popout-close]')) {
                return this.close();
            }

            if (this.getAttribute('modal') !== 'true') {
                this.close();
            }
        });

        if (this.getAttribute('open') === 'true') {
            setHighestZindex(this);
        }
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

        setTimeout(() => {

            const focusElement = this.querySelector('[autofocus]') || this.querySelector('a[href]:not([target="_blank"]),button:not([disabled])');

            if (focusElement) {
                focusElement.focus();
            }

        }, 100);

        this.setAttribute('open', 'true');
    }

    close() {
        this.removeAttribute('open');
        trigger(this, 'popoutclose');
    }
});
