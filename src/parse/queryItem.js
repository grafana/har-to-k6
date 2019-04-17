const { variable } = require('../expression')

function queryItem (node, spec, state) {
  const item = {}
  if (variable.test(node.name)) {
    state.variable = true
  }
  if (node.value) {
    item.value = node.value
    if (variable.test(item.value)) {
      state.variable = true
    }
  }
  if (node.comment) {
    item.comment = node.comment
  }
  if (!spec.has(node.name)) {
    spec.set(node.name, new Set())
  }
  spec.get(node.name).add(item)
}

module.exports = queryItem
