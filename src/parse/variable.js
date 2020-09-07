// Overrides prior variables of same name in same entry
function variable(node, spec) {
  const item = {
    type: node.type,
    attribute: node.attribute || null,
    expression: node.expression,
  }
  if (node.comment) {
    item.comment = node.comment
  }
  spec.set(node.name, item)
}

module.exports = variable
