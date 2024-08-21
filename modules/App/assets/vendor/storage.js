/**
 * JSONStorage - a simple storage helper inspired by the redis api.
 *
 * @author     Artur Heinze
 * @copyright  (c) since 2012 Artur Heinze
 * @license    MIT - http://opensource.org/licenses/MIT
 * @url        https://github.com/aheinze/JSONStorage
 */
(function (global) {

    function Store(name, adapter) {

        let $this = this;

        this.name = name;
        this.adapter = adapter;

        this.load();

        // cleanup expires data
        (function () {

            let time = (new Date()).getTime();

            for (let key in $this.data.__ex) {
                if ($this.data.__ex[key] < time) {
                    delete $this.data[key];
                    delete $this.data.__ex[key];
                }
            }

        })();
    }

    Store.prototype.load = function () {

        try {
            this.data = this.adapter.load(this.name);
        } catch (e) {
            this.data = {};
        }

        if (!this.data.__ex) {
            this.data.__ex = {}; // expires data container
        }
    };

    Store.prototype.store = function () {
        try {
            this.adapter.store(this.name, this.data);
        } catch (e) { }
    };

    Store.prototype.toString = function () {
        return JSON.stringify(this.data);
    };

    Store.prototype.flushdb = function () {

        let $this = this;

        this.data = {};
        this.data.__ex = {};

        setTimeout(function () {
            $this.store();
        }, 0); // async saving!?

        return true;
    };

    Store.prototype.get = function (key, def, reload) {

        if (reload) {
            this.load();
        }

        try {

            if (!this.data) {
                return def;
            }

            if (this.data.__ex && this.data.__ex[key] && this.data.__ex[key] < (new Date()).getTime()) {
                delete this.data[key];
                delete this.data.__ex[key];
            }

            return this.data[key] !== undefined ? this.data[key] : def;

        } catch (e) {
            return def;
        }
    };

    Store.prototype.set = function (key, value) {
        this.data[key] = value;
        this.store();
    };

    Store.prototype.setex = function (key, seconds, value) {
        this.set(key, value);
        this.expire(key, seconds);
    };

    Store.prototype.expire = function (key, seconds) {
        if (this.data[key]) this.data.__ex[key] = (new Date()).getTime() + (seconds * 1000);
    };

    Store.prototype.exists = function (key) {
        return this.get(key, "___no___") !== "___no___";
    };

    Store.prototype.del = function () {

        let keys = arguments,
            key = null,
            removed = 0;

        for (let i = 0; i < keys.length; i++) {

            key = keys[i];

            if (this.exists(key)) {
                delete this.data[key];

                if (this.data.__ex[key]) {
                    delete this.data.__ex[key];
                }

                removed++;
            }
        }

        this.store();

        return removed;
    };

    Store.prototype.type = function (key) {

        key = this.get(key);

        if (typeof (key) === 'object') {
            return JSON.stringify(key)[0] === "[" ? "list" : "set";
        }

        return typeof (key);
    };

    Store.prototype.append = function (key, value) {

        value = String(value);

        let current = String(this.get(key, "")),
            newone = current + value;

        this.set(key, newone);

        return newone.length;
    };

    Store.prototype.incr = function (key, by) {

        by = by || 1;

        let current = Number(this.get(key, 0)),
            newone = current + by;

        this.set(key, newone);

        return newone;
    };

    Store.prototype.decr = function (key, by) {
        by = by || 1;
        return this.incr(key, (by * -1));
    };

    /* List methods */

    Store.prototype.llen = function (key) {
        return this.get(key, []).length;
    };

    Store.prototype.lpush = function (key, value) {
        let list = this.get(key, []),
            ret = list.unshift(value);

        this.set(key, list);
        return ret;
    };

    Store.prototype.rpush = function (key, value) {
        let list = this.get(key, []),
            ret = list.push(value);

        this.set(key, list);
        return ret;
    };

    Store.prototype.lset = function (key, index, value) {
        let list = this.get(key, []);

        if (index < 0) {
            index = list.length - Math.abs(index);
        }

        if (list[index]) {
            list[index] = value;
            this.set(key, list);
            return true;
        }

        return false;
    };

    Store.prototype.lindex = function (key, index) {
        let list = this.get(key, []);

        if (index < 0) {
            index = list.length - Math.abs(index);
        }

        return list[index] ? list[index] : null;
    };

    /* Hash methods */

    Store.prototype.hset = function (key, field, value) {
        let set = this.get(key, {});

        set[field] = value;
        this.set(key, set);
    };

    Store.prototype.hget = function (key, field, def) {
        let set = this.get(key, {});

        return set[field] !== undefined ? set[field] : def;
    };

    Store.prototype.hgetall = function (key) {
        return this.get(key, {});
    };

    Store.prototype.hexists = function (key, field) {
        let set = this.get(key, {});

        return (set[field] !== undefined);
    };

    Store.prototype.hkeys = function (key) {
        let set = this.get(key, {}),
            keys = [],
            name = null;

        for (name in set) {
            if (set.hasOwnProperty(name)) {
                keys.push(name);
            }
        }

        return keys;
    };

    Store.prototype.hvals = function (key) {
        let set = this.get(key, {}),
            vals = [],
            name = null;

        for (name in set) {
            if (set.hasOwnProperty(name)) {
                vals.push(keys[name]);
            }
        }

        return vals;
    };

    Store.prototype.hlen = function (key) {
        return this.hkeys(key).length;
    };

    Store.prototype.hdel = function (key) {

        if (!this.exists(key)) return 0;

        let set = this.get(key, {}),
            field = null,
            removed = 0;

        for (let i = 1; i < arguments.length; i++) {

            field = arguments[i];

            if (set[field] !== undefined) {
                delete set[field];
                removed++;
            }
        }

        this.set(key, set);

        return removed;
    };

    Store.prototype.hincrby = function (key, field, by) {
        by = by || 1;
        let current = Number(this.hget(key, field, 0)),
            newone = current + by;

        this.hset(key, field, newone);

        return newone;
    };

    Store.prototype.hmget = function (key) {
        let set = this.get(key, {}),
            field = null,
            values = [];

        for (let i = 1; i < arguments.length; i++) {
            field = arguments[i];
            values.push(set[field] !== undefined ? set[field] : null);
        }

        return values;
    };

    Store.prototype.hmset = function (key) {
        let set = this.get(key, {}),
            field = null,
            value = null;

        for (let i = 1; i < arguments.length; i++) {
            field = arguments[i];
            value = arguments[(i + 1)] ? arguments[(i + 1)] : null;
            set[field] = value;
            i = i + 1;
        }

        this.set(key, set);
    };

    let JSONStorage = {

        select: function (name, adapter) {
            return (new Store(name, typeof (adapter) == 'object' ? adapter : (this.adapters[adapter] || this.adapters['memory'])));
        },

        adapters: {

            memory: (function () {
                let dbs = {};

                return {
                    load: function (name) {
                        let data = dbs[name] || {};
                        data.__ex = data.__ex || {};
                        return data;
                    },
                    store: function (name, data) {
                        dbs[name] = data;
                    }
                }
            })(),

            local: {
                load: function (name) {

                    let data = {};

                    try {
                        data = global.localStorage[`jsonstorage.${name}`] ? JSON.parse(global.localStorage[`jsonstorage.${name}`]) : {};
                    } catch (e) {}

                    data.__ex = data.__ex || {};
                    return data;
                },
                store: function (name, data) {
                    global.localStorage[`jsonstorage.${name}`] = JSON.stringify(data);
                }
            },

            session: {
                load: function (name) {

                    let data = {};

                    try {
                        data = global.sessionStorage[`jsonstorage.${name}`] ? JSON.parse(global.sessionStorage[`jsonstorage.${name}`]) : {};
                    } catch (e) {}

                    data.__ex = data.__ex || {};
                    return data;
                },
                store: function (name, data) {
                    global.sessionStorage[`jsonstorage.${name}`] = JSON.stringify(data);
                }
            }
        }
    };

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return JSONStorage;
        });
        // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = JSONStorage;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.JSONStorage = JSONStorage;
    } else {
        global.JSONStorage = JSONStorage;
    }

})(typeof window === 'undefined' ? {} : window);
