import {on} from '../../js/events.js';
import { isElementOnTop, setHighestZindex } from '../../js/utils.js';


on(document.documentElement, 'click', function(e) {

    let dropdowns = document.body.querySelectorAll('kiss-dropdown[open="true"]'),
        dp = e.target.closest('kiss-dropdown');

    // If click happened inside a portaled dropdownbox, treat as click inside its host dropdown
    if (!dp) {
        const box = e.target.closest('kiss-dropdownbox');
        if (box && box._host) {
            dp = box._host;
        }
    }

    for (let i=0;i<dropdowns.length;i++) {
        const dd = dropdowns[i];
        if (!dp || dp!==dd) {
            // Respect autohide="false" (default is true)
            if (dd.getAttribute('autohide') == 'false') continue;
            dd.close();
        }
    }

});

on(document.documentElement, 'keyup', function (e) {

    if (!['Esc', 'Escape'].includes(e.key)) {
        return;
    }

    let elements = document.querySelectorAll('kiss-dropdown[open="true"]'), ele;

    for (let i = 0; i < elements.length; i++) {
        const host = elements[i];
        const box = host._box || host.querySelector('kiss-dropdownbox');
        ele = box || host;

        if (isElementOnTop(ele)) {
            e.stopImmediatePropagation();
            host.close();
            break;
        }
    }
});

