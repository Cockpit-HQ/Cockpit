
export let FieldTypes = {

    _fields : null,

    async get() {

        if (this._fields) return this._fields;

        let promises = [], fields = {};

        Object.keys(VueView.components).forEach((c, match, promise) => {

            match = /^field\-(.*)/.test(c);

            if (match && typeof(VueView.components[c]) === 'string') {

                promises.push(App.utils.import(VueView.components[c]).then(def => {

                    if (!def.default._meta) return;

                    fields[c.replace('field-', '')] = def.default._meta;
                }));
            }
        });

        this._fields = new Promise(resolve => {
            Promise.all(promises).then(() => {
                this.fields = fields;
                resolve(fields)
            });
        });

        return this._fields;
    }
}
