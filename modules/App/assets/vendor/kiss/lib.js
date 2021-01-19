import "./components/dropdown/dropdown.js";
import "./components/dialog/dialog.js";
import "./components/offcanvas/offcanvas.js";
import "./components/parallax/parallax.js";
import "./components/row/row.js";
import "./components/svg/svg.js";
import {on} from "./js/events.js";

HTMLElement.prototype.on = function(event, selector, handler) {
    return on(this, event, selector, handler)
};