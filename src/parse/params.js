const param = require('./param')

function params(node, spec) {
  for (const item of node) {
    param(item, spec)
  }
}

module.exports = params
