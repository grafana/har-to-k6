const checkVariant = require('./checkVariant')
const name = require('../string/check/name')
const { CheckTypeEncoding } = require('../enum')

function check (node, spec) {
  const item = {
    type: node.type
  }
  checkVariant[CheckTypeEncoding.get(node.type)](node, item)
  spec.set(name(node), item)
}

module.exports = check
