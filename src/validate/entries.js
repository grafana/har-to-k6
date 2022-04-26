const isPlainObject = require('is-plain-object')
const entry = require('./entry')
const { InvalidArchiveError } = require('../error')
const { createEntriesPath } = require('./utils/path')
const { createEntriesIndexes } = require('./utils/indexes')

/*
 * [i]: object
 */
function entries(node, assay) {
  validate(node)
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    entry(item, i, assay)
  }
}

function validate(node) {
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        {
          name: 'InvalidEntry',
          path: createEntriesPath(i),
          indexes: createEntriesIndexes(i),
        },
        `Entry must be a plain object`
      )
    }
  }
}

module.exports = entries
