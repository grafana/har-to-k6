const condition = require('../condition')

function JSONPathValue(node) {
  return [node.expression, condition(node.condition), node.value].join(' ')
}

module.exports = JSONPathValue
