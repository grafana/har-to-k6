function JSONPathValue(node, item) {
  item.expression = node.expression
  item.condition = node.condition
  item.value = node.value
}

module.exports = JSONPathValue
