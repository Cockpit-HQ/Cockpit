let formatSize = function(bytes) {
    if (bytes == 0) { return "0.00 B"; }
    let e = Math.floor(Math.log(bytes) / Math.log(1024));
    return ((bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B').replace('.00', '');
}

let formatNumber = function(num, round = 2) {
    return (new Intl.NumberFormat(navigator.language, { style: 'decimal', maximumFractionDigits: round})).format(num);
}

let formatDuration = function(time) {
    // Hours, minutes and seconds
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = '';

    if (hrs > 0) {
        ret += `${hrs}:${(mins < 10 ? '0' : '')}`;
    }

    ret += `${mins}:${(secs < 10 ? '0' : '')}`;
    ret += `${secs}`;
    return ret;
}

let isNumeric = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

let on = function(element, name, delegate, fn) {

    if (!fn) {
        element.addEventListener(name, arguments[2]);
    } else {
        element.addEventListener(name, function(e) {

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

let copyText = function(text, cb) {
    let inp = document.createElement('textarea');
    document.body.appendChild(inp)
    inp.value = text
    inp.select();
    try { document.execCommand('copy', false); } catch (e) { }
    inp.remove();
    if (cb) cb();
}

let interpolate = function(str, params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${str}\`;`)(...vals);
}

let uuid = function() {

    if (typeof(crypto.randomUUID) === 'function') {
        return crypto.randomUUID();
    }

    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

let nanoid = function(size = 10) {

    const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let id = '';

    if (typeof (crypto.getRandomValues) === 'function') {
        const bytes = new Uint8Array(size);
        crypto.getRandomValues(bytes);
        for (let i = 0; i < size; i++) id += alphabet[bytes[i] % alphabet.length];
        return id;
    }

    for (let i = 0; i < size; i++) id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    return id;
}


let truncate = function(text, length, clamp = '...') {
    let content = text || '';
    return content.length > length ? content.slice(0, length) + clamp : content;
};

let stripTags = function(input, allowed) {

    if (Array.isArray(allowed)) {
        let tags = '';
        allowed.forEach(tag => tags += `<${tag}>`);
        allowed = tags;
    }

    // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9\-]*>/g) || []).join('');
    const tags = /<\/?([a-z0-9\-]*)\b[^>]*>?/gi;
    const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    let after = input;

    after = (after.substring(after.length - 1) === '<') ? after.substring(0, after.length - 1) : after;

    while (true) {
        const before = after
        after = before.replace(commentsAndPhpTags, '').replace(tags, ($0, $1) => {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
        });
        if (before === after) {
            return after
        }
    }
};

let base64encode = function(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>  String.fromCharCode('0x' + p1)));
};

let base64decode = function(str) {
    return decodeURIComponent(atob(str).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''));
};

export default {
    base64encode,
    base64decode,
    copyText,
    formatSize,
    formatDuration,
    formatNumber,
    interpolate,
    isNumeric,
    nanoid,
    on,
    toKebabCase,
    uuid,
    truncate,
    stripTags
}
