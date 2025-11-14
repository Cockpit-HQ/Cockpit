customElements.define('display-image', class extends HTMLElement {

    static get observedAttributes() {
        return ['src', 'w', 'h', 'q', 'mode'];
    }

    constructor() {
        super();
    }

    connectedCallback() {

        this.ready = false;

        setTimeout(() => {
            this.render();
            this.ready = true;
        }, 0);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.ready && oldValue !== newValue) this.render();
    }

    render() {

        const src = this.getAttribute('src');
        const h = this.getAttribute('h') || 'original';
        const w = this.getAttribute('w') || 'original';
        const mode = this.getAttribute('mode') || 'bestFit';

        if (!src|| !w || !h) {
            return;
        }

        this.innerHTML = `<canvas width="${w}" height="${h}" style="vertical-align: middle;background-repeat: no-repeat;background-position: 50% 50%; background-size: contain"></canvas>`;

        let img = new Image(),
            uri = App.route(`/assets/thumbnail?src=${src}&m=${mode}&mime=auto&w=${w}&h=${h}`);

        img.onload = () => {
            this.querySelector('canvas').style.backgroundImage = `url(${uri})`;
        };

        img.src = uri;
    }

});
