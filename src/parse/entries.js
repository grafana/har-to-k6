const entry = require('./entry')

function entries(node, result) {
  for (const item of node) {
    entry(item, result)
  }
}

module.exports = entries
