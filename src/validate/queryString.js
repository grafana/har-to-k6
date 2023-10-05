const isPlainObject = require('is-plain-object')
const queryItem = require('./queryItem')
const { InvalidArchiveError } = require('../error')
const { createQueryStringPath } = require('./utils/path')
const { createQueryStringIndexes } = require('./utils/indexes')

/*
 * [j]: object
 */
function queryString(node, i) {
  validate(node, i)
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    queryItem(item, i, j)
  }
}

function validate(node, i) {
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        {
          name: 'InvalidQueryItem',
          path: createQueryStringPath(i, j),
          indexes: createQueryStringIndexes(i, j),
        },
        `Query item must be a plain object`
      )
    }
  }
}

module.exports = queryString
