customElements.define('app-scrollcontainer', class extends HTMLElement {

    static get observedAttributes() {
        return ['boundary', 'mode'];
    }

    constructor() {
        super();

        // Bind stable listener references for cleanup
        this._onDomContentLoaded = () => requestAnimationFrame(() => {
            setTimeout(() => this.expand());
        });

        this._onResize = () => requestAnimationFrame(() => {
            setTimeout(() => this.expand());
        });

        this._onLoad = () => requestAnimationFrame(() => {
            setTimeout(() => this.expand());
        });

        this._connected = false;

        // Observers for dynamic boundaries
        this._mo = null; // MutationObserver
        this._moScheduled = false;
        this._ro = null; // ResizeObserver
        this._boundaryEl = null;
    }

    connectedCallback() {

        if (!this._connected) {
            document.addEventListener('DOMContentLoaded', this._onDomContentLoaded);
            window.addEventListener('resize', this._onResize);
            window.addEventListener('load', this._onLoad);
            this._connected = true;
        }

        // Setup observers for dynamic boundary handling
        this._updateBoundaryObserver();

        // Ensure an initial calculation even if added post-load
        requestAnimationFrame(() => {
            setTimeout(() => this.expand());
        });
    }

    disconnectedCallback() {
        if (this._connected) {
            document.removeEventListener('DOMContentLoaded', this._onDomContentLoaded);
            window.removeEventListener('resize', this._onResize);
            window.removeEventListener('load', this._onLoad);
            this._connected = false;
        }

        // Tear down dynamic observers
        this._detachResizeObserver();
        this._disconnectMutationObserver();
        this._boundaryEl = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'boundary') {
                this._updateBoundaryObserver();
            }
            this.expand();
        }
    }

    expand() {

        this.style.maxHeight = '';
        this.style.paddingBottom = '';

        let rect = this.getBoundingClientRect();
        let mode = this.getAttribute('mode');

        if (rect.top > window.innerHeight) {
            return;
        }

        let maxHeight = window.innerHeight - rect.top;

        switch (mode) {
            case 'boundary-include':
            case 'boundary':

                let boundary = this.getAttribute('boundary');

                if (boundary) {
                    boundary = document.querySelector(boundary);

                    if (boundary) {

                        const brect = boundary.getBoundingClientRect();

                        maxHeight = brect.top - rect.top;

                        if (mode === 'boundary-include') {
                            maxHeight += brect.height;
                            this.style.paddingBottom = `${brect.height}px`;
                        }
                    }
                }

                if ((rect.top + maxHeight) >= window.innerHeight) {
                    maxHeight = window.innerHeight - rect.top;
                }

                break;
        }

       this.style.maxHeight = `${maxHeight}px`;
    }

    // --- Dynamic boundary handling ---
    _updateBoundaryObserver() {
        const selector = this.getAttribute('boundary');

        // If no boundary, tear down observers
        if (!selector) {
            this._detachResizeObserver();
            this._disconnectMutationObserver();
            this._boundaryEl = null;
            return;
        }

        // Ensure mutation observer is active to detect late-bound elements
        this._ensureMutationObserver();
        // Resolve current boundary and attach resize observer if found
        this._maybeRefreshBoundary();
    }

    _ensureMutationObserver() {
        if (this._mo) return;
        try {
            this._mo = new MutationObserver(() => {
                if (this._moScheduled) return;
                this._moScheduled = true;
                requestAnimationFrame(() => {
                    this._moScheduled = false;
                    this._maybeRefreshBoundary();
                });
            });
            const root = document.body || document.documentElement || document;
            this._mo.observe(root, { childList: true, subtree: true });
        } catch (e) {
            // Silently ignore if observer can't be created
        }
    }

    _disconnectMutationObserver() {
        if (this._mo) {
            try { this._mo.disconnect(); } catch (e) {}
            this._mo = null;
        }
    }

    _maybeRefreshBoundary() {
        const prev = this._boundaryEl;
        const next = this._resolveBoundaryElement();

        if (prev !== next) {
            this._detachResizeObserver();
            this._boundaryEl = next;
            if (next) this._attachResizeObserver(next);
            this.expand();
        } else if (next) {
            // Boundary unchanged; still expand to react to unrelated DOM changes
            this.expand();
        }
    }

    _resolveBoundaryElement() {
        const selector = this.getAttribute('boundary');
        if (!selector) return null;
        try {
            return document.querySelector(selector);
        } catch (e) {
            // Invalid selector; ignore
            return null;
        }
    }

    _attachResizeObserver(el) {
        if (!('ResizeObserver' in window)) return;
        if (!this._ro) {
            try {
                this._ro = new ResizeObserver(() => {
                    requestAnimationFrame(() => this.expand());
                });
            } catch (e) {
                this._ro = null;
            }
        }
        if (this._ro) {
            try { this._ro.observe(el); } catch (e) {}
        }
    }

    _detachResizeObserver() {
        if (this._ro && this._boundaryEl) {
            try { this._ro.unobserve(this._boundaryEl); } catch (e) {}
        }
    }
});
