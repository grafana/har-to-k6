const entry = require('./entry')

function entries (node, result) {
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    entry(item, i, result)
  }
}

module.exports = entries
