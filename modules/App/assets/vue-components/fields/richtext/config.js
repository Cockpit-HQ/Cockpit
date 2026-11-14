// Features that can be removed from the editor schema via the `disable` option.
// A disabled feature is gone completely: no buttons, no shortcuts, no markdown rules, and pasted content is converted.
export const FEATURES = [
    'bold', 'italic', 'underline', 'strike', 'code', 'subscript', 'superscript', 'highlight', 'color', 'link',
    'heading', 'blockquote', 'codeBlock', 'hr', 'bulletList', 'orderedList', 'table', 'image', 'textAlign',
];

export const LOOKS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const DEFAULTS = {
    toolbar: 'format | color | alignLeft alignCenter alignRight | link image | listBullet listOrdered | table hr',
    bubbleMenu: 'bold italic underline highlight subscript superscript',
    floatingMenu: 'h1 h2 h3 listBullet listOrdered image table',
};

export function blockStyleNodeName(name) {
    return `blockStyle_${name}`;
}

function toList(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',');
    return [];
}

// null/undefined = default menu, false/''/'none' = no menu
function resolveMenu(value, fallback) {
    if (value === undefined || value === null) return fallback;
    if (value === false || value === 'none') return '';
    return String(value);
}

function resolveHeadings(value) {

    if (value === false) return [];

    const levels = toList(value)
        .map(level => Number(String(level).trim().replace(/^h/i, '')))
        .filter(level => Number.isInteger(level) && level >= 1 && level <= 6);

    // no selection = all levels; use disable: ['heading'] to remove headings
    return levels.length ? [...new Set(levels)].sort((a, b) => a - b) : [1, 2, 3, 4, 5, 6];
}

function resolveBlockStyles(value) {

    const styles = [];
    const names = new Set();

    toList(value).forEach(style => {

        if (!style || typeof style !== 'object') return;

        const name = String(style.name || '').trim();
        const tag = String(style.tag || 'p').trim().toLowerCase();
        const cls = String(style.class || '').trim().split(/\s+/).filter(Boolean).join(' ');

        if (!/^[a-zA-Z][\w-]*$/.test(name) || names.has(name)) return;
        if (!/^[a-z][a-z0-9-]*$/.test(tag)) return;

        // a plain <p> without class could not be told apart from a paragraph
        if (tag === 'p' && !cls) return;

        names.add(name);

        styles.push({
            name,
            label: style.label || name,
            tag,
            class: cls,
            look: LOOKS.includes(style.look) ? style.look : null,
            icon: style.icon || 'title',
        });
    });

    return styles;
}

export function resolveSettings(opts = {}) {

    const disabled = new Set(toList(opts.disable).map(feature => String(feature).trim()).filter(Boolean));

    if (opts.headings === false) disabled.add('heading');

    return {
        toolbar: resolveMenu(opts.toolbar, DEFAULTS.toolbar),
        bubbleMenu: resolveMenu(opts.bubbleMenu, DEFAULTS.bubbleMenu),
        floatingMenu: resolveMenu(opts.floatingMenu, DEFAULTS.floatingMenu),
        headings: disabled.has('heading') ? [] : resolveHeadings(opts.headings),
        blockStyles: resolveBlockStyles(opts.blockStyles),
        disabled: [...disabled],
        isEnabled: feature => !disabled.has(feature),
    };
}
