const checkVariant = require('./checkVariant')
const name = require('../string/check/name')
const { CheckTypeEncoding } = require('../enum')

function check (node, spec) {
  const item = {
    type: node.type
  }
  if (node.comment) {
    item.comment = node.comment
  }
  checkVariant[CheckTypeEncoding.get(node.type)](node, item)
  spec.set(name(node), item)
}

module.exports = check
