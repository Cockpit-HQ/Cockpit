import { on, onMutation } from '../../js/events.js';
import { isElementOnTop, setHighestZindex } from '../../js/utils.js';

on(document.documentElement, 'click', '[kiss-offcanvas]', function (e) {

    e.preventDefault();

    let offcanvas = document.querySelector(this.getAttribute('kiss-offcanvas') || this.getAttribute('href'));

    if (offcanvas && offcanvas.show) {
        offcanvas._triggerEl = this;
        this.setAttribute('aria-expanded', 'true');
        this.setAttribute('aria-haspopup', 'dialog');
        if (offcanvas.id) this.setAttribute('aria-controls', offcanvas.id);
        offcanvas.show();
    }
});

on(document.documentElement, 'keyup', function (e) {

    if (!['Esc', 'Escape'].includes(e.key)) {
        return;
    }

    let elements = document.querySelectorAll('kiss-offcanvas[open="true"]'), ele;

    for (let i = 0; i < elements.length; i++) {

        ele = elements[i];

        if (isElementOnTop(ele)) {
            e.stopImmediatePropagation();
            ele.close();
            break;
        }
    }

});

customElements.define('kiss-offcanvas', class extends HTMLElement {

    connectedCallback() {

        let $self = this, pointerStart = null;

        // Ensure baseline ARIA semantics
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'dialog');
        }
        if (this.getAttribute('open') === 'true') {
            this.setAttribute('aria-modal', 'true');
            this.setAttribute('aria-hidden', 'false');
        } else {
            this.setAttribute('aria-hidden', 'true');
        }

        on(this, 'pointerdown', e => pointerStart = e.target);
        on(this, 'pointerup', e => {

            if (e.target == this && pointerStart == this) {

                e.preventDefault();

                if (!this.matches('[modal="true"]')) {
                    this.close();
                }
            }
        });

        on(this, 'click', '[kiss-offcanvas-close]', function(e){

            if (this.getAttribute('kiss-offcanvas-close') != 'no-prevent') {
                e.preventDefault();
            }

            $self.close();
        });

        if (this.getAttribute('open') === 'true') {
            setHighestZindex(this);
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
            onTransitionEnd(content, 'transform', 300)
        ]).then(() => {
            overlay.removeAttribute('open');
            overlay.removeAttribute('closing');
            overlay.setAttribute('aria-hidden', 'true');
            overlay.removeAttribute('aria-modal');
            if (overlay._triggerEl) {
                overlay._triggerEl.setAttribute('aria-expanded', 'false');
                try { overlay._triggerEl.focus(); } catch (e) {}
            } else if (this._previouslyFocused && document.contains(this._previouslyFocused)) {
                try { this._previouslyFocused.focus(); } catch (e) {}
            }
        });

        this._closingPromise = this._closingPromise.finally(() => { this._closingPromise = null; });
        return this._closingPromise;
    }
});
