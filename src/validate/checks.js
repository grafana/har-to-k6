const check = require('./check')
const isPlainObject = require('is-plain-object')
const { InvalidArchiveError } = require('../error')
const { createChecksPath } = require('./utils/path')
const { createChecksIndexes } = require('./utils/indexes')

/*
 * [j]: object
 */
function checks(node, i, assay) {
  validate(node, i)
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    check(item, i, j, assay)
  }
}

function validate(node, i) {
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        {
          name: 'InvalidCheck',
          path: createChecksPath(i, j),
          indexes: createChecksIndexes(i, j),
        },
        `Check must be a plain object`
      )
    }
  }
}

module.exports = checks
