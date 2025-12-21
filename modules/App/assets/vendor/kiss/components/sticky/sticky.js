
let register = [];

const update = () => {

    // Get all sticky elements
    const stickies = document.querySelectorAll('kiss-sticky, [data-sticky="true"]');

    if (!stickies.length) return;

    let stickyHeight = 0;

    stickies.forEach((sticky) => {

        // Check if element is visible
        if (sticky.offsetParent === null) return;

        // Support both data-offset (standard) and offset (convenience)
        const offset = parseInt(sticky.getAttribute('data-offset') || sticky.getAttribute('offset')) || 0;

        sticky.style.top = (stickyHeight + offset) + 'px';

        stickyHeight += sticky.offsetHeight + offset;
    });
};

document.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update);

// Observer to detect size changes/visibility of registered components
const observer = new ResizeObserver(update);

customElements.define('kiss-sticky', class extends HTMLElement {

    connectedCallback() {
        register.push(this);
        observer.observe(this);
        update();
    }

    disconnectedCallback() {
        let index = register.indexOf(this);
        if (index > -1) register.splice(index, 1);
        observer.unobserve(this);
        update();
    }
});
