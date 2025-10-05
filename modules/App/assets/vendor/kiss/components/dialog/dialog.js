import { on } from '../../js/events.js';
import { isElementOnTop, setHighestZindex } from '../../js/utils.js';


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

        // Ensure baseline ARIA semantics
        if (!this.hasAttribute('role')) {
            const type = this.getAttribute('type');
            this.setAttribute('role', (type === 'alert' || type === 'confirm') ? 'alertdialog' : 'dialog');
        }
        if (this.getAttribute('open') === 'true') {
            this.setAttribute('aria-modal', 'true');
            this.setAttribute('aria-hidden', 'false');
        } else {
            this.setAttribute('aria-hidden', 'true');
        }

        on(this, 'click', '[kiss-dialog-close]', e => {
            e.preventDefault();
            this.close();
        });

        if (this.getAttribute('open') === 'true') {
            this.show();
        }

        // Trap focus when open
        on(this, 'keydown', (e) => {
            if (e.key !== 'Tab') return;
            if (this.getAttribute('open') !== 'true') return;

            const focusable = this.querySelectorAll('a[href]:not([tabindex="-1"]):not([disabled]), button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), input[type]:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])');
            const list = Array.from(focusable).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
            if (!list.length) return;

            const first = list[0];
            const last = list[list.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first || !this.contains(document.activeElement)) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last || !this.contains(document.activeElement)) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    show() {

        setHighestZindex(this);
        this._previouslyFocused = document.activeElement;
        this.removeAttribute('closing');
        this.setAttribute('open', 'true');
        this.setAttribute('aria-modal', 'true');
        this.setAttribute('aria-hidden', 'false');

        setTimeout(() => {

            const focusElement = this.querySelector('[autofocus]') ||
                                 this.querySelector('a[href]:not([target="_blank"]),button:not([disabled])');

            if (focusElement) {
                focusElement.focus();
            } else {
                this.focus();
            }

            this.scroll(0, 0);

        }, 100);
    }

    close() {
        if (this._closingPromise) return this._closingPromise;

        if (this.getAttribute('open') !== 'true') {
            return Promise.resolve();
        }

        const overlay = this;
        const content = this.querySelector('kiss-content');

        const onTransitionEnd = (el, prop, fallbackMs = 350) => new Promise((resolve) => {
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
            onTransitionEnd(overlay, 'opacity', 220),
            onTransitionEnd(content, 'transform', 200)
        ]).then(() => {
            overlay.removeAttribute('open');
            overlay.removeAttribute('closing');
            overlay.setAttribute('aria-hidden', 'true');
            overlay.removeAttribute('aria-modal');
            if (this._previouslyFocused && document.contains(this._previouslyFocused)) {
                try { this._previouslyFocused.focus(); } catch (e) {}
            }
        });

        this._closingPromise = this._closingPromise.finally(() => { this._closingPromise = null; });
        return this._closingPromise;
    }
});
