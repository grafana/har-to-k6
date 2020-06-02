const isPlainObject = require('is-plain-object')
const page = require('./page')
const { InvalidArchiveError } = require('../error')

/*
 * [i]: object
 */
function pages(node, assay) {
  validate(node)
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    page(item, i, assay)
  }
}

function validate(node) {
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError({ name: 'InvalidPage' }, `Invalid page (${i}): must be object`)
    }
  }
}

module.exports = pages
