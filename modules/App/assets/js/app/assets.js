
export default {

    _ress: {},

    require: function (ress, onSuccess, onError) {

        onSuccess = onSuccess || function () { };
        onError = onError || function () { };

        let req = [];

        ress = Array.isArray(ress) ? ress : [ress];

        for (let i = 0, len = ress.length; i < len; i++) {

            if (!ress[i]) continue;

            if (!this._ress[ress[i]]) {

                if (ress[i].match(/\.js$/i)) {
                    this._ress[ress[i]] = this.getScript(ress[i]);
                } else if (ress[i].match(/\.(jpg|jpeg|gif|png)$/i)) {
                    this._ress[ress[i]] = this.getImage(ress[i]);
                } else if (ress[i].match(/\.css$/i)) {
                    this._ress[ress[i]] = this.getCss(ress[i]);
                } else {
                    continue;
                }
            }

            req.push(this._ress[ress[i]]);
        }

        return Promise.all(req).then(onSuccess).catch(function (e) {
            onError.apply(self, [e]);
        });
    },

    getScript: function (url) {

        return new Promise(function (resolve, reject) {

            let script = document.createElement('script');

            script.async = true;

            script.onload = function () {
                resolve(url);
            };

            script.onerror = function () {
                reject(url);
            };

            script.src = (/^(\/\/|http)/.test(url) ? url : App.base(url)) + '?v=' + App.version;

            document.getElementsByTagName('head')[0].appendChild(script);

        });
    },

    getCss: function (url) {

        return new Promise(function (resolve, reject) {

            let link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = (/^(\/\/|http)/.test(url) ? url : App.base(url)) + '?v=' + App.version;

            document.getElementsByTagName('head')[0].appendChild(link);

            let img = document.createElement('img');
            img.onerror = function () {
                resolve(url);
            };
            img.src = link.href + '?v=' + App.version;
        });
    },

    getImage: function (url) {

        return new Promise(function (resolve, reject) {

            let img = document.createElement('img');

            img.onload = function () { resolve(url); };
            img.onerror = function () { reject(url); };

            img.src = (url.match(/^(\/\/|http)/) ? url : App.base(url)) + '?v=' + App.version;
        });
    }
};
