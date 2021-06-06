customElements.define('app-actionbar', class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {

        let idle = setInterval(() => {

            if (this.offsetHeight) {
                clearInterval(idle);
                this.update();
            }
        }, 10);

        // just to be sure
        window.addEventListener("load", evt => {
            this.update();
        });
    }

    disconnectedCallback() {
        document.body.style.paddingBottom = '';
    }

    update() {

        if (this.getAttribute('space') !== 'false') {
            document.body.style.paddingBottom = `calc(2rem + ${this.offsetHeight}px)`;
        }
    }
});
