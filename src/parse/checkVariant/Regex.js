function Regex(node, item) {
  item.subject = node.subject
  item.expression = node.expression
  if (node.flags) {
    item.flags = node.flags
  }
}

module.exports = Regex
