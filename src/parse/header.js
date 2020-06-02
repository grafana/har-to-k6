const { isBlacklistedHeader } = require('../aid')

function header(node, spec) {
  const item = {}

  if (node.name && node.name[0] === ':') {
    return
  }

  if (isBlacklistedHeader(node.name)) {
    return
  }

  if (node.value) {
    item.value = node.value
  }

  if (node.comment) {
    item.comment = node.comment
  }

  if (!spec.has(node.name)) {
    spec.set(node.name, new Set())
  }

  spec.get(node.name).add(item)
}

module.exports = header
