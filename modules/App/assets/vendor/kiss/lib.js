import "./components/accordion/accordion.js";
import "./components/carousel/carousel.js";
import "./components/dropdown/dropdown.js";
import "./components/dialog/dialog.js";
import "./components/offcanvas/offcanvas.js";
import "./components/popout/popout.js";
import "./components/parallax/parallax.js";
import "./components/svg/svg.js";
import "./components/tabs/tabs.js";
import "./components/tooltip/tooltip.js";
import {on, onMutation} from "./js/events.js";

HTMLElement.prototype.on = function(event, selector, handler) {
    return on(this, event, selector, handler)
};

HTMLElement.prototype.onMutation = function(callback) {
    return onMutation(callback, this)
};
