const isPlainObject = require('is-plain-object')
const param = require('./param')
const { InvalidArchiveError } = require('../error')

/*
 * [j]: object
 */
function params(node, i, assay) {
  validate(node, i)
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    param(item, i, j, assay)
  }
}

function validate(node, i) {
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        { name: 'InvalidParam' },
        `Invalid param (${i}:${j}): must be object`
      )
    }
  }
}

module.exports = params