customElements.define('kiss-dropdown', class extends HTMLElement {

    static get observedAttributes() { return ['open']; }

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

        // Initialize ARIA attributes
        this._initAria();
        this._syncAria();

        if (this.getAttribute('open') == 'true') {
            this._portalOpen();
        }
    }

    disconnectedCallback() {
        // Ensure cleanup if element is removed while open
        this._portalClose();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'open') {
            this._syncAria();
            if (newValue === 'true') this._portalOpen();
            if (newValue === null) this._animateCloseAndPortalBack();
        }
    }

    open() {
        this.setAttribute('open', 'true');
        this._syncAria();
    }

    close() {
        this.removeAttribute('open');
        this._syncAria();
    }

    _initAria() {
        // Ensure a content element and link it for assistive tech
        const box = this.querySelector('kiss-dropdownbox');
        this._box = box || null;

        if (this._box) {
            if (!this._box.id) {
                this._box.id = 'kiss-dropdownbox-' + Math.random().toString(36).slice(2);
            }
            if (!this.hasAttribute('aria-controls')) {
                this.setAttribute('aria-controls', this._box.id);
            }
            // Hide content initially when not open
            this._box.setAttribute('aria-hidden', this.getAttribute('open') == 'true' ? 'false' : 'true');
        }

        if (!this.hasAttribute('aria-haspopup')) {
            this.setAttribute('aria-haspopup', 'true');
        }
    }

    _syncAria() {
        const isOpen = this.getAttribute('open') == 'true';
        this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        if (!this._box) this._box = this.querySelector('kiss-dropdownbox');
        if (this._box) {
            this._box.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        }
    }

    _portalOpen() {
        if (!this._box) this._box = this.querySelector('kiss-dropdownbox');
        const box = this._box;
        if (!box) return;

        // Cancel any pending close animation
        if (this._closing) {
            if (this._onCloseEnd) {
                try { box.removeEventListener('transitionend', this._onCloseEnd); } catch(e){}
                this._onCloseEnd = null;
            }
            if (this._closeTimer) {
                clearTimeout(this._closeTimer);
                this._closeTimer = null;
            }
            this._closing = false;
        }

        if (this._portaled) {
            // Already portaled; just ensure position/z-index is updated
            this._positionBox();
            setHighestZindex(box);
            return;
        }

        // Remember original position
        if (!this._boxPlaceholder) {
            this._boxPlaceholder = document.createComment('kiss-dropdownbox-placeholder');
        }
        if (!box._host) box._host = this;

        // Move to body
        if (box.parentNode !== document.body) {
            this._boxParent = box.parentNode;
            this._boxParent.insertBefore(this._boxPlaceholder, box);
            document.body.appendChild(box);
        }

        // Prepare styles to override component CSS while portaled
        box.style.position = 'absolute';
        box.style.display = 'block';
        box.style.opacity = '0';
        box.style.transform = 'translateY(0)';
        box.style.right = 'auto';
        box.style.left = '0px';
        box.style.top = '0px';
        box.style.margin = '0';
        // Disable transition during initial placement
        box.style.transition = 'none';

        // Position and z-index
        const flipped = this._positionBox();
        setHighestZindex(box);

        // Inside click should close when autohide != false (keep legacy behavior)
        if (!this._boxClickHandler) {
            this._boxClickHandler = (ev) => {
                if (this.getAttribute('autohide') == 'false') return;
                if (ev.target && ev.target.matches && ev.target.matches('input,select,textarea')) return;
                this.close();
            };
        }
        box.addEventListener('click', this._boxClickHandler);

        // Reposition on resize/scroll
        if (!this._repositionHandler) {
            this._repositionHandler = () => {
                this._positionBox();
            };
            window.addEventListener('resize', this._repositionHandler, { passive: true });
            window.addEventListener('scroll', this._repositionHandler, { passive: true });
        }

        // Listen to scroll on ancestor scroll containers
        this._attachScrollParents();

        // Observe size changes to keep placement correct
        if (window.ResizeObserver) {
            if (!this._resizeObserver) {
                this._resizeObserver = new ResizeObserver(() => this._positionBox());
            }
            this._resizeObserver.observe(this);
            this._resizeObserver.observe(box);
        }

        this._portaled = true;

        // Run entry animation: small translate and fade-in
        const delta = flipped ? -10 : 10;
        box.style.transform = `translateY(${delta}px)`;
        // Force reflow to ensure the starting transform/opacity take effect
        void box.offsetHeight;
        box.style.transition = 'opacity 200ms ease, transform 200ms ease';
        box.style.opacity = '1';
        box.style.transform = 'translateY(0)';
    }

    _portalClose() {
        const box = this._box;
        if (!box) return;

        // Remove position listeners
        if (this._repositionHandler) {
            window.removeEventListener('resize', this._repositionHandler);
            window.removeEventListener('scroll', this._repositionHandler);
            this._repositionHandler = null;
        }

        // Remove scroll listeners from ancestor containers
        this._detachScrollParents();

        if (this._resizeObserver) {
            try { this._resizeObserver.unobserve(this); } catch(e){}
            try { this._resizeObserver.unobserve(box); } catch(e){}
        }

        // Restore original placement
        if (this._boxPlaceholder && this._boxParent) {
            this._boxParent.insertBefore(box, this._boxPlaceholder);
            this._boxParent.removeChild(this._boxPlaceholder);
        } else if (this._boxParent) {
            this._boxParent.appendChild(box);
        } else {
            this.appendChild(box);
        }

        // Cleanup temporary styles
        box.style.position = '';
        box.style.display = '';
        box.style.opacity = '';
        box.style.transform = '';
        box.style.right = '';
        box.style.left = '';
        box.style.top = '';
        box.style.margin = '';
        box.style.transition = '';

        // Remove inside click handler
        if (this._boxClickHandler) {
            box.removeEventListener('click', this._boxClickHandler);
        }

        this._portaled = false;
        this._closing = false;
    }

    _positionBox() {
        const box = this._box;
        if (!box) return;

        const rect = this.getBoundingClientRect();

        // Ensure box has dimensions before positioning
        const prevDisplay = box.style.display;
        if (getComputedStyle(box).display === 'none') {
            box.style.display = 'block';
        }
        const boxRect = box.getBoundingClientRect();
        const boxW = boxRect.width;
        const boxH = boxRect.height;
        box.style.display = prevDisplay || 'block';

        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        const gap = 10; // match CSS margin-top
        // Compute viewport-relative coordinates first
        let leftVP = rect.right - boxW; // default (right align)
        let topVP = rect.bottom + gap;  // default (below)

        const pos = box.getAttribute('pos');

        if (pos === 'left') {
            leftVP = rect.left;
        } else if (pos === 'center') {
            leftVP = rect.left + (rect.width / 2) - (boxW / 2);
        } else if (pos === 'aside-left') {
            leftVP = rect.left - boxW - gap;
            topVP = rect.top; // align top edges
        }

        // Keep within viewport horizontally
        const vw = (window.innerWidth || document.documentElement.clientWidth);
        const vh = (window.innerHeight || document.documentElement.clientHeight);
        if (leftVP + boxW > vw) {
            leftVP = vw - boxW - 4;
        }
        if (leftVP < 0) {
            leftVP = 4;
        }

        // Vertical flip if not enough space below
        let flipped = false;
        if (topVP + boxH > vh) {
            flipped = true;
            let altTopVP;
            if (pos === 'aside-left') {
                altTopVP = rect.bottom - boxH; // align bottom to trigger bottom
            } else {
                altTopVP = rect.top - gap - boxH; // place above
            }
            if (altTopVP < 4) altTopVP = 4;
            topVP = altTopVP;
        }

        // Clamp vertically within viewport
        if (topVP < 4) topVP = 4;
        if (topVP + boxH > vh) topVP = Math.max(4, vh - boxH - 4);

        // Apply final document coordinates
        box.style.left = (scrollX + leftVP) + 'px';
        box.style.top = (scrollY + topVP) + 'px';

        this._flipped = flipped;
        return flipped;
    }

    _animateCloseAndPortalBack() {
        const box = this._box;
        if (!box || !this._portaled) { this._portalClose(); return; }

        // If an animation is already running, avoid starting a second
        if (this._closing) return;
        this._closing = true;

        // Ensure correct transition is set
        box.style.transition = 'opacity 200ms ease, transform 200ms ease';
        // Compute direction based on flipped state
        const delta = this._flipped ? -10 : 10;
        // Force reflow to anchor starting point
        void box.offsetHeight;
        // Animate out
        box.style.opacity = '0';
        box.style.transform = `translateY(${delta}px)`;

        // On transition end, cleanup and portal back
        this._onCloseEnd = (ev) => {
            // Only react once (opacity or transform may both fire)
            if (this._closing) {
                this._closing = false;
                if (this._onCloseEnd) {
                    try { box.removeEventListener('transitionend', this._onCloseEnd); } catch(e){}
                    this._onCloseEnd = null;
                }
                if (this._closeTimer) {
                    clearTimeout(this._closeTimer);
                    this._closeTimer = null;
                }
                this._portalClose();
            }
        };
        box.addEventListener('transitionend', this._onCloseEnd);

        // Fallback in case transitionend doesn't fire
        this._closeTimer = setTimeout(() => {
            if (!this._closing) return;
            this._closing = false;
            if (this._onCloseEnd) {
                try { box.removeEventListener('transitionend', this._onCloseEnd); } catch(e){}
                this._onCloseEnd = null;
            }
            this._portalClose();
        }, 250);
    }

    _getScrollParents() {
        const parents = [];
        let node = this.parentElement;
        while (node && node !== document.body && node !== document.documentElement) {
            const style = getComputedStyle(node);
            const oy = style.overflowY;
            const ox = style.overflowX;
            if (/(auto|scroll|overlay)/.test(oy) || /(auto|scroll|overlay)/.test(ox)) {
                parents.push(node);
            }
            node = node.parentElement;
        }
        return parents;
    }

    _attachScrollParents() {
        if (this._scrollParents && this._scrollParents.length) return;
        this._scrollParents = this._getScrollParents();
        if (!this._scrollParents) this._scrollParents = [];
        this._scrollParents.forEach(p => p.addEventListener('scroll', this._repositionHandler, { passive: true }));
    }

    _detachScrollParents() {
        if (!this._scrollParents) return;
        this._scrollParents.forEach(p => p.removeEventListener('scroll', this._repositionHandler));
        this._scrollParents = null;
    }
});
