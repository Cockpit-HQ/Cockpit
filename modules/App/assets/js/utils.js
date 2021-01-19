
let formatSize = function (bytes) {
    if (bytes == 0) { return "0.00 B"; }
    let e = Math.floor(Math.log(bytes) / Math.log(1024));
    return ((bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B').replace('.00', '');
}

let formatNumber = function(num, round = 2) {
    return (new Intl.NumberFormat(navigator.language, { style: 'decimal', maximumFractionDigits: round})).format(num);
}

let formatDuration = function (time) {
    // Hours, minutes and seconds
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

let on = function (element, name, delegate, fn) {

    if (!fn) {
        element.addEventListener(name, arguments[2]);
    } else {
        element.addEventListener(name, function (e) {

            let target = e.target;

            while (target !== element) {

                if (!target) {
                    break;
                }

                if (target.matches(delegate)) {
                    return fn.apply(target, arguments);
                }

                target = target.parentNode;
            }
        });
    }

    return element;
};

let toKebabCase = function(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
};

let copyText = function (text, cb) {
    var inp = document.createElement('textarea');
    document.body.appendChild(inp)
    inp.value = text
    inp.select();
    try { document.execCommand('copy', false); } catch (e) { }
    inp.remove();
    if (cb) cb();
}


export default {
    formatSize,
    formatDuration,
    formatNumber,
    toKebabCase,
    copyText,
    on
}