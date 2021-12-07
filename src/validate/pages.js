const isPlainObject = require('is-plain-object')
const page = require('./page')
const { InvalidArchiveError } = require('../error')
const { createPagesPath } = require('./utils/path')
const { createPagesIndexes } = require('./utils/indexes')

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
      throw new InvalidArchiveError(
        {
          name: 'InvalidPage',
          path: createPagesPath(i),
          indexes: createPagesIndexes(i),
        },
        `Page is invalid, must be an object`
      )
    }
  }
}

module.exports = pages
