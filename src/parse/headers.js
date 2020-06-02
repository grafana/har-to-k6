const header = require('./header')

function headers(node, spec) {
  for (const item of node) {
    header(item, spec)
  }
}

module.exports = headers
