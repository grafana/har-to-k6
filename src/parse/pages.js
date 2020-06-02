const page = require('./page')

function pages(node, result) {
  for (const item of node) {
    page(item, result)
  }
}

module.exports = pages
