function queryItem(node, spec) {
  const item = {}
  if (node.value) {
    item.value = node.value
  }
  if (node.comment) {
    item.comment = node.comment
  }
  if (node.name) {
    if (!spec.has(node.name)) {
      spec.set(node.name, new Set())
    }
    spec.get(node.name).add(item)
  }
}

module.exports = queryItem
