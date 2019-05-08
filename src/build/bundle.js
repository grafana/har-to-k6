const browserify = require('browserify')
const bundleCollapser = require('bundle-collapser/plugin')
const concatStream = require('concat-stream')
const envify = require('envify')
const minifyStream = require('minify-stream')
const shakeify = require('common-shakeify')
const uglifyify = require('uglifyify')

async function bundle (id, expose) {
  return new Promise((resolve, reject) => {
    const bundler = browserify(id, { standalone: expose })
    bundler.transform(envify, { global: true })
    bundler.transform(uglifyify, { global: true })
    bundler.plugin(shakeify)
    bundler.plugin(bundleCollapser)
    const gather = concatStream(buffer => {
      const string = buffer.toString('utf8')
      resolve(string)
    })
    gather.on('error', reject)
    bundler.bundle()
      .pipe(minifyStream({ sourceMap: false }))
      .pipe(gather)
  })
}

module.exports = bundle
