function param (node, spec) {
  const item = {}
  if (node.value) {
    item.value = node.value
  }
  if (node.fileName) {
    item.fileName = node.fileName
  }
  if (node.contentType) {
    item.type = node.contentType
  }
  if (node.comment) {
    item.comment = node.comment
  }
  if (!spec.has(node.name)) {
    spec.set(node.name, new Set())
  }
  spec.get(node.name).add(item)
}

module.exports = param
