const isPlainObject = require('is-plain-object')
const variable = require('./variable')
const { InvalidArchiveError } = require('../error')
const { createVariablesPath } = require('./utils/path')
const { createVariablesIndexes } = require('./utils/indexes')

/*
 * [j]: object
 */
function variables(node, i) {
  validate(node, i)
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    variable(item, i, j)
  }
}

function validate(node, i) {
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        {
          name: 'InvalidVariable',
          path: createVariablesPath(i, j),
          indexes: createVariablesIndexes(i, j),
        },
        `Variable must be a plain object`
      )
    }
  }
}

module.exports = variables
