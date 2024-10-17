const fs = require('fs')
const postcss = require('postcss')
const atImport = require('postcss-import')
const url = require('postcss-url')
const exec = require('child_process').exec

// css to be processed
let css = fs.readFileSync(__dirname + '/css/app.css')

// process css
postcss()
    .use(atImport())
    .use(url({
        url: 'rebase'
    }))
    .process(css, {
        // `from` option is needed here
        from: __dirname + '/css/app.css',
        to: __dirname + '/app.bundle.css'
    })
    .then(function (result) {
        var output = result.css

        fs.writeFileSync(__dirname + '/app.bundle.css', result.css)
    })

exec(`rollup ${__dirname}/js/app.js --file ${__dirname}/app.bundle.js  --plugin @rollup/plugin-terser --format iife`, (err, stdout, stderr) => {

    if (err) {
        console.log(err)
        return;
    }

    console.log('app.bundle.js built');
});
