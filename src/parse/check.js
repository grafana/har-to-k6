const checkVariant = require('./checkVariant')
const name = require('../string/check/name')
const state = require('./state/check')
const { checkState: makeCheckState } = require('../make')
const { CheckTypeEncoding } = require('../enum')

function check(node, spec) {
  const item = {
    type: node.type,
    state: makeCheckState(),
  }
  if (node.comment) {
    item.comment = node.comment
  }
  checkVariant[CheckTypeEncoding.get(node.type)](node, item)
  state(item)
  spec.set(name(node), item)
}

module.exports = check
