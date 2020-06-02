function JSONPath(node) {
  return [node.expression, 'exists'].join(' ')
}

module.exports = JSONPath
