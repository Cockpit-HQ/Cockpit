customElements.define('app-scrollcontainer', class extends HTMLElement {

    static get observedAttributes() {
        return ['boundary', 'mode'];
    }

    constructor() {
        super();

        // Bind stable listener references for cleanup
        this._onDomContentLoaded = () => this._scheduleExpand();
        this._onResize = () => this._scheduleExpand();
        this._onLoad = () => this._scheduleExpand();

        this._connected = false;

        // Cache last applied values to avoid unnecessary style writes
        this._lastMaxHeight = null;
        this._lastPadding = null;

        // Observers for dynamic boundaries
        this._mo = null; // MutationObserver
        this._moScheduled = false;
        this._ro = null; // ResizeObserver
        this._boundaryEl = null;
        this._boundarySelector = null;

        // Attribute observer for boundary itself
        this._bo = null; // MutationObserver (boundary attributes)

        // RAF scheduling for expand
        this._expandScheduled = false;
        this._expandRaf = null;

        // Intersection + viewport
        this._io = null; // IntersectionObserver
        this._onViewportChange = () => this._scheduleExpand();
    }

    connectedCallback() {

        if (!this._connected) {
            document.addEventListener('DOMContentLoaded', this._onDomContentLoaded, { once: true });
            window.addEventListener('resize', this._onResize, { passive: true });
            window.addEventListener('load', this._onLoad, { once: true });

            // Visual viewport changes (mobile keyboards, zoom)
            if (window.visualViewport) {
                try {
                    window.visualViewport.addEventListener('resize', this._onViewportChange, { passive: true });
                    window.visualViewport.addEventListener('scroll', this._onViewportChange, { passive: true });
                } catch (e) {}
            }
            this._connected = true;
        }

        // Setup observers for dynamic boundary handling
        this._updateBoundaryObserver();

        // Ensure intersection observer so we react when entering viewport
        this._ensureIntersectionObserver();

        // Ensure an initial calculation even if added post-load
        this._scheduleExpand();
    }

    disconnectedCallback() {
        if (this._connected) {
            document.removeEventListener('DOMContentLoaded', this._onDomContentLoaded);
            window.removeEventListener('resize', this._onResize);
            window.removeEventListener('load', this._onLoad);
            if (window.visualViewport) {
                try {
                    window.visualViewport.removeEventListener('resize', this._onViewportChange);
                    window.visualViewport.removeEventListener('scroll', this._onViewportChange);
                } catch (e) {}
            }
            this._connected = false;
            if (this._expandRaf) {
                try { cancelAnimationFrame(this._expandRaf); } catch (e) {}
                this._expandRaf = null;
                this._expandScheduled = false;
            }
        }

        // Tear down dynamic observers
        this._detachResizeObserver();
        this._disconnectMutationObserver();
        this._detachBoundaryAttrObserver();
        this._disconnectIntersectionObserver();
        this._boundaryEl = null;
        this._boundarySelector = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'boundary') {
                this._updateBoundaryObserver();
            }
            this._scheduleExpand();
        }
    }

    expand() {

        // Read first, write later: avoid resets/flicker
        if (!this.isConnected) return;
        const rect = this.getBoundingClientRect();
        const mode = this.getAttribute('mode');

        const viewportH = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
        if (rect.top > viewportH) {
            return;
        }

        
        let maxHeight = viewportH - rect.top; // default
        let padding = 0;

        switch (mode) {
            case 'boundary-include':
            case 'boundary': {
                let boundary = this.getAttribute('boundary');
                let boundaryEl = this._boundaryEl;

                if (!boundaryEl && boundary) {
                    // Fallback resolve if no cached boundary
                    try { boundaryEl = document.querySelector(boundary); } catch (e) { boundaryEl = null; }
                }

                if (boundaryEl) {
                        const brect = boundaryEl.getBoundingClientRect();
                        maxHeight = brect.top - rect.top;

                        if (mode === 'boundary-include') {
                            maxHeight += brect.height;
                            padding = brect.height;
                        }
                }

                if ((rect.top + maxHeight) >= viewportH) {
                    maxHeight = viewportH - rect.top;
                }
                break;
            }
        }

        // Guard against negative values
        maxHeight = Math.max(0, Math.round(maxHeight));
        padding = Math.max(0, Math.round(padding));

        // Only write when values actually change to preserve scroll position
        if (this._lastMaxHeight !== maxHeight) {
            this.style.maxHeight = `${maxHeight}px`;
            this._lastMaxHeight = maxHeight;
        }

        if (this._lastPadding !== padding) {
            if (padding > 0) {
                this.style.paddingBottom = `${padding}px`;
            } else {
                this.style.paddingBottom = '';
            }
            this._lastPadding = padding;
        }
    }

    // --- Dynamic boundary handling ---
    _updateBoundaryObserver() {
        const selector = this.getAttribute('boundary');
        this._boundarySelector = selector || null;

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
            this._mo = new MutationObserver((mutations) => {
                // Only react if the boundary selector element appears/disappears in mutated nodes
                const selector = this._boundarySelector;
                let relevant = false;
                if (selector) {
                    for (const m of mutations) {
                        if (m.type === 'childList') {
                            for (const n of m.addedNodes) {
                                if (n.nodeType === 1) {
                                    if (n.matches && n.matches(selector)) { relevant = true; break; }
                                    if (n.querySelector && n.querySelector(selector)) { relevant = true; break; }
                                }
                            }
                            if (relevant) break;
                            for (const n of m.removedNodes) {
                                if (n === this._boundaryEl) { relevant = true; break; }
                                if (n.nodeType === 1 && this._boundaryEl && n.contains && n.contains(this._boundaryEl)) { relevant = true; break; }
                            }
                        }
                        if (relevant) break;
                    }
                }
                if (!relevant) return;
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
            this._detachBoundaryAttrObserver();
            this._boundaryEl = next;
            if (next) {
                this._attachResizeObserver(next);
                this._attachBoundaryAttrObserver(next);
            }
            this._scheduleExpand();
        } else if (next) {
            // Boundary unchanged; still expand to react to unrelated DOM changes
            this._scheduleExpand();
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
                    this._scheduleExpand();
                });
            } catch (e) {
                this._ro = null;
            }
        }
        if (this._ro) {
            try { this._ro.observe(el); } catch (e) {}
        }
    }

    _detachBoundaryAttrObserver() {
        if (this._bo) {
            try { this._bo.disconnect(); } catch (e) {}
            this._bo = null;
        }
    }

    _attachBoundaryAttrObserver(el) {
        this._detachBoundaryAttrObserver();
        try {
            this._bo = new MutationObserver(() => this._scheduleExpand());
            this._bo.observe(el, { attributes: true, attributeFilter: ['style', 'class', 'hidden'] });
        } catch (e) {
            this._bo = null;
        }
    }

    _scheduleExpand() {
        if (this._expandScheduled) return;
        this._expandScheduled = true;
        this._expandRaf = requestAnimationFrame(() => {
            this._expandScheduled = false;
            this._expandRaf = null;
            this.expand();
        });
    }

    _detachResizeObserver() {
        if (this._ro && this._boundaryEl) {
            try { this._ro.unobserve(this._boundaryEl); } catch (e) {}
        }
    }

    _ensureIntersectionObserver() {
        if (this._io) return;
        try {
            this._io = new IntersectionObserver(() => this._scheduleExpand(), {
                root: null,
                rootMargin: '100px 0px 100px 0px',
                threshold: [0, 0.01, 0.25, 0.5, 0.75, 1]
            });
            this._io.observe(this);
        } catch (e) {
            this._io = null;
        }
    }

    _disconnectIntersectionObserver() {
        if (this._io) {
            try { this._io.disconnect(); } catch (e) {}
            this._io = null;
        }
    }
});
