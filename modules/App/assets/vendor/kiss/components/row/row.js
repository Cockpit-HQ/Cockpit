import { debounce } from "../../js/utils.js";


customElements.define('kiss-row', class extends HTMLElement {

    connectedCallback() {

        document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => {
            this.update()

            setTimeout(() => {
                this.update();
            }, 500)
        }));

        window.addEventListener('resize', () => this.update());

        (new MutationObserver(() => {
            this.update();
        })).observe(this, {
            childList: true,
            subtree: true
        });

        setTimeout(() => this.update(), 0);
    }

    update() {

        if (this.getAttribute('collapse') == 'true') return;

        if (!this.children.length || this._isHidden(this)) return;

        let firstVisible = null, children = this.children, top, diff;

        for (let i = 0; i < children.length; i++) {

            if (!firstVisible && !this._isHidden(children[i])) {
                firstVisible = children[i];
            }

            children[i].classList.remove('kiss-row-margin');
        }

        if (!firstVisible) return;

        top = firstVisible.offsetTop;

        for (let i = 0; i < children.length; i++) {
            
            diff = Math.abs(top - (!this._isHidden(children[i]) ? children[i].offsetTop : top));

            if (diff > 1) {
                children[i].classList.add('kiss-row-margin');
            }
        }
    }

    disconnectedCallback() {

    }

    _isHidden(el) {
        return (el.offsetTop === null)
    }
});
