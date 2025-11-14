import { on, trigger } from '../../js/events.js';
import { isInViewport, isElementOnTop, setHighestZindex } from '../../js/utils.js';


on(document.documentElement, 'click', '[kiss-popout]', function (e) {

    e.preventDefault();

    let menu = document.querySelector(this.getAttribute('kiss-popout') || this.getAttribute('href'));

    if (menu && menu.show) {

        let position = this.getAttribute('kiss-popout-pos');

        const trigger = this;
        trigger.setAttribute('aria-haspopup', 'menu');
        trigger.setAttribute('aria-expanded', 'true');
        if (menu.id) trigger.setAttribute('aria-controls', menu.id);

        menu.show(position ? trigger : null, position);
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

        // Ensure baseline ARIA
        this.setAttribute('aria-hidden', this.getAttribute('open') === 'true' ? 'false' : 'true');
        const content = this.querySelector('kiss-content');
        if (content && !content.hasAttribute('role')) {
            content.setAttribute('role', 'menu');
            content.setAttribute('aria-orientation', 'vertical');
            if (!content.hasAttribute('tabindex')) content.setAttribute('tabindex', '-1');
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

        this._previouslyFocused = document.activeElement;
        this._triggerEl = ele || this._triggerEl || null;
        this.removeAttribute('closing');
        this.setAttribute('open', 'true');
        this.setAttribute('aria-hidden', 'false');
    }

    close() {
        if (this._closingPromise) return this._closingPromise;

        if (this.getAttribute('open') !== 'true') {
            return Promise.resolve();
        }

        const overlay = this;
        const content = this.querySelector('kiss-content');

        const onTransitionEnd = (el, prop, fallbackMs = 300) => new Promise((resolve) => {
            if (!el) return resolve();

            let done = false;
            const cleanup = () => {
                done = true;
                el.removeEventListener('transitionend', handler);
                clearTimeout(timer);
            };
            const handler = (e) => {
                if (done) return;
                if (e.target === el && (!prop || e.propertyName === prop)) {
                    cleanup();
                    resolve();
                }
            };

            el.addEventListener('transitionend', handler);
            const timer = setTimeout(() => {
                if (done) return;
                cleanup();
                resolve();
            }, fallbackMs);
        });

        this.setAttribute('closing', 'true');

        this._closingPromise = Promise.all([
            onTransitionEnd(overlay, 'opacity', 300),
            onTransitionEnd(content, 'transform', 200)
        ])
        .then(() => {
            overlay.removeAttribute('open');
            overlay.removeAttribute('closing');
            overlay.setAttribute('aria-hidden', 'true');
            if (overlay._triggerEl) {
                overlay._triggerEl.setAttribute('aria-expanded', 'false');
                try { overlay._triggerEl.focus(); } catch (e) {}
            } else if (this._previouslyFocused && document.contains(this._previouslyFocused)) {
                try { this._previouslyFocused.focus(); } catch (e) {}
            }
            trigger(overlay, 'popoutclose');
        });

        this._closingPromise = this._closingPromise.finally(() => { this._closingPromise = null; });
        return this._closingPromise;
    }
});
