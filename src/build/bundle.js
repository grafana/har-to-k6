const browserify = require('browserify')
const tinyify = require('tinyify')

async function bundle (id, expose) {
  return new Promise((resolve, reject) => {
    const bundler = browserify(id, { standalone: expose })
    bundler.plugin(tinyify, { flat: false })
    bundler.bundle((error, buffer) => {
      if (error) {
        reject(error)
      } else {
        const string = buffer.toString('utf8')
        resolve(string)
      }
    })
  })
}

module.exports = bundle
