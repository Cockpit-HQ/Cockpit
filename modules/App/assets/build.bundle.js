const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const atImport = require('postcss-import');
const url = require('postcss-url');
const chokidar = require('chokidar');
const { rollup } = require('rollup');
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
let terser;
try {
  const tp = require('@rollup/plugin-terser');
  // Support both CommonJS and ESM shapes
  terser = (tp && (tp.terser || tp.default || tp));
} catch (e) {
  terser = null;
}

const ASSETS_DIR = __dirname;
const cssPath = path.join(ASSETS_DIR, 'css', 'app.css');
const cssOutPath = path.join(ASSETS_DIR, 'app.bundle.css');
const jsInput = path.join(ASSETS_DIR, 'js', 'app.js');
const jsOut = path.join(ASSETS_DIR, 'app.bundle.js');

async function buildCSS() {
  const css = fs.readFileSync(cssPath);
  const result = await postcss()
    .use(atImport())
    .use(url({ url: 'rebase' }))
    .process(css, { from: cssPath, to: cssOutPath });
  fs.writeFileSync(cssOutPath, result.css);
}

async function buildJS() {
  const bundle = await rollup({
    input: jsInput,
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve({ browser: true }),
      commonjs(),
      (typeof terser === 'function' ? terser() : null),
    ].filter(Boolean),
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
  });

  await bundle.write({
    file: jsOut,
    format: 'iife',
    sourcemap: false,
  });
  await bundle.close();
}

async function buildAll() {
  await buildCSS();
  await buildJS();
  console.log('app.bundle.css and app.bundle.js built');
}

function watch() {
  const watcher = chokidar.watch([
    path.join(ASSETS_DIR, 'css', '**', '*'),
    path.join(ASSETS_DIR, 'js', '**', '*'),
  ], { ignoreInitial: true });

  let timer;
  const trigger = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      buildAll().catch(err => console.error(err));
    }, 50);
  };

  watcher.on('add', trigger).on('change', trigger).on('unlink', trigger);
  console.log('Watching for changes...');
}

(async () => {
  try {
    await buildAll();
    if (process.argv.includes('--watch')) {
      watch();
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
})();
