customElements.define('display-image', class extends HTMLElement {

    static get observedAttributes() {
        return ['id', 'w', 'h', 'q', 'mode'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {

        const id = this.getAttribute('id');
        const h = this.getAttribute('h');
        const w = this.getAttribute('w');
        const mode = this.getAttribute('mode') || 'bestFit';

        if (!id || !w || !h) {
            return;
        }

        this.innerHTML = `<canvas width="${w}" height="${h}" style="vertical-align: middle;"></canvas>`;

        let img = new Image();

        img.onload = () => {

            let canvas = this.querySelector('canvas');
            let ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, w, h);
        }

        img.src = App.route(`/assets/thumbnail/${id}?m=${mode}&mime=auto&w=h=${w}&h=${h}&t=${id}`);
    }

});
