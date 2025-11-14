import {on} from '../../js/events.js';

let tooltipContainer = null;

on(document.documentElement, 'mouseenter', '[kiss-tooltip]', function(e) {

    e.preventDefault();

    if (!tooltipContainer) {

        tooltipContainer = document.createElement('kiss-tooltip');
        document.body.appendChild(tooltipContainer);

    }

    tooltipContainer.show(this.getAttribute('aria-label'), this, this.getAttribute('kiss-tooltip'));
});


customElements.define('kiss-tooltip', class extends HTMLElement {

    connectedCallback() {

    }

    show(text, ele, position = 'bottom') {

        this.innerText = text;
        this.setAttribute('show', 'true');

        if (ele) {
            let rect = ele.getBoundingClientRect(),
            left = null,
            top = null,
            offset = 5;

            switch (position) {

                case 'left':
                    top = (rect.top + rect.height / 2) - this.offsetHeight / 2;
                    left = rect.left - this.offsetWidth - offset;
                    break;

                case 'right':
                    top = (rect.top + rect.height / 2) - this.offsetHeight / 2;
                    left = rect.right + offset;
                    break;

                case 'bottom':
                    top = rect.bottom + offset
                    left = rect.left;
                    break;

                case 'bottom-right':
                    top = rect.bottom + offset;
                    left = rect.right - this.offsetWidth;
                    break;

                case 'top':
                    top = rect.top - this.offsetHeight - offset;
                    left = rect.left;
                    break;

                case 'top-right':
                    top = rect.top - this.offsetHeight - offset;
                    left = rect.right - this.offsetWidth;
                    break;

                default:
                    left = rect.left;
                    break;
            }

            Object.assign(this.style, {
                top: `${top}px`,
                left: `${left}px`
            });

            this.$element = ele;

            if (!ele.__tooltiped) {

                on(ele, 'mouseleave', e => {
                    tooltipContainer.hide();
                });

                ele.__tooltiped = true;
            }

        }
    }

    hide() {
        this.setAttribute('show', 'false');
    }

    isActive() {
        return this.getAttribute('show') == 'true';
    }
});
