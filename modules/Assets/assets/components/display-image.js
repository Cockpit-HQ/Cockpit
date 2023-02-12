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

    attributeChangedCallback(oldvalue, newvalue) {
        if (oldvalue != newvalue) this.render();
    }

    render() {

        const id = this.getAttribute('id');
        const h = this.getAttribute('h');
        const w = this.getAttribute('w');
        const mode = this.getAttribute('mode') || 'bestFit';

        if (!id || !w || !h) {
            return;
        }

        this.innerHTML = `<canvas width="${w}" height="${h}" style="vertical-align: middle;background-repeat: no-repeat;background-position: 50% 50%; background-size: contain"></canvas>`;

        let img = new Image(),
            uri = App.route(`/assets/thumbnail/${id}?m=${mode}&mime=auto&w=h=${w}&h=${h}&t=${id}`);

        img.onload = () => {
            this.querySelector('canvas').style.backgroundImage = `url(${uri})`;
        };

        img.src = uri;
    }

});
