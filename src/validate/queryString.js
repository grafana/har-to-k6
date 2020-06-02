const isPlainObject = require('is-plain-object')
const queryItem = require('./queryItem')
const { InvalidArchiveError } = require('../error')

/*
 * [j]: object
 */
function queryString(node, i, assay) {
  validate(node, i)
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    queryItem(item, i, j, assay)
  }
}

function validate(node, i) {
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        { name: 'InvalidQueryItem' },
        `Invalid query item (${i}:${j}): must be object`
      )
    }
  }
}

module.exports = queryString
