const fs = require('fs')
const postcss = require('postcss')
const atImport = require('postcss-import')
const url = require('postcss-url')
const { rollup } = require('rollup')
const terser = require('@rollup/plugin-terser')

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
        fs.writeFileSync(__dirname + '/app.bundle.css', result.css)
    })

// build js
rollup({
    input: __dirname + '/js/app.js',
    plugins: [terser()]
}).then(bundle => {
    return bundle.write({
        file: __dirname + '/app.bundle.js',
        format: 'iife'
    })
}).then(() => {
    console.log('app.bundle.js built')
}).catch(err => {
    console.log(err)
})
