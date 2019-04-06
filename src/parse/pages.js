const page = require('./page')

function pages (node, result) {
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    page(item, i, result)
  }
}

module.exports = pages
