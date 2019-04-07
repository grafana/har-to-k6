const header = require('./header')
const isPlainObject = require('is-plain-object')
const { InvalidArchiveError } = require('../error')

/*
 * [j]: object
 */
function headers (node, i, assay) {
  validate(node, i)
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    header(item, i, j, assay)
  }
}

function validate (node, i) {
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        { name: 'InvalidHeader' },
        `Invalid header (${i}:${j}): must be object`
      )
    }
  }
}

module.exports = headers
